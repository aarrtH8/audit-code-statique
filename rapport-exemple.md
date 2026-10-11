# Rapport d'audit — exemple de livrable

> Généré le **2026-10-11** sur un fichier d'exemple écrit pour l'occasion. Ce que vous lisez est la
> **sortie brute** du même moteur que la page publique : rien n'a été retouché à la main.

## Sur quoi porte ce rapport

| | |
|---|---|
| Fichier analysé | `exemple-vulnerable.mjs` (42 lignes, écrit par moi pour la démonstration) |
| Méthode | analyse statique de motifs, aucune exécution du code |
| Motifs surveillés | 8 |
| Constats produits | 9, répartis en 3 niveaux de gravité |

## Ce que ce rapport est, et n'est pas

- **C'est** une liste de points à vérifier, chacun rattaché à une ligne précise, avec un conseil de correction.
- **Ce n'est pas** une preuve d'exploitabilité. Un constat dit « ceci mérite votre attention », pas « ceci est attaquable ».
- **Ce n'est pas** exhaustif. L'absence d'un motif ne garantit rien sur le reste du dépôt.

## Constats, par gravité

### Gravité haute — 5 constat(s)

**1. Exécution de commande système** — ligne 3

```js
import { execSync } from 'node:child_process';
```

*Pourquoi c'est signalé :* Passer un tableau d'arguments avec execFile, jamais une chaîne construite.

**2. Secret écrit en dur** — ligne 5

```js
const apiKey = "XXXX_PLACEHOLDER_API_KEY_NE_PAS_UTILISER";
```

*Pourquoi c'est signalé :* Déplacer dans une variable d'environnement. Révoquer la valeur exposée : elle est déjà dans l'historique Git.

**3. Requête SQL construite par concaténation** — ligne 10

```js
const sql = "SELECT * FROM users WHERE id = " + userId;
```

*Pourquoi c'est signalé :* Utiliser des requêtes paramétrées : db.query("... WHERE id = ?", [userId]).

**4. Exécution de commande système** — ligne 21

```js
return execSync("tar -czf backup.tgz " + nomFichier).toString();
```

*Pourquoi c'est signalé :* Passer un tableau d'arguments avec execFile, jamais une chaîne construite.

**5. Usage de eval()** — ligne 26

```js
const data = eval("({ endpoint: '" + url + "' })");
```

*Pourquoi c'est signalé :* eval exécute du code arbitraire. Remplacer par un parseur explicite (JSON.parse ici suffit).

### Gravité moyenne — 2 constat(s)

**1. Écriture via innerHTML** — ligne 16

```js
el.innerHTML = texte;
```

*Pourquoi c'est signalé :* Préférer textContent, ou assainir explicitement la valeur.

**2. URL non HTTPS** — ligne 25

```js
const url = "http://config.interne.exemple.fr/params.json";
```

*Pourquoi c'est signalé :* Passer en https:// : la config transmise peut être altérée en transit.

### Gravité basse — 2 constat(s)

**1. Marqueur à traiter** — ligne 27

```js
// TODO: gerer le cas ou le service est indisponible
```

*Pourquoi c'est signalé :* Ouvrir un ticket, ou traiter avant la mise en production.

**2. Trace de debug restée** — ligne 28

```js
console.log("config chargee", data);
```

*Pourquoi c'est signalé :* Retirer ou passer par un logger configurable.

## Combien d'effort pour corriger

| Constat | Effort estimé | Remarque |
|---|---|---|
| 2 secrets en dur (valeurs factices ici) | 15 min + rotation des clés | La rotation n'est pas optionnelle : la valeur est déjà dans l'historique Git. |
| Requête concaténée | 30 min | Passage en requête paramétrée, puis test. |
| `execSync` sur argument | 1 h | Dépend de la provenance réelle de l'argument : à vérifier avec vous. |
| `eval()` sur une chaîne | 20 min | `JSON.parse` couvre ce cas précis. |
| `innerHTML` + HTTP + debug | 45 min | Corrections simples et mécaniques. |

**Total indicatif : environ 3 h sur cet exemple.** Ce chiffre vaut pour *ce* fichier de 42 lignes.
Il ne se transpose pas à un dépôt réel sans le voir : je refuse de vous donner un chiffrage inventé.

## Prochaine étape

Si ce format de livrable vous convient, la démarche est celle décrite sur la page de demande : vous décrivez
un périmètre réel, je réponds avec mes limites et un montant ferme, et le travail démarre après accord écrit.

*Rapport d'exemple. Règlement par PayPal ou virement professionnel, sur facture. Aucune cryptomonnaie.*
