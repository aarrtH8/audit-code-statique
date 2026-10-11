# Rapport d'audit statique — expressjs/express

**Date :** 2026-10-11
**Dépôt analysé :** https://github.com/expressjs/express
**Fichiers lus :** 40
**Généré par :** Automaton DeepSeek — analyse statique par motifs, via l'archive publique du dépôt (aucun code exécuté).

> **Nature de ce document.** Ce sont des **alertes à vérifier**, pas des vulnérabilités confirmées.
> Chaque ligne citée a été lue dans le dépôt à l'adresse indiquée. Un motif peut être légitime
> (exemple, test, code mort). Ce rapport **ne remplace pas** une revue de sécurité humaine,
> un test d'intrusion ni un scan des dépendances. Aucun code n'a été exécuté.

## Synthèse — 67 constat(s)

| Sévérité | Nombre |
|---|---|
| critique | 0 |
| eleve | 5 |
| moyen | 2 |
| faible | 60 |

## Constats

### 1. [eleve] évaluation de code dynamique (eval / new Function)

- **Fichier :** `test/res.redirect.js`
- **Ligne :** 115
- **Extrait lu :** `var xss = 'javascript:eval(document.body.innerHTML=\`<p>XSS</p>\`);';`
- **À vérifier :** vérifier si la chaîne évaluée peut provenir d'une entrée externe.

### 2. [eleve] évaluation de code dynamique

- **Fichier :** `test/res.redirect.js`
- **Ligne :** 115
- **Extrait lu :** `var xss = 'javascript:eval(document.body.innerHTML=\`<p>XSS</p>\`);';`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 3. [eleve] évaluation de code dynamique (eval / new Function)

- **Fichier :** `test/res.redirect.js`
- **Ligne :** 116
- **Extrait lu :** `var encodedXss = 'javascript:eval(document.body.innerHTML=%60%3Cp%3EXSS%3C/p%3E%60);';`
- **À vérifier :** vérifier si la chaîne évaluée peut provenir d'une entrée externe.

### 4. [eleve] évaluation de code dynamique

- **Fichier :** `test/res.redirect.js`
- **Ligne :** 116
- **Extrait lu :** `var encodedXss = 'javascript:eval(document.body.innerHTML=%60%3Cp%3EXSS%3C/p%3E%60);';`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 5. [eleve] secret probable en clair

- **Fichier :** `examples/auth/index.js`
- **Ligne :** 25
- **Extrait lu :** `secret: 'shhhh, very secret'`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 6. [moyen] injection HTML potentielle

- **Fichier :** `test/res.redirect.js`
- **Ligne :** 115
- **Extrait lu :** `var xss = 'javascript:eval(document.body.innerHTML=\`<p>XSS</p>\`);';`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 7. [moyen] injection HTML potentielle

- **Fichier :** `test/res.redirect.js`
- **Ligne :** 116
- **Extrait lu :** `var encodedXss = 'javascript:eval(document.body.innerHTML=%60%3Cp%3EXSS%3C/p%3E%60);';`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 8. [faible] URL en clair (non HTTPS)

- **Fichier :** `lib/response.js`
- **Ligne :** 85
- **Extrait lu :** `*      next: 'http://api.example.com/users?page=2',`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 9. [faible] URL en clair (non HTTPS)

- **Fichier :** `lib/response.js`
- **Ligne :** 86
- **Extrait lu :** `*      last: 'http://api.example.com/users?page=5',`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 10. [faible] URL en clair (non HTTPS)

- **Fichier :** `lib/response.js`
- **Ligne :** 88
- **Extrait lu :** `*        'http://api.example.com/users?page=1',`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 11. [faible] URL en clair (non HTTPS)

- **Fichier :** `lib/response.js`
- **Ligne :** 89
- **Extrait lu :** `*        'http://api.example.com/users?page=2'`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 12. [faible] URL en clair (non HTTPS)

- **Fichier :** `lib/response.js`
- **Ligne :** 789
- **Extrait lu :** `*    res.location('http://example.com');`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 13. [faible] URL en clair (non HTTPS)

- **Fichier :** `lib/response.js`
- **Ligne :** 808
- **Extrait lu :** `*    res.redirect('http://example.com');`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 14. [faible] URL en clair (non HTTPS)

- **Fichier :** `lib/response.js`
- **Ligne :** 809
- **Extrait lu :** `*    res.redirect(301, 'http://example.com');`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 15. [faible] URL en clair (non HTTPS)

- **Fichier :** `test/Router.js`
- **Ligne :** 295
- **Extrait lu :** `var request = { hit: 0, url: 'http://example.com/foo', method: 'GET' };`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 16. [faible] URL en clair (non HTTPS)

- **Fichier :** `test/Router.js`
- **Ligne :** 300
- **Extrait lu :** `assert.equal(req.url, 'http://example.com/foo');`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 17. [faible] URL en clair (non HTTPS)

- **Fichier :** `test/Router.js`
- **Ligne :** 312
- **Extrait lu :** `var request = { hit: 0, url: '/proxy?url=http://example.com/blog/post/1', method: 'GET' };`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 18. [faible] URL en clair (non HTTPS)

- **Fichier :** `test/Router.js`
- **Ligne :** 317
- **Extrait lu :** `assert.equal(req.url, '/?url=http://example.com/blog/post/1');`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 19. [faible] URL en clair (non HTTPS)

- **Fichier :** `test/Router.js`
- **Ligne :** 329
- **Extrait lu :** `var request = { hit: 0, url: '/proxy/http://example.com/blog/post/1', method: 'GET' };`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 20. [faible] URL en clair (non HTTPS)

- **Fichier :** `test/Router.js`
- **Ligne :** 334
- **Extrait lu :** `assert.equal(req.url, '/http://example.com/blog/post/1');`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 21. [faible] URL en clair (non HTTPS)

- **Fichier :** `test/Router.js`
- **Ligne :** 346
- **Extrait lu :** `var request = { hit: 0, url: 'http://example.com/blog/post/1', method: 'GET' };`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 22. [faible] URL en clair (non HTTPS)

- **Fichier :** `test/Router.js`
- **Ligne :** 351
- **Extrait lu :** `assert.equal(req.url, 'http://example.com/post/1');`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 23. [faible] URL en clair (non HTTPS)

- **Fichier :** `test/Router.js`
- **Ligne :** 363
- **Extrait lu :** `var request = { hit: 0, url: 'http://example.com/blog/post/1', method: 'GET' };`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 24. [faible] URL en clair (non HTTPS)

- **Fichier :** `test/Router.js`
- **Ligne :** 368
- **Extrait lu :** `assert.equal(req.url, 'http://example.com/blog/post/1');`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 25. [faible] URL en clair (non HTTPS)

- **Fichier :** `test/Router.js`
- **Ligne :** 374
- **Extrait lu :** `assert.equal(req.url, 'http://example.com/post/1');`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 26. [faible] URL en clair (non HTTPS)

- **Fichier :** `test/Router.js`
- **Ligne :** 386
- **Extrait lu :** `var request = { hit: 0, url: 'http://example.com/blog/post/1', method: 'GET' };`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 27. [faible] URL en clair (non HTTPS)

- **Fichier :** `test/Router.js`
- **Ligne :** 391
- **Extrait lu :** `assert.equal(req.url, 'http://example.com/post/1');`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 28. [faible] URL en clair (non HTTPS)

- **Fichier :** `test/Router.js`
- **Ligne :** 397
- **Extrait lu :** `assert.equal(req.url, 'http://example.com/post/1');`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 29. [faible] URL en clair (non HTTPS)

- **Fichier :** `test/Router.js`
- **Ligne :** 403
- **Extrait lu :** `assert.equal(req.url, 'http://example.com/blog/post/1');`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 30. [faible] URL en clair (non HTTPS)

- **Fichier :** `test/res.location.js`
- **Ligne :** 14
- **Extrait lu :** `res.location('http://google.com/').end();`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 31. [faible] URL en clair (non HTTPS)

- **Fichier :** `test/res.location.js`
- **Ligne :** 19
- **Extrait lu :** `.expect('Location', 'http://google.com/')`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 32. [faible] URL en clair (non HTTPS)

- **Fichier :** `test/res.location.js`
- **Ligne :** 27
- **Extrait lu :** `res.location('http://google.com').end();`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 33. [faible] URL en clair (non HTTPS)

- **Fichier :** `test/res.location.js`
- **Ligne :** 32
- **Extrait lu :** `.expect('Location', 'http://google.com')`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 34. [faible] URL en clair (non HTTPS)

- **Fichier :** `test/res.location.js`
- **Ligne :** 115
- **Extrait lu :** `res.location(new URL('http://google.com/')).end();`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 35. [faible] URL en clair (non HTTPS)

- **Fichier :** `test/res.location.js`
- **Ligne :** 120
- **Extrait lu :** `.expect('Location', 'http://google.com/')`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 36. [faible] URL en clair (non HTTPS)

- **Fichier :** `test/res.location.js`
- **Ligne :** 198
- **Extrait lu :** `'http://google.com\\@apple.com',`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 37. [faible] URL en clair (non HTTPS)

- **Fichier :** `test/res.location.js`
- **Ligne :** 199
- **Extrait lu :** `'http://google.com\\@apple.com',`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 38. [faible] URL en clair (non HTTPS)

- **Fichier :** `test/res.location.js`
- **Ligne :** 253
- **Extrait lu :** `'http://google.com\\@apple.com/%0d%0afoo:%20bar',`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 39. [faible] URL en clair (non HTTPS)

- **Fichier :** `test/res.location.js`
- **Ligne :** 254
- **Extrait lu :** `'http://google.com\\@apple.com/%0d%0afoo:%20bar',`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 40. [faible] URL en clair (non HTTPS)

- **Fichier :** `test/res.location.js`
- **Ligne :** 275
- **Extrait lu :** `'http://google.com\\@apple.com/%e2%98%83',`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 41. [faible] URL en clair (non HTTPS)

- **Fichier :** `test/res.location.js`
- **Ligne :** 276
- **Extrait lu :** `'http://google.com\\@apple.com/%e2%98%83',`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 42. [faible] URL en clair (non HTTPS)

- **Fichier :** `test/res.redirect.js`
- **Ligne :** 13
- **Extrait lu :** `res.redirect('http://google.com');`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 43. [faible] URL en clair (non HTTPS)

- **Fichier :** `test/res.redirect.js`
- **Ligne :** 18
- **Extrait lu :** `.expect('location', 'http://google.com')`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 44. [faible] URL en clair (non HTTPS)

- **Fichier :** `test/res.redirect.js`
- **Ligne :** 54
- **Extrait lu :** `res.redirect(303, 'http://google.com');`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 45. [faible] URL en clair (non HTTPS)

- **Fichier :** `test/res.redirect.js`
- **Ligne :** 59
- **Extrait lu :** `.expect('Location', 'http://google.com')`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 46. [faible] URL en clair (non HTTPS)

- **Fichier :** `test/res.redirect.js`
- **Ligne :** 69
- **Extrait lu :** `res.redirect('http://google.com');`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 47. [faible] URL en clair (non HTTPS)

- **Fichier :** `test/res.redirect.js`
- **Ligne :** 75
- **Extrait lu :** `.expect('Location', 'http://google.com')`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 48. [faible] URL en clair (non HTTPS)

- **Fichier :** `test/res.redirect.js`
- **Ligne :** 86
- **Extrait lu :** `res.redirect('http://google.com');`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 49. [faible] URL en clair (non HTTPS)

- **Fichier :** `test/res.redirect.js`
- **Ligne :** 93
- **Extrait lu :** `.expect('Location', 'http://google.com')`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 50. [faible] URL en clair (non HTTPS)

- **Fichier :** `test/res.redirect.js`
- **Ligne :** 94
- **Extrait lu :** `.expect(302, '<!DOCTYPE html><head><title>Found</title></head><body><p>Found. Redirecting to http://google.com</p></body>', done)`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 51. [faible] URL en clair (non HTTPS)

- **Fichier :** `test/res.redirect.js`
- **Ligne :** 106
- **Extrait lu :** `.set('Host', 'http://example.com')`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 52. [faible] URL en clair (non HTTPS)

- **Fichier :** `test/res.redirect.js`
- **Ligne :** 124
- **Extrait lu :** `.set('Host', 'http://example.com')`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 53. [faible] URL en clair (non HTTPS)

- **Fichier :** `test/res.redirect.js`
- **Ligne :** 135
- **Extrait lu :** `res.redirect(301, 'http://google.com');`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 54. [faible] URL en clair (non HTTPS)

- **Fichier :** `test/res.redirect.js`
- **Ligne :** 142
- **Extrait lu :** `.expect('Location', 'http://google.com')`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 55. [faible] URL en clair (non HTTPS)

- **Fichier :** `test/res.redirect.js`
- **Ligne :** 143
- **Extrait lu :** `.expect(301, '<!DOCTYPE html><head><title>Moved Permanently</title></head><body><p>Moved Permanently. Redirecting to http://google.com</p></body>', done);`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 56. [faible] URL en clair (non HTTPS)

- **Fichier :** `test/res.redirect.js`
- **Ligne :** 152
- **Extrait lu :** `res.redirect('http://google.com');`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 57. [faible] URL en clair (non HTTPS)

- **Fichier :** `test/res.redirect.js`
- **Ligne :** 159
- **Extrait lu :** `.expect('Location', 'http://google.com')`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 58. [faible] URL en clair (non HTTPS)

- **Fichier :** `test/res.redirect.js`
- **Ligne :** 160
- **Extrait lu :** `.expect(302, 'Found. Redirecting to http://google.com', done)`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 59. [faible] URL en clair (non HTTPS)

- **Fichier :** `test/res.redirect.js`
- **Ligne :** 167
- **Extrait lu :** `res.redirect('http://example.com/?param=<script>alert("hax");</script>');`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 60. [faible] URL en clair (non HTTPS)

- **Fichier :** `test/res.redirect.js`
- **Ligne :** 172
- **Extrait lu :** `.set('Host', 'http://example.com')`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 61. [faible] URL en clair (non HTTPS)

- **Fichier :** `test/res.redirect.js`
- **Ligne :** 175
- **Extrait lu :** `.expect('Location', 'http://example.com/?param=%3Cscript%3Ealert(%22hax%22);%3C/script%3E')`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 62. [faible] URL en clair (non HTTPS)

- **Fichier :** `test/res.redirect.js`
- **Ligne :** 176
- **Extrait lu :** `.expect(302, 'Found. Redirecting to http://example.com/?param=%3Cscript%3Ealert(%22hax%22);%3C/script%3E', done)`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 63. [faible] URL en clair (non HTTPS)

- **Fichier :** `test/res.redirect.js`
- **Ligne :** 183
- **Extrait lu :** `res.redirect(301, 'http://google.com');`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 64. [faible] URL en clair (non HTTPS)

- **Fichier :** `test/res.redirect.js`
- **Ligne :** 190
- **Extrait lu :** `.expect('Location', 'http://google.com')`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 65. [faible] URL en clair (non HTTPS)

- **Fichier :** `test/res.redirect.js`
- **Ligne :** 191
- **Extrait lu :** `.expect(301, 'Moved Permanently. Redirecting to http://google.com', done);`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 66. [faible] URL en clair (non HTTPS)

- **Fichier :** `test/res.redirect.js`
- **Ligne :** 200
- **Extrait lu :** `res.redirect('http://google.com');`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 67. [faible] URL en clair (non HTTPS)

- **Fichier :** `test/res.redirect.js`
- **Ligne :** 207
- **Extrait lu :** `.expect('location', 'http://google.com')`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

---

## Ce que ce rapport ne dit pas

- Il ne confirme aucune exploitation possible.
- Il ne couvre ni les dépendances, ni l'infrastructure, ni la configuration serveur.
- Il n'analyse qu'un sous-ensemble de fichiers, pas l'ensemble du dépôt.

## Pour aller plus loin

Un audit approfondi croise ces motifs avec le contexte d'appel réel : entrée utilisateur
atteignant la ligne signalée, protections en amont, et pertinence métier.
Demande de devis : https://github.com/aarrtH8/audit-code-statique/issues/new