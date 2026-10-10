# Rapport d'audit statique — mehrdadmb2/PySmartHome-PC

**Date :** 2026-10-10
**Dépôt analysé :** https://github.com/mehrdadmb2/PySmartHome-PC (branche `main`, commit main)
**Fichiers lus :** 4 (sur 4 sélectionnés, extension analysable)
**Licence :** MIT · **Langage principal :** JavaScript
**Généré par :** Automaton DeepSeek — analyse statique par motifs.

> **Nature de ce document.** Il s'agit d'**alertes à vérifier**, pas de vulnérabilités confirmées.
> Chaque ligne citée a été lue dans le dépôt à l'adresse indiquée. Un motif peut être légitime
> (exemple, test, code mort). Ce rapport **ne remplace pas** une revue de sécurité humaine,
> un test d'intrusion ni un scan des dépendances.

## Synthèse

| Risque | Nombre de constats |
|---|---|
| Élevé | 2 |
| Moyen | 0 |
| Faible | 1 |
| **Total** | **3** |

Règle de lecture : traiter d'abord les constats « élevé », en vérifiant chaque fois si le passage
est réellement sur un chemin exécuté avec des données non maîtrisées.

## Constats


### 1. [SQL] Requête SQL construite par concaténation — risque élevé
- **Fichier :** `app.js` — **ligne 258**
- **Passage lu :**
  ```
  setText(`updated-${board}`, node.last_seen ? `Last sample ${formatRelative(node.last_seen)}` : 'No successful sample yet');
  ```
- **À vérifier :** Utiliser des requêtes paramétrées (placeholders). Ne jamais insérer une entrée utilisateur dans la chaîne SQL.

### 2. [XSS] Insertion HTML potentiellement non échappée — risque élevé
- **Fichier :** `app.js` — **ligne 555**
- **Passage lu :**
  ```
  body.innerHTML = rows.map(row => `<tr><td>${escapeHTML(row.date)}</td><td>${escapeHTML(row.time)}</td><td><strong>${escapeHTML(row.board)}</strong></td><td>${fo
  ```
- **À vérifier :** Utiliser textContent, ou échapper/nettoyer (DOMPurify). Réserver innerHTML à du HTML de confiance.

### 3. [HTTP] URL non chiffrée (http://) dans le code — risque faible
- **Fichier :** `server.py` — **ligne 41**
- **Passage lu :**
  ```
  ESP32_HUB_URL = os.getenv("PYSMART_ESP32_1_URL", "http://192.168.1.119/api/status")
  ```
- **À vérifier :** Passer en HTTPS pour éviter interception et altération.


## Limites
- Analyse par expressions régulières : elle peut manquer des cas réels et signaler du code légitime.
- 4 fichiers lus sur l'ensemble du dépôt ; les fichiers non listés n'ont pas été examinés.
- Aucun secret ni code privé n'a été consulté au-delà de ce que l'API publique GitHub expose.
- Pas d'exécution du code.

## Suite possible
- Reprendre chaque constat, confirmer ou écarter, puis prioriser.
- Étendre l'analyse aux dossiers non couverts.
- Pour aller plus loin : revue humaine ciblée des constats « élevé ».
