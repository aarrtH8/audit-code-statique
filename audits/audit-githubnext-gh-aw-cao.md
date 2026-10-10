# Rapport d'audit statique — githubnext/gh-aw-cao

**Date :** 2026-10-10
**Dépôt analysé :** https://github.com/githubnext/gh-aw-cao
**Fichiers lus :** 30
**Généré par :** Automaton DeepSeek — analyse statique par motifs, via l'archive publique du dépôt (aucun code exécuté).

> **Nature de ce document.** Ce sont des **alertes à vérifier**, pas des vulnérabilités confirmées.
> Chaque ligne citée a été lue dans le dépôt à l'adresse indiquée. Un motif peut être légitime
> (exemple, test, code mort). Ce rapport **ne remplace pas** une revue de sécurité humaine,
> un test d'intrusion ni un scan des dépendances. Aucun code n'a été exécuté.

## Synthèse — 69 constat(s)

| Sévérité | Nombre |
|---|---|
| critique | 0 |
| eleve | 39 |
| moyen | 0 |
| faible | 30 |

## Constats

### 1. [eleve] secret probable en clair

- **Fichier :** `.github/workflows/self-care-primer-brand-checker.lock.yml`
- **Ligne :** 915
- **Extrait lu :** `export GITHUB_PERSONAL_ACCESS_TOKEN="$GITHUB_MCP_SERVER_TOKEN"`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 2. [eleve] secret probable en clair

- **Fichier :** `.github/workflows/self-care-primer-brand-checker.lock.yml`
- **Ligne :** 1082
- **Extrait lu :** `export COPILOT_API_KEY="$COPILOT_DUMMY_BYOK"`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 3. [eleve] secret probable en clair

- **Fichier :** `.github/workflows/self-care-dashboard-language-refactor.lock.yml`
- **Ligne :** 1049
- **Extrait lu :** `export COPILOT_API_KEY="$COPILOT_DUMMY_BYOK"`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 4. [eleve] secret probable en clair

- **Fichier :** `.github/workflows/dreaming-agents-md-curator.lock.yml`
- **Ligne :** 866
- **Extrait lu :** `export GITHUB_PERSONAL_ACCESS_TOKEN="$GITHUB_MCP_SERVER_TOKEN"`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 5. [eleve] secret probable en clair

- **Fichier :** `.github/workflows/dreaming-agents-md-curator.lock.yml`
- **Ligne :** 1028
- **Extrait lu :** `export COPILOT_API_KEY="$COPILOT_DUMMY_BYOK"`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 6. [eleve] secret probable en clair

- **Fichier :** `.github/workflows/self-care-pages-health.lock.yml`
- **Ligne :** 1062
- **Extrait lu :** `export COPILOT_API_KEY="$COPILOT_DUMMY_BYOK"`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 7. [eleve] secret probable en clair

- **Fichier :** `.github/workflows/self-care-dashboard-data-schema.lock.yml`
- **Ligne :** 896
- **Extrait lu :** `export GITHUB_PERSONAL_ACCESS_TOKEN="$GITHUB_MCP_SERVER_TOKEN"`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 8. [eleve] secret probable en clair

- **Fichier :** `.github/workflows/self-care-dashboard-data-schema.lock.yml`
- **Ligne :** 1039
- **Extrait lu :** `export COPILOT_API_KEY="$COPILOT_DUMMY_BYOK"`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 9. [eleve] secret probable en clair

- **Fichier :** `.github/workflows/self-care-code-improvement.lock.yml`
- **Ligne :** 1048
- **Extrait lu :** `export COPILOT_API_KEY="$COPILOT_DUMMY_BYOK"`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 10. [eleve] secret probable en clair

- **Fichier :** `.github/workflows/self-care-documentation-discoverability.lock.yml`
- **Ligne :** 1103
- **Extrait lu :** `export COPILOT_API_KEY="$COPILOT_DUMMY_BYOK"`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 11. [eleve] secret probable en clair

- **Fichier :** `.github/workflows/self-care-release-blogger.lock.yml`
- **Ligne :** 1034
- **Extrait lu :** `export COPILOT_API_KEY="$COPILOT_DUMMY_BYOK"`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 12. [eleve] secret probable en clair

- **Fichier :** `.github/workflows/self-care-glossary.lock.yml`
- **Ligne :** 1034
- **Extrait lu :** `export COPILOT_API_KEY="$COPILOT_DUMMY_BYOK"`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 13. [eleve] secret probable en clair

- **Fichier :** `.github/workflows/repo-assist-issue-triage.lock.yml`
- **Ligne :** 1134
- **Extrait lu :** `export COPILOT_API_KEY="$COPILOT_DUMMY_BYOK"`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 14. [eleve] secret probable en clair

- **Fichier :** `.github/workflows/eslint-rules-applier.lock.yml`
- **Ligne :** 905
- **Extrait lu :** `export GITHUB_PERSONAL_ACCESS_TOKEN="$GITHUB_MCP_SERVER_TOKEN"`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 15. [eleve] secret probable en clair

- **Fichier :** `.github/workflows/eslint-rules-applier.lock.yml`
- **Ligne :** 1048
- **Extrait lu :** `export COPILOT_API_KEY="$COPILOT_DUMMY_BYOK"`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 16. [eleve] secret probable en clair

- **Fichier :** `.github/workflows/cao-evolution-catalog-advisor.lock.yml`
- **Ligne :** 966
- **Extrait lu :** `export GITHUB_PERSONAL_ACCESS_TOKEN="$GITHUB_MCP_SERVER_TOKEN"`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 17. [eleve] secret probable en clair

- **Fichier :** `.github/workflows/cao-evolution-catalog-advisor.lock.yml`
- **Ligne :** 1131
- **Extrait lu :** `export COPILOT_API_KEY="$COPILOT_DUMMY_BYOK"`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 18. [eleve] secret probable en clair

- **Fichier :** `.github/workflows/cao-evolution-reliability.lock.yml`
- **Ligne :** 968
- **Extrait lu :** `export GITHUB_PERSONAL_ACCESS_TOKEN="$GITHUB_MCP_SERVER_TOKEN"`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 19. [eleve] secret probable en clair

- **Fichier :** `.github/workflows/cao-evolution-reliability.lock.yml`
- **Ligne :** 1133
- **Extrait lu :** `export COPILOT_API_KEY="$COPILOT_DUMMY_BYOK"`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 20. [eleve] secret probable en clair

- **Fichier :** `.github/workflows/cao-evolution-efficiency.lock.yml`
- **Ligne :** 966
- **Extrait lu :** `export GITHUB_PERSONAL_ACCESS_TOKEN="$GITHUB_MCP_SERVER_TOKEN"`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 21. [eleve] secret probable en clair

- **Fichier :** `.github/workflows/cao-evolution-efficiency.lock.yml`
- **Ligne :** 1131
- **Extrait lu :** `export COPILOT_API_KEY="$COPILOT_DUMMY_BYOK"`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 22. [eleve] secret probable en clair

- **Fichier :** `.github/workflows/optimization-token-optimizer.lock.yml`
- **Ligne :** 976
- **Extrait lu :** `export GITHUB_PERSONAL_ACCESS_TOKEN="$GITHUB_MCP_SERVER_TOKEN"`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 23. [eleve] secret probable en clair

- **Fichier :** `.github/workflows/optimization-token-optimizer.lock.yml`
- **Ligne :** 1141
- **Extrait lu :** `export COPILOT_API_KEY="$COPILOT_DUMMY_BYOK"`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 24. [eleve] secret probable en clair

- **Fichier :** `.github/workflows/self-care-data-acquisition-audit.lock.yml`
- **Ligne :** 878
- **Extrait lu :** `export GITHUB_PERSONAL_ACCESS_TOKEN="$GITHUB_MCP_SERVER_TOKEN"`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 25. [eleve] secret probable en clair

- **Fichier :** `.github/workflows/self-care-data-acquisition-audit.lock.yml`
- **Ligne :** 1017
- **Extrait lu :** `export COPILOT_API_KEY="$COPILOT_DUMMY_BYOK"`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 26. [eleve] secret probable en clair

- **Fichier :** `.github/workflows/eslint-rules-librarian.lock.yml`
- **Ligne :** 904
- **Extrait lu :** `export GITHUB_PERSONAL_ACCESS_TOKEN="$GITHUB_MCP_SERVER_TOKEN"`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 27. [eleve] secret probable en clair

- **Fichier :** `.github/workflows/eslint-rules-librarian.lock.yml`
- **Ligne :** 1047
- **Extrait lu :** `export COPILOT_API_KEY="$COPILOT_DUMMY_BYOK"`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 28. [eleve] secret probable en clair

- **Fichier :** `.github/workflows/eslint-rules-inventory.lock.yml`
- **Ligne :** 904
- **Extrait lu :** `export GITHUB_PERSONAL_ACCESS_TOKEN="$GITHUB_MCP_SERVER_TOKEN"`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 29. [eleve] secret probable en clair

- **Fichier :** `.github/workflows/eslint-rules-inventory.lock.yml`
- **Ligne :** 1047
- **Extrait lu :** `export COPILOT_API_KEY="$COPILOT_DUMMY_BYOK"`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 30. [eleve] secret probable en clair

- **Fichier :** `.github/workflows/eslint-rules-refiner.lock.yml`
- **Ligne :** 904
- **Extrait lu :** `export GITHUB_PERSONAL_ACCESS_TOKEN="$GITHUB_MCP_SERVER_TOKEN"`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 31. [eleve] secret probable en clair

- **Fichier :** `.github/workflows/eslint-rules-refiner.lock.yml`
- **Ligne :** 1047
- **Extrait lu :** `export COPILOT_API_KEY="$COPILOT_DUMMY_BYOK"`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 32. [eleve] secret probable en clair

- **Fichier :** `.github/workflows/self-care-dashboard-review.lock.yml`
- **Ligne :** 1035
- **Extrait lu :** `export COPILOT_API_KEY="$COPILOT_DUMMY_BYOK"`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 33. [eleve] secret probable en clair

- **Fichier :** `.github/workflows/cao-evolution-compiler-security.lock.yml`
- **Ligne :** 882
- **Extrait lu :** `export GITHUB_PERSONAL_ACCESS_TOKEN="$GITHUB_MCP_SERVER_TOKEN"`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 34. [eleve] secret probable en clair

- **Fichier :** `.github/workflows/cao-evolution-compiler-security.lock.yml`
- **Ligne :** 1047
- **Extrait lu :** `export COPILOT_API_KEY="$COPILOT_DUMMY_BYOK"`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 35. [eleve] secret probable en clair

- **Fichier :** `.github/workflows/cao-evolution-integrity.lock.yml`
- **Ligne :** 915
- **Extrait lu :** `export GITHUB_PERSONAL_ACCESS_TOKEN="$GITHUB_MCP_SERVER_TOKEN"`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 36. [eleve] secret probable en clair

- **Fichier :** `.github/workflows/cao-evolution-integrity.lock.yml`
- **Ligne :** 1058
- **Extrait lu :** `export COPILOT_API_KEY="$COPILOT_DUMMY_BYOK"`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 37. [eleve] secret probable en clair

- **Fichier :** `.github/workflows/eslint-rules-miner.lock.yml`
- **Ligne :** 1023
- **Extrait lu :** `export COPILOT_API_KEY="$COPILOT_DUMMY_BYOK"`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 38. [eleve] secret probable en clair

- **Fichier :** `.github/workflows/optimization-token-auditor.lock.yml`
- **Ligne :** 951
- **Extrait lu :** `export GITHUB_PERSONAL_ACCESS_TOKEN="$GITHUB_MCP_SERVER_TOKEN"`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 39. [eleve] secret probable en clair

- **Fichier :** `.github/workflows/optimization-token-auditor.lock.yml`
- **Ligne :** 1116
- **Extrait lu :** `export COPILOT_API_KEY="$COPILOT_DUMMY_BYOK"`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 40. [faible] URL en clair (non HTTPS)

- **Fichier :** `.github/workflows/self-care-primer-brand-checker.lock.yml`
- **Ligne :** 2576
- **Extrait lu :** `GH_HOST="${GH_HOST#http://}"`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 41. [faible] URL en clair (non HTTPS)

- **Fichier :** `.github/workflows/self-care-dashboard-language-refactor.lock.yml`
- **Ligne :** 2540
- **Extrait lu :** `GH_HOST="${GH_HOST#http://}"`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 42. [faible] URL en clair (non HTTPS)

- **Fichier :** `.github/workflows/dreaming-agents-md-curator.lock.yml`
- **Ligne :** 2413
- **Extrait lu :** `GH_HOST="${GH_HOST#http://}"`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 43. [faible] URL en clair (non HTTPS)

- **Fichier :** `.github/workflows/self-care-accessibility-checker.lock.yml`
- **Ligne :** 2502
- **Extrait lu :** `GH_HOST="${GH_HOST#http://}"`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 44. [faible] URL en clair (non HTTPS)

- **Fichier :** `.github/workflows/self-care-pages-health.lock.yml`
- **Ligne :** 2535
- **Extrait lu :** `GH_HOST="${GH_HOST#http://}"`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 45. [faible] URL en clair (non HTTPS)

- **Fichier :** `.github/workflows/self-care-dashboard-data-schema.lock.yml`
- **Ligne :** 2523
- **Extrait lu :** `GH_HOST="${GH_HOST#http://}"`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 46. [faible] URL en clair (non HTTPS)

- **Fichier :** `.github/workflows/self-care-code-improvement.lock.yml`
- **Ligne :** 2539
- **Extrait lu :** `GH_HOST="${GH_HOST#http://}"`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 47. [faible] URL en clair (non HTTPS)

- **Fichier :** `.github/workflows/self-care-documentation-discoverability.lock.yml`
- **Ligne :** 2528
- **Extrait lu :** `GH_HOST="${GH_HOST#http://}"`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 48. [faible] URL en clair (non HTTPS)

- **Fichier :** `.github/workflows/self-care-release-blogger.lock.yml`
- **Ligne :** 2525
- **Extrait lu :** `GH_HOST="${GH_HOST#http://}"`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 49. [faible] URL en clair (non HTTPS)

- **Fichier :** `.github/workflows/self-care-glossary.lock.yml`
- **Ligne :** 2525
- **Extrait lu :** `GH_HOST="${GH_HOST#http://}"`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 50. [faible] URL en clair (non HTTPS)

- **Fichier :** `.github/workflows/repo-assist-issue-triage.lock.yml`
- **Ligne :** 2572
- **Extrait lu :** `GH_HOST="${GH_HOST#http://}"`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 51. [faible] URL en clair (non HTTPS)

- **Fichier :** `.github/workflows/eslint-rules-applier.lock.yml`
- **Ligne :** 2558
- **Extrait lu :** `GH_HOST="${GH_HOST#http://}"`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 52. [faible] URL en clair (non HTTPS)

- **Fichier :** `.github/workflows/cao-evolution-catalog-advisor.lock.yml`
- **Ligne :** 2557
- **Extrait lu :** `GH_HOST="${GH_HOST#http://}"`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 53. [faible] URL en clair (non HTTPS)

- **Fichier :** `.github/workflows/cao-evolution-reliability.lock.yml`
- **Ligne :** 2559
- **Extrait lu :** `GH_HOST="${GH_HOST#http://}"`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 54. [faible] URL en clair (non HTTPS)

- **Fichier :** `.github/workflows/cao-evolution-efficiency.lock.yml`
- **Ligne :** 2557
- **Extrait lu :** `GH_HOST="${GH_HOST#http://}"`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 55. [faible] URL en clair (non HTTPS)

- **Fichier :** `.github/workflows/optimization-token-optimizer.lock.yml`
- **Ligne :** 2562
- **Extrait lu :** `GH_HOST="${GH_HOST#http://}"`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 56. [faible] URL en clair (non HTTPS)

- **Fichier :** `.github/workflows/self-care-data-acquisition-audit.lock.yml`
- **Ligne :** 2501
- **Extrait lu :** `GH_HOST="${GH_HOST#http://}"`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 57. [faible] URL en clair (non HTTPS)

- **Fichier :** `.github/workflows/eslint-rules-librarian.lock.yml`
- **Ligne :** 2534
- **Extrait lu :** `GH_HOST="${GH_HOST#http://}"`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 58. [faible] URL en clair (non HTTPS)

- **Fichier :** `.github/workflows/eslint-rules-inventory.lock.yml`
- **Ligne :** 2534
- **Extrait lu :** `GH_HOST="${GH_HOST#http://}"`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 59. [faible] URL en clair (non HTTPS)

- **Fichier :** `.github/workflows/uk-ai-advisory-operational-resilience.lock.yml`
- **Ligne :** 2341
- **Extrait lu :** `GH_HOST="${GH_HOST#http://}"`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 60. [faible] URL en clair (non HTTPS)

- **Fichier :** `.github/workflows/eslint-rules-refiner.lock.yml`
- **Ligne :** 2534
- **Extrait lu :** `GH_HOST="${GH_HOST#http://}"`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 61. [faible] URL en clair (non HTTPS)

- **Fichier :** `.github/workflows/self-care-dashboard-review.lock.yml`
- **Ligne :** 2460
- **Extrait lu :** `GH_HOST="${GH_HOST#http://}"`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 62. [faible] URL en clair (non HTTPS)

- **Fichier :** `.github/workflows/cao-evolution-compiler-security.lock.yml`
- **Ligne :** 2432
- **Extrait lu :** `GH_HOST="${GH_HOST#http://}"`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 63. [faible] URL en clair (non HTTPS)

- **Fichier :** `.github/workflows/self-care-docs-build-time-investigator.lock.yml`
- **Ligne :** 2489
- **Extrait lu :** `GH_HOST="${GH_HOST#http://}"`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 64. [faible] URL en clair (non HTTPS)

- **Fichier :** `.github/workflows/cao-evolution-integrity.lock.yml`
- **Ligne :** 2484
- **Extrait lu :** `GH_HOST="${GH_HOST#http://}"`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 65. [faible] URL en clair (non HTTPS)

- **Fichier :** `.github/workflows/eslint-rules-miner.lock.yml`
- **Ligne :** 2508
- **Extrait lu :** `GH_HOST="${GH_HOST#http://}"`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 66. [faible] URL en clair (non HTTPS)

- **Fichier :** `.github/workflows/self-care-open-source-failures.lock.yml`
- **Ligne :** 2384
- **Extrait lu :** `GH_HOST="${GH_HOST#http://}"`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 67. [faible] URL en clair (non HTTPS)

- **Fichier :** `.github/workflows/optimization-token-auditor.lock.yml`
- **Ligne :** 2502
- **Extrait lu :** `GH_HOST="${GH_HOST#http://}"`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 68. [faible] URL en clair (non HTTPS)

- **Fichier :** `.github/workflows/eu-cra-compliance-vulnerability-handling-auditor.lock.yml`
- **Ligne :** 2333
- **Extrait lu :** `GH_HOST="${GH_HOST#http://}"`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 69. [faible] URL en clair (non HTTPS)

- **Fichier :** `.github/workflows/eu-cra-compliance-article-14-reporting-readiness.lock.yml`
- **Ligne :** 2333
- **Extrait lu :** `GH_HOST="${GH_HOST#http://}"`
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