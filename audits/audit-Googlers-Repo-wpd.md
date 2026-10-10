# Rapport d'audit statique — Googlers-Repo/wpd

**Date :** 2026-10-10
**Dépôt analysé :** https://github.com/Googlers-Repo/wpd (branche `master`, commit master)
**Fichiers lus :** 2 (sur 2 sélectionnés, extension analysable)
**Licence :** GPL-3.0 · **Langage principal :** JavaScript
**Généré par :** Automaton DeepSeek — analyse statique par motifs.

> **Nature de ce document.** Il s'agit d'**alertes à vérifier**, pas de vulnérabilités confirmées.
> Chaque ligne citée a été lue dans le dépôt à l'adresse indiquée. Un motif peut être légitime
> (exemple, test, code mort). Ce rapport **ne remplace pas** une revue de sécurité humaine,
> un test d'intrusion ni un scan des dépendances.

## Synthèse

| Risque | Nombre de constats |
|---|---|
| Élevé | 2 |
| Moyen | 1 |
| Faible | 0 |
| **Total** | **3** |

Règle de lecture : traiter d'abord les constats « élevé », en vérifiant chaque fois si le passage
est réellement sur un chemin exécuté avec des données non maîtrisées.

## Constats


### 1. [SECRET] Clé ou secret en dur — risque moyen
- **Fichier :** `webroot/assets/app.js` — **ligne 30**
- **Passage lu :**
  ```
  password: "correct-horse-battery",
  ```
- **À vérifier :** Déplacer la valeur dans une variable d’environnement ou un gestionnaire de secrets. Vérifier si la valeur est encore valide et la révoquer si elle a été publiée.

### 2. [XSS] Insertion HTML potentiellement non échappée — risque élevé
- **Fichier :** `webroot/assets/app.js` — **ligne 164**
- **Passage lu :**
  ```
  $("#notice").innerHTML = "";
  ```
- **À vérifier :** Utiliser textContent, ou échapper/nettoyer (DOMPurify). Réserver innerHTML à du HTML de confiance.

### 3. [SQL] Requête SQL construite par concaténation — risque élevé
- **Fichier :** `webroot/assets/app.js` — **ligne 710**
- **Passage lu :**
  ```
  var el = document.querySelector('.net[data-id="' + id + '"]');
  ```
- **À vérifier :** Utiliser des requêtes paramétrées (placeholders). Ne jamais insérer une entrée utilisateur dans la chaîne SQL.


## Limites
- Analyse par expressions régulières : elle peut manquer des cas réels et signaler du code légitime.
- 2 fichiers lus sur l'ensemble du dépôt ; les fichiers non listés n'ont pas été examinés.
- Aucun secret ni code privé n'a été consulté au-delà de ce que l'API publique GitHub expose.
- Pas d'exécution du code.

## Suite possible
- Reprendre chaque constat, confirmer ou écarter, puis prioriser.
- Étendre l'analyse aux dossiers non couverts.
- Pour aller plus loin : revue humaine ciblée des constats « élevé ».
