# Rapport d'audit statique — Avenx-JS/avenx-js

**Date :** 2026-10-10
**Dépôt analysé :** https://github.com/Avenx-JS/avenx-js
**Fichiers lus :** 30
**Généré par :** Automaton DeepSeek — analyse statique par motifs, via l'archive publique du dépôt (aucun code exécuté).

> **Nature de ce document.** Ce sont des **alertes à vérifier**, pas des vulnérabilités confirmées.
> Chaque ligne citée a été lue dans le dépôt à l'adresse indiquée. Un motif peut être légitime
> (exemple, test, code mort). Ce rapport **ne remplace pas** une revue de sécurité humaine,
> un test d'intrusion ni un scan des dépendances. Aucun code n'a été exécuté.

## Synthèse — 82 constat(s)

| Sévérité | Nombre |
|---|---|
| critique | 0 |
| eleve | 51 |
| moyen | 25 |
| faible | 6 |

## Constats

### 1. [eleve] évaluation de code dynamique

- **Fichier :** `lib/compiler/ComponentParser.js`
- **Ligne :** 124
- **Extrait lu :** `while ((match = arrow.exec(code)) !== null) {`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 2. [eleve] évaluation de code dynamique

- **Fichier :** `lib/compiler/ComponentParser.js`
- **Ligne :** 989
- **Extrait lu :** `while ((defMatch = defRegex.exec(inner)) !== null) {`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 3. [eleve] évaluation de code dynamique

- **Fichier :** `lib/compiler/ComponentParser.js`
- **Ligne :** 1336
- **Extrait lu :** `while ((defMatch = defRegex.exec(inner)) !== null) {`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 4. [eleve] évaluation de code dynamique

- **Fichier :** `lib/compiler/ComponentParser.js`
- **Ligne :** 2043
- **Extrait lu :** `while ((match = startRegex.exec(currentTemplate)) !== null) {`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 5. [eleve] évaluation de code dynamique

- **Fichier :** `lib/compiler/ComponentParser.js`
- **Ligne :** 2151
- **Extrait lu :** `while ((slotPropsMatch = slotPropsRegex.exec(template)) !== null) {`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 6. [eleve] évaluation de code dynamique

- **Fichier :** `lib/compiler/ComponentParser.js`
- **Ligne :** 2616
- **Extrait lu :** `while ((match = tagRegex.exec(currentTemplate)) !== null) {`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 7. [eleve] évaluation de code dynamique

- **Fichier :** `lib/compiler.js`
- **Ligne :** 677
- **Extrait lu :** `const match = /\.(component|page)\.js$/.exec(id);`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 8. [eleve] évaluation de code dynamique

- **Fichier :** `lib/compiler.js`
- **Ligne :** 1236
- **Extrait lu :** `while ((match = accessRegex.exec(body)) !== null) {`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 9. [eleve] évaluation de code dynamique

- **Fichier :** `lib/compiler.js`
- **Ligne :** 1473
- **Extrait lu :** `while ((match = importRegex.exec(content)) !== null) {`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 10. [eleve] évaluation de code dynamique

- **Fichier :** `lib/compiler.js`
- **Ligne :** 1493
- **Extrait lu :** `while ((match = tagRegex.exec(content)) !== null) {`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 11. [eleve] exécution de commande avec valeur concaténée

- **Fichier :** `test/system/cli.test.js`
- **Ligne :** 59
- **Extrait lu :** `execSync(\`node ${BIN_PATH} init\`, {`
- **À vérifier :** si une entrée externe atteint cette ligne, il y a injection de commande. Retracer l'origine des arguments.

### 12. [eleve] exécution de commande avec valeur concaténée

- **Fichier :** `test/system/cli.test.js`
- **Ligne :** 100
- **Extrait lu :** `const init1Output = execSync(\`node ${BIN_PATH} init\`, { cwd: TEST_DIR, encoding: 'utf8' });`
- **À vérifier :** si une entrée externe atteint cette ligne, il y a injection de commande. Retracer l'origine des arguments.

### 13. [eleve] exécution de commande avec valeur concaténée

- **Fichier :** `test/system/cli.test.js`
- **Ligne :** 108
- **Extrait lu :** `const init2Output = execSync(\`node ${BIN_PATH} init\`, { cwd: TEST_DIR, encoding: 'utf8' });`
- **À vérifier :** si une entrée externe atteint cette ligne, il y a injection de commande. Retracer l'origine des arguments.

### 14. [eleve] exécution de commande avec valeur concaténée

- **Fichier :** `test/system/cli.test.js`
- **Ligne :** 164
- **Extrait lu :** `const buildOutput = execSync(\`node ${BIN_PATH} build 2>&1\`, {`
- **À vérifier :** si une entrée externe atteint cette ligne, il y a injection de commande. Retracer l'origine des arguments.

### 15. [eleve] exécution de commande avec valeur concaténée

- **Fichier :** `test/system/cli.test.js`
- **Ligne :** 216
- **Extrait lu :** `const customBuildOutput = execSync(\`node ${BIN_PATH} build 2>&1\`, {`
- **À vérifier :** si une entrée externe atteint cette ligne, il y a injection de commande. Retracer l'origine des arguments.

### 16. [eleve] exécution de commande avec valeur concaténée

- **Fichier :** `test/system/cli.test.js`
- **Ligne :** 242
- **Extrait lu :** `execSync(\`node ${BIN_PATH} generate component default-box\`, { cwd: TEST_DIR });`
- **À vérifier :** si une entrée externe atteint cette ligne, il y a injection de commande. Retracer l'origine des arguments.

### 17. [eleve] exécution de commande avec valeur concaténée

- **Fichier :** `test/system/cli.test.js`
- **Ligne :** 311
- **Extrait lu :** `execSync(\`node ${BIN_PATH} generate page force-dashboard\`, { cwd: TEST_DIR });`
- **À vérifier :** si une entrée externe atteint cette ligne, il y a injection de commande. Retracer l'origine des arguments.

### 18. [eleve] exécution de commande avec valeur concaténée

- **Fichier :** `test/system/cli.test.js`
- **Ligne :** 398
- **Extrait lu :** `execSync(\`node ${BIN_PATH} generate bridge force-auth\`, { cwd: TEST_DIR });`
- **À vérifier :** si une entrée externe atteint cette ligne, il y a injection de commande. Retracer l'origine des arguments.

### 19. [eleve] exécution de commande avec valeur concaténée

- **Fichier :** `test/system/cli.test.js`
- **Ligne :** 444
- **Extrait lu :** `execSync(\`node ${BIN_PATH} generate guard force-auth\`, { cwd: TEST_DIR });`
- **À vérifier :** si une entrée externe atteint cette ligne, il y a injection de commande. Retracer l'origine des arguments.

### 20. [eleve] exécution de commande avec valeur concaténée

- **Fichier :** `test/system/cli.test.js`
- **Ligne :** 491
- **Extrait lu :** `execSync(\`node ${BIN_PATH} generate component UserProfile\`, { cwd: TEST_DIR });`
- **À vérifier :** si une entrée externe atteint cette ligne, il y a injection de commande. Retracer l'origine des arguments.

### 21. [eleve] exécution de commande avec valeur concaténée

- **Fichier :** `test/system/cli.test.js`
- **Ligne :** 501
- **Extrait lu :** `execSync(\`node ${BIN_PATH} build\`, { cwd: TEST_DIR });`
- **À vérifier :** si une entrée externe atteint cette ligne, il y a injection de commande. Retracer l'origine des arguments.

### 22. [eleve] exécution de commande avec valeur concaténée

- **Fichier :** `test/system/cli.test.js`
- **Ligne :** 512
- **Extrait lu :** `execSync(\`node ${BIN_PATH} generate component MyButton\`, { cwd: TEST_DIR });`
- **À vérifier :** si une entrée externe atteint cette ligne, il y a injection de commande. Retracer l'origine des arguments.

### 23. [eleve] exécution de commande avec valeur concaténée

- **Fichier :** `test/system/cli.test.js`
- **Ligne :** 529
- **Extrait lu :** `execSync(\`node ${BIN_PATH} g c ShortAliasButton\`, { cwd: TEST_DIR });`
- **À vérifier :** si une entrée externe atteint cette ligne, il y a injection de commande. Retracer l'origine des arguments.

### 24. [eleve] exécution de commande avec valeur concaténée

- **Fichier :** `test/system/cli.test.js`
- **Ligne :** 551
- **Extrait lu :** `execSync(\`node ${BIN_PATH} generate component custom-flat-box\`, { cwd: TEST_DIR });`
- **À vérifier :** si une entrée externe atteint cette ligne, il y a injection de commande. Retracer l'origine des arguments.

### 25. [eleve] exécution de commande avec valeur concaténée

- **Fichier :** `test/system/cli.test.js`
- **Ligne :** 586
- **Extrait lu :** `execSync(\`node ${BIN_PATH} generate component custom-struct-box\`, { cwd: TEST_DIR });`
- **À vérifier :** si une entrée externe atteint cette ligne, il y a injection de commande. Retracer l'origine des arguments.

### 26. [eleve] exécution de commande avec valeur concaténée

- **Fichier :** `test/system/cli.test.js`
- **Ligne :** 655
- **Extrait lu :** `execSync(\`node ${BIN_PATH} generate page UserProfile --template crud\`, { cwd: TEST_DIR });`
- **À vérifier :** si une entrée externe atteint cette ligne, il y a injection de commande. Retracer l'origine des arguments.

### 27. [eleve] exécution de commande avec valeur concaténée

- **Fichier :** `test/system/cli.test.js`
- **Ligne :** 686
- **Extrait lu :** `execSync(\`node ${BIN_PATH} g component Dialog -t modal\`, { cwd: TEST_DIR });`
- **À vérifier :** si une entrée externe atteint cette ligne, il y a injection de commande. Retracer l'origine des arguments.

### 28. [eleve] exécution de commande avec valeur concaténée

- **Fichier :** `test/system/cli.test.js`
- **Ligne :** 708
- **Extrait lu :** `execSync(\`node ${BIN_PATH} generate page Settings --template=crud\`, { cwd: TEST_DIR });`
- **À vérifier :** si une entrée externe atteint cette ligne, il y a injection de commande. Retracer l'origine des arguments.

### 29. [eleve] exécution de commande avec valeur concaténée

- **Fichier :** `test/system/cli.test.js`
- **Ligne :** 726
- **Extrait lu :** `execSync(\`node ${BIN_PATH} generate component sub-box\`, { cwd: srcSubdir });`
- **À vérifier :** si une entrée externe atteint cette ligne, il y a injection de commande. Retracer l'origine des arguments.

### 30. [eleve] exécution de commande avec valeur concaténée

- **Fichier :** `test/system/cli.test.js`
- **Ligne :** 761
- **Extrait lu :** `const cleanOutput = execSync(\`node ${BIN_PATH} clean\`, {`
- **À vérifier :** si une entrée externe atteint cette ligne, il y a injection de commande. Retracer l'origine des arguments.

### 31. [eleve] exécution de commande avec valeur concaténée

- **Fichier :** `test/system/cli.test.js`
- **Ligne :** 771
- **Extrait lu :** `const cleanAgainOutput = execSync(\`node ${BIN_PATH} clean\`, {`
- **À vérifier :** si une entrée externe atteint cette ligne, il y a injection de commande. Retracer l'origine des arguments.

### 32. [eleve] exécution de commande avec valeur concaténée

- **Fichier :** `test/system/cli.test.js`
- **Ligne :** 795
- **Extrait lu :** `const destroyDryRunOutput = execSync(\`node ${BIN_PATH} destroy component default-box --dry-run\`, {`
- **À vérifier :** si une entrée externe atteint cette ligne, il y a injection de commande. Retracer l'origine des arguments.

### 33. [eleve] exécution de commande avec valeur concaténée

- **Fichier :** `test/system/cli.test.js`
- **Ligne :** 805
- **Extrait lu :** `const destroyDryRunShortOutput = execSync(\`node ${BIN_PATH} destroy component default-box -d\`, {`
- **À vérifier :** si une entrée externe atteint cette ligne, il y a injection de commande. Retracer l'origine des arguments.

### 34. [eleve] exécution de commande avec valeur concaténée

- **Fichier :** `test/system/cli.test.js`
- **Ligne :** 817
- **Extrait lu :** `const destroyOutput = execSync(\`node ${BIN_PATH} destroy component default-box\`, {`
- **À vérifier :** si une entrée externe atteint cette ligne, il y a injection de commande. Retracer l'origine des arguments.

### 35. [eleve] exécution de commande avec valeur concaténée

- **Fichier :** `test/system/cli.test.js`
- **Ligne :** 830
- **Extrait lu :** `const destroyNonExistentOutput = execSync(\`node ${BIN_PATH} d component default-box\`, {`
- **À vérifier :** si une entrée externe atteint cette ligne, il y a injection de commande. Retracer l'origine des arguments.

### 36. [eleve] exécution de commande avec valeur concaténée

- **Fichier :** `test/system/cli.test.js`
- **Ligne :** 839
- **Extrait lu :** `execSync(\`node ${BIN_PATH} generate page reports-test\`, { cwd: TEST_DIR });`
- **À vérifier :** si une entrée externe atteint cette ligne, il y a injection de commande. Retracer l'origine des arguments.

### 37. [eleve] exécution de commande avec valeur concaténée

- **Fichier :** `test/system/cli.test.js`
- **Ligne :** 852
- **Extrait lu :** `const pageDestroyOutput = execSync(\`node ${BIN_PATH} d p reports-test\`, {`
- **À vérifier :** si une entrée externe atteint cette ligne, il y a injection de commande. Retracer l'origine des arguments.

### 38. [eleve] exécution de commande avec valeur concaténée

- **Fichier :** `test/system/cli.test.js`
- **Ligne :** 865
- **Extrait lu :** `execSync(\`node ${BIN_PATH} generate bridge auth-test\`, { cwd: TEST_DIR });`
- **À vérifier :** si une entrée externe atteint cette ligne, il y a injection de commande. Retracer l'origine des arguments.

### 39. [eleve] exécution de commande avec valeur concaténée

- **Fichier :** `test/system/cli.test.js`
- **Ligne :** 869
- **Extrait lu :** `const bridgeDestroyOutput = execSync(\`node ${BIN_PATH} d bridge auth-test\`, {`
- **À vérifier :** si une entrée externe atteint cette ligne, il y a injection de commande. Retracer l'origine des arguments.

### 40. [eleve] exécution de commande avec valeur concaténée

- **Fichier :** `test/system/cli.test.js`
- **Ligne :** 878
- **Extrait lu :** `execSync(\`node ${BIN_PATH} generate guard auth-test\`, { cwd: TEST_DIR });`
- **À vérifier :** si une entrée externe atteint cette ligne, il y a injection de commande. Retracer l'origine des arguments.

### 41. [eleve] exécution de commande avec valeur concaténée

- **Fichier :** `test/system/cli.test.js`
- **Ligne :** 886
- **Extrait lu :** `const guardDestroyOutput = execSync(\`node ${BIN_PATH} d guard auth-test\`, {`
- **À vérifier :** si une entrée externe atteint cette ligne, il y a injection de commande. Retracer l'origine des arguments.

### 42. [eleve] exécution de commande avec valeur concaténée

- **Fichier :** `test/system/cli.test.js`
- **Ligne :** 897
- **Extrait lu :** `execSync(\`node ${BIN_PATH} generate component unused-inspect-btn\`, { cwd: TEST_DIR });`
- **À vérifier :** si une entrée externe atteint cette ligne, il y a injection de commande. Retracer l'origine des arguments.

### 43. [eleve] exécution de commande avec valeur concaténée

- **Fichier :** `test/system/cli.test.js`
- **Ligne :** 920
- **Extrait lu :** `execSync(\`node ${BIN_PATH} generate bridge inspect-auth\`, { cwd: TEST_DIR });`
- **À vérifier :** si une entrée externe atteint cette ligne, il y a injection de commande. Retracer l'origine des arguments.

### 44. [eleve] exécution de commande avec valeur concaténée

- **Fichier :** `test/system/cli.test.js`
- **Ligne :** 922
- **Extrait lu :** `const inspectOutput = execSync(\`node ${BIN_PATH} inspect\`, { cwd: TEST_DIR, encoding: 'utf8' });`
- **À vérifier :** si une entrée externe atteint cette ligne, il y a injection de commande. Retracer l'origine des arguments.

### 45. [eleve] exécution de commande avec valeur concaténée

- **Fichier :** `test/system/cli.test.js`
- **Ligne :** 933
- **Extrait lu :** `const inspectAliasOutput = execSync(\`node ${BIN_PATH} i\`, { cwd: TEST_DIR, encoding: 'utf8' });`
- **À vérifier :** si une entrée externe atteint cette ligne, il y a injection de commande. Retracer l'origine des arguments.

### 46. [eleve] évaluation de code dynamique (eval / new Function)

- **Fichier :** `test/unit/bridgeCompiler.test.js`
- **Ligne :** 797
- **Extrait lu :** `new Function(bundle)();`
- **À vérifier :** vérifier si la chaîne évaluée peut provenir d'une entrée externe.

### 47. [eleve] évaluation de code dynamique (eval / new Function)

- **Fichier :** `lib/core/expression/parser.js`
- **Ligne :** 10
- **Extrait lu :** `* new Function(\`with(this) { return (${expression}) }\`)`
- **À vérifier :** vérifier si la chaîne évaluée peut provenir d'une entrée externe.

### 48. [eleve] évaluation de code dynamique

- **Fichier :** `lib/compiler/atlas/build.js`
- **Ligne :** 322
- **Extrait lu :** `while ((emitMatch = emitRegex.exec(body)) !== null) {`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 49. [eleve] évaluation de code dynamique

- **Fichier :** `lib/compiler/atlas/build.js`
- **Ligne :** 572
- **Extrait lu :** `while ((slotMatch = slotPropsRegex.exec(masked)) !== null) {`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 50. [eleve] évaluation de code dynamique

- **Fichier :** `lib/compiler/atlas/build.js`
- **Ligne :** 696
- **Extrait lu :** `while ((match = tagRegex.exec(masked)) !== null) {`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 51. [eleve] évaluation de code dynamique

- **Fichier :** `lib/compiler/ir/build.js`
- **Ligne :** 101
- **Extrait lu :** `while ((match = regex.exec(source)) !== null) {`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 52. [moyen] injection HTML potentielle

- **Fichier :** `lib/core/runtime/AvenxComponent.js`
- **Ligne :** 1339
- **Extrait lu :** `this.#element.innerHTML = '';`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 53. [moyen] injection HTML potentielle

- **Fichier :** `lib/core/runtime/AvenxComponent.js`
- **Ligne :** 1657
- **Extrait lu :** `target.innerHTML = '';`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 54. [moyen] injection HTML potentielle

- **Fichier :** `lib/core/runtime/AvenxComponent.js`
- **Ligne :** 1754
- **Extrait lu :** `slotEl.innerHTML = '';`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 55. [moyen] injection HTML potentielle

- **Fichier :** `lib/core/runtime/AvenxComponent.js`
- **Ligne :** 1783
- **Extrait lu :** `slotEl.innerHTML = '';`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 56. [moyen] injection HTML potentielle

- **Fichier :** `lib/core/runtime/AvenxComponent.js`
- **Ligne :** 2179
- **Extrait lu :** `this.#element.innerHTML = '';`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 57. [moyen] requête SQL construite par concaténation

- **Fichier :** `lib/compiler/StyleProcessor.js`
- **Ligne :** 1064
- **Extrait lu :** `.update(cssContent + componentName)`
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 58. [moyen] injection HTML potentielle

- **Fichier :** `lib/core/renderer/domPatch.js`
- **Ligne :** 715
- **Extrait lu :** `el.innerHTML = resolvedHtml;`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 59. [moyen] injection HTML potentielle

- **Fichier :** `bin/commands/serve.js`
- **Ligne :** 666
- **Extrait lu :** `routingList.innerHTML = '';`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 60. [moyen] injection HTML potentielle

- **Fichier :** `bin/commands/serve.js`
- **Ligne :** 672
- **Extrait lu :** `item.innerHTML = \\``
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 61. [moyen] injection HTML potentielle

- **Fichier :** `bin/commands/serve.js`
- **Ligne :** 681
- **Extrait lu :** `routingList.innerHTML = '<div class="text-muted" style="font-size:0.85rem;color:var(--text-muted);">No routes configured.</div>';`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 62. [moyen] injection HTML potentielle

- **Fichier :** `bin/commands/serve.js`
- **Ligne :** 687
- **Extrait lu :** `currentRouteInfo.innerHTML = \\``
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 63. [moyen] injection HTML potentielle

- **Fichier :** `bin/commands/serve.js`
- **Ligne :** 694
- **Extrait lu :** `currentRouteInfo.innerHTML = '<div style="color:var(--text-muted);">None (App not routing or on initial load)</div>';`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 64. [moyen] injection HTML potentielle

- **Fichier :** `bin/commands/serve.js`
- **Ligne :** 699
- **Extrait lu :** `componentsList.innerHTML = '';`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 65. [moyen] injection HTML potentielle

- **Fichier :** `bin/commands/serve.js`
- **Ligne :** 704
- **Extrait lu :** `item.innerHTML = \\``
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 66. [moyen] injection HTML potentielle

- **Fichier :** `bin/commands/serve.js`
- **Ligne :** 718
- **Extrait lu :** `componentsList.innerHTML = '<div class="text-muted" style="font-size:0.85rem;color:var(--text-muted);">No active components in DOM.</div>';`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 67. [moyen] injection HTML potentielle

- **Fichier :** `bin/commands/serve.js`
- **Ligne :** 723
- **Extrait lu :** `bridgesList.innerHTML = '';`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 68. [moyen] injection HTML potentielle

- **Fichier :** `bin/commands/serve.js`
- **Ligne :** 728
- **Extrait lu :** `item.innerHTML = \\``
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 69. [moyen] injection HTML potentielle

- **Fichier :** `bin/commands/serve.js`
- **Ligne :** 737
- **Extrait lu :** `bridgesList.innerHTML = '<div class="text-muted" style="font-size:0.85rem;color:var(--text-muted);">No bridges registered.</div>';`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 70. [moyen] injection HTML potentielle

- **Fichier :** `test/unit/bridge.test.js`
- **Ligne :** 908
- **Extrait lu :** `document.body.innerHTML = '<div id="registration-root"></div>';`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 71. [moyen] injection HTML potentielle

- **Fichier :** `test/unit/bridge.test.js`
- **Ligne :** 1026
- **Extrait lu :** `document.body.innerHTML = '<div id="no-class-root"></div>';`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 72. [moyen] injection HTML potentielle

- **Fichier :** `lib/core/runtime/AvenxMock.js`
- **Ligne :** 570
- **Extrait lu :** `target.innerHTML = slots;`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 73. [moyen] injection HTML potentielle

- **Fichier :** `lib/core/runtime/AvenxMock.js`
- **Ligne :** 591
- **Extrait lu :** `div.innerHTML = content;`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 74. [moyen] injection HTML potentielle

- **Fichier :** `test/unit/bridgeCompiler.test.js`
- **Ligne :** 796
- **Extrait lu :** `document.body.innerHTML = '<div id="app"></div><div id="bundle-root"></div>';`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 75. [moyen] injection HTML potentielle

- **Fichier :** `lib/core/runtime/AvenxApp.js`
- **Ligne :** 592
- **Extrait lu :** `mountTarget.innerHTML = '';`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 76. [moyen] injection HTML potentielle

- **Fichier :** `lib/core/runtime/AvenxApp.js`
- **Ligne :** 648
- **Extrait lu :** `wrapper.innerHTML = '';`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 77. [faible] URL en clair (non HTTPS)

- **Fichier :** `lib/core/renderer/domPatch.js`
- **Ligne :** 339
- **Extrait lu :** `(oldNode.namespaceURI === 'http://www.w3.org/2000/svg' || oldNode.tagName.toLowerCase() === 'svg');`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 78. [faible] URL en clair (non HTTPS)

- **Fichier :** `lib/core/renderer/domPatch.js`
- **Ligne :** 368
- **Extrait lu :** `(oldNode.namespaceURI === 'http://www.w3.org/2000/svg' || oldNode.tagName.toLowerCase() === 'svg');`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 79. [faible] URL en clair (non HTTPS)

- **Fichier :** `lib/core/renderer/domPatch.js`
- **Ligne :** 619
- **Extrait lu :** `if (node.namespaceURI === 'http://www.w3.org/2000/svg') {`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 80. [faible] URL en clair (non HTTPS)

- **Fichier :** `lib/core/renderer/domPatch.js`
- **Ligne :** 629
- **Extrait lu :** `const svgElement = document.createElementNS('http://www.w3.org/2000/svg', tagName);`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 81. [faible] URL en clair (non HTTPS)

- **Fichier :** `bin/commands/serve.js`
- **Ligne :** 1068
- **Extrait lu :** `const url = \`http://${host}:${activePort}\`;`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 82. [faible] URL en clair (non HTTPS)

- **Fichier :** `test/unit/renderPathParity.test.js`
- **Ligne :** 289
- **Extrait lu :** `'http://www.w3.org/2000/svg',`
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