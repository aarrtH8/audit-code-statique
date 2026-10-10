# Rapport d'audit statique — gaspolymerase/biomanager

**Date :** 2026-10-10
**Dépôt analysé :** https://github.com/gaspolymerase/biomanager
**Fichiers lus :** 30
**Généré par :** Automaton DeepSeek — analyse statique par motifs, via l'archive publique du dépôt (aucun code exécuté).

> **Nature de ce document.** Ce sont des **alertes à vérifier**, pas des vulnérabilités confirmées.
> Chaque ligne citée a été lue dans le dépôt à l'adresse indiquée. Un motif peut être légitime
> (exemple, test, code mort). Ce rapport **ne remplace pas** une revue de sécurité humaine,
> un test d'intrusion ni un scan des dépendances. Aucun code n'a été exécuté.

## Synthèse — 156 constat(s)

| Sévérité | Nombre |
|---|---|
| critique | 0 |
| eleve | 14 |
| moyen | 138 |
| faible | 4 |

## Constats

### 1. [eleve] évaluation de code dynamique

- **Fichier :** `app/static/bench-calcs.js`
- **Ligne :** 1743
- **Extrait lu :** `const m = re.exec(text);`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 2. [eleve] exécution de commande système

- **Fichier :** `app/services.py`
- **Ligne :** 409
- **Extrait lu :** `"""Readings outlive a deleted water system (2026-09-25), so`
- **À vérifier :** retracer l'origine des arguments ; entrée externe = injection probable.

### 3. [eleve] évaluation de code dynamique

- **Fichier :** `app/static/notebook-page.js`
- **Ligne :** 367
- **Extrait lu :** `var m = /(^|\s)@([\w.-]*)$/.exec(before);`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 4. [eleve] évaluation de code dynamique

- **Fichier :** `app/static/notebook-page.js`
- **Ligne :** 1325
- **Extrait lu :** `var m = /^#comment-(\d+)/.exec(location.hash);`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 5. [eleve] exécution de commande système

- **Fichier :** `tests/test_zebrafish.py`
- **Ligne :** 27
- **Extrait lu :** `def make_system(client, name=None, **fields) -> int:`
- **À vérifier :** retracer l'origine des arguments ; entrée externe = injection probable.

### 6. [eleve] exécution de commande système

- **Fichier :** `tests/test_zebrafish.py`
- **Ligne :** 300
- **Extrait lu :** `system = make_system(self.m, name, room="B1", target_temp_c="28.5")`
- **À vérifier :** retracer l'origine des arguments ; entrée externe = injection probable.

### 7. [eleve] exécution de commande système

- **Fichier :** `tests/test_zebrafish.py`
- **Ligne :** 313
- **Extrait lu :** `system = make_system(self.a)`
- **À vérifier :** retracer l'origine des arguments ; entrée externe = injection probable.

### 8. [eleve] exécution de commande système

- **Fichier :** `tests/test_zebrafish.py`
- **Ligne :** 326
- **Extrait lu :** `system = make_system(self.a, name)`
- **À vérifier :** retracer l'origine des arguments ; entrée externe = injection probable.

### 9. [eleve] exécution de commande système

- **Fichier :** `tests/test_zebrafish.py`
- **Ligne :** 327
- **Extrait lu :** `other = make_system(self.a)`
- **À vérifier :** retracer l'origine des arguments ; entrée externe = injection probable.

### 10. [eleve] exécution de commande système

- **Fichier :** `tests/test_zebrafish.py`
- **Ligne :** 339
- **Extrait lu :** `system = make_system(self.a)`
- **À vérifier :** retracer l'origine des arguments ; entrée externe = injection probable.

### 11. [eleve] exécution de commande système

- **Fichier :** `tests/test_zebrafish.py`
- **Ligne :** 346
- **Extrait lu :** `system = make_system(self.a)`
- **À vérifier :** retracer l'origine des arguments ; entrée externe = injection probable.

### 12. [eleve] exécution de commande système

- **Fichier :** `tests/test_zebrafish.py`
- **Ligne :** 357
- **Extrait lu :** `theirs = make_system(self.a)`
- **À vérifier :** retracer l'origine des arguments ; entrée externe = injection probable.

### 13. [eleve] exécution de commande système

- **Fichier :** `tests/test_zebrafish.py`
- **Ligne :** 358
- **Extrait lu :** `mine = make_system(self.m)`
- **À vérifier :** retracer l'origine des arguments ; entrée externe = injection probable.

### 14. [eleve] exécution de commande système

- **Fichier :** `tests/test_zebrafish.py`
- **Ligne :** 365
- **Extrait lu :** `system = make_system(self.m)`
- **À vérifier :** retracer l'origine des arguments ; entrée externe = injection probable.

### 15. [moyen] requête SQL construite par concaténation

- **Fichier :** `app/static/bench-calcs.js`
- **Ligne :** 505
- **Extrait lu :** `{ key: 'reagent', label: t('Reagent'), type: 'select', options: REAGENTS.map((r, i) => [String(i), \`${t(r[0])} (${fmt(r[1])} %)\`]) },`
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 16. [moyen] requête SQL construite par concaténation

- **Fichier :** `app/static/bench-calcs.js`
- **Ligne :** 669
- **Extrait lu :** `const out = { lines: [L(t('Insert'), \`${fmt(ng)} ng\`, true), L(t('Vector, in moles'), \`${fmt(fmolV)} fmol\`), L(t('Insert, in moles'), \`${fmt(fmolV * n(v, 'ratio`
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 17. [moyen] requête SQL construite par concaténation

- **Fichier :** `app/static/bench-calcs.js`
- **Ligne :** 671
- **Extrait lu :** `if (ok(iul)) out.lines.push(L(t('Insert to add'), \`${fmt(iul)} µL\`, true));`
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 18. [moyen] requête SQL construite par concaténation

- **Fichier :** `app/static/bench-calcs.js`
- **Ligne :** 1411
- **Extrait lu :** `{ key: 'medium', label: t('Medium'), type: 'select', options: [['premix', t('LB agar premix (40 g/L)')], ['broth', t('LB broth (25 g/L) + agar (15 g/L)')]] },`
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 19. [moyen] requête SQL construite par concaténation

- **Fichier :** `app/lab_notebook.py`
- **Ligne :** 262
- **Extrait lu :** `return (session.scalar(select(func.max(NotebookPage.position)).where(NotebookPage.tab_id_fk == tab_id)) or 0) + 1`
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 20. [moyen] requête SQL construite par concaténation

- **Fichier :** `app/organism_routes.py`
- **Ligne :** 2032
- **Extrait lu :** `f"{'delete' if action == 'delete' else 'set ' + field} ×{len(editable)} "`
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 21. [moyen] requête SQL construite par concaténation

- **Fichier :** `app/organism_routes.py`
- **Ligne :** 2103
- **Extrait lu :** `f"{'delete' if action == 'delete' else 'set ' + field} ×{len(editable)} "`
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 22. [moyen] injection HTML potentielle

- **Fichier :** `app/static/notebook-page.js`
- **Ligne :** 104
- **Extrait lu :** `el.innerHTML = message;`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 23. [moyen] injection HTML potentielle

- **Fichier :** `app/static/notebook-page.js`
- **Ligne :** 190
- **Extrait lu :** `list.innerHTML = '<div class="notebook-template-loading">' + t('Loading…') + '</div>';`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 24. [moyen] injection HTML potentielle

- **Fichier :** `app/static/notebook-page.js`
- **Ligne :** 193
- **Extrait lu :** `list.innerHTML = '<div class="notebook-template-empty">' + t('None yet. Use “Save as template” on any page, or make one below.') + '</div>';`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 25. [moyen] injection HTML potentielle

- **Fichier :** `app/static/notebook-page.js`
- **Ligne :** 196
- **Extrait lu :** `list.innerHTML = d.templates.map(function (tpl) {`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 26. [moyen] requête SQL construite par concaténation

- **Fichier :** `app/static/notebook-page.js`
- **Ligne :** 204
- **Extrait lu :** `(tpl.can_delete ? '<button type="button" class="notebook-template-del" title="' + t('Delete template') + '" aria-label="' + t('Delete template') + '" data-del-t`
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 27. [moyen] injection HTML potentielle

- **Fichier :** `app/static/notebook-page.js`
- **Ligne :** 206
- **Extrait lu :** `}).catch(function () { list.innerHTML = '<div class="notebook-template-empty">' + t('Could not load templates.') + '</div>'; });`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 28. [moyen] injection HTML potentielle

- **Fichier :** `app/static/notebook-page.js`
- **Ligne :** 285
- **Extrait lu :** `box.innerHTML = '<p class="nb-muted">' + t('Loading…') + '</p>';`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 29. [moyen] injection HTML potentielle

- **Fichier :** `app/static/notebook-page.js`
- **Ligne :** 286
- **Extrait lu :** `drawerBody.innerHTML = '';`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 30. [moyen] injection HTML potentielle

- **Fichier :** `app/static/notebook-page.js`
- **Ligne :** 310
- **Extrait lu :** `box.innerHTML =`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 31. [moyen] requête SQL construite par concaténation

- **Fichier :** `app/static/notebook-page.js`
- **Ligne :** 315
- **Extrait lu :** `'<form class="nb-field-row" id="nb-share-add"><select id="nb-share-who" aria-label="' + t('Person or project group') + '">' + (options || '<option value="">' + `
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 32. [moyen] requête SQL construite par concaténation

- **Fichier :** `app/static/notebook-page.js`
- **Ligne :** 316
- **Extrait lu :** `'<select id="nb-share-role" aria-label="' + t('Role') + '"><option value="edit">' + t('can edit') + '</option><option value="view">' + t('can view') + '</option`
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 33. [moyen] requête SQL construite par concaténation

- **Fichier :** `app/static/notebook-page.js`
- **Ligne :** 322
- **Extrait lu :** `'<select data-share-role="' + esc(s.username) + '"><option value="edit"' + (s.role === 'edit' ? ' selected' : '') + '>' + t('can edit') + '</option><option valu`
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 34. [moyen] injection HTML potentielle

- **Fichier :** `app/static/notebook-page.js`
- **Ligne :** 347
- **Extrait lu :** `}).catch(function (e) { box.innerHTML = '<p class="nb-warn">' + esc(e.message) + '</p>'; });`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 35. [moyen] injection HTML potentielle

- **Fichier :** `app/static/notebook-page.js`
- **Ligne :** 376
- **Extrait lu :** `menu.innerHTML = hits.map(function (p) { return '<button type="button" data-user="' + esc(p.username) + '"><b>' + esc(p.name) + '</b> <small>@' + esc(p.username`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 36. [moyen] requête SQL construite par concaténation

- **Fichier :** `app/static/notebook-page.js`
- **Ligne :** 434
- **Extrait lu :** `(c.can_delete ? '<button type="button" class="nb-icon-btn" data-comment-delete="' + c.id + '" aria-label="' + t('Delete comment') + '">' + icon('trash') + '</bu`
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 37. [moyen] injection HTML potentielle

- **Fichier :** `app/static/notebook-page.js`
- **Ligne :** 451
- **Extrait lu :** `box.innerHTML =`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 38. [moyen] injection HTML potentielle

- **Fichier :** `app/static/notebook-page.js`
- **Ligne :** 489
- **Extrait lu :** `}).catch(function (e) { box.innerHTML = '<p class="nb-warn">' + esc(e.message) + '</p>'; });`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 39. [moyen] requête SQL construite par concaténation

- **Fichier :** `app/static/notebook-page.js`
- **Ligne :** 567
- **Extrait lu :** `'<label>' + t('What you are saying') + ' <select id="nb-sig-meaning"><option value="sign">' + esc(d.meanings.sign) + '</option>' +`
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 40. [moyen] requête SQL construite par concaténation

- **Fichier :** `app/static/notebook-page.js`
- **Ligne :** 568
- **Extrait lu :** `'<option value="review">' + esc(d.meanings.review) + '</option></select></label>' + identity +`
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 41. [moyen] injection HTML potentielle

- **Fichier :** `app/static/notebook-page.js`
- **Ligne :** 580
- **Extrait lu :** `box.innerHTML = (d.locked ? '<p class="nb-sig-state is-locked">' + t('Signed and locked.') + '</p>' : (d.signed ? '<p class="nb-sig-state">' + t('Being amended:`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 42. [moyen] injection HTML potentielle

- **Fichier :** `app/static/notebook-page.js`
- **Ligne :** 600
- **Extrait lu :** `}).catch(function (err) { box.innerHTML = '<p class="nb-error">' + esc(err.message) + '</p>'; });`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 43. [moyen] injection HTML potentielle

- **Fichier :** `app/static/notebook-page.js`
- **Ligne :** 608
- **Extrait lu :** `if (!d.versions.length) { box.innerHTML = '<p class="nb-muted">' + t('No versions yet: they are kept as the page is edited.') + '</p>'; return; }`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 44. [moyen] injection HTML potentielle

- **Fichier :** `app/static/notebook-page.js`
- **Ligne :** 610
- **Extrait lu :** `box.innerHTML = (canEdit ? '<div class="nb-field-row"><button type="button" class="btn" id="nb-save-version">' + icon('success') + ' ' + t('Save a named version`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 45. [moyen] injection HTML potentielle

- **Fichier :** `app/static/notebook-page.js`
- **Ligne :** 632
- **Extrait lu :** `}).catch(function (e) { box.innerHTML = '<p class="nb-warn">' + esc(e.message) + '</p>'; });`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 46. [moyen] injection HTML potentielle

- **Fichier :** `app/static/notebook-page.js`
- **Ligne :** 638
- **Extrait lu :** `view.innerHTML = '<p class="nb-muted">' + t('Loading…') + '</p>';`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 47. [moyen] injection HTML potentielle

- **Fichier :** `app/static/notebook-page.js`
- **Ligne :** 641
- **Extrait lu :** `view.innerHTML = '<div class="nb-version-head"><b>' + esc(d.version.title) + '</b> · ' + esc(timeText(d.version.saved_at)) +`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 48. [moyen] injection HTML potentielle

- **Fichier :** `app/static/notebook-page.js`
- **Ligne :** 649
- **Extrait lu :** `$('.nb-version-body', view).innerHTML = m.dataset.vmode === 'diff' ? diffHtml(lineDiff(d.version.body, current)) : '<pre class="nb-version-text">' + esc(d.versi`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 49. [moyen] injection HTML potentielle

- **Fichier :** `app/static/notebook-page.js`
- **Ligne :** 668
- **Extrait lu :** `box.innerHTML = '<form class="nb-search" id="nb-search">' +`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 50. [moyen] requête SQL construite par concaténation

- **Fichier :** `app/static/notebook-page.js`
- **Ligne :** 671
- **Extrait lu :** `'<select name="kind" aria-label="' + t('Kind') + '"><option value="">' + t('Any kind') + '</option>' + Object.keys(kinds).map(function (k) { return '<option val`
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 51. [moyen] requête SQL construite par concaténation

- **Fichier :** `app/static/notebook-page.js`
- **Ligne :** 672
- **Extrait lu :** `'<select name="status" aria-label="' + t('Status') + '"><option value="">' + t('Any status') + '</option>' + Object.keys(statuses).filter(Boolean).map(function `
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 52. [moyen] requête SQL construite par concaténation

- **Fichier :** `app/static/notebook-page.js`
- **Ligne :** 673
- **Extrait lu :** `'<select name="whose" aria-label="' + t('Whose') + '"><option value="all">' + t('Mine & shared') + '</option><option value="mine">' + t('Mine') + '</option><opt`
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 53. [moyen] requête SQL construite par concaténation

- **Fichier :** `app/static/notebook-page.js`
- **Ligne :** 674
- **Extrait lu :** `'<div class="nb-field-row"><select name="tag" aria-label="' + t('Tag') + '"><option value="">' + t('Any tag') + '</option></select>' +`
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 54. [moyen] injection HTML potentielle

- **Fichier :** `app/static/notebook-page.js`
- **Ligne :** 679
- **Extrait lu :** `form.tag.innerHTML = '<option value="">' + t('Any tag') + '</option>' + d.tags.map(function (t) { return '<option value="' + esc(t.tag) + '"' + (t.tag === opts.`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 55. [moyen] injection HTML potentielle

- **Fichier :** `app/static/notebook-page.js`
- **Ligne :** 686
- **Extrait lu :** `out.innerHTML = d.results.length ? '<p class="nb-muted">' + t(d.results.length === 1 ? '%(n)s page' : '%(n)s pages', { n: d.results.length + (d.results.length =`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 56. [moyen] injection HTML potentielle

- **Fichier :** `app/static/notebook-page.js`
- **Ligne :** 692
- **Extrait lu :** `}).catch(function (e) { out.innerHTML = '<p class="nb-warn">' + esc(e.message) + '</p>'; });`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 57. [moyen] injection HTML potentielle

- **Fichier :** `app/static/notebook-page.js`
- **Ligne :** 720
- **Extrait lu :** `box.innerHTML = (d.series.length ? d.series.map(card).join('') : '<p class="nb-muted">' + t('No meetings yet. Set one up and the notebook keeps track of who pre`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 58. [moyen] injection HTML potentielle

- **Fichier :** `app/static/notebook-page.js`
- **Ligne :** 741
- **Extrait lu :** `}).catch(function (e) { box.innerHTML = '<p class="nb-warn">' + esc(e.message) + '</p>'; });`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 59. [moyen] injection HTML potentielle

- **Fichier :** `app/static/notebook-page.js`
- **Ligne :** 754
- **Extrait lu :** `holder.innerHTML = '<form class="nb-series-form"><h4>' + (s ? t('Edit %(name)s', { name: esc(s.name) }) : t('New meeting series')) + '</h4>' +`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 60. [moyen] requête SQL construite par concaténation

- **Fichier :** `app/static/notebook-page.js`
- **Ligne :** 756
- **Extrait lu :** `'<div class="nb-field-row"><label>' + t('Every') + ' <select name="weekday"><option value="">' + t('— day —') + '</option>' + weekdays.map(function (w, i) { ret`
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 61. [moyen] requête SQL construite par concaténation

- **Fichier :** `app/static/notebook-page.js`
- **Ligne :** 762
- **Extrait lu :** `'<div class="nb-field-row"><select id="nb-series-add"><option value="">' + t('Add someone…') + '</option>' + list.filter(function (p) { return members.indexOf(p`
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 62. [moyen] requête SQL construite par concaténation

- **Fichier :** `app/static/notebook-page.js`
- **Ligne :** 765
- **Extrait lu :** `(s && (s.owner === me.username) ? '<span class="nb-grow"></span><button type="button" class="btn-link is-danger" data-delete-series>' + t('Delete') + '</button>`
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 63. [moyen] injection HTML potentielle

- **Fichier :** `app/static/notebook-page.js`
- **Ligne :** 780
- **Extrait lu :** `if (b.dataset.cancel !== undefined) holder.innerHTML = '';`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 64. [moyen] requête SQL construite par concaténation

- **Fichier :** `app/static/notebook-page.js`
- **Ligne :** 820
- **Extrait lu :** `(insertable ? '<button type="button" class="btn" data-insert-page="' + p.id + '">' + tc('notebook', 'Insert') + '</button>' : '') +`
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 65. [moyen] requête SQL construite par concaténation

- **Fichier :** `app/static/notebook-page.js`
- **Ligne :** 826
- **Extrait lu :** `(insertable ? '<button type="button" class="btn" data-insert-preset="' + esc(p.key) + '">' + tc('notebook', 'Insert') + '</button>' : '') +`
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 66. [moyen] injection HTML potentielle

- **Fichier :** `app/static/notebook-page.js`
- **Ligne :** 831
- **Extrait lu :** `box.innerHTML =`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 67. [moyen] injection HTML potentielle

- **Fichier :** `app/static/notebook-page.js`
- **Ligne :** 867
- **Extrait lu :** `}).catch(function (e) { box.innerHTML = '<p class="nb-warn">' + esc(e.message) + '</p>'; });`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 68. [moyen] injection HTML potentielle

- **Fichier :** `app/static/notebook-page.js`
- **Ligne :** 878
- **Extrait lu :** `box.innerHTML = d.experiments.length ? '<ul class="nb-list">' + d.experiments.map(function (x) {`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 69. [moyen] injection HTML potentielle

- **Fichier :** `app/static/notebook-page.js`
- **Ligne :** 1064
- **Extrait lu :** `linkedBox.innerHTML = '<button type="button" class="nb-linked-toggle" aria-expanded="false">' + icon('link') + ' ' +`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 70. [moyen] injection HTML potentielle

- **Fichier :** `app/static/notebook-page.js`
- **Ligne :** 1145
- **Extrait lu :** `box.innerHTML = parts.length ? '<span class="meta-sep">·</span>' + parts.join(' · ') : '';`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 71. [moyen] injection HTML potentielle

- **Fichier :** `app/static/notebook-page.js`
- **Ligne :** 1155
- **Extrait lu :** `tagsBox.innerHTML = (page.tags || []).map(function (tag) {`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 72. [moyen] injection HTML potentielle

- **Fichier :** `app/static/notebook-page.js`
- **Ligne :** 1162
- **Extrait lu :** `$('#nb-tag-list', tagsBox).innerHTML = d.tags.map(function (t) { return '<option value="' + esc(t.tag) + '">'; }).join('');`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 73. [moyen] injection HTML potentielle

- **Fichier :** `app/static/notebook-page.js`
- **Ligne :** 1236
- **Extrait lu :** `overlay.innerHTML = '<div class="notebook-modal-backdrop" data-x></div><div class="notebook-modal-card nb-source-card" role="dialog" aria-label="Markdown">' +`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 74. [moyen] injection HTML potentielle

- **Fichier :** `app/static/notebook-page.js`
- **Ligne :** 1262
- **Extrait lu :** `box.innerHTML = peers.map(function (p) {`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 75. [moyen] injection HTML potentielle

- **Fichier :** `app/static/notebook-page.js`
- **Ligne :** 1293
- **Extrait lu :** `banner.innerHTML = '<strong>' + t('The editor isn’t built yet.') + '</strong> ' + t('Run this once in a terminal, then refresh. Until then you can write in plai`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 76. [moyen] injection HTML potentielle

- **Fichier :** `app/static/notebook-page.js`
- **Ligne :** 1340
- **Extrait lu :** `mountEl.innerHTML = '';`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 77. [moyen] injection HTML potentielle

- **Fichier :** `app/static/notebook-page.js`
- **Ligne :** 1358
- **Extrait lu :** `mountEl.innerHTML = '';`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 78. [moyen] injection HTML potentielle

- **Fichier :** `app/static/calendar-page.js`
- **Ligne :** 234
- **Extrait lu :** `tuiHost.innerHTML = \`<div class="cal-empty">${t("The calendar didn't load (%(status)s). Run <code>npm run build:calendar</code> and reload.", { status })}</div>`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 79. [moyen] injection HTML potentielle

- **Fichier :** `app/static/calendar-page.js`
- **Ligne :** 414
- **Extrait lu :** `titleEl.innerHTML = html;`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 80. [moyen] injection HTML potentielle

- **Fichier :** `app/static/calendar-page.js`
- **Ligne :** 475
- **Extrait lu :** `listHost.innerHTML = \`<div class="cal-empty">${t('Nothing in these six weeks.')}</div>\`;`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 81. [moyen] injection HTML potentielle

- **Fichier :** `app/static/calendar-page.js`
- **Ligne :** 487
- **Extrait lu :** `listHost.innerHTML = Array.from(groups.entries()).map(([day, dayItems]) => {`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 82. [moyen] injection HTML potentielle

- **Fichier :** `app/static/calendar-page.js`
- **Ligne :** 562
- **Extrait lu :** `grid.innerHTML = html;`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 83. [moyen] injection HTML potentielle

- **Fichier :** `app/static/calendar-page.js`
- **Ligne :** 574
- **Extrait lu :** `list.innerHTML = eq.length`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 84. [moyen] injection HTML potentielle

- **Fichier :** `app/static/calendar-page.js`
- **Ligne :** 580
- **Extrait lu :** `select.innerHTML = eq.map((e) => \`<option value="${e.id}">${escapeHtml(e.name)}${e.location ? ' · ' + escapeHtml(e.location) : ''}</option>\`).join('');`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 85. [moyen] requête SQL construite par concaténation

- **Fichier :** `app/static/calendar-page.js`
- **Ligne :** 580
- **Extrait lu :** `select.innerHTML = eq.map((e) => \`<option value="${e.id}">${escapeHtml(e.name)}${e.location ? ' · ' + escapeHtml(e.location) : ''}</option>\`).join('');`
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 86. [moyen] injection HTML potentielle

- **Fichier :** `app/static/calendar-page.js`
- **Ligne :** 596
- **Extrait lu :** `list.innerHTML = (protocols.templates.length ? '' : \`<li class="cal-muted">${t('Write one under Edit, then start it on a day 0.')}</li>\`) + buttons;`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 87. [moyen] injection HTML potentielle

- **Fichier :** `app/static/calendar-page.js`
- **Ligne :** 599
- **Extrait lu :** `list.innerHTML = live.slice(0, 6).map((r) => {`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 88. [moyen] injection HTML potentielle

- **Fichier :** `app/static/calendar-page.js`
- **Ligne :** 624
- **Extrait lu :** `list.innerHTML = coverReport.map((a) => {`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 89. [moyen] requête SQL construite par concaténation

- **Fichier :** `app/static/calendar-page.js`
- **Ligne :** 631
- **Extrait lu :** `? \`<label class="cal-cover-pick">${t('Covered by')} <select data-cover="${a.id}">${options(a.cover, a.owner)}</select></label>\``
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 90. [moyen] injection HTML potentielle

- **Fichier :** `app/static/calendar-page.js`
- **Ligne :** 789
- **Extrait lu :** `select.innerHTML = (blank ? [\`<option value="">${blank}</option>\`] : [])`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 91. [moyen] requête SQL construite par concaténation

- **Fichier :** `app/static/calendar-page.js`
- **Ligne :** 789
- **Extrait lu :** `select.innerHTML = (blank ? [\`<option value="">${blank}</option>\`] : [])`
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 92. [moyen] injection HTML potentielle

- **Fichier :** `app/static/calendar-page.js`
- **Ligne :** 848
- **Extrait lu :** `delBtn.innerHTML = \`${svgIcon('trash')} ${rep ? t('Delete all') : kind === 'booking' ? t('Cancel booking') : t('Delete')}\`;`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 93. [moyen] requête SQL construite par concaténation

- **Fichier :** `app/static/calendar-page.js`
- **Ligne :** 1058
- **Extrait lu :** `const url = kind === 'booking' ? \`/calendar/bookings/${id}/delete\` : kind === 'away' ? \`/calendar/away/${id}/delete\``
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 94. [moyen] injection HTML potentielle

- **Fichier :** `app/static/calendar-page.js`
- **Ligne :** 1108
- **Extrait lu :** `templateSelect.innerHTML = protocols.templates.map((tpl) => \`<option value="${tpl.id}">${t('%(name)s (%(n)s days)', { name: escapeHtml(tpl.name), n: tpl.days })`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 95. [moyen] requête SQL construite par concaténation

- **Fichier :** `app/static/calendar-page.js`
- **Ligne :** 1108
- **Extrait lu :** `templateSelect.innerHTML = protocols.templates.map((tpl) => \`<option value="${tpl.id}">${t('%(name)s (%(n)s days)', { name: escapeHtml(tpl.name), n: tpl.days })`
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 96. [moyen] injection HTML potentielle

- **Fichier :** `app/static/calendar-page.js`
- **Ligne :** 1110
- **Extrait lu :** `$('#cal-run-experiment').innerHTML = [\`<option value="">${t('None')}</option>\`]`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 97. [moyen] injection HTML potentielle

- **Fichier :** `app/static/calendar-page.js`
- **Ligne :** 1132
- **Extrait lu :** `$('#cal-run-preview').innerHTML = steps.length ? steps.map((s) => {`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 98. [moyen] injection HTML potentielle

- **Fichier :** `app/static/calendar-page.js`
- **Ligne :** 1179
- **Extrait lu :** `$('#cal-tpl-list').innerHTML = protocols.templates.map((tpl) => \``
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 99. [moyen] injection HTML potentielle

- **Fichier :** `app/static/calendar-page.js`
- **Ligne :** 1198
- **Extrait lu :** `$('#cal-tpl-steps').innerHTML = '';`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 100. [moyen] injection HTML potentielle

- **Fichier :** `app/static/calendar-page.js`
- **Ligne :** 1211
- **Extrait lu :** `li.innerHTML = \`<input type="number" name="step_from" value="${step.from}" min="-365" max="3650" aria-label="${t('From day')}">`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 101. [moyen] injection HTML potentielle

- **Fichier :** `app/static/calendar-page.js`
- **Ligne :** 1274
- **Extrait lu :** `$('#cal-equip-manage-list').innerHTML = (DATA.equipment || []).map((e) => \``
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 102. [moyen] injection HTML potentielle

- **Fichier :** `app/static/calendar-page.js`
- **Ligne :** 1292
- **Extrait lu :** `else equipSubmit.innerHTML = addLabel;`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 103. [moyen] injection HTML potentielle

- **Fichier :** `app/static/calendar-page.js`
- **Ligne :** 1399
- **Extrait lu :** `hoverCard.innerHTML = \``
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 104. [moyen] injection HTML potentielle

- **Fichier :** `app/static/calendar-page.js`
- **Ligne :** 1454
- **Extrait lu :** `subsListEl.innerHTML = \`<li class="biocal-subs-empty">${t('No subscriptions yet. Paste an iCal URL above to add one.')}</li>\`;`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 105. [moyen] injection HTML potentielle

- **Fichier :** `app/static/calendar-page.js`
- **Ligne :** 1457
- **Extrait lu :** `subsListEl.innerHTML = subs.map((s) => \``
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 106. [moyen] requête SQL construite par concaténation

- **Fichier :** `app/static/calendar-page.js`
- **Ligne :** 1468
- **Extrait lu :** `<button type="button" class="biocal-btn" data-action="delete" title="${t('Remove')}">${svgIcon('trash')}</button>`
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 107. [moyen] injection HTML potentielle

- **Fichier :** `app/static/calendar-page.js`
- **Ligne :** 1491
- **Extrait lu :** `googleStatusEl.innerHTML = \`<span class="muted-inline">${t("Google Calendar isn't set up on this server.")}</span>\`;`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 108. [moyen] injection HTML potentielle

- **Fichier :** `app/static/calendar-page.js`
- **Ligne :** 1493
- **Extrait lu :** `googleStatusEl.innerHTML = \``
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 109. [moyen] injection HTML potentielle

- **Fichier :** `app/static/calendar-page.js`
- **Ligne :** 1501
- **Extrait lu :** `googleStatusEl.innerHTML = \`<a href="/calendar/google/connect" class="biocal-btn is-primary biocal-google-connect">${t('Connect Google Calendar')}</a>`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 110. [moyen] injection HTML potentielle

- **Fichier :** `app/static/calendar-page.js`
- **Ligne :** 1504
- **Extrait lu :** `googleStatusEl.innerHTML = \`<div class="biocal-google-unconfigured">${t("Google Calendar isn't configured on this server yet. An admin sets <code>GOOGLE_OAUTH_C`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 111. [moyen] requête SQL construite par concaténation

- **Fichier :** `tests/test_plasmids.py`
- **Ligne :** 610
- **Extrait lu :** `number = (one("select max(plasmid_id) from plasmids") or 0) + 500    # a number far from its row id`
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 112. [moyen] requête SQL construite par concaténation

- **Fichier :** `tests/test_plasmids.py`
- **Ligne :** 753
- **Extrait lu :** `gone = one("select coalesce(max(id), 0) + 1000 from plasmids")`
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 113. [moyen] requête SQL construite par concaténation

- **Fichier :** `tests/test_plasmids.py`
- **Ligne :** 785
- **Extrait lu :** `gone = one("select coalesce(max(id), 0) + 1000 from plasmid_boxes")`
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 114. [moyen] requête SQL construite par concaténation

- **Fichier :** `tests/test_plasmids.py`
- **Ligne :** 1079
- **Extrait lu :** `base = one("select coalesce(max(plasmid_id), 0) from plasmids") + 1000`
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 115. [moyen] requête SQL construite par concaténation

- **Fichier :** `tests/test_plasmids.py`
- **Ligne :** 1182
- **Extrait lu :** `gone_box = one("select max(id) + 1000 from plasmid_boxes")`
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 116. [moyen] requête SQL construite par concaténation

- **Fichier :** `tests/test_plasmids.py`
- **Ligne :** 1184
- **Extrait lu :** `gone = one("select max(id) + 1000 from plasmids")`
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 117. [moyen] requête SQL construite par concaténation

- **Fichier :** `tests/test_plasmids.py`
- **Ligne :** 1196
- **Extrait lu :** `first = one("select coalesce(max(plasmid_id), 0) + 1 from plasmids")`
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 118. [moyen] requête SQL construite par concaténation

- **Fichier :** `tests/test_plasmids.py`
- **Ligne :** 1328
- **Extrait lu :** `gone = one("select coalesce(max(id), 0) + 1000 from plasmids")`
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 119. [moyen] requête SQL construite par concaténation

- **Fichier :** `tests/test_inventory.py`
- **Ligne :** 765
- **Extrait lu :** `first = one("select coalesce(max(number), 0) + 1 from inventory_items where module_id_fk=?", module_id(self.key))`
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 120. [moyen] requête SQL construite par concaténation

- **Fichier :** `tests/test_colony_tabs.py`
- **Ligne :** 54
- **Extrait lu :** `self.assertEqual(one("select date_of_birth from litters where litter_id=?", f"L-{top + 1}"), T)`
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 121. [moyen] requête SQL construite par concaténation

- **Fichier :** `tests/test_colony_tabs.py`
- **Ligne :** 166
- **Extrait lu :** `missing = one("select coalesce(max(mouse_id), 0) + 1000 from mice")`
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 122. [moyen] requête SQL construite par concaténation

- **Fichier :** `tests/test_colony_tabs.py`
- **Ligne :** 542
- **Extrait lu :** `missing = one("select coalesce(max(mouse_id), 0) + 1000 from mice")`
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 123. [moyen] requête SQL construite par concaténation

- **Fichier :** `tests/test_notebook.py`
- **Ligne :** 700
- **Extrait lu :** `s.query(UserAccount).filter_by(username=guest).update({"expires_at": datetime.utcnow() + timedelta(days=30)})`
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 124. [moyen] requête SQL construite par concaténation

- **Fichier :** `app/organism_service.py`
- **Ligne :** 421
- **Extrait lu :** `capabilities.insert(capabilities.index("housing") + 1, "housing_grid")`
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 125. [moyen] injection HTML potentielle

- **Fichier :** `app/static/experiment-page.js`
- **Ligne :** 87
- **Extrait lu :** `if (list) list.innerHTML = D.groups.map((g) => \`<option value="${esc(g)}">\`).join('');`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 126. [moyen] injection HTML potentielle

- **Fichier :** `app/static/experiment-page.js`
- **Ligne :** 127
- **Extrait lu :** `table.innerHTML = '';`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 127. [moyen] injection HTML potentielle

- **Fichier :** `app/static/experiment-page.js`
- **Ligne :** 128
- **Extrait lu :** `empty.innerHTML = t('No %(nouns)s yet.', { nouns: esc(nouns()) }) + (D.editable ? \` ${t('<b>Add %(nouns)s</b> to start.', { nouns: esc(nouns()) })}\` : '');`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 128. [moyen] injection HTML potentielle

- **Fichier :** `app/static/experiment-page.js`
- **Ligne :** 168
- **Extrait lu :** `table.innerHTML = \`<thead><tr>${head.join('')}</tr></thead><tbody>${body}</tbody>\`;`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 129. [moyen] injection HTML potentielle

- **Fichier :** `app/static/experiment-page.js`
- **Ligne :** 281
- **Extrait lu :** `host.innerHTML = \`<p class="xp-empty">${t('No %(readout)s yet.', { readout: esc(RL().toLowerCase()) })} ${D.editable ? t("<b>%(verb)s</b> the %(nouns)s, or type`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 130. [moyen] injection HTML potentielle

- **Fichier :** `app/static/experiment-page.js`
- **Ligne :** 331
- **Extrait lu :** `host.innerHTML = \`${svg}<div class="xp-tip" hidden></div><div class="xp-legend">${legend}<span class="xp-muted">${fraction() && pct ? t('% of those at the start`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 131. [moyen] injection HTML potentielle

- **Fichier :** `app/static/experiment-page.js`
- **Ligne :** 340
- **Extrait lu :** `$('[data-xp-stats-table]').innerHTML = \`<table class="dense-table fit-table"><thead><tr><th>${tc('experiment', 'Day')}</th><th>${t('Groups')}</th><th>${tc('expe`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 132. [moyen] injection HTML potentielle

- **Fichier :** `app/static/experiment-page.js`
- **Ligne :** 353
- **Extrait lu :** `tip.innerHTML = \`${title ? \`<b>${esc(title)}</b>\` : ''}${esc(target.dataset.tip).replace(/\n/g, '<br>')}\`;`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 133. [moyen] injection HTML potentielle

- **Fichier :** `app/static/experiment-page.js`
- **Ligne :** 369
- **Extrait lu :** `list.innerHTML = \`<li class="xp-empty">${t('Nothing planned yet.')}${D.editable ? \` ${t('<b>Plan</b> the manipulations and readout days, or <b>Record manipulati`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 134. [moyen] injection HTML potentielle

- **Fichier :** `app/static/experiment-page.js`
- **Ligne :** 374
- **Extrait lu :** `list.innerHTML = [...byDay.entries()].map(([day, rows]) => \``
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 135. [moyen] injection HTML potentielle

- **Fichier :** `app/static/experiment-page.js`
- **Ligne :** 400
- **Extrait lu :** `select.innerHTML = D.kinds.map((k) => \`<option value="${esc(k.key)}" ${k.key === chosen ? 'selected' : ''}>${esc(k.key === 'reading' ? t('%(readout)s day', { re`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 136. [moyen] requête SQL construite par concaténation

- **Fichier :** `app/static/experiment-page.js`
- **Ligne :** 400
- **Extrait lu :** `select.innerHTML = D.kinds.map((k) => \`<option value="${esc(k.key)}" ${k.key === chosen ? 'selected' : ''}>${esc(k.key === 'reading' ? t('%(readout)s day', { re`
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 137. [moyen] injection HTML potentielle

- **Fichier :** `app/static/experiment-page.js`
- **Ligne :** 403
- **Extrait lu :** `select.innerHTML = [\`<option value="">${esc(t('Every %(noun)s', { noun: noun() }))}</option>\`, ...D.groups.map((g) => \`<option value="${esc(g)}" ${g === chosen `
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 138. [moyen] requête SQL construite par concaténation

- **Fichier :** `app/static/experiment-page.js`
- **Ligne :** 403
- **Extrait lu :** `select.innerHTML = [\`<option value="">${esc(t('Every %(noun)s', { noun: noun() }))}</option>\`, ...D.groups.map((g) => \`<option value="${esc(g)}" ${g === chosen `
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 139. [moyen] injection HTML potentielle

- **Fichier :** `app/static/experiment-page.js`
- **Ligne :** 407
- **Extrait lu :** `select.innerHTML = \`<option value="">${esc(t('None recorded'))}</option>\` + (D.reagents || []).map((r) => \`<option value="${r.id}" ${Number(chosen) === r.id ? '`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 140. [moyen] requête SQL construite par concaténation

- **Fichier :** `app/static/experiment-page.js`
- **Ligne :** 407
- **Extrait lu :** `select.innerHTML = \`<option value="">${esc(t('None recorded'))}</option>\` + (D.reagents || []).map((r) => \`<option value="${r.id}" ${Number(chosen) === r.id ? '`
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 141. [moyen] injection HTML potentielle

- **Fichier :** `app/static/experiment-page.js`
- **Ligne :** 425
- **Extrait lu :** `groups.innerHTML = '<option value="">—</option>' + add.groups.map(([v, l, n]) => \`<option value="${esc(v)}">${esc(l)} (${n})</option>\`).join('');`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 142. [moyen] injection HTML potentielle

- **Fichier :** `app/static/experiment-page.js`
- **Ligne :** 426
- **Extrait lu :** `single.innerHTML = '<option value="">—</option>' + add.single.map(([v, l]) => \`<option value="${esc(v)}">${esc(l)}</option>\`).join('');`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 143. [moyen] injection HTML potentielle

- **Fichier :** `app/static/experiment-page.js`
- **Ligne :** 450
- **Extrait lu :** `$('[data-xp-regimens]', dialog).innerHTML = saved.length ? \`<label class="xp-regimen-pick">${t('Start from a saved regimen')}`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 144. [moyen] requête SQL construite par concaténation

- **Fichier :** `app/static/experiment-page.js`
- **Ligne :** 451
- **Extrait lu :** `<span class="xp-row"><select data-xp-regimen>${saved.map((r) => \`<option value="${r.id}">${esc(r.name)} — ${esc(r.summary)}${r.mine ? '' : \` (${esc(r.owner)})\`}`
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 145. [moyen] requête SQL construite par concaténation

- **Fichier :** `app/static/experiment-page.js`
- **Ligne :** 453
- **Extrait lu :** `<button type="button" class="xp-link xp-danger" data-xp-regimen-delete aria-label="${esc(t('Delete this saved regimen'))}" title="${esc(t('Delete this saved reg`
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 146. [moyen] injection HTML potentielle

- **Fichier :** `app/static/experiment-page.js`
- **Ligne :** 456
- **Extrait lu :** `list.innerHTML = D.steps.length ? \`<table class="dense-table fit-table xp-plan"><thead><tr><th>${t('Days')}</th><th>${t('Kind')}</th><th>${t('What')}</th><th>${`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 147. [moyen] requête SQL construite par concaténation

- **Fichier :** `app/static/experiment-page.js`
- **Ligne :** 460
- **Extrait lu :** `<td class="xp-actions"><button type="button" class="xp-link" data-xp-edit="${s.id}">${t('Edit')}</button><button type="button" class="xp-link xp-danger" data-xp`
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 148. [moyen] injection HTML potentielle

- **Fichier :** `app/static/experiment-page.js`
- **Ligne :** 535
- **Extrait lu :** `f.which.innerHTML = group(tc('experiment', 'Due'), due) + \`<option value="adhoc">${esc(t('Something not in the plan…'))}</option>\` + group(t('To come'), later) `
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 149. [moyen] injection HTML potentielle

- **Fichier :** `app/static/experiment-page.js`
- **Ligne :** 543
- **Extrait lu :** `$('[data-xp-sample-inventories]', dialog).innerHTML = inventories.map((i) => \`<option value="${esc(i.key)}">${esc(i.label)}</option>\`).join('');`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 150. [moyen] injection HTML potentielle

- **Fichier :** `app/static/experiment-page.js`
- **Ligne :** 576
- **Extrait lu :** `$('[data-xp-animals-head]', dialog).innerHTML = \`<tr><th><input type="checkbox" data-xp-all checked aria-label="${esc(t('All'))}"></th><th>${esc(cap(noun()))}</`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 151. [moyen] injection HTML potentielle

- **Fichier :** `app/static/experiment-page.js`
- **Ligne :** 578
- **Extrait lu :** `$('[data-xp-animals]', dialog).innerHTML = animals.length ? animals.map((a) => \`<tr>`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 152. [moyen] injection HTML potentielle

- **Fichier :** `app/static/experiment-page.js`
- **Ligne :** 661
- **Extrait lu :** `$('[data-xp-reading-rows]', dialog).innerHTML = D.subjects.map((s) => {`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 153. [faible] URL en clair (non HTTPS)

- **Fichier :** `app/organism_routes.py`
- **Ligne :** 1707
- **Extrait lu :** `return values, gettext("The gel image link must start with http:// or https://.")`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 154. [faible] URL en clair (non HTTPS)

- **Fichier :** `tests/test_colony_tabs.py`
- **Ligne :** 456
- **Extrait lu :** `execute("update mice set note=? where id=?", '=HYPERLINK("http://x.test","click")', col["mice"][0])`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 155. [faible] URL en clair (non HTTPS)

- **Fichier :** `tests/test_colony_tabs.py`
- **Ligne :** 463
- **Extrait lu :** `cells = [c for row in sheet.iter_rows() for c in row if c.value == '=HYPERLINK("http://x.test","click")']`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 156. [faible] URL en clair (non HTTPS)

- **Fichier :** `app/translations/zh/organisms.json`
- **Ligne :** 311
- **Extrait lu :** `"The gel image link must start with http:// or https://.": "电泳图链接必须以 http:// 或 https:// 开头。",`
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