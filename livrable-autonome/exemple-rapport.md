# Rapport d'audit statique

- **Dépôt / dossier** : (dossier local)
- **Date** : 2026-10-10T16:36:18.446Z
- **Méthode** : analyse statique de motifs, code NON exécuté, aucune modification.

> **Limite explicite** : un motif détecté n'est PAS une vulnérabilité confirmée. Il doit être vérifié manuellement. Ce balayage n'est pas exhaustive.

## Résumé

| Gravité | Nombre |
|---|---|
| haute | 29 |
| moyenne | 19 |
| basse | 7 |
| **total** | **55** |

Dont 55 en code de production, 0 en tests/docs.

## Gravité haute (29)

- **Évaluation dynamique de code** — `audit-client.mjs:51` [production]
  ```
  { id: 'eval', gravite: 'moyenne', titre: 'eval() sur valeur non littérale',
  ```
- **Évaluation dynamique de code** — `audit-lib.mjs:23` [production]
  ```
  { id:'EVAL', cat:'eval() / new Function()', sev:'ÉLEVÉ', effort:'M',
  ```
- **Évaluation dynamique de code** — `audit-repo-honnete.mjs:28` [production]
  ```
  { id: 'eval', re: /\beval\s*\(/g, sev: 'ÉLEVÉ', hint: 'eval() sur données non maîtrisées.' },
  ```
- **Exécution de commande / shell** — `audit-service.mjs:46` [production]
  ```
  const run = spawnSync('node', [AUDITOR, targetDir, '--out', outMd, '--json', outJson], { encoding: 'utf8', timeout: 180000 });
  ```
- **Exécution de commande / shell** — `audit-service.mjs:56` [production]
  ```
  const r = spawnSync('tar', ['-xzf', tarPath, '-C', tmp], { encoding: 'utf8', timeout: 120000 });
  ```
- **Évaluation dynamique de code** — `botte.mjs:32` [production]
  ```
  [/\beval\s*\(/, 'eval()', 'ÉLEVÉ', 'Remplacer par un parseur explicite.'],
  ```
- **Évaluation dynamique de code** — `botte.mjs:33` [production]
  ```
  [/new\s+Function\s*\(/, 'new Function()', 'ÉLEVÉ', 'Même risque que eval().'],
  ```
- **Exécution de commande / shell** — `boucle-prospection.mjs:120` [production]
  ```
  spawnSync(process.execPath, [MOTEUR, path.join(tmp, 'src'), rap], { encoding: 'utf8', timeout: 60000 });
  ```
- **Exécution de commande / shell** — `commande.mjs:41` [production]
  ```
  spawnSync(process.execPath, [path.join(ROOT, 'tools', 'audit-moteur.mjs'), path.join(tmp, 'src'), brut],
  ```
- **Exécution de commande / shell** — `commande.mjs:44` [production]
  ```
  spawnSync(process.execPath, [path.join(ROOT, 'tools', 'filtre-honnete.mjs'), brut, filtre], { encoding: 'utf8' });
  ```
- **Exécution de commande / shell** — `contact-demo.mjs:29` [production]
  ```
  spawnSync(process.execPath, [path.join(ROOT, 'tools', 'audit-moteur.mjs'), path.join(tmp, 'src'), rap],
  ```
- **Exécution de commande / shell** — `contact-prouve.mjs:27` [production]
  ```
  spawnSync(process.execPath, [MOTEUR, path.join(tmp, 'src'), rap], { encoding: 'utf8' });
  ```
- **Exécution de commande / shell** — `demo-gratuite.mjs:15` [production]
  ```
  [/child_process[^;]*exec\s*\(/, 'Exécution de code', 'ÉLEVÉ', 'exec() de commande — valider/échapper les entrées.'],
  ```
- **Évaluation dynamique de code** — `demo-gratuite.mjs:13` [production]
  ```
  [/\beval\s*\(/, 'Exécution de code', 'ÉLEVÉ', 'eval() sur données non maîtrisées — préférer un parseur.'],
  ```
- **Évaluation dynamique de code** — `demo-gratuite.mjs:14` [production]
  ```
  [/new\s+Function\s*\(/, 'Exécution de code', 'ÉLEVÉ', 'new Function() — même risque que eval.'],
  ```
- **Exécution de commande / shell** — `demo-public.mjs:29` [production]
  ```
  const r = spawnSync(process.execPath, [MOTEUR, tmp, rap], { encoding: 'utf8' });
  ```
- **Exécution de commande / shell** — `demo-public.mjs:103` [production]
  ```
  const r = spawnSync(process.execPath, [MOTEUR, tmp, rap], { encoding: 'utf8' });
  ```
- **Secret possible en dur** — `demo-public.mjs:70` [production]
  ```
  <textarea id="code" placeholder="// collez votre code ici">const DB_PASSWORD = "s3cr3tHardcoded123";
  ```
- **Exécution de commande / shell** — `devis.mjs:27` [production]
  ```
  const r = spawnSync(process.execPath, [MOTEUR, repo, rap], { encoding: 'utf8' });
  ```
- **Évaluation dynamique de code** — `message-adresse.mjs:11` [production]
  ```
  *   - eval : eval(<identifiant>)                        (mot exact)
  ```
- **Évaluation dynamique de code** — `message-adresse.mjs:84` [production]
  ```
  ajouter({ fichier: rel, ligne: i + 1, regle: 'eval', note: 'eval() appliqué à une valeur non littérale', extrait: l.trim().slice(0, 80) });
  ```
- **Secret possible en dur** — `parcours-client.mjs:40` [production]
  ```
  const DB_PASSWORD = "hunter2superSecret";
  ```
- **Exécution de commande / shell** — `serve-public.mjs:57` [production]
  ```
  const r = spawnSync('node', [AUDIT, dir, '--out', md, '--json', js], { encoding: 'utf8', timeout: 180000 });
  ```
- **Exécution de commande / shell** — `serve-public.mjs:60` [production]
  ```
  spawnSync('node', [RAP, js, '--nom', path.basename(dir), '--out', clientMd], { encoding: 'utf8', timeout: 60000 });
  ```
- **Exécution de commande / shell** — `service-guichet.mjs:62` [production]
  ```
  const child = spawn(process.execPath, [path.join(ROOT, 'tools', 'guichet.mjs'), String(PORT)],
  ```
- **Secret possible en dur** — `test-auditeur.mjs:10` [production]
  ```
  const password = "hunter2secret";
  ```
- **Exécution de commande / shell** — `veille.mjs:47` [production]
  ```
  try { execSync(`taskkill /PID ${old} /F`, { stdio: 'ignore' }); } catch {}
  ```
- **Exécution de commande / shell** — `veille.mjs:50` [production]
  ```
  const child = spawn('node', ['tools/guichet.mjs'], { cwd: ROOT, detached: true, stdio: 'ignore' });
  ```
- **Secret possible en dur** — `_gh-headers.mjs:13` [production]
  ```
  const line = t.split(/\r?\n/).find(l => l.startsWith('password=')) || '';
  ```

## Gravité moyenne (19)

- **Insertion HTML (risque XSS si donnée non fiable)** — `audit-profond.mjs:27` [production]
  ```
  { lang: 'js',   re: /innerHTML\s*=|dangerouslySetInnerHTML/, sev: 'moyen', what: 'injection HTML potentielle' },
  ```
- **Insertion HTML (risque XSS si donnée non fiable)** — `audit-reel.mjs:31` [production]
  ```
  re: /(\.innerHTML\s*=|document\.write\s*\(|\.insertAdjacentHTML\s*\(|dangerouslySetInnerHTML)/,
  ```
- **Insertion HTML (risque XSS si donnée non fiable)** — `audit-repo.mjs:25` [production]
  ```
  { re: /innerHTML\s*=|dangerouslySetInnerHTML/, sev: 'moyen', what: 'injection HTML potentielle' },
  ```
- **Insertion HTML (risque XSS si donnée non fiable)** — `build-auditeur-navigateur.mjs:74` [production]
  ```
  <button onclick="document.getElementById('code').value='';document.getElementById('out').innerHTML=''" style="background:#5b6672">Effacer</button>
  ```
- **Insertion HTML (risque XSS si donnée non fiable)** — `build-auditeur-navigateur.mjs:86` [production]
  ```
  if(!code.trim()){out.innerHTML='<p class="muted">Collez du code d\\'abord.</p>';return;}
  ```
- **Insertion HTML (risque XSS si donnée non fiable)** — `build-auditeur-navigateur.mjs:100` [production]
  ```
  out.innerHTML=h;
  ```
- **Insertion HTML (risque XSS si donnée non fiable)** — `build-commande.mjs:60` [production]
  ```
  <button onclick="document.getElementById('devis').innerHTML=''" style="background:#5b6672">Effacer</button>
  ```
- **Insertion HTML (risque XSS si donnée non fiable)** — `build-commande.mjs:71` [production]
  ```
  document.getElementById('formules').innerHTML = FORMULES.map(f =>
  ```
- **Insertion HTML (risque XSS si donnée non fiable)** — `build-commande.mjs:122` [production]
  ```
  document.getElementById('devis').innerHTML =
  ```
- **Insertion HTML (risque XSS si donnée non fiable)** — `demo-gratuite.mjs:18` [production]
  ```
  [/(document\.write|dangerouslySetInnerHTML)/, 'Injection XSS', 'ÉLEVÉ', 'Écriture HTML directe — vecteur XSS.'],
  ```
- **CORS ouvert à toutes les origines** — `demo-public.mjs:57` [production]
  ```
  const js = (o, s = 200) => { res.writeHead(s, { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' }); res.end(JSON.stringify
  ```
- **Concaténation SQL possible** — `demo-public.mjs:71` [production]
  ```
  const q = "SELECT * FROM users WHERE id = " + req.query.id;
  ```
- **CORS ouvert à toutes les origines** — `guichet-devis.mjs:33` [production]
  ```
  const cors = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Allow-Methods': 'GET,POST,OPTIONS' };
  ```
- **CORS ouvert à toutes les origines** — `guichet-v2.mjs:41` [production]
  ```
  const cors = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Allow-Methods': 'GET,POST,OPTIONS' };
  ```
- **Concaténation SQL possible** — `parcours-client.mjs:43` [production]
  ```
  db.query("SELECT * FROM users WHERE id = " + id, (e, rows) => {
  ```
- **Insertion HTML (risque XSS si donnée non fiable)** — `rapport-demo.mjs:25` [production]
  ```
  { re: /innerHTML\s*=|dangerouslySetInnerHTML/, sev: 'moyen', what: 'injection HTML potentielle', sug: 'confirmez que la valeur insérée est échappée ou de confia
  ```
- **Insertion HTML (risque XSS si donnée non fiable)** — `serveur-devis.mjs:82` [production]
  ```
  out.innerHTML=j.ok?('Demande enregistrée. Référence : <code>'+j.ref+'</code>. Je réponds à l\\'adresse indiquée.'):('Erreur : '+(j.erreur||'inconnue'));
  ```
- **Insertion HTML (risque XSS si donnée non fiable)** — `test-auditeur.mjs:12` [production]
  ```
  el.innerHTML = userInput;
  ```
- **Concaténation SQL possible** — `test-auditeur.mjs:13` [production]
  ```
  db.query("SELECT * FROM users WHERE id = " + userId);
  ```

## Gravité basse (7)

- **URL http en clair** — `gmail-oauth.mjs:74` [production]
  ```
  const redir = 'http://localhost:8765/oauth2callback';
  ```
- **URL http en clair** — `gmail-oauth.mjs:82` [production]
  ```
  const u = new URL(req.url, 'http://localhost:8765');
  ```
- **URL http en clair** — `parcours-client.mjs:21` [production]
  ```
  const BASE = process.env.BASE_URL || 'http://localhost:8099';
  ```
- **URL http en clair** — `serveur-devis.mjs:94` [production]
  ```
  const u = new URL(req.url, 'http://x');
  ```
- **URL http en clair** — `test-auditeur.mjs:11` [production]
  ```
  const url = "http://api.exemple.com/data";
  ```
- **URL http en clair** — `test-chaine.mjs:29` [production]
  ```
  const serv = await fetch('http://localhost:8120/sante').then(r => r.json()).catch(() => null);
  ```
- **URL http en clair** — `test-chaine.mjs:33` [production]
  ```
  const r = await fetch('http://localhost:8120/demande', {
  ```

