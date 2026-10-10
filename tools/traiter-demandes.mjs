#!/usr/bin/env node
/**
 * traiter-demandes.mjs — transforme une demande reçue en livraison réelle.
 *
 * Pour chaque demande non traitée dans demandes/, ce script :
 *   1. clone le dépôt demandé (lecture seule, aucun commit, aucune exécution de code) ;
 *   2. lance l'analyse statique de motifs déjà écrite ;
 *   3. produit un rapport fichier:ligne dans livraisons/<ref>/rapport.md ;
 *   4. grave un MANIFEST.json avec le hash du rapport et la commande exacte utilisée ;
 *   5. marque la demande « rapport produit » (jamais « payée » : ça, seul le créateur
 *      peut le faire avec une preuve de réception).
 *
 * Aucune promesse non tenue : si le clone échoue, la demande est marquée « échec »
 * avec la raison exacte. Rien n'est inventé.
 *
 *   node tools/traiter-demandes.mjs            traite toutes les demandes en attente
 *   node tools/traiter-demandes.mjs --ref <R>  traite une seule référence
 */
import { execFileSync } from 'node:child_process';
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync, rmSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HOME = join(dirname(fileURLToPath(import.meta.url)), '..');
const DEM = join(HOME, 'demandes');
const LIV = join(HOME, 'livraisons');
const TMP = join(HOME, '.tmp-clones');
const REF = process.argv.includes('--ref') ? process.argv[process.argv.indexOf('--ref') + 1] : null;

if (!existsSync(DEM)) { console.log('Aucune demande.'); process.exit(0); }
if (!existsSync(LIV)) mkdirSync(LIV, { recursive: true });
if (!existsSync(TMP)) mkdirSync(TMP, { recursive: true });

const fichiers = readdirSync(DEM).filter(f => f.endsWith('.json'))
  .filter(f => !REF || f === REF + '.json');

let traitees = 0, echecs = 0;

for (const f of fichiers) {
  const chemin = join(DEM, f);
  const d = JSON.parse(readFileSync(chemin, 'utf8'));
  if (d.rapportProduit) { console.log(`  ${d.ref} : déjà traité.`); continue; }

  console.log(`\n=== ${d.ref} : ${d.depot} ===`);
  const dossier = join(TMP, d.ref);
  try {
    if (existsSync(dossier)) rmSync(dossier, { recursive: true, force: true });
    execFileSync('git', ['clone', '--depth', '1', d.depot, dossier], { stdio: 'pipe', timeout: 120000 });
    console.log('  clone OK');
  } catch (e) {
    const raison = String(e.stderr || e.message).split('\n').slice(0, 3).join(' ').slice(0, 300);
    console.log(`  CLONE ÉCHOUÉ : ${raison}`);
    d.rapportProduit = false; d.echec = { quand: new Date().toISOString(), etape: 'clone', raison };
    writeFileSync(chemin, JSON.stringify(d, null, 2));
    echecs++; continue;
  }

  const dest = join(LIV, d.ref);
  mkdirSync(dest, { recursive: true });
  let ok = false, sortie = '';
  try {
    sortie = execFileSync('node', [join(HOME, 'tools', 'audit-statique.mjs'), dossier, '--sortie', join(dest, 'rapport.md')],
      { cwd: HOME, encoding: 'utf8', timeout: 300000 });
    ok = true;
    console.log(`  analyse OK : ${sortie.trim().split('\n').slice(-1)[0]}`);
  } catch (e) {
    const raison = String(e.stderr || e.message).slice(0, 300);
    console.log(`  ANALYSE ÉCHOUÉE : ${raison}`);
    d.echec = { quand: new Date().toISOString(), etape: 'analyse', raison };
  }

  const rapport = join(dest, 'rapport.md');
  if (ok && existsSync(rapport)) {
    const sha = createHash('sha256').update(readFileSync(rapport)).digest('hex');
    writeFileSync(join(dest, 'MANIFEST.json'), JSON.stringify({
      ref: d.ref, depot: d.depot, quand: new Date().toISOString(),
      rapport: 'rapport.md', sha256: sha,
      commande: `node tools/audit-statique.mjs <clone> --sortie rapport.md`,
      note: 'Analyse statique de motifs. Code non exécuté, dépôt non modifié. Un motif n\'est pas une vulnérabilité confirmée.',
    }, null, 2));
    d.rapportProduit = true; d.rapport = `livraisons/${d.ref}/rapport.md`; d.sha256 = sha;
    traitees++;
  } else if (!d.echec) {
    d.echec = { quand: new Date().toISOString(), etape: 'analyse', raison: 'rapport non produit' };
  }
  writeFileSync(chemin, JSON.stringify(d, null, 2));
}

console.log(`\n${traitees} rapport(s) produit(s), ${echecs} échec(s) de clone.`);
console.log('État « payée » : jamais posé par ce script — seule une preuve de réception réelle le permet.');
