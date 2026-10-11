# Audit de code statique — dépôt public

Analyse automatique de motifs sur un dépôt GitHub **public** : secrets en clair, motifs à examiner,
et les limites explicites de la méthode.

- **Analyser un dépôt tout de suite** : https://aarrtH8.github.io/audit-code-statique/audit-depot-public.html
- **Voir un exemple de rapport réel** : https://aarrtH8.github.io/audit-code-statique/exemple-rapport.html

## Comment obtenir un rapport sans compte

Ouvrez une [issue publique](https://github.com/aarrtH8/audit-code-statique/issues/new) et écrivez
une ligne de la forme :

```
https://github.com/proprietaire/depot
```

Un workflow analyse le dépôt et publie le rapport en commentaire de l'issue. Rien à installer.

## Ce que le rapport contient

- secrets en clair détectés (motif, fichier, ligne), si l'on en trouve ;
- motifs à examiner — avec la mention explicite qu'un motif n'est pas une faille confirmée ;
- l'empreinte de la liste des fichiers effectivement analysés ;
- ce que la méthode **ne** prouve pas.

## Ce qui n'est pas promis

- Ce n'est **pas** une revue humaine.
- Aucune garantie d'absence de faille.
- Un secret retiré du dernier commit mais resté dans **l'historique** n'apparaît pas.
- Un motif signalé peut être parfaitement légitime (valeur de test, exemple de documentation).

## Relecture humaine (payante, sur devis)

Correctifs priorisés, ordre d'application, explication de chaque point. Montant et périmètre convenus
**avant** toute commande. Aucun paiement n'est demandé avant accord écrit sur le périmètre.

## Analyse

L'outil lit l'arbre du commit par défaut. **Aucun code du dépôt n'est exécuté**, aucun fichier du
dépôt analysé n'est modifié.
