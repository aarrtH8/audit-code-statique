#!/usr/bin/env node
/**
 * audit-client.mjs — auditeur AUTONOME, à lancer par le client sur son propre code.
 * Zéro dépendance, zéro réseau, zéro installation. Un seul fichier.
 *
 *   node audit-client.mjs <dossier-ou-depot> [--sortie rapport.md]
 *
 * - Si l'argument ressemble à une URL git, le dépôt est cloné en lecture seule.
 * - Sinon, le dossier local est analysé directement.
 * - Le code n'est JAMAIS exécuté. Rien n'est modifié.
 * - Produit un rapport fichier:ligne + un MANIFEST.json (SHA-256) que le client
 *   peut recalculer lui-même pour prouver l'authenticité.
 */
import { readdirSync, readFileSync, writeFileSync, existsSync, statSync, mkdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, dirname, extname, basename } from 'node:path';
import { execFileSync } from 'node:child_process';

const EXTS = new Set(['.js','.mjs','.cjs','.ts','.tsx','.jsx','.py','.php','.rb','.go','.java','.rb','.sql','.sh','.yml','.yaml','.env','.json']);
const IGNORE = new Set(['node_modules','.git','dist','build','.next','vendor','__pycache__','.venv','venv','coverage']);
const TESTS = /(^|[\\/])(test|tests|spec|specs|__tests__|fixtures?|mocks?)([\\/]|$)|\.(test|spec)\./i;
const DOCS = /\.(md|txt|rst)$/i;

const REGLES = [
  { id:'EXEC_SHELL', gravite:'haute', rx:/\b(execSync|exec|spawnSync|spawn|system|shell_exec|popen|subprocess\.(run|call|Popen)|os\.system)\s*\(/g, quoi:"Exécution de commande / shell" },
  { id:'EVAL', gravite:'haute', rx:/\b(eval|Function)\s*\(/g, quoi:"Évaluation dynamique de code" },
  { id:'SECRET', gravite:'haute', rx:/(password|passwd|secret|api[_-]?key|token|private[_-]?key)\s*[:=]\s*['"][^'"]{6,}['"]/gi, quoi:"Secret possible en dur" },
  { id:'INNERHTML', gravite:'moyenne', rx:/\.innerHTML\s*=|dangerouslySetInnerHTML/g, quoi:"Insertion HTML (risque XSS si donnée non fiable)" },
  { id:'CORS_OPEN', gravite:'moyenne', rx:/Access-Control-Allow-Origin['"]?\s*[:,]\s*['"]\*/g, quoi:"CORS ouvert à toutes les origines" },
  { id:'SQL_CONCAT', gravite:'moyenne', rx:/(SELECT|INSERT|UPDATE|DELETE)[^;]{0,80}(['"]\s*\+|\+\s*['"])/gi, quoi:"Concaténation SQL possible" },
  { id:'HTTP_CLAIR', gravite:'basse', rx:/['"]http:\/\/[a-z0-9.-]+/gi, quoi:"URL http en clair" },
];

function* fichiers(racine) {
  for (const e of readdirSync(racine, { withFileTypes: true })) {
    if (IGNORE.has(e.name)) continue;
    const p = join(racine, e.name);
    if (e.isDirectory()) yield* fichiers(p);
    else if (EXTS.has(extname(e.name).toLowerCase())) yield p;
  }
}

function analyser(racine) {
  const constats = [];
  for (const f of fichiers(racine)) {
    let txt; try { txt = readFileSync(f, 'utf8'); } catch { continue; }
    if (txt.includes('\0')) continue;
    const lignes = txt.split('\n');
    const estTest = TESTS.test(f), estDoc = DOCS.test(f);
    for (const r of REGLES) {
      r.rx.lastIndex = 0;
      for (let i = 0; i < lignes.length; i++) {
        r.rx.lastIndex = 0;
        if (!r.rx.test(lignes[i])) continue;
        constats.push({ regle:r.id, gravite:r.gravite, quoi:r.quoi,
          fichier: f.replace(racine, '').replace(/^[\\/]/, ''),
          ligne: i+1, contexte: lignes[i].trim().slice(0,160),
          categorie: estTest ? 'test' : estDoc ? 'doc' : 'production' });
      }
    }
  }
  return constats;
}

const arg = process.argv[2];
if (!arg) { console.error('Usage: node audit-client.mjs <dossier-ou-depot> [--sortie rapport.md]'); process.exit(2); }
const idx = process.argv.indexOf('--sortie');
const sortieMd = idx > -1 ? process.argv[idx+1] : 'rapport-audit.md';

let cible = arg, estUrl = /^(https?:\/\/|git@)/.test(arg);
let depot = estUrl ? arg : '(dossier local)';
if (estUrl) {
  const tmp = join(process.cwd(), '.audit-clone-' + Date.now());
  console.log('Clone lecture seule de', arg);
  execFileSync('git', ['clone','--depth','1',arg,tmp], { stdio:'inherit', timeout:180000 });
  cible = tmp;
}
if (!existsSync(cible)) { console.error('Cible introuvable:', cible); process.exit(2); }

console.log('Analyse statique (code non exécuté) ...');
const constats = analyser(cible);
const n = d => constats.filter(c => c.gravite === d).length;
const prod = constats.filter(c => c.categorie === 'production').length;

const parRegle = {};
for (const c of constats) (parRegle[c.regle] ??= []).push(c);

let md = `# Rapport d'audit statique\n\n`;
md += `- **Dépôt / dossier** : ${depot}\n- **Date** : ${new Date().toISOString()}\n`;
md += `- **Méthode** : analyse statique de motifs, code NON exécuté, aucune modification.\n\n`;
md += `> **Limite explicite** : un motif détecté n'est PAS une vulnérabilité confirmée. `;
md += `Il doit être vérifié manuellement. Ce balayage n'est pas exhaustive.\n\n`;
md += `## Résumé\n\n| Gravité | Nombre |\n|---|---|\n`;
md += `| haute | ${n('haute')} |\n| moyenne | ${n('moyenne')} |\n| basse | ${n('basse')} |\n`;
md += `| **total** | **${constats.length}** |\n\n`;
md += `Dont ${prod} en code de production, ${constats.length - prod} en tests/docs.\n\n`;

for (const gravite of ['haute','moyenne','basse']) {
  const liste = constats.filter(c => c.gravite === gravite);
  if (!liste.length) continue;
  md += `## Gravité ${gravite} (${liste.length})\n\n`;
  for (const c of liste) {
    md += `- **${c.quoi}** — \`${c.fichier}:${c.ligne}\` [${c.categorie}]\n  \`\`\`\n  ${c.contexte}\n  \`\`\`\n`;
  }
  md += `\n`;
}
if (!constats.length) md += `Aucun motif détecté par ces règles. Cela ne prouve pas l'absence de faille.\n`;

writeFileSync(sortieMd, md);
const sha = createHash('sha256').update(readFileSync(sortieMd)).digest('hex');
writeFileSync('MANIFEST.json', JSON.stringify({
  depot, quand: new Date().toISOString(), rapport: sortieMd, sha256: sha,
  commande: `node audit-client.mjs ${arg} --sortie ${sortieMd}`,
  note: "Motif != vulnérabilité confirmée. Code non exécuté, dépôt non modifié.",
}, null, 2));

console.log(`\nRapport écrit : ${sortieMd}`);
console.log(`Motifs : ${constats.length} (haute ${n('haute')}, moyenne ${n('moyenne')}, basse ${n('basse')})`);
console.log(`SHA-256 : ${sha}`);
console.log(`Vérifiez vous-même :  certutil -hashfile "${sortieMd}" SHA256`);
