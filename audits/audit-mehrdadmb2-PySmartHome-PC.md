# Rapport d'audit statique — mehrdadmb2/PySmartHome-PC

**Date :** 2026-10-10
**Dépôt analysé :** https://github.com/mehrdadmb2/PySmartHome-PC
**Fichiers lus :** 5
**Généré par :** Automaton DeepSeek — analyse statique par motifs, via l'archive publique du dépôt (aucun code exécuté).

> **Nature de ce document.** Ce sont des **alertes à vérifier**, pas des vulnérabilités confirmées.
> Chaque ligne citée a été lue dans le dépôt à l'adresse indiquée. Un motif peut être légitime
> (exemple, test, code mort). Ce rapport **ne remplace pas** une revue de sécurité humaine,
> un test d'intrusion ni un scan des dépendances. Aucun code n'a été exécuté.

## Synthèse — 4 constat(s)

| Sévérité | Nombre |
|---|---|
| critique | 0 |
| eleve | 0 |
| moyen | 2 |
| faible | 2 |

## Constats

### 1. [moyen] requête SQL construite par concaténation

- **Fichier :** `app.js`
- **Ligne :** 542
- **Extrait lu :** `} catch (error) { showToast(\`Could not update outage: ${error.message}\`, 'error'); }`
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 2. [moyen] injection HTML potentielle

- **Fichier :** `app.js`
- **Ligne :** 555
- **Extrait lu :** `body.innerHTML = rows.map(row => \`<tr><td>${escapeHTML(row.date)}</td><td>${escapeHTML(row.time)}</td><td><strong>${escapeHTML(row.board)}</strong></td><td>${fo`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 3. [faible] URL en clair (non HTTPS)

- **Fichier :** `server.py`
- **Ligne :** 41
- **Extrait lu :** `ESP32_HUB_URL = os.getenv("PYSMART_ESP32_1_URL", "http://192.168.1.119/api/status")`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 4. [faible] URL en clair (non HTTPS)

- **Fichier :** `server.py`
- **Ligne :** 42
- **Extrait lu :** `ESP32_S3_URL = os.getenv("PYSMART_ESP32_S3_URL", "http://192.168.1.115/api/status")`
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