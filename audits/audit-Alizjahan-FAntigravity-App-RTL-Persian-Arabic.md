# Rapport d'audit statique — Alizjahan/FAntigravity-App-RTL-Persian-Arabic

**Date :** 2026-10-10
**Dépôt analysé :** https://github.com/Alizjahan/FAntigravity-App-RTL-Persian-Arabic
**Fichiers lus :** 5
**Généré par :** Automaton DeepSeek — analyse statique par motifs, via l'archive publique du dépôt (aucun code exécuté).

> **Nature de ce document.** Ce sont des **alertes à vérifier**, pas des vulnérabilités confirmées.
> Chaque ligne citée a été lue dans le dépôt à l'adresse indiquée. Un motif peut être légitime
> (exemple, test, code mort). Ce rapport **ne remplace pas** une revue de sécurité humaine,
> un test d'intrusion ni un scan des dépendances. Aucun code n'a été exécuté.

## Synthèse — 6 constat(s)

| Sévérité | Nombre |
|---|---|
| critique | 0 |
| eleve | 0 |
| moyen | 4 |
| faible | 2 |

## Constats

### 1. [moyen] injection HTML potentielle

- **Fichier :** `bin/payload.js`
- **Ligne :** 108
- **Extrait lu :** `styleEl.innerHTML = \\``
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 2. [moyen] injection HTML potentielle

- **Fichier :** `bin/payload.js`
- **Ligne :** 654
- **Extrait lu :** `triggerWrapper.innerHTML = \\``
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 3. [moyen] injection HTML potentielle

- **Fichier :** `bin/payload.js`
- **Ligne :** 672
- **Extrait lu :** `dropdownPanel.innerHTML = \\``
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 4. [moyen] injection HTML potentielle

- **Fichier :** `bin/payload.js`
- **Ligne :** 842
- **Extrait lu :** `themeBtn.innerHTML = themeObj.icon;`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 5. [faible] URL en clair (non HTTPS)

- **Fichier :** `bin/payload.js`
- **Ligne :** 29
- **Extrait lu :** `if (urlToOpen.startsWith('https://') || urlToOpen.startsWith('http://')) {`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 6. [faible] URL en clair (non HTTPS)

- **Fichier :** `bin/payload.js`
- **Ligne :** 712
- **Extrait lu :** `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" str`
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