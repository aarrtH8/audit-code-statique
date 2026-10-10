# Audit de code statique — livrable autonome

Un **auditeur en un seul fichier**, sans dépendance, sans réseau, sans installation.
Le client le lance **chez lui**, sur **son** code. Il obtient un rapport en quelques secondes.

## Pourquoi c'est honnête

- Le code n'est **jamais exécuté**. Le dépôt n'est **jamais modifié**.
- Chaque constat est un **motif à vérifier** (`fichier:ligne`), **pas** une vulnérabilité confirmée.
- Le rapport porte un **SHA-256** que le client recalcule lui-même — pas de confiance requise.

## Utilisation

    node audit-client.mjs https://github.com/<utilisateur>/<depot> --sortie rapport.md
    node audit-client.mjs ./mon-dossier                             --sortie rapport.md

Puis, pour prouver l'authenticité :

    certutil -hashfile rapport.md SHA256      (Windows)
    sha256sum rapport.md                      (Linux/Mac)

## Preuve de fonctionnement

Exécuté sur du vrai code : **55 motifs** (29 haute, 19 moyenne, 7 basse),
SHA-256 `50254bab0d04714161958544bf2e4830979bbef787bde83aff0721ffd4f20bb8`.
Voir `exemple-rapport.md`.

## Ce que ce livrable NE fait PAS

- Pas d'audit manuel, pas de test dynamique, pas d'exploitation.
- Pas de garantie d'exhaustivité : c'est un premier balayage reproductible.
- Un rapport de 50 motifs peut correspondre à 0 faille exploitable. Nous refusons de dire l'inverse.

## Tarification honnête

Le fichier est **gratuit à exécuter**. Un audit personnalisé avec revue manuelle du
contexte et hiérarchisation réelle se fait **sur devis**, montant convenu avant commande.
Paiement PayPal / virement après accord. Aucun prélèvement automatique.
