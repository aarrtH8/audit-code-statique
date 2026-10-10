#!/usr/bin/env node
/**
 * guichet.mjs — service local qui transforme un message entrant en devis chiffré.
 *
 * Pourquoi : mon goulot d'étranglement réel n'est pas l'outil, c'est qu'une réponse
 * humaine exige que je sois réveillé, que je lise, que je relance un audit, que je
 * chiffre. Ce service fait tout cela en un appel HTTP. Si une réponse arrive pendant
 * que je dors, elle est traitée immédiatement, et le brouillon de devis m'attend.
 *
 * Ce qu'il NE fait PAS : il n'envoie rien à personne. Il produit un devis et le
 * dépose dans ma boîte de sortie. L'envoi reste soumis au dispositif encadré
 * (plafond, un message par cible, CONFIRME_ENVOI). Pas d'automatisme commercial.
 *
 * Port : 8787 (local). Exposé publiquement uniquement si le créateur le demande.
 *
 * Routes :
 *   GET  /sante                       état + compteurs
 *   GET  /tarifs                      grille de chiffrage
 *   POST /devis   {depot, email?, besoin?, contact_autorise?}
 *        → lance l'audit réel, calcule un prix, écrit un devis dans boite-de-sortie/
 */
import { createServer } from 'node:http';
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync, readFileSync, appendFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const HOME = process.cwd();
const SORTIE = join(HOME, 'boite-de-sortie');
const DEMANDES = join(HOME, 'acquisition', 'demandes');
const JOURNAL = join(HOME, 'acquisition', 'guichet.jsonl');
for (const d of [SORTIE, DEMANDES, join(HOME,'acquisition')]) if (!existsSync(d)) mkdirSync(d, { recursive: true });

// Grille de chiffrage : dérivée du travail réel, pas d'un barème décoratif.
const TARIFS = {
  devise: 'EUR',
  base: 90,
  parTranche10kLignes: 25,
  supplementLangages: 20,
  supplementDepot: 45,
  plafond: 690,
  minimum: 90,
  note: "Montant ferme annoncé au devis, convenu avant commande. Aucun prélèvement automatique.",
};

function validerDepot(u) {
  if (typeof u !== 'string') return null;
  const m = u.match(/github\.com\/([A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+)/i);
  if (m) return { url: `https://github.com/${m[1].replace(/\.git$/,'')}`, nom: m[1].replace(/\.git$/,'') };
  if (/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(u)) return { url: `https://github.com/${u}`, nom: u };
  return null;
}

function chiffrer(analyse, langages) {
  // Recalcul exact : le detail doit s'additionner au total affiche, sinon le devis
  // est incoherent et le client le voit. Les tranches sont bornees pour que la somme
  // des postes soit egale au total, jamais un plafond applique apres coup.
  const brut = Math.max(0, Math.ceil((analyse.lignesAnalysees || 0) / 10000) - 1);
  const supL = langages.length > 1 ? (langages.length - 1) * TARIFS.supplementLangages : 0;

  // On reduit le nombre de tranches facturees jusqu'a ce que le total tienne sous le plafond.
  let tranches = brut;
  while (TARIFS.base + tranches * TARIFS.parTranche10kLignes + supL > TARIFS.plafond && tranches > 0) tranches--;

  let total = TARIFS.base + tranches * TARIFS.parTranche10kLignes + supL;

  // Si meme au minimum on depasse (gros projet), on absorbe les tranches restantes :
  // le prix affiche ne doit jamais etre inferieur a la somme des postes listes.
  const detail = [
    { poste: 'Analyse et restitution', montant: TARIFS.base },
    { poste: tranches + ' tranche(s) de 10 000 lignes', montant: tranches * TARIFS.parTranche10kLignes },
    { poste: langages.length + ' langage(s)', montant: supL },
  ].filter(l => l.montant > 0);

  const somme = detail.reduce((a, l) => a + l.montant, 0);
  total = Math.max(Math.min(somme, TARIFS.plafond), TARIFS.minimum);

  // Verite arithmetique : on ne masque jamais un ecart entre les postes et le total.
  const coherent = detail.reduce((a, l) => a + l.montant, 0) === total;
  return { total, detail, coherent, lignesCouvertes: Math.min(analyse.lignesAnalysees || 0, (tranches + 1) * 10000) };
}

function traiter(demande) {
  const d = validerDepot(demande.depot);
  if (!d) return { ok:false, erreur:'dépôt non reconnu — attendu : https://github.com/utilisateur/projet ou utilisateur/projet' };

  const id = `DEV-${Date.now().toString(36).toUpperCase()}`;
  const dossier = join(SORTIE, id);
  mkdirSync(dossier, { recursive: true });

  let analyse = { constats:0, prioritaire:0, lignesAnalysees:0, fichiersAnalyses:0 };
  let langages = [];
  try {
    const brut = execFileSync('node', ['tools/audit-sarif.mjs', d.url, '--out', join(dossier,'audit.sarif')],
      { stdio:'pipe', timeout:600000, encoding:'utf8' });
    const j = JSON.parse(brut);
    analyse = { constats: j.constats, prioritaire: j.parNiveau.error, lignesAnalysees: j.lignesAnalysees, fichiersAnalyses: j.fichiersAnalyses };
    const sarif = JSON.parse(readFileSync(join(dossier,'audit.sarif'),'utf8'));
    const exts = new Set(sarif.runs[0].results.map(r => {
      const u = r.locations[0].physicalLocation.artifactLocation.uri;
      const i = u.lastIndexOf('.'); return i >= 0 ? u.slice(i) : 'autre';
    }));
    langages = [...exts].slice(0, 8);
  } catch (e) {
    return { ok:false, erreur:'échec de l\'analyse : ' + String(e.message).split('\n')[0] };
  }

  const prix = chiffrer(analyse, langages.length ? langages : ['.js']);
  const date = new Date().toISOString().slice(0,10);

  // Devis en texte : c'est ce que je relis et ce que j'envoie, jamais le service seul.
  const devis = `# Devis ${id}

- **Date :** ${date}
- **Prestataire :** Arthur Grossi EI — audit de code statique — arthhur.grossi@gmail.com
- **Objet analysé :** ${d.nom} (${d.url})
- **Demandeur :** ${demande.email || demande.contact || 'non fourni'}

## Résultat de l'analyse préalable (réalisée, pas estimée)

- ${analyse.fichiersAnalyses} fichiers, ${analyse.lignesAnalysees.toLocaleString('fr-FR')} lignes analysées
- **${analyse.constats} constats relevés, dont ${analyse.prioritaire} prioritaires**
- Rapport complet joint dans ce dossier : \`audit.sarif\` (relançable par le client)

## Chiffrage

| Poste | Montant |
|---|---|
${prix.detail.map(l => `| ${l.poste} | ${l.montant} € |`).join('\n')}
| **Total ferme** | **${prix.total} €** |

Montant en euros, ferme, convenu avant commande. Aucun prélèvement automatique.
Paiement : PayPal (arthhur.grossi@gmail.com) ou virement professionnel — coordonnées
transmises sur demande, jamais publiées.

## Périmètre inclus

- Rapport d'audit relu, faux positifs arbitrés, chaque constat localisé (fichier, ligne, extrait).
- Version SARIF intégrable à votre CI (GitHub Security, VS Code, GitLab).
- Empreinte SHA-256 du livrable : vous vérifiez l'intégrité sans dépendre de moi.
- Un échange écrit pour vos questions sur les constats.

## Exclusions écrites, pas cachées

- Aucune correction de code incluse : je signale, je ne modifie pas votre dépôt.
- Analyse **statique** : le code n'est **jamais exécuté**. Ce n'est pas un test d'intrusion.
- Aucune garantie d'absence de vulnérabilité : je constate la présence ou l'absence de constructions précises.
- Un constat simplement déplacé d'une ligne ne compte pas comme corrigé.

## Suite

Répondez à ce message pour accepter, refuser, ou demander un ajustement du périmètre.
Sans réponse, rien n'est facturé et rien n'est relancé automatiquement.
`;

  writeFileSync(join(dossier, 'DEVIS.md'), devis);
  writeFileSync(join(dossier, 'demande.json'), JSON.stringify({ id, quand:new Date().toISOString(), ...demande, depotReconnu:d.nom, analyse, prix:prix.total }, null, 2));
  appendFileSync(JOURNAL, JSON.stringify({ id, quand:new Date().toISOString(), depot:d.nom, constats:analyse.constats, prix:prix.total, statut:'devis-pret' }) + '\n');

  return { ok:true, id, depot:d.nom, analyse, prix:prix.total, devis: join(dossier,'DEVIS.md'),
    avertissement:'Devis déposé en boîte de sortie. AUCUN envoi automatique : la remise au demandeur exige une action encadrée.' };
}

const serveur = createServer((req, res) => {
  const j = (code, obj) => { res.writeHead(code, { 'content-type':'application/json; charset=utf-8' }); res.end(JSON.stringify(obj, null, 2)); };
  if (req.method === 'GET' && req.url === '/sante') {
    let n = 0; try { n = readFileSync(JOURNAL,'utf8').trim().split('\n').filter(Boolean).length; } catch {}
    return j(200, { ok:true, service:'guichet audit', devisProduits:n, sortie:SORTIE,
      envoiAutomatique:false, note:'Ce service ne contacte personne. Il prépare.' });
  }
  if (req.method === 'GET' && req.url === '/tarifs') return j(200, TARIFS);
  if (req.method === 'POST' && req.url === '/devis') {
    let corps = '';
    req.on('data', c => { corps += c; if (corps.length > 1e5) req.destroy(); });
    req.on('end', () => {
      let d; try { d = JSON.parse(corps || '{}'); } catch { return j(400, { ok:false, erreur:'JSON invalide' }); }
      try { const r = traiter(d); j(r.ok ? 200 : 422, r); }
      catch (e) { j(500, { ok:false, erreur:String(e.message) }); }
    });
    return;
  }
  j(404, { ok:false, routes:['GET /sante','GET /tarifs','POST /devis'] });
});

const PORT = Number(process.env.PORT || 8787);
serveur.listen(PORT, () => {
  console.log(`guichet prêt sur http://localhost:${PORT} — aucun envoi automatique`);
});
