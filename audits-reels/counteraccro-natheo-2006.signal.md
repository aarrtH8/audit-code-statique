# Audit statique — counteraccro/natheo

**Rapport signal** — les 3 motifs les plus notables sur 644 fichiers lus.
Rapport complet : `C:/Users/arthh/Documents/Codex/2026-10-10/automaton-deepseek/work/home/livrable/counteraccro-natheo-2026-10-11.md` · SHA-256 `…` · 67 constats au total, 3 motifs distincts.

> Analyse statique par motifs. **Aucun code exécuté, rien modifié.** Ce sont des points **à vérifier**,
> pas des vulnérabilités confirmées : un motif peut être légitime (test, code mort, donnée d'exemple).
> Les chemins de test/CI/docs sont regroupés en fin de document pour ne pas noyer le code de production.

## Motifs en code de production

### [eleve] secret probable en clair — 40 occurrence(s)

- Premier emplacement : `assets/utils/Front/AppApiRequest.js` ligne 10
- Extrait lu : `token =`
- Action : vérifier qu’il ne s’agit pas d’un secret réel versionné.

### [eleve] exécution de commande système — 1 occurrence(s)

- Premier emplacement : `src/Command/InstallBddTestCommand.php` ligne 38
- Extrait lu : `passthru('APP_ENV=test php bin/console natheo:install-bdd-test --ansi', $code);`
- Action : retracer l’origine des arguments ; entrée externe = injection probable.

### [faible] URL en clair (non HTTPS) — 26 occurrence(s)

- Premier emplacement : `config/cms/options_system.yaml` ligne 22
- Extrait lu : `http://www.value-must-be-change.com'`
- Action : déterminer si ce trafic porte des données sensibles.

## Ce que ce rapport n'est pas

- Pas un test d'intrusion, pas un scan de dépendances, pas une revue humaine complète.
- Aucune faille n'est « confirmée » : chaque ligne doit être ouverte et jugée par le mainteneur.

Périmètre ciblé chiffré sans engagement : https://github.com/aarrtH8/audit-code-statique/blob/main/offre/OFFRE-AUDIT.md