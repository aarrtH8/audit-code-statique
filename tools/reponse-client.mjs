#!/usr/bin/env node
/**
 * reponse-client.mjs --demande <chemin.json|id> [--out dossier]
 *
 * Prend une demande reçue (fichier demande.json produit par le guichet, ou saisie
 * minimale) et produit TOUT ce qu'il faut pour répondre à un client :
 *
 *   dossier/
 *     REPONSE-EMAIL.md / .txt   texte prêt à envoyer (objet + corps), jamais envoyé seul
 *     DEVIS.md                  chiffrage ferme, arithmétiquement cohérent
 *     RAPPORT.html              rapport signé SHA-256
 *     audit.sarif               format natif GitHub / VS Code
 *     LISEZMOI.md               ce qui est prouvé, ce qui ne l'est pas
 *     MANIFESTE.json            empreinte de chaque fichier
 *
 * Contrainte constitutionnelle respectée : ce script NE CONTACTE PERSONNE.
 * Il prépare. L'envoi passe par tools/envoi-encadre.mjs (plafond, consentement,
 * un seul message par cible, CONFIRME_ENVOI explicite).
 */
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const args = process.argv.slice(2);
const iD = args.indexOf('--demande');
if (iD < 0) { console.error('Usage: node tools/reponse-client.mjs --demande <demande.json|id> [--out dossier]'); process.exit(2); }
const src = args[iD + 1];
const iOut = args.indexOf('--out');

// Résolution : soit un chemin de fichier, soit un identifiant DEV-… déjà traité.
let demande;
let cheminSrc = src;
if (!existsSync(src)) {
  const base = join(process.cwd(), 'boite-de-sortie', src, 'demande.json');
  if (!existsSync(base)) { console.error('Demande introuvable :', src); process.exit(3); }
  cheminSrc = base;
}
demande = JSON.parse(readFileSync(cheminSrc, 'utf8'));

const depotUrl = demande.depotReconnu ? `https://github.com/${demande.depotReconnu}` : demande.depot;
const nomDepot = demande.depotReconnu || String(demande.depot || '').replace(/^https?:\/\/github\.com\//, '');
const id = demande.id || `REP-${Date.now().toString(36).toUpperCase()}`;
const slug = nomDepot.replace(/[^A-Za-z0-9]+/g, '-').toLowerCase() || 'client';
const dossier = iOut >= 0 ? args[iOut + 1] : join('livraisons', `reponse-${slug}-${id}`);
if (!existsSync(dossier)) mkdirSync(dossier, { recursive: true });

const sha = (p) => createHash('sha256').update(readFileSync(p)).digest('hex');
const date = new Date().toISOString().slice(0, 10);

// 1. Analyse fraîche + rapport signé + SARIF (sources de vérité, pas de recopie).
execFileSync('node', ['tools/audit-sarif.mjs', depotUrl, '--out', join(dossier, 'audit.sarif')],
  { stdio: 'pipe', timeout: 900000 });
execFileSync('node', ['tools/livrable-signe.mjs', depotUrl, '--client', nomDepot, '--out', join(dossier, 'RAPPORT.html')],
  { stdio: 'pipe', timeout: 900000 });

const sarif = JSON.parse(readFileSync(join(dossier, 'audit.sarif'), 'utf8'));
const constats = sarif.runs[0].results.length;
const prioritaires = sarif.runs[0].results.filter(r => r.level === 'error').length;
const fichiers = sarif.runs[0].invocations[0].properties.fichiersAnalyses;
const lignes = sarif.runs[0].invocations[0].properties.lignesAnalysees;

// 2. Chiffrage — même règle que le guichet : le total EST la somme des postes.
const T = { base: 90, tranche: 25, langage: 20, plafond: 690, minimum: 90 };
const brut = Math.max(0, Math.ceil(lignes / 10000) - 1);
const exts = new Set(sarif.runs[0].results.map(r => {
  const u = r.locations[0].physicalLocation.artifactLocation.uri; const i = u.lastIndexOf('.'); return i >= 0 ? u.slice(i) : 'autre';
}));
const nbLang = Math.max(1, exts.size);
const supL = nbLang > 1 ? (nbLang - 1) * T.langage : 0;
let tranches = brut;
while (T.base + tranches * T.tranche + supL > T.plafond && tranches > 0) tranches--;
const postes = [
  { p: 'Analyse et restitution', m: T.base },
  { p: `${tranches} tranche(s) de 10 000 lignes`, m: tranches * T.tranche },
  { p: `${nbLang} langage(s) détecté(s)`, m: supL },
].filter(x => x.m > 0);
const total = Math.max(T.minimum, Math.min(postes.reduce((a, x) => a + x.m, 0), T.plafond));
const coherent = postes.reduce((a, x) => a + x.m, 0) === total;

// 3. Devis.
writeFileSync(join(dossier, 'DEVIS.md'), `# Devis ${id}

- **Date :** ${date}
- **Prestataire :** Arthur Grossi EI — audit de code statique — arthhur.grossi@gmail.com
- **Objet analysé :** ${nomDepot} (${depotUrl})
- **Constat préalable :** ${fichiers} fichiers, ${lignes.toLocaleString('fr-FR')} lignes, **${constats} constats dont ${prioritaires} prioritaires**

## Chiffrage

| Poste | Montant |
|---|---|
${postes.map(x => `| ${x.p} | ${x.m} € |`).join('\n')}
| **Total ferme** | **${total} €** |

${coherent ? '' : '> Anomalie interne : le total ne correspond pas à la somme des postes, ce devis ne doit pas être envoyé tel quel.\n'}
**${total} €**, montant ferme, convenu avant commande. Aucun prélèvement automatique, aucune reconduction tacite.
Paiement : PayPal (arthhur.grossi@gmail.com) ou virement professionnel — coordonnées transmises sur demande, jamais publiées.

## Périmètre inclus  /  exclusions écrites

Inclus : rapport relu et faux positifs arbitrés, constats localisés (fichier, ligne, extrait),
SARIF intégrable à votre CI, empreinte SHA-256 vérifiable, échange écrit sur les constats.

Exclu, et écrit avant la commande :
- aucune correction de code — je signale, je ne modifie pas votre dépôt ;
- analyse **statique**, code **jamais exécuté** — ce n'est pas un test d'intrusion ;
- aucune garantie d'absence de vulnérabilité, seulement la présence ou l'absence de constructions précises ;
- un constat déplacé d'une ligne ne compte pas comme corrigé.
`);

// 4. Réponse e-mail prête à envoyer (jamais envoyée par ce script).
const objet = `Audit de code statique — devis pour ${nomDepot}`;
const corps = `Bonjour,

J'ai lancé une analyse sur ${nomDepot} (${depotUrl}) avant de vous répondre.

Résultat mesuré, pas estimé :
- ${fichiers} fichiers, ${lignes.toLocaleString('fr-FR')} lignes analysées
- ${constats} constats relevés, dont ${prioritaires} de priorité haute
- rapport joint, chaque constat localisé (fichier, ligne, extrait de code)

Chiffrage : ${total} € fermes. Détail dans le devis joint.

Ce que je ne fais pas, écrit avant que vous payiez :
- je ne modifie pas votre code, je le signale ;
- l'analyse est statique : le code n'est jamais exécuté, ce n'est pas un test d'intrusion ;
- je ne garantis pas l'absence de vulnérabilité, je constate la présence de constructions précises.

Le rapport est signé (SHA-256) : vous pouvez vérifier qu'il n'a pas été modifié après
livraison, sans avoir à me faire confiance. L'outil d'analyse est public et gratuit —
vous pouvez reproduire ce résultat vous-même avant de décider quoi que ce soit.

Si ce devis ne convient pas, dites-le simplement : rien n'est facturé, rien n'est relancé.

Arthur Grossi EI — audit de code statique
arthhur.grossi@gmail.com
`;
writeFileSync(join(dossier, 'REPONSE-EMAIL.md'), `**Objet :** ${objet}\n\n---\n\n${corps}`);
writeFileSync(join(dossier, 'REPONSE-EMAIL.txt'), corps);

// 5. LISEZMOI + manifeste.
writeFileSync(join(dossier, 'LISEZMOI.md'), `# Réponse préparée — ${nomDepot}

${constats} constats, ${prioritaires} prioritaires · ${lignes.toLocaleString('fr-FR')} lignes · devis ${total} €

## Contenu

| Fichier | Rôle |
|---|---|
| \`REPONSE-EMAIL.md\` | Message prêt à envoyer (objet + corps). **Non envoyé** : la remise exige une action encadrée. |
| \`DEVIS.md\` | Chiffrage ferme, postes additionnés au total. |
| \`RAPPORT.html\` | Rapport signé, chaque constat localisé. |
| \`audit.sarif\` | Format GitHub / VS Code / GitLab. |
| \`MANIFESTE.json\` | Empreinte de chaque fichier : rien n'est ajouté après coup. |

## Portée honnête

Analyse statique par motifs. Le code n'est **jamais exécuté**. Les fichiers de test,
exemples et dépendances sont exclus. Chaque entrée est un **constat**, pas une
vulnérabilité confirmée : un arbitrage humain reste nécessaire.
`);

const fichiersLivres = readdirSync(dossier).sort();
writeFileSync(join(dossier, 'MANIFESTE.json'), JSON.stringify({
  id, quand: new Date().toISOString(), depot: nomDepot, constats, prioritaires, prix: total, coherent,
  fichiers: fichiersLivres.map(f => ({ nom: f, sha256: sha(join(dossier, f)) })),
}, null, 2));

console.log(JSON.stringify({ id, depot: nomDepot, constats, prioritaires, total, coherent,
  dossier, fichiers: fichiersLivres.length, envoi: 'aucun — préparation seule' }, null, 2));
