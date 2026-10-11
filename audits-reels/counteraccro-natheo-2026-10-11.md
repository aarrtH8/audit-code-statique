<!-- LIVRABLE SCELLÉ — empreinte SHA-256 : 534ce0d4c5741ee364b3df845a0328eb1f8d9dd1329d8d2ede213b0b42d2df28 -->
# Rapport d'audit statique — counteraccro/natheo

**Date :** 2026-10-11
**Dépôt analysé :** https://github.com/counteraccro/natheo
**Fichiers lus :** 120
**Généré par :** Automaton DeepSeek — analyse statique par motifs, via l'archive publique du dépôt (aucun code exécuté).

> **Nature de ce document.** Ce sont des **alertes à vérifier**, pas des vulnérabilités confirmées.
> Chaque ligne citée a été lue dans le dépôt à l'adresse indiquée. Un motif peut être légitime
> (exemple, test, code mort). Ce rapport **ne remplace pas** une revue de sécurité humaine,
> un test d'intrusion ni un scan des dépendances. Aucun code n'a été exécuté.

## Synthèse — 64 constat(s)

| Sévérité | Nombre |
|---|---|
| critique | 0 |
| eleve | 51 |
| moyen | 0 |
| faible | 13 |

## Constats

### 1. [eleve] secret probable en clair

- **Fichier :** `tests/Controller/Admin/System/UserControllerTest.php`
- **Ligne :** 431
- **Extrait lu :** `$currentPassword = 'Current-Pass1';`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 2. [eleve] exécution de commande système

- **Fichier :** `src/Controller/Admin/System/UserController.php`
- **Ligne :** 226
- **Extrait lu :** `$fileSystem = new Filesystem();`
- **À vérifier :** retracer l'origine des arguments ; entrée externe = injection probable.

### 3. [eleve] exécution de commande système

- **Fichier :** `src/Controller/Admin/System/UserController.php`
- **Ligne :** 347
- **Extrait lu :** `$fileSystem = new Filesystem();`
- **À vérifier :** retracer l'origine des arguments ; entrée externe = injection probable.

### 4. [eleve] exécution de commande système

- **Fichier :** `src/Controller/Admin/System/UserController.php`
- **Ligne :** 421
- **Extrait lu :** `$fileSystem = new Filesystem();`
- **À vérifier :** retracer l'origine des arguments ; entrée externe = injection probable.

### 5. [eleve] exécution de commande système

- **Fichier :** `src/Controller/Admin/System/UserController.php`
- **Ligne :** 599
- **Extrait lu :** `$fileSystem = new Filesystem();`
- **À vérifier :** retracer l'origine des arguments ; entrée externe = injection probable.

### 6. [eleve] exécution de commande système

- **Fichier :** `tests/Controller/Admin/Content/PageControllerTest.php`
- **Ligne :** 232
- **Extrait lu :** `$filesystem = new Filesystem();`
- **À vérifier :** retracer l'origine des arguments ; entrée externe = injection probable.

### 7. [eleve] exécution de commande système

- **Fichier :** `src/Service/Admin/Content/Media/MediaFolderService.php`
- **Ligne :** 174
- **Extrait lu :** `$filesystem = new Filesystem();`
- **À vérifier :** retracer l'origine des arguments ; entrée externe = injection probable.

### 8. [eleve] exécution de commande système

- **Fichier :** `src/Service/Admin/Content/Media/MediaFolderService.php`
- **Ligne :** 198
- **Extrait lu :** `$filesystem = new Filesystem();`
- **À vérifier :** retracer l'origine des arguments ; entrée externe = injection probable.

### 9. [eleve] exécution de commande système

- **Fichier :** `src/Service/Admin/Content/Media/MediaFolderService.php`
- **Ligne :** 429
- **Extrait lu :** `$fileSystem = new Filesystem();`
- **À vérifier :** retracer l'origine des arguments ; entrée externe = injection probable.

### 10. [eleve] exécution de commande système

- **Fichier :** `src/Service/Admin/Content/Media/MediaFolderService.php`
- **Ligne :** 685
- **Extrait lu :** `$fileSystem = new Filesystem();`
- **À vérifier :** retracer l'origine des arguments ; entrée externe = injection probable.

### 11. [eleve] exécution de commande système

- **Fichier :** `src/Service/Admin/Content/Media/MediaService.php`
- **Ligne :** 47
- **Extrait lu :** `$fileSystem = new Filesystem();`
- **À vérifier :** retracer l'origine des arguments ; entrée externe = injection probable.

### 12. [eleve] exécution de commande système

- **Fichier :** `src/Service/Admin/Content/Media/MediaService.php`
- **Ligne :** 386
- **Extrait lu :** `(new Filesystem())->remove($realPath);`
- **À vérifier :** retracer l'origine des arguments ; entrée externe = injection probable.

### 13. [eleve] exécution de commande système

- **Fichier :** `src/Service/Admin/Content/Media/MediaService.php`
- **Ligne :** 477
- **Extrait lu :** `$fileSystem = new Filesystem();`
- **À vérifier :** retracer l'origine des arguments ; entrée externe = injection probable.

### 14. [eleve] exécution de commande système

- **Fichier :** `src/Service/Admin/Content/Media/MediaService.php`
- **Ligne :** 645
- **Extrait lu :** `$fileSystem = new Filesystem();`
- **À vérifier :** retracer l'origine des arguments ; entrée externe = injection probable.

### 15. [eleve] exécution de commande système

- **Fichier :** `migrations/V2/Version20260823103010.php`
- **Ligne :** 75
- **Extrait lu :** `'CREATE TABLE option_system (id INT AUTO_INCREMENT NOT NULL, \`key\` VARCHAR(255) NOT NULL, value LONGTEXT DEFAULT NULL, created_at DATETIME NOT NULL, update_at D`
- **À vérifier :** retracer l'origine des arguments ; entrée externe = injection probable.

### 16. [eleve] secret probable en clair

- **Fichier :** `translations/messages+intl-icu.es.yaml`
- **Ligne :** 148
- **Extrait lu :** `options_system.time_reset_password: '__Délais de validité du lien de changement de mot de passe'`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 17. [eleve] secret probable en clair

- **Fichier :** `translations/messages+intl-icu.es.yaml`
- **Ligne :** 194
- **Extrait lu :** `global.api_token: '__API Token'`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 18. [eleve] secret probable en clair

- **Fichier :** `translations/messages+intl-icu.es.yaml`
- **Ligne :** 199
- **Extrait lu :** `options_system.time.validation.user.token: '__Temps de validation du token de connexion en tant que administrateur sur le front'`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 19. [eleve] secret probable en clair

- **Fichier :** `translations/messages+intl-icu.en.yaml`
- **Ligne :** 148
- **Extrait lu :** `options_system.time_reset_password: '__Délais de validité du lien de changement de mot de passe'`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 20. [eleve] secret probable en clair

- **Fichier :** `translations/messages+intl-icu.en.yaml`
- **Ligne :** 194
- **Extrait lu :** `global.api_token: '__API Token'`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 21. [eleve] secret probable en clair

- **Fichier :** `translations/messages+intl-icu.en.yaml`
- **Ligne :** 199
- **Extrait lu :** `options_system.time.validation.user.token: '__Temps de validation du token de connexion en tant que administrateur sur le front'`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 22. [eleve] secret probable en clair

- **Fichier :** `translations/messages+intl-icu.fr.yaml`
- **Ligne :** 148
- **Extrait lu :** `options_system.time_reset_password: 'Délais de validité du lien de changement de mot de passe'`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 23. [eleve] secret probable en clair

- **Fichier :** `translations/messages+intl-icu.fr.yaml`
- **Ligne :** 194
- **Extrait lu :** `global.api_token: 'API Token'`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 24. [eleve] secret probable en clair

- **Fichier :** `translations/messages+intl-icu.fr.yaml`
- **Ligne :** 199
- **Extrait lu :** `options_system.time.validation.user.token: 'Temps de validation du token de connexion en tant que administrateur sur le front'`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 25. [eleve] secret probable en clair

- **Fichier :** `translations/user+intl-icu.fr.yaml`
- **Ligne :** 25
- **Extrait lu :** `user.login_user.password: 'Mot de passe'`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 26. [eleve] secret probable en clair

- **Fichier :** `translations/user+intl-icu.fr.yaml`
- **Ligne :** 26
- **Extrait lu :** `user.login_user.forgot_password: 'Mot de passe oublié ?'`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 27. [eleve] secret probable en clair

- **Fichier :** `translations/user+intl-icu.fr.yaml`
- **Ligne :** 37
- **Extrait lu :** `user.page_my_account.password: 'Mot de passe'`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 28. [eleve] secret probable en clair

- **Fichier :** `translations/user+intl-icu.fr.yaml`
- **Ligne :** 129
- **Extrait lu :** `user.page_update.reset_password: 'Réinitialisation du mot de passe'`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 29. [eleve] secret probable en clair

- **Fichier :** `translations/user+intl-icu.fr.yaml`
- **Ligne :** 226
- **Extrait lu :** `user.change_password.error.current_password: 'Le mot de passe actuel est incorrect'`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 30. [eleve] exécution de commande système

- **Fichier :** `src/MessageHandler/Tools/DumpSqlHandler.php`
- **Ligne :** 136
- **Extrait lu :** `(new Filesystem())->mkdir(dirname($path));`
- **À vérifier :** retracer l'origine des arguments ; entrée externe = injection probable.

### 31. [eleve] exécution de commande système

- **Fichier :** `src/MessageHandler/Tools/DumpSqlHandler.php`
- **Ligne :** 184
- **Extrait lu :** `(new Filesystem())->remove($path);`
- **À vérifier :** retracer l'origine des arguments ; entrée externe = injection probable.

### 32. [eleve] secret probable en clair

- **Fichier :** `translations/user+intl-icu.es.yaml`
- **Ligne :** 225
- **Extrait lu :** `user.change_password.error.current_password: 'La contraseña actual es incorrecta'`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 33. [eleve] secret probable en clair

- **Fichier :** `translations/user+intl-icu.en.yaml`
- **Ligne :** 225
- **Extrait lu :** `user.change_password.error.current_password: 'The current password is incorrect'`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 34. [eleve] exécution de commande système

- **Fichier :** `src/Service/LoggerService.php`
- **Ligne :** 352
- **Extrait lu :** `(new Filesystem())->remove($path);`
- **À vérifier :** retracer l'origine des arguments ; entrée externe = injection probable.

### 35. [eleve] exécution de commande système

- **Fichier :** `tests/Service/LoggerServiceTest.php`
- **Ligne :** 236
- **Extrait lu :** `(new Filesystem())->remove($this->getLogRootPath() . $logFile);`
- **À vérifier :** retracer l'origine des arguments ; entrée externe = injection probable.

### 36. [eleve] exécution de commande système

- **Fichier :** `tests/Service/LoggerServiceTest.php`
- **Ligne :** 252
- **Extrait lu :** `(new Filesystem())->dumpFile($this->getLogRootPath() . $logFile, $content);`
- **À vérifier :** retracer l'origine des arguments ; entrée externe = injection probable.

### 37. [eleve] exécution de commande système

- **Fichier :** `tests/Service/LoggerServiceTest.php`
- **Ligne :** 259
- **Extrait lu :** `(new Filesystem())->remove($this->getLogRootPath() . $logFile);`
- **À vérifier :** retracer l'origine des arguments ; entrée externe = injection probable.

### 38. [eleve] exécution de commande système

- **Fichier :** `tests/Service/LoggerServiceTest.php`
- **Ligne :** 305
- **Extrait lu :** `(new Filesystem())->dumpFile($outsideFile, 'test');`
- **À vérifier :** retracer l'origine des arguments ; entrée externe = injection probable.

### 39. [eleve] exécution de commande système

- **Fichier :** `tests/Service/LoggerServiceTest.php`
- **Ligne :** 314
- **Extrait lu :** `(new Filesystem())->remove($outsideFile);`
- **À vérifier :** retracer l'origine des arguments ; entrée externe = injection probable.

### 40. [eleve] exécution de commande système

- **Fichier :** `tests/Service/LoggerServiceTest.php`
- **Ligne :** 351
- **Extrait lu :** `(new Filesystem())->dumpFile($this->getLogRootPath() . $logFile, $content);`
- **À vérifier :** retracer l'origine des arguments ; entrée externe = injection probable.

### 41. [eleve] exécution de commande système

- **Fichier :** `tests/Controller/Admin/Tools/DatabaseManagerControllerTest.php`
- **Ligne :** 21
- **Extrait lu :** `(new Filesystem())->remove($this->getDumpDirectory());`
- **À vérifier :** retracer l'origine des arguments ; entrée externe = injection probable.

### 42. [eleve] exécution de commande système

- **Fichier :** `tests/Controller/Admin/Tools/DatabaseManagerControllerTest.php`
- **Ligne :** 165
- **Extrait lu :** `$fileSystem = new Filesystem();`
- **À vérifier :** retracer l'origine des arguments ; entrée externe = injection probable.

### 43. [eleve] exécution de commande système

- **Fichier :** `tests/Controller/Admin/Tools/DatabaseManagerControllerTest.php`
- **Ligne :** 211
- **Extrait lu :** `$fileSystem = new Filesystem();`
- **À vérifier :** retracer l'origine des arguments ; entrée externe = injection probable.

### 44. [eleve] exécution de commande système

- **Fichier :** `tests/Controller/Admin/Tools/DatabaseManagerControllerTest.php`
- **Ligne :** 236
- **Extrait lu :** `$fileSystem = new Filesystem();`
- **À vérifier :** retracer l'origine des arguments ; entrée externe = injection probable.

### 45. [eleve] exécution de commande système

- **Fichier :** `tests/Controller/Admin/Tools/DatabaseManagerControllerTest.php`
- **Ligne :** 293
- **Extrait lu :** `$fileSystem = new Filesystem();`
- **À vérifier :** retracer l'origine des arguments ; entrée externe = injection probable.

### 46. [eleve] exécution de commande système

- **Fichier :** `tests/Utils/Content/Page/PageHistoryTest.php`
- **Ligne :** 49
- **Extrait lu :** `$this->filesystem = new Filesystem();`
- **À vérifier :** retracer l'origine des arguments ; entrée externe = injection probable.

### 47. [eleve] secret probable en clair

- **Fichier :** `translations/installation+intl-icu.fr.yaml`
- **Ligne :** 47
- **Extrait lu :** `installation.step.1.create.bdd.msg.update.secret: 'Mise à jour de APP_SECRET'`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 48. [eleve] exécution de commande système

- **Fichier :** `tests/MessageHandler/Tools/DumpSqlHandlerTest.php`
- **Ligne :** 32
- **Extrait lu :** `$this->fileSystem = new Filesystem();`
- **À vérifier :** retracer l'origine des arguments ; entrée externe = injection probable.

### 49. [eleve] exécution de commande système

- **Fichier :** `tests/MessageHandler/Tools/DumpSqlHandlerTest.php`
- **Ligne :** 38
- **Extrait lu :** `(new Filesystem())->remove($this->getDumpDirectory());`
- **À vérifier :** retracer l'origine des arguments ; entrée externe = injection probable.

### 50. [eleve] secret probable en clair

- **Fichier :** `src/Utils/System/Mail/KeyWord.php`
- **Ligne :** 73
- **Extrait lu :** `private const GLOBAL_URL_CHANGE_PASSWORD = 'global.url_change_psw';`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 51. [eleve] exécution de commande système

- **Fichier :** `src/Service/Installation/InstallationService.php`
- **Ligne :** 262
- **Extrait lu :** `$filesystem = new Filesystem();`
- **À vérifier :** retracer l'origine des arguments ; entrée externe = injection probable.

### 52. [faible] URL en clair (non HTTPS)

- **Fichier :** `config/reference.php`
- **Ligne :** 1506
- **Extrait lu :** `*     proxy_origin?: scalar|Param|null, // Allows to use different origin for asset proxy, eg. http://host.docker.internal:5173 // Default: null`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 53. [faible] URL en clair (non HTTPS)

- **Fichier :** `src/Service/Admin/Content/Page/PageService.php`
- **Ligne :** 92
- **Extrait lu :** `$isLandingPage = '<svg class="float-start w-5 h-5 text-(--success)" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 54. [faible] URL en clair (non HTTPS)

- **Fichier :** `translations/messages+intl-icu.es.yaml`
- **Ligne :** 177
- **Extrait lu :** `options_system.media_url_placeholder: '__URL public au format http://'`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 55. [faible] URL en clair (non HTTPS)

- **Fichier :** `translations/messages+intl-icu.en.yaml`
- **Ligne :** 177
- **Extrait lu :** `options_system.media_url_placeholder: '__URL public au format http://'`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 56. [faible] URL en clair (non HTTPS)

- **Fichier :** `translations/messages+intl-icu.fr.yaml`
- **Ligne :** 177
- **Extrait lu :** `options_system.media_url_placeholder: 'URL public au format http://'`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 57. [faible] URL en clair (non HTTPS)

- **Fichier :** `src/Twig/Extension/Admin/System/OptionExtension.php`
- **Ligne :** 484
- **Extrait lu :** `<svg aria-hidden="true" class="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-[var(--primary)]" viewBox="0 0 100 101" fill="none" xmlns="http`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 58. [faible] URL en clair (non HTTPS)

- **Fichier :** `config/cms/options_system.yaml`
- **Ligne :** 22
- **Extrait lu :** `default: 'http://www.value-must-be-change.com'`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 59. [faible] URL en clair (non HTTPS)

- **Fichier :** `tests/Controller/Admin/Content/MenuControllerTest.php`
- **Ligne :** 230
- **Extrait lu :** `'externalLink' => 'http://www.es.com',`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 60. [faible] URL en clair (non HTTPS)

- **Fichier :** `tests/Controller/Admin/Content/MenuControllerTest.php`
- **Ligne :** 237
- **Extrait lu :** `'externalLink' => 'http://www.en.com',`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 61. [faible] URL en clair (non HTTPS)

- **Fichier :** `tests/Controller/Admin/Content/MenuControllerTest.php`
- **Ligne :** 244
- **Extrait lu :** `'externalLink' => 'http://www.fr.com',`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 62. [faible] URL en clair (non HTTPS)

- **Fichier :** `tests/Controller/Admin/Content/MenuControllerTest.php`
- **Ligne :** 300
- **Extrait lu :** `'externalLink' => 'http://www.es.com',`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 63. [faible] URL en clair (non HTTPS)

- **Fichier :** `tests/Controller/Admin/Content/MenuControllerTest.php`
- **Ligne :** 307
- **Extrait lu :** `'externalLink' => 'http://www.en.com',`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 64. [faible] URL en clair (non HTTPS)

- **Fichier :** `tests/Controller/Admin/Content/MenuControllerTest.php`
- **Ligne :** 314
- **Extrait lu :** `'externalLink' => 'http://www.fr.com',`
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