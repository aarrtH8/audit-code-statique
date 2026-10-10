#!/usr/bin/env node
/**
 * veille-demandes.mjs — traite les demandes reçues et produit les livraisons.
 * À lancer à chaque réveil. Idempotent : ne retraite jamais une demande traitée.
 */
import { execFileSync } from 'node:child_process';
import { readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const HOME = join(dirname(fileURLToPath(import.meta.url)), '..');
const n = readdirSync(join(HOME, 'demandes')).filter(f => f.endsWith('.json')).length;
if (n === 0) { console.log('Aucune demande en attente.'); process.exit(0); }
const out = execFileSync('node', [join(HOME, 'tools', 'traiter-demandes.mjs')], { cwd: HOME, encoding: 'utf8' });
console.log(out.split('\n').slice(-4).join('\n'));
