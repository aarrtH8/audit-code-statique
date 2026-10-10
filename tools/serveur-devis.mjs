/**
 * serveur-devis.mjs — guichet public de demande de devis.
 *
 * Ce que ce service fait réellement :
 *   - GET  /                → page de présentation honnête + formulaire
 *   - GET  /api/etat        → JSON : combien de demandes reçues (preuve en direct)
 *   - POST /api/devis       → enregistre une demande dans demandes/*.json
 *
 * Ce qu'il ne fait PAS : encaisser, simuler un paiement, fabriquer un client.
 * Il n'existe ici aucun compte de paiement ; la page renvoie vers PayPal/IBAN du
 * créateur (coordonnées dans acquisition/PAIEMENTS-CREATEUR.json, jamais exposées
 * en clair par ce serveur).
 *
 * Démarrage : node tools/serveur-devis.mjs   (PORT par défaut : 8099)
 */
import { createServer } from 'node:http';
import { mkdirSync, writeFileSync, readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HOME = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIR = join(HOME, 'demandes');
if (!existsSync(DIR)) mkdirSync(DIR, { recursive: true });

const PORT = Number(process.env.PORT) || 8099;

const PAGE = `<!doctype html><html lang="fr"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Audit de code statique — demande de devis</title>
<style>
:root{--b:#0b1220;--c:#e8eefc;--a:#4da3ff}
*{box-sizing:border-box}body{margin:0;background:var(--b);color:var(--c);
font:16px/1.6 system-ui,Segoe UI,sans-serif}
main{max-width:720px;margin:0 auto;padding:48px 20px}
h1{font-size:1.7rem;margin:0 0 .3em}p.lead{color:#9db0d0}
.card{background:#111b2e;border:1px solid #1e2d47;border-radius:12px;padding:22px;margin:22px 0}
label{display:block;margin:.7em 0 .2em;font-size:.9rem;color:#9db0d0}
input,textarea{width:100%;padding:10px;border-radius:8px;border:1px solid #24365a;
background:#0d1626;color:var(--c);font:inherit}
button{margin-top:14px;background:var(--a);color:#04203f;border:0;border-radius:8px;
padding:11px 20px;font-weight:700;cursor:pointer}
.warn{border-color:#5a3a1e;background:#1c1409;color:#f0c98a}
code{background:#0d1626;padding:2px 6px;border-radius:5px;font-size:.88em}
#out{margin-top:14px;font-size:.92rem}
</style></head><body><main>
<h1>Audit de code statique</h1>
<p class="lead">Analyse automatisée de motifs dans votre dépôt. Rapports fichier:ligne.
Prix sur devis. Aucun engagement avant accord écrit.</p>

<div class="card warn">
<strong>Ce que je ne fais pas.</strong> Je n'exécute pas votre code, je ne modifie rien,
je ne prétends pas qu'un constat est une vulnérabilité confirmée. Un constat est un motif à
vérifier. Si ce n'est pas ce que vous cherchez, je préfère vous le dire avant.
</div>

<div class="card">
<form id="f">
  <label>URL du dépôt Git (public ou accessible)</label>
  <input name="depot" required placeholder="https://github.com/editeur/projet">
  <label>Votre e-mail (pour vous répondre)</label>
  <input name="email" type="email" required placeholder="vous@exemple.fr">
  <label>Ce que vous voulez savoir (facultatif)</label>
  <textarea name="besoin" rows="3" placeholder="Ex. : repérer les motifs d'injection dans l'API"></textarea>
  <button type="submit">Envoyer la demande</button>
  <div id="out"></div>
</form>
</div>

<div class="card">
<strong>Comment ça se passe.</strong> Je reçois votre demande, je regarde le dépôt, je vous
réponds avec un devis chiffré (montant et devise convenus avant toute commande).
Paiement par PayPal ou virement professionnel, <em>après</em> accord. Aucun prélèvement automatique.
</div>
</main>
<script>
const f=document.getElementById('f'),out=document.getElementById('out');
f.addEventListener('submit',async e=>{
  e.preventDefault();out.textContent='Envoi…';
  const d=Object.fromEntries(new FormData(f));
  try{const r=await fetch('/api/devis',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(d)});
    const j=await r.json();
    out.innerHTML=j.ok?('Demande enregistrée. Référence : <code>'+j.ref+'</code>. Je réponds à l\\'adresse indiquée.'):('Erreur : '+(j.erreur||'inconnue'));
    if(j.ok)f.reset();
  }catch(err){out.textContent='Erreur réseau.';}
});
</script></body></html>`;

const json = (res, code, obj) => {
  res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(obj));
};

const serveur = createServer((req, res) => {
  const u = new URL(req.url, 'http://x');

  if (req.method === 'GET' && (u.pathname === '/' || u.pathname === '/index.html')) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    return res.end(PAGE);
  }

  if (req.method === 'GET' && u.pathname === '/api/etat') {
    const fichiers = readdirSync(DIR).filter(f => f.endsWith('.json'));
    const demandes = fichiers.map(f => { try { return JSON.parse(readFileSync(join(DIR, f), 'utf8')); } catch { return null; } }).filter(Boolean);
    return json(res, 200, {
      service: 'audit-devis',
      maintenant: new Date().toISOString(),
      demandesRecues: fichiers.length,
      avecReponse: demandes.filter(d => d.repondu).length,
      revenuEur: 0,
      note: 'Aucun paiement encaissé par ce service. Le revenu affiché est 0 tant qu\'aucune preuve de réception n\'est enregistrée.',
    });
  }


  if (req.method === 'GET' && u.pathname === '/api/demandes') {
    const fichiers = readdirSync(DIR).filter(f => f.endsWith('.json'));
    const liste = fichiers.map(f => { try { const d = JSON.parse(readFileSync(join(DIR, f), 'utf8'));
      return { ref: d.ref, quand: d.quand, depot: d.depot, rapportProduit: !!d.rapportProduit, paye: !!d.paye }; } catch { return null; } }).filter(Boolean);
    return json(res, 200, { total: liste.length, demandes: liste });
  }

  if (req.method === 'GET' && u.pathname.startsWith('/livraison/')) {
    const ref = u.pathname.slice('/livraison/'.length).replace(/[^A-Za-z0-9]/g, '');
    const rap = join(HOME, 'livraisons', ref, 'rapport.md');
    if (!existsSync(rap)) return json(res, 404, { erreur: 'aucun rapport pour cette référence' });
    res.writeHead(200, { 'Content-Type': 'text/markdown; charset=utf-8' });
    return res.end(readFileSync(rap, 'utf8'));
  }

  if (req.method === 'POST' && u.pathname === '/api/devis') {
    let corps = '';
    req.on('data', c => { corps += c; if (corps.length > 20000) req.destroy(); });
    req.on('end', () => {
      let d; try { d = JSON.parse(corps); } catch { return json(res, 400, { ok: false, erreur: 'JSON invalide' }); }
      if (!d.depot || !/^https?:\/\//.test(d.depot)) return json(res, 400, { ok: false, erreur: 'URL de dépôt requise' });
      if (!d.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(d.email)) return json(res, 400, { ok: false, erreur: 'e-mail valide requis' });
      const ref = 'D' + Date.now().toString(36).toUpperCase();
      const enr = { ref, quand: new Date().toISOString(), depot: d.depot, email: d.email, besoin: String(d.besoin || '').slice(0, 2000), repondu: false, devis: null, paye: false, preuveReception: null };
      writeFileSync(join(DIR, ref + '.json'), JSON.stringify(enr, null, 2));
      console.log(`[devis] ${ref} depuis ${d.email} -> ${d.depot}`);
      return json(res, 200, { ok: true, ref });
    });
    return;
  }

  json(res, 404, { erreur: 'introuvable' });
});

serveur.listen(PORT, () => console.log(`Guichet de devis : http://localhost:${PORT}  (dossier demandes: ${DIR})`));
