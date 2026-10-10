#!/usr/bin/env node
/**
 * audit-sarif.mjs <depot|url> [--out rapport.sarif]
 *
 * Produit un rapport SARIF 2.1.0 lisible nativement par :
 *   - l'onglet « Security » de GitHub (upload-sarif) ;
 *   - VS Code (extension SARIF Viewer) : le constat s'affiche sur la ligne fautive ;
 *   - GitLab, Azure DevOps, SonarQube.
 *
 * C'est le format attendu par un développeur. Un rapport HTML se lit une fois ;
 * un SARIF s'intègre dans son outillage et reste.
 *
 * Analyse statique par motifs. Le code n'est jamais exécuté.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, readdirSync, statSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, relative } from 'node:path';

const IGNORE = new Set(['node_modules','.git','dist','build','.next','vendor','__pycache__','coverage','.venv','venv','.cache']);
const TEXTE = new Set(['.js','.mjs','.cjs','.ts','.tsx','.jsx','.py','.rb','.php','.go','.java','.cs','.env','.yml','.yaml','.sh','.sql','.conf','.ini','.tf']);
const MAX = 512 * 1024;

// Chaque règle porte une aide à la correction : c'est ce qui distingue un audit utile d'une liste d'alertes.
const REGLES = [
  { id:'secret-en-dur', niveau:'error', sev:'9.1', titre:'Secret probable en dur',
    texte:'Une valeur ressemblant à un secret est écrite dans le code source.',
    aide:'Révoquer la clé exposée, la déplacer dans une variable d\'environnement, purger l\'historique Git (git filter-repo).',
    re:/(api[_-]?key|secret|passwd|password|private[_-]?key|access[_-]?key)\s*[:=]\s*['"][A-Za-z0-9_\-\.\/\+]{16,}['"]/i },
  { id:'cle-aws', niveau:'error', sev:'9.4', titre:'Identifiant d\'accès AWS en dur',
    texte:'Un identifiant de clé d\'accès AWS (AKIA…) figure dans le code.',
    aide:'Révoquer immédiatement dans IAM, examiner CloudTrail pour tout usage non autorisé, utiliser des rôles IAM.',
    re:/\bAKIA[0-9A-Z]{16}\b/ },
  { id:'injection-commande', niveau:'error', sev:'9.0', titre:'Commande système construite par concaténation',
    texte:'Une commande est assemblée par concaténation ou interpolation avant exécution.',
    aide:'Passer les arguments sous forme de tableau (execFile style) et refuser toute valeur non validée.',
    re:/(exec|execSync|spawnSync|spawn)\s*\(\s*[^)]{0,80}(\+|\$\{)/ },
  { id:'execution-dynamique', niveau:'error', sev:'8.2', titre:'Exécution dynamique de code',
    texte:'eval ou new Function exécute du code construit à l\'exécution.',
    aide:'Remplacer par un analyseur ou une table de correspondance explicite.',
    re:/\b(eval|new\s+Function)\s*\(/ },
  { id:'requete-sql-concat', niveau:'error', sev:'8.5', titre:'Requête SQL construite par concaténation',
    texte:'Une requête SQL est assemblée avec des valeurs non paramétrées.',
    aide:'Utiliser des requêtes préparées / des paramètres liés (placeholder + tableau de valeurs).',
    re:/(SELECT|INSERT|UPDATE|DELETE)[^;'"`]{0,120}(\+\s*[\w$]|`\s*\$\{)/i },
  { id:'cors-ouvert', niveau:'warning', sev:'6.1', titre:'CORS ouvert à toutes les origines',
    texte:'L\'en-tête autorise n\'importe quelle origine.',
    aide:'Restreindre aux origines réellement utilisées.',
    re:/origin\s*:\s*['"]\*['"]/i },
  { id:'http-clair', niveau:'warning', sev:'5.3', titre:'URL HTTP non chiffrée',
    texte:'Une ressource est appelée en HTTP, donc sans chiffrement.',
    aide:'Basculer en HTTPS et vérifier les redirections.',
    re:/["'`]http:\/\/(?!localhost|127\.0\.0\.1|0\.0\.0\.0|www\.w3\.org|example\.com|schemas)/ },
  { id:'html-direct', niveau:'warning', sev:'5.8', titre:'Écriture HTML directe',
    texte:'innerHTML ou document.write insère une chaîne dans le DOM.',
    aide:'Utiliser textContent, ou assainir la valeur avec une bibliothèque dédiée.',
    re:/\.innerHTML\s*=\s*[^=]|document\.write\s*\(/ },
  { id:'hachage-faible', niveau:'warning', sev:'6.5', titre:'Algorithme de hachage faible',
    texte:'MD5 ou SHA-1 employé pour un mot de passe ou une intégrité.',
    aide:'Utiliser bcrypt, scrypt ou Argon2id pour les mots de passe.',
    re:/(createHash\s*\(\s*['"](md5|sha1)['"]|\b(md5|sha1)\s*\()/i },
  { id:'tls-desactive', niveau:'warning', sev:'7.0', titre:'Vérification TLS désactivée',
    texte:'La vérification du certificat du pair est désactivée.',
    aide:'Réactiver la vérification ; installer la chaîne d\'autorités correcte.',
    re:/(rejectUnauthorized\s*:\s*false|verify\s*=\s*False)/ },
];

const args = process.argv.slice(2);
const cible = args.find(a => !a.startsWith('--'));
const iOut = args.indexOf('--out');
const sortie = iOut >= 0 ? args[iOut + 1] : 'audit.sarif';
if (!cible) { console.error('Usage: node tools/audit-sarif.mjs <depot|url> [--out rapport.sarif]'); process.exit(2); }

let racine, nom;
if (/^(https?:\/\/|git@)/.test(cible)) {
  racine = mkdtempSync(join(tmpdir(), 'sarif-'));
  execFileSync('git', ['clone','-q','--depth','1',cible,racine], { stdio:'pipe', timeout:180000 });
  nom = cible;
} else {
  if (!existsSync(cible)) { console.error('Introuvable :', cible); process.exit(3); }
  racine = cible; nom = cible;
}

function* marche(d){ let e; try { e = readdirSync(d,{withFileTypes:true}); } catch { return; }
  for (const x of e){ if (IGNORE.has(x.name)) continue; const p = join(d,x.name);
    if (x.isDirectory()) yield* marche(p); else if (x.isFile()) yield p; } }

const resultats = [];
let fichiersAnalyses = 0, lignesAnalysees = 0;

for (const f of marche(racine)) {
  const rel = relative(racine, f).replace(/\\/g,'/');
  if (/(^|\/)(test|tests|spec|__tests__|fixtures|examples?|mocks?)\//i.test(rel) || /\.(test|spec|min)\.[a-z]+$/i.test(rel)) continue;
  let st; try { st = statSync(f); } catch { continue; }
  if (st.size > MAX) continue;
  const dot = rel.lastIndexOf('.'); const ext = dot >= 0 ? rel.slice(dot).toLowerCase() : '';
  if (!TEXTE.has(ext) && !/(^|\/)(\.env|Dockerfile)/.test(rel)) continue;
  let contenu; try { contenu = readFileSync(f,'utf8'); } catch { continue; }
  if (contenu.includes('\u0000')) continue; // binaire
  fichiersAnalyses++;
  const lignes = contenu.split(/\r?\n/);
  lignesAnalysees += lignes.length;
  lignes.forEach((l, i) => {
    const t = l.trim();
    // On écarte les commentaires : un exemple cité dans un commentaire n'est pas une faille.
    if (t.startsWith('//') || t.startsWith('#') || t.startsWith('*') || t.startsWith('/*')) return;
    for (const r of REGLES) {
      if (!r.re.test(l)) continue;
      resultats.push({
        regle: r,
        emplacement: { uri: rel, region: { startLine: i+1, startColumn: Math.max(1, l.indexOf(t.slice(0,20))+1), snippet: { text: t.slice(0,200) } } },
      });
    }
  });
}

const parGravite = { error: 0, warning: 0, note: 0 };
for (const x of resultats) parGravite[x.regle.niveau] = (parGravite[x.regle.niveau] || 0) + 1;

const sarif = {
  $schema: 'https://raw.githubusercontent.com/oasis-tcs/sarif-spec/master/Schemata/sarif-schema-2.1.0.json',
  version: '2.1.0',
  runs: [{
    tool: {
      driver: {
        name: 'AuditCodeStatique',
        informationUri: 'https://aarrth8.github.io/audit-code-statique/',
        version: '1.0.0',
        rules: REGLES.map(r => ({
          id: r.id,
          name: r.id.replace(/-/g,'_'),
          shortDescription: { text: r.titre },
          fullDescription: { text: r.texte },
          helpUri: 'https://aarrth8.github.io/audit-code-statique/rapports/',
          help: { text: r.aide },
          defaultConfiguration: { level: r.niveau },
          properties: { 'security-severity': r.sev, tags: ['security','audit-statique'] },
        })),
      },
    },
    invocations: [{ executionSuccessful: true, commandLine: `audit-sarif.mjs ${cible}`,
      properties: { fichiersAnalyses, lignesAnalysees, analyseStatique: true, codeExecute: false } }],
    artifacts: [{ location: { uri: nom } }],
    results: resultats.map(x => ({
      ruleId: x.regle.id,
      level: x.regle.niveau,
      message: { text: `${x.regle.titre}. ${x.regle.texte} Correction : ${x.regle.aide}` },
      locations: [{ physicalLocation: { artifactLocation: { uri: x.emplacement.uri }, region: x.emplacement.region } }],
      properties: { 'security-severity': x.regle.sev },
    })),
  }],
};

writeFileSync(sortie, JSON.stringify(sarif, null, 2));
console.log(JSON.stringify({ cible: nom, fichiersAnalyses, lignesAnalysees, constats: resultats.length,
  parNiveau: parGravite, regles: REGLES.length, sarif: sortie,
  note: 'Format SARIF 2.1.0 — lisible par GitHub Security, VS Code, GitLab. Analyse statique, code non execute.' }, null, 2));
