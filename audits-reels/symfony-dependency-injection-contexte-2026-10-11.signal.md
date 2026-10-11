# Audit statique avec contexte — symfony/dependency-injection

- **Dépôt** : https://github.com/symfony/dependency-injection
- **Généré le** : 2026-10-11T13:16:24.914Z
- **Commit** : `0d7a525c615e`
- **Fichiers de code lus** : 778
- **Méthode** : lecture de source + analyse de contexte. **Aucun code exécuté chez la cible.**

## Points à vérifier (production, contexte non banal) : 3

- `ContainerBuilder.php:1160` — eval
  `$proxy = eval('return '.LazyClosure::getCode('$initializer', $callable, $class, $this, $id).';');`
- `Dumper/PhpDumper.php:544` — eval
  `if ($file && str_ends_with($file, ') : eval()\'d code')) {`
- `Dumper/PhpDumper.php:592` — eval
  `if (str_ends_with($file, ') : eval()\'d code')) {`

## Motifs en production jugés légitimes — écartés : 1

- `LazyProxy/Instantiator/LazyServiceInstantiator.php:41` — eval *(écarté : contexte banal)*

> Ce rapport montre le contexte pour que VOUS jugiez. Un motif écarté reste visible.

**Empreinte SHA-256 :** `ea64aefbb4ff9c2c23668d2122bb5a64cf5e0b25979fbc288f110575ff5e029b`
