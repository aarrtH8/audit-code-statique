# Rapport d'audit statique — haris936hk/EchoNote

**Date :** 2026-10-10
**Dépôt analysé :** https://github.com/haris936hk/EchoNote
**Fichiers lus :** 30
**Généré par :** Automaton DeepSeek — analyse statique par motifs, via l'archive publique du dépôt (aucun code exécuté).

> **Nature de ce document.** Ce sont des **alertes à vérifier**, pas des vulnérabilités confirmées.
> Chaque ligne citée a été lue dans le dépôt à l'adresse indiquée. Un motif peut être légitime
> (exemple, test, code mort). Ce rapport **ne remplace pas** une revue de sécurité humaine,
> un test d'intrusion ni un scan des dépendances. Aucun code n'a été exécuté.

## Synthèse — 12 constat(s)

| Sévérité | Nombre |
|---|---|
| critique | 0 |
| eleve | 0 |
| moyen | 12 |
| faible | 0 |

## Constats

### 1. [moyen] requête SQL construite par concaténation

- **Fichier :** `backend/src/services/meeting.service.js`
- **Ligne :** 1002
- **Extrait lu :** `logger.warn(\`⚠️ Could not delete from Supabase: ${result.error}\`);`
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 2. [moyen] requête SQL construite par concaténation

- **Fichier :** `backend/src/services/meeting.service.js`
- **Ligne :** 1009
- **Extrait lu :** `logger.warn(\`⚠️ Could not delete audio file: ${error.message}\`);`
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 3. [moyen] requête SQL construite par concaténation

- **Fichier :** `backend/src/services/meeting.service.js`
- **Ligne :** 1563
- **Extrait lu :** `console.warn(\`⚠️ Could not delete temp file ${filePath}: ${error.message}\`);`
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 4. [moyen] requête SQL construite par concaténation

- **Fichier :** `backend/src/controllers/user.controller.js`
- **Ligne :** 208
- **Extrait lu :** `logger.info(\`⚙️ Auto-delete disabled for user: ${userId}\`);`
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 5. [moyen] requête SQL construite par concaténation

- **Fichier :** `backend/src/controllers/user.controller.js`
- **Ligne :** 233
- **Extrait lu :** `logger.info(\`⚙️ Auto-delete set to ${days} days for user: ${userId}\`);`
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 6. [moyen] injection HTML potentielle

- **Fichier :** `frontend/src/components/meeting/TranscriptViewer.jsx`
- **Ligne :** 415
- **Extrait lu :** `dangerouslySetInnerHTML={{ __html: highlightedRawText }}`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 7. [moyen] requête SQL construite par concaténation

- **Fichier :** `frontend/src/pages/WorkspaceDetailPage.jsx`
- **Ligne :** 53
- **Extrait lu :** `const res = await api.delete(\`/workspaces/${id}/members/${userId}\`);`
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 8. [moyen] requête SQL construite par concaténation

- **Fichier :** `frontend/src/pages/WorkspaceDetailPage.jsx`
- **Ligne :** 66
- **Extrait lu :** `const res = await api.delete(\`/workspaces/${id}/meetings/${meetingId}\`);`
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 9. [moyen] requête SQL construite par concaténation

- **Fichier :** `backend/src/services/audio.service.js`
- **Ligne :** 377
- **Extrait lu :** `logger.error(\`❌ Failed to delete ${filePath}: ${error.message}\`);`
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 10. [moyen] injection HTML potentielle

- **Fichier :** `frontend/src/pages/CalendarPage.jsx`
- **Ligne :** 241
- **Extrait lu :** `<div dangerouslySetInnerHTML={{ __html: event.description }} />`
- **À vérifier :** confirmer que la valeur insérée est échappée ou de confiance.

### 11. [moyen] requête SQL construite par concaténation

- **Fichier :** `frontend/src/services/api.js`
- **Ligne :** 300
- **Extrait lu :** `const response = await api.delete(\`/meetings/${id}\`);`
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

### 12. [moyen] requête SQL construite par concaténation

- **Fichier :** `frontend/src/services/api.js`
- **Ligne :** 472
- **Extrait lu :** `const response = await api.delete(\`/tasks/${id}\`);`
- **À vérifier :** vérifier l'usage de requêtes paramétrées.

---

## Ce que ce rapport ne dit pas

- Il ne confirme aucune exploitation possible.
- Il ne couvre ni les dépendances, ni l'infrastructure, ni la configuration serveur.
- Il n'analyse qu'un sous-ensemble de fichiers, pas l'ensemble du dépôt.

## Pour aller plus loin

Un audit approfondi croise ces motifs avec le contexte d'appel réel : entrée utilisateur
atteignant la ligne signalée, protections en amont, et pertinence métier.
Demande de devis : https://github.com/aarrtH8/audit-code-statique/issues/new