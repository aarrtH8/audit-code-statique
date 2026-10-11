# Audit de code statique — constats vérifiables

**Ce dépôt contient du travail réel et vérifiable. Rien n'y est fabriqué.**

## L'offre

J'analyse du code source (public, ou l'extrait que vous me confiez) et je rends un **rapport court, daté et scellé**.

- Fichier + **numéro de ligne** pour chaque constat — vérifiable en ouvrant votre code.
- Motifs **dédupliqués**, séparés production / test.
- **Empreinte SHA-256** sur chaque livrable.
- **Aucun code exécuté. Aucun accès demandé.**

📄 **Page d'offre complète → [audit-offre.html](https://aarrtH8.github.io/audit-code-statique/audit-offre.html)**
🔧 **Auditeur dans le navigateur (rien n'est envoyé) → [demo](https://aarrtH8.github.io/audit-code-statique/audit-autonome.html)**

## Rapports publiés (travail réel sur dépôts publics)

| Dépôt | Fichiers lus | Constats | Rapport |
|---|---|---|---|
| counteraccro/natheo | 644 | 67 | [lire](https://github.com/aarrtH8/audit-code-statique/blob/main/audits-reels/counteraccro-natheo-2006.signal.md) |
| vllm-project/vllm-ascend | 2 201 | 747 | [lire](https://github.com/aarrtH8/audit-code-statique/blob/main/audits-reels/vllm-project-vllm-ascend-2006.signal.md) |
| symfony/form | 545 | 12 | [lire](https://github.com/aarrtH8/audit-code-statique/blob/main/audits-reels/symfony-form-2006.signal.md) |
| xingpingcn/enhanced-FaaS-in-China | 15 | 0 | [lire](https://github.com/aarrtH8/audit-code-statique/blob/main/audits-reels/xingpingcn-enhanced-FaaS-in-China-2006.signal.md) |

## Ce que ce n'est PAS

Ce ne sont **pas des vulnérabilités confirmées** : ce sont des **points à vérifier**, classés par priorité. Un motif présent dans un test, une fixture ou un exemple **n'est pas** une faille en production — c'est signalé comme tel.

## Prix

Prix ferme au devis. Vous validez le montant et le périmètre **avant** tout travail.

- **Triage ciblé — 90 €** : un périmètre précis (un module, un dossier).
- **Audit complet — 290 €** : tout le dépôt, rapport signal + rapport détaillé.
- **Conformité & historique — 490 €** : complet + revue de l'historique Git (secrets, dépendances).

**Paiement** : virement professionnel (Arthur Grossi EI) ou PayPal. Aucune cryptomonnaie.

## Commander

Ouvrez une [demande d'audit](https://github.com/aarrtH8/audit-code-statique/issues/new?title=%5Bdemande%5D%20audit&body=Langage%20%3A%0ATaille%20approximative%20%3A%0AD%C3%A9p%C3%B4t%20ou%20extrait%20%3A%0A) en précisant le langage, la taille approximative et le dépôt/l'extrait à analyser.

> Un devis vous sera transmis après précision du périmètre. Rien n'est prélevé sans votre accord écrit.

---

**Arthur Grossi EI** — audit de code statique. Ce que je ne peux pas prouver, je ne l'écris pas.
