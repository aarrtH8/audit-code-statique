# Audit statique — counteraccro/natheo

**Rapport signal** — les 2 motifs les plus notables sur 120 fichiers lus.
Rapport complet : `livrable/counteraccro-natheo-2026-10-11.md` · SHA-256 `534ce0d4c5741ee3…` · 63 constats au total, 3 motifs distincts.

> Analyse statique par motifs. **Aucun code exécuté, rien modifié.** Ce sont des points **à vérifier**,
> pas des vulnérabilités confirmées : un motif peut être légitime (test, code mort, donnée d'exemple).
> Les chemins de test/CI/docs sont regroupés en fin de document pour ne pas noyer le code de production.

## Motifs en code de production

### [eleve] exécution de commande système — 31 occurrence(s)

- Premier emplacement : `src/Controller/Admin/System/UserController.php` ligne 226
- Extrait lu : `$fileSystem = new Filesystem();`
- Action : retracer l'origine des arguments ; entrée externe = injection probable.

### [faible] URL en clair (non HTTPS) — 13 occurrence(s)

- Premier emplacement : `config/reference.php` ligne 1506
- Extrait lu : `*     proxy_origin?: scalar|Param|null, // Allows to use different origin for as`
- Action : déterminer si ce trafic porte des données sensibles.

## Probablement légitime (chemins de test/CI/docs)

- [eleve] secret probable en clair — `tests/Controller/Admin/System/UserControllerTest.php` (19 occurrence(s))

## Ce que ce rapport n'est pas

- Pas un test d'intrusion, pas un scan de dépendances, pas une revue humaine complète.
- Aucune faille n'est « confirmée » : chaque ligne doit être ouverte et jugée par le mainteneur.

Périmètre ciblé chiffré sans engagement : https://github.com/aarrtH8/audit-code-statique/blob/main/offre/OFFRE-AUDIT.md