<!-- LIVRABLE SCELLÉ — empreinte SHA-256 : b99bccfb73915ee5fa87501236fab38ebc8b51c87f9276a9c1e71293cc40d5e5 -->
# Rapport d'audit statique — aarrtH8/audit-code-statique

**Date :** 2026-10-18
**Dépôt analysé :** https://github.com/aarrtH8/audit-code-statique
**Fichiers lus :** 33
**Généré par :** Automaton DeepSeek — analyse statique par motifs, via l'archive publique du dépôt (aucun code exécuté).

> **Nature de ce document.** Ce sont des **alertes à vérifier**, pas des vulnérabilités confirmées.
> Chaque ligne citée a été lue dans le dépôt à l'adresse indiquée. Un motif peut être légitime
> (exemple, test, code mort). Ce rapport **ne remplace pas** une revue de sécurité humaine,
> un test d'intrusion ni un scan des dépendances. Aucun code n'a été exécuté.

## Synthèse — 30 constat(s)

| Sévérité | Nombre |
|---|---|
| critique | 0 |
| eleve | 13 |
| moyen | 10 |
| faible | 7 |

## Constats

### 1. [eleve] évaluation de code dynamique (eval / new Function)

- **Fichier :** `tools/audit-depot-dist.mjs`
- **Ligne :** 40
- **Extrait lu :** `{ id: 'eval',        niveau: 'motif', re: /\beval\s*\(/g, quoi: 'eval() — exécution de code dynamique' },`
- **À vérifier :** vérifier si la chaîne évaluée peut provenir d'une entrée externe.

### 2. [eleve] évaluation de code dynamique

- **Fichier :** `tools/audit-depot-dist.mjs`
- **Ligne :** 40
- **Extrait lu :** `{ id: 'eval',        niveau: 'motif', re: /\beval\s*\(/g, quoi: 'eval() — exécution de code dynamique' },`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 3. [eleve] évaluation de code dynamique

- **Fichier :** `tools/audit-depot-dist.mjs`
- **Ligne :** 115
- **Extrait lu :** `while ((mm = re.exec(texte)) !== null && n < 3) {`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 4. [eleve] secret probable en clair

- **Fichier :** `docs/exemple-vulnerable.mjs`
- **Ligne :** 5
- **Extrait lu :** `const apiKey = "XXXX_PLACEHOLDER_API_KEY_NE_PAS_UTILISER";`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 5. [eleve] secret probable en clair

- **Fichier :** `docs/exemple-vulnerable.mjs`
- **Ligne :** 6
- **Extrait lu :** `const DB_PASSWORD = "XXXX_PLACEHOLDER_MOT_DE_PASSE_EXEMPLE";`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 6. [eleve] exécution de commande avec valeur concaténée

- **Fichier :** `docs/exemple-vulnerable.mjs`
- **Ligne :** 21
- **Extrait lu :** `return execSync("tar -czf backup.tgz " + nomFichier).toString();`
- **À vérifier :** si une entrée externe atteint cette ligne, il y a injection de commande. Retracer l'origine des arguments.

### 7. [eleve] évaluation de code dynamique (eval / new Function)

- **Fichier :** `docs/exemple-vulnerable.mjs`
- **Ligne :** 26
- **Extrait lu :** `const data = eval("({ endpoint: '" + url + "' })");`
- **À vérifier :** vérifier si la chaîne évaluée peut provenir d'une entrée externe.

### 8. [eleve] évaluation de code dynamique

- **Fichier :** `docs/exemple-vulnerable.mjs`
- **Ligne :** 26
- **Extrait lu :** `const data = eval("({ endpoint: '" + url + "' })");`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 9. [eleve] secret probable en clair

- **Fichier :** `exemple-vulnerable.mjs`
- **Ligne :** 5
- **Extrait lu :** `const apiKey = "XXXX_PLACEHOLDER_API_KEY_NE_PAS_UTILISER";`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 10. [eleve] secret probable en clair

- **Fichier :** `exemple-vulnerable.mjs`
- **Ligne :** 6
- **Extrait lu :** `const DB_PASSWORD = "XXXX_PLACEHOLDER_MOT_DE_PASSE_EXEMPLE";`
- **À vérifier :** si ce secret est réel et actif, le révoquer immédiatement et le sortir du dépôt.

### 11. [eleve] exécution de commande avec valeur concaténée

- **Fichier :** `exemple-vulnerable.mjs`
- **Ligne :** 21
- **Extrait lu :** `return execSync("tar -czf backup.tgz " + nomFichier).toString();`
- **À vérifier :** si une entrée externe atteint cette ligne, il y a injection de commande. Retracer l'origine des arguments.

### 12. [eleve] évaluation de code dynamique (eval / new Function)

- **Fichier :** `exemple-vulnerable.mjs`
- **Ligne :** 26
- **Extrait lu :** `const data = eval("({ endpoint: '" + url + "' })");`
- **À vérifier :** vérifier si la chaîne évaluée peut provenir d'une entrée externe.

### 13. [eleve] évaluation de code dynamique

- **Fichier :** `exemple-vulnerable.mjs`
- **Ligne :** 26
- **Extrait lu :** `const data = eval("({ endpoint: '" + url + "' })");`
- **À vérifier :** vérifier la provenance de la chaîne évaluée.

### 14. [moyen] injection HTML potentielle

- **Fichier :** `audit-client.mjs`
- **Ligne :** 48
- **Extrait lu :** `{ id:'INNERHTML', gravite:'moyenne', rx:/(\.innerHTML\s*=|\.outerHTML\s*=|dangerouslySetInnerHTML|document\.write\s*\(|v-html|bypassSecurityTrust)/g, quoi:"Inse`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 15. [moyen] injection HTML potentielle

- **Fichier :** `tools/serveur-devis.mjs`
- **Ligne :** 82
- **Extrait lu :** `out.innerHTML=j.ok?('Demande enregistrée. Référence : <code>'+j.ref+'</code>. Je réponds à l\\'adresse indiquée.'):('Erreur : '+(j.erreur||'inconnue'));`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 16. [moyen] injection HTML potentielle

- **Fichier :** `action/audit-client.mjs`
- **Ligne :** 28
- **Extrait lu :** `{ id:'INNERHTML', gravite:'moyenne', rx:/\.innerHTML\s*=|dangerouslySetInnerHTML/g, quoi:"Insertion HTML (risque XSS si donnée non fiable)" },`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 17. [moyen] injection HTML potentielle

- **Fichier :** `livrable-autonome/audit-client.mjs`
- **Ligne :** 28
- **Extrait lu :** `{ id:'INNERHTML', gravite:'moyenne', rx:/\.innerHTML\s*=|dangerouslySetInnerHTML/g, quoi:"Insertion HTML (risque XSS si donnée non fiable)" },`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 18. [moyen] injection HTML potentielle

- **Fichier :** `npm-pkg/bin/audit-client.mjs`
- **Ligne :** 28
- **Extrait lu :** `{ id:'INNERHTML', gravite:'moyenne', rx:/\.innerHTML\s*=|dangerouslySetInnerHTML/g, quoi:"Insertion HTML (risque XSS si donnée non fiable)" },`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 19. [moyen] injection HTML potentielle

- **Fichier :** `audit-code.sh`
- **Ligne :** 76
- **Extrait lu :** `-e 'innerHTML[[:space:]]*=|dangerouslySetInnerHTML' \`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 20. [moyen] requête SQL construite par concaténation

- **Fichier :** `docs/exemple-vulnerable.mjs`
- **Ligne :** 10
- **Extrait lu :** `const sql = "SELECT * FROM users WHERE id = " + userId;`
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 21. [moyen] injection HTML potentielle

- **Fichier :** `docs/exemple-vulnerable.mjs`
- **Ligne :** 16
- **Extrait lu :** `el.innerHTML = texte;`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 22. [moyen] requête SQL construite par concaténation

- **Fichier :** `exemple-vulnerable.mjs`
- **Ligne :** 10
- **Extrait lu :** `const sql = "SELECT * FROM users WHERE id = " + userId;`
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 23. [moyen] injection HTML potentielle

- **Fichier :** `exemple-vulnerable.mjs`
- **Ligne :** 16
- **Extrait lu :** `el.innerHTML = texte;`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 24. [faible] URL en clair (non HTTPS)

- **Fichier :** `audit-client.mjs`
- **Ligne :** 58
- **Extrait lu :** `{ id:'HTTP_CLAIR', gravite:'basse', rx:/['"\`]http:\/\/[a-z0-9.-]+/gi, quoi:"URL http:// en clair" },`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 25. [faible] URL en clair (non HTTPS)

- **Fichier :** `tools/serveur-devis.mjs`
- **Ligne :** 94
- **Extrait lu :** `const u = new URL(req.url, 'http://x');`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 26. [faible] URL en clair (non HTTPS)

- **Fichier :** `tools/audit-statique.mjs`
- **Ligne :** 29
- **Extrait lu :** `{ id: 'http-sans-tls', gravite: 'faible', constat: 'URL http:// en clair',`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 27. [faible] URL en clair (non HTTPS)

- **Fichier :** `audit-code.sh`
- **Ligne :** 83
- **Extrait lu :** `N=$(grep -rInE 'http://(?!localhost|127\.0\.0\.1)' "$ROOT" 2>/dev/null | grep -vE 'node_modules|\.min\.js' | wc -l || echo 0)`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 28. [faible] URL en clair (non HTTPS)

- **Fichier :** `audit-code.sh`
- **Ligne :** 84
- **Extrait lu :** `echo "  [FAIBLE] URLs en clair (http://) : ${N} occurrence(s) — la plupart dans les tests/docs."`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 29. [faible] URL en clair (non HTTPS)

- **Fichier :** `docs/exemple-vulnerable.mjs`
- **Ligne :** 25
- **Extrait lu :** `const url = "http://config.interne.exemple.fr/params.json";`
- **À vérifier :** déterminer si ce trafic porte des données sensibles.

### 30. [faible] URL en clair (non HTTPS)

- **Fichier :** `exemple-vulnerable.mjs`
- **Ligne :** 25
- **Extrait lu :** `const url = "http://config.interne.exemple.fr/params.json";`
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