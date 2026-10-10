# Rapport d'audit statique — 0x00C0DE/0x00C0DE.github.io

**Date :** 2026-10-10
**Dépôt analysé :** https://github.com/0x00C0DE/0x00C0DE.github.io
**Fichiers lus :** 30 · *note : site personnel*
**Généré par :** Automaton DeepSeek — analyse statique par motifs, via l'archive publique du dépôt (aucun code exécuté).

> **Nature de ce document.** Ce sont des **alertes à vérifier**, pas des vulnérabilités confirmées.
> Chaque ligne citée a été lue dans le dépôt à l'adresse indiquée. Un motif peut être légitime
> (exemple, test, code mort). Ce rapport **ne remplace pas** une revue de sécurité humaine,
> un test d'intrusion ni un scan des dépendances. Aucun code n'a été exécuté.

## Synthèse — 52 constat(s)

| Sévérité | Nombre |
|---|---|
| critique | 0 |
| eleve | 47 |
| moyen | 3 |
| faible | 2 |

## Constats

### 1. [eleve] évaluation de code dynamique

- **Fichier :** `worker/src/index.js`
- **Ligne :** 2149
- **Extrait lu :** `const match = /^data:([^;]+);base64,([A-Za-z0-9+/=\r\n]+)$/i.exec(normalizedValue);`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 2. [eleve] évaluation de code dynamique

- **Fichier :** `worker/src/index.js`
- **Ligne :** 2233
- **Extrait lu :** `const match = /^data:([^;]+);base64,([A-Za-z0-9+/=\r\n]+)$/i.exec(String(value || '').trim());`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 3. [eleve] évaluation de code dynamique

- **Fichier :** `worker/src/index.js`
- **Ligne :** 2261
- **Extrait lu :** `const match = /^data:([^;]+);base64,([A-Za-z0-9+/=\r\n]+)$/i.exec(String(value || '').trim());`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 4. [eleve] évaluation de code dynamique

- **Fichier :** `worker/src/index.js`
- **Ligne :** 4200
- **Extrait lu :** `const match = /^([a-z-]+):([\s\S]+)$/i.exec(String(line || '').trim());`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 5. [eleve] évaluation de code dynamique

- **Fichier :** `worker/src/index.js`
- **Ligne :** 4225
- **Extrait lu :** `const mimeTypeMatch = /^mime:(.+)$/i.exec(mimeTypeLine);`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 6. [eleve] évaluation de code dynamique

- **Fichier :** `worker/src/index.js`
- **Ligne :** 4226
- **Extrait lu :** `const byteLengthMatch = /^bytes:(\d+)$/i.exec(byteLengthLine);`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 7. [eleve] secret probable en clair

- **Fichier :** `worker/src/index.test.js`
- **Ligne :** 380
- **Extrait lu :** `password: 'delete-me287082'`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 8. [eleve] secret probable en clair

- **Fichier :** `worker/src/index.test.js`
- **Ligne :** 384
- **Extrait lu :** `BLOG_IMAGE_DELETE_PASSWORD: 'delete-me',`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 9. [eleve] secret probable en clair

- **Fichier :** `worker/src/index.test.js`
- **Ligne :** 385
- **Extrait lu :** `GODLIKE_TOTP_SECRET: 'GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ',`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 10. [eleve] secret probable en clair

- **Fichier :** `worker/src/index.test.js`
- **Ligne :** 406
- **Extrait lu :** `password: 'delete-me'`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 11. [eleve] secret probable en clair

- **Fichier :** `worker/src/index.test.js`
- **Ligne :** 410
- **Extrait lu :** `BLOG_IMAGE_DELETE_PASSWORD: 'delete-me',`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 12. [eleve] secret probable en clair

- **Fichier :** `worker/src/index.test.js`
- **Ligne :** 411
- **Extrait lu :** `GODLIKE_TOTP_SECRET: 'GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ',`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 13. [eleve] secret probable en clair

- **Fichier :** `worker/src/index.test.js`
- **Ligne :** 431
- **Extrait lu :** `password: 'wrong-password'`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 14. [eleve] secret probable en clair

- **Fichier :** `worker/src/index.test.js`
- **Ligne :** 435
- **Extrait lu :** `BLOG_IMAGE_DELETE_PASSWORD: 'delete-me',`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 15. [eleve] secret probable en clair

- **Fichier :** `worker/src/index.test.js`
- **Ligne :** 912
- **Extrait lu :** `billingApiToken: 'billing-token',`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 16. [eleve] secret probable en clair

- **Fichier :** `worker/src/index.test.js`
- **Ligne :** 1096
- **Extrait lu :** `authorizationToken: 'b2-auth-token'`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 17. [eleve] secret probable en clair

- **Fichier :** `worker/src/index.test.js`
- **Ligne :** 1108
- **Extrait lu :** `authorizationToken: 'b2-upload-token'`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 18. [eleve] secret probable en clair

- **Fichier :** `worker/src/index.test.js`
- **Ligne :** 1143
- **Extrait lu :** `CLOUDFLARE_BILLING_API_TOKEN: 'billing-token',`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 19. [eleve] secret probable en clair

- **Fichier :** `worker/src/index.test.js`
- **Ligne :** 1269
- **Extrait lu :** `CLOUDFLARE_BILLING_API_TOKEN: 'billing-token',`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 20. [eleve] secret probable en clair

- **Fichier :** `worker/src/index.test.js`
- **Ligne :** 1725
- **Extrait lu :** `authorizationToken: 'b2-auth-token'`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 21. [eleve] secret probable en clair

- **Fichier :** `worker/src/index.test.js`
- **Ligne :** 1737
- **Extrait lu :** `authorizationToken: 'b2-upload-token'`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 22. [eleve] secret probable en clair

- **Fichier :** `worker/src/index.test.js`
- **Ligne :** 3320
- **Extrait lu :** `CLOUDFLARE_BILLING_API_TOKEN: 'billing-token',`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 23. [eleve] secret probable en clair

- **Fichier :** `worker/src/index.test.js`
- **Ligne :** 3376
- **Extrait lu :** `authorizationToken: 'b2-auth-token'`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 24. [eleve] secret probable en clair

- **Fichier :** `worker/src/index.test.js`
- **Ligne :** 3493
- **Extrait lu :** `authorizationToken: 'b2-auth-token'`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 25. [eleve] secret probable en clair

- **Fichier :** `worker/src/index.test.js`
- **Ligne :** 3524
- **Extrait lu :** `password: 'delete-me',`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 26. [eleve] secret probable en clair

- **Fichier :** `worker/src/index.test.js`
- **Ligne :** 3536
- **Extrait lu :** `BLOG_IMAGE_DELETE_PASSWORD: 'delete-me',`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 27. [eleve] secret probable en clair

- **Fichier :** `worker/src/index.test.js`
- **Ligne :** 3672
- **Extrait lu :** `authorizationToken: 'b2-auth-token'`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 28. [eleve] secret probable en clair

- **Fichier :** `worker/src/index.test.js`
- **Ligne :** 3703
- **Extrait lu :** `password: 'delete-me',`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 29. [eleve] secret probable en clair

- **Fichier :** `worker/src/index.test.js`
- **Ligne :** 3712
- **Extrait lu :** `BLOG_IMAGE_DELETE_PASSWORD: 'delete-me',`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 30. [eleve] secret probable en clair

- **Fichier :** `worker/src/index.test.js`
- **Ligne :** 3807
- **Extrait lu :** `password: 'delete-me',`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 31. [eleve] secret probable en clair

- **Fichier :** `worker/src/index.test.js`
- **Ligne :** 3820
- **Extrait lu :** `BLOG_IMAGE_DELETE_PASSWORD: 'delete-me',`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 32. [eleve] évaluation de code dynamique

- **Fichier :** `src/commands.js`
- **Ligne :** 674
- **Extrait lu :** `let match = pattern.exec(text);`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 33. [eleve] évaluation de code dynamique

- **Fichier :** `src/commands.js`
- **Ligne :** 698
- **Extrait lu :** `match = pattern.exec(text);`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 34. [eleve] évaluation de code dynamique

- **Fichier :** `src/commands.js`
- **Ligne :** 1614
- **Extrait lu :** `let match = placeholderPattern.exec(normalizedTemplate);`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 35. [eleve] évaluation de code dynamique

- **Fichier :** `src/commands.js`
- **Ligne :** 1627
- **Extrait lu :** `match = placeholderPattern.exec(normalizedTemplate);`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 36. [eleve] évaluation de code dynamique

- **Fichier :** `src/commands.js`
- **Ligne :** 1904
- **Extrait lu :** `const match = BLOG_IMAGE_DATA_URL_PATTERN.exec(dataUrl || '');`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 37. [eleve] évaluation de code dynamique

- **Fichier :** `src/commands.js`
- **Ligne :** 2010
- **Extrait lu :** `const match = BLOG_IMAGE_DATA_URL_PATTERN.exec(String(dataUrl || '').trim());`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 38. [eleve] évaluation de code dynamique

- **Fichier :** `src/commands.js`
- **Ligne :** 2057
- **Extrait lu :** `const match = BLOG_IMAGE_DATA_URL_PATTERN.exec(normalizedDataUrl);`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 39. [eleve] évaluation de code dynamique

- **Fichier :** `src/commands.js`
- **Ligne :** 2130
- **Extrait lu :** `const mimeTypeMatch = /^mime:(.+)$/i.exec(String(imageLines[0] || '').trim());`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 40. [eleve] évaluation de code dynamique

- **Fichier :** `src/commands.js`
- **Ligne :** 2131
- **Extrait lu :** `const byteLengthMatch = /^bytes:(\d+)$/i.exec(String(imageLines[1] || '').trim());`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 41. [eleve] évaluation de code dynamique

- **Fichier :** `src/commands.js`
- **Ligne :** 2166
- **Extrait lu :** `const match = /^([a-z-]+):([\s\S]+)$/i.exec(String(line || '').trim());`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 42. [eleve] évaluation de code dynamique

- **Fichier :** `tests/help-render-browser.test.mjs`
- **Ligne :** 403
- **Extrait lu :** `const match = /(\d+(?:\.\d+)?)px\b/i.exec(String(font || ''));`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 43. [eleve] évaluation de code dynamique

- **Fichier :** `tests/blog-moderation-browser.test.mjs`
- **Ligne :** 611
- **Extrait lu :** `const imageMatch = /\[image-base64]\r?\n([\s\S]*?)\r?\n\[\/image-base64]/.exec(repoBlogText);`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 44. [eleve] exécution de commande système

- **Fichier :** `scripts/upload_bitcoin_history.py`
- **Ligne :** 137
- **Extrait lu :** `result = subprocess.run(`
- **À vérifier :** retracer l'origine des arguments ; entrée externe = injection probable.

### 45. [eleve] secret probable en clair

- **Fichier :** `tests/blog-upload-browser.test.mjs`
- **Ligne :** 137
- **Extrait lu :** `async function installTurnstileMock(page, token = 'browser-test-turnstile-token') {`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 46. [eleve] évaluation de code dynamique

- **Fichier :** `src/terminal-pretext-core.mjs`
- **Ligne :** 72
- **Extrait lu :** `let match = TERMINAL_LINK_PATTERN.exec(safeText);`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 47. [eleve] évaluation de code dynamique

- **Fichier :** `src/terminal-pretext-core.mjs`
- **Ligne :** 96
- **Extrait lu :** `match = TERMINAL_LINK_PATTERN.exec(safeText);`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 48. [moyen] requête SQL construite par concaténation

- **Fichier :** `worker/src/index.js`
- **Ligne :** 3398
- **Extrait lu :** `throw new Error(\`b2 delete failed with ${response.status}\`);`
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 49. [moyen] requête SQL construite par concaténation

- **Fichier :** `worker/src/index.js`
- **Ligne :** 3620
- **Extrait lu :** `throw new Error(\`github update failed with ${response.status}: ${failureBody}\`);`
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 50. [moyen] requête SQL construite par concaténation

- **Fichier :** `worker/src/index.js`
- **Ligne :** 3894
- **Extrait lu :** `throw new Error(\`github ref update failed with ${response.status}: ${failureBody}\`);`
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 51. [faible] URL en clair (non HTTPS)

- **Fichier :** `tests/userpic-security-browser.test.mjs`
- **Ligne :** 291
- **Extrait lu :** `bytes: Array.from(Buffer.from('<svg xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"1\" height=\"1\"/></svg>', 'utf8')),`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 52. [faible] URL en clair (non HTTPS)

- **Fichier :** `tests/security-quality-regressions.test.mjs`
- **Ligne :** 66
- **Extrait lu :** `assert.equal(normalizeTrustedMediaSource('http://i.imgur.com/example.png', pageUrl), '');`
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