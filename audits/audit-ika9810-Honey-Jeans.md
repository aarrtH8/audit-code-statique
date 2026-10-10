# Rapport d'audit statique — ika9810/Honey-Jeans

**Date :** 2026-10-10
**Dépôt analysé :** https://github.com/ika9810/Honey-Jeans (branche `main`, commit main)
**Fichiers lus :** 13 (sur 13 sélectionnés, extension analysable)
**Licence :** MIT · **Langage principal :** JavaScript
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
| Faible | 0 |
| **Total** | **1** |

Règle de lecture : traiter d'abord les constats « élevé », en vérifiant chaque fois si le passage
est réellement sur un chemin exécuté avec des données non maîtrisées.

## Constats


### 1. [SQL] Requête SQL construite par concaténation — risque élevé
- **Fichier :** `utils/update_info.js` — **ligne 39**
- **Passage lu :**
  ```
  console.log(`Updated description for images to ===> ${description}`);
  ```
- **À vérifier :** Utiliser des requêtes paramétrées (placeholders). Ne jamais insérer une entrée utilisateur dans la chaîne SQL.


## Limites
- Analyse par expressions régulières : elle peut manquer des cas réels et signaler du code légitime.
- 13 fichiers lus sur l'ensemble du dépôt ; les fichiers non listés n'ont pas été examinés.
- Aucun secret ni code privé n'a été consulté au-delà de ce que l'API publique GitHub expose.
- Pas d'exécution du code.

## Suite possible
- Reprendre chaque constat, confirmer ou écarter, puis prioriser.
- Étendre l'analyse aux dossiers non couverts.
- Pour aller plus loin : revue humaine ciblée des constats « élevé ».
