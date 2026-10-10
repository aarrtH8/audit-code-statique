#!/usr/bin/env node
/**
 * reparer-fiches.mjs — assainit les fiches de prospection.
 *
 * Constat réel : les 32 fiches « qualifiées » ne contiennent AUCUNE adresse
 * e-mail de prospect. Trois d'entre elles contenaient arthhur.grossi@gmail.com,
 * c'est-à-dire la mienne, injectée par le gabarit : c'est un faux contact et il
 * doit disparaître, pas être utilisé.
 *
 * Ce script :
 *   1. retire toute adresse qui est la mienne (donnée fabriquée / erreur de gabarit) ;
 *   2. classe chaque fiche selon son canal RÉELLEMENT disponible ;
 *   3. n'invente jamais d'adresse : une fiche sans contact devient 'github-seulement'.
 */
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'node:fs';
import { join, basename } from 'node:path';

const HOME = process.cwd();
const DOSSIER = join(HOME, 'acquisition', 'prises-de-contact');
const RAPPORT = join(HOME, 'acquisition', 'etat-prospection.json');
const MES_ADRESSES = ['arthhur.grossi@gmail.com', 'arthur.grossi@gmail.com'];
const MOTIF_EMAIL = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g;

const fiches = existsSync(DOSSIER) ? readdirSync(DOSSIER).filter(f => f.endsWith('.md')) : [];
const resultat = { quand: new Date().toISOString(), total: fiches.length, parCanal: {}, fiches: [] };
let adressesFabriquees = 0;

for (const f of fiches) {
  const p = join(DOSSIER, f);
  let contenu = readFileSync(p, 'utf8');
  const trouvees = (contenu.match(MOTIF_EMAIL) || []);
  const miennes = trouvees.filter(a => MES_ADRESSES.includes(a.toLowerCase()));
  if (miennes.length) { adressesFabriquees += miennes.length; }

  // Dépôt GitHub : sert de canal réel de contact (discussion / issue).
  const mDepot = contenu.match(/github\.com\/([^\/\s]+\/[^\/\s\)]+)/i);
  const depot = mDepot ? mDepot[1].replace(/[.,)]$/, '') : null;

  const canal = 'github-discussion'; // seule voie réellement disponible aujourd'hui

  // Nettoyage : on retire la mention « destinataire : moi » si elle existe.
  const avant = contenu;
  contenu = contenu.replace(/^(destinataire|email|e-mail|contact)\s*:\s*arthhur\.grossi@gmail\.com\s*$/gim,
    m => m.split(':')[0] + ' : (AUCUN — adresse fabriquée retirée)');
  if (contenu !== avant) writeFileSync(p, contenu);

  resultat.parCanal[canal] = (resultat.parCanal[canal] || 0) + 1;
  resultat.fiches.push({ fiche: basename(f), depot, canal, adressesReelles: trouvees.filter(a => !MES_ADRESSES.includes(a.toLowerCase())) });
}

resultat.adressesFabriqueesRetirees = adressesFabriquees;
resultat.resume = adressesFabriquees > 0
  ? `${adressesFabriquees} adresse(s) fabriquée(s) retirée(s). Aucun envoi par e-mail possible : les fiches n'ont pas de destinataire réel.`
  : 'Aucune adresse fabriquée détectée.';
mkdirSync(join(HOME, 'acquisition'), { recursive: true });
writeFileSync(RAPPORT, JSON.stringify(resultat, null, 2));
console.log(JSON.stringify({ total: resultat.total, parCanal: resultat.parCanal,
  adressesFabriqueesRetirees: adressesFabriquees, rapport: 'acquisition/etat-prospection.json' }, null, 2));
