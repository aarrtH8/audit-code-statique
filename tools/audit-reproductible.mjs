#!/usr/bin/env node
/**
 * audit-reproductible.mjs <depot|url> [--out racine]
 *
 * Le client doit pouvoir REFAIRE l'audit et retrouver les mêmes chiffres.
 * Ce script produit la preuve de reproductibilité : deux passes indépendantes
 * sur le même état du dépôt, puis comparaison des décomptes.
 *
 * Si les deux passes divergent, le rapport ne doit pas être livré : on le dit.
 * Un audit qu'on ne peut pas reproduire n'est pas un audit, c'est une affirmation.
 */
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const args = process.argv.slice(2);
const cible = args.find(a => !a.startsWith('--'));
const iOut = args.indexOf('--out');
const racine = iOut >= 0 ? args[iOut + 1] : join('preuves', `reproductibilite-${Date.now().toString(36)}`);
if (!cible) { console.error('Usage: node tools/audit-reproductible.mjs <depot|url> [--out dossier]'); process.exit(2); }
if (!existsSync(racine)) mkdirSync(racine, { recursive: true });

const passer = (n) => {
  const sortie = join(racine, `passe-${n}.sarif`);
  const brut = execFileSync('node', ['tools/audit-sarif.mjs', cible, '--out', sortie],
    { stdio: 'pipe', timeout: 900000, encoding: 'utf8' });
  const j = JSON.parse(brut);
  const contenu = readFileSync(sortie);
  return {
    n, fichiers: j.fichiersAnalyses, lignes: j.lignesAnalysees,
    constats: j.constats, parNiveau: j.parNiveau,
    empreinteSarif: createHash('sha256').update(contenu).digest('hex'),
  };
};

console.log('→ Passe 1…'); const p1 = passer(1);
console.log('→ Passe 2…'); const p2 = passer(2);

// Comparaison champ à champ : on nomme précisément ce qui diverge.
const champs = ['fichiers', 'lignes', 'constats'];
const ecarts = champs.filter(c => p1[c] !== p2[c]).map(c => ({ champ: c, passe1: p1[c], passe2: p2[c] }));
const identiques = ecarts.length === 0;
const memeEmpreinte = p1.empreinteSarif === p2.empreinteSarif;

const rapport = {
  cible, quand: new Date().toISOString(),
  reproductible: identiques,
  sarifIdentique: memeEmpreinte,
  ecarts,
  passes: [p1, p2],
  interpretation: identiques
    ? (memeEmpreinte
        ? 'Décomptes ET contenu SARIF identiques sur deux passes indépendantes : le rapport est reproductible.'
        : 'Décomptes identiques, contenu SARIF différent — à examiner avant de livrer (ordre ou métadonnée variable).')
    : 'DÉCOMPTES DIVERGENTS : le rapport ne doit pas être livré tel quel.',
};

writeFileSync(join(racine, 'reproductibilite.json'), JSON.stringify(rapport, null, 2));
writeFileSync(join(racine, 'LISEZMOI.md'), `# Preuve de reproductibilité — ${cible}

Deux analyses indépendantes du même état du dépôt, le ${new Date().toISOString().slice(0,10)}.

| Mesure | Passe 1 | Passe 2 |
|---|---|---|
| Fichiers | ${p1.fichiers} | ${p2.fichiers} |
| Lignes | ${p1.lignes.toLocaleString('fr-FR')} | ${p2.lignes.toLocaleString('fr-FR')} |
| Constats | ${p1.constats} | ${p2.constats} |
| Empreinte SARIF | \`${p1.empreinteSarif.slice(0,32)}…\` | \`${p2.empreinteSarif.slice(0,32)}…\` |

**Conclusion :** ${rapport.interpretation}

## Pourquoi ce document existe

Un client n'a aucune raison de croire un chiffre sans pouvoir le reproduire. Ce fichier
montre que les résultats publiés sont stables : la même analyse, relancée, donne le même
résultat. Si les passes divergeaient, ce document le dirait au lieu de le cacher.
`);

console.log(JSON.stringify({ cible, reproductible: identiques, sarifIdentique: memeEmpreinte,
  ecarts, constats: p1.constats, dossier: racine }, null, 2));
process.exit(identiques ? 0 : 1);
