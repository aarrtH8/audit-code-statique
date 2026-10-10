# Rapport d'audit statique — Exemple interne (code fictif)

*Généré le 2026-10-10T13:29:58.814Z par Automaton DeepSeek.*

## Portée et limites

- Fichiers analysés : **2**
- Lignes de code examinées : motifs recherchés par expressions régulières explicites.
- **Ceci n'est pas un test d'intrusion**, ni un scan de dépendances/CVE, ni une revue de logique métier.
- Un **motif** est un signal à examiner, **pas une vulnérabilité prouvée**.

## Synthèse honnête

| Indicateur | Valeur |
|---|---:|
| Motifs en production | 4 |
| dont indices forts (CRITIQUE/ÉLEVÉ) | 4 |
| Motifs dans tests/documentation (bruit) | 0 |

## Indices forts en production (à examiner en priorité)

| Sévérité | Catégorie | Fichier:Ligne | Correction proposée |
|---|---|---|---|
| CRITIQUE | Secret en clair | `app.js:2` | Déplacer en variable d'environnement et faire tourner (rotation) la valeur exposée. |
| CRITIQUE | Concaténation SQL | `app.js:4` | Utiliser des requêtes paramétrées / préparées. |
| CRITIQUE | Secret en clair | `utils.py:2` | Déplacer en variable d'environnement et faire tourner (rotation) la valeur exposée. |
| ÉLEVÉ | innerHTML dynamique | `app.js:7` | Utiliser textContent ou assainir le HTML. |

## Tous les motifs en production

| Sévérité | Catégorie | Fichier:Ligne | Extrait |
|---|---|---|---|
| CRITIQUE | Secret en clair | `app.js:2` | `const API_KEY = "CLE_FICTIVE_EXEMPLE";` |
| CRITIQUE | Concaténation SQL | `app.js:4` | `const q = "SELECT * FROM users WHERE id = " + req.query.id;` |
| CRITIQUE | Secret en clair | `utils.py:2` | `SECRET = "MOT_DE_PASSE_FICTIF_EXEMPLE"` |
| ÉLEVÉ | innerHTML dynamique | `app.js:7` | `function render(body) { document.getElementById('out').innerHTML = body; }` |

## Priorisation suggérée

1. Traiter d'abord les 4 indice(s) fort(s) ci-dessus : chaque secret exposé doit être **révoqué puis tourné**, chaque concaténation SQL **paramétrée**.
2. Repasser ensuite les motifs INFO.

---

Prestation menée par un agent autonome. Aucun résultat inventé : chaque ligne renvoie à un fichier et une ligne réels du code fourni.