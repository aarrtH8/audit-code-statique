# Rapport d'audit statique — OthmaneBlial/Regex-For-Humans

**Date :** 2026-10-10
**Dépôt analysé :** https://github.com/OthmaneBlial/Regex-For-Humans
**Fichiers lus :** 30
**Généré par :** Automaton DeepSeek — analyse statique par motifs, via l'archive publique du dépôt (aucun code exécuté).

> **Nature de ce document.** Ce sont des **alertes à vérifier**, pas des vulnérabilités confirmées.
> Chaque ligne citée a été lue dans le dépôt à l'adresse indiquée. Un motif peut être légitime
> (exemple, test, code mort). Ce rapport **ne remplace pas** une revue de sécurité humaine,
> un test d'intrusion ni un scan des dépendances. Aucun code n'a été exécuté.

## Synthèse — 130 constat(s)

| Sévérité | Nombre |
|---|---|
| critique | 0 |
| eleve | 129 |
| moyen | 0 |
| faible | 1 |

## Constats

### 1. [eleve] exécution de commande avec valeur concaténée

- **Fichier :** `test/browser/workshop.spec.js`
- **Ligne :** 295
- **Extrait lu :** `positive: rebuilt.exec("\n😀ab\n")?.[0],`
- **À vérifier :** si une entrée externe atteint cette ligne, il y a injection de commande. Retracer l'origine des arguments.

### 2. [eleve] évaluation de code dynamique

- **Fichier :** `test/browser/workshop.spec.js`
- **Ligne :** 295
- **Extrait lu :** `positive: rebuilt.exec("\n😀ab\n")?.[0],`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 3. [eleve] évaluation de code dynamique

- **Fichier :** `test/cli.test.js`
- **Ligne :** 117
- **Extrait lu :** `new RegExp(compiled.source, compiled.flags).exec(input),`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 4. [eleve] évaluation de code dynamique

- **Fichier :** `test/cli.test.js`
- **Ligne :** 118
- **Extrait lu :** `native.exec(input),`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 5. [eleve] évaluation de code dynamique

- **Fichier :** `test/cli.test.js`
- **Ligne :** 925
- **Extrait lu :** `assert.deepEqual(rebuilt.exec(sample), regex.exec(sample));`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 6. [eleve] évaluation de code dynamique

- **Fichier :** `test/cli.test.js`
- **Ligne :** 959
- **Extrait lu :** `rebuilt.exec(text),`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 7. [eleve] évaluation de code dynamique

- **Fichier :** `test/cli.test.js`
- **Ligne :** 960
- **Extrait lu :** `regex.exec(text),`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 8. [eleve] évaluation de code dynamique

- **Fichier :** `scripts/verify-package.js`
- **Ligne :** 51
- **Extrait lu :** `const libraryExample = /## 📦 Use the JavaScript library[\s\S]*?\`\`\`js\n([\s\S]*?)\n\`\`\`/u.exec(`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 9. [eleve] évaluation de code dynamique

- **Fichier :** `scripts/verify-package.js`
- **Ligne :** 125
- **Extrait lu :** `assert.deepEqual(rebuilt.exec(input), original.exec(input));`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 10. [eleve] exécution de commande avec valeur concaténée

- **Fichier :** `scripts/verify-package.js`
- **Ligne :** 133
- **Extrait lu :** `const assertedMatch = new RegExp(asserted.source, "du").exec("USD123");`
- **À vérifier :** si une entrée externe atteint cette ligne, il y a injection de commande. Retracer l'origine des arguments.

### 11. [eleve] évaluation de code dynamique

- **Fichier :** `scripts/verify-package.js`
- **Ligne :** 133
- **Extrait lu :** `const assertedMatch = new RegExp(asserted.source, "du").exec("USD123");`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 12. [eleve] évaluation de code dynamique

- **Fichier :** `scripts/verify-package.js`
- **Ligne :** 143
- **Extrait lu :** `for (const sample of ["", "USD123", "123", "abc", "b", "a", "😀"]) assert.deepEqual(rebuilt.exec(sample), original.exec(sample));`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 13. [eleve] exécution de commande avec valeur concaténée

- **Fichier :** `scripts/verify-package.js`
- **Ligne :** 156
- **Extrait lu :** `assert.equal(toRegExp(propertyResult).exec("😀اردو")[0], "اردو");`
- **À vérifier :** si une entrée externe atteint cette ligne, il y a injection de commande. Retracer l'origine des arguments.

### 14. [eleve] évaluation de code dynamique

- **Fichier :** `scripts/verify-package.js`
- **Ligne :** 156
- **Extrait lu :** `assert.equal(toRegExp(propertyResult).exec("😀اردو")[0], "اردو");`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 15. [eleve] exécution de commande avec valeur concaténée

- **Fichier :** `scripts/verify-package.js`
- **Ligne :** 164
- **Extrait lu :** `assert.equal(toRegExp(classResult).exec("😀e\\u0301 اردو")[0], "e\\u0301");`
- **À vérifier :** si une entrée externe atteint cette ligne, il y a injection de commande. Retracer l'origine des arguments.

### 16. [eleve] évaluation de code dynamique

- **Fichier :** `scripts/verify-package.js`
- **Ligne :** 164
- **Extrait lu :** `assert.equal(toRegExp(classResult).exec("😀e\\u0301 اردو")[0], "e\\u0301");`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 17. [eleve] exécution de commande avec valeur concaténée

- **Fichier :** `scripts/verify-package.js`
- **Ligne :** 168
- **Extrait lu :** `if (toRegExp(lazyForward).exec("1234")?.[0] !== "1" || lazyForward.segments[0].repetition?.lazy !== true) throw new Error("Installed lazy compilation changed it`
- **À vérifier :** si une entrée externe atteint cette ligne, il y a injection de commande. Retracer l'origine des arguments.

### 18. [eleve] évaluation de code dynamique

- **Fichier :** `scripts/verify-package.js`
- **Ligne :** 168
- **Extrait lu :** `if (toRegExp(lazyForward).exec("1234")?.[0] !== "1" || lazyForward.segments[0].repetition?.lazy !== true) throw new Error("Installed lazy compilation changed it`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 19. [eleve] évaluation de code dynamique

- **Fichier :** `scripts/verify-package.js`
- **Ligne :** 174
- **Extrait lu :** `for (const sample of ["", "1234", "aa", "ABAB", "😀"]) assert.deepEqual(rebuilt.exec(sample), original.exec(sample));`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 20. [eleve] exécution de commande avec valeur concaténée

- **Fichier :** `scripts/verify-package.js`
- **Ligne :** 178
- **Extrait lu :** `const captured = toRegExp(grouped).exec("2026");`
- **À vérifier :** si une entrée externe atteint cette ligne, il y a injection de commande. Retracer l'origine des arguments.

### 21. [eleve] évaluation de code dynamique

- **Fichier :** `scripts/verify-package.js`
- **Ligne :** 178
- **Extrait lu :** `const captured = toRegExp(grouped).exec("2026");`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 22. [eleve] évaluation de code dynamique

- **Fichier :** `scripts/verify-package.js`
- **Ligne :** 209
- **Extrait lu :** `const expected = original.exec(sample), actual = rebuilt.exec(sample);`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 23. [eleve] évaluation de code dynamique

- **Fichier :** `scripts/verify-package.js`
- **Ligne :** 240
- **Extrait lu :** `for (const text of ["", "a", "b", "ab", "😀a"]) assert.deepEqual(rebuilt.exec(text), original.exec(text));`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 24. [eleve] exécution de commande avec valeur concaténée

- **Fichier :** `scripts/verify-package.js`
- **Ligne :** 251
- **Extrait lu :** `if (emptyGroup.rules !== "0 any character" || emptyGroup.flags !== "" || emptyGroupPattern.source !== ".{0}" || emptyGroupPattern.exec("😀text")?.[0] !== "" || `
- **À vérifier :** si une entrée externe atteint cette ligne, il y a injection de commande. Retracer l'origine des arguments.

### 25. [eleve] évaluation de code dynamique

- **Fichier :** `scripts/verify-package.js`
- **Ligne :** 251
- **Extrait lu :** `if (emptyGroup.rules !== "0 any character" || emptyGroup.flags !== "" || emptyGroupPattern.source !== ".{0}" || emptyGroupPattern.exec("😀text")?.[0] !== "" || `
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 26. [eleve] exécution de commande avec valeur concaténée

- **Fichier :** `scripts/verify-package.js`
- **Ligne :** 266
- **Extrait lu :** `if (mixedAnchor.flags !== "mu" || toRegExp(mixedAnchor).exec("\\nA")?.index !== 0 || toRegExp(mixedAnchor).test("A\\n")) throw new Error("Mixed anchors lost the`
- **À vérifier :** si une entrée externe atteint cette ligne, il y a injection de commande. Retracer l'origine des arguments.

### 27. [eleve] évaluation de code dynamique

- **Fichier :** `scripts/verify-package.js`
- **Ligne :** 266
- **Extrait lu :** `if (mixedAnchor.flags !== "mu" || toRegExp(mixedAnchor).exec("\\nA")?.index !== 0 || toRegExp(mixedAnchor).test("A\\n")) throw new Error("Mixed anchors lost the`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 28. [eleve] évaluation de code dynamique

- **Fichier :** `scripts/verify-package.js`
- **Ligne :** 289
- **Extrait lu :** `const expected = original.exec(sample);`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 29. [eleve] évaluation de code dynamique

- **Fichier :** `scripts/verify-package.js`
- **Ligne :** 290
- **Extrait lu :** `const actual = rebuilt.exec(sample);`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 30. [eleve] évaluation de code dynamique

- **Fichier :** `scripts/verify-package.js`
- **Ligne :** 297
- **Extrait lu :** `for (const input of ["A_7", "a.b", "é", "😀", "_"]) assert.deepEqual(extendedWordRegex.exec(input), /^[A-Za-z0-9_.]+$/u.exec(input));`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 31. [eleve] évaluation de code dynamique

- **Fichier :** `scripts/verify-package.js`
- **Ligne :** 516
- **Extrait lu :** `/^printf '%s\\n' '([^']+)' \| npx --yes --package=regex-for-humans@preview regex-for-humans --reverse$/mu.exec(`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 32. [eleve] exécution de commande avec valeur concaténée

- **Fichier :** `test/compiler.test.js`
- **Ligne :** 249
- **Extrait lu :** `assert.equal(toRegExp(compile("between 2 and 4 digits")).exec("12345")[0], "1234");`
- **À vérifier :** si une entrée externe atteint cette ligne, il y a injection de commande. Retracer l'origine des arguments.

### 33. [eleve] évaluation de code dynamique

- **Fichier :** `test/compiler.test.js`
- **Ligne :** 249
- **Extrait lu :** `assert.equal(toRegExp(compile("between 2 and 4 digits")).exec("12345")[0], "1234");`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 34. [eleve] évaluation de code dynamique

- **Fichier :** `src/parser.js`
- **Ligne :** 215
- **Extrait lu :** `const lazy = /^lazy(?:\s+|$)/iu.exec(text);`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 35. [eleve] évaluation de code dynamique

- **Fichier :** `src/parser.js`
- **Ligne :** 248
- **Extrait lu :** `const optional = OPTIONAL_PREFIX.exec(remaining);`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 36. [eleve] évaluation de code dynamique

- **Fichier :** `src/parser.js`
- **Ligne :** 249
- **Extrait lu :** `const sequence = SEQUENCE_PREFIX.exec(remaining);`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 37. [eleve] évaluation de code dynamique

- **Fichier :** `src/parser.js`
- **Ligne :** 250
- **Extrait lu :** `const atLeast = AT_LEAST_PREFIX.exec(remaining);`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 38. [eleve] évaluation de code dynamique

- **Fichier :** `src/parser.js`
- **Ligne :** 251
- **Extrait lu :** `const count = COUNT_PREFIX.exec(remaining);`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 39. [eleve] évaluation de code dynamique

- **Fichier :** `src/parser.js`
- **Ligne :** 252
- **Extrait lu :** `const range = /^(between\s+)(\S+)(\s+and\s+)(\S+)\s+/iu.exec(remaining);`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 40. [eleve] évaluation de code dynamique

- **Fichier :** `src/parser.js`
- **Ligne :** 374
- **Extrait lu :** `const boundary = /^(not\s+)?word\s+boundary$/iu.exec(remaining);`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 41. [eleve] évaluation de code dynamique

- **Fichier :** `src/parser.js`
- **Ligne :** 392
- **Extrait lu :** `const assertion = /^(not\s+)?(followed\s+by|preceded\s+by)(?=\s|\{|$)\s*/iu.exec(remaining);`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 42. [eleve] évaluation de code dynamique

- **Fichier :** `src/parser.js`
- **Ligne :** 420
- **Extrait lu :** `const group = /^(group|capture|either)(?=\s|\{|$)\s*/iu.exec(remaining);`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 43. [eleve] évaluation de code dynamique

- **Fichier :** `src/parser.js`
- **Ligne :** 471
- **Extrait lu :** `const backreference = /^same as capture(?:\s+|$)/iu.exec(remaining);`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 44. [eleve] évaluation de code dynamique

- **Fichier :** `src/parser.js`
- **Ligne :** 510
- **Extrait lu :** `const classPrefix = /^(not\s+)?character\s+class:\s*/iu.exec(remaining);`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 45. [eleve] évaluation de code dynamique

- **Fichier :** `src/parser.js`
- **Ligne :** 534
- **Extrait lu :** `const rangePrefix = /^range(?:\s+|$)/iu.exec(remaining);`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 46. [eleve] évaluation de code dynamique

- **Fichier :** `src/parser.js`
- **Ligne :** 542
- **Extrait lu :** `const separator = /^\s+to\s+/iu.exec(tail);`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 47. [eleve] évaluation de code dynamique

- **Fichier :** `src/parser.js`
- **Ligne :** 596
- **Extrait lu :** `const property = /^(not\s+)?unicode\s+property(?:\s+|$)/iu.exec(remaining);`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 48. [eleve] évaluation de code dynamique

- **Fichier :** `src/parser.js`
- **Ligne :** 639
- **Extrait lu :** `const textWithout = /^text without:\s*/i.exec(remaining);`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 49. [eleve] évaluation de code dynamique

- **Fichier :** `src/parser.js`
- **Ligne :** 710
- **Extrait lu :** `const listPrefix = /^(one of:|none of:)\s*/i.exec(remaining);`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 50. [eleve] évaluation de code dynamique

- **Fichier :** `src/parser.js`
- **Ligne :** 877
- **Extrait lu :** `const start = START_ANCHOR.exec(text);`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 51. [eleve] évaluation de code dynamique

- **Fichier :** `src/parser.js`
- **Ligne :** 897
- **Extrait lu :** `const end = /^(line end|end)$/i.exec(text);`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 52. [eleve] évaluation de code dynamique

- **Fichier :** `test/regex-to-rules.test.js`
- **Ligne :** 53
- **Extrait lu :** `const expected = original.exec(sample);`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 53. [eleve] évaluation de code dynamique

- **Fichier :** `test/regex-to-rules.test.js`
- **Ligne :** 54
- **Extrait lu :** `const actual = rebuilt.exec(sample);`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 54. [eleve] évaluation de code dynamique

- **Fichier :** `test/regex-to-rules.test.js`
- **Ligne :** 149
- **Extrait lu :** `assert.deepEqual(rebuilt.exec(sample), expected.exec(sample));`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 55. [eleve] évaluation de code dynamique

- **Fichier :** `test/regex-to-rules.test.js`
- **Ligne :** 275
- **Extrait lu :** `const expected = regex.exec(sample);`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 56. [eleve] évaluation de code dynamique

- **Fichier :** `test/regex-to-rules.test.js`
- **Ligne :** 276
- **Extrait lu :** `const actual = pattern.exec(sample);`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 57. [eleve] évaluation de code dynamique

- **Fichier :** `test/regex-to-rules.test.js`
- **Ligne :** 337
- **Extrait lu :** `rebuilt.exec(candidate),`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 58. [eleve] évaluation de code dynamique

- **Fichier :** `test/regex-to-rules.test.js`
- **Ligne :** 338
- **Extrait lu :** `regex.exec(candidate),`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 59. [eleve] évaluation de code dynamique

- **Fichier :** `test/regex-to-rules.test.js`
- **Ligne :** 349
- **Extrait lu :** `assert.deepEqual(rebuilt.exec(input), regex.exec(input));`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 60. [eleve] évaluation de code dynamique

- **Fichier :** `test/regex-to-rules.test.js`
- **Ligne :** 394
- **Extrait lu :** `rebuilt.exec(candidate),`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 61. [eleve] évaluation de code dynamique

- **Fichier :** `test/regex-to-rules.test.js`
- **Ligne :** 395
- **Extrait lu :** `regex.exec(candidate),`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 62. [eleve] évaluation de code dynamique

- **Fichier :** `test/regex-to-rules.test.js`
- **Ligne :** 408
- **Extrait lu :** `assert.deepEqual(rebuilt.exec(input), regex.exec(input));`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 63. [eleve] évaluation de code dynamique

- **Fichier :** `test/regex-to-rules.test.js`
- **Ligne :** 452
- **Extrait lu :** `assert.deepEqual(rebuilt.exec(sample), original.exec(sample), String(original));`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 64. [eleve] évaluation de code dynamique

- **Fichier :** `test/regex-to-rules.test.js`
- **Ligne :** 494
- **Extrait lu :** `rebuilt.exec(candidate),`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 65. [eleve] évaluation de code dynamique

- **Fichier :** `test/regex-to-rules.test.js`
- **Ligne :** 495
- **Extrait lu :** `regex.exec(candidate),`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 66. [eleve] évaluation de code dynamique

- **Fichier :** `test/regex-to-rules.test.js`
- **Ligne :** 521
- **Extrait lu :** `const expected = regex.exec(sample);`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 67. [eleve] évaluation de code dynamique

- **Fichier :** `test/regex-to-rules.test.js`
- **Ligne :** 522
- **Extrait lu :** `const actual = rebuilt.exec(sample);`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 68. [eleve] évaluation de code dynamique

- **Fichier :** `test/regex-to-rules.test.js`
- **Ligne :** 561
- **Extrait lu :** `rebuilt.exec(sample),`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 69. [eleve] évaluation de code dynamique

- **Fichier :** `test/regex-to-rules.test.js`
- **Ligne :** 562
- **Extrait lu :** `original.exec(sample),`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 70. [eleve] évaluation de code dynamique

- **Fichier :** `test/regex-to-rules.test.js`
- **Ligne :** 591
- **Extrait lu :** `assert.deepEqual(rebuilt.exec(value), original.exec(value));`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 71. [eleve] évaluation de code dynamique

- **Fichier :** `test/regex-to-rules.test.js`
- **Ligne :** 622
- **Extrait lu :** `assert.equal(toRegExp(compile(translated.rules)).exec(value)?.[0], value);`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 72. [eleve] évaluation de code dynamique

- **Fichier :** `test/regex-to-rules.test.js`
- **Ligne :** 666
- **Extrait lu :** `rebuilt.exec(text),`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 73. [eleve] évaluation de code dynamique

- **Fichier :** `test/regex-to-rules.test.js`
- **Ligne :** 667
- **Extrait lu :** `regex.exec(text),`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 74. [eleve] évaluation de code dynamique

- **Fichier :** `test/regex-to-rules.test.js`
- **Ligne :** 676
- **Extrait lu :** `rebuilt.exec(sample),`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 75. [eleve] évaluation de code dynamique

- **Fichier :** `test/regex-to-rules.test.js`
- **Ligne :** 677
- **Extrait lu :** `regex.exec(sample),`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 76. [eleve] évaluation de code dynamique

- **Fichier :** `test/regex-to-rules.test.js`
- **Ligne :** 728
- **Extrait lu :** `assert.deepEqual(rebuilt.exec(sample), regex.exec(sample));`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 77. [eleve] évaluation de code dynamique

- **Fichier :** `test/regex-to-rules.test.js`
- **Ligne :** 735
- **Extrait lu :** `assert.deepEqual(rebuilt.exec(value), regex.exec(value));`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 78. [eleve] évaluation de code dynamique

- **Fichier :** `src/regex-to-rules.js`
- **Ligne :** 120
- **Extrait lu :** `const low = /^\\u([dD][c-fC-F][0-9a-fA-F]{2})$/u.exec(source.slice(index + 6, index + 12));`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 79. [eleve] évaluation de code dynamique

- **Fichier :** `src/regex-to-rules.js`
- **Ligne :** 301
- **Extrait lu :** `const assertion = /^\(\?(<)?([=!])/u.exec(source.slice(start));`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 80. [eleve] évaluation de code dynamique

- **Fichier :** `src/regex-to-rules.js`
- **Ligne :** 365
- **Extrait lu :** `const match = /^\{([0-9]+)(?:,([0-9]*))?\}/u.exec(source.slice(index));`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 81. [eleve] exécution de commande avec valeur concaténée

- **Fichier :** `test/unicode-properties.test.js`
- **Ligne :** 64
- **Extrait lu :** `toRegExp(compile('2 unicode property "Emoji_Presentation"')).exec("😀😀")[0].length,`
- **À vérifier :** si une entrée externe atteint cette ligne, il y a injection de commande. Retracer l'origine des arguments.

### 82. [eleve] évaluation de code dynamique

- **Fichier :** `test/unicode-properties.test.js`
- **Ligne :** 64
- **Extrait lu :** `toRegExp(compile('2 unicode property "Emoji_Presentation"')).exec("😀😀")[0].length,`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 83. [eleve] évaluation de code dynamique

- **Fichier :** `test/unicode-properties.test.js`
- **Ligne :** 178
- **Extrait lu :** `after.exec(input),`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 84. [eleve] évaluation de code dynamique

- **Fichier :** `test/unicode-properties.test.js`
- **Ligne :** 179
- **Extrait lu :** `before.exec(input),`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 85. [eleve] évaluation de code dynamique

- **Fichier :** `test/unicode-properties.test.js`
- **Ligne :** 252
- **Extrait lu :** `assert.deepEqual(rebuilt.exec(input), original.exec(input));`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 86. [eleve] évaluation de code dynamique

- **Fichier :** `test/browser/advanced-flags.spec.js`
- **Ligne :** 35
- **Extrait lu :** `JSON.stringify(snapshot(after.exec(input))) !==`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 87. [eleve] évaluation de code dynamique

- **Fichier :** `test/browser/advanced-flags.spec.js`
- **Ligne :** 36
- **Extrait lu :** `JSON.stringify(snapshot(before.exec(input))) ||`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 88. [eleve] évaluation de code dynamique

- **Fichier :** `test/browser/advanced-flags.spec.js`
- **Ligne :** 70
- **Extrait lu :** `).exec(text);`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 89. [eleve] évaluation de code dynamique

- **Fichier :** `test/browser/advanced-flags.spec.js`
- **Ligne :** 88
- **Extrait lu :** `let match = native.exec(sample.text);`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 90. [eleve] évaluation de code dynamique

- **Fichier :** `test/browser/advanced-flags.spec.js`
- **Ligne :** 105
- **Extrait lu :** `match = native.exec(sample.text);`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 91. [eleve] évaluation de code dynamique

- **Fichier :** `test/browser/advanced-flags.spec.js`
- **Ligne :** 144
- **Extrait lu :** `const before = native.exec(input);`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 92. [eleve] évaluation de code dynamique

- **Fichier :** `test/browser/advanced-flags.spec.js`
- **Ligne :** 145
- **Extrait lu :** `const after = result.exec(input);`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 93. [eleve] évaluation de code dynamique

- **Fichier :** `test/browser/advanced-flags.spec.js`
- **Ligne :** 146
- **Extrait lu :** `const reverse = rebuilt.exec(input);`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 94. [eleve] évaluation de code dynamique

- **Fichier :** `test/word-character.test.js`
- **Ligne :** 70
- **Extrait lu :** `rebuilt.exec(sample),`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 95. [eleve] évaluation de code dynamique

- **Fichier :** `test/word-character.test.js`
- **Ligne :** 71
- **Extrait lu :** `native.exec(sample),`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 96. [eleve] évaluation de code dynamique

- **Fichier :** `test/word-character.test.js`
- **Ligne :** 169
- **Extrait lu :** `rebuilt.exec(sample),`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 97. [eleve] évaluation de code dynamique

- **Fichier :** `test/word-character.test.js`
- **Ligne :** 170
- **Extrait lu :** `original.exec(sample),`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 98. [eleve] évaluation de code dynamique

- **Fichier :** `test/word-character.test.js`
- **Ligne :** 194
- **Extrait lu :** `assert.deepEqual(rebuilt.exec(input), original.exec(input));`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 99. [eleve] évaluation de code dynamique

- **Fichier :** `test/word-character.test.js`
- **Ligne :** 225
- **Extrait lu :** `assert.deepEqual(rebuilt.exec(sample), original.exec(sample));`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 100. [eleve] évaluation de code dynamique

- **Fichier :** `test/assertions.test.js`
- **Ligne :** 33
- **Extrait lu :** `const match = toRegExp(result).exec(input);`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 101. [eleve] exécution de commande avec valeur concaténée

- **Fichier :** `test/assertions.test.js`
- **Ligne :** 60
- **Extrait lu :** `const behind = new RegExp(before.source, "du").exec("USD123");`
- **À vérifier :** si une entrée externe atteint cette ligne, il y a injection de commande. Retracer l'origine des arguments.

### 102. [eleve] évaluation de code dynamique

- **Fichier :** `test/assertions.test.js`
- **Ligne :** 60
- **Extrait lu :** `const behind = new RegExp(before.source, "du").exec("USD123");`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 103. [eleve] exécution de commande avec valeur concaténée

- **Fichier :** `test/assertions.test.js`
- **Ligne :** 71
- **Extrait lu :** `const ahead = new RegExp(after.source, "du").exec("USD123");`
- **À vérifier :** si une entrée externe atteint cette ligne, il y a injection de commande. Retracer l'origine des arguments.

### 104. [eleve] évaluation de code dynamique

- **Fichier :** `test/assertions.test.js`
- **Ligne :** 71
- **Extrait lu :** `const ahead = new RegExp(after.source, "du").exec("USD123");`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 105. [eleve] exécution de commande avec valeur concaténée

- **Fichier :** `test/assertions.test.js`
- **Ligne :** 83
- **Extrait lu :** `assert.equal(toRegExp(absent).exec("a").groups.forbidden, undefined);`
- **À vérifier :** si une entrée externe atteint cette ligne, il y a injection de commande. Retracer l'origine des arguments.

### 106. [eleve] évaluation de code dynamique

- **Fichier :** `test/assertions.test.js`
- **Ligne :** 83
- **Extrait lu :** `assert.equal(toRegExp(absent).exec("a").groups.forbidden, undefined);`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 107. [eleve] exécution de commande avec valeur concaténée

- **Fichier :** `test/assertions.test.js`
- **Ligne :** 86
- **Extrait lu :** `assert.deepEqual([...toRegExp(compile(rtl.rules)).exec("abc")], ["", "a", "bc"]);`
- **À vérifier :** si une entrée externe atteint cette ligne, il y a injection de commande. Retracer l'origine des arguments.

### 108. [eleve] évaluation de code dynamique

- **Fichier :** `test/assertions.test.js`
- **Ligne :** 86
- **Extrait lu :** `assert.deepEqual([...toRegExp(compile(rtl.rules)).exec("abc")], ["", "a", "bc"]);`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 109. [eleve] évaluation de code dynamique

- **Fichier :** `test/assertions.test.js`
- **Ligne :** 180
- **Extrait lu :** `rebuilt.exec(text),`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 110. [eleve] évaluation de code dynamique

- **Fichier :** `test/assertions.test.js`
- **Ligne :** 181
- **Extrait lu :** `original.exec(text),`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 111. [eleve] exécution de commande avec valeur concaténée

- **Fichier :** `test/assertions.test.js`
- **Ligne :** 261
- **Extrait lu :** `assert.equal(toRegExp(result).exec("USD123")[0], "123");`
- **À vérifier :** si une entrée externe atteint cette ligne, il y a injection de commande. Retracer l'origine des arguments.

### 112. [eleve] évaluation de code dynamique

- **Fichier :** `test/assertions.test.js`
- **Ligne :** 261
- **Extrait lu :** `assert.equal(toRegExp(result).exec("USD123")[0], "123");`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 113. [eleve] exécution de commande avec valeur concaténée

- **Fichier :** `test/assertions.test.js`
- **Ligne :** 268
- **Extrait lu :** `assert.equal(toRegExp(compile(translated.rules)).exec("abc").groups.field, "abc");`
- **À vérifier :** si une entrée externe atteint cette ligne, il y a injection de commande. Retracer l'origine des arguments.

### 114. [eleve] évaluation de code dynamique

- **Fichier :** `test/assertions.test.js`
- **Ligne :** 268
- **Extrait lu :** `assert.equal(toRegExp(compile(translated.rules)).exec("abc").groups.field, "abc");`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 115. [eleve] évaluation de code dynamique

- **Fichier :** `test/compiler-fuzz.test.js`
- **Ligne :** 88
- **Extrait lu :** `rebuilt.exec(sample),`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 116. [eleve] évaluation de code dynamique

- **Fichier :** `test/compiler-fuzz.test.js`
- **Ligne :** 89
- **Extrait lu :** `regex.exec(sample),`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 117. [eleve] évaluation de code dynamique

- **Fichier :** `test/compiler-fuzz.test.js`
- **Ligne :** 263
- **Extrait lu :** `rebuilt.exec(sample),`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 118. [eleve] évaluation de code dynamique

- **Fichier :** `test/compiler-fuzz.test.js`
- **Ligne :** 264
- **Extrait lu :** `original.exec(sample),`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 119. [eleve] évaluation de code dynamique

- **Fichier :** `test/flags.test.js`
- **Ligne :** 24
- **Extrait lu :** `after.exec(input),`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 120. [eleve] évaluation de code dynamique

- **Fichier :** `test/flags.test.js`
- **Ligne :** 25
- **Extrait lu :** `before.exec(input),`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 121. [eleve] évaluation de code dynamique

- **Fichier :** `test/flags.test.js`
- **Ligne :** 58
- **Extrait lu :** `assert.deepEqual(toRegExp(result).exec(input), new RegExp(source, "mu").exec(input));`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 122. [eleve] évaluation de code dynamique

- **Fichier :** `test/flags.test.js`
- **Ligne :** 99
- **Extrait lu :** `assert.deepEqual(toRegExp(result).exec(input), native.exec(input));`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 123. [eleve] évaluation de code dynamique

- **Fichier :** `test/flags.test.js`
- **Ligne :** 106
- **Extrait lu :** `assert.deepEqual(toRegExp(rebuilt).exec(input), native.exec(input));`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 124. [eleve] évaluation de code dynamique

- **Fichier :** `test/flags.test.js`
- **Ligne :** 112
- **Extrait lu :** `toRegExp(range).exec(input),`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 125. [eleve] évaluation de code dynamique

- **Fichier :** `test/flags.test.js`
- **Ligne :** 113
- **Extrait lu :** `new RegExp("[\\u{28}-\\u{7c}]", flags).exec(input),`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 126. [eleve] évaluation de code dynamique

- **Fichier :** `test/path-segment.test.js`
- **Ligne :** 147
- **Extrait lu :** `rebuilt.exec(sample),`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 127. [eleve] évaluation de code dynamique

- **Fichier :** `test/path-segment.test.js`
- **Ligne :** 148
- **Extrait lu :** `regex.exec(sample),`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 128. [eleve] évaluation de code dynamique

- **Fichier :** `test/path-segment.test.js`
- **Ligne :** 169
- **Extrait lu :** `assert.deepEqual(rebuilt.exec(sample), regex.exec(sample));`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 129. [eleve] évaluation de code dynamique

- **Fichier :** `test/path-segment.test.js`
- **Ligne :** 177
- **Extrait lu :** `assert.deepEqual(rebuilt.exec(value), captured.exec(value));`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 130. [faible] URL en clair (non HTTPS)

- **Fichier :** `test/doc-links.test.js`
- **Ligne :** 212
- **Extrait lu :** `"[HTTP](<http://example.com>)\n[Email](<mailto:hello@example.com>)\n";`
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