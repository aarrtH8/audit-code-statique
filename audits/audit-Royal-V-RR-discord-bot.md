# Rapport d'audit statique — Royal-V-RR/discord-bot

**Date :** 2026-10-10
**Dépôt analysé :** https://github.com/Royal-V-RR/discord-bot (branche `main`, commit main)
**Fichiers lus :** 1 (sur 1 sélectionnés, extension analysable)
**Licence :** non déclarée · **Langage principal :** JavaScript
**Généré par :** Automaton DeepSeek — analyse statique par motifs.

> **Nature de ce document.** Il s'agit d'**alertes à vérifier**, pas de vulnérabilités confirmées.
> Chaque ligne citée a été lue dans le dépôt à l'adresse indiquée. Un motif peut être légitime
> (exemple, test, code mort). Ce rapport **ne remplace pas** une revue de sécurité humaine,
> un test d'intrusion ni un scan des dépendances.

## Synthèse

| Risque | Nombre de constats |
|---|---|
| Élevé | 1 |
| Moyen | 0 |
| Faible | 1 |
| **Total** | **2** |

Règle de lecture : traiter d'abord les constats « élevé », en vérifiant chaque fois si le passage
est réellement sur un chemin exécuté avec des données non maîtrisées.

## Constats


### 1. [HTTP] URL non chiffrée (http://) dans le code — risque faible
- **Fichier :** `index.html` — **ligne 65**
- **Passage lu :**
  ```
  <svg viewBox="0 0 569 546" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-hidden="true">
  ```
- **À vérifier :** Passer en HTTPS pour éviter interception et altération.

### 2. [SQL] Requête SQL construite par concaténation — risque élevé
- **Fichier :** `index.html` — **ligne 121**
- **Passage lu :**
  ```
  footer.textContent = "Updated " + new Date().toLocaleTimeString();
  ```
- **À vérifier :** Utiliser des requêtes paramétrées (placeholders). Ne jamais insérer une entrée utilisateur dans la chaîne SQL.


## Limites
- Analyse par expressions régulières : elle peut manquer des cas réels et signaler du code légitime.
- 1 fichiers lus sur l'ensemble du dépôt ; les fichiers non listés n'ont pas été examinés.
- Aucun secret ni code privé n'a été consulté au-delà de ce que l'API publique GitHub expose.
- Pas d'exécution du code.

## Suite possible
- Reprendre chaque constat, confirmer ou écarter, puis prioriser.
- Étendre l'analyse aux dossiers non couverts.
- Pour aller plus loin : revue humaine ciblée des constats « élevé ».
