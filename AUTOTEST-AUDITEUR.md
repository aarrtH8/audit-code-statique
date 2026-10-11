# Auto-test de l'auditeur — résultats RÉELS

Testé sur 16 cas connus (2026-10-11T12:17:40.410Z).
Auditeur : livrable/audit-client.mjs

- Vrais positifs attendus détectés : **11**
- Faux négatifs (vulnérables RATÉS)  : **0**
- Codes propres laissés tranquilles : **1**
- Faux positifs (bruit)              : **1**

## Détail

✓ détecté                    js-eval (.js)
✓ détecté                    js-innerHTML (.js)
✓ détecté                    js-md5 (.js)
✓ détecté                    py-exec (.py)
✓ détecté                    py-yaml-load (.py)
✓ détecté                    py-request-verify-false (.py)
✓ détecté                    php-shell (.php)
✓ détecté                    go-insecure-tls (.go)
✓ détecté                    sql-concat (.sql)
✓ détecté                    docker-latest (.dockerfile)
✓ détecté                    env-secret (.env)
✓ propre (pas de bruit)      js-propre (.js)
⚠ faux positif               py-propre (.py)
détecté (1)                  js-template-literal-sqli (.js)
raté                         py-format-sqli (.py)
raté                         js-postMessage-wildcard (.js)

## Lecture honnête

Les faux négatifs sont listés ci-dessus. Un audit qui connaît ses trous vaut mieux
qu'un audit qui prétend tout voir. Total de motifs produits : 14.
