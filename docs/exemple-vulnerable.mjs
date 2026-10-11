// exemple-vulnerable.mjs — code d'exemple, ecrit pour illustrer la methode d'audit.
// Ce fichier contient des defauts VOLONTAIRES, avec des valeurs factices (XXXX).
import { execSync } from 'node:child_process';

const apiKey = "XXXX_PLACEHOLDER_API_KEY_NE_PAS_UTILISER";
const DB_PASSWORD = "XXXX_PLACEHOLDER_MOT_DE_PASSE_EXEMPLE";

export function chercherUtilisateur(db, userId) {
  // Requete construite par concatenation : le point classique a verifier.
  const sql = "SELECT * FROM users WHERE id = " + userId;
  return db.query(sql);
}

export function afficherCommentaire(el, texte) {
  // Ecriture directe dans le DOM.
  el.innerHTML = texte;
}

export function executerTache(nomFichier) {
  // Commande systeme dont l'argument vient de l'appelant.
  return execSync("tar -czf backup.tgz " + nomFichier).toString();
}

export function chargerConfig() {
  const url = "http://config.interne.exemple.fr/params.json";
  const data = eval("({ endpoint: '" + url + "' })");
  // TODO: gerer le cas ou le service est indisponible
  console.log("config chargee", data);
  return data;
}
