# Rapport d'audit statique — stalequant/stalequant

**Date :** 2026-10-10
**Dépôt analysé :** https://github.com/stalequant/stalequant
**Fichiers lus :** 30
**Généré par :** Automaton DeepSeek — analyse statique par motifs, via l'archive publique du dépôt (aucun code exécuté).

> **Nature de ce document.** Ce sont des **alertes à vérifier**, pas des vulnérabilités confirmées.
> Chaque ligne citée a été lue dans le dépôt à l'adresse indiquée. Un motif peut être légitime
> (exemple, test, code mort). Ce rapport **ne remplace pas** une revue de sécurité humaine,
> un test d'intrusion ni un scan des dépendances. Aucun code n'a été exécuté.

## Synthèse — 15 constat(s)

| Sévérité | Nombre |
|---|---|
| critique | 0 |
| eleve | 1 |
| moyen | 14 |
| faible | 0 |

## Constats

### 1. [eleve] secret probable en clair

- **Fichier :** `rates/timeseries.js`
- **Ligne :** 295
- **Extrait lu :** `underlyingToken: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 2. [moyen] injection HTML potentielle

- **Fichier :** `delisting_new/hip3_app.js`
- **Ligne :** 838
- **Extrait lu :** `document.getElementById('app').innerHTML = '<div class="container py-4 px-4"><div class="card"><div class="card-body"><strong>Error</strong><p>Failed to load HI`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 3. [moyen] injection HTML potentielle

- **Fichier :** `delisting_new/app.js`
- **Ligne :** 8
- **Extrait lu :** `document.getElementById('app').innerHTML = '<div class="container py-2 px-4"><div class="card"><div class="bd"><strong>Error</strong><p>Vue.js failed to load. P`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 4. [moyen] injection HTML potentielle

- **Fichier :** `staleoil/oil_chart.js`
- **Ligne :** 198
- **Extrait lu :** `legendEl.innerHTML = "";`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 5. [moyen] requête SQL construite par concaténation

- **Fichier :** `stalegun/stalegun_binancedata.js`
- **Ligne :** 39
- **Extrait lu :** `if (message.e === "depthUpdate" && message.s === \`${coinParam}USDT\`) {`
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 6. [moyen] requête SQL construite par concaténation

- **Fichier :** `stalegun/stalegun_binancedata.js`
- **Ligne :** 158
- **Extrait lu :** `if (message.e === "depthUpdate" && message.s === \`${coinParam}USDT\`) {`
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 7. [moyen] injection HTML potentielle

- **Fichier :** `stalegun/stalegun_ui.js`
- **Ligne :** 143
- **Extrait lu :** `dropdown.innerHTML = '';`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 8. [moyen] injection HTML potentielle

- **Fichier :** `stalegun/stalegun_ui.js`
- **Ligne :** 147
- **Extrait lu :** `dropdown.innerHTML = '';`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 9. [moyen] injection HTML potentielle

- **Fichier :** `stalegun/stalegun_ui.js`
- **Ligne :** 164
- **Extrait lu :** `item.innerHTML = \`<div class="sym">${coin}</div>\`;`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 10. [moyen] injection HTML potentielle

- **Fichier :** `hlp_share/app.js`
- **Ligne :** 73
- **Extrait lu :** `dropdown.innerHTML = '';`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 11. [moyen] injection HTML potentielle

- **Fichier :** `hlp_share/app.js`
- **Ligne :** 84
- **Extrait lu :** `dropdown.innerHTML = '';`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 12. [moyen] injection HTML potentielle

- **Fichier :** `hlp_share/app.js`
- **Ligne :** 103
- **Extrait lu :** `item.innerHTML = \`<div class="sym">${coin}</div>\`;`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 13. [moyen] injection HTML potentielle

- **Fichier :** `comps/ui.js`
- **Ligne :** 21
- **Extrait lu :** `listEl.innerHTML = "";`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 14. [moyen] injection HTML potentielle

- **Fichier :** `comps/ui.js`
- **Ligne :** 75
- **Extrait lu :** `function close() { dropdownEl.style.display = "none"; dropdownEl.innerHTML = ""; }`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 15. [moyen] injection HTML potentielle

- **Fichier :** `comps/ui.js`
- **Ligne :** 77
- **Extrait lu :** `dropdownEl.innerHTML = "";`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

---

## Ce que ce rapport ne dit pas

- Il ne confirme aucune exploitation possible.
- Il ne couvre ni les dépendances, ni l'infrastructure, ni la configuration serveur.
- Il n'analyse qu'un sous-ensemble de fichiers, pas l'ensemble du dépôt.

## Pour aller plus loin

Un audit approfondi croise ces motifs avec le contexte d'appel réel : entrée utilisateur
atteignant la ligne signalée, protections en amont, et pertinence métier.
Demande de devis : https://github.com/aarrtH8/audit-code-statique/issues/new