# Rapport d'audit statique — Googlers-Repo/wpd

**Date :** 2026-10-10
**Dépôt analysé :** https://github.com/Googlers-Repo/wpd
**Fichiers lus :** 7
**Généré par :** Automaton DeepSeek — analyse statique par motifs, via l'archive publique du dépôt (aucun code exécuté).

> **Nature de ce document.** Ce sont des **alertes à vérifier**, pas des vulnérabilités confirmées.
> Chaque ligne citée a été lue dans le dépôt à l'adresse indiquée. Un motif peut être légitime
> (exemple, test, code mort). Ce rapport **ne remplace pas** une revue de sécurité humaine,
> un test d'intrusion ni un scan des dépendances. Aucun code n'a été exécuté.

## Synthèse — 10 constat(s)

| Sévérité | Nombre |
|---|---|
| critique | 0 |
| eleve | 1 |
| moyen | 9 |
| faible | 0 |

## Constats

### 1. [eleve] secret probable en clair

- **Fichier :** `webroot/assets/app.js`
- **Ligne :** 30
- **Extrait lu :** `password: "correct-horse-battery",`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 2. [moyen] injection HTML potentielle

- **Fichier :** `webroot/assets/app.js`
- **Ligne :** 164
- **Extrait lu :** `$("#notice").innerHTML = "";`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 3. [moyen] injection HTML potentielle

- **Fichier :** `webroot/assets/app.js`
- **Ligne :** 165
- **Extrait lu :** `$("#chips").innerHTML = "";`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 4. [moyen] injection HTML potentielle

- **Fichier :** `webroot/assets/app.js`
- **Ligne :** 167
- **Extrait lu :** `$("#list").innerHTML =`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 5. [moyen] injection HTML potentielle

- **Fichier :** `webroot/assets/app.js`
- **Ligne :** 540
- **Extrait lu :** `$("#notice").innerHTML = state.demo ? '<div class="notice">Showing sample data. Tap Refresh to load your real networks.</div>' : "";`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 6. [moyen] injection HTML potentielle

- **Fichier :** `webroot/assets/app.js`
- **Ligne :** 543
- **Extrait lu :** `$("#chips").innerHTML = FILTERS.map(function (f) {`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 7. [moyen] injection HTML potentielle

- **Fichier :** `webroot/assets/app.js`
- **Ligne :** 551
- **Extrait lu :** `$("#list").innerHTML = '<div class="state"><h2>No saved networks</h2><p>The Wi-Fi store was read, but it has no networks in it.</p></div>';`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 8. [moyen] injection HTML potentielle

- **Fichier :** `webroot/assets/app.js`
- **Ligne :** 553
- **Extrait lu :** `$("#list").innerHTML =`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 9. [moyen] injection HTML potentielle

- **Fichier :** `webroot/assets/app.js`
- **Ligne :** 557
- **Extrait lu :** `$("#list").innerHTML = list.map(rowHtml).join("");`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 10. [moyen] injection HTML potentielle

- **Fichier :** `webroot/assets/app.js`
- **Ligne :** 570
- **Extrait lu :** `$("#deviceList").innerHTML = items`
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