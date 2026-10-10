#!/usr/bin/env node
/**
 * envoi-encadre.mjs — envoi d'e-mails de prospection ENCADRÉ et JOURNALISÉ.
 *
 * Règles inscrites dans le code (Constitution, Law II : jamais de spam) :
 *   - plafond dur de messages par jour (par défaut 8) ;
 *   - un seul message par destinataire, à vie (anti-relance-automatique) ;
 *   - chaque destinataire doit avoir une fiche qualifiée dans prises-de-contact/ ;
 *   - le message doit contenir le motif réel tiré du code du prospect (longueur mini) ;
 *   - désinscription possible : toute mention de refus enregistrée arrête la cible ;
 *   - journal d'envoi horodaté et immuable (append-only), avec identifiant.
 *
 * Sans `--valider`, le script ne fait rien : il montre seulement ce qu'il ferait.
 * Usage :
 *   node tools/envoi-encadre.mjs --lister            # état des quotas
 *   node tools/envoi-encadre.mjs --montrer <fiche>   # message prêt, non envoyé
 *   node tools/envoi-encadre.mjs --envoyer <fiche>   # envoi réel (délègue à gmail-oauth)
 */
import { existsSync, readFileSync, writeFileSync, appendFileSync, readdirSync, mkdirSync } from 'node:fs';
import { join, basename } from 'node:path';
import { execFileSync } from 'node:child_process';

const HOME = process.cwd();
const DOSSIER_FICHES = join(HOME, 'acquisition', 'prises-de-contact');
const JOURNAUX = join(HOME, 'acquisition', 'envois');
const JOURNAL = join(JOURNAUX, 'journal.jsonl');
const ETAT = join(JOURNAUX, 'etat.json');
const PLAFOND_JOUR = 8;
const LONGUEUR_MIN_MOTIF = 120; // un message sans motif réel est du spam : refusé.

const args = process.argv.slice(2);
const lireBloc = (nom) => {
  const i = args.indexOf(nom);
  return i >= 0 ? args[i + 1] : null;
};

if (!existsSync(JOURNAUX)) mkdirSync(JOURNAUX, { recursive: true });

function lireEtat() {
  if (!existsSync(ETAT)) return { envois: [], aujourdhui: '', compteurJour: 0, ciblesEnvoyees: [], ciblesRefusees: [] };
  try { return JSON.parse(readFileSync(ETAT, 'utf8')); } catch { return { envois: [], aujourdhui:'', compteurJour:0, ciblesEnvoyees:[], ciblesRefusees:[] }; }
}
function ecrireEtat(e) { writeFileSync(ETAT, JSON.stringify(e, null, 2)); }
const jour = () => new Date().toISOString().slice(0, 10);

function normaliserEtat(e) {
  const j = jour();
  if (e.aujourdhui !== j) { e.aujourdhui = j; e.compteurJour = 0; }
  return e;
}

function listerFiches() {
  if (!existsSync(DOSSIER_FICHES)) return [];
  return readdirSync(DOSSIER_FICHES).filter(f => f.endsWith('.md') || f.endsWith('.json'));
}

function extraireContact(fiche) {
  const p = join(DOSSIER_FICHES, fiche);
  const brut = readFileSync(p, 'utf8');
  const m = brut.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/);
  return { chemin: p, contenu: brut, email: m ? m[0] : null, id: fiche.replace(/\.[^.]+$/, '') };
}

// Le motif doit être spécifique : on exige une section « Motif » substantielle tirée du code réel.
function motifValide(contenu) {
  const bloc = (contenu.match(/##\s*Motif[^\n]*\n([\s\S]*?)(\n##|$)/i) || [])[1] || '';
  const t = bloc.trim();
  if (t.length < LONGUEUR_MIN_MOTIF) return { ok:false, raison:`motif trop court (${t.length}/${LONGUEUR_MIN_MOTIF}) — risque de spam`, motif:t };
  if (/(votre (site|code) (a|contient) (des|l')?(probl|faille))/i.test(t) && !/`/.test(t))
    return { ok:false, raison:'motif générique sans preuve (aucun extrait de code)', motif:t };
  return { ok:true, motif:t };
}

function verifierQuotas(e, id, email) {
  const refus = [];
  if (e.ciblesRefusees.includes(id) || (email && e.ciblesRefusees.includes(email))) refus.push('cette cible a demandé le refus (désinscription)');
  if (e.ciblesEnvoyees.includes(id) || (email && e.ciblesEnvoyees.includes(email))) refus.push('un message a déjà été envoyé à cette cible (pas de relance automatique)');
  if (e.compteurJour >= PLAFOND_JOUR) refus.push(`plafond quotidien atteint (${e.compteurJour}/${PLAFOND_JOUR})`);
  return refus;
}

if (args.includes('--lister') || args.length === 0) {
  const e = normaliserEtat(lireEtat());
  ecrireEtat(e);
  const fiches = listerFiches();
  console.log(JSON.stringify({
    plafondJour: PLAFOND_JOUR, envoisAujourdhui: e.compteurJour, reste: PLAFOND_JOUR - e.compteurJour,
    totalEnvoyes: e.envois.length, fichesDisponibles: fiches.length,
    dejaEnvoyees: e.ciblesEnvoyees.length, desinscrites: e.ciblesRefusees.length,
    journal: JOURNAL,
  }, null, 2));
  process.exit(0);
}

const cible = lireBloc('--montrer') || lireBloc('--envoyer');
if (!cible) { console.error('Indiquez une fiche : --montrer <fiche.md> ou --envoyer <fiche.md>'); process.exit(2); }

const f = extraireContact(basename(cible) === cible ? cible : cible);
if (!existsSync(f.chemin)) { console.error('Fiche introuvable :', f.chemin); process.exit(3); }

const e = normaliserEtat(lireEtat());
const { ok, raison, motif } = motifValide(f.contenu);

if (!ok) { console.log(JSON.stringify({ cible: f.id, envoi: 'REFUSE', raison }, null, 2)); process.exit(4); }
const refus = verifierQuotas(e, f.id, f.email);
if (refus.length) { console.log(JSON.stringify({ cible: f.id, envoi: 'REFUSE', raisons: refus }, null, 2)); process.exit(5); }

const objet = `Audit de code — point précis relevé dans ${f.id}`;
const corps = [
  "Bonjour,",
  "",
  "Je réalise des audits de code statique pour des petites structures. En examinant votre dépôt, j'ai relevé un point concret, pas une généralité :",
  "",
  motif,
  "",
  "Je ne vous demande rien. Si ce point vous paraît réel, je peux fournir un rapport complet (fichier et ligne pour chaque constat, correction proposée, faux positifs écartés) à partir de 90 €, prix ferme au devis.",
  "",
  "Si vous préférez ne plus être contacté, répondez simplement « stop » : je vous retire définitivement.",
  "",
  "Arthur Grossi EI — audit de code statique",
  "arthhur.grossi@gmail.com",
].join('\n');

if (args.includes('--montrer')) {
  console.log(JSON.stringify({ cible: f.id, destinataire: f.email, envoi: 'NON ENVOYÉ (aperçu)', objet, corps }, null, 2));
  process.exit(0);
}

if (!process.env.CONFIRME_ENVOI) {
  console.log(JSON.stringify({ cible: f.id, envoi: 'REFUSE', raison: 'variable CONFIRME_ENVOI absente : envoi non confirmé explicitement' }, null, 2));
  process.exit(6);
}
if (!f.email) { console.log(JSON.stringify({ cible: f.id, envoi: 'REFUSE', raison: 'aucune adresse e-mail dans la fiche' }, null, 2)); process.exit(7); }

let resultat = 'echec';
try {
  execFileSync('node', ['tools/gmail-oauth.mjs', 'envoyer', '--a', f.email, '--sujet', objet, '--corps', corps], { stdio: 'pipe', timeout: 60000 });
  resultat = 'envoye';
} catch (err) { resultat = 'echec: ' + String(err.message).split('\n')[0]; }

const entree = { id: `ENV-${Date.now().toString(36)}`, quand: new Date().toISOString(), cible: f.id, destinataire: f.email, objet, resultat };
appendFileSync(JOURNAL, JSON.stringify(entree) + '\n');

if (resultat === 'envoye') {
  e.compteurJour++; e.envois.push(entree.id);
  if (!e.ciblesEnvoyees.includes(f.id)) e.ciblesEnvoyees.push(f.id);
  if (f.email && !e.ciblesEnvoyees.includes(f.email)) e.ciblesEnvoyees.push(f.email);
  ecrireEtat(e);
}
console.log(JSON.stringify({ ...entree, quotaRestant: PLAFOND_JOUR - e.compteurJour }, null, 2));
