#!/usr/bin/env node
/**
 * verifier-livraison.mjs — outil CLIENT (indépendant de l'auteur du rapport).
 *
 *   node verifier-livraison.mjs <dossier-livraison> [--depot <url>]
 *
 * Vérifie, sans faire confiance à l'auteur :
 *   1. que rapport.md existe et que son SHA-256 correspond à MANIFEST.json ;
 *   2. que le MANIFEST contient la commande exacte utilisée ;
 *   3. (optionnel) que le dépôt source est bien accessible (HTTP 200) au moment de la vérif.
 *
 * Sortie : code 0 si cohérent, 1 si incohérent. Aucun accès réseau requis pour (1) et (2).
 */
import { readFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, basename } from 'node:path';

const dossier = process.argv[2];
if (!dossier) { console.error('Usage: node verifier-livraison.mjs <dossier-livraison> [--depot <url>]'); process.exit(2); }

const mp = join(dossier, 'MANIFEST.json');
const rp = join(dossier, 'rapport.md');
let ok = true;
const dire = (c, m) => { console.log(`${c ? 'OK ' : 'XX '} ${m}`); if (!c) ok = false; };

console.log(`Vérification de la livraison : ${basename(dossier)}\n`);

if (!existsSync(mp)) { dire(false, 'MANIFEST.json absent'); process.exit(1); }
if (!existsSync(rp)) { dire(false, 'rapport.md absent'); process.exit(1); }

const manifest = JSON.parse(readFileSync(mp, 'utf8'));
const rapport = readFileSync(rp);
const hash = createHash('sha256').update(rapport).digest('hex');

dire(hash === manifest.sha256, `SHA-256 du rapport : ${hash}`);
if (hash !== manifest.sha256) console.log(`     attendu : ${manifest.sha256}`);

dire(!!manifest.commande, `commande reproductible consignée : ${manifest.commande || 'ABSENTE'}`);
dire(!!manifest.depot, `dépôt source consigné : ${manifest.depot || 'ABSENT'}`);
console.log(`     cible analysée : ${manifest.cible || '(non consignée)'}`);
console.log(`     date            : ${manifest.quand || '(non consignée)'}`);

const sep = rapport.toString('utf8');
dire(/motif.*pas une vuln[ée]rabilit[ée] confirm[ée]|pas une faille confirm[ée]/i.test(sep),
  'le rapport énonce explicitement la limite « motif ≠ vulnérabilité confirmée »');

const i = process.argv.indexOf('--depot');
if (i > -1 && process.argv[i + 1]) {
  const url = process.argv[i + 1];
  try {
    const r = await fetch(url, { method: 'HEAD' });
    dire(r.status === 200, `dépôt accessible (HTTP ${r.status}) : ${url}`);
  } catch (e) { dire(false, `dépôt inaccessible : ${url} (${e.message})`); }
} else {
  console.log('-- dépôt non revérifié (pas de --depot fourni).');
}

console.log(`\n${ok ? 'COHÉRENT' : 'INCOHÉRENT'} — le client peut recalculer le hash lui-même :`);
console.log(`  sha256sum rapport.md   (ou)   certutil -hashfile rapport.md SHA256`);
process.exit(ok ? 0 : 1);
