# Rapport d'audit statique

- **Dépôt / dossier** : (dossier local)
- **Date** : 2026-10-10T16:46:28.181Z
- **Fichiers analysés** : 116
- **Méthode** : analyse statique de motifs multi-langages, code NON exécuté, aucune modification.

> **Limite explicite** : un motif détecté n'est PAS une vulnérabilité confirmée. Il doit être vérifié manuellement dans son contexte. Ce balayage n'est pas exhaustif : absence de motif ne prouve pas absence de faille.

## Résumé

| Gravité | Nombre |
|---|---|
| haute | 90 |
| moyenne | 17 |
| basse | 13 |
| **total** | **120** |

Dont 120 en code de production, 0 en tests/docs.

## Gravité haute (90)

### Exécution de commande / shell (74)

- `acquisition-github.mjs:15` [production]
  ```
  const raw=execFileSync('git',['credential','fill'],{input:'protocol=https\nhost=github.com\n\n',encoding:'utf8',windowsHide:true,env:{...process.env,GIT_TERMINA
  ```
- `audit-client.mjs:29` [production]
  ```
  try { execFileSync('git', ['clone', '--depth', '1', cible, tmp], { stdio: 'pipe', timeout: 180000 }); base = tmp; }
  ```
- `audit-depot.mjs:26` [production]
  ```
  try { execFileSync('git', ['clone','-q','--depth','1',cible,tmp], { stdio:'pipe', timeout: 180000 }); racine = tmp; }
  ```
- `audit-diff.mjs:49` [production]
  ```
  execFileSync('git', ['clone','-q','--depth','1',cible,tmp], { stdio:'pipe', timeout:180000 });
  ```
- `audit-livrer.mjs:27` [production]
  ```
  const sortie = execFileSync(process.execPath, [moteur, dossierCode, rapportPath], { encoding: 'utf8' });
  ```
- `audit-lot.mjs:24` [production]
  ```
  const out = execFileSync(process.execPath, [path.join(HOME, 'tools', 'audit-repo.mjs'), d, '--max', '30'],
  ```
- `audit-moteur-lib.mjs:31` [production]
  ```
  const out = execFileSync('node', [path.join(ROOT, 'tools', 'audit-moteur.mjs'), repo],
  ```
- `audit-reproductible.mjs:26` [production]
  ```
  const brut = execFileSync('node', ['tools/audit-sarif.mjs', cible, '--out', sortie],
  ```
- `audit-sarif.mjs:77` [production]
  ```
  execFileSync('git', ['clone','-q','--depth','1',cible,racine], { stdio:'pipe', timeout:180000 });
  ```
- `audit-service.mjs:46` [production]
  ```
  const run = spawnSync('node', [AUDITOR, targetDir, '--out', outMd, '--json', outJson], { encoding: 'utf8', timeout: 180000 });
  ```
- `audit-service.mjs:56` [production]
  ```
  const r = spawnSync('tar', ['-xzf', tarPath, '-C', tmp], { encoding: 'utf8', timeout: 120000 });
  ```
- `boucle-prospection.mjs:28` [production]
  ```
  const raw = execFileSync('git', ['credential', 'fill'], {
  ```
- `boucle-prospection.mjs:118` [production]
  ```
  execFileSync('git', ['clone', '--depth', '1', `https://github.com/${p.repo}.git`, path.join(tmp, 'src')], { stdio: 'ignore', windowsHide: true, timeout: 60000 }
  ```
- `boucle-prospection.mjs:120` [production]
  ```
  spawnSync(process.execPath, [MOTEUR, path.join(tmp, 'src'), rap], { encoding: 'utf8', timeout: 60000 });
  ```
- `business.mjs:21` [production]
  ```
  try { return { out: execFileSync('node', [join('tools', script), ...a], { encoding: 'utf8', timeout: 120000 }), code: 0 }; }
  ```
- `campagne.mjs:38` [production]
  ```
  const brut = execFileSync('node', ['tools/audit-sarif.mjs', `https://github.com/${depot}`, '--out', out],
  ```
- `commande.mjs:38` [production]
  ```
  execFileSync('git', ['clone', '--depth', '1', `https://github.com/${cmd.repo}.git`, path.join(tmp, 'src')],
  ```
- `commande.mjs:41` [production]
  ```
  spawnSync(process.execPath, [path.join(ROOT, 'tools', 'audit-moteur.mjs'), path.join(tmp, 'src'), brut],
  ```
- `commande.mjs:44` [production]
  ```
  spawnSync(process.execPath, [path.join(ROOT, 'tools', 'filtre-honnete.mjs'), brut, filtre], { encoding: 'utf8' });
  ```
- `consolider.mjs:18` [production]
  ```
  kanban = JSON.parse(execFileSync('node', ['tools/kanban.mjs', 'list'], { encoding: 'utf8', timeout: 60000 }));
  ```
- `contact-demo.mjs:26` [production]
  ```
  execFileSync('git', ['clone', '--depth', '1', `https://github.com/${repo}.git`, path.join(tmp, 'src')],
  ```
- `contact-demo.mjs:29` [production]
  ```
  spawnSync(process.execPath, [path.join(ROOT, 'tools', 'audit-moteur.mjs'), path.join(tmp, 'src'), rap],
  ```
- `contact-prouve.mjs:25` [production]
  ```
  execFileSync('git', ['clone', '--depth', '1', `https://github.com/${repo}.git`, path.join(tmp, 'src')], { stdio: 'ignore', windowsHide: true });
  ```
- `contact-prouve.mjs:27` [production]
  ```
  spawnSync(process.execPath, [MOTEUR, path.join(tmp, 'src'), rap], { encoding: 'utf8' });
  ```
- `cycle-acquisition.mjs:21` [production]
  ```
  try { return execFileSync(cmd, args, { cwd: HOME, encoding: 'utf8', timeout: 600000 }); }
  ```
- `cycle.mjs:44` [production]
  ```
  const run = (cmd, args, opts = {}) => execFileSync(cmd, args, { stdio: 'ignore', timeout: 240000, ...opts });
  ```
- `demandes.mjs:12` [production]
  ```
  const raw = execFileSync('git', ['credential', 'fill'], {
  ```
- `demo-gratuite.mjs:15` [production]
  ```
  [/child_process[^;]*exec\s*\(/, 'Exécution de code', 'ÉLEVÉ', 'exec() de commande — valider/échapper les entrées.'],
  ```
- `demo-public.mjs:29` [production]
  ```
  const r = spawnSync(process.execPath, [MOTEUR, tmp, rap], { encoding: 'utf8' });
  ```
- `demo-public.mjs:103` [production]
  ```
  const r = spawnSync(process.execPath, [MOTEUR, tmp, rap], { encoding: 'utf8' });
  ```
- `devis.mjs:27` [production]
  ```
  const r = spawnSync(process.execPath, [MOTEUR, repo, rap], { encoding: 'utf8' });
  ```
- `envoi-encadre.mjs:137` [production]
  ```
  execFileSync('node', ['tools/gmail-oauth.mjs', 'envoyer', '--a', f.email, '--sujet', objet, '--corps', corps], { stdio: 'pipe', timeout: 60000 });
  ```
- `envoyer-github.mjs:29` [production]
  ```
  const raw = execFileSync('git', ['credential', 'fill'], {
  ```
- `estimer.mjs:23` [production]
  ```
  execFileSync('git', ['clone', '-q', '--depth', '1', cible, cloneTmp], { stdio: 'pipe', timeout: 120000 });
  ```
- `etat-reel.mjs:40` [production]
  ```
  const out = execFileSync('git', ['-C', '/tmp/audit-page', 'log', '--oneline'], { stdio: 'pipe' }).toString().trim().split('\n');
  ```
- `etat-reel.mjs:46` [production]
  ```
  const raw = execFileSync('curl', ['-s', '-H', 'Accept: application/vnd.github+json',
  ```
- `gh-auth.mjs:12` [production]
  ```
  const out = execFileSync('git', ['credential', 'fill'],
  ```
- `guichet-v2.mjs:66` [production]
  ```
  execFileSync('node', [path.join(ROOT, 'tools', 'exploiter-devis.mjs')], { cwd: ROOT, stdio: 'pipe' });
  ```
- `guichet.mjs:93` [production]
  ```
  const brut = execFileSync('node', ['tools/audit-sarif.mjs', d.url, '--out', join(dossier,'audit.sarif')],
  ```
- `livrable-signe.mjs:48` [production]
  ```
  execFileSync('git', ['clone','-q','--depth','1',cible,racine], { stdio:'pipe', timeout:180000 });
  ```
- … et 34 autres du même type.

### Évaluation dynamique de code (9)

- `audit-client.mjs:51` [production]
  ```
  { id: 'eval', gravite: 'moyenne', titre: 'eval() sur valeur non littérale',
  ```
- `audit-lib.mjs:23` [production]
  ```
  { id:'EVAL', cat:'eval() / new Function()', sev:'ÉLEVÉ', effort:'M',
  ```
- `audit-repo-honnete.mjs:28` [production]
  ```
  { id: 'eval', re: /\beval\s*\(/g, sev: 'ÉLEVÉ', hint: 'eval() sur données non maîtrisées.' },
  ```
- `botte.mjs:32` [production]
  ```
  [/\beval\s*\(/, 'eval()', 'ÉLEVÉ', 'Remplacer par un parseur explicite.'],
  ```
- `botte.mjs:33` [production]
  ```
  [/new\s+Function\s*\(/, 'new Function()', 'ÉLEVÉ', 'Même risque que eval().'],
  ```
- `demo-gratuite.mjs:13` [production]
  ```
  [/\beval\s*\(/, 'Exécution de code', 'ÉLEVÉ', 'eval() sur données non maîtrisées — préférer un parseur.'],
  ```
- `demo-gratuite.mjs:14` [production]
  ```
  [/new\s+Function\s*\(/, 'Exécution de code', 'ÉLEVÉ', 'new Function() — même risque que eval.'],
  ```
- `message-adresse.mjs:11` [production]
  ```
  *   - eval : eval(<identifiant>)                        (mot exact)
  ```
- `message-adresse.mjs:84` [production]
  ```
  ajouter({ fichier: rel, ligne: i + 1, regle: 'eval', note: 'eval() appliqué à une valeur non littérale', extrait: l.trim().slice(0, 80) });
  ```

### Secret possible en dur (3)

- `demo-public.mjs:70` [production]
  ```
  <textarea id="code" placeholder="// collez votre code ici">const DB_PASSWORD = "s3cr3tHardcoded123";
  ```
- `parcours-client.mjs:40` [production]
  ```
  const DB_PASSWORD = "hunter2superSecret";
  ```
- `test-auditeur.mjs:10` [production]
  ```
  const password = "hunter2secret";
  ```

### Requête SQL construite par concaténation/interpolation (3)

- `demo-public.mjs:71` [production]
  ```
  const q = "SELECT * FROM users WHERE id = " + req.query.id;
  ```
- `parcours-client.mjs:43` [production]
  ```
  db.query("SELECT * FROM users WHERE id = " + id, (e, rows) => {
  ```
- `test-auditeur.mjs:13` [production]
  ```
  db.query("SELECT * FROM users WHERE id = " + userId);
  ```

### Vérification TLS désactivée (1)

- `message-adresse.mjs:10` [production]
  ```
  *   - tls  : verify=False / rejectUnauthorized:false   (mot exact)
  ```

## Gravité moyenne (17)

### Insertion HTML brute (risque XSS) (13)

- `audit-profond.mjs:27` [production]
  ```
  { lang: 'js',   re: /innerHTML\s*=|dangerouslySetInnerHTML/, sev: 'moyen', what: 'injection HTML potentielle' },
  ```
- `audit-reel.mjs:31` [production]
  ```
  re: /(\.innerHTML\s*=|document\.write\s*\(|\.insertAdjacentHTML\s*\(|dangerouslySetInnerHTML)/,
  ```
- `audit-repo.mjs:25` [production]
  ```
  { re: /innerHTML\s*=|dangerouslySetInnerHTML/, sev: 'moyen', what: 'injection HTML potentielle' },
  ```
- `build-auditeur-navigateur.mjs:74` [production]
  ```
  <button onclick="document.getElementById('code').value='';document.getElementById('out').innerHTML=''" style="background:#5b6672">Effacer</button>
  ```
- `build-auditeur-navigateur.mjs:86` [production]
  ```
  if(!code.trim()){out.innerHTML='<p class="muted">Collez du code d\\'abord.</p>';return;}
  ```
- `build-auditeur-navigateur.mjs:100` [production]
  ```
  out.innerHTML=h;
  ```
- `build-commande.mjs:60` [production]
  ```
  <button onclick="document.getElementById('devis').innerHTML=''" style="background:#5b6672">Effacer</button>
  ```
- `build-commande.mjs:71` [production]
  ```
  document.getElementById('formules').innerHTML = FORMULES.map(f =>
  ```
- `build-commande.mjs:122` [production]
  ```
  document.getElementById('devis').innerHTML =
  ```
- `demo-gratuite.mjs:18` [production]
  ```
  [/(document\.write|dangerouslySetInnerHTML)/, 'Injection XSS', 'ÉLEVÉ', 'Écriture HTML directe — vecteur XSS.'],
  ```
- `rapport-demo.mjs:25` [production]
  ```
  { re: /innerHTML\s*=|dangerouslySetInnerHTML/, sev: 'moyen', what: 'injection HTML potentielle', sug: 'confirmez que la valeur insérée est échappée ou de confia
  ```
- `serveur-devis.mjs:82` [production]
  ```
  out.innerHTML=j.ok?('Demande enregistrée. Référence : <code>'+j.ref+'</code>. Je réponds à l\\'adresse indiquée.'):('Erreur : '+(j.erreur||'inconnue'));
  ```
- `test-auditeur.mjs:12` [production]
  ```
  el.innerHTML = userInput;
  ```

### CORS ouvert à toutes les origines (3)

- `demo-public.mjs:57` [production]
  ```
  const js = (o, s = 200) => { res.writeHead(s, { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' }); res.end(JSON.stringify
  ```
- `guichet-devis.mjs:33` [production]
  ```
  const cors = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Allow-Methods': 'GET,POST,OPTIONS' };
  ```
- `guichet-v2.mjs:41` [production]
  ```
  const cors = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Allow-Methods': 'GET,POST,OPTIONS' };
  ```

### Permissions de fichier trop ouvertes (1)

- `diagnostic-canal.mjs:35` [production]
  ```
  perms: (st.mode & 0o777).toString(8).padStart(3, '0'),
  ```

## Gravité basse (13)

### URL http:// en clair (10)

- `gmail-oauth.mjs:74` [production]
  ```
  const redir = 'http://localhost:8765/oauth2callback';
  ```
- `gmail-oauth.mjs:82` [production]
  ```
  const u = new URL(req.url, 'http://localhost:8765');
  ```
- `guichet-public.mjs:60` [production]
  ```
  const u = new URL(req.url, `http://localhost:${PORT}`);
  ```
- `mail\auth.mjs:35` [production]
  ```
  const redirect = `http://localhost:${port}`;
  ```
- `parcours-client.mjs:21` [production]
  ```
  const BASE = process.env.BASE_URL || 'http://localhost:8099';
  ```
- `serveur-devis.mjs:94` [production]
  ```
  const u = new URL(req.url, 'http://x');
  ```
- `test-auditeur.mjs:11` [production]
  ```
  const url = "http://api.exemple.com/data";
  ```
- `test-chaine.mjs:29` [production]
  ```
  const serv = await fetch('http://localhost:8120/sante').then(r => r.json()).catch(() => null);
  ```
- `test-chaine.mjs:33` [production]
  ```
  const r = await fetch('http://localhost:8120/demande', {
  ```
- `veille.mjs:37` [production]
  ```
  const r = await fetch(`http://localhost:${PORT}/sante`, { signal: AbortSignal.timeout(5000) });
  ```

### Valeur sensible journalisée (3)

- `gmail-oauth.mjs:95` [production]
  ```
  console.log('Token enregistré (hors Git) : ' + TOKEN);
  ```
- `mail\send.mjs:30` [production]
  ```
  console.log(`  jeton utilisateur (token.json)  : ${aTok ? 'présent' : 'ABSENT'}`);
  ```
- `repondre-demandes.mjs:88` [production]
  ```
  if (!tok) { console.log('  >> pas de token git : non posté (honnête, pas prétendu).'); continue; }
  ```

