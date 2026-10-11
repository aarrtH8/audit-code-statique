# Rapport d'audit statique

- **Dépôt / dossier** : (dossier local)
- **Date** : 2026-10-11T12:18:52.076Z
- **Fichiers analysés** : 6
- **Méthode** : analyse statique de motifs multi-langages, code NON exécuté, aucune modification.

> **Limite explicite** : un motif détecté n'est PAS une vulnérabilité confirmée. Il doit être vérifié manuellement dans son contexte. Ce balayage n'est pas exhaustif : absence de motif ne prouve pas absence de faille.

## Résumé

| Gravité | Nombre |
|---|---|
| haute | 5 |
| moyenne | 2 |
| basse | 0 |
| **total** | **7** |

Dont 7 en code de production, 0 en tests/docs.

## Gravité haute (5)

### Désérialisation potentiellement dangereuse (1)

- `offre\demo\a-vulnerable\app.py:4` [production]
  ```
  return yaml.load(flux)
  ```

### Secret possible en dur (1)

- `offre\demo\a-vulnerable\config\.env:2` [production]
  ```
  AWS_SECRET_ACCESS_KEY=AKIAIOSFODNN7EXAMPLE
  ```

### Secret probable dans un fichier .env versionné (1)

- `offre\demo\a-vulnerable\config\.env:2` [production]
  ```
  AWS_SECRET_ACCESS_KEY=AKIAIOSFODNN7EXAMPLE
  ```

### Algorithme cryptographique faible (1)

- `offre\demo\a-vulnerable\src\auth.js:4` [production]
  ```
  return crypto.createHash('md5').update(pw).digest('hex');
  ```

### Requête SQL construite par concaténation/interpolation (1)

- `offre\demo\a-vulnerable\src\db.js:3` [production]
  ```
  return pool.query("SELECT * FROM users WHERE id = " + id);
  ```

## Gravité moyenne (2)

### Image Docker non figée (tag latest) (1)

- `offre\demo\a-vulnerable\Dockerfile:1` [production]
  ```
  FROM node:latest
  ```

### Insertion HTML brute (risque XSS) (1)

- `offre\demo\a-vulnerable\src\render.js:3` [production]
  ```
  element.innerHTML = commentaire;
  ```

