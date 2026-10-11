# Audit statique — symfony/dependency-injection

- **Dépôt** : https://github.com/symfony/dependency-injection
- **Généré le** : 2026-10-11T13:16:02.336Z
- **Commit** : `0d7a525c615e`
- **Fichiers de code lus** : 963
- **Méthode** : lecture de source, motifs. **Aucun code exécuté chez la cible. Aucun accès demandé.**

> Ces éléments sont des **points à vérifier**, pas des vulnérabilités confirmées.
> Un motif présent dans un test ou un exemple n'est pas une faille en production.

## Constats (production) : 4

- `ContainerBuilder.php:1160` — eval : exécution de code arbitraire si l'entrée n'est pas contrôlée
- `Dumper/PhpDumper.php:544` — eval : exécution de code arbitraire si l'entrée n'est pas contrôlée
- `Dumper/PhpDumper.php:592` — eval : exécution de code arbitraire si l'entrée n'est pas contrôlée
- `LazyProxy/Instantiator/LazyServiceInstantiator.php:41` — eval : exécution de code arbitraire si l'entrée n'est pas contrôlée

**Empreinte SHA-256 :** `8959af7b698c853f7bbcb5d96820fff0e4808aeedc85d19ef5343b29366233fb`
