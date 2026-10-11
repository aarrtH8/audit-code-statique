# Audit statique — vllm-project/vllm-ascend

**Rapport signal** — les 5 motifs les plus notables sur 2201 fichiers lus.
Rapport complet : `C:/Users/arthh/Documents/Codex/2026-10-10/automaton-deepseek/work/home/livrable/vllm-project-vllm-ascend-2026-10-11.md` · SHA-256 `…` · 747 constats au total, 5 motifs distincts.

> Analyse statique par motifs. **Aucun code exécuté, rien modifié.** Ce sont des points **à vérifier**,
> pas des vulnérabilités confirmées : un motif peut être légitime (test, code mort, donnée d'exemple).
> Les chemins de test/CI/docs sont regroupés en fin de document pour ne pas noyer le code de production.

## Motifs en code de production

### [eleve] requête SQL concaténée — 45 occurrence(s)

- Premier emplacement : `.github/workflows/pr_test.yaml` ligne 631
- Extrait lu : `selected-tests (vllm@${{ matrix.vllm_version }})`
- Action : vérifier si un paramètre utilisateur entre dans la chaîne.

### [eleve] exécution de commande système — 20 occurrence(s)

- Premier emplacement : `csrc/scripts/build_cache.py` ligne 312
- Extrait lu : `system(),`
- Action : retracer l’origine des arguments ; entrée externe = injection probable.

### [eleve] secret probable en clair — 11 occurrence(s)

- Premier emplacement : `.github/workflows/bot_merge_conflict.yaml` ligne 16
- Extrait lu : `Token: "${{ secrets.GITHUB_TOKEN }}"`
- Action : vérifier qu’il ne s’agit pas d’un secret réel versionné.

### [moyen] comparaison faible — 4 occurrence(s)

- Premier emplacement : `.github/workflows/scripts/test_selector.py` ligne 1214
- Extrait lu : `md5()`
- Action : vérifier l’usage (hachage faible, comparaison non constante).

### [faible] URL en clair (non HTTPS) — 667 occurrence(s)

- Premier emplacement : `.github/workflows/bot_pr_create.yaml` ligne 8
- Extrait lu : `http://www.apache.org/licenses/LICENSE-2.0`
- Action : déterminer si ce trafic porte des données sensibles.

## Ce que ce rapport n'est pas

- Pas un test d'intrusion, pas un scan de dépendances, pas une revue humaine complète.
- Aucune faille n'est « confirmée » : chaque ligne doit être ouverte et jugée par le mainteneur.

Périmètre ciblé chiffré sans engagement : https://github.com/aarrtH8/audit-code-statique/blob/main/offre/OFFRE-AUDIT.md