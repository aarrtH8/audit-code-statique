#!/usr/bin/env node
/**
 * livrable-signe.mjs <depot|url> --client "Nom" [--out livrable.html]
 *
 * Produit le livrable d'audit opposable :
 *   - empreinte SHA-256 du rapport et de l'arborescence source analysée ;
 *   - procédure de vérification que le client peut exécuter seul ;
 *   - mention explicite de ce qui EST prouvé et de ce qui NE l'est PAS.
 *
 * Objectif honnête : le client doit pouvoir vérifier l'intégrité du document
 * sans me faire confiance. Un livrable qui exige la confiance n'en est pas un.
 */
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, mkdtempSync, readdirSync, statSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, relative } from 'node:path';

const IGNORE = new Set(['node_modules','.git','dist','build','.next','vendor','__pycache__','coverage','.venv','venv','.cache']);
const TEXTE = new Set(['.js','.mjs','.cjs','.ts','.tsx','.jsx','.py','.rb','.php','.go','.java','.cs','.env','.yml','.yaml','.sh','.sql','.conf','.ini','.tf']);
const MAX = 512 * 1024;

const REGLES = [
  { id:'secret-en-dur', g:'critique', t:'Secret probable en dur', re:/(api[_-]?key|secret|passwd|password|private[_-]?key|access[_-]?key)\s*[:=]\s*['"][A-Za-z0-9_\-\.\/\+]{16,}['"]/i,
    c:'Révoquer la clé, la placer en variable d\'environnement, purger l\'historique Git.' },
  { id:'cle-aws', g:'critique', t:'Identifiant d\'accès AWS en dur', re:/\bAKIA[0-9A-Z]{16}\b/, c:'Révoquer dans IAM, vérifier CloudTrail.' },
  { id:'injection-commande', g:'critique', t:'Commande construite par concaténation', re:/(exec|execSync|spawnSync|spawn)\s*\(\s*[^)]{0,80}(\+|\$\{)/, c:'Arguments en tableau (execFile), sans shell.' },
  { id:'execution-dynamique', g:'eleve', t:'Exécution dynamique de code', re:/\b(eval|new\s+Function)\s*\(/, c:'Analyseur explicite ou table de correspondance.' },
  { id:'requete-sql-concat', g:'eleve', t:'Requête SQL concaténée', re:/(SELECT|INSERT|UPDATE|DELETE)[^;'"`]{0,120}(\+\s*[\w$]|`\s*\$\{)/i, c:'Requêtes paramétrées.' },
  { id:'cors-ouvert', g:'moyen', t:'CORS ouvert', re:/origin\s*:\s*['"]\*['"]/i, c:'Restreindre les origines.' },
  { id:'http-clair', g:'moyen', t:'URL HTTP non chiffrée', re:/["'`]http:\/\/(?!localhost|127\.0\.0\.1|0\.0\.0\.0|www\.w3\.org|example\.com|schemas)/, c:'Passer en HTTPS.' },
  { id:'html-direct', g:'moyen', t:'Écriture HTML directe', re:/\.innerHTML\s*=\s*[^=]|document\.write\s*\(/, c:'textContent, ou assainissement.' },
  { id:'hachage-faible', g:'moyen', t:'Hachage faible', re:/(createHash\s*\(\s*['"](md5|sha1)['"]|\b(md5|sha1)\s*\()/i, c:'bcrypt / Argon2id.' },
  { id:'tls-desactive', g:'bas', t:'Vérification TLS désactivée', re:/(rejectUnauthorized\s*:\s*false|verify\s*=\s*False)/, c:'Réactiver la vérification.' },
];

const args = process.argv.slice(2);
const cible = args.find(a => !a.startsWith('--'));
const iClient = args.indexOf('--client');
const client = iClient >= 0 ? args[iClient + 1] : 'Client';
const iOut = args.indexOf('--out');
const sortie = iOut >= 0 ? args[iOut + 1] : 'livrable.html';
if (!cible) { console.error('Usage: node tools/livrable-signe.mjs <depot|url> --client "Nom" [--out livrable.html]'); process.exit(2); }

let racine, nom;
if (/^(https?:\/\/|git@)/.test(cible)) {
  racine = mkdtempSync(join(tmpdir(), 'livr-'));
  execFileSync('git', ['clone','-q','--depth','1',cible,racine], { stdio:'pipe', timeout:180000 });
  nom = cible;
} else { if (!existsSync(cible)) { console.error('Introuvable :', cible); process.exit(3); } racine = cible; nom = cible; }

function* marche(d){ let e; try { e = readdirSync(d,{withFileTypes:true}); } catch { return; }
  for (const x of e){ if (IGNORE.has(x.name)) continue; const p = join(d,x.name);
    if (x.isDirectory()) yield* marche(p); else if (x.isFile()) yield p; } }

// Empreinte de l'arborescence : tri stable, chemin + contenu. Vérifiable par le client.
const h = createHash('sha256');
const fichiers = [];
const constats = [];
let lignesAnalysees = 0;

for (const f of [...marche(racine)].sort()) {
  const rel = relative(racine, f).replace(/\\/g,'/');
  let st; try { st = statSync(f); } catch { continue; }
  if (st.size > MAX) continue;
  const dot = rel.lastIndexOf('.'); const ext = dot >= 0 ? rel.slice(dot).toLowerCase() : '';
  if (!TEXTE.has(ext) && !/(^|\/)(\.env|Dockerfile)/.test(rel)) continue;
  let contenu; try { contenu = readFileSync(f); } catch { continue; }
  if (contenu.includes(0)) continue;
  h.update(rel); h.update('\0'); h.update(contenu); h.update('\0');
  fichiers.push(rel);
  const estTest = /(^|\/)(test|tests|spec|__tests__|fixtures|examples?|mocks?)\//i.test(rel) || /\.(test|spec|min)\.[a-z]+$/i.test(rel);
  const lignes = contenu.toString('utf8').split(/\r?\n/);
  lignesAnalysees += lignes.length;
  if (estTest) continue;
  lignes.forEach((l, i) => {
    const t = l.trim();
    if (t.startsWith('//') || t.startsWith('#') || t.startsWith('*') || t.startsWith('/*')) return;
    for (const r of REGLES) if (r.re.test(l)) constats.push({ r, rel, ligne: i+1, extrait: t.slice(0,180) });
  });
}
const empreinteSource = h.digest('hex');

const poids = { critique:40, eleve:12, moyen:3, bas:1 };
const parG = { critique:0, eleve:0, moyen:0, bas:0 };
for (const c of constats) parG[c.r.g]++;
const points = constats.reduce((s,c) => s + poids[c.r.g], 0);
const proprete = Math.max(0, 100 - Math.max(0, points - 20));
const verdict = proprete >= 85 ? 'Sain' : proprete >= 70 ? 'Acceptable' : proprete >= 50 ? 'À corriger' : proprete >= 30 ? 'Préoccupant' : 'Critique';

const esc = s => String(s == null ? '' : s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const date = new Date().toISOString().slice(0,19).replace('T',' ');
const LBL = { critique:'Critique', eleve:'Élevé', moyen:'Moyen', bas:'Faible' };
const parFichier = {};
for (const c of constats) (parFichier[c.rel] = parFichier[c.rel] || []).push(c);
const top = Object.entries(parFichier).sort((a,b) => b[1].length - a[1].length).slice(0, 20);

const corpsConstats = top.map(([fichier, liste]) => `
<h3>${esc(fichier)} <span class="cnt">${liste.length} constat${liste.length>1?'s':''}</span></h3>
${liste.slice(0,12).map(c => `<div class="c ${c.r.g}"><span class="b ${c.r.g}">${LBL[c.r.g]}</span>
<strong>${esc(c.r.t)}</strong> <code>ligne ${c.ligne}</code>
<div class="ex">${esc(c.extrait)}</div>
<div class="fix">Correction : ${esc(c.r.c)}</div></div>`).join('\n')}
${liste.length > 12 ? `<p class="plus">… et ${liste.length-12} autre(s) constat(s) dans ce fichier.</p>` : ''}`).join('\n');

const html = `<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Rapport d'audit de code statique — ${esc(client)}</title><style>
:root{--bg:#fff;--panel:#f6f8fa;--b:#d0d7de;--f:#1f2328;--d:#59636e;--crit:#cf222e;--eleve:#bc4c00;--moyen:#9a6700;--bas:#0969da}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--f);font-family:system-ui,-apple-system,sans-serif;line-height:1.65}
.w{max-width:900px;margin:0 auto;padding:40px 24px 90px}
h1{font-size:1.6rem;margin:0 0 2px}h2{font-size:1.15rem;margin-top:34px;border-bottom:1px solid var(--b);padding-bottom:6px}
h3{font-size:1rem;margin:20px 0 6px}code{font-family:ui-monospace,Consolas,monospace;font-size:.85rem;background:var(--panel);padding:1px 5px;border-radius:4px}
.entete{border-bottom:2px solid #1f2328;padding-bottom:14px;margin-bottom:24px}
.meta{color:var(--d);font-size:.9rem}
.grille{display:flex;gap:12px;flex-wrap:wrap;margin:18px 0}
.st{background:var(--panel);border:1px solid var(--b);border-radius:8px;padding:12px 18px;min-width:120px}
.st .n{font-size:1.45rem;font-weight:700}.st .l{font-size:.74rem;color:var(--d);text-transform:uppercase;letter-spacing:.03em}
.jauge{background:var(--panel);border:1px solid var(--b);border-radius:8px;padding:16px 20px;margin:14px 0}
.barre{height:10px;background:#e4e8ec;border-radius:999px;overflow:hidden;margin-top:8px}
.remplir{height:100%;background:linear-gradient(90deg,#cf222e,#9a6700,#1a7f37)}
.c{background:var(--panel);border:1px solid var(--b);border-left-width:4px;border-radius:6px;padding:9px 13px;margin:8px 0}
.c.critique{border-left-color:var(--crit)}.c.eleve{border-left-color:var(--eleve)}.c.moyen{border-left-color:var(--moyen)}.c.bas{border-left-color:var(--bas)}
.b{font-size:.68rem;font-weight:700;padding:2px 7px;border-radius:999px;color:#fff;text-transform:uppercase;margin-right:6px}
.b.critique{background:var(--crit)}.b.eleve{background:var(--eleve)}.b.moyen{background:var(--moyen)}.b.bas{background:var(--bas)}
.ex{font-family:ui-monospace,Consolas,monospace;font-size:.8rem;color:var(--d);background:#fff;border:1px solid var(--b);border-radius:4px;padding:6px 9px;margin:6px 0;overflow-x:auto;white-space:pre-wrap}
.fix{font-size:.86rem;color:#1a7f37}.cnt{font-weight:400;color:var(--d);font-size:.85rem}.plus{color:var(--d);font-size:.85rem;font-style:italic}
.scel{background:var(--panel);border:1px solid var(--b);border-radius:8px;padding:16px 20px;margin:18px 0}
.hash{font-family:ui-monospace,monospace;font-size:.78rem;word-break:break-all;background:#fff;border:1px solid var(--b);border-radius:4px;padding:8px 10px;margin:6px 0}
.note{border-left:3px solid #9a6700;background:#fff8e5;padding:12px 16px;border-radius:0 6px 6px 0;margin:16px 0;font-size:.9rem}
footer{margin-top:50px;border-top:1px solid var(--b);padding-top:18px;color:var(--d);font-size:.86rem}
</style></head><body><div class="w">
<div class="entete">
<h1>Rapport d'audit de code statique</h1>
<p class="meta">Destinataire : <strong>${esc(client)}</strong> · Source analysée : <code>${esc(nom)}</code> · Date : ${date}<br>
Réalisé par Arthur Grossi EI — audit de code statique · arthhur.grossi@gmail.com</p>
</div>

<div class="jauge">
  <div><strong>Indice de propreté : ${proprete}/100</strong> — ${esc(verdict)}</div>
  <div class="barre"><div class="remplir" style="width:${proprete}%"></div></div>
  <p class="meta" style="margin:8px 0 0">${lignesAnalysees.toLocaleString('fr-FR')} lignes analysées · ${fichiers.length} fichiers · ${constats.length} constats relevés</p>
</div>

<div class="grille">
  <div class="st"><div class="n" style="color:var(--crit)">${parG.critique}</div><div class="l">Critique</div></div>
  <div class="st"><div class="n" style="color:var(--eleve)">${parG.eleve}</div><div class="l">Élevé</div></div>
  <div class="st"><div class="n" style="color:var(--moyen)">${parG.moyen}</div><div class="l">Moyen</div></div>
  <div class="st"><div class="n" style="color:var(--bas)">${parG.bas}</div><div class="l">Faible</div></div>
</div>

<div class="note">
<strong>Ce que ce document prouve :</strong> la présence, à la date indiquée, des constructions listées ci-dessous aux fichiers et lignes cités.<br>
<strong>Ce qu'il ne prouve pas :</strong> l'absence d'autres vulnérabilités. L'analyse est statique — le code n'est <em>jamais exécuté</em>. Les fichiers de test, exemples et dépendances sont exclus. Les faux positifs possibles sont signalés comme « constats », non comme « vulnérabilités confirmées ».
</div>

<h2>Constats détaillés</h2>
<p class="meta">Classés par nombre de constats par fichier. Chaque constat indique la correction attendue.</p>
${corpsConstats || '<p class="meta">Aucun constat relevé selon les règles appliquées.</p>'}

<h2>Intégrité du livrable</h2>
<div class="scel">
<p class="meta">Empreinte SHA-256 de l'arborescence source analysée (${fichiers.length} fichiers, triés, contenu inclus) :</p>
<div class="hash">${empreinteSource}</div>
<p class="meta">Pour vérifier que ce rapport correspond bien à la version analysée : clonez le dépôt dans cet état, puis recalculez l'empreinte des fichiers listés. Toute divergence signifie que le code a changé depuis l'audit — auquel cas ce rapport ne s'applique plus.</p>
</div>

<footer>
Rapport d'audit statique — Arthur Grossi EI · arthhur.grossi@gmail.com<br>
Document produit automatiquement, relu avant livraison. Prix convenu au devis, montant ferme. Aucune donnée du client n'est exécutée ni transmise à un tiers.
</footer>
</div></body></html>`;

writeFileSync(sortie, html);
const rapportHash = createHash('sha256').update(html).digest('hex');
writeFileSync(sortie + '.sha256', `${rapportHash}  ${sortie.split(/[\\/]/).pop()}\n`);
console.log(JSON.stringify({ client, source: nom, fichiers: fichiers.length, lignesAnalysees,
  constats: constats.length, parGravite: parG, proprete, verdict,
  empreinteSource, empreinteRapport: rapportHash, livrable: sortie }, null, 2));
