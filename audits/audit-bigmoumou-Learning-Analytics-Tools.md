# Rapport d'audit statique — bigmoumou/Learning-Analytics-Tools

**Date :** 2026-10-10
**Dépôt analysé :** https://github.com/bigmoumou/Learning-Analytics-Tools
**Fichiers lus :** 30
**Généré par :** Automaton DeepSeek — analyse statique par motifs, via l'archive publique du dépôt (aucun code exécuté).

> **Nature de ce document.** Ce sont des **alertes à vérifier**, pas des vulnérabilités confirmées.
> Chaque ligne citée a été lue dans le dépôt à l'adresse indiquée. Un motif peut être légitime
> (exemple, test, code mort). Ce rapport **ne remplace pas** une revue de sécurité humaine,
> un test d'intrusion ni un scan des dépendances. Aucun code n'a été exécuté.

## Synthèse — 162 constat(s)

| Sévérité | Nombre |
|---|---|
| critique | 0 |
| eleve | 31 |
| moyen | 123 |
| faible | 8 |

## Constats

### 1. [eleve] évaluation de code dynamique

- **Fichier :** `lab/win/js/finder.js`
- **Ligne :** 1412
- **Extrait lu :** `function colsMin(cols) { var t = 8; cols.forEach(function (c) { var m = /(\d+)px/.exec(c.w); t += m ? +m[1] : 100; }); return t; }`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 2. [eleve] évaluation de code dynamique

- **Fichier :** `lab/mac/js/terminal.js`
- **Ligne :** 54
- **Extrait lu :** `var mh = /^0[xX][0-9a-fA-F]+/.exec(s.slice(i));`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 3. [eleve] évaluation de code dynamique

- **Fichier :** `lab/mac/js/terminal.js`
- **Ligne :** 56
- **Extrait lu :** `var m = /^(\d+\.?\d*|\.\d+)/.exec(s.slice(i));`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 4. [eleve] évaluation de code dynamique

- **Fichier :** `lab/mac/js/terminal.js`
- **Ligne :** 58
- **Extrait lu :** `var mv = /^[$]?([A-Za-z_][A-Za-z0-9_]*)/.exec(s.slice(i));`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 5. [eleve] évaluation de code dynamique

- **Fichier :** `lab/mac/js/terminal.js`
- **Ligne :** 188
- **Extrait lu :** `var m1 = /^([A-Za-z_][A-Za-z0-9_]*):?-(.*)$/.exec(nm);`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 6. [eleve] évaluation de code dynamique

- **Fichier :** `lab/mac/js/terminal.js`
- **Ligne :** 190
- **Extrait lu :** `var m2 = /^#([A-Za-z_][A-Za-z0-9_]*)$/.exec(nm);`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 7. [eleve] évaluation de code dynamique

- **Fichier :** `lab/mac/js/terminal.js`
- **Ligne :** 570
- **Extrait lu :** `var m = /^(-?\d+)\.\.(-?\d+)(?:\.\.(-?\d+))?$/.exec(inner);`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 8. [eleve] évaluation de code dynamique

- **Fichier :** `lab/mac/js/terminal.js`
- **Ligne :** 580
- **Extrait lu :** `var mc = /^([A-Za-z])\.\.([A-Za-z])$/.exec(inner);`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 9. [eleve] évaluation de code dynamique

- **Fichier :** `lab/mac/js/terminal.js`
- **Ligne :** 1139
- **Extrait lu :** `var m = /^[0-7]{1,3}/.exec(str.slice(i + 1));`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 10. [eleve] évaluation de code dynamique

- **Fichier :** `lab/mac/js/terminal.js`
- **Ligne :** 1144
- **Extrait lu :** `var hx = /^[0-9a-fA-F]{1,2}/.exec(str.slice(i + 1));`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 11. [eleve] évaluation de code dynamique

- **Fichier :** `lab/mac/js/terminal.js`
- **Ligne :** 1463
- **Extrait lu :** `var m = args.length && /^-?(\d+)$/.exec(args[0]);`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 12. [eleve] évaluation de code dynamique

- **Fichier :** `lab/mac/js/terminal.js`
- **Ligne :** 1781
- **Extrait lu :** `var m = /^\/(?:usr\/)?(?:s?bin)\/([^\/]+)$/.exec(name);`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 13. [eleve] évaluation de code dynamique

- **Fichier :** `lab/mac/js/terminal.js`
- **Ligne :** 1825
- **Extrait lu :** `var m = /^([A-Za-z_][A-Za-z0-9_]*)=/.exec(p0.s);`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 14. [eleve] évaluation de code dynamique

- **Fichier :** `lab/mac/js/terminal.js`
- **Ligne :** 2144
- **Extrait lu :** `else if ((m = /^-(\d+)/.exec(rest))) { var k = hist.length - parseInt(m[1], 10); if (k < 0 || k >= hist.length) return { error: 'zsh: event not found: -' + m[1]`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 15. [eleve] évaluation de code dynamique

- **Fichier :** `lab/mac/js/terminal.js`
- **Ligne :** 2145
- **Extrait lu :** `else if ((m = /^(\d+)/.exec(rest))) { var n = parseInt(m[1], 10) - 1; if (n < 0 || n >= hist.length) return { error: 'zsh: event not found: ' + m[1] }; rep = hi`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 16. [eleve] évaluation de code dynamique

- **Fichier :** `lab/mac/js/terminal.js`
- **Ligne :** 2146
- **Extrait lu :** `else if ((m = /^([A-Za-z_.\/][^\s;&|<>()"']*)/.exec(rest))) {`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 17. [eleve] évaluation de code dynamique

- **Fichier :** `lab/mac/js/terminal.js`
- **Ligne :** 2669
- **Extrait lu :** `while ((m = re.exec(str))) {`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 18. [eleve] évaluation de code dynamique

- **Fichier :** `lab/win/js/sysapps.js`
- **Ligne :** 476
- **Extrait lu :** `var sp = /^("[^"]+"|\S+)\s+([\s\S]+)$/.exec(t);`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 19. [eleve] évaluation de code dynamique

- **Fichier :** `lab/win/js/sysapps.js`
- **Ligne :** 1538
- **Extrait lu :** `var m = /^(p|w):(.+)$/.exec(sel);`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 20. [eleve] évaluation de code dynamique

- **Fichier :** `lab/win/js/sysapps.js`
- **Ligne :** 1882
- **Extrait lu :** `var m = /^[a-z][a-z0-9+.-]*:\/\/([^\/?#:]+)/i.exec(url);`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 21. [eleve] évaluation de code dynamique

- **Fichier :** `lab/mac/js/sysapps.js`
- **Ligne :** 1937
- **Extrait lu :** `var m = /^[a-z][a-z0-9+.\-]*:\/\/(?:[^@\/?#]*@)?([^\/?#:]*)(?::\d+)?([^?#]*)/i.exec(url) || [];`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 22. [eleve] évaluation de code dynamique

- **Fichier :** `lab/mac/js/sysapps.js`
- **Ligne :** 2408
- **Extrait lu :** `var m = /^\d*\.?\d+(?:\.\d*)?|^\d+\.?/.exec(s.slice(i));`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 23. [eleve] évaluation de code dynamique

- **Fichier :** `lab/mac/js/sysapps.js`
- **Ligne :** 2461
- **Extrait lu :** `var m = /^\s*(-?\d+(?:[.,]\d+)?)\s*([^\d\s]+?)\s+(?:in|to|=|轉|轉成|換成|是多少)\s*([^\d\s]+?)\s*$/i.exec(String(q || '')) || /^\s*(-?\d+(?:[.,]\d+)?)\s*([a-z°]+|[^\d\s`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 24. [eleve] évaluation de code dynamique

- **Fichier :** `lab/mac/js/finder.js`
- **Ligne :** 98
- **Extrait lu :** `function tagOfView(p) { var m = /^tag([a-z]+):$/.exec(String(p)); return m && TAGBY[m[1]] ? m[1] : null; }`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 25. [eleve] évaluation de code dynamique

- **Fichier :** `lab/win/js/missions.js`
- **Ligne :** 476
- **Extrait lu :** `while ((m = re.exec(str)) !== null) {`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 26. [eleve] évaluation de code dynamique

- **Fichier :** `works/hw1/41xxxx40h/script.js`
- **Ligne :** 118
- **Extrait lu :** `while ((m = re.exec(str))) {`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 27. [eleve] évaluation de code dynamique

- **Fichier :** `works/hw1/41xxxx40h/script.js`
- **Ligne :** 893
- **Extrait lu :** `while ((m = re.exec(str))) {`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 28. [eleve] évaluation de code dynamique

- **Fichier :** `works/hw1/41xxxx40h/script.js`
- **Ligne :** 920
- **Extrait lu :** `while ((m = re.exec(w))) {`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 29. [eleve] évaluation de code dynamique

- **Fichier :** `lab/mac/js/missions.js`
- **Ligne :** 469
- **Extrait lu :** `while ((m = re.exec(str)) !== null) {`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 30. [eleve] évaluation de code dynamique

- **Fichier :** `works/hw1/41xxxx13h/script.js`
- **Ligne :** 203
- **Extrait lu :** `while ((m = DATE_RUN.exec(text))) {`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 31. [eleve] évaluation de code dynamique

- **Fichier :** `works/hw1/41xxxx13h/script.js`
- **Ligne :** 247
- **Extrait lu :** `var m = /^https?:\/\/([^\/?#]+)/i.exec(u);`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 32. [moyen] injection HTML potentielle

- **Fichier :** `lab/win/js/finder.js`
- **Ligne :** 571
- **Extrait lu :** `chev.innerHTML = gl('fd-i-chev-r', 10);`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 33. [moyen] injection HTML potentielle

- **Fichier :** `lab/win/js/finder.js`
- **Ligne :** 573
- **Extrait lu :** `ico.innerHTML = LAB.icons.get(p === '/' ? 'fd-n-drive' : 'folder', { size: 16 });`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 34. [moyen] injection HTML potentielle

- **Fichier :** `lab/win/js/finder.js`
- **Ligne :** 713
- **Extrait lu :** `ico.innerHTML = LAB.icons.get('zip', { size: 16 });`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 35. [moyen] injection HTML potentielle

- **Fichier :** `lab/win/js/finder.js`
- **Ligne :** 715
- **Extrait lu :** `x.innerHTML = gl('fd-i-close', 12);`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 36. [moyen] injection HTML potentielle

- **Fichier :** `lab/win/js/finder.js`
- **Ligne :** 807
- **Extrait lu :** `big.innerHTML = LAB.icons.get(one ? LAB.icons.forNode(one) : 'doc', { size: 32 });`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 37. [moyen] injection HTML potentielle

- **Fichier :** `lab/win/js/finder.js`
- **Ligne :** 938
- **Extrait lu :** `ico.innerHTML = LAB.icons.get(one ? LAB.icons.forNode(one) : 'folder', { size: 16 });`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 38. [moyen] injection HTML potentielle

- **Fichier :** `lab/win/js/finder.js`
- **Ligne :** 940
- **Extrait lu :** `xBtn.innerHTML = gl('fd-i-close', 12);`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 39. [moyen] injection HTML potentielle

- **Fichier :** `lab/win/js/finder.js`
- **Ligne :** 1098
- **Extrait lu :** `b.innerHTML = gl(icon, size || 16);`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 40. [moyen] injection HTML potentielle

- **Fichier :** `lab/win/js/finder.js`
- **Ligne :** 1113
- **Extrait lu :** `searchIco.innerHTML = gl('fd-i-search', 15);`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 41. [moyen] injection HTML potentielle

- **Fichier :** `lab/win/js/finder.js`
- **Ligne :** 1122
- **Extrait lu :** `viewListBtn.innerHTML = gl('fd-i-list', 16);`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 42. [moyen] injection HTML potentielle

- **Fichier :** `lab/win/js/finder.js`
- **Ligne :** 1123
- **Extrait lu :** `viewIconBtn.innerHTML = gl('fd-i-grid', 16);`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 43. [moyen] injection HTML potentielle

- **Fichier :** `lab/win/js/finder.js`
- **Ligne :** 1156
- **Extrait lu :** `ico.innerHTML = gl(tabIconName(path), 16);`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 44. [moyen] injection HTML potentielle

- **Fichier :** `lab/win/js/finder.js`
- **Ligne :** 1158
- **Extrait lu :** `x.innerHTML = gl('fd-i-close', 12);`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 45. [moyen] injection HTML potentielle

- **Fichier :** `lab/win/js/finder.js`
- **Ligne :** 1169
- **Extrait lu :** `plus.innerHTML = gl('fd-i-plus', 16);`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 46. [moyen] injection HTML potentielle

- **Fichier :** `lab/win/js/finder.js`
- **Ligne :** 1500
- **Extrait lu :** `c.querySelector('.fd-hc-s').innerHTML = on ? gl(S.sort.dir > 0 ? 'fd-i-chev-d' : 'fd-i-chev-d', 10) : '';`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 47. [moyen] injection HTML potentielle

- **Fichier :** `lab/win/js/finder.js`
- **Ligne :** 1589
- **Extrait lu :** `else { rec.icoEl.innerHTML = LAB.icons.get(key, { size: px }); rec.icoEl.classList.remove('has-th'); }`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 48. [moyen] injection HTML potentielle

- **Fichier :** `lab/win/js/finder.js`
- **Ligne :** 1624
- **Extrait lu :** `ts.firstChild.innerHTML = gl('fd-n-pin', 11);`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 49. [moyen] injection HTML potentielle

- **Fichier :** `lab/win/js/finder.js`
- **Ligne :** 1835
- **Extrait lu :** `chev.innerHTML = gl('fd-i-chev-d', 12);`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 50. [moyen] injection HTML potentielle

- **Fichier :** `lab/win/js/finder.js`
- **Ligne :** 1919
- **Extrait lu :** `lead.innerHTML = gl('fd-i-search', 15);`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 51. [moyen] injection HTML potentielle

- **Fichier :** `lab/win/js/finder.js`
- **Ligne :** 1925
- **Extrait lu :** `lead.innerHTML = gl(addrIconName(), 16);`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 52. [moyen] injection HTML potentielle

- **Fichier :** `lab/win/js/finder.js`
- **Ligne :** 1938
- **Extrait lu :** `chev.innerHTML = gl('fd-i-chev-r', 10);`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 53. [moyen] injection HTML potentielle

- **Fichier :** `lab/win/js/finder.js`
- **Ligne :** 2049
- **Extrait lu :** `big.innerHTML = LAB.icons.get(cur ? iconNameFor(cur, 'row') : tabIconName(S.path), { size: 64 });`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 54. [moyen] injection HTML potentielle

- **Fichier :** `lab/win/js/finder.js`
- **Ligne :** 2057
- **Extrait lu :** `else big.innerHTML = LAB.icons.get(iconNameFor(shown, 'row'), { size: 64 });`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 55. [moyen] injection HTML potentielle

- **Fichier :** `lab/win/js/finder.js`
- **Ligne :** 2123
- **Extrait lu :** `if (d.exp && d.exp !== 'none') { exp.innerHTML = gl('fd-i-chev-r', 10); if (d.exp === 'open') exp.classList.add('is-open'); }`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 56. [moyen] injection HTML potentielle

- **Fichier :** `lab/win/js/finder.js`
- **Ligne :** 2125
- **Extrait lu :** `ico.innerHTML = gl(d.icon, 16);`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 57. [moyen] injection HTML potentielle

- **Fichier :** `lab/win/js/finder.js`
- **Ligne :** 2128
- **Extrait lu :** `if (d.pin) { var pin = h('span', { class: 'fd-nav-pin', 'aria-hidden': 'true' }); pin.innerHTML = gl('fd-n-pin', 11); btn.appendChild(pin); }`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 58. [moyen] injection HTML potentielle

- **Fichier :** `lab/win/js/finder.js`
- **Ligne :** 2183
- **Extrait lu :** `i.innerHTML = gl(o.icon, 18);`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 59. [moyen] injection HTML potentielle

- **Fichier :** `lab/win/js/finder.js`
- **Ligne :** 2186
- **Extrait lu :** `if (o.menu) { var c = h('span', { class: 'fd-cb-c', 'aria-hidden': 'true' }); c.innerHTML = gl('fd-i-chev-d', 9); b.appendChild(c); }`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 60. [moyen] injection HTML potentielle

- **Fichier :** `lab/win/js/sysapps.js`
- **Ligne :** 20
- **Extrait lu :** `s.innerHTML = LAB.icons.get(name, { size: size });          // static icon markup only`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 61. [moyen] injection HTML potentielle

- **Fichier :** `lab/win/js/sysapps.js`
- **Ligne :** 1732
- **Extrait lu :** `b.firstChild.innerHTML = svg;`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 62. [moyen] injection HTML potentielle

- **Fichier :** `lab/win/js/sysapps.js`
- **Ligne :** 1739
- **Extrait lu :** `graph.innerHTML = '<svg viewBox="0 0 600 240" preserveAspectRatio="none" aria-hidden="true"><g class="tk-grid-lines"></g><path class="tk-area" d=""/><path class`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 63. [moyen] injection HTML potentielle

- **Fichier :** `lab/win/js/sysapps.js`
- **Ligne :** 1743
- **Extrait lu :** `g.innerHTML = lines;`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 64. [moyen] injection HTML potentielle

- **Fichier :** `lab/mac/js/sysapps.js`
- **Ligne :** 28
- **Extrait lu :** `function ico(name, size) { var s = h('span', { class: 'sy-ico', 'aria-hidden': 'true' }); s.innerHTML = LAB.icons.get(name, { size: size || 24 }); return s; }`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 65. [moyen] injection HTML potentielle

- **Fichier :** `lab/mac/js/sysapps.js`
- **Ligne :** 29
- **Extrait lu :** `function svgIn(markup) { var s = h('span', { class: 'sy-svg', 'aria-hidden': 'true' }); s.innerHTML = markup; return s; }   // static markup only`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 66. [moyen] injection HTML potentielle

- **Fichier :** `lab/mac/js/sysapps.js`
- **Ligne :** 492
- **Extrait lu :** `s.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="' + (size || 18) + '" height="' + (size || 18) + '" fill="none" stroke="curren`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 67. [moyen] injection HTML potentielle

- **Fichier :** `lab/mac/js/sysapps.js`
- **Ligne :** 557
- **Extrait lu :** `s.innerHTML = '<svg viewBox="0 0 240 150" width="' + w + '" height="' + Math.round(w * 150 / 240) + '">' +`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 68. [moyen] injection HTML potentielle

- **Fichier :** `lab/mac/js/sysapps.js`
- **Ligne :** 1010
- **Extrait lu :** `thumb.innerHTML = '<i class="a"></i><i class="b"></i><i class="c"></i><i class="d"></i>';`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 69. [moyen] injection HTML potentielle

- **Fichier :** `lab/win/js/desktop.js`
- **Ligne :** 58
- **Extrait lu :** `s.innerHTML = LAB.icons.get(name, { size: size });          // static icon markup only`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 70. [moyen] injection HTML potentielle

- **Fichier :** `lab/win/js/desktop.js`
- **Ligne :** 803
- **Extrait lu :** `if (trashRec.icon !== tn) { trashRec.icon = tn; trashRec.el.querySelector('.lab-dicon-img').innerHTML = LAB.icons.get(tn, { size: 48 }); }`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 71. [moyen] injection HTML potentielle

- **Fichier :** `lab/win/js/desktop.js`
- **Ligne :** 815
- **Extrait lu :** `if (rec.icon !== ic) { rec.icon = ic; rec.el.querySelector('.lab-dicon-img').innerHTML = LAB.icons.get(ic, { size: 48 }); }`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 72. [moyen] injection HTML potentielle

- **Fichier :** `lab/win/js/desktop.js`
- **Ligne :** 842
- **Extrait lu :** `imgBox.innerHTML = LAB.icons.get(iconName, { size: 48 });     // static icon markup only`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 73. [moyen] requête SQL construite par concaténation

- **Fichier :** `lab/win/js/desktop.js`
- **Ligne :** 1376
- **Extrait lu :** `// keyboard (F2, Enter, Delete, Ctrl+A) while no window has the focus (frontmost app = finder = the desktop)`
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 74. [moyen] injection HTML potentielle

- **Fichier :** `lab/win/js/desktop.js`
- **Ligne :** 1521
- **Extrait lu :** `icon.innerHTML = LAB.icons.get((def && def.icon) || ('app-' + id), { size: 30 });          // static icon markup only`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 75. [moyen] injection HTML potentielle

- **Fichier :** `lab/win/js/desktop.js`
- **Ligne :** 1551
- **Extrait lu :** `rec.iconBox.innerHTML = LAB.icons.get(def.icon || ('app-' + id), { size: 30 });`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 76. [moyen] injection HTML potentielle

- **Fichier :** `lab/win/js/desktop.js`
- **Ligne :** 1599
- **Extrait lu :** `close.innerHTML = '<svg viewBox="0 0 10 10" aria-hidden="true"><path d="M.5.5l9 9M9.5.5l-9 9" fill="none" stroke="currentColor"/></svg>';`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 77. [moyen] injection HTML potentielle

- **Fichier :** `lab/win/js/desktop.js`
- **Ligne :** 1728
- **Extrait lu :** `wifiBtn.innerHTML = LAB.icons.get('wifi', { size: 20 });`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 78. [moyen] injection HTML potentielle

- **Fichier :** `lab/win/js/desktop.js`
- **Ligne :** 1730
- **Extrait lu :** `spk.innerHTML = LAB.icons.get('speaker', { size: 20 });`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 79. [moyen] injection HTML potentielle

- **Fichier :** `lab/mac/js/finder.js`
- **Ligne :** 398
- **Extrait lu :** `else ico.innerHTML = LAB.icons.get(LAB.icons.forNode(st), { size: 52 });`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 80. [moyen] injection HTML potentielle

- **Fichier :** `lab/mac/js/finder.js`
- **Ligne :** 541
- **Extrait lu :** `backBtn.innerHTML = LAB.icons.get('chev-left', { size: 17 });`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 81. [moyen] injection HTML potentielle

- **Fichier :** `lab/mac/js/finder.js`
- **Ligne :** 542
- **Extrait lu :** `fwdBtn.innerHTML = LAB.icons.get('chev-right', { size: 17 });`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 82. [moyen] injection HTML potentielle

- **Fichier :** `lab/mac/js/finder.js`
- **Ligne :** 548
- **Extrait lu :** `viewIconBtn.innerHTML = LAB.icons.get('icon-view', { size: 16 });`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 83. [moyen] injection HTML potentielle

- **Fichier :** `lab/mac/js/finder.js`
- **Ligne :** 549
- **Extrait lu :** `viewListBtn.innerHTML = LAB.icons.get('list-view', { size: 16 });`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 84. [moyen] injection HTML potentielle

- **Fichier :** `lab/mac/js/finder.js`
- **Ligne :** 552
- **Extrait lu :** `viewColBtn.innerHTML = LAB.icons.get('columns-view', { size: 16 });`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 85. [moyen] injection HTML potentielle

- **Fichier :** `lab/mac/js/finder.js`
- **Ligne :** 553
- **Extrait lu :** `viewGalBtn.innerHTML = LAB.icons.get('gallery-view', { size: 16 });`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 86. [moyen] injection HTML potentielle

- **Fichier :** `lab/mac/js/finder.js`
- **Ligne :** 556
- **Extrait lu :** `searchIco.innerHTML = LAB.icons.get('search', { size: 13 });`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 87. [moyen] injection HTML potentielle

- **Fichier :** `lab/mac/js/finder.js`
- **Ligne :** 584
- **Extrait lu :** `ico.innerHTML = LAB.icons.get(def.icon, { size: 16 });`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 88. [moyen] injection HTML potentielle

- **Fichier :** `lab/mac/js/finder.js`
- **Ligne :** 823
- **Extrait lu :** `s.innerHTML = on ? LAB.icons.get(es.dir > 0 ? 'sort-asc' : 'sort-desc', { size: 11 }) : '';`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 89. [moyen] injection HTML potentielle

- **Fichier :** `lab/mac/js/finder.js`
- **Ligne :** 858
- **Extrait lu :** `chev.innerHTML = LAB.icons.get('chev-right', { size: 11 });`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 90. [moyen] injection HTML potentielle

- **Fichier :** `lab/mac/js/finder.js`
- **Ligne :** 938
- **Extrait lu :** `rec.icoEl.innerHTML = LAB.icons.get(iname, { size: size });`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 91. [moyen] injection HTML potentielle

- **Fichier :** `lab/mac/js/finder.js`
- **Ligne :** 994
- **Extrait lu :** `else pv.innerHTML = LAB.icons.get(LAB.icons.forNode(st), { size: 96 });`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 92. [moyen] injection HTML potentielle

- **Fichier :** `lab/mac/js/finder.js`
- **Ligne :** 1036
- **Extrait lu :** `else { var ico = h('div', { class: 'fd-gal-ico', 'aria-hidden': 'true' }); ico.innerHTML = LAB.icons.get(LAB.icons.forNode(st), { size: 150 }); galStage.appendC`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 93. [moyen] injection HTML potentielle

- **Fichier :** `lab/mac/js/finder.js`
- **Ligne :** 1212
- **Extrait lu :** `titleIco.innerHTML = LAB.icons.get(iname, { size: 17 });`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 94. [moyen] injection HTML potentielle

- **Fichier :** `lab/mac/js/finder.js`
- **Ligne :** 1258
- **Extrait lu :** `ico.innerHTML = LAB.icons.get(i === 0 ? 'fd-hdd' : (LAB.vfs.isDir(sg.path) ? 'folder' : LAB.icons.forNode(LAB.vfs.stat(sg.path))), { size: 14 });`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 95. [moyen] injection HTML potentielle

- **Fichier :** `works/hw1/41xxxx05h/app.js`
- **Ligne :** 49
- **Extrait lu :** `if(C.timeline)$('#stats').innerHTML=[['收錄景點',D.places.length],...stages.map(x=>[x,0]),[C.status,D.places.length]].map(x=>'<div><strong>'+x[1]+'</strong><small>'`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 96. [moyen] injection HTML potentielle

- **Fichier :** `works/hw1/41xxxx05h/app.js`
- **Ligne :** 50
- **Extrait lu :** `$('#cards').innerHTML=list.length?list.map(card).join(''):\`<div class="empty"><h3>${state.species==='cherry'?'櫻花：尚無資料':'沒有符合篩選的景點'}</h3><p>${state.species==='ch`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 97. [moyen] injection HTML potentielle

- **Fichier :** `works/hw1/41xxxx05h/app.js`
- **Ligne :** 91
- **Extrait lu :** `function toggleFavorite(id){state.favorites=state.favorites.includes(id)?state.favorites.filter(x=>x!==id):[...state.favorites,id];save();render();if($('#detail`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 98. [moyen] injection HTML potentielle

- **Fichier :** `works/hw1/41xxxx05h/app.js`
- **Ligne :** 92
- **Extrait lu :** `function toggleVisit(id){state.visited=state.visited.includes(id)?state.visited.filter(x=>x!==id):[...state.visited,id];save();renderFavorites();if($('#detail')`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 99. [moyen] injection HTML potentielle

- **Fichier :** `works/hw1/41xxxx38h/app.js`
- **Ligne :** 313
- **Extrait lu :** `sec.innerHTML = '<div class="empty"><h4>' + esc(T['err.data.h'][0]) + ' / ' + esc(T['err.data.h'][1]) + '</h4><p>' + esc(T['err.data.p'][1]) + '</p><p lang="zh-`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 100. [moyen] injection HTML potentielle

- **Fichier :** `works/hw1/41xxxx38h/app.js`
- **Ligne :** 432
- **Extrait lu :** `$('#ledger').innerHTML =`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 101. [moyen] injection HTML potentielle

- **Fichier :** `works/hw1/41xxxx38h/app.js`
- **Ligne :** 438
- **Extrait lu :** `$('#hero-status').innerHTML = nPend ? esc(t('hero.status', nNone, nPend, '@@NAMES@@')).replace('@@NAMES@@', namesHtml) : esc(t('hero.status.nopending', nNone));`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 102. [moyen] injection HTML potentielle

- **Fichier :** `works/hw1/41xxxx38h/app.js`
- **Ligne :** 447
- **Extrait lu :** `$('#f-region').innerHTML = optHtml('', t('f.all') + '（' + SPOTS.length + '）', !ST.region) + regions.filter(k => rc[k]).map(k => optHtml(k, regionName(k) + '（' +`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 103. [moyen] injection HTML potentielle

- **Fichier :** `works/hw1/41xxxx38h/app.js`
- **Ligne :** 449
- **Extrait lu :** `$('#f-grade').innerHTML = optHtml('', t('f.all') + '（' + SPOTS.length + '）', !ST.grade) + Object.keys(gc).sort().map(g => optHtml(g, g + ' · ' + bi(GRADES[g] ||`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 104. [moyen] injection HTML potentielle

- **Fichier :** `works/hw1/41xxxx38h/app.js`
- **Ligne :** 454
- **Extrait lu :** `$('#status-groups').innerHTML =`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 105. [moyen] injection HTML potentielle

- **Fichier :** `works/hw1/41xxxx38h/app.js`
- **Ligne :** 496
- **Extrait lu :** `ol.innerHTML = items.map(rowHtml).join('');`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 106. [moyen] injection HTML potentielle

- **Fichier :** `works/hw1/41xxxx38h/app.js`
- **Ligne :** 504
- **Extrait lu :** `empty.innerHTML = '<svg viewBox="0 0 100 100" aria-hidden="true" focusable="false"><use href="#st-none"/></svg>' +`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 107. [moyen] injection HTML potentielle

- **Fichier :** `works/hw1/41xxxx38h/app.js`
- **Ligne :** 632
- **Extrait lu :** `$('#detail-names').innerHTML = zh + (s.name_en ? '<i>' + esc(s.name_en) + '</i>' : esc(t('name.nv')));`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 108. [moyen] injection HTML potentielle

- **Fichier :** `works/hw1/41xxxx38h/app.js`
- **Ligne :** 656
- **Extrait lu :** `$('#detail-body').innerHTML = h;`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 109. [moyen] injection HTML potentielle

- **Fichier :** `works/hw1/41xxxx38h/app.js`
- **Ligne :** 741
- **Extrait lu :** `sel.innerHTML = '<option value="">' + esc(t('walk.select.ph')) + '</option>' + SPOTS.filter(s => hasCoord(s) && !ST.route.includes(s.id)).map(s => '<option valu`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 110. [moyen] requête SQL construite par concaténation

- **Fichier :** `works/hw1/41xxxx38h/app.js`
- **Ligne :** 741
- **Extrait lu :** `sel.innerHTML = '<option value="">' + esc(t('walk.select.ph')) + '</option>' + SPOTS.filter(s => hasCoord(s) && !ST.route.includes(s.id)).map(s => '<option valu`
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 111. [moyen] injection HTML potentielle

- **Fichier :** `works/hw1/41xxxx38h/app.js`
- **Ligne :** 751
- **Extrait lu :** `it.innerHTML = rs.map((s, i) => {`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 112. [moyen] injection HTML potentielle

- **Fichier :** `works/hw1/41xxxx38h/app.js`
- **Ligne :** 763
- **Extrait lu :** `$('#walk-empty').innerHTML = n === 0 ? stopSvgLine() + '<p>' + esc(t('walk.empty.p')) + '</p>' : '';`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 113. [moyen] injection HTML potentielle

- **Fichier :** `works/hw1/41xxxx38h/app.js`
- **Ligne :** 774
- **Extrait lu :** `$('#walk-sum').innerHTML = sum;`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 114. [moyen] injection HTML potentielle

- **Fichier :** `works/hw1/41xxxx38h/app.js`
- **Ligne :** 780
- **Extrait lu :** `$('#nostage-list').innerHTML =`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 115. [moyen] injection HTML potentielle

- **Fichier :** `works/hw1/41xxxx38h/app.js`
- **Ligne :** 783
- **Extrait lu :** `$('#kind-list').innerHTML = ['intro', 'now', 'history', 'season', 'official', 'third'].map(k => '<div><dt><span class="kind kind-' + k + '">' + esc(t('kind.' + `
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 116. [moyen] injection HTML potentielle

- **Fichier :** `works/hw1/41xxxx38h/app.js`
- **Ligne :** 788
- **Extrait lu :** `$('#jma-body').innerHTML =`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 117. [moyen] injection HTML potentielle

- **Fichier :** `works/hw1/41xxxx38h/app.js`
- **Ligne :** 834
- **Extrait lu :** `$('#src-body').innerHTML = h;`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 118. [moyen] injection HTML potentielle

- **Fichier :** `works/hw1/41xxxx38h/app.js`
- **Ligne :** 865
- **Extrait lu :** `m.innerHTML = '<strong>' + esc(t('map.fail.' + kind + '.h')) + '</strong>' + esc(t('map.fail.' + kind + '.p')) + (kind === 'tiles' ? '<br><button type="button" `
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 119. [moyen] injection HTML potentielle

- **Fichier :** `lab/mac/js/desktop.js`
- **Ligne :** 337
- **Extrait lu :** `b.innerHTML = LAB.icons.get(name, { size: size || 16 });`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 120. [moyen] injection HTML potentielle

- **Fichier :** `lab/mac/js/desktop.js`
- **Ligne :** 351
- **Extrait lu :** `spot.innerHTML = LAB.icons.get('mb-search', { size: 16 });`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 121. [moyen] injection HTML potentielle

- **Fichier :** `lab/mac/js/desktop.js`
- **Ligne :** 354
- **Extrait lu :** `cc.innerHTML = LAB.icons.get('mb-cc', { size: 18 });`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 122. [moyen] injection HTML potentielle

- **Fichier :** `lab/mac/js/desktop.js`
- **Ligne :** 698
- **Extrait lu :** `if (rec.icon !== ic) { rec.icon = ic; rec.el.querySelector('.lab-dicon-img').innerHTML = LAB.icons.get(ic, { size: 64 }); }`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 123. [moyen] injection HTML potentielle

- **Fichier :** `lab/mac/js/desktop.js`
- **Ligne :** 891
- **Extrait lu :** `imgBox.innerHTML = LAB.icons.get(iconName, { size: 64 });     // static icon markup only`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 124. [moyen] injection HTML potentielle

- **Fichier :** `lab/mac/js/desktop.js`
- **Ligne :** 1296
- **Extrait lu :** `iconBox.innerHTML = LAB.icons.get(def.icon, { size: 52 });`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 125. [moyen] injection HTML potentielle

- **Fichier :** `lab/mac/js/desktop.js`
- **Ligne :** 1317
- **Extrait lu :** `rec.iconBox.innerHTML = LAB.icons.get(def.icon, { size: 52 });`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 126. [moyen] injection HTML potentielle

- **Fichier :** `lab/mac/js/desktop.js`
- **Ligne :** 1412
- **Extrait lu :** `trashIconBox.innerHTML = LAB.icons.get(full ? 'app-trash-full' : 'app-trash-empty', { size: 52 });`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 127. [moyen] injection HTML potentielle

- **Fichier :** `lab/mac/js/desktop.js`
- **Ligne :** 1450
- **Extrait lu :** `badge.innerHTML = LAB.icons.get(def ? def.icon : 'unknown', { size: 22 });`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 128. [moyen] injection HTML potentielle

- **Fichier :** `lab/mac/js/desktop.js`
- **Ligne :** 1480
- **Extrait lu :** `dIcon.innerHTML = LAB.icons.get('app-downloads', { size: 52 });`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 129. [moyen] injection HTML potentielle

- **Fichier :** `lab/mac/js/desktop.js`
- **Ligne :** 1645
- **Extrait lu :** `ico.innerHTML = LAB.icons.get(it.icon, { size: 26 });`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 130. [moyen] injection HTML potentielle

- **Fichier :** `lab/mac/js/desktop.js`
- **Ligne :** 1692
- **Extrait lu :** `h('div', { class: 'lab-spot-field' }, (function () { var s = h('span', { class: 'lab-spot-glass' }); s.innerHTML = LAB.icons.get('search', { size: 22 }); return`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 131. [moyen] injection HTML potentielle

- **Fichier :** `works/hw1/41xxxx15h/script.js`
- **Ligne :** 450
- **Extrait lu :** `$('#sliderScale').innerHTML = marks.map(function (m) {`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 132. [moyen] injection HTML potentielle

- **Fichier :** `works/hw1/41xxxx15h/script.js`
- **Ligne :** 463
- **Extrait lu :** `$('#stageSteps').innerHTML = STAGES.map(function (s) {`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 133. [moyen] injection HTML potentielle

- **Fichier :** `works/hw1/41xxxx15h/script.js`
- **Ligne :** 479
- **Extrait lu :** `$('#stageTable tbody').innerHTML = STAGES.map(function (s) {`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 134. [moyen] injection HTML potentielle

- **Fichier :** `works/hw1/41xxxx15h/script.js`
- **Ligne :** 486
- **Extrait lu :** `$('#yearStrip').innerHTML = RECENT_YEARS.map(function (y) {`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 135. [moyen] injection HTML potentielle

- **Fichier :** `works/hw1/41xxxx15h/script.js`
- **Ligne :** 495
- **Extrait lu :** `$('#gradeLegend').innerHTML = GRADES.map(function (g) {`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 136. [moyen] injection HTML potentielle

- **Fichier :** `works/hw1/41xxxx15h/script.js`
- **Ligne :** 502
- **Extrait lu :** `$('#srcTable tbody').innerHTML = SOURCE_ONLY.map(function (r) {`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 137. [moyen] injection HTML potentielle

- **Fichier :** `works/hw1/41xxxx15h/script.js`
- **Ligne :** 536
- **Extrait lu :** `groupChips.innerHTML = GROUPS.map(function (g) {`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 138. [moyen] injection HTML potentielle

- **Fichier :** `works/hw1/41xxxx15h/script.js`
- **Ligne :** 553
- **Extrait lu :** `regionSel.innerHTML = '<option value="all">全部地區</option>' + REGIONS.map(function (r) {`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 139. [moyen] injection HTML potentielle

- **Fichier :** `works/hw1/41xxxx15h/script.js`
- **Ligne :** 556
- **Extrait lu :** `gradeSel.innerHTML = '<option value="all">全部來源等級</option>' + GRADES.map(function (g) {`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 140. [moyen] requête SQL construite par concaténation

- **Fichier :** `works/hw1/41xxxx15h/script.js`
- **Ligne :** 644
- **Extrait lu :** `'<button type="button" class="place-head" data-act="select" aria-pressed="' + sel + '">' +`
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 141. [moyen] injection HTML potentielle

- **Fichier :** `works/hw1/41xxxx15h/script.js`
- **Ligne :** 680
- **Extrait lu :** `listEl.innerHTML = list.map(function (p) { return placeRow(p, stage); }).join('');`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 142. [moyen] injection HTML potentielle

- **Fichier :** `works/hw1/41xxxx15h/script.js`
- **Ligne :** 687
- **Extrait lu :** `if (list.length) { empty.hidden = true; empty.innerHTML = ''; return; }`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 143. [moyen] injection HTML potentielle

- **Fichier :** `works/hw1/41xxxx15h/script.js`
- **Ligne :** 694
- **Extrait lu :** `empty.innerHTML = '<p class="empty-title" tabindex="-1">' + esc(fmtLong(currentDate())) + ' 不在「' + esc(g.name) + '」期間</p>' +`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 144. [moyen] injection HTML potentielle

- **Fichier :** `works/hw1/41xxxx15h/script.js`
- **Ligne :** 700
- **Extrait lu :** `empty.innerHTML = '<p class="empty-title" tabindex="-1">還沒有收藏的景點</p><p>在清單中按「收藏」，想去的地方就會保存在這個瀏覽器。</p>' +`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 145. [moyen] injection HTML potentielle

- **Fichier :** `works/hw1/41xxxx15h/script.js`
- **Ligne :** 703
- **Extrait lu :** `empty.innerHTML = '<p class="empty-title" tabindex="-1">沒有符合條件的景點</p><p>目前的地區、來源等級' + (state.favOnly ? '或收藏' : '') + '條件下沒有景點。可以放寬篩選再試一次。</p>' +`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 146. [moyen] injection HTML potentielle

- **Fichier :** `works/hw1/41xxxx15h/script.js`
- **Ligne :** 764
- **Extrait lu :** `if (!html) { n.hidden = true; n.innerHTML = ''; n.classList.remove('is-banner'); return; }`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 147. [moyen] injection HTML potentielle

- **Fichier :** `works/hw1/41xxxx15h/script.js`
- **Ligne :** 766
- **Extrait lu :** `n.hidden = false; n.innerHTML = html;`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 148. [moyen] injection HTML potentielle

- **Fichier :** `works/hw1/41xxxx15h/script.js`
- **Ligne :** 1023
- **Extrait lu :** `$('#routeList').innerHTML = listHtml;`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 149. [moyen] injection HTML potentielle

- **Fichier :** `works/hw1/41xxxx15h/script.js`
- **Ligne :** 1028
- **Extrait lu :** `empty.innerHTML = n === 0`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 150. [moyen] injection HTML potentielle

- **Fichier :** `works/hw1/41xxxx15h/script.js`
- **Ligne :** 1034
- **Extrait lu :** `empty.hidden = true; empty.innerHTML = '';`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 151. [moyen] injection HTML potentielle

- **Fichier :** `works/hw1/41xxxx15h/script.js`
- **Ligne :** 1036
- **Extrait lu :** `sum.innerHTML = '<div><span class="sum-label">總直線距離</span><span class="sum-val">' + fmtDist(total) + '</span></div>' +`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 152. [moyen] injection HTML potentielle

- **Fichier :** `works/hw1/41xxxx15h/script.js`
- **Ligne :** 1167
- **Extrait lu :** `$('#walkList').innerHTML = WALKS.map(function (w) {`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 153. [moyen] injection HTML potentielle

- **Fichier :** `lab/win/js/missions.js`
- **Ligne :** 37
- **Extrait lu :** `span.innerHTML = '<svg viewBox="0 0 20 20" width="18" height="18"><circle cx="10" cy="10" r="9"/><path d="M5.6 10.4l2.9 2.9 5.9-6.1"/></svg>';`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 154. [moyen] injection HTML potentielle

- **Fichier :** `lab/mac/js/missions.js`
- **Ligne :** 35
- **Extrait lu :** `span.innerHTML = '<svg viewBox="0 0 20 20" width="18" height="18"><circle cx="10" cy="10" r="9"/><path d="M5.6 10.4l2.9 2.9 5.9-6.1"/></svg>';`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 155. [faible] URL en clair (non HTTPS)

- **Fichier :** `works/hw1/41xxxx08l/sakura.py`
- **Ligne :** 2267
- **Extrait lu :** `'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#4c8a56" stroke-width="1.8" '`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 156. [faible] URL en clair (non HTTPS)

- **Fichier :** `lab/win/js/finder.js`
- **Ligne :** 213
- **Extrait lu :** `var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="s" x1="0" y1="0" x2="0" `
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 157. [faible] URL en clair (non HTTPS)

- **Fichier :** `lab/mac/js/sysapps.js`
- **Ligne :** 492
- **Extrait lu :** `s.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="' + (size || 18) + '" height="' + (size || 18) + '" fill="none" stroke="curren`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 158. [faible] URL en clair (non HTTPS)

- **Fichier :** `lab/mac/js/finder.js`
- **Ligne :** 254
- **Extrait lu :** `return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" width="320" height="240">' + body + '</svg>';`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 159. [faible] URL en clair (non HTTPS)

- **Fichier :** `lab/mac/js/desktop.js`
- **Ligne :** 11
- **Extrait lu :** `LAB.icons.add('mb-search', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 160. [faible] URL en clair (non HTTPS)

- **Fichier :** `lab/mac/js/desktop.js`
- **Ligne :** 12
- **Extrait lu :** `LAB.icons.add('mb-cc', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2"><rect x="3.5" y="4.2" `
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 161. [faible] URL en clair (non HTTPS)

- **Fichier :** `works/hw1/41xxxx40h/script.js`
- **Ligne :** 23
- **Extrait lu :** `var SVGNS = 'http://www.w3.org/2000/svg';`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 162. [faible] URL en clair (non HTTPS)

- **Fichier :** `works/hw1/41xxxx13h/script.js`
- **Ligne :** 146
- **Extrait lu :** `var SVGNS = 'http://www.w3.org/2000/svg';`
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