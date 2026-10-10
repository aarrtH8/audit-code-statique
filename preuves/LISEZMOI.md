# Preuve de reproductibilité — https://github.com/blocknine0/geomacro

Deux analyses indépendantes du même état du dépôt, le 2026-10-10.

| Mesure | Passe 1 | Passe 2 |
|---|---|---|
| Fichiers | 1644 | 1644 |
| Lignes | 302 355 | 302 355 |
| Constats | 62 | 62 |
| Empreinte SARIF | `a8998e04c6cef992849de36073b8aeca…` | `a8998e04c6cef992849de36073b8aeca…` |

**Conclusion :** Décomptes ET contenu SARIF identiques sur deux passes indépendantes : le rapport est reproductible.

## Pourquoi ce document existe

Un client n'a aucune raison de croire un chiffre sans pouvoir le reproduire. Ce fichier
montre que les résultats publiés sont stables : la même analyse, relancée, donne le même
résultat. Si les passes divergeaient, ce document le dirait au lieu de le cacher.
