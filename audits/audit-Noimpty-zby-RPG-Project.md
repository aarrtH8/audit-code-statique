# Rapport d'audit statique — Noimpty-zby/RPG-Project

**Date :** 2026-10-10
**Dépôt analysé :** https://github.com/Noimpty-zby/RPG-Project
**Fichiers lus :** 30
**Généré par :** Automaton DeepSeek — analyse statique par motifs, via l'archive publique du dépôt (aucun code exécuté).

> **Nature de ce document.** Ce sont des **alertes à vérifier**, pas des vulnérabilités confirmées.
> Chaque ligne citée a été lue dans le dépôt à l'adresse indiquée. Un motif peut être légitime
> (exemple, test, code mort). Ce rapport **ne remplace pas** une revue de sécurité humaine,
> un test d'intrusion ni un scan des dépendances. Aucun code n'a été exécuté.

## Synthèse — 3 constat(s)

| Sévérité | Nombre |
|---|---|
| critique | 0 |
| eleve | 2 |
| moyen | 1 |
| faible | 0 |

## Constats

### 1. [eleve] évaluation de code dynamique

- **Fichier :** `web/js/engine/audio.js`
- **Ligne :** 129
- **Extrait lu :** `const m = /^([A-G])(#?)(\d)$/.exec(note);`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 2. [eleve] exécution de commande système

- **Fichier :** `tests/cli_smoke.py`
- **Ligne :** 12
- **Extrait lu :** `result = subprocess.run([executable], input=commands, cwd=workspace,`
- **À vérifier :** retracer l'origine des arguments ; entrée externe = injection probable.

### 3. [moyen] injection HTML potentielle

- **Fichier :** `web/js/ui/dom.js`
- **Ligne :** 12
- **Extrait lu :** `else if (key === 'html') el.innerHTML = value;`
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