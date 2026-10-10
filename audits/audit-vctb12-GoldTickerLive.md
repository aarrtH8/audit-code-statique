# Rapport d'audit statique — vctb12/GoldTickerLive

**Date :** 2026-10-10
**Dépôt analysé :** https://github.com/vctb12/GoldTickerLive
**Fichiers lus :** 30
**Généré par :** Automaton DeepSeek — analyse statique par motifs, via l'archive publique du dépôt (aucun code exécuté).

> **Nature de ce document.** Ce sont des **alertes à vérifier**, pas des vulnérabilités confirmées.
> Chaque ligne citée a été lue dans le dépôt à l'adresse indiquée. Un motif peut être légitime
> (exemple, test, code mort). Ce rapport **ne remplace pas** une revue de sécurité humaine,
> un test d'intrusion ni un scan des dépendances. Aucun code n'a été exécuté.

## Synthèse — 41 constat(s)

| Sévérité | Nombre |
|---|---|
| critique | 0 |
| eleve | 7 |
| moyen | 27 |
| faible | 7 |

## Constats

### 1. [eleve] secret probable en clair

- **Fichier :** `server/routes/admin/index.js`
- **Ligne :** 1309
- **Extrait lu :** `if (auditUpdates.password) auditUpdates.password = '[redacted]';`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 2. [eleve] évaluation de code dynamique

- **Fichier :** `scripts/node/inject-schema.js`
- **Ligne :** 176
- **Extrait lu :** `let match = panelRegex.exec(content);`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 3. [eleve] évaluation de code dynamique

- **Fichier :** `scripts/node/inject-schema.js`
- **Ligne :** 189
- **Extrait lu :** `match = panelRegex.exec(content);`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 4. [eleve] évaluation de code dynamique

- **Fichier :** `scripts/node/inject-schema.js`
- **Ligne :** 214
- **Extrait lu :** `let match = re.exec(content);`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 5. [eleve] évaluation de code dynamique

- **Fichier :** `scripts/node/inject-schema.js`
- **Ligne :** 220
- **Extrait lu :** `match = re.exec(content);`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 6. [eleve] évaluation de code dynamique

- **Fichier :** `scripts/node/inject-schema.js`
- **Ligne :** 245
- **Extrait lu :** `let match = re.exec(secMatch[1]);`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 7. [eleve] évaluation de code dynamique

- **Fichier :** `scripts/node/inject-schema.js`
- **Ligne :** 251
- **Extrait lu :** `match = re.exec(secMatch[1]);`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 8. [moyen] injection HTML potentielle

- **Fichier :** `src/pages/shops.js`
- **Ligne :** 919
- **Extrait lu :** `document.getElementById('shops-modal-body').innerHTML = \``
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 9. [moyen] requête SQL construite par concaténation

- **Fichier :** `src/pages/shops.js`
- **Ligne :** 1203
- **Extrait lu :** `const errorMsg = \`[shops] CRITICAL: Filter select elements not found: ${missing.join(', ')}. Check shops.html.\`;`
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 10. [moyen] injection HTML potentielle

- **Fichier :** `src/pages/shops.js`
- **Ligne :** 1213
- **Extrait lu :** `regionSelect.innerHTML = \`<option value="all">${t('allRegions')} (${countByRegion('all')})</option>${Object.entries(`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 11. [moyen] requête SQL construite par concaténation

- **Fichier :** `src/pages/shops.js`
- **Ligne :** 1213
- **Extrait lu :** `regionSelect.innerHTML = \`<option value="all">${t('allRegions')} (${countByRegion('all')})</option>${Object.entries(`
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 12. [moyen] injection HTML potentielle

- **Fichier :** `src/pages/shops.js`
- **Ligne :** 1241
- **Extrait lu :** `countrySelect.innerHTML = \`<option value="all">${t('allCountries')} (${countByCountry('all')})</option>${allCountries`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 13. [moyen] requête SQL construite par concaténation

- **Fichier :** `src/pages/shops.js`
- **Ligne :** 1241
- **Extrait lu :** `countrySelect.innerHTML = \`<option value="all">${t('allCountries')} (${countByCountry('all')})</option>${allCountries`
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 14. [moyen] injection HTML potentielle

- **Fichier :** `src/pages/shops.js`
- **Ligne :** 1253
- **Extrait lu :** `citySelect.innerHTML = \`<option value="all">${t('allCities')} (${countByCity('all')})</option>${cities`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 15. [moyen] requête SQL construite par concaténation

- **Fichier :** `src/pages/shops.js`
- **Ligne :** 1253
- **Extrait lu :** `citySelect.innerHTML = \`<option value="all">${t('allCities')} (${countByCity('all')})</option>${cities`
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 16. [moyen] injection HTML potentielle

- **Fichier :** `src/pages/shops.js`
- **Ligne :** 1267
- **Extrait lu :** `specialtySelect.innerHTML = \`<option value="all">${t('allSpecialties')} (${countBySpecialty('all')})</option>${specialties`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 17. [moyen] requête SQL construite par concaténation

- **Fichier :** `src/pages/shops.js`
- **Ligne :** 1267
- **Extrait lu :** `specialtySelect.innerHTML = \`<option value="all">${t('allSpecialties')} (${countBySpecialty('all')})</option>${specialties`
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 18. [moyen] injection HTML potentielle

- **Fichier :** `src/pages/shops.js`
- **Ligne :** 1292
- **Extrait lu :** `box.innerHTML = featured`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 19. [moyen] injection HTML potentielle

- **Fichier :** `src/pages/shops.js`
- **Ligne :** 1610
- **Extrait lu :** `grid.innerHTML = cities`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 20. [moyen] injection HTML potentielle

- **Fichier :** `src/pages/shops.js`
- **Ligne :** 1628
- **Extrait lu :** `grid.innerHTML = shops.map((shop) => buildShopCardMarkup(shop)).join('');`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 21. [moyen] injection HTML potentielle

- **Fichier :** `src/pages/shops.js`
- **Ligne :** 1769
- **Extrait lu :** `featuredGrid.innerHTML = featured`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 22. [moyen] injection HTML potentielle

- **Fichier :** `src/pages/shops.js`
- **Ligne :** 1932
- **Extrait lu :** `pillsContainer.innerHTML =`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 23. [moyen] injection HTML potentielle

- **Fichier :** `src/pages/shops.js`
- **Ligne :** 2767
- **Extrait lu :** `results.innerHTML = \``
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 24. [moyen] injection HTML potentielle

- **Fichier :** `src/pages/shops.js`
- **Ligne :** 2816
- **Extrait lu :** `results.innerHTML = \``
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 25. [moyen] requête SQL construite par concaténation

- **Fichier :** `src/pages/home.js`
- **Ligne :** 1372
- **Extrait lu :** `/** Update the nav pill from the canonical snapshot (value + freshness dot). */`
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 26. [moyen] requête SQL construite par concaténation

- **Fichier :** `src/pages/home.js`
- **Ligne :** 1426
- **Extrait lu :** `/** Update the karat dial's arc + centre (karat, purity, canonical value) for the selection. */`
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 27. [moyen] requête SQL construite par concaténation

- **Fichier :** `supabase/schema.sql`
- **Ligne :** 1892
- **Extrait lu :** `do update set call_count = api_usage.call_count + 1,`
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 28. [moyen] injection HTML potentielle

- **Fichier :** `src/pages/calculator.js`
- **Ligne :** 54
- **Extrait lu :** `* DOM construction. Replaces the previous \`innerHTML = \\`<div>…</div>\\`\``
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 29. [moyen] injection HTML potentielle

- **Fichier :** `src/components/nav.js`
- **Ligne :** 507
- **Extrait lu :** `wrapper.innerHTML = html.trim();`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 30. [moyen] injection HTML potentielle

- **Fichier :** `src/components/nav.js`
- **Ligne :** 1088
- **Extrait lu :** `container.innerHTML = bottomNavHtml.trim();`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 31. [moyen] requête SQL construite par concaténation

- **Fichier :** `server/routes/alerts.js`
- **Ligne :** 276
- **Extrait lu :** `\`[alerts] Supabase insert failed, falling back to file storage: ${error.message}\``
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 32. [moyen] requête SQL construite par concaténation

- **Fichier :** `server/routes/alerts.js`
- **Ligne :** 323
- **Extrait lu :** `\`[alerts] Supabase update failed, falling back to file storage: ${error.message}\``
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 33. [moyen] requête SQL construite par concaténation

- **Fichier :** `server/routes/alerts.js`
- **Ligne :** 480
- **Extrait lu :** `\`[alerts] Supabase event insert failed, falling back to file storage: ${error.message}\``
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 34. [moyen] requête SQL construite par concaténation

- **Fichier :** `server/routes/alerts.js`
- **Ligne :** 767
- **Extrait lu :** `* Update notification subscription rows scoped by destination + channel.`
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 35. [faible] URL en clair (non HTTPS)

- **Fichier :** `src/pages/home.js`
- **Ligne :** 581
- **Extrait lu :** `const NS = 'http://www.w3.org/2000/svg';`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 36. [faible] URL en clair (non HTTPS)

- **Fichier :** `src/components/nav.js`
- **Ligne :** 367
- **Extrait lu :** `<svg class="nav-brand-logo" viewBox="0 0 32 32" fill="none" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 37. [faible] URL en clair (non HTTPS)

- **Fichier :** `src/components/nav.js`
- **Ligne :** 552
- **Extrait lu :** `use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', ref);`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 38. [faible] URL en clair (non HTTPS)

- **Fichier :** `src/components/nav.js`
- **Ligne :** 1188
- **Extrait lu :** `featuredUse.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', ref);`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 39. [faible] URL en clair (non HTTPS)

- **Fichier :** `src/pages/portfolio.js`
- **Ligne :** 44
- **Extrait lu :** `const SVG_NS = 'http://www.w3.org/2000/svg';`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 40. [faible] URL en clair (non HTTPS)

- **Fichier :** `src/pages/heatmap.js`
- **Ligne :** 44
- **Extrait lu :** `const SVG_NS = 'http://www.w3.org/2000/svg';`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 41. [faible] URL en clair (non HTTPS)

- **Fichier :** `src/pages/compare.js`
- **Ligne :** 46
- **Extrait lu :** `const SVG_NS = 'http://www.w3.org/2000/svg';`
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