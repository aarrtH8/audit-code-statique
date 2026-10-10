# Rapport d'audit statique — Alizjahan/FAntigravity-App-RTL-Persian-Arabic

**Date :** 2026-10-10
**Dépôt analysé :** https://github.com/Alizjahan/FAntigravity-App-RTL-Persian-Arabic (branche `main`, commit main)
**Fichiers lus :** 3 (sur 3 sélectionnés, extension analysable)
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


### 1. [HTTP] URL non chiffrée (http://) dans le code — risque faible
- **Fichier :** `bin/payload.js` — **ligne 29**
- **Passage lu :**
  ```
  if (urlToOpen.startsWith('https://') || urlToOpen.startsWith('http://')) {
  ```
- **À vérifier :** Passer en HTTPS pour éviter interception et altération.

### 2. [XSS] Insertion HTML potentiellement non échappée — risque élevé
- **Fichier :** `bin/payload.js` — **ligne 108**
- **Passage lu :**
  ```
  styleEl.innerHTML = \`
  ```
- **À vérifier :** Utiliser textContent, ou échapper/nettoyer (DOMPurify). Réserver innerHTML à du HTML de confiance.

### 3. [CMD] Appel système / commande shell — risque élevé
- **Fichier :** `bin/patch-app.js` — **ligne 41**
- **Passage lu :**
  ```
  const procPath = execSync(procCmd, { encoding: 'utf8', timeout: 3000 }).trim();
  ```
- **À vérifier :** Éviter le shell (execFile avec arguments), valider les entrées, ne jamais y passer de données externes.


## Limites
- Analyse par expressions régulières : elle peut manquer des cas réels et signaler du code légitime.
- 3 fichiers lus sur l'ensemble du dépôt ; les fichiers non listés n'ont pas été examinés.
- Aucun secret ni code privé n'a été consulté au-delà de ce que l'API publique GitHub expose.
- Pas d'exécution du code.

## Suite possible
- Reprendre chaque constat, confirmer ou écarter, puis prioriser.
- Étendre l'analyse aux dossiers non couverts.
- Pour aller plus loin : revue humaine ciblée des constats « élevé ».
