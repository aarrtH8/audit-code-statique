// extraire-cible.mjs — trouve une URL de dépôt GitHub dans un texte passé en argument.
// Aucune dépendance. Écrit cle=valeur sur stdout, pour être redirigé vers $GITHUB_OUTPUT.
const texte = process.argv.slice(2).join('\n');

// Regex stricte : github.com/<owner>/<repo>, on coupe toute queue (/issues, .git, ...)
const m = texte.match(/github\.com\/([A-Za-z0-9_.-]+)\/([A-Za-z0-9_.-]+)/);

if (!m) {
  console.log('valide=false');
  process.exit(0);
}
const owner = m[1];
const depot = m[2].replace(/\.git$/, '').replace(/[^A-Za-z0-9_.-]/g, '');
if (!owner || !depot) {
  console.log('valide=false');
  process.exit(0);
}
console.log('valide=true');
console.log('ref=' + owner + '/' + depot);
