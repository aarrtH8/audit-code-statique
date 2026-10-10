/**
 * pre-remplir-issue.mjs — injecte un formulaire réel dans {
 * Il transforme les champs saisis en une URL GitHub `issues/new?title=&body=`
 * pré-remplie : le visiteur n'a qu'à cliquer "Submit new issue". Aucun compte
 * au-delà de GitHub, aucun endpoint serveur, rien qui mente sur la capacité.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const RACINE = process.cwd();
const CIBLE = join(RACINE, 'work-pages', 'commande.html');
const DEPOT = 'aarrtH8/audit-code-statique';
const MARQUEUR_D = '<!-- FORMULAIRE-DEMANDE:DEBUT -->';
const MARQUEUR_F = '<!-- FORMULAIRE-DEMANDE:FIN -->';

const D = MARQUEUR_D;
const F = MARQUEUR_F;

const bloc = `${D}
<h2>Formulaire de demande</h2>
<p class="lead">Remplissez, puis cliquez sur le bouton : votre demande s'ouvre déjà rédigée sur GitHub. Vous n'avez plus qu'à appuyer sur « Submit new issue ». Le champ e-mail est optionnel — si vous ne le laissez pas, nous ne pourrons pas vous répondre par message, seulement par le fil GitHub.</p>

<div class="form">
  <label>Votre nom ou raison sociale <input id="f-nom" placeholder="ex. Dupont SARL"></label>
  <label>Adresse e-mail (optionnel) <input id="f-mail" type="email" placeholder="vous@exemple.fr"></label>
  <label>Dépôt ou extrait à analyser <input id="f-depot" placeholder="https://github.com/vous/projet ou « extrait fourni »"></label>
  <label>Langage principal
    <select id="f-lang">
      <option>JavaScript / TypeScript</option><option>Python</option><option>PHP</option>
      <option>Ruby</option><option>Go</option><option>Autre / plusieurs</option>
    </select>
  </label>
  <label>Palier souhaité
    <select id="f-palier">
      <option value="90">Audit ciblé — dès 90 €</option>
      <option value="290">Audit complet — dès 290 €</option>
      <option value="490">Conformité &amp; historique Git — dès 490 €</option>
      <option value="0">À déterminer ensemble</option>
    </select>
  </label>
  <label>Que voulez-vous obtenir ? <textarea id="f-besoin" placeholder="ex. vérifier avant mise en production, rassurer un client, préparer une certification…"></textarea></label>
</div>

<div class="actions">
  <button id="f-envoyer">Ouvrir ma demande sur GitHub →</button>
  <button class="sec" id="f-copier">Copier le texte de la demande</button>
  <span id="f-etat" class="lead"></span>
</div>

<script>
(function(){
  const DEPOT = ${JSON.stringify(DEPOT)};
  const v = id => (document.getElementById(id)?.value || '').trim();
  function texte(){
    const palier = v('f-palier');
    const p = palier === '0' ? 'à déterminer au devis' : palier + ' € (indicatif, prix ferme au devis)';
    return [
      '## Demande d\\'audit de code statique',
      '',
      '- **Nom / raison sociale :** ' + (v('f-nom') || '—'),
      '- **Contact :** ' + (v('f-mail') || 'à préciser dans le fil'),
      '- **Dépôt ou extrait :** ' + (v('f-depot') || 'à préciser'),
      '- **Langage principal :** ' + v('f-lang'),
      '- **Palier souhaité :** ' + p,
      '',
      '### Objectif',
      v('f-besoin') || '—',
      '',
      '### Ce que j\\'accepte',
      '- L\\'analyse est statique : mon code n\\'est pas exécuté.',
      '- Le rapport est un livrable en markdown + HTML, faux positifs arbitrés lors de la restitution.',
      '- Aucun engagement ni paiement avant réception d\\'un devis ferme que j\\'aurai validé.',
      '- Paiement : PayPal arthhur.grossi@gmail.com ou virement professionnel (Arthur Grossi EI), après validation du devis.',
    ].join('\\n');
  }
  document.getElementById('f-envoyer').onclick = () => {
    const corps = texte();
    const titre = '[Devis] ' + (v('f-nom') || 'Demande') + ' — ' + v('f-lang');
    const url = 'https://github.com/' + DEPOT + '/issues/new?title=' + encodeURIComponent(titre) + '&body=' + encodeURIComponent(corps);
    window.open(url, '_blank');
    document.getElementById('f-etat').textContent = 'Demande ouverte dans un nouvel onglet — appuyez sur Submit new issue.';
  };
  document.getElementById('f-copier').onclick = () => {
    navigator.clipboard.writeText(texte()).then(()=>{
      const b = document.getElementById('f-copier'); const o = b.textContent;
      b.textContent = 'Copié ✓'; setTimeout(()=>b.textContent = o, 1800);
    }).catch(()=>{ document.getElementById('f-etat').textContent = 'Copie refusée par le navigateur — sélectionnez le texte manuellement.'; });
  };
})();
</script>
${F}`;

let html = readFileSync(CIBLE, 'utf8');
if (!html.includes('class="form"')) {
  html = html.replace('</body>', `<style>
.form{display:grid;gap:12px;margin:16px 0}
.form label{display:flex;flex-direction:column;gap:5px;font-size:.9rem;color:#8b949e}
.form input,.form select,.form textarea{background:#010409;color:#c9d1d9;border:1px solid #30363d;border-radius:6px;padding:9px;font-size:.92rem;font-family:inherit}
.form textarea{min-height:90px;resize:vertical}
.actions{display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin:10px 0 24px}
.actions button{background:#58a6ff;color:#04121f;border:0;border-radius:8px;padding:11px 18px;font-weight:700;cursor:pointer}
.actions button.sec{background:transparent;color:#c9d1d9;border:1px solid #30363d}
</style></body>`);
}
// Remplace un bloc précédent s'il existe, sinon insère avant la fin du corps.
const re = new RegExp(D.replace(/[.*+?^${}()|[\]\\]/g,'\\$&') + '[\\s\\S]*?' + F.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'));
html = re.test(html) ? html.replace(re, bloc) : html.replace('</body>', bloc + '\n</body>');
writeFileSync(CIBLE, html);
console.log('Formulaire injecté dans commande.html (' + bloc.length + ' octets).');
