# Rapport d'audit statique — xiaolongbao0709/ai-virtual-phone-share

**Date :** 2026-10-10
**Dépôt analysé :** https://github.com/xiaolongbao0709/ai-virtual-phone-share
**Fichiers lus :** 30
**Généré par :** Automaton DeepSeek — analyse statique par motifs, via l'archive publique du dépôt (aucun code exécuté).

> **Nature de ce document.** Ce sont des **alertes à vérifier**, pas des vulnérabilités confirmées.
> Chaque ligne citée a été lue dans le dépôt à l'adresse indiquée. Un motif peut être légitime
> (exemple, test, code mort). Ce rapport **ne remplace pas** une revue de sécurité humaine,
> un test d'intrusion ni un scan des dépendances. Aucun code n'a été exécuté.

## Synthèse — 206 constat(s)

| Sévérité | Nombre |
|---|---|
| critique | 0 |
| eleve | 12 |
| moyen | 174 |
| faible | 20 |

## Constats

### 1. [eleve] évaluation de code dynamique

- **Fichier :** `资源/Js插件/图片管理插件/2.1.4_图库管家.js`
- **Ligne :** 420
- **Extrait lu :** `const m = /rgba?\(([^)]+)\)/.exec(bg);`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 2. [eleve] évaluation de code dynamique

- **Fichier :** `资源/Js插件/图片管理插件/2.1.4_图库管家.js`
- **Ligne :** 604
- **Extrait lu :** `const m = /^data:([^;,]+)/.exec(dataUrl);`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 3. [eleve] évaluation de code dynamique

- **Fichier :** `资源/Js插件/图片管理插件/2.1.4_图库管家.js`
- **Ligne :** 986
- **Extrait lu :** `let m = re.exec(value);`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 4. [eleve] évaluation de code dynamique

- **Fichier :** `资源/Js插件/图片管理插件/2.1.4_图库管家.js`
- **Ligne :** 987
- **Extrait lu :** `while (m) { addRef(into, m[1] || m[0], use, loc); m = re.exec(value); }`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 5. [eleve] évaluation de code dynamique

- **Fichier :** `资源/Js插件/图片管理插件/2.1.4_图库管家.js`
- **Ligne :** 1010
- **Extrait lu :** `let m = DATA_URL_RE.exec(value);`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 6. [eleve] évaluation de code dynamique

- **Fichier :** `资源/Js插件/图片管理插件/2.1.4_图库管家.js`
- **Ligne :** 1013
- **Extrait lu :** `m = DATA_URL_RE.exec(value);`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 7. [eleve] évaluation de code dynamique

- **Fichier :** `资源/Js插件/改自虚拟时间/虚拟时钟-有弹窗.js`
- **Ligne :** 737
- **Extrait lu :** `while ((m = TAG_RE.exec(text)) !== null) {`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 8. [eleve] évaluation de code dynamique

- **Fichier :** `资源/Js插件/改自虚拟时间/虚拟时钟-没弹窗.js`
- **Ligne :** 737
- **Extrait lu :** `while ((m = TAG_RE.exec(text)) !== null) {`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 9. [eleve] évaluation de code dynamique

- **Fichier :** `资源/Js插件/消息emoji回应/（9.10更新）消息表情回应.js`
- **Ligne :** 200
- **Extrait lu :** `const m = re.exec(k);`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 10. [eleve] évaluation de code dynamique

- **Fichier :** `资源/Js插件/虚拟时间/虚拟时钟.js`
- **Ligne :** 711
- **Extrait lu :** `while ((m = TAG_RE.exec(text)) !== null) {`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 11. [eleve] évaluation de code dynamique

- **Fichier :** ``
- **Ligne :** 105
- **Extrait lu :** `while ((m = re.exec(String(text || ""))) !== null) {`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 12. [eleve] évaluation de code dynamique

- **Fichier :** `资源/Js插件/消息提醒设置/消息提醒设置.js`
- **Ligne :** 875
- **Extrait lu :** `while ((match = pattern.regex.exec(text)) !== null) {`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 13. [moyen] injection HTML potentielle

- **Fichier :** `资源/Js插件/礼物背包/（9.13）背包.js`
- **Ligne :** 3033
- **Extrait lu :** `wrap.innerHTML = \``
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 14. [moyen] injection HTML potentielle

- **Fichier :** `资源/Js插件/礼物背包/（9.13）背包.js`
- **Ligne :** 3070
- **Extrait lu :** `listEl.innerHTML = \``
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 15. [moyen] injection HTML potentielle

- **Fichier :** `资源/Js插件/礼物背包/（9.13）背包.js`
- **Ligne :** 3083
- **Extrait lu :** `row.innerHTML = \``
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 16. [moyen] injection HTML potentielle

- **Fichier :** `资源/Js插件/礼物背包/（9.13）背包.js`
- **Ligne :** 3095
- **Extrait lu :** `listEl.innerHTML = "";`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 17. [moyen] injection HTML potentielle

- **Fichier :** `资源/Js插件/礼物背包/（9.13）背包.js`
- **Ligne :** 3216
- **Extrait lu :** `detailEl.innerHTML = \``
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 18. [moyen] injection HTML potentielle

- **Fichier :** `资源/Js插件/礼物背包/（9.13）背包.js`
- **Ligne :** 3418
- **Extrait lu :** `iconInner.innerHTML = renderItemIconContent(tempCustomImage);`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 19. [moyen] injection HTML potentielle

- **Fichier :** `资源/Js插件/礼物背包/（9.13）背包.js`
- **Ligne :** 3437
- **Extrait lu :** `iconInner.innerHTML = renderItemIconContent(tempCustomImage);`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 20. [moyen] injection HTML potentielle

- **Fichier :** `资源/Js插件/礼物背包/（9.13）背包.js`
- **Ligne :** 3445
- **Extrait lu :** `iconInner.innerHTML = renderItemIconContent(tempCustomImage);`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 21. [moyen] injection HTML potentielle

- **Fichier :** `资源/Js插件/礼物背包/（9.13）背包.js`
- **Ligne :** 3514
- **Extrait lu :** `transferList.innerHTML = \``
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 22. [moyen] injection HTML potentielle

- **Fichier :** `资源/Js插件/礼物背包/（9.13）背包.js`
- **Ligne :** 3521
- **Extrait lu :** `transferList.innerHTML = list`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 23. [moyen] injection HTML potentielle

- **Fichier :** `资源/Js插件/礼物背包/（9.13）背包.js`
- **Ligne :** 3554
- **Extrait lu :** `targetEditList.innerHTML = \``
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 24. [moyen] injection HTML potentielle

- **Fichier :** `资源/Js插件/礼物背包/（9.13）背包.js`
- **Ligne :** 3567
- **Extrait lu :** `row.innerHTML = \``
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 25. [moyen] injection HTML potentielle

- **Fichier :** `资源/Js插件/礼物背包/（9.13）背包.js`
- **Ligne :** 3579
- **Extrait lu :** `targetEditList.innerHTML = "";`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 26. [moyen] injection HTML potentielle

- **Fichier :** `资源/Js插件/礼物背包/（9.13）背包.js`
- **Ligne :** 3977
- **Extrait lu :** `modalEl.innerHTML = \``
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 27. [moyen] injection HTML potentielle

- **Fichier :** `资源/Js插件/礼物背包/（9.13）背包.js`
- **Ligne :** 4114
- **Extrait lu :** `listContainer.innerHTML = \``
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 28. [moyen] injection HTML potentielle

- **Fichier :** `资源/Js插件/礼物背包/（9.13）背包.js`
- **Ligne :** 4180
- **Extrait lu :** `card.innerHTML = \``
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 29. [moyen] injection HTML potentielle

- **Fichier :** `资源/Js插件/礼物背包/（9.13）背包.js`
- **Ligne :** 4229
- **Extrait lu :** `listContainer.innerHTML = "";`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 30. [moyen] injection HTML potentielle

- **Fichier :** `资源/Js插件/礼物背包/（9.13）背包.js`
- **Ligne :** 4533
- **Extrait lu :** `btn.innerHTML = \``
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 31. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 1009
- **Extrait lu :** `button.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"/></svg>';`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 32. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 1080
- **Extrait lu :** `saveButton.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.5h10a1.5 1.5 0 0 1 1.5 1.5v14l-6.5-4-6.5 4V6A1.5 1.5 0 0 1 7 4.5Z"/><path d="M`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 33. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 1087
- **Extrait lu :** `closeButton.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>';`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 34. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 1784
- **Extrait lu :** `sidebarHandle.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 6 6 6-6 6"/></svg>';`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 35. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 1805
- **Extrait lu :** `sidebarHandle.innerHTML = sidebarOpen`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 36. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 1885
- **Extrait lu :** `button.innerHTML = icons[icon];`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 37. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 260
- **Extrait lu :** `const phase=label=>{if(timing)timing.phases.push({name:label,at:Math.round(performance.now()-timing.started)});phaseName=label;if(busy&&job)job.querySelector('.`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 38. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 285
- **Extrait lu :** `job.innerHTML=\`<div class="dt-job-handle" title="按住拖动"><span aria-hidden="true">⠿</span> 按住这里拖动</div><span class="dt-job-status"><i class="dt-dot"></i>${esc(lab`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 39. [moyen] requête SQL construite par concaténation

- **Fichier :** ``
- **Ligne :** 299
- **Extrait lu :** `function perspectives(value){return \`<label for="dt-perspective">叙述视角</label><select id="dt-perspective" name="perspective">${Object.entries(PERSPECTIVES).map((`
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 40. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 331
- **Extrait lu :** `article.innerHTML=\`<div class="dt-divider"><span>第 ${s.pendingReply.round} 轮 · 正在续写</span></div><div class="dt-bubble dt-user"><div class="dt-speaker">YOU · 你的落`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 41. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 385
- **Extrait lu :** `ui.innerHTML=(notice?\`<div class="dt-toast" role="status">${esc(notice)}</div>\`:'')+top+readerNav+\`<main class="dt-scroll ${view.page==='reader'?'dt-reader':''}`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 42. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 533
- **Extrait lu :** `button.innerHTML='<div class="chat-plus-icon-box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-li`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 43. [moyen] injection HTML potentielle

- **Fichier :** `资源/Js插件/图片管理插件/2.1.4_图库管家.js`
- **Ligne :** 194
- **Extrait lu :** `tpl.innerHTML = svgMarkup(name, size);`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 44. [moyen] injection HTML potentielle

- **Fichier :** `资源/Js插件/图片管理插件/2.1.4_图库管家.js`
- **Ligne :** 1179
- **Extrait lu :** `root.innerHTML = SHELL_HTML;`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 45. [moyen] injection HTML potentielle

- **Fichier :** `资源/Js插件/图片管理插件/2.1.4_图库管家.js`
- **Ligne :** 1419
- **Extrait lu :** `listEl.innerHTML = "";`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 46. [moyen] injection HTML potentielle

- **Fichier :** `资源/Js插件/图片管理插件/2.1.4_图库管家.js`
- **Ligne :** 2296
- **Extrait lu :** `btn.innerHTML = "";`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 47. [moyen] injection HTML potentielle

- **Fichier :** `资源/Js插件/图片管理插件/2.1.4_图库管家.js`
- **Ligne :** 2305
- **Extrait lu :** `host.innerHTML = "";`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 48. [moyen] injection HTML potentielle

- **Fichier :** `资源/Js插件/图片管理插件/2.1.4_图库管家.js`
- **Ligne :** 2343
- **Extrait lu :** `host.innerHTML = "";`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 49. [moyen] injection HTML potentielle

- **Fichier :** `资源/Js插件/改自虚拟时间/虚拟时钟-有弹窗.js`
- **Ligne :** 1222
- **Extrait lu :** `el.innerHTML =`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 50. [moyen] injection HTML potentielle

- **Fichier :** `资源/Js插件/改自虚拟时间/虚拟时钟-有弹窗.js`
- **Ligne :** 1280
- **Extrait lu :** `el.innerHTML =`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 51. [moyen] injection HTML potentielle

- **Fichier :** `资源/Js插件/改自虚拟时间/虚拟时钟-有弹窗.js`
- **Ligne :** 1538
- **Extrait lu :** `panelOverlay.innerHTML = panelHtml;`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 52. [moyen] injection HTML potentielle

- **Fichier :** `资源/Js插件/改自虚拟时间/虚拟时钟-有弹窗.js`
- **Ligne :** 1783
- **Extrait lu :** `el.innerHTML = buildPanelGroupHtml();`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 53. [moyen] injection HTML potentielle

- **Fichier :** `资源/Js插件/改自虚拟时间/虚拟时钟-有弹窗.js`
- **Ligne :** 1803
- **Extrait lu :** `if (listEl) listEl.innerHTML = buildPanelCharHtml();`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 54. [moyen] injection HTML potentielle

- **Fichier :** `资源/Js插件/改自虚拟时间/虚拟时钟-有弹窗.js`
- **Ligne :** 1862
- **Extrait lu :** `te.innerHTML = mainTime;`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 55. [moyen] injection HTML potentielle

- **Fichier :** `资源/Js插件/改自虚拟时间/虚拟时钟-有弹窗.js`
- **Ligne :** 2081
- **Extrait lu :** `el.innerHTML =`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 56. [moyen] injection HTML potentielle

- **Fichier :** `资源/Js插件/改自虚拟时间/虚拟时钟-有弹窗.js`
- **Ligne :** 2190
- **Extrait lu :** `setGroupListEl.innerHTML = '<div style="padding:14px;text-align:center;color:#bbb;font-size:13px">暂无群聊</div>';`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 57. [moyen] injection HTML potentielle

- **Fichier :** `资源/Js插件/改自虚拟时间/虚拟时钟-有弹窗.js`
- **Ligne :** 2203
- **Extrait lu :** `setGroupListEl.innerHTML = gHtml;`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 58. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 1099
- **Extrait lu :** `container.innerHTML = "";`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 59. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 1123
- **Extrait lu :** `root.innerHTML = \``
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 60. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 1264
- **Extrait lu :** `card.innerHTML = \``
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 61. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 1337
- **Extrait lu :** `root.innerHTML = \``
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 62. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 1538
- **Extrait lu :** `root.innerHTML = \``
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 63. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 1607
- **Extrait lu :** `previewBox.innerHTML = \`<img src="${val}" style="width:100%;height:100%;object-fit:cover;" alt="" />\`;`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 64. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 1609
- **Extrait lu :** `previewBox.innerHTML = \`<span style="font-size:22px;">${val || "🎭"}</span>\`;`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 65. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 1719
- **Extrait lu :** `ball.innerHTML = \``
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 66. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 1838
- **Extrait lu :** `el.innerHTML = "";`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 67. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 1865
- **Extrait lu :** `btn.innerHTML = \``
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 68. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 1898
- **Extrait lu :** `btn.innerHTML = \``
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 69. [moyen] injection HTML potentielle

- **Fichier :** `资源/Js插件/改自虚拟时间/虚拟时钟-没弹窗.js`
- **Ligne :** 1233
- **Extrait lu :** `el.innerHTML =`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 70. [moyen] injection HTML potentielle

- **Fichier :** `资源/Js插件/改自虚拟时间/虚拟时钟-没弹窗.js`
- **Ligne :** 1491
- **Extrait lu :** `panelOverlay.innerHTML = panelHtml;`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 71. [moyen] injection HTML potentielle

- **Fichier :** `资源/Js插件/改自虚拟时间/虚拟时钟-没弹窗.js`
- **Ligne :** 1736
- **Extrait lu :** `el.innerHTML = buildPanelGroupHtml();`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 72. [moyen] injection HTML potentielle

- **Fichier :** `资源/Js插件/改自虚拟时间/虚拟时钟-没弹窗.js`
- **Ligne :** 1756
- **Extrait lu :** `if (listEl) listEl.innerHTML = buildPanelCharHtml();`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 73. [moyen] injection HTML potentielle

- **Fichier :** `资源/Js插件/改自虚拟时间/虚拟时钟-没弹窗.js`
- **Ligne :** 1815
- **Extrait lu :** `te.innerHTML = mainTime;`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 74. [moyen] injection HTML potentielle

- **Fichier :** `资源/Js插件/改自虚拟时间/虚拟时钟-没弹窗.js`
- **Ligne :** 2034
- **Extrait lu :** `el.innerHTML =`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 75. [moyen] injection HTML potentielle

- **Fichier :** `资源/Js插件/改自虚拟时间/虚拟时钟-没弹窗.js`
- **Ligne :** 2143
- **Extrait lu :** `setGroupListEl.innerHTML = '<div style="padding:14px;text-align:center;color:#bbb;font-size:13px">暂无群聊</div>';`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 76. [moyen] injection HTML potentielle

- **Fichier :** `资源/Js插件/改自虚拟时间/虚拟时钟-没弹窗.js`
- **Ligne :** 2156
- **Extrait lu :** `setGroupListEl.innerHTML = gHtml;`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 77. [moyen] injection HTML potentielle

- **Fichier :** `资源/线上美化/你ins我不/你ins我不v2.js`
- **Ligne :** 153
- **Extrait lu :** `button.innerHTML = icons[name].replace("<svg ", '<svg data-ins-glyph="' + name + '" ');`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 78. [moyen] injection HTML potentielle

- **Fichier :** `资源/线上美化/你ins我不/你ins我不v2.js`
- **Ligne :** 233
- **Extrait lu :** `button.innerHTML = glyph;`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 79. [moyen] injection HTML potentielle

- **Fichier :** `资源/线上美化/你ins我不/你ins我不v2.js`
- **Ligne :** 279
- **Extrait lu :** `el.innerHTML = glyph;`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 80. [moyen] injection HTML potentielle

- **Fichier :** `资源/线上美化/你ins我不/你ins我不v2.js`
- **Ligne :** 379
- **Extrait lu :** `button.innerHTML = glyph + "<span>" + label + "</span>";`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 81. [moyen] injection HTML potentielle

- **Fichier :** `资源/线上美化/你ins我不/你ins我不v2.js`
- **Ligne :** 451
- **Extrait lu :** `icon.innerHTML = play.replace('<svg ', '<svg data-ins-voice-play="true" ');`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 82. [moyen] injection HTML potentielle

- **Fichier :** `资源/线上美化/你ins我不/你ins我不v2.js`
- **Ligne :** 456
- **Extrait lu :** `bars.innerHTML = wave;`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 83. [moyen] injection HTML potentielle

- **Fichier :** `资源/线上美化/你ins我不/你ins我不v2.js`
- **Ligne :** 496
- **Extrait lu :** `bubble.innerHTML = "<i></i><i></i><i></i>";`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 84. [moyen] injection HTML potentielle

- **Fichier :** `资源/线上美化/你ins我不/你ins我不v2.js`
- **Ligne :** 623
- **Extrait lu :** `if (button.isConnected) button.innerHTML = markup;`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 85. [moyen] injection HTML potentielle

- **Fichier :** `资源/线上美化/你ins我不/你ins我不v2.js`
- **Ligne :** 641
- **Extrait lu :** `if (node.isConnected) node.innerHTML = markup;`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 86. [moyen] injection HTML potentielle

- **Fichier :** `资源/线上美化/你ins我不/你ins我不v2.js`
- **Ligne :** 726
- **Extrait lu :** `for (const [button, markup] of originalIcons) if (button.isConnected) button.innerHTML = markup;`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 87. [moyen] injection HTML potentielle

- **Fichier :** `资源/线上美化/你ins我不/你ins我不v2.js`
- **Ligne :** 732
- **Extrait lu :** `for (const [node, markup] of originalVoiceMarkup) if (node.isConnected) node.innerHTML = markup;`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 88. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 1062
- **Extrait lu :** `modalEl.innerHTML = "";`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 89. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 1067
- **Extrait lu :** `root.innerHTML = "";`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 90. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 1073
- **Extrait lu :** `header.innerHTML = \``
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 91. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 1100
- **Extrait lu :** `btn.innerHTML = \``
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 92. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 1126
- **Extrait lu :** `statusCard.innerHTML = \``
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 93. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 1150
- **Extrait lu :** `card.innerHTML = \``
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 94. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 1180
- **Extrait lu :** `card.innerHTML = \``
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 95. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 1207
- **Extrait lu :** `topBar.innerHTML = \``
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 96. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 1220
- **Extrait lu :** `statusCard.innerHTML = \``
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 97. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 1246
- **Extrait lu :** `appBox.innerHTML = \``
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 98. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 1277
- **Extrait lu :** `card.innerHTML = \``
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 99. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 1306
- **Extrait lu :** `card.innerHTML = \``
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 100. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 1345
- **Extrait lu :** `card.innerHTML = \``
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 101. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 1396
- **Extrait lu :** `row.innerHTML = \``
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 102. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 1434
- **Extrait lu :** `topBar.innerHTML = \``
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 103. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 1464
- **Extrait lu :** `card.innerHTML = \``
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 104. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 1587
- **Extrait lu :** `selRemote.innerHTML = \`<option value="">▼ 成功拉取到 ${list.length} 个模型 (点击填入)</option>\` +`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 105. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 1605
- **Extrait lu :** `row.innerHTML = \``
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 106. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 1649
- **Extrait lu :** `topBar.innerHTML = \``
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 107. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 1734
- **Extrait lu :** `card.innerHTML = \``
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 108. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 1769
- **Extrait lu :** `wrap.innerHTML = \``
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 109. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 1882
- **Extrait lu :** `fab.innerHTML = \`<span class="cube-fab-icon">🎨</span>\`;`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 110. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 1984
- **Extrait lu :** `panel.innerHTML = \``
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 111. [moyen] injection HTML potentielle

- **Fichier :** `资源/Js插件/聊天头像切换插件/聊天头像切换-v1.1.11.js`
- **Ligne :** 1091
- **Extrait lu :** `handle.innerHTML = '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4.5 20c.8-4.2 3.3-6.3 7.5-6.3s6.7 2.1 7.5 6.3"/></svg>';`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 112. [moyen] injection HTML potentielle

- **Fichier :** `资源/Js插件/聊天头像切换插件/聊天头像切换-v1.1.11.js`
- **Ligne :** 1113
- **Extrait lu :** `button.innerHTML = svg;`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 113. [moyen] injection HTML potentielle

- **Fichier :** `资源/Js插件/聊天头像切换插件/聊天头像切换-v1.1.11.js`
- **Ligne :** 1173
- **Extrait lu :** `heading.innerHTML = \`<div class="fav-title"></div><div class="fav-muted"></div>\`;`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 114. [moyen] injection HTML potentielle

- **Fichier :** `资源/Js插件/聊天头像切换插件/聊天头像切换-v1.1.11.js`
- **Ligne :** 1391
- **Extrait lu :** `nameField.innerHTML = '<span class="fav-label">图片名称（角色按这个名称选择）</span>';`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 115. [moyen] injection HTML potentielle

- **Fichier :** `资源/Js插件/消息emoji回应/（9.10更新）消息表情回应.js`
- **Ligne :** 885
- **Extrait lu :** `modalEl.innerHTML = \``
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 116. [moyen] injection HTML potentielle

- **Fichier :** `资源/Js插件/消息emoji回应/（9.10更新）消息表情回应.js`
- **Ligne :** 1094
- **Extrait lu :** `cssPresetSelect.innerHTML = \`<option value="">— 选择预设 —</option>\`;`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 117. [moyen] injection HTML potentielle

- **Fichier :** `资源/Js插件/消息emoji回应/（9.10更新）消息表情回应.js`
- **Ligne :** 1467
- **Extrait lu :** `arrowBtn.innerHTML = \`<svg viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"></polyline></svg>\`;`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 118. [moyen] injection HTML potentielle

- **Fichier :** `资源/Js插件/消息emoji回应/（9.10更新）消息表情回应.js`
- **Ligne :** 1748
- **Extrait lu :** `wrapper.innerHTML = "";`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 119. [moyen] injection HTML potentielle

- **Fichier :** `资源/Js插件/虚拟时间/虚拟时钟.js`
- **Ligne :** 1155
- **Extrait lu :** `el.innerHTML =`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 120. [moyen] injection HTML potentielle

- **Fichier :** `资源/Js插件/虚拟时间/虚拟时钟.js`
- **Ligne :** 1388
- **Extrait lu :** `panelOverlay.innerHTML = panelHtml;`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 121. [moyen] injection HTML potentielle

- **Fichier :** `资源/Js插件/虚拟时间/虚拟时钟.js`
- **Ligne :** 1548
- **Extrait lu :** `if (listEl) listEl.innerHTML = buildPanelCharHtml();`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 122. [moyen] injection HTML potentielle

- **Fichier :** `资源/Js插件/虚拟时间/虚拟时钟.js`
- **Ligne :** 1607
- **Extrait lu :** `te.innerHTML = mainTime;`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 123. [moyen] injection HTML potentielle

- **Fichier :** `资源/Js插件/虚拟时间/虚拟时钟.js`
- **Ligne :** 1805
- **Extrait lu :** `el.innerHTML =`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 124. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 562
- **Extrait lu :** `info.innerHTML = \``
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 125. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 578
- **Extrait lu :** `wipeText.innerHTML = \`导入前先删除该会话在文件时间范围内的旧消息<div class="ip-wipe-desc">⚠️ 勾选后，会先删除目标会话里 ${first.timeText || ""} 到 ${last.timeText || ""} 之间的现有消息，再导入新文件。此操作不可撤销。</`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 126. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 589
- **Extrait lu :** `item.innerHTML = \`<div class="ip-meta">${escapeHtml(m.timeText || "")} · ${escapeHtml(meta)}</div>${escapeHtml(m.content.slice(0, 100))}${m.content.length > 100`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 127. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 967
- **Extrait lu :** `body.innerHTML = "";`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 128. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 970
- **Extrait lu :** `footer.innerHTML = \`<span>${lexicon.intents.length} 意图 · ${tp} 触发词 · ${tr2} 回复</span><span>保存在插件本地</span>\`;`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 129. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 974
- **Extrait lu :** `stats.innerHTML = \``
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 130. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 1012
- **Extrait lu :** `chatBox.innerHTML = \`<div class="lb-chat-export-title">聊天记录导出（先预览再下载）</div>\`;`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 131. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 1077
- **Extrait lu :** `b.innerHTML = \`<div class="lb-eb-title">${cfg.title}</div><div class="lb-eb-desc">${cfg.desc}</div>\`;`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 132. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 1159
- **Extrait lu :** `testCard.innerHTML = \``
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 133. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 1182
- **Extrait lu :** `resultEl.innerHTML = hits.map((h) => {`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 134. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 1205
- **Extrait lu :** `ih.innerHTML = \`<span class="lb-intent-name">${escapeHtml(intent.name)}</span><span class="lb-intent-meta">${intent.patterns.length} 触发 · ${intent.responses.len`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 135. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 1215
- **Extrait lu :** `nf.innerHTML = \`<div class="lb-field-label">意图名称</div>\`;`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 136. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 1222
- **Extrait lu :** `pf.innerHTML = \`<div class="lb-field-label">触发词（点×删除，回车添加）</div>\`;`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 137. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 1225
- **Extrait lu :** `pl.innerHTML = "";`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 138. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 1226
- **Extrait lu :** `if (intent.patterns.length === 0) pl.innerHTML = '<span style="color:#bbb;font-size:12px;">暂无</span>';`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 139. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 1230
- **Extrait lu :** `tag.innerHTML = \`${escapeHtml(p)} <span class="lb-tag-remove">×</span>\`;`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 140. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 1251
- **Extrait lu :** `rf.innerHTML = \`<div class="lb-field-label">回复（每行一条）</div>\`;`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 141. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 1275
- **Extrait lu :** `el.innerHTML = "";`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 142. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 1285
- **Extrait lu :** `el.innerHTML = "";`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 143. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 1051
- **Extrait lu :** `els.list.innerHTML = "";`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 144. [moyen] injection HTML potentielle

- **Fichier :** `资源/Js插件/反查岗/透镜 (1).js`
- **Ligne :** 51
- **Extrait lu :** `el.innerHTML = \``
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 145. [moyen] injection HTML potentielle

- **Fichier :** `资源/Js插件/反查岗/透镜 (1).js`
- **Ligne :** 426
- **Extrait lu :** `el.innerHTML = renderUniversalDossierHTML(msg.mediaData || {});`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 146. [moyen] injection HTML potentielle

- **Fichier :** `资源/Js插件/反查岗/透镜 (1).js`
- **Ligne :** 844
- **Extrait lu :** `floatingBallEl.innerHTML = \`<span class="editorial-status-lamp"></span>\`;`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 147. [moyen] injection HTML potentielle

- **Fichier :** `资源/Js插件/反查岗/透镜 (1).js`
- **Ligne :** 849
- **Extrait lu :** `floatingPanelEl.innerHTML = \``
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 148. [moyen] injection HTML potentielle

- **Fichier :** `资源/Js插件/反查岗/透镜 (1).js`
- **Ligne :** 1060
- **Extrait lu :** `userItem.innerHTML = \``
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 149. [moyen] injection HTML potentielle

- **Fichier :** `资源/Js插件/反查岗/透镜 (1).js`
- **Ligne :** 1117
- **Extrait lu :** `charItem.innerHTML = \``
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 150. [moyen] injection HTML potentielle

- **Fichier :** `资源/Js插件/反查岗/透镜 (1).js`
- **Ligne :** 1216
- **Extrait lu :** `btn.innerHTML = \`<span style="display:inline-flex; align-items:center; gap:5px;">${ICONS.aperture} <span>主动受审</span></span>\`;`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 151. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 520
- **Extrait lu :** `list.innerHTML = "";`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 152. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 565
- **Extrait lu :** `host.innerHTML = "";`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 153. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 625
- **Extrait lu :** `wrap.innerHTML = "";`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 154. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 717
- **Extrait lu :** `addSlot.innerHTML = "";`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 155. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 744
- **Extrait lu :** `ce("button", { style: BTN, text: "取消", onclick: () => (addSlot.innerHTML = "") }),`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 156. [moyen] injection HTML potentielle

- **Fichier :** `资源/Js插件/会话管理器/session-manager.mjs`
- **Ligne :** 931
- **Extrait lu :** `empty.innerHTML = \`<span class="menu-desc">${emptyText}</span>\`;`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 157. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 551
- **Extrait lu :** `add.innerHTML = '<span aria-hidden="true">＋</span>';`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 158. [moyen] injection HTML potentielle

- **Fichier :** `资源/Js插件/消息提醒设置/消息提醒设置.js`
- **Ligne :** 292
- **Extrait lu :** `el.innerHTML = \``
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 159. [moyen] injection HTML potentielle

- **Fichier :** `资源/Js插件/消息提醒设置/消息提醒设置.js`
- **Ligne :** 323
- **Extrait lu :** `listContainer.innerHTML = \`<div style="text-align:center;color:#9ca3af;padding:20px 0;font-size:14px;">暂无待办提醒</div>\`;`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 160. [moyen] injection HTML potentielle

- **Fichier :** `资源/Js插件/消息提醒设置/消息提醒设置.js`
- **Ligne :** 327
- **Extrait lu :** `listContainer.innerHTML = items.map(item => {`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 161. [moyen] requête SQL construite par concaténation

- **Fichier :** `资源/Js插件/消息提醒设置/消息提醒设置.js`
- **Ligne :** 361
- **Extrait lu :** `<button class="todo-delete-btn" data-source="${safeSource}" data-id="${safeId}" style="background:none;border:none;padding:4px;cursor:pointer;color:#ef4444;disp`
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 162. [moyen] injection HTML potentielle

- **Fichier :** `资源/Js插件/消息提醒设置/消息提醒设置.js`
- **Ligne :** 412
- **Extrait lu :** `el.innerHTML = \``
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 163. [moyen] injection HTML potentielle

- **Fichier :** `资源/Js插件/消息提醒设置/消息提醒设置.js`
- **Ligne :** 486
- **Extrait lu :** `el.innerHTML = '';`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 164. [moyen] injection HTML potentielle

- **Fichier :** `资源/Js插件/消息提醒设置/消息提醒设置.js`
- **Ligne :** 521
- **Extrait lu :** `el.innerHTML = '';`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 165. [moyen] injection HTML potentielle

- **Fichier :** `资源/Js插件/消息提醒设置/消息提醒设置.js`
- **Ligne :** 559
- **Extrait lu :** `el.innerHTML = html;`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 166. [moyen] injection HTML potentielle

- **Fichier :** `资源/Js插件/消息提醒设置/消息提醒设置.js`
- **Ligne :** 566
- **Extrait lu :** `el.innerHTML = '';`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 167. [moyen] injection HTML potentielle

- **Fichier :** `资源/Js插件/消息提醒设置/消息提醒设置.js`
- **Ligne :** 613
- **Extrait lu :** `el.innerHTML = \``
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 168. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 862
- **Extrait lu :** `container.innerHTML = "";`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 169. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 867
- **Extrait lu :** `modalEl.innerHTML = \``
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 170. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 899
- **Extrait lu :** `modalEl.innerHTML = \``
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 171. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 978
- **Extrait lu :** `tasksBox.innerHTML = "";`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 172. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 984
- **Extrait lu :** `item.innerHTML = \``
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 173. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 1072
- **Extrait lu :** `item.innerHTML = \``
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 174. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 1152
- **Extrait lu :** `el.innerHTML = "";`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 175. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 1156
- **Extrait lu :** `el.innerHTML = "";`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 176. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 1161
- **Extrait lu :** `el.innerHTML = "";`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 177. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 1172
- **Extrait lu :** `pill.innerHTML = \``
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 178. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 1183
- **Extrait lu :** `pill.innerHTML = \``
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 179. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 1213
- **Extrait lu :** `el.innerHTML = "";`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 180. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 1218
- **Extrait lu :** `el.innerHTML = "";`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 181. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 1221
- **Extrait lu :** `item.innerHTML = \`<span>🌱</span><span>角色成长手帐</span>\`;`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 182. [moyen] injection HTML potentielle

- **Fichier :** ``
- **Ligne :** 1234
- **Extrait lu :** `el.innerHTML = "";`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 183. [moyen] injection HTML potentielle

- **Fichier :** `资源/Js插件/可发多图仿微信/仿微信.js`
- **Ligne :** 532
- **Extrait lu :** `if (!images || !images.length) { el.innerHTML = ""; return; }`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 184. [moyen] injection HTML potentielle

- **Fichier :** `资源/Js插件/可发多图仿微信/仿微信.js`
- **Ligne :** 537
- **Extrait lu :** `el.innerHTML = "";`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 185. [moyen] injection HTML potentielle

- **Fichier :** `资源/Js插件/可发多图仿微信/仿微信.js`
- **Ligne :** 551
- **Extrait lu :** `cardsBox.innerHTML = "";`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 186. [moyen] injection HTML potentielle

- **Fichier :** `资源/Js插件/可发多图仿微信/仿微信.js`
- **Ligne :** 920
- **Extrait lu :** `btn.innerHTML = \``
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 187. [faible] URL en clair (non HTTPS)

- **Fichier :** `资源/Js插件/礼物背包/（9.13）背包.js`
- **Ligne :** 283
- **Extrait lu :** `close: \`<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="ro`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 188. [faible] URL en clair (non HTTPS)

- **Fichier :** `资源/Js插件/礼物背包/（9.13）背包.js`
- **Ligne :** 284
- **Extrait lu :** `sparkles: \`<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap=`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 189. [faible] URL en clair (non HTTPS)

- **Fichier :** `资源/Js插件/礼物背包/（9.13）背包.js`
- **Ligne :** 286
- **Extrait lu :** `descendingMenu: \`<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 190. [faible] URL en clair (non HTTPS)

- **Fichier :** `资源/Js插件/礼物背包/（9.13）背包.js`
- **Ligne :** 287
- **Extrait lu :** `refresh: \`<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 191. [faible] URL en clair (non HTTPS)

- **Fichier :** `资源/Js插件/礼物背包/（9.13）背包.js`
- **Ligne :** 288
- **Extrait lu :** `manageList: \`<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-lineca`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 192. [faible] URL en clair (non HTTPS)

- **Fichier :** `资源/Js插件/礼物背包/（9.13）背包.js`
- **Ligne :** 289
- **Extrait lu :** `plus: \`<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="r`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 193. [faible] URL en clair (non HTTPS)

- **Fichier :** `资源/Js插件/礼物背包/（9.13）背包.js`
- **Ligne :** 290
- **Extrait lu :** `trash: \`<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="ro`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 194. [faible] URL en clair (non HTTPS)

- **Fichier :** `资源/Js插件/礼物背包/（9.13）背包.js`
- **Ligne :** 291
- **Extrait lu :** `ban: \`<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="roun`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 195. [faible] URL en clair (non HTTPS)

- **Fichier :** `资源/Js插件/礼物背包/（9.13）背包.js`
- **Ligne :** 292
- **Extrait lu :** `camera: \`<svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="r`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 196. [faible] URL en clair (non HTTPS)

- **Fichier :** `资源/Js插件/礼物背包/（9.13）背包.js`
- **Ligne :** 293
- **Extrait lu :** `upload: \`<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="r`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 197. [faible] URL en clair (non HTTPS)

- **Fichier :** `资源/Js插件/礼物背包/（9.13）背包.js`
- **Ligne :** 294
- **Extrait lu :** `eye: \`<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="roun`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 198. [faible] URL en clair (non HTTPS)

- **Fichier :** `资源/Js插件/礼物背包/（9.13）背包.js`
- **Ligne :** 295
- **Extrait lu :** `group: \`<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="ro`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 199. [faible] URL en clair (non HTTPS)

- **Fichier :** `资源/Js插件/图片管理插件/2.1.4_图库管家.js`
- **Ligne :** 190
- **Extrait lu :** `return '<svg xmlns="http://www.w3.org/2000/svg" width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" st`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 200. [faible] URL en clair (non HTTPS)

- **Fichier :** ``
- **Ligne :** 567
- **Extrait lu :** `if (cleanStr.startsWith("data:") || cleanStr.startsWith("http://") || cleanStr.startsWith("https://")) {`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 201. [faible] URL en clair (non HTTPS)

- **Fichier :** ``
- **Ligne :** 591
- **Extrait lu :** `if (av.startsWith("data:") || av.startsWith("http://") || av.startsWith("https://")) {`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 202. [faible] URL en clair (non HTTPS)

- **Fichier :** `资源/Js插件/聊天头像切换插件/聊天头像切换-v1.1.11.js`
- **Ligne :** 1445
- **Extrait lu :** `ctx.ui.toast("URL 需要以 http:// 或 https:// 开头");`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 203. [faible] URL en clair (non HTTPS)

- **Fichier :** ``
- **Ligne :** 119
- **Extrait lu :** `"localhost", "http://", "https://", "api/", ".json", ".js", ".ts",`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 204. [faible] URL en clair (non HTTPS)

- **Fichier :** ``
- **Ligne :** 71
- **Extrait lu :** `const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 205. [faible] URL en clair (non HTTPS)

- **Fichier :** ``
- **Ligne :** 79
- **Extrait lu :** `const r = document.createElementNS("http://www.w3.org/2000/svg", "rect");`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 206. [faible] URL en clair (non HTTPS)

- **Fichier :** `资源/Js插件/反查岗/透镜 (1).js`
- **Ligne :** 977
- **Extrait lu :** `photoUrl: isPhoto ? "data:image/svg+xml;utf8,<svg width='200' height='200' xmlns='http://www.w3.org/2000/svg'><rect width='200' height='200' fill='%23eee'/><tex`
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