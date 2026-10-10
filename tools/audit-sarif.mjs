#!/usr/bin/env node
/**
 * audit-sarif.mjs <dossier|url-git> [--out audit.sarif]
 * Même moteur de règles que audit-depot.mjs, mais sort au format SARIF 2.1.0.
 * SARIF est lu nativement par GitHub (onglet Security), VS Code et GitLab :
 * les constats apparaissent sur la ligne exacte du code, sans copier-coller.
 * Aucun code exécuté.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, readdirSync, statSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, relative } from 'node:path';
import { createHash } from 'node:crypto';

const IGNORE = new Set(['node_modules','.git','dist','build','.next','vendor','__pycache__','coverage','.venv','venv','.cache']);
const TEXTE = new Set(['.js','.mjs','.cjs','.ts','.tsx','.jsx','.py','.rb','.php','.go','.java','.cs','.env','.yml','.yaml','.sh','.sql','.conf','.ini','.tf']);
const MAX = 512 * 1024;

const args = process.argv.slice(2);
const cible = args.find(a => !a.startsWith('--'));
const iOut = args.indexOf('--out');
const sortie = iOut >= 0 ? args[iOut + 1] : 'audit.sarif';
const avecTests = args.includes('--avec-tests');
if (!cible) { console.error('Usage: node tools/audit-sarif.mjs <dossier|url-git> [--out audit.sarif]'); process.exit(2); }

let racine = cible;
if (/^(https?:\/\/|git@)/.test(cible)) {
  const tmp = mkdtempSync(join(tmpdir(), 'audit-'));
  try { execFileSync('git', ['clone','-q','--depth','1',cible,tmp], { stdio:'pipe', timeout:180000 }); racine = tmp; }
  catch (e) { console.error('Clone impossible :', String(e.message).split('\n')[0]); process.exit(3); }
} else if (!existsSync(cible)) { console.error('Introuvable :', cible); process.exit(3); }

function* marche(d){ let e; try { e = readdirSync(d,{withFileTypes:true}); } catch { return; }
  for (const x of e){ if (IGNORE.has(x.name)) continue; const p = join(d,x.name);
    if (x.isDirectory()) yield* marche(p); else if (x.isFile()) yield p; } }

const estFichierTest = rel =>
  /(^|\/)(test|tests|spec|__tests__|fixtures|examples?|benchmark)\//i.test(rel) ||
  /\.(test|spec)\.[a-z]+$/i.test(rel) || /(^|\/)[^/]*\.(mock|stub)\.[a-z]+$/i.test(rel);
const EXEMPLE = /(example|exemple|dummy|fake|placeholder|your[_-]?key|xxxx|abc123|changeme|sk_test_|test[_-]?key|<[A-Z_]+>)/i;

// Une seule source de vérité pour les règles : réutilisée par le rapport HTML.
const REGLES = [
  { id:'secret', g:'error', t:'Secret probable en dur',
    re:/(api[_-]?key|secret|passwd|password|private[_-]?key|access[_-]?key)\s*[:=]\s*['"]([A-Za-z0-9_\-\.\/\+]{16,})['"]/i,
    aide:'Révoquer la clé, la déplacer dans une variable d\'environnement, purger l\'historique Git.' },
  { id:'aws', g:'error', t:'Clé AWS en dur', re:/\bAKIA[0-9A-Z]{16}\b/,
    aide:'Révoquer dans IAM, utiliser des rôles temporaires.' },
  { id:'cmdinj', g:'error', t:'Commande système avec entrée concaténée',
    re:/(exec|execSync|spawnSync|spawn)\s*\(\s*[^)]{0,80}(\+|\$\{)/,
    aide:'Passer les arguments sous forme de tableau, sans shell.' },
  { id:'eval', g:'warning', t:'Exécution dynamique de code', re:/\b(eval|new\s+Function)\s*\(/,
    aide:'Remplacer par un analyseur explicite.' },
  { id:'sqli', g:'warning', t:'Requête SQL construite par concaténation',
    re:/(SELECT|INSERT|UPDATE|DELETE)[^;'"`]{0,120}(\+\s*[\w$]|`\s*\$\{)/i,
    aide:'Utiliser des requêtes paramétrées.' },
  { id:'cors', g:'warning', t:'CORS ouvert à toutes les origines',
    re:/Access-Control-Allow-Origin['"]?\s*[:=]\s*['"]\*['"]|origin\s*:\s*['"]\*['"]/i,
    aide:'Restreindre aux origines réellement utilisées.' },
  { id:'http', g:'warning', t:'URL HTTP non chiffrée',
    re:/["'`]http:\/\/(?!localhost|127\.0\.0\.1|0\.0\.0\.0|www\.w3\.org|example\.com)/,
    aide:'Passer en HTTPS.' },
  { id:'innerHTML', g:'warning', t:'Écriture HTML directe (risque XSS)',
    re:/\.innerHTML\s*=\s*[^=]|document\.write\s*\(/,
    aide:'Utiliser textContent ou échapper.' },
  { id:'mdp', g:'warning', t:'Hachage faible pour mot de passe',
    re:/(createHash\s*\(\s*['"](md5|sha1)['"]|\b(md5|sha1)\s*\()/i,
    aide:'Utiliser bcrypt, scrypt ou Argon2.' },
  { id:'verif', g:'note', t:'Vérification TLS désactivée',
    re:/(rejectUnauthorized\s*:\s*false|verify\s*=\s*False|InsecureSkipVerify\s*:\s*true)/,
    aide:'Réactiver la vérification TLS.' },
];

const resultats = [];
for (const f of marche(racine)) {
  const rel = relative(racine, f).replace(/\\/g,'/');
  if (!avecTests && estFichierTest(rel)) continue;
  let st; try { st = statSync(f); } catch { continue; }
  if (st.size > MAX) continue;
  const dot = rel.lastIndexOf('.'); const ext = dot >= 0 ? rel.slice(dot).toLowerCase() : '';
  if (!TEXTE.has(ext) && !/(^|\/)(\.env|Dockerfile|Makefile)/.test(rel)) continue;
  let contenu; try { contenu = readFileSync(f,'utf8'); } catch { continue; }
  contenu.split(/\r?\n/).forEach((l, i) => {
    const t = l.trim();
    if (t.startsWith('//') || t.startsWith('#') || t.startsWith('*')) return;
    for (const r of REGLES) {
      if (!r.re.test(l)) continue;
      if ((r.id === 'secret' || r.id === 'aws') && EXEMPLE.test(l)) continue;
      const titre = r.id === 'secret' ? l.trim().replace(/['"][^'"]{6,}['"]/g, '"…"') : t.slice(0,160);
      const empreinte = createHash('sha256').update(`${r.id}|${rel}|${i+1}`).digest('hex').slice(0,24);
      resultats.push({
        ruleId: r.id,
        level: r.g,
        message: { text: `${r.t}. ${r.aide}` },
        locations: [{ physicalLocation: { artifactLocation: { uri: rel }, region: { startLine: i+1, snippet: { text: titre.slice(0,160) } } } }],
        partialFingerprints: { primaryLocationLineHash: empreinte },
      });
    }
  });
}

const sarif = {
  $schema: 'https://json.schemastore.org/sarif-2.1.0.json',
  version: '2.1.0',
  runs: [{
    tool: {
      driver: {
        name: 'audit-code-statique', version: '1.0.0', informationUri: 'https://aarrth8.github.io/audit-code-statique/',
        rules: REGLES.map(r => ({
          id: r.id, name: r.t, shortDescription: { text: r.t },
          helpUri: 'https://aarrth8.github.io/audit-code-statique/',
          help: { text: r.aide },
          defaultConfiguration: { level: r.g },
          properties: { tags: ['security'] },
        })),
      },
    },
    invocations: [{ executionSuccessful: true, properties: { cible, analyseStatique: true, codeExecute: false } }],
    results: resultats,
  }],
};

writeFileSync(sortie, JSON.stringify(sarif, null, 2));
const parNiveau = resultats.reduce((a, r) => (a[r.level] = (a[r.level]||0)+1, a), {});
console.log(JSON.stringify({ cible, resultats: resultats.length, parNiveau, sarif: sortie }, null, 2));
