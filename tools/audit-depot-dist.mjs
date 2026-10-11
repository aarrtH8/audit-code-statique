#!/usr/bin/env node
// audit-depot-dist.mjs — Audit d'un dépôt PUBLIC par URL, sans cloner, sans accès privé.
//
// v3 (12/10/2026) — deux correctifs appris en production :
//  1) v1 passait par l'API GitHub /contents : quota anonyme 60 req/h => page publique cassée.
//     Ici : UNE archive tarball (1 requête), lecture en flux, rien écrit sur disque,
//     aucun code du dépôt exécuté.
//  2) v2 se signalait lui-même : les fichiers qui ne sont que des DÉFINITIONS de motifs
//     (ce script, fichiers de config de scanners) produisaient de faux positifs.
//     Exclus via EXCLU, ET filtre « ligne-definition » ci-dessous.
//
// Limite honnête, écrite dans le rapport : l'analyse porte sur l'arbre du commit par défaut.
// Un secret retiré du dernier commit mais resté dans l'HISTORIQUE n'est PAS vu ici.

import fs from 'node:fs';
import zlib from 'node:zlib';

const args = process.argv.slice(2);
const cible = args[0];
if (!cible || !cible.includes('/')) {
  console.error('Usage: node tools/audit-depot-dist.mjs <owner/repo> [--max-fichiers N] [--out fichier.md]');
  process.exit(2);
}
const opt = (nom, def) => { const i = args.indexOf(nom); return i >= 0 ? args[i + 1] : def; };
const MAX_FICH = Number(opt('--max-fichiers', '400'));

const [owner, repo] = cible.split('/');
const TOK = process.env.GITHUB_TOKEN || null;

const MOTIFS = [
  { id: 'aws-key',     niveau: 'secret', re: /AKIA[0-9A-Z]{16}/g, quoi: "Clé d'accès AWS en clair" },
  { id: 'stripe-live', niveau: 'secret', re: /sk_live_[0-9a-zA-Z]{20,}/g, quoi: 'Clé secrète Stripe live en clair' },
  { id: 'openai-key',  niveau: 'secret', re: /sk-[A-Za-z0-9]{24,}/g, quoi: 'Clé type OpenAI' },
  { id: 'google-api',  niveau: 'secret', re: /AIza[0-9A-Za-z\-_]{35}/g, quoi: 'Clé API Google' },
  { id: 'private-key', niveau: 'secret', re: /-----BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY-----/g, quoi: 'Clé privée dans le dépôt' },
  { id: 'gh-token',    niveau: 'secret', re: /gh[pousr]_[A-Za-z0-9]{36,}/g, quoi: 'Jeton GitHub en clair' },
  { id: 'slack-token', niveau: 'secret', re: /xox[baprs]-[A-Za-z0-9-]{10,}/g, quoi: 'Jeton Slack' },
  { id: 'db-url',      niveau: 'motif', re: /(postgres|mysql|mongodb(\+srv)?):\/\/[^\s'"`]{8,}/g, quoi: 'URL de base de données (peut contenir un mot de passe)' },
  { id: 'password',    niveau: 'motif', re: /(password|passwd|secret|api[_-]?key)\s*[:=]\s*['"][^'"]{6,}['"]/gi, quoi: 'Affectation de secret ou mot de passe' },
  { id: 'eval',        niveau: 'motif', re: /\beval\s*\(/g, quoi: 'eval() — exécution de code dynamique' },
  { id: 'html-inject', niveau: 'motif', re: /\.innerHTML\s*=/g, quoi: 'innerHTML — injection HTML possible si la valeur est externe' },
  { id: 'jwt-hard',    niveau: 'motif', re: /(jwt|JWT)[_-]?(secret|key)\s*[:=]\s*['"][^'"]{6,}['"]/g, quoi: 'Secret JWT en dur' }
];

const TEXTE = /\.(m?[jt]sx?|cjs|py|rb|php|go|rs|java|cs|kt|swift|sh|bash|ps1|sql|ya?ml|json|env|ini|cfg|conf|toml|md|txt|html?|vue|svelte)$/i;
const IGNORE = /(^|\/)(node_modules|vendor|dist|build|\.git|coverage|\.next|target)(\/|$)/;
// Fichiers exclus : verrous, minifiés, et — crucial — les scanners qui ne contiennent
// que des DÉFINITIONS de motifs (sinon le guichet se signale lui-même).
const EXCLU = /(package-lock\.json|yarn\.lock|pnpm-lock\.yaml|\.min\.(js|css)|audit-depot-dist\.mjs|gitleaks|detect-secrets|\.gitguardian|secret-scan)/i;
// Une ligne qui ne fait que DÉCLARER un motif (regex, ex. de doc) n'est pas un secret.
const LIGNE_DEFINITION = /(MOTIFS|re\s*:|regex|pattern|RegExp|\bquoi\s*:|exemple|example|placeholder|xxxx|<votre|your[_-]?key)/i;

const jour = new Date().toISOString().slice(0, 10);
console.log(`# Audit distant : ${owner}/${repo}`);

const urls = [
  `https://codeload.github.com/${owner}/${repo}/tar.gz/HEAD`,
  `https://codeload.github.com/${owner}/${repo}/tar.gz/refs/heads/main`,
  `https://codeload.github.com/${owner}/${repo}/tar.gz/refs/heads/master`
];

async function recupererArchive() {
  for (const u of urls) {
    const r = await fetch(u, { headers: { 'User-Agent': 'audit-code-statique', ...(TOK ? { Authorization: `Bearer ${TOK}` } : {}) } });
    if (r.ok) return { buf: Buffer.from(await r.arrayBuffer()), url: u };
    if (r.status === 404) continue;
    if (r.status === 429) return { erreur: 'GitHub limite temporairement les téléchargements. Réessayez dans quelques minutes.' };
  }
  return { erreur: 'Dépôt introuvable ou privé. Vérifiez l’URL exacte.' };
}

const arch = await recupererArchive();
if (arch.erreur) { console.error('ECHEC:', arch.erreur); process.exit(1); }

let tar;
try { tar = zlib.gunzipSync(arch.buf); }
catch { console.error('ECHEC: archive illisible'); process.exit(1); }

function lireTar(buf) {
  const fichiers = [];
  let off = 0;
  while (off + 512 <= buf.length) {
    const bloc = buf.subarray(off, off + 512);
    if (bloc.every(b => b === 0)) break;
    const nom = bloc.subarray(0, 100).toString('utf8').replace(/\0.*$/, '');
    const taille = parseInt(bloc.subarray(124, 136).toString('utf8').replace(/\0.*$/, '').trim(), 8) || 0;
    const type = bloc.subarray(156, 157).toString('utf8');
    const data = buf.subarray(off + 512, off + 512 + taille);
    const prefixe = bloc.subarray(345, 500).toString('utf8').replace(/\0.*$/, '');
    const chemin = (prefixe ? prefixe + '/' : '') + nom;
    if (type === '0' || type === '\0' || type === '') fichiers.push({ chemin, data });
    off += 512 + Math.ceil(taille / 512) * 512;
  }
  return fichiers;
}

const tous = lireTar(tar);
const nettoyer = c => c.replace(/^[^/]+\//, '');
const analysables = tous
  .map(f => ({ ...f, chemin: nettoyer(f.chemin) }))
  .filter(f => !IGNORE.test(f.chemin) && !EXCLU.test(f.chemin) && TEXTE.test(f.chemin) && f.data.length < 400 * 1024);

const tronque = analysables.length > MAX_FICH;
const aLire = analysables.slice(0, MAX_FICH);
console.log(`- fichiers texte trouvés : ${analysables.length} (analysés : ${aLire.length}${tronque ? ', LISTE TRONQUÉE' : ''})`);

const trouvailles = [];
for (const f of aLire) {
  let texte;
  try { texte = f.data.toString('utf8'); } catch { continue; }
  const lignes = texte.split('\n');
  for (const m of MOTIFS) {
    const re = new RegExp(m.re.source, m.re.flags);
    let mm, n = 0;
    while ((mm = re.exec(texte)) !== null && n < 3) {
      n++;
      const ligne = texte.slice(0, mm.index).split('\n').length;
      const contenuLigne = lignes[ligne - 1] || '';
      if (LIGNE_DEFINITION.test(contenuLigne)) continue; // définition/documentation, pas un secret en service
      const ctx = /\b(test|spec|example|fixture|mock|sample|demo)\b/i.test(f.chemin) ? 'exemple/test' : 'code';
      trouvailles.push({ fichier: f.chemin, ligne, quoi: m.quoi, niveau: m.niveau, ctx });
    }
  }
}

const crypto = await import('node:crypto');
const empreinte = crypto.createHash('sha256').update(aLire.map(f => f.chemin).sort().join('\n')).digest('hex').slice(0, 16);

const secrets = trouvailles.filter(t => t.niveau === 'secret');
const motifs = trouvailles.filter(t => t.niveau === 'motif');

const R = [];
R.push(`# Rapport d'audit — ${owner}/${repo}`);
R.push('');
R.push(`- Dépôt : https://github.com/${owner}/${repo}`);
R.push(`- Date : ${jour}`);
R.push(`- Fichiers texte analysés : ${aLire.length} sur ${analysables.length}`);
R.push(`- Empreinte de la liste analysée : ${empreinte}`);
R.push('');
R.push('## Résultat');
R.push('');
R.push(`- **Secrets en clair (quasi-certitude) : ${secrets.length}**`);
R.push(`- **Motifs à examiner : ${motifs.length}**`);
R.push('');
if (secrets.length) {
  R.push('### Secrets en clair — à révoquer en priorité');
  R.push('');
  R.push('| Fichier | Ligne | Motif |');
  R.push('|---|---|---|');
  for (const t of secrets.slice(0, 40)) R.push(`| \`${t.fichier}\` | ${t.ligne} | ${t.quoi} |`);
  R.push('');
} else {
  R.push('Aucun secret en clair détecté dans les fichiers atteignables.');
  R.push('');
}
if (motifs.length) {
  R.push('### Motifs à examiner — pas nécessairement des failles');
  R.push('');
  R.push('| Fichier | Ligne | Motif | Contexte |');
  R.push('|---|---|---|---|');
  for (const t of motifs.slice(0, 40)) R.push(`| \`${t.fichier}\` | ${t.ligne} | ${t.quoi} | ${t.ctx} |`);
  R.push('');
}
R.push('## Ce que ce rapport NE prouve PAS');
R.push('');
R.push("- Un secret retiré du dernier commit mais resté dans **l'historique** n'apparaît pas ici.");
R.push("- Un motif « à examiner » peut être légitime (valeur de test, exemple de doc). Il indique où regarder, pas une faille confirmée.");
R.push("- L'absence de secret détecté ne garantit pas l'absence de secret : un secret encodé ou découpé échappe à la méthode.");
R.push("- Aucun code du dépôt n'a été exécuté. Aucun fichier n'a été modifié.");
R.push('');
if (tronque) R.push(`> Analyse partielle : limitée à ${MAX_FICH} fichiers.`);
R.push('');
R.push('---');
R.push("Analyse automatique, honnête sur ses limites. Une relecture humaine avec correctifs priorisés se chiffre sur devis après accord.");

const texte = R.join('\n');
const sortie = opt('--out', null);
if (sortie) fs.writeFileSync(sortie, texte);
console.log('');
console.log(texte.split('\n').slice(0, 12).join('\n'));
console.log('...');
console.log('RAPPORT:', sortie || '(stdout)');
process.exit(0);
