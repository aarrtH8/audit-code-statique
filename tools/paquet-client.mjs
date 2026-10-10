#!/usr/bin/env node
/**
 * paquet-client.mjs <depot|url> --client "Nom" [--out dossier]
 *
 * Produit UN SEUL dossier livrable, prêt à être envoyé au client :
 *   livrable-<client>/
 *     RAPPORT.html          rapport signé (SHA-256)
 *     RAPPORT.html.sha256   empreinte du rapport
 *     audit.sarif           format natif GitHub / VS Code / GitLab
 *     audit.sarif.sha256    empreinte du SARIF
 *     audit-verification.yml  workflow à coller dans .github/workflows/
 *     LISEZMOI.md           ce qui est prouvé, ce qui ne l'est pas, comment vérifier
 *     COMMANDER-UN-SUIVI.md  ce qui est inclus, ce qui ne l'est pas, prix au devis
 *
 * Honnêteté : aucune promesse de « sécurité garantie ». Le LISEZMOI délimite
 * précisément la portée de l'analyse.
 */
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, writeFileSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const args = process.argv.slice(2);
const cible = args.find(a => !a.startsWith('--'));
const iClient = args.indexOf('--client');
const client = (iClient >= 0 ? args[iClient + 1] : null) || 'Client';
const iOut = args.indexOf('--out');
if (!cible) { console.error('Usage: node tools/paquet-client.mjs <depot|url> --client "Nom" [--out dossier]'); process.exit(2); }

const slug = client.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'') || 'client';
const dossier = iOut >= 0 ? args[iOut + 1] : join('livraisons', `livrable-${slug}`);
if (!existsSync(dossier)) mkdirSync(dossier, { recursive: true });

const sha = (chemin) => createHash('sha256').update(readFileSync(chemin)).digest('hex');

console.log('→ Génération du rapport signé…');
const sortieRapport = join(dossier, 'RAPPORT.html');
execFileSync('node', ['tools/livrable-signe.mjs', cible, '--client', client, '--out', sortieRapport], { stdio: 'pipe', timeout: 600000 });

console.log('→ Génération du SARIF…');
const sortieSarif = join(dossier, 'audit.sarif');
execFileSync('node', ['tools/audit-sarif.mjs', cible, '--out', sortieSarif], { stdio: 'pipe', timeout: 600000 });

const hRapport = sha(sortieRapport);
const hSarif = sha(sortieSarif);
writeFileSync(join(dossier, 'RAPPORT.html.sha256'), `${hRapport}  RAPPORT.html\n`);
writeFileSync(join(dossier, 'audit.sarif.sha256'), `${hSarif}  audit.sarif\n`);

const sarif = JSON.parse(readFileSync(sortieSarif, 'utf8'));
const nbConstats = sarif.runs[0].results.length;
const nbErreurs = sarif.runs[0].results.filter(r => r.level === 'error').length;
const nbFichiers = sarif.runs[0].invocations[0].properties.fichiersAnalyses;
const nbLignes = sarif.runs[0].invocations[0].properties.lignesAnalysees;
const date = new Date().toISOString().slice(0,10);

writeFileSync(join(dossier, 'audit-verification.yml'), `name: Audit de code statique
on:
  push:
    branches: [main]
  pull_request:
  workflow_dispatch:
permissions:
  contents: read
  security-events: write
jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
      # L'auditeur est fourni avec ce rapport : déposez audit-sarif.mjs dans ./tools/
      - name: Audit statique
        run: node tools/audit-sarif.mjs . --out audit.sarif
      - name: Publier dans l'onglet Security
        uses: github/codeql-action/upload-sarif@v3
        with:
          sarif_file: audit.sarif
`);

writeFileSync(join(dossier, 'LISEZMOI.md'), `# Livrable d'audit de code statique — ${client}

Réalisé le ${date} par **Arthur Grossi EI** — audit de code statique
Contact : arthhur.grossi@gmail.com

## Contenu du dossier

| Fichier | Rôle |
|---|---|
| \`RAPPORT.html\` | Rapport principal : chaque constat avec fichier, ligne, extrait et correction attendue. Ouvrable dans un navigateur, imprimable en PDF. |
| \`RAPPORT.html.sha256\` | Empreinte du rapport : permet de prouver qu'il n'a pas été modifié après livraison. |
| \`audit.sarif\` | Même contenu au format **SARIF 2.1.0**, lu nativement par GitHub (onglet Security), VS Code (extension SARIF Viewer) et GitLab. |
| \`audit.sarif.sha256\` | Empreinte du SARIF. |
| \`audit-verification.yml\` | Workflow à déposer dans \`.github/workflows/\` : l'audit se relance à chaque \`push\`. |

## Ce que ce livrable prouve

- La présence, à la date du ${date}, des constructions listées, aux fichiers et lignes cités.
- Source analysée : ${nbFichiers} fichiers, ${nbLignes.toLocaleString('fr-FR')} lignes.
- ${nbConstats} constats relevés, dont ${nbErreurs} de niveau prioritaire.

## Ce que ce livrable NE prouve PAS

- **Il ne prouve pas l'absence de vulnérabilité.** Seules les constructions correspondant aux règles appliquées sont recherchées.
- **Le code n'a jamais été exécuté.** C'est une analyse statique de motifs, pas un test d'intrusion.
- Les fichiers de test, exemples et dépendances tierces sont exclus de l'analyse.
- Chaque entrée est un **constat**, pas une vulnérabilité confirmée : un arbitrage humain reste nécessaire pour écarter les faux positifs.

## Comment vérifier l'intégrité vous-même

\`\`\`bash
# 1. Vérifier que le rapport est intact
sha256sum -c RAPPORT.html.sha256

# 2. Vérifier que le SARIF est intact
sha256sum -c audit.sarif.sha256
\`\`\`

Sur Windows (PowerShell) :
\`\`\`powershell
(Get-FileHash RAPPORT.html -Algorithm SHA256).Hash.ToLower()
\`\`\`
La valeur affichée doit correspondre à la première colonne de \`RAPPORT.html.sha256\`.

## Relancer l'audit vous-même, gratuitement

L'auditeur utilisé est public et gratuit :
https://aarrth8.github.io/audit-code-statique/audit-depot.html

Vous pouvez donc reproduire ce rapport avant même de régler quoi que ce soit. C'est volontaire : vous payez un accompagnement et une relecture, pas un accès.
`);

writeFileSync(join(dossier, 'COMMANDER-UN-SUIVI.md'), `# Suite de l'audit — ${client}

## Inclus dans la prestation d'audit

- Le rapport complet ci-joint, relu avant envoi (faux positifs arbitrés).
- Une version SARIF intégrée à votre CI, si vous le souhaitez.
- Un échange écrit pour répondre à vos questions sur les constats.

## Non inclus (pour rester clair)

- Aucune correction de code n'est incluse : je signale, je ne modifie pas votre dépôt.
- Aucun test d'intrusion : l'analyse est statique, le code n'est pas exécuté.
- Aucune garantie de sécurité : je démontre la présence ou l'absence de constructions précises, rien de plus.

## Vérification de correction (option)

Après vos corrections, je peux comparer les deux versions et produire une
**vérification différentielle** : quels constats ont réellement disparu, lesquels
subsistent, et quelles régressions nouvelles sont apparues. Le déplacement d'une
ligne ne compte pas comme une correction.

## Prix

Montant et devise convenus **avant toute commande**, par écrit. Aucun prélèvement
automatique. Paiement par PayPal (arthhur.grossi@gmail.com) ou virement
professionnel (Arthur Grossi EI) — coordonnées transmises sur demande, jamais
publiées.

## Contact

arthhur.grossi@gmail.com — réponse sous 24 h ouvrées.
`);

// Manifeste : le client peut vérifier que rien n'a été ajouté après coup.
const contenu = readdirSync(dossier).sort();
const manifeste = {
  client, source: cible, date: new Date().toISOString(),
  fichiers: contenu.map(f => ({ nom: f, sha256: createHash('sha256').update(readFileSync(join(dossier,f))).digest('hex') })),
};
writeFileSync(join(dossier, 'MANIFESTE.json'), JSON.stringify(manifeste, null, 2));

console.log(JSON.stringify({ client, dossier, fichiers: contenu.length,
  constats: nbConstats, prioritaires: nbErreurs, empreinteRapport: hRapport.slice(0,16) + '…',
  manifeste: join(dossier,'MANIFESTE.json') }, null, 2));
