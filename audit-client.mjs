#!/usr/bin/env node
/**
 * audit-client.mjs — auditeur AUTONOME, à lancer par le client sur son propre code.
 * Zéro dépendance, zéro réseau (sauf clone git optionnel). Un seul fichier.
 *
 *   node audit-client.mjs <dossier-ou-depot> [--sortie rapport.md]
 *
 * - Si l'argument ressemble à une URL git, le dépôt est cloné en lecture seule.
 * - Le code n'est JAMAIS exécuté. Rien n'est modifié.
 * - Produit rapport fichier:ligne + MANIFEST.json (SHA-256 recalculable par le client).
 *
 * v2 : couverture multi-langages réelle (JS/TS, Python, PHP, Ruby, Go, Java, Kotlin,
 * C#, SQL, shell, YAML/Docker/CI). v1 ne touchait que quelques motifs JS et ratait
 * des langages entiers — ce que le test sur dépôt tiers a révélé.
 */
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, extname, basename } from 'node:path';
import { execFileSync } from 'node:child_process';

const EXTS = new Set([
  '.js','.mjs','.cjs','.ts','.tsx','.jsx','.vue','.svelte',
  '.py','.rb','.php','.go','.java','.kt','.kts','.cs','.scala','.rs','.swift',
  '.sql','.sh','.bash','.ps1','.pl','.lua','.r',
  '.yml','.yaml','.toml','.ini','.cfg','.conf','.env','.properties',
  '.html','.htm','.xml','.tf','.dockerfile'
]);
const NOMS_INTERESSANTS = /^(Dockerfile|docker-compose\.ya?ml|Makefile|Jenkinsfile|nginx\.conf|\.env(\.\w+)?)$/i;
const IGNORE = new Set(['node_modules','.git','dist','build','.next','vendor','__pycache__','.venv','venv','coverage','.idea','target','out','bin','obj','.terraform']);
const TESTS = /(^|[\\/])(test|tests|spec|specs|__tests__|fixtures?|mocks?)([\\/]|$)|\.(test|spec)\.|_test\./i;
const DOCS = /\.(md|txt|rst|adoc)$/i;

const REGLES = [
  // --- Haute : exécution / secrets / crypto faible / injection ---
  { id:'EXEC_SHELL', gravite:'haute', rx:/\b(execSync|execFileSync|exec|spawnSync|spawn|system|shell_exec|passthru|popen|subprocess\.(run|call|Popen|check_output)|os\.system|Runtime\.getRuntime\(\)\.exec|ProcessBuilder|eval\s*\(|Invoke-Expression|\bchild_process)\s*[.(]/g, quoi:"Exécution de commande / shell" },
  { id:'EVAL', gravite:'haute', rx:/(\beval\s*\(|new\s+Function\s*\(|setTimeout\s*\(\s*['"]|setInterval\s*\(\s*['"])/g, quoi:"Évaluation dynamique de code" },
  { id:'SECRET', gravite:'haute', rx:/(password|passwd|passphrase|secret|api[_-]?key|apikey|access[_-]?key|auth[_-]?token|private[_-]?key|client[_-]?secret)\s*[:=]\s*['"]?[^'"\s]{8,}/gi, quoi:"Secret possible en dur" },
  { id:'DOCKER_LATEST', gravite:'moyenne', rx:/^\s*FROM\s+\S+:latest\b/gim, quoi:'Image Docker non figée (tag latest)' },
  { id:'ENV_COMMIT', gravite:'haute', rx:/(AWS_SECRET_ACCESS_KEY|AWS_ACCESS_KEY_ID|GITHUB_TOKEN|SLACK_TOKEN|DATABASE_URL|DB_PASSWORD)\s*=\s*\S{8,}/g, quoi:'Secret probable dans un fichier .env versionné' },
  { id:'PRIVATE_KEY', gravite:'haute', rx:/-----BEGIN (RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/g, quoi:"Clé privée présente dans le code" },
  { id:'CRYPTO_FAIBLE', gravite:'haute', rx:/\b(md5|sha1)\s*\(|createHash\(\s*['"](md5|sha-?1)['"]|hashlib\.(md5|sha1)|MessageDigest\.getInstance\(\s*['"](MD5|SHA-?1)['"]|Cipher\.getInstance\(\s*['"]?(DES|RC4|RC2)/gi, quoi:"Algorithme cryptographique faible" },
  { id:'DESERIALISATION', gravite:'haute', rx:/(pickle\.loads|marshal\.loads|yaml\.load\s*\(\s*[^,)]*\)|ObjectInputStream|unserialize\s*\()/g, quoi:"Désérialisation potentiellement dangereuse" },
  { id:'TLS_OFF', gravite:'haute', rx:/(rejectUnauthorized\s*:\s*false|verify\s*=\s*False|InsecureSkipVerify\s*:\s*true|CURLOPT_SSL_VERIFYPEER\s*,\s*(0|false))/gi, quoi:"Vérification TLS désactivée" },
  { id:'SQL_INJECTION', gravite:'haute', rx:/(execute\s*\(\s*[`'"].*\$\{|query\s*\(\s*[`'"].*\$\{|executeQuery\s*\(\s*['"].*\+|createQuery\s*\(\s*['"].*\+|\bSELECT\b[^;]{0,120}\+\s*\w+|f['"]\s*SELECT[^'"]*\{)/gi, quoi:"Requête SQL construite par concaténation/interpolation" },
  { id:'MOT_DE_PASSE_VIDE', gravite:'haute', rx:/(password|passwd)\s*=\s*['"]{2}\s*[,;)]|allowEmptyPassword|NoAuth/gi, quoi:"Authentification vide ou désactivée" },

  // --- Moyenne : XSS, CORS, permissions, rand faible, redirections ---
  { id:'INNERHTML', gravite:'moyenne', rx:/(\.innerHTML\s*=|\.outerHTML\s*=|dangerouslySetInnerHTML|document\.write\s*\(|v-html|bypassSecurityTrust)/g, quoi:"Insertion HTML brute (risque XSS)" },
  { id:'CORS_OPEN', gravite:'moyenne', rx:/(Access-Control-Allow-Origin['"]?\s*[:,]\s*['"]\*|cors\(\s*\)|add_header\s+Access-Control-Allow-Origin\s+\*|AllowAnyOrigin)/gi, quoi:"CORS ouvert à toutes les origines" },
  { id:'CHMOD_OUVERT', gravite:'moyenne', rx:/(chmod\s+777|0o777|0777|StatMode\s*\(\s*0o?777|mode\s*=\s*777)/gi, quoi:"Permissions de fichier trop ouvertes" },
  { id:'RAND_FAIBLE', gravite:'moyenne', rx:/(Math\.random\s*\(\)[^;\n]{0,60}(token|secret|key|id|password|salt)|new\s+Random\s*\(\s*\)|rand\s*\(\s*\)\s*[^;\n]{0,40}(token|secret))/gi, quoi:"Aléatoire non cryptographique pour une valeur sensible" },
  { id:'DESACTIVE_SECU', gravite:'moyenne', rx:/(csrf_exempt|@CrossOrigin|\[AllowAnonymous\]|permitAll\s*\(\s*\)|disable\(\s*\)\s*.*csrf|csrf\(\)\s*\.disable)/gi, quoi:"Protection (CSRF/authentification) désactivée" },
  { id:'REDIRECT', gravite:'moyenne', rx:/(redirect\s*\(\s*(req|request)\.(query|params|body)|window\.location\s*=\s*(location\.(search|hash)|req\.query))/gi, quoi:"Redirection vers une valeur contrôlable (open redirect)" },
  { id:'DEBUG_ON', gravite:'moyenne', rx:/(debug\s*[:=]\s*(true|True)|DEBUG\s*=\s*1|app\.run\([^)]*debug\s*=\s*True|\bflask_debug\b|\bdebugMode\b)/g, quoi:"Mode debug laissé actif" },
  { id:'CIPHER_MODE', gravite:'moyenne', rx:/(AES\/ECB|mode\s*[:=]\s*['"]?ECB|Cipher\.getInstance\(\s*['"]AES['"]\s*\))/gi, quoi:"Chiffrement en mode ECB" },

  // --- Basse : hygiène ---
  { id:'HTTP_CLAIR', gravite:'basse', rx:/['"`]http:\/\/[a-z0-9.-]+/gi, quoi:"URL http:// en clair" },
  { id:'TODO_SECU', gravite:'basse', rx:/(TODO|FIXME|XXX|HACK)[^\n]{0,80}(sécur|secur|auth|valida|sanitiz|escap|chiffr|encrypt)/gi, quoi:"Marqueur TODO lié à la sécurité" },
  { id:'CONSOLE_SENSIBLE', gravite:'basse', rx:/(console\.(log|debug)|print\s*\(|System\.out\.println)[^;\n]{0,60}(password|secret|token|api[_-]?key)/gi, quoi:"Valeur sensible journalisée" },
  { id:'PIN_VERSION', gravite:'basse', rx:/"(express|lodash|axios|react|react-dom|django|flask|spring-boot|log4j)":\s*"[*^]|log4j.*1\.\d/gi, quoi:"Dépendance non épinglée ou obsolète" },
];

function* fichiers(racine) {
  for (const e of readdirSync(racine, { withFileTypes: true })) {
    if (e.name.startsWith('.audit-clone-')) continue;
    if (IGNORE.has(e.name)) continue;
    const p = join(racine, e.name);
    if (e.isDirectory()) yield* fichiers(p);
    else if (EXTS.has(extname(e.name).toLowerCase()) || NOMS_INTERESSANTS.test(e.name)) yield p;
  }
}

function analyser(racine) {
  const constats = [];
  let nbFichiers = 0;
  for (const f of fichiers(racine)) {
    let txt; try { txt = readFileSync(f, 'utf8'); } catch { continue; }
    if (txt.includes('\0')) continue;
    nbFichiers++;
    const lignes = txt.split('\n');
    const categorie = TESTS.test(f) ? 'test' : DOCS.test(f) ? 'doc' : 'production';
    for (const r of REGLES) {
      for (let i = 0; i < lignes.length; i++) {
        r.rx.lastIndex = 0;
        if (!r.rx.test(lignes[i])) continue;
        r.rx.lastIndex = 0;
        constats.push({ regle:r.id, gravite:r.gravite, quoi:r.quoi,
          fichier: f.replace(racine, '').replace(/^[\\/]/, ''),
          ligne: i+1, contexte: lignes[i].trim().slice(0,160), categorie });
      }
    }
  }
  return { constats, nbFichiers };
}

const arg = process.argv[2];
if (!arg) { console.error('Usage: node audit-client.mjs <dossier-ou-depot> [--sortie rapport.md]'); process.exit(2); }
const idx = process.argv.indexOf('--sortie');
const sortieMd = idx > -1 ? process.argv[idx+1] : 'rapport-audit.md';

let cible = arg, estUrl = /^(https?:\/\/|git@)/.test(arg);
let depot = estUrl ? arg : '(dossier local)';
let tmpClone = null;
if (estUrl) {
  tmpClone = join(process.cwd(), '.audit-clone-' + Date.now());
  console.log('Clone lecture seule de', arg);
  execFileSync('git', ['clone','--depth','1',arg,tmpClone], { stdio:'inherit', timeout:180000 });
  cible = tmpClone;
}
if (!existsSync(cible)) { console.error('Cible introuvable:', cible); process.exit(2); }

console.log('Analyse statique (code non exécuté) ...');
const { constats, nbFichiers } = analyser(cible);
const n = d => constats.filter(c => c.gravite === d).length;
const prod = constats.filter(c => c.categorie === 'production').length;

let md = `# Rapport d'audit statique\n\n`;
md += `- **Dépôt / dossier** : ${depot}\n- **Date** : ${new Date().toISOString()}\n`;
md += `- **Fichiers analysés** : ${nbFichiers}\n`;
md += `- **Méthode** : analyse statique de motifs multi-langages, code NON exécuté, aucune modification.\n\n`;
md += `> **Limite explicite** : un motif détecté n'est PAS une vulnérabilité confirmée. `;
md += `Il doit être vérifié manuellement dans son contexte. Ce balayage n'est pas exhaustif : `;
md += `absence de motif ne prouve pas absence de faille.\n\n`;
md += `## Résumé\n\n| Gravité | Nombre |\n|---|---|\n`;
md += `| haute | ${n('haute')} |\n| moyenne | ${n('moyenne')} |\n| basse | ${n('basse')} |\n`;
md += `| **total** | **${constats.length}** |\n\n`;
md += `Dont ${prod} en code de production, ${constats.length - prod} en tests/docs.\n\n`;

for (const gravite of ['haute','moyenne','basse']) {
  const liste = constats.filter(c => c.gravite === gravite);
  if (!liste.length) continue;
  md += `## Gravité ${gravite} (${liste.length})\n\n`;
  const parRegle = {};
  for (const c of liste) (parRegle[c.quoi] ??= []).push(c);
  for (const [quoi, cs] of Object.entries(parRegle)) {
    md += `### ${quoi} (${cs.length})\n\n`;
    for (const c of cs.slice(0, 40)) {
      md += `- \`${c.fichier}:${c.ligne}\` [${c.categorie}]\n  \`\`\`\n  ${c.contexte}\n  \`\`\`\n`;
    }
    if (cs.length > 40) md += `- … et ${cs.length - 40} autres du même type.\n`;
    md += `\n`;
  }
}
if (!constats.length) md += `Aucun motif détecté par ces règles. Cela ne prouve pas l'absence de faille.\n`;

writeFileSync(sortieMd, md);
const sha = createHash('sha256').update(readFileSync(sortieMd)).digest('hex');
writeFileSync('MANIFEST.json', JSON.stringify({
  depot, quand: new Date().toISOString(), rapport: sortieMd, sha256: sha,
  fichiers_analyses: nbFichiers,
  commande: `node audit-client.mjs ${arg} --sortie ${sortieMd}`,
  note: "Motif != vulnérabilité confirmée. Code non exécuté, dépôt non modifié.",
  verification: `certutil -hashfile "${sortieMd}" SHA256  (Windows)  |  sha256sum ${sortieMd}  (Linux/macOS)`,
}, null, 2));

console.log(`\nRapport écrit : ${sortieMd}`);
console.log(`Fichiers analysés : ${nbFichiers}`);
console.log(`Motifs : ${constats.length} (haute ${n('haute')}, moyenne ${n('moyenne')}, basse ${n('basse')})`);
console.log(`SHA-256 : ${sha}`);
console.log(`Vérifiez vous-même :  certutil -hashfile "${sortieMd}" SHA256`);
