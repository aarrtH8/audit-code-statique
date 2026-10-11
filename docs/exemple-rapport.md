# Rapport d'analyse statique

- **Cible :** `demo/sample`
- **Date :** 2026-10-11T19:31:48.078Z
- **Fichiers analysés :** 1
- **Constats :** 7 (dont 7 en code de production, 6 de gravité élevée en production)

> Un constat est un **motif à vérifier** (fichier:ligne). Ce n'est pas une vulnérabilité confirmée. Aucun code de la cible n'a été exécuté ni modifié.


## Gravité eleve — code de production (6)

- **secret ou identifiant en dur** — `app.js:6`  
  `const API_KEY = "CLE_FACTICE_DE_DEMONSTRATION_PAS_UNE_VRAIE_CLE";`
- **secret ou identifiant en dur** — `app.js:11`  
  `password: 'motdepasse-de-demo-factice',`
- **requête SQL construite par concaténation** — `app.js:17`  
  `db.query("SELECT * FROM users WHERE id = " + id, (err, rows) => {`
- **requête SQL construite par concaténation** — `app.js:25`  
  `const q = "SELECT * FROM users WHERE email = '" + email + "'";`
- **mot de passe comparé ou stocké en clair** — `app.js:27`  
  `if (rows.length && rows[0].password === password) {`
- **jeton d’authentification dérivé d’une donnée publique** — `app.js:28`  
  `res.json({ ok: true, token: Buffer.from(email).toString('base64') });`

## Gravité moyen — code de production (1)

- **erreur interne renvoyée au client** — `app.js:18`  
  `if (err) { res.send(err); return; }`

---
*Généré par audit-statique.mjs. Vérifiable : relancer la commande sur le même dépôt reproduit ce rapport.*