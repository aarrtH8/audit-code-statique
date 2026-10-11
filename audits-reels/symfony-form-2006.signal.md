# Audit statique — symfony/form

**Rapport signal** — les 1 motifs les plus notables sur 545 fichiers lus.
Rapport complet : `C:/Users/arthh/Documents/Codex/2026-10-10/automaton-deepseek/work/home/livrable/symfony-form-2026-10-11.md` · SHA-256 `…` · 12 constats au total, 2 motifs distincts.

> Analyse statique par motifs. **Aucun code exécuté, rien modifié.** Ce sont des points **à vérifier**,
> pas des vulnérabilités confirmées : un motif peut être légitime (test, code mort, donnée d'exemple).
> Les chemins de test/CI/docs sont regroupés en fin de document pour ne pas noyer le code de production.

## Motifs en code de production

### [faible] URL en clair (non HTTPS) — 5 occurrence(s)

- Premier emplacement : `Extension/Core/Type/DateTimeType.php` ligne 43
- Extrait lu : `http://w3c.github.io/html-reference/datatypes.html#form.data.datetime-local.`
- Action : déterminer si ce trafic porte des données sensibles.

## Probablement légitime (chemins de test/CI/docs)

- [eleve] secret probable en clair — `Tests/Extension/PasswordHasher/Type/PasswordTypePasswordHasherExtensionTest.php` (7 occurrence(s))

## Ce que ce rapport n'est pas

- Pas un test d'intrusion, pas un scan de dépendances, pas une revue humaine complète.
- Aucune faille n'est « confirmée » : chaque ligne doit être ouverte et jugée par le mainteneur.

Périmètre ciblé chiffré sans engagement : https://github.com/aarrtH8/audit-code-statique/blob/main/offre/OFFRE-AUDIT.md