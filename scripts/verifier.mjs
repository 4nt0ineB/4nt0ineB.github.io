import { readFile, readdir } from 'node:fs/promises'
import { fileURLToPath, pathToFileURL } from 'node:url'
import path from 'node:path'

const RACINE = path.dirname(path.dirname(fileURLToPath(import.meta.url)))

const erreurs = []
const infos = []

function echec (message) { erreurs.push(message) }

// --- Éléments HTML et SVG standard ---------------------------------------

// Sensible à la casse : les noms SVG comme linearGradient ou clipPath ne
// s'écrivent pas en minuscules. Tout ce qui n'est ni ici ni enregistré
// (réellement, à l'exécution) par js/composants/index.js est une balise
// inconnue.
const ELEMENTS_STANDARD = new Set([
  'a', 'abbr', 'address', 'article', 'aside', 'audio',
  'b', 'blockquote', 'body', 'br', 'button',
  'canvas', 'caption', 'cite', 'code', 'col', 'colgroup',
  'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt',
  'em', 'embed',
  'fieldset', 'figcaption', 'figure', 'footer', 'form',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html',
  'i', 'iframe', 'img', 'input', 'ins',
  'kbd',
  'label', 'legend', 'li', 'link',
  'main', 'map', 'mark', 'menu', 'meta', 'meter',
  'nav', 'noscript',
  'object', 'ol', 'optgroup', 'option', 'output',
  'p', 'picture', 'pre', 'progress',
  'q',
  'rp', 'rt', 'ruby',
  's', 'samp', 'script', 'search', 'section', 'select', 'slot', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup',
  'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track',
  'u', 'ul',
  'var', 'video',
  'wbr',
  // Éléments SVG employés dans le projet.
  'svg', 'g', 'path', 'rect', 'circle', 'ellipse', 'line', 'polyline', 'polygon',
  'text', 'tspan', 'defs', 'use', 'marker', 'linearGradient', 'stop', 'clipPath',
  'foreignObject', 'animate', 'animateTransform'
])

// --- Outils de lecture d'un fragment ------------------------------------

// Retire le contenu des dépliants : ils sont facultatifs, donc ils ne
// comptent pas dans le décompte de lecture. Suppose des
// dépliants non imbriqués : l'imbrication est une erreur détectée à part
// (contrôle 6 ci-dessous), donc ce cas n'a pas à être géré ici.
function sansDepliants (html) {
  return html.replace(/<aller-plus-loin[\s\S]*?<\/aller-plus-loin>/g, '')
}

function texteSeul (html) {
  return html
    .replace(/<pre[\s\S]*?<\/pre>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function compterMots (html) {
  const t = texteSeul(html)
  return t === '' ? 0 : t.split(' ').length
}

// Un <pre> ou un <code> peut légitimement montrer du HTML en exemple : ce
// contenu n'est pas de la mise en page réelle du chapitre, on l'ignore.
function sansExemples (html) {
  return html
    .replace(/<pre[\s\S]*?<\/pre>/g, ' ')
    .replace(/<code[\s\S]*?<\/code>/g, ' ')
}

// Toute balise ouvrante rencontrée, quelle que soit sa casse (les noms SVG
// comme linearGradient en dépendent : ce contrôle-là reste sensible à la
// casse). Les balises fermantes (</...>) ne sont jamais capturées, le
// premier caractère après < devant être une lettre.
function balisesUtilisees (html) {
  const trouvees = new Set()
  for (const m of sansExemples(html).matchAll(/<([A-Za-z][A-Za-z0-9-]*)(?=[\s/>])/g)) {
    trouvees.add(m[1])
  }
  return trouvees
}

// Accepte guillemets doubles et simples : <jargon mot="x"> et <jargon mot='x'>.
function motsDeJargon (html) {
  const trouves = new Set()
  for (const m of html.matchAll(/<jargon[^>]*\bmot\s*=\s*(?:"([^"]+)"|'([^']+)')/g)) {
    trouves.add(m[1] ?? m[2])
  }
  return trouves
}

// La valeur de l'attribut id de chaque <h2>, insensible à la casse de la
// balise, guillemets doubles ou simples acceptés. null si l'attribut est
// absent, chaîne vide si présent mais vide : les deux sont des ancres mortes.
function idsDeH2 (html) {
  const ids = []
  for (const m of html.matchAll(/<h2\b([^>]*)>/gi)) {
    const idMatch = m[1].match(/\bid\s*=\s*(?:"([^"]*)"|'([^']*)')/i)
    ids.push(idMatch ? (idMatch[1] ?? idMatch[2]) : null)
  }
  return ids
}

// true si un <aller-plus-loin> s'ouvre alors qu'un autre est déjà ouvert.
// Un simple compteur de profondeur suffit : nul besoin d'un analyseur
// d'imbrication complet quand l'imbrication elle-même est interdite.
function depliantsImbriques (html) {
  let profondeur = 0
  let imbrique = false
  for (const m of html.matchAll(/<\/?aller-plus-loin\b[^>]*>/g)) {
    if (m[0].startsWith('</')) {
      profondeur = Math.max(0, profondeur - 1)
    } else {
      if (profondeur > 0) imbrique = true
      profondeur++
    }
  }
  return imbrique
}

// --- Contrôles -----------------------------------------------------------

const { toutesLesPages } = await import(pathToFileURL(path.join(RACINE, 'js/sections.js')).href)
const PAGES = toutesLesPages()
const { LEXIQUE } = await import(pathToFileURL(path.join(RACINE, 'js/lexique.js')).href)

// Les composants réellement enregistrés à l'exécution, pas ceux qui
// ressemblent à un appel à app.component('nom', ...) dans le texte du
// fichier : un commentaire ou un exemple montrant cette forme ne doit rien
// enregistrer. On interroge le module, on ne lit pas son code source.
const noms = new Set()
const fausseApp = { component (nom) { noms.add(nom); return fausseApp } }
const { enregistrer } = await import(pathToFileURL(path.join(RACINE, 'js/composants/index.js')).href)
enregistrer(fausseApp)
const enregistrees = noms

// 1. Tiret cadratin nulle part sous site/, caractère littéral ou entité HTML
async function fichiersRecursifs (dir) {
  const sorties = []
  for (const e of await readdir(dir, { withFileTypes: true })) {
    if (e.name === 'node_modules' || e.name.startsWith('.')) continue
    const p = path.join(dir, e.name)
    if (e.isDirectory()) sorties.push(...await fichiersRecursifs(p))
    else if (/\.(html|css|js|mjs|json|md)$/.test(e.name)) sorties.push(p)
  }
  return sorties
}

// Le caractere est ecrit en echappement Unicode, sinon ce fichier se
// signalerait lui-meme : il porte l'extension .mjs et vit sous site/.
const CADRATIN_CARACTERE = new RegExp('\\u2014', 'g')

// Trois entites HTML s'affichent comme un tiret cadratin dans le
// navigateur sans etre le caractere U+2014 dans le fichier : le nom
// mdash, le decimal 8212, et l'hexadecimal x2014. Insensible a la casse,
// donc la variante en majuscules de chacune compte aussi. Le motif exact
// (avec l'esperluette et le point-virgule) n'est pas ecrit ici en clair,
// sinon ce fichier se detecterait lui-meme : il vit sous site/ et decrit
// la forme qu'il cherche.
const CADRATIN_ENTITE = new RegExp('&(?:mdash|#8212|#x2014);', 'gi')

for (const f of await fichiersRecursifs(RACINE)) {
  const contenu = await readFile(f, 'utf8')
  const rel = path.relative(RACINE, f)
  const nCar = (contenu.match(CADRATIN_CARACTERE) ?? []).length
  if (nCar > 0) echec(`${rel} : ${nCar} caractere(s) tiret cadratin (U+2014 litteral)`)
  const nEnt = (contenu.match(CADRATIN_ENTITE) ?? []).length
  if (nEnt > 0) echec(`${rel} : ${nEnt} entite(s) HTML de tiret cadratin`)
}

// 2 a 6, par chapitre
for (const c of PAGES) {
  const chemin = path.join(RACINE, c.fichier)
  let html
  try {
    html = await readFile(chemin, 'utf8')
  } catch {
    echec(`${c.fichier} : manquant, alors qu'il est dans le manifeste`)
    continue
  }

  // 2a. structure des dépliants eux-mêmes, avant de compter les mots
  const nOuvrantes = (html.match(/<aller-plus-loin\b[^>]*>/g) ?? []).length
  const nFermantes = (html.match(/<\/aller-plus-loin>/g) ?? []).length
  if (nOuvrantes !== nFermantes) {
    echec(`${(c.slug ?? c.fichier)} : ${nOuvrantes} ouverture(s) et ${nFermantes} fermeture(s) de <aller-plus-loin>, balise mal fermee`)
  }
  if (depliantsImbriques(html)) {
    echec(`${(c.slug ?? c.fichier)} : un <aller-plus-loin> imbrique dans un autre, c'est interdit`)
  }

  // 2b. décompte de mots, hors dépliants. Une observation, pas une limite :
  // un indicateur cesse d'en être un quand il devient une cible.
  const principal = compterMots(sansDepliants(html))
  const total = compterMots(html)
  infos.push(`${(c.slug ?? c.fichier).padEnd(24)} ${String(principal).padStart(5)} mots  (${total} avec les dépliants)`)

  // 3. un seul h1, insensible à la casse
  const h1 = (html.match(/<h1\b[^>]*>/gi) ?? []).length
  if (h1 !== 1) echec(`${(c.slug ?? c.fichier)} : ${h1} balise(s) h1, il en faut exactement une`)

  // 4. toute balise rencontrée est un élément HTML/SVG standard, ou un
  // composant réellement enregistré par js/composants/index.js. Sans trait
  // d'union (regle, mesure, devine, jargon) comme avec (aller-plus-loin).
  for (const balise of balisesUtilisees(html)) {
    if (!ELEMENTS_STANDARD.has(balise) && !enregistrees.has(balise)) {
      echec(`${(c.slug ?? c.fichier)} : <${balise}> n'est enregistré dans aucun composant`)
    }
  }

  // 5. tout mot de jargon a une définition
  for (const mot of motsDeJargon(html)) {
    if (!(mot in LEXIQUE)) echec(`${(c.slug ?? c.fichier)} : jargon "${mot}" absent du lexique`)
  }

  // 5b. un mot de jargon n'est enveloppé qu'une fois par page, à sa
  // première occurrence, sinon la bulle devient un tic répété.
  const compteJargon = {}
  for (const m of html.matchAll(/<jargon[^>]*\bmot="([^"]+)"/g)) {
    compteJargon[m[1]] = (compteJargon[m[1]] ?? 0) + 1
  }
  for (const [mot, n] of Object.entries(compteJargon)) {
    if (n > 1) echec(`${(c.slug ?? c.fichier)} : jargon "${mot}" enveloppé ${n} fois, une seule suffit`)
  }

  // 6. chaque h2 porte un identifiant non vide, et deux h2 du même chapitre
  // ne partagent pas le même identifiant (ancre ambiguë, même panne).
  const idsH2 = idsDeH2(html)
  for (const id of idsH2) {
    if (id === null || id === '') {
      echec(`${(c.slug ?? c.fichier)} : un h2 sans identifiant valide (id absent ou vide), son ancre serait morte`)
    }
  }
  const comptages = new Map()
  for (const id of idsH2) {
    if (id === null || id === '') continue
    comptages.set(id, (comptages.get(id) ?? 0) + 1)
  }
  for (const [id, n] of comptages) {
    if (n > 1) echec(`${(c.slug ?? c.fichier)} : identifiant "${id}" utilisé par ${n} balises h2, l'ancre est ambiguë`)
  }
}

// --- Sortie --------------------------------------------------------------

console.log(infos.join('\n'))
if (erreurs.length > 0) {
  console.error(`\n${erreurs.length} probleme(s) :`)
  for (const e of erreurs) console.error(`  - ${e}`)
  process.exit(1)
}
console.log('\nTout est conforme.')
