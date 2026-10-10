#!/usr/bin/env node
/**
 * audit-statique.mjs — analyse statique de motifs. NE JAMAIS exécuter le code analysé.
 *
 *   node tools/audit-statique.mjs <dossier> [--json <chemin>] [--sortie <chemin>]
 *
 * --json  <chemin> : écrit le rapport complet en JSON
 * --sortie <chemin> : écrit un rapport lisible en Markdown  (NOUVEAU)
 *
 * Un constat = un motif à vérifier (fichier:ligne). Ce n'est PAS une vulnérabilité
 * confirmée. Aucun code de la cible n'est exécuté. Aucun fichier de la cible n'est modifié.
 */
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, relative, extname } from 'node:path';

const REGLES = [
  { id: 'exec-shell', gravite: 'eleve', constat: 'exécution de commande shell',
    test: (l) => /(child_process|execSync|spawnSync|os\.system|subprocess|shell_exec|popen)\s*\(/.test(l) && /\$\{|\+|\binput\b|\breq\b|\bargv\b/.test(l) },
  { id: 'secret-en-dur', gravite: 'eleve', constat: 'secret ou identifiant en dur',
    test: (l) => /(password|passwd|secret|api[_-]?key|token|apikey)\s*[:=]\s*['"][^'"]{6,}['"]/i.test(l) && !/(exemple|example|placeholder|changeme|xxx|votre)/i.test(l) },
  { id: 'innerhtml', gravite: 'moyen', constat: 'affectation innerHTML (XSS si entrée non fiable)',
    test: (l) => /\.innerHTML\s*=/.test(l) && !/['"]\s*['"]\s*;?\s*$/.test(l) },
  { id: 'eval-dyn', gravite: 'eleve', constat: 'évaluation dynamique de code',
    test: (l) => /\beval\s*\(|new\s+Function\s*\(/.test(l) },
  { id: 'cors-ouvert', gravite: 'moyen', constat: 'CORS ouvert à toutes les origines',
    test: (l) => /Access-Control-Allow-Origin['"]?\s*[,:]\s*['"]\*['"]/.test(l) },
  { id: 'sql-concat', gravite: 'eleve', constat: 'requête SQL construite par concaténation',
    test: (l) => /(SELECT|INSERT|UPDATE|DELETE)\b[^;'"`]*['"`]\s*\+/i.test(l) },
  { id: 'http-sans-tls', gravite: 'faible', constat: 'URL http:// en clair',
    test: (l) => /['"]http:\/\//.test(l) && !/localhost|127\.0\.0\.1|schema|w3\.org|xmlns/i.test(l) },
];

const IGNORE_DIR = new Set(['.git', 'node_modules', 'dist', 'build', '.next', 'vendor', 'coverage', '__pycache__']);
const CODE_EXT = new Set(['.js', '.mjs', '.cjs', '.ts', '.tsx', '.jsx', '.py', '.php', '.rb', '.java', '.go', '.rs', '.c', '.h', '.cpp', '.cs', '.sh', '.sql', '.vue', '.svelte']);
const TEST_HINT = /(^|\/)(test|tests|spec|__tests__|fixtures?|examples?|demos?|docs?)(\/|$)|\.(test|spec)\./i;

const cible = process.argv[2];
if (!cible) { console.error('Usage: node tools/audit-statique.mjs <dossier> [--json <chemin>] [--sortie <chemin>]'); process.exit(2); }

const outJson = (() => { const i = process.argv.indexOf('--json'); return i > -1 ? process.argv[i + 1] : null; })();
const outMd = (() => { const i = process.argv.indexOf('--sortie'); return i > -1 ? process.argv[i + 1] : null; })();

function* parcourir(dir) {
  let entrees;
  try { entrees = readdirSync(dir, { withFileTypes: true }); } catch { return; }
  for (const e of entrees) {
    if (e.isDirectory()) { if (!IGNORE_DIR.has(e.name)) yield* parcourir(join(dir, e.name)); }
    else if (e.isFile() && CODE_EXT.has(extname(e.name).toLowerCase())) yield join(dir, e.name);
  }
}

const constats = [];
let fichiersVus = 0;
for (const fichier of parcourir(cible)) {
  fichiersVus++;
  const rel = relative(cible, fichier).replace(/\\/g, '/');
  let lignes;
  try { lignes = readFileSync(fichier, 'utf8').split(/\r?\n/); } catch { continue; }
  lignes.forEach((ligne, i) => {
    if (ligne.length > 500 || /^\s*(\/\/|#|\*)/.test(ligne)) return;
    for (const r of REGLES) {
      if (r.test(ligne)) {
        constats.push({ regle: r.id, gravite: r.gravite, constat: r.constat, fichier: rel, ligne: i + 1,
          extrait: ligne.trim().slice(0, 160), contexte: TEST_HINT.test(rel) ? 'test/demo/doc' : 'production' });
      }
    }
  });
}

const prod = constats.filter(c => c.contexte === 'production');
const graves = prod.filter(c => c.gravite === 'eleve');
const rapport = {
  cible, quand: new Date().toISOString(), fichiersAnalyses: fichiersVus,
  methode: 'Analyse statique par motifs. Code non exécuté, dépôt non modifié. Un constat est un motif à vérifier, pas une vulnérabilité confirmée.',
  resume: {
    constatsTotal: constats.length, constatsProduction: prod.length, constatsGravesProduction: graves.length,
    parGravite: constats.reduce((a, c) => (a[c.gravite] = (a[c.gravite] || 0) + 1, a), {}),
  },
  constats,
};

if (outJson) writeFileSync(outJson, JSON.stringify(rapport, null, 2));

if (outMd) {
  const L = [];
  L.push(`# Rapport d'analyse statique\n`);
  L.push(`- **Cible :** \`${cible}\``);
  L.push(`- **Date :** ${rapport.quand}`);
  L.push(`- **Fichiers analysés :** ${fichiersVus}`);
  L.push(`- **Constats :** ${constats.length} (dont ${prod.length} en code de production, ${graves.length} de gravité élevée en production)\n`);
  L.push(`> Un constat est un **motif à vérifier** (fichier:ligne). Ce n'est pas une vulnérabilité confirmée. Aucun code de la cible n'a été exécuté ni modifié.\n`);
  const parG = ['eleve', 'moyen', 'faible'];
  for (const g of parG) {
    const liste = prod.filter(c => c.gravite === g);
    if (!liste.length) continue;
    L.push(`\n## Gravité ${g} — code de production (${liste.length})\n`);
    for (const c of liste) L.push(`- **${c.constat}** — \`${c.fichier}:${c.ligne}\`  \n  \`${c.extrait}\``);
  }
  const tests = constats.filter(c => c.contexte !== 'production');
  if (tests.length) {
    L.push(`\n## Hors production (tests / docs / exemples) — ${tests.length}\n`);
    for (const c of tests) L.push(`- ${c.constat} — \`${c.fichier}:${c.ligne}\``);
  }
  L.push(`\n---\n*Généré par audit-statique.mjs. Vérifiable : relancer la commande sur le même dépôt reproduit ce rapport.*`);
  writeFileSync(outMd, L.join('\n'));
}

console.log(JSON.stringify(rapport.resume, null, 2));
console.log(`\nRapport JSON: ${outJson || '(non écrit)'}`);
console.log(`Rapport MD  : ${outMd || '(non écrit)'}`);
for (const c of graves.slice(0, 10)) console.log(`  [${c.gravite}] ${c.constat} — ${c.fichier}:${c.ligne}`);
