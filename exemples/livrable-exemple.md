# À quoi ressemble un livrable réel

Un client reçoit **un dossier**, pas un PDF isolé. Voici son contenu exact,
généré sur un cas réel (`blocknine0/geomacro`) et consultable en ligne :

| Fichier | Vérifiable ici |
|---|---|
| `RAPPORT.html` | [voir le rapport d'exemple](./rapport-exemple.html) |
| `RAPPORT.html.sha256` | empreinte SHA-256 — le client recalcule et compare |
| `audit.sarif` | format natif GitHub / VS Code / GitLab |
| `audit-verification.yml` | relance l'audit à chaque `push` |
| `LISEZMOI.md` | [lire](./LISEZMOI.md) — ce qui est prouvé, ce qui ne l'est pas |
| `COMMANDER-UN-SUIVI.md` | périmètre, exclusions, prix au devis |
| `MANIFESTE.json` | empreinte de chaque fichier : rien ne peut être ajouté après coup |

## Pourquoi un dossier et pas un simple rapport

Un rapport seul demande la confiance. Un dossier contient de quoi **vérifier
sans moi** : empreintes recalculables, outil public relançable, périmètre écrit
noir sur blanc. C'est la différence entre une affirmation et une preuve.

## Ce que ce dossier ne fait pas

Il ne corrige pas le code, ne garantit pas l'absence de faille, et n'exécute
jamais le code analysé. Ces limites sont écrites dans le livrable lui-même.
