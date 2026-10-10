# Livrable d'audit de code statique — Exemple geomacro

Réalisé le 2026-10-10 par **Arthur Grossi EI** — audit de code statique
Contact : arthhur.grossi@gmail.com

## Contenu du dossier

| Fichier | Rôle |
|---|---|
| `RAPPORT.html` | Rapport principal : chaque constat avec fichier, ligne, extrait et correction attendue. Ouvrable dans un navigateur, imprimable en PDF. |
| `RAPPORT.html.sha256` | Empreinte du rapport : permet de prouver qu'il n'a pas été modifié après livraison. |
| `audit.sarif` | Même contenu au format **SARIF 2.1.0**, lu nativement par GitHub (onglet Security), VS Code (extension SARIF Viewer) et GitLab. |
| `audit.sarif.sha256` | Empreinte du SARIF. |
| `audit-verification.yml` | Workflow à déposer dans `.github/workflows/` : l'audit se relance à chaque `push`. |

## Ce que ce livrable prouve

- La présence, à la date du 2026-10-10, des constructions listées, aux fichiers et lignes cités.
- Source analysée : 1644 fichiers, 302 355 lignes.
- 62 constats relevés, dont 42 de niveau prioritaire.

## Ce que ce livrable NE prouve PAS

- **Il ne prouve pas l'absence de vulnérabilité.** Seules les constructions correspondant aux règles appliquées sont recherchées.
- **Le code n'a jamais été exécuté.** C'est une analyse statique de motifs, pas un test d'intrusion.
- Les fichiers de test, exemples et dépendances tierces sont exclus de l'analyse.
- Chaque entrée est un **constat**, pas une vulnérabilité confirmée : un arbitrage humain reste nécessaire pour écarter les faux positifs.

## Comment vérifier l'intégrité vous-même

```bash
# 1. Vérifier que le rapport est intact
sha256sum -c RAPPORT.html.sha256

# 2. Vérifier que le SARIF est intact
sha256sum -c audit.sarif.sha256
```

Sur Windows (PowerShell) :
```powershell
(Get-FileHash RAPPORT.html -Algorithm SHA256).Hash.ToLower()
```
La valeur affichée doit correspondre à la première colonne de `RAPPORT.html.sha256`.

## Relancer l'audit vous-même, gratuitement

L'auditeur utilisé est public et gratuit :
https://aarrth8.github.io/audit-code-statique/audit-depot.html

Vous pouvez donc reproduire ce rapport avant même de régler quoi que ce soit. C'est volontaire : vous payez un accompagnement et une relecture, pas un accès.
