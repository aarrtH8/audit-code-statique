#!/usr/bin/env node
/**
 * audit-diff.mjs <avant> <apres> [--out verification.html]
 * Audit différentiel : compare deux versions d'un dépôt (dossier ou URL git)
 * et prouve lesquels des constats précédents ont réellement disparu, lesquels
 * subsistent, et lesquels sont NOUVEAUX (régressions introduites).
 *
 * C'est le livrable qui vend la suite : un client qui a reçu un premier rapport
 * veut savoir si sa correction a marché. Réponse vérifiable, pas déclarative.
 * Aucun code exécuté.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, readdirSync, statSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, relative } from 'node:path';

const IGNORE = new Set(['node_modules','.git','dist','build','.next','vendor','__pycache__','coverage','.venv','venv','.cache']);
const TEXTE = new Set(['.js','.mjs','.cjs','.ts','.tsx','.jsx','.py','.rb','.php','.go','.java','.cs','.env','.yml','.yaml','.sh','.sql','.conf','.ini','.tf']);
const MAX = 512 * 1024;

const REGLES = [
  { id:'secret', g:'critique', t:'Secret probable en dur',
    re:/(api[_-]?key|secret|passwd|password|private[_-]?key|access[_-]?key)\s*[:=]\s*['"][A-Za-z0-9_\-\.\/\+]{16,}['"]/i,
    c:'Révoquer la clé, variable d\'environnement, purger l\'historique.' },
  { id:'aws', g:'critique', t:'Clé AWS en dur', re:/\bAKIA[0-9A-Z]{16}\b/, c:'Révoquer dans IAM.' },
  { id:'cmdinj', g:'critique', t:'Commande système avec entrée concaténée',
    re:/(exec|execSync|spawnSync|spawn)\s*\(\s*[^)]{0,80}(\+|\$\{)/, c:'Arguments en tableau, sans shell.' },
  { id:'eval', g:'eleve', t:'Exécution dynamique de code', re:/\b(eval|new\s+Function)\s*\(/, c:'Analyseur explicite.' },
  { id:'sqli', g:'eleve', t:'Requête SQL concaténée',
    re:/(SELECT|INSERT|UPDATE|DELETE)[^;'"`]{0,120}(\+\s*[\w$]|`\s*\$\{)/i, c:'Requêtes paramétrées.' },
  { id:'cors', g:'moyen', t:'CORS ouvert', re:/origin\s*:\s*['"]\*['"]/i, c:'Origines restreintes.' },
  { id:'http', g:'moyen', t:'URL HTTP non chiffrée',
    re:/["'`]http:\/\/(?!localhost|127\.0\.0\.1|0\.0\.0\.0|www\.w3\.org|example\.com)/, c:'HTTPS.' },
  { id:'innerHTML', g:'moyen', t:'Écriture HTML directe', re:/\.innerHTML\s*=\s*[^=]|document\.write\s*\(/, c:'textContent.' },
  { id:'mdp', g:'moyen', t:'Hachage faible', re:/(createHash\s*\(\s*['"](md5|sha1)['"]|\b(md5|sha1)\s*\()/i, c:'bcrypt/Argon2.' },
  { id:'verif', g:'bas', t:'Vérification TLS désactivée', re:/(rejectUnauthorized\s*:\s*false|verify\s*=\s*False)/, c:'Réactiver.' },
];

const args = process.argv.slice(2);
const positionnels = args.filter(a => !a.startsWith('--'));
const [avant, apres] = positionnels;
const iOut = args.indexOf('--out');
const sortie = iOut >= 0 ? args[iOut + 1] : 'verification.html';
if (!avant || !apres) { console.error('Usage: node tools/audit-diff.mjs <avant> <apres> [--out verification.html]'); process.exit(2); }

function resoudre(cible){
  if (/^(https?:\/\/|git@)/.test(cible)){
    const tmp = mkdtempSync(join(tmpdir(), 'auditd-'));
    execFileSync('git', ['clone','-q','--depth','1',cible,tmp], { stdio:'pipe', timeout:180000 });
    return { racine: tmp, nom: cible };
  }
  if (!existsSync(cible)) throw new Error('Introuvable : ' + cible);
  return { racine: cible, nom: cible };
}

function* marche(d){ let e; try { e = readdirSync(d,{withFileTypes:true}); } catch { return; }
  for (const x of e){ if (IGNORE.has(x.name)) continue; const p = join(d,x.name);
    if (x.isDirectory()) yield* marche(p); else if (x.isFile()) yield p; } }

function analyser(racine){
  const encontre = new Map(); // clé -> {regle, fichier, ligne, extrait}
  for (const f of marche(racine)){
    const rel = relative(racine, f).replace(/\\/g,'/');
    if (/(^|\/)(test|tests|spec|__tests__|fixtures|examples?)\//i.test(rel) || /\.(test|spec)\.[a-z]+$/i.test(rel)) continue;
    let st; try { st = statSync(f); } catch { continue; }
    if (st.size > MAX) continue;
    const dot = rel.lastIndexOf('.'); const ext = dot >= 0 ? rel.slice(dot).toLowerCase() : '';
    if (!TEXTE.has(ext) && !/(^|\/)(\.env|Dockerfile)/.test(rel)) continue;
    let contenu; try { contenu = readFileSync(f,'utf8'); } catch { continue; }
    contenu.split(/\r?\n/).forEach((l, i) => {
      const t = l.trim();
      if (t.startsWith('//') || t.startsWith('#') || t.startsWith('*')) return;
      for (const r of REGLES){
        if (!r.re.test(l)) continue;
        encontre.set(`${r.id}|${rel}|${i+1}`, { regle:r.id, gravite:r.g, titre:r.t, fichier:rel, ligne:i+1, extrait:t.slice(0,160), correction:r.c });
      }
    });
  }
  return encontre;
}

let A, B;
try { A = resoudre(avant); B = resoudre(apres); }
catch (e) { console.error(String(e.message).split('\n')[0]); process.exit(3); }

const va = analyser(A.racine);
const vb = analyser(B.racine);

// Rapprochement par (règle + fichier). Le numéro de ligne bouge : on rattache par fichier.
const parFichier = ens => { const m = new Map(); for (const c of ens.values()){ const k = `${c.regle}|${c.fichier}`; if (!m.has(k)) m.set(k, c); } return m; };
const fa = parFichier(va), fb = parFichier(vb);

const corriges = [...fa.entries()].filter(([k]) => !fb.has(k)).map(([,c]) => c);
const subsistants = [...fa.entries()].filter(([k]) => fb.has(k)).map(([,c]) => c);
const nouveaux = [...fb.entries()].filter(([k]) => !fa.has(k)).map(([,c]) => c);

const poids = { critique:40, eleve:12, moyen:3, bas:1 };
const pts = liste => liste.reduce((s,c) => s + poids[c.gravite], 0);
const avantPts = pts([...fa.values()]), apresPts = pts([...fb.values()]);
const baisse = avantPts > 0 ? Math.round(100 * (avantPts - apresPts) / avantPts) : 0;
const verdict = nouveaux.some(c=>c.gravite==='critique') ? 'Regressions critiques introduites'
  : (subsistants.length === 0 && avantPts > 0) ? 'Toutes les constructions detectees ont ete corrigees'
  : baisse > 0 ? `Amelioration de ${baisse}%`
  : 'Aucune amelioration mesurable';

const esc = s => String(s == null ? '' : s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const date = new Date().toISOString().slice(0,19).replace('T',' ');
const LBL = { critique:'Critique', eleve:'Élevé', moyen:'Moyen', bas:'Faible' };

const liste = (items, classe) => items.length ? items.map(c => `
<div class="item ${classe}"><span class="badge ${c.gravite}">${LBL[c.gravite]}</span>
  <strong>${esc(c.titre)}</strong> <code>${esc(c.fichier)}:${c.ligne}</code>
  <div class="lead">${esc(c.extrait)}</div></div>`).join('\n') : '<p class="vide">Aucun.</p>';

const html = `<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Vérification de correction — audit différentiel</title><style>
:root{--bg:#0d1117;--panel:#161b22;--bord:#30363d;--fg:#c9d1d9;--dim:#8b949e;--crit:#f85149;--eleve:#db6d28;--moyen:#d29922;--bas:#58a6ff;--ok:#3fb950}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--fg);font-family:system-ui,-apple-system,sans-serif;line-height:1.65}
.wrap{max-width:940px;margin:0 auto;padding:28px 20px 80px}h1{color:#fff;font-size:1.5rem;margin:0 0 4px}
h2{color:#fff;font-size:1.12rem;margin-top:32px;border-bottom:1px solid var(--bord);padding-bottom:6px}
.lead{color:var(--dim);font-size:.9rem}code{font-family:ui-monospace,Consolas,monospace;font-size:.85rem}
.grille{display:flex;gap:12px;flex-wrap:wrap;margin:18px 0}
.stat{background:var(--panel);border:1px solid var(--bord);border-radius:8px;padding:12px 16px;min-width:130px}
.stat .n{font-size:1.4rem;font-weight:700;color:#fff}.stat .l{font-size:.76rem;color:var(--dim);text-transform:uppercase}
.item{background:var(--panel);border:1px solid var(--bord);border-left-width:4px;border-radius:8px;padding:10px 14px;margin:10px 0}
.item.corrige{border-left-color:var(--ok)}.item.subsiste{border-left-color:var(--moyen)}.item.nouveau{border-left-color:var(--crit)}
.badge{font-size:.7rem;font-weight:700;padding:2px 8px;border-radius:999px;text-transform:uppercase}
.badge.critique{background:#3d1418;color:var(--crit)}.badge.eleve{background:#3a2110;color:var(--eleve)}
.badge.moyen{background:#3d2f10;color:var(--moyen)}.badge.bas{background:#10243d;color:var(--bas)}
.vide{color:var(--dim);font-style:italic}
.verdict{background:var(--panel);border-left:3px solid var(--ok);padding:14px 18px;margin:16px 0;font-size:1.05rem;font-weight:700;color:#fff}
footer{margin-top:44px;border-top:1px solid var(--bord);padding-top:16px;color:var(--dim);font-size:.84rem}
</style></head><body><div class="wrap">
<h1>Vérification de correction</h1>
<p class="lead">Version de référence : <code>${esc(A.nom)}</code><br>Version corrigée : <code>${esc(B.nom)}</code> · ${date}</p>

<div class="verdict">${esc(verdict)}</div>

<div class="grille">
  <div class="stat"><div class="n" style="color:var(--ok)">${corriges.length}</div><div class="l">Corrigés</div></div>
  <div class="stat"><div class="n" style="color:var(--moyen)">${subsistants.length}</div><div class="l">Subsistants</div></div>
  <div class="stat"><div class="n" style="color:var(--crit)">${nouveaux.length}</div><div class="l">Nouveaux</div></div>
  <div class="stat"><div class="n">${baisse}%</div><div class="l">Réduction du risque</div></div>
</div>

<div class="lead" style="background:var(--panel);border-left:3px solid var(--moyen);padding:12px 16px">
Le rapprochement se fait par règle et par fichier : un déplacement de ligne ne compte pas comme une correction.
Analyse statique par motifs — le code n'est <strong>jamais exécuté</strong>. Aucune garantie d'absence de vulnérabilité.
</div>

<h2>Constructions corrigées (${corriges.length})</h2>${liste(corriges,'corrige')}
<h2>Constructions subsistantes (${subsistants.length})</h2>${liste(subsistants,'subsiste')}
<h2>Nouvelles constructions à risque (${nouveaux.length})</h2>${liste(nouveaux,'nouveau')}

<footer>Vérification différentielle — Arthur Grossi EI · arthhur.grossi@gmail.com<br>
Ce document prouve ce qui a changé entre deux versions ; il ne certifie pas la sécurité du système.</footer>
</div></body></html>`;

writeFileSync(sortie, html);
console.log(JSON.stringify({ avant:A.nom, apres:B.nom, corriges:corriges.length, subsistants:subsistants.length,
  nouveaux:nouveaux.length, reductionRisque:baisse + '%', verdict, rapport:sortie }, null, 2));
