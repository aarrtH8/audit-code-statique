#!/usr/bin/env node
/**
 * traiter-demandes.mjs — transforme une demande entrante en devis prêt à envoyer.
 * Lit acquisition/demandes-recues/*.json, écrit un devis .md + .html par demande non traitée.
 * Aucun envoi : la livraison reste une action humaine vérifiée.
 */
import { readdirSync, readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const RACINE = process.cwd();
const ENTREE = join(RACINE, 'acquisition', 'demandes-recues');
const SORTIE = join(RACINE, 'acquisition', 'devis');
if (!existsSync(SORTIE)) mkdirSync(SORTIE, { recursive: true });

const GRILLE = [
  { max: 3000, palier: 'Audit ciblé', prix: 90, jours: '2 à 5' },
  { max: 20000, palier: 'Audit complet', prix: 290, jours: '5 à 10' },
  { max: Infinity, palier: 'Audit de conformité & historique', prix: 490, jours: 'à convenir' },
];

function palierPour(lignes) {
  if (!Number.isFinite(lignes) || lignes <= 0) return { palier: 'à préciser au devis', prix: null, jours: 'à convenir', surMesure: true };
  return GRILLE.find(g => lignes <= g.max);
}

function deviseDemandee(d) {
  const t = JSON.stringify(d).toLowerCase();
  if (/eur|€|euro/.test(t)) return 'EUR (€)';
  if (/usd|\$/.test(t)) return 'USD ($)';
  if (/chf/.test(t)) return 'CHF';
  return 'EUR (€)';
}

const fichiers = existsSync(ENTREE) ? readdirSync(ENTREE).filter(f => f.endsWith('.json') && /^2026-/.test(f)) : [];
let traites = 0;

for (const f of fichiers) {
  const src = join(ENTREE, f);
  let d; try { d = JSON.parse(readFileSync(src, 'utf8')); } catch { continue; }
  const id = d.reference || d.id || f.replace(/\.json$/, '');
  const mdPath = join(SORTIE, `devis-${id}.md`);
  if (existsSync(mdPath)) continue;

  const lignes = Number(d.lignesCode || d.kloc ? (d.lignesCode || d.kloc * 1000) : NaN);
  const p = palierPour(lignes);
  const dev = 'EUR (€)';
  const date = new Date().toISOString().slice(0, 10);

  const md = `# Devis — audit de code statique

- **Référence demande :** ${id}
- **Date du devis :** ${date}
- **Prestataire :** Arthur Grossi EI
- **Contact :** arthhur.grossi@gmail.com
- **Validité :** 30 jours

## Demande reçue
${d.message || d.besoin || '(voir fiche de demande)'}
${d.depot ? `\n- Dépôt / périmètre indiqué : ${d.depot}` : ''}
${d.email ? `\n- Contact client : ${d.email}` : ''}

## Prestation proposée
- **Palier :** ${p.palier}
- **Prix de départ :** ${p.prix != null ? p.prix + ' ' + dev : 'fixé après précision du périmètre'}
- **Délai indicatif :** ${p.jours} jours ouvrés

## Périmètre inclus
- Analyse statique (règles : secrets, injection, exécution dynamique, contrôle d'accès, transport, CORS).
- Rapport fichier + ligne, classé par gravité, **faux positifs signalés et écartés**.
- Distinction explicite entre *motifs détectés* et *vulnérabilités confirmées*.
- Plan de correction priorisé.

## Ce qui n'est pas inclus
- L'exécution du code audité (jamais fait).
- Un test d'intrusion ou une garantie « zéro vulnérabilité ».
- Toute publication du code sans accord écrit du client.

## Paiement
- PayPal : arthhur.grossi@gmail.com — ou virement professionnel (titulaire Arthur Grossi EI).
- Montant et devise fermes au devis, avant commande.
- La réception effective (PayPal ou banque) est confirmée avant livraison finale.

## Prochaine étape
Répondre à ce devis en confirmant le périmètre et le dépôt à analyser. Aucun engagement avant votre accord.
`;
  writeFileSync(mdPath, md);

  const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const html = `<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8"><title>Devis ${esc(id)}</title>
<style>body{font-family:system-ui,sans-serif;max-width:760px;margin:32px auto;padding:0 20px;line-height:1.6;color:#111}
h1{font-size:1.5rem}h2{font-size:1.1rem;border-bottom:1px solid #ccc;padding-bottom:4px;margin-top:28px}
table{border-collapse:collapse;width:100%;margin:12px 0}td,th{border:1px solid #ccc;padding:8px;text-align:left;font-size:.92rem}
.tag{display:inline-block;background:#eef;border:1px solid #99f;border-radius:6px;padding:2px 8px;font-size:.8rem}</style></head><body>
<h1>Devis — audit de code statique <span class="tag">${esc(id)}</span></h1>
<p><strong>Prestataire :</strong> Arthur Grossi EI · arthhur.grossi@gmail.com · <strong>Date :</strong> ${date} · <strong>Validité :</strong> 30 jours</p>
<h2>Demande reçue</h2><p>${esc(d.message || d.besoin || '(voir fiche de demande)')}</p>
${d.depot ? `<p><strong>Dépôt / périmètre :</strong> ${esc(d.depot)}</p>` : ''}
<h2>Prestation proposée</h2>
<table><tr><th>Palier</th><td>${esc(p.palier)}</td></tr>
<tr><th>Prix de départ</th><td>${p.prix != null ? p.prix + ' ' + dev : 'fixé après précision du périmètre'}</td></tr>
<tr><th>Délai indicatif</th><td>${esc(p.jours)} jours ouvrés</td></tr></table>
<h2>Périmètre inclus</h2>
<ul><li>Analyse statique (secrets, injection, exécution dynamique, contrôle d'accès, transport, CORS).</li>
<li>Rapport fichier + ligne, classé par gravité, faux positifs écartés.</li>
<li>Motifs détectés vs vulnérabilités confirmées, distingués explicitement.</li>
<li>Plan de correction priorisé.</li></ul>
<h2>Non inclus</h2>
<ul><li>Exécution du code audité. Test d'intrusion. Garantie « zéro vulnérabilité ». Publication du code sans accord écrit.</li></ul>
<h2>Paiement</h2>
<p>PayPal : arthhur.grossi@gmail.com — ou virement professionnel, titulaire Arthur Grossi EI.<br>
Montant et devise fermes au devis, avant commande. Réception effective confirmée avant livraison finale.</p>
<h2>Prochaine étape</h2>
<p>Répondre en confirmant le périmètre et le dépôt à analyser. Aucun engagement avant votre accord.</p>
</body></html>`;
  writeFileSync(join(SORTIE, `devis-${id}.html`), html);

  console.log(`devis écrit : devis-${id}.md + .html  [${p.palier}${p.prix != null ? ' / ' + p.prix + ' €' : ''}]`);
  traites++;
}
console.log(traites ? `${traites} nouvelle(s) demande(s) traitée(s).` : 'Aucune nouvelle demande à traiter.');
