#!/usr/bin/env node
/**
 * audit-depot.mjs <dossier-ou-url-git> [--rapport sortie.html]
 * VERSION 2 — réduit les faux positifs, indice de propreté log-échelonné, tri par contexte.
 * N'exécute JAMAIS le code analysé.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, readdirSync, statSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, relative } from 'node:path';

const IGNORE = new Set(['node_modules','.git','dist','build','.next','vendor','__pycache__','coverage','.venv','venv','.cache','test','tests','__tests__','spec','docs','examples','example']);
const TEXTE = new Set(['.js','.mjs','.cjs','.ts','.tsx','.jsx','.py','.rb','.php','.go','.java','.cs','.env','.yml','.yaml','.sh','.sql','.conf','.ini','.tf']);
const MAX = 512 * 1024;

const args = process.argv.slice(2);
const cible = args.find(a => !a.startsWith('--'));
const iRap = args.indexOf('--rapport');
const sortie = iRap >= 0 ? args[iRap + 1] : 'rapport-audit.html';
const inclusTests = args.includes('--avec-tests');
if (!cible) { console.error('Usage: node tools/audit-depot.mjs <dossier|url-git> [--rapport out.html]'); process.exit(2); }

let racine = cible, tmp = null;
if (/^(https?:\/\/|git@)/.test(cible)) {
  tmp = mkdtempSync(join(tmpdir(), 'audit-'));
  try { execFileSync('git', ['clone','-q','--depth','1',cible,tmp], { stdio:'pipe', timeout: 180000 }); racine = tmp; }
  catch (e) { console.error('Clone impossible :', String(e.message).split('\n')[0]); process.exit(3); }
} else if (!existsSync(cible)) { console.error('Introuvable :', cible); process.exit(3); }

function* marche(d) {
  let e; try { e = readdirSync(d, { withFileTypes: true }); } catch { return; }
  for (const x of e) {
    if (IGNORE.has(x.name)) continue;
    const p = join(d, x.name);
    if (x.isDirectory()) yield* marche(p); else if (x.isFile()) yield p;
  }
}

// Un fichier de test/exemple est une cible légitime d'exclusion (faux positifs structurels).
function estFichierTest(rel) {
  return /(^|\/)(test|tests|spec|__tests__|fixtures|examples?|benchmark)\//i.test(rel)
      || /\.(test|spec)\.[a-z]+$/i.test(rel)
      || /(^|\/)[^/]*\.(mock|stub)\.[a-z]+$/i.test(rel);
}

// Allure "exemple/documentation" dans le code : valeurs manifestement fictives.
const EXEMPLE = /(example|exemple|dummy|fake|placeholder|your[_-]?key|xxxx|abc123|changeme|sk_test_|test[_-]?key|<[A-Z_]+>|\.\.\.)/i;

const REGLES = [
  { id:'secret', g:'critique', t:'Secret probable en dur',
    re:/(api[_-]?key|secret|passwd|password|private[_-]?key|access[_-]?key)\s*[:=]\s*['"]([A-Za-z0-9_\-\.\/\+]{16,})['"]/i,
    p:'Une clé en clair dans le dépôt reste dans l\'historique Git même après suppression.',
    c:'Révoquer la clé, la déplacer dans une variable d\'environnement, purger l\'historique.' },
  { id:'aws', g:'critique', t:'Clé AWS en dur', re:/\bAKIA[0-9A-Z]{16}\b/,
    p:'Format de clé d\'accès AWS exploitable directement.',
    c:'Révoquer immédiatement dans IAM, utiliser des rôles temporaires.' },
  { id:'eval', g:'eleve', t:'Exécution dynamique de code',
    re:/\b(eval|new\s+Function)\s*\(/,
    p:'Si l\'entrée provient d\'un utilisateur, cela équivaut à une exécution de code arbitraire.',
    c:'Remplacer par un analyseur explicite.' },
  { id:'sqli', g:'eleve', t:'Requête SQL construite par concaténation',
    re:/(SELECT|INSERT|UPDATE|DELETE)[^;'"`]{0,120}(\+\s*[\w$]|`\s*\$\{|\$\{)/i,
    p:'Concaténer une entrée dans une requête ouvre la porte à l\'injection SQL.',
    c:'Utiliser des requêtes paramétrées.' },
  { id:'cmdinj', g:'critique', t:'Commande système avec entrée concaténée',
    re:/(exec|execSync|spawnSync|spawn)\s*\(\s*[^)]{0,80}(\+|\$\{)/,
    p:'Concaténation d\'entrée dans une commande système : exécution de commande arbitraire possible.',
    c:'Passer les arguments sous forme de tableau, sans passer par un shell.' },
  { id:'cors', g:'moyen', t:'CORS ouvert à toutes les origines',
    re:/Access-Control-Allow-Origin['"]?\s*[:=]\s*['"]\*['"]|origin\s*:\s*['"]\*['"]/i,
    p:'Une origine générique autorise n\'importe quel site à lire les réponses de l\'API.',
    c:'Restreindre aux origines réellement utilisées.' },
  { id:'http', g:'moyen', t:'URL HTTP non chiffrée',
    re:/["'`]http:\/\/(?!localhost|127\.0\.0\.1|0\.0\.0\.0|schemas?\.|www\.w3\.org|example\.com)/,
    p:'Données (jetons, mots de passe) lisibles en transit.',
    c:'Passer en HTTPS.' },
  { id:'innerHTML', g:'moyen', t:'Écriture HTML directe (risque XSS)',
    re:/\.innerHTML\s*=\s*[^=]|document\.write\s*\(/,
    p:'Injecter une donnée non échappée dans le DOM exécute du script dans le navigateur.',
    c:'Utiliser textContent ou échapper.' },
  { id:'mdp', g:'moyen', t:'Hachage faible pour mot de passe',
    re:/(createHash\s*\(\s*['"](md5|sha1)['"]|\b(md5|sha1)\s*\()/i,
    p:'MD5/SHA1 sont inadaptés au stockage de mots de passe.',
    c:'Utiliser bcrypt, scrypt ou Argon2.' },
  { id:'verif', g:'bas', t:'Vérification TLS désactivée',
    re:/(rejectUnauthorized\s*:\s*false|verify\s*=\s*False|InsecureSkipVerify\s*:\s*true)/,
    p:'Désactiver la vérification TLS rend le chiffrement décoratif.',
    c:'Réactiver la vérification.' },
];

const constats = [];
let fichiersAnalyses = 0, lignesAnalysees = 0, fichiersExclusTests = 0;

for (const f of marche(racine)) {
  const rel = relative(racine, f).replace(/\\/g, '/');
  if (!inclusTests && estFichierTest(rel)) { fichiersExclusTests++; continue; }
  let st; try { st = statSync(f); } catch { continue; }
  if (st.size > MAX) continue;
  const dot = rel.lastIndexOf('.');
  const ext = dot >= 0 ? rel.slice(dot).toLowerCase() : '';
  if (!TEXTE.has(ext) && !/(^|\/)(\.env|Dockerfile|Makefile)/.test(rel)) continue;
  let contenu; try { contenu = readFileSync(f, 'utf8'); } catch { continue; }
  fichiersAnalyses++;
  const lignes = contenu.split(/\r?\n/);
  lignesAnalysees += lignes.length;
  lignes.forEach((l, i) => {
    const t = l.trim();
    if (t.startsWith('//') || t.startsWith('#') || t.startsWith('*')) return;
    for (const r of REGLES) {
      if (!r.re.test(l)) continue;
      // Faux positif manifeste : valeur d'exemple, documentation.
      if ((r.id === 'secret' || r.id === 'aws') && EXEMPLE.test(l)) continue;
      constats.push({ regle:r.id, gravite:r.g, titre:r.t, fichier:rel, ligne:i + 1,
        extrait:t.slice(0, 160), pourquoi:r.p, correction:r.c });
    }
  });
}

const vus = new Set();
const uniques = constats.filter(c => { const k = `${c.regle}|${c.fichier}|${c.ligne}`; if (vus.has(k)) return false; vus.add(k); return true; });
const parGravite = { critique: [], eleve: [], moyen: [], bas: [] };
for (const c of uniques) parGravite[c.gravite].push(c);

// Indice de propreté : log-échelonné sur la densité de constats pondérés pour 1000 lignes.
// Un gros projet sain n'est pas pénalisé comme un petit projet truffé d'erreurs.
const pond = { critique: 40, eleve: 12, moyen: 3, bas: 1 };
const points = uniques.reduce((s, c) => s + pond[c.gravite], 0);
const densite = lignesAnalysees > 0 ? (points * 1000) / lignesAnalysees : 0;
const score = Math.max(0, Math.round(100 * Math.exp(-densite / 6)));

const esc = s => String(s == null ? '' : s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const LABEL = { critique:'Critique', eleve:'Élevé', moyen:'Moyen', bas:'Faible' };
const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
const verdict = score >= 85 ? 'Bon' : score >= 60 ? 'Correct, points à revoir' : score >= 35 ? 'Fragile' : 'Préoccupant';

function bloc(liste) {
  if (!liste.length) return '<p class="vide">Aucun constat de cette catégorie.</p>';
  return liste.map(c => `
<div class="constat ${c.gravite}">
  <div class="entet"><span class="badge ${c.gravite}">${LABEL[c.gravite]}</span>
    <strong>${esc(c.titre)}</strong><code>${esc(c.fichier)}:${c.ligne}</code></div>
  <pre>${esc(c.extrait)}</pre>
  <p><span class="k">Pourquoi :</span> ${esc(c.pourquoi)}</p>
  <p><span class="k">Correction :</span> ${esc(c.correction)}</p>
</div>`).join('\n');
}

const html = `<!DOCTYPE html>
<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Rapport d'audit statique — ${esc(cible)}</title>
<style>
:root{--bg:#0d1117;--panel:#161b22;--bord:#30363d;--fg:#c9d1d9;--dim:#8b949e;--crit:#f85149;--eleve:#db6d28;--moyen:#d29922;--bas:#58a6ff;--ok:#3fb950}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--fg);font-family:system-ui,-apple-system,sans-serif;line-height:1.65}
.wrap{max-width:960px;margin:0 auto;padding:28px 20px 80px}h1{color:#fff;font-size:1.5rem;margin:0 0 4px}
h2{color:#fff;font-size:1.12rem;margin-top:34px;border-bottom:1px solid var(--bord);padding-bottom:6px}
.sub{color:var(--dim);font-size:.9rem}code{font-family:ui-monospace,Consolas,monospace;font-size:.85rem}
.grille{display:flex;gap:12px;flex-wrap:wrap;margin:18px 0}
.stat{background:var(--panel);border:1px solid var(--bord);border-radius:8px;padding:12px 16px;min-width:120px}
.stat .n{font-size:1.4rem;font-weight:700;color:#fff}.stat .l{font-size:.78rem;color:var(--dim);text-transform:uppercase;letter-spacing:.04em}
.constat{background:var(--panel);border:1px solid var(--bord);border-left-width:4px;border-radius:8px;padding:12px 16px;margin:12px 0}
.constat.critique{border-left-color:var(--crit)}.constat.eleve{border-left-color:var(--eleve)}
.constat.moyen{border-left-color:var(--moyen)}.constat.bas{border-left-color:var(--bas)}
.entet{display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-bottom:6px}
.entet code{color:var(--dim)}
.badge{font-size:.72rem;font-weight:700;padding:2px 8px;border-radius:999px;text-transform:uppercase;letter-spacing:.03em}
.badge.critique{background:#3d1418;color:var(--crit)}.badge.eleve{background:#3a2110;color:var(--eleve)}
.badge.moyen{background:#3d2f10;color:var(--moyen)}.badge.bas{background:#10243d;color:var(--bas)}
pre{background:#010409;border:1px solid var(--bord);border-radius:6px;padding:9px 11px;overflow:auto;margin:8px 0}
.k{color:var(--dim);font-weight:600}
.vide{color:var(--dim);font-style:italic}
.lim{background:var(--panel);border-left:3px solid var(--moyen);padding:12px 16px;margin:18px 0;font-size:.88rem;color:var(--dim)}
.verdict{font-size:1.05rem;font-weight:700;color:#fff}
footer{margin-top:44px;border-top:1px solid var(--bord);padding-top:16px;color:var(--dim);font-size:.84rem}
a{color:#58a6ff}
</style></head><body><div class="wrap">
<h1>Rapport d'audit statique</h1>
<p class="sub">Cible : <code>${esc(cible)}</code> · Généré le ${date}${fichiersExclusTests ? ` · ${fichiersExclusTests} dossier(s) de tests/exemples écarté(s)` : ''}</p>

<div class="grille">
  <div class="stat"><div class="n">${score}<span style="font-size:.8rem">/100</span></div><div class="l">Indice de propreté</div></div>
  <div class="stat"><div class="n">${uniques.length}</div><div class="l">Constats</div></div>
  <div class="stat"><div class="n" style="color:var(--crit)">${parGravite.critique.length}</div><div class="l">Critiques</div></div>
  <div class="stat"><div class="n">${fichiersAnalyses}</div><div class="l">Fichiers analysés</div></div>
  <div class="stat"><div class="n">${lignesAnalysees.toLocaleString('fr-FR')}</div><div class="l">Lignes lues</div></div>
</div>

<p><span class="verdict">Verdict : ${verdict}.</span>
Densité de risque ${densite.toFixed(2)} points / 1 000 lignes.</p>

<div class="lim">
<strong>Ce que ce rapport est et n'est pas.</strong>
Analyse statique par motifs : le code n'a <strong>jamais été exécuté</strong>.
Un constat décrit une <em>construction à risque détectée dans le texte source</em>, pas une vulnérabilité
forcément exploitable. Les tests, exemples et valeurs fictives sont écartés par défaut (option <code>--avec-tests</code> pour les inclure).
Ce rapport ne garantit pas l'absence de vulnérabilité : il hiérarchise les points à examiner.
</div>

<h2>Constats critiques (${parGravite.critique.length})</h2>${bloc(parGravite.critique)}
<h2>Constats élevés (${parGravite.eleve.length})</h2>${bloc(parGravite.eleve)}
<h2>Constats moyens (${parGravite.moyen.length})</h2>${bloc(parGravite.moyen)}
<h2>Constats faibles (${parGravite.bas.length})</h2>${bloc(parGravite.bas)}

<h2>Plan de correction priorisé</h2>
<ol>
${parGravite.critique.length ? '<li><strong>Immédiat</strong> — révoquer tout secret exposé, retirer les exécutions dynamiques atteignables par une entrée.</li>' : ''}
${parGravite.eleve.length ? '<li><strong>Sous 7 jours</strong> — corriger les injections et l\'échappement des sorties.</li>' : ''}
${parGravite.moyen.length ? '<li><strong>Ce mois</strong> — restreindre CORS, passer en HTTPS, remplacer les hachages faibles.</li>' : ''}
${parGravite.bas.length ? '<li><strong>Entretien</strong> — vérification TLS, modes debug.</li>' : ''}
<li><strong>Ensuite</strong> — ajouter cette analyse en intégration continue pour éviter la réintroduction.</li>
</ol>

<footer>
Rapport produit par l'auditeur statique autonome (aucun code exécuté, aucun fichier modifié).<br>
Prestation : audit de code statique — Arthur Grossi EI · arthhur.grossi@gmail.com<br>
Faux positifs à arbitrer lors de la restitution.
</footer>
</div></body></html>`;

writeFileSync(sortie, html);
console.log(JSON.stringify({
  cible, fichiersAnalyses, lignesAnalysees, fichiersExclusTests,
  constats: uniques.length,
  parGravite: Object.fromEntries(Object.entries(parGravite).map(([k, v]) => [k, v.length])),
  densite: Number(densite.toFixed(2)), indiceProprete: score, verdict, rapport: sortie,
}, null, 2));
