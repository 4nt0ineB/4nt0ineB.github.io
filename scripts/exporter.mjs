// Exporte les fragments de chapitre en un seul markdown relisible, pour
// retravailler le texte hors du site. La conversion est volontairement
// dissymetrique :
//
//   - la prose devient du markdown, donc editable au fil de l'eau ;
//   - tout ce qui est fonctionnel reste visible et intact. Les composants a
//     prose (regle, aller-plus-loin, devine) deviennent des blocs :::nom, les
//     composants en ligne (jargon, mesure) restent du HTML litteral, et les
//     schemas deviennent une fiche descriptive.
//
// Les identifiants des <h2> sont conserves en suffixe {#ancre} : ce sont des
// cibles de liens croises, les perdre casserait 27 renvois.
//
// Usage : node scripts/exporter.mjs [fr|en] [chemin de sortie]

import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath, pathToFileURL } from 'node:url'
import path from 'node:path'

const RACINE = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const LOCALE = process.argv[2] ?? 'fr'
const SORTIE = process.argv[3] ?? path.join(RACINE, 'sources', `site-texte.${LOCALE}.md`)

const { toutesLesPages } = await import(pathToFileURL(path.join(RACINE, 'js/sections.js')).href)

// Ce que montre chaque schema. Ecrit a la main : un script ne peut pas
// deviner ce qu'un SVG raconte. Les titres, eux, sont lus dans les composants.
const SCHEMAS = {
  'schema-cardinalite': "Des cases a cocher, une par etiquette de metrique (statut 5 valeurs, route 20, methode 6, identifiant client 40 000, URL sans limite). Une barre en echelle logarithmique et un compteur suivent le nombre de series stockees, et basculent en alerte au-dela du seuil.",
  'schema-trois-etages': "L'enquete du checkout lent en trois clics. Etage 1 le graphe de latence avec son point d'exemplar, etage 2 la trace en cascade et ses cent requetes jumelles, etage 3 la ligne de log filtree sur l'identifiant de trace.",
  'schema-pull-push': "Deux colonnes animees en boucle. A gauche Prometheus qui va chercher ses metriques, a droite l'agent qui pousse ses logs vers Loki.",
  'schema-reaction-chaine': "Quatre instances et une base. Un interrupteur « la liveness interroge la base », un bouton pour couper la base. Le compteur de redemarrages reste a zero dans le bon scenario et grimpe dans le mauvais.",
  'schema-fenetre-rate': "Un incident reel de 6 secondes, et un curseur de fenetre de requete. La courbe de verite ne bouge jamais, la courbe affichee s'elargit et s'aplatit a mesure que la fenetre grandit.",
  'schema-agregat': "Un bouton a deux positions, somme des pools contre detail par pool. La somme affiche 65 pour cent, le detail montre PS Old Gen a 97 pour cent de son propre plafond.",
  'schema-choisir-sa-mort': "Des boites emboitees et un curseur sur -Xmx, la limite du conteneur restant fixe a 512 Mio. Le verdict affiche annonce exit 3 en regime sain et exit 137 quand le heap depasse la limite.",
  'schema-connexions': "Quatre instances et un curseur sur le nombre de connexions du client. A une connexion, une seule instance recoit tout. Une case ajoute une cinquieme instance, qui ne recoit rien.",
  'schema-trois-colonnes': "Le pari d'abord : le lecteur designe la pire des trois protections avant de voir le tableau. La revelation met en evidence les lignes qui condamnent la colonne a zero pour cent d'erreur.",
  'schema-trajet': "Un schema en trois colonnes, application, tuyaux et stockages, ecran. Les quatre chemins s'allument l'un apres l'autre : /metrics que Prometheus vient lire, les traces vers le collecteur puis Tempo, la sortie standard lue par Alloy puis Loki, et Grafana qui lit les trois.",
  'schema-chaine-alerte': "La chaine d'une alerte, de la regle evaluee jusqu'au telephone. Un bouton bascule le recepteur entre null et ntfy, et le pulse s'arrete net dans le premier cas."
}

// --- Titres reels des schemas, lus dans les composants ---------------------

async function titresDuSchema (nom) {
  const fichier = path.join(RACINE, 'js/composants/schemas', nom.replace(/^schema-/, '') + '.js')
  let source
  try { source = await readFile(fichier, 'utf8') } catch { return [] }
  return [...source.matchAll(/<title[^>]*>([^<]+)<\/title>/g)].map(m => m[1].trim())
}

// --- Tokenisation ----------------------------------------------------------

function tokeniser (html) {
  const jetons = []
  let i = 0
  while (i < html.length) {
    const lt = html.indexOf('<', i)
    if (lt === -1) { pousserTexte(jetons, html.slice(i)); break }
    if (lt > i) pousserTexte(jetons, html.slice(i, lt))
    if (html.startsWith('<!--', lt)) { i = html.indexOf('-->', lt) + 3; continue }
    const gt = html.indexOf('>', lt)
    if (gt === -1) { pousserTexte(jetons, html.slice(lt)); break }
    const brut = html.slice(lt + 1, gt)
    if (brut.startsWith('/')) jetons.push({ t: 'fin', nom: brut.slice(1).trim() })
    else {
      const auto = brut.endsWith('/')
      const corps = auto ? brut.slice(0, -1) : brut
      const nom = corps.match(/^[a-zA-Z][a-zA-Z0-9-]*/)[0]
      jetons.push({ t: 'debut', nom, attrs: lireAttributs(corps.slice(nom.length)), auto })
    }
    i = gt + 1
  }
  return jetons
}

function pousserTexte (jetons, texte) {
  if (texte.trim() !== '' || /\s/.test(texte)) jetons.push({ t: 'texte', valeur: texte })
}

function lireAttributs (reste) {
  const attrs = {}
  for (const m of reste.matchAll(/([:@a-zA-Z][a-zA-Z0-9-]*)\s*=\s*("([^"]*)"|'([^']*)')/g)) {
    attrs[m[1]] = m[3] ?? m[4]
  }
  return attrs
}

// --- Arbre -----------------------------------------------------------------

const VIDES = new Set(['br', 'hr', 'img', 'input', 'meta', 'link'])

function construire (jetons) {
  const racine = { nom: '#racine', attrs: {}, enfants: [] }
  const pile = [racine]
  for (const j of jetons) {
    const sommet = pile[pile.length - 1]
    if (j.t === 'texte') { sommet.enfants.push({ nom: '#texte', valeur: j.valeur }); continue }
    if (j.t === 'debut') {
      const noeud = { nom: j.nom, attrs: j.attrs, enfants: [] }
      sommet.enfants.push(noeud)
      if (!j.auto && !VIDES.has(j.nom)) pile.push(noeud)
      continue
    }
    for (let k = pile.length - 1; k > 0; k--) {
      if (pile[k].nom === j.nom) { pile.length = k; break }
    }
  }
  return racine
}

// --- Rendu en ligne --------------------------------------------------------

function attrsHtml (attrs) {
  const e = Object.entries(attrs)
  return e.length === 0 ? '' : ' ' + e.map(([c, v]) => `${c}="${v}"`).join(' ')
}

function ligne (noeud) {
  if (noeud.nom === '#texte') return noeud.valeur.replace(/\s+/g, ' ')
  const dedans = noeud.enfants.map(ligne).join('')
  switch (noeud.nom) {
    case 'strong': case 'b': return `**${dedans.trim()}**`
    case 'em': case 'i': return `*${dedans.trim()}*`
    case 'code': return '`' + dedans.trim() + '`'
    case 'br': return '\n'
    case 'a': return `[${dedans.trim()}](${noeud.attrs.href ?? ''})`
    // Composants en ligne : conserves tels quels, ils portent des donnees.
    case 'jargon': case 'mesure':
      return `<${noeud.nom}${attrsHtml(noeud.attrs)}>${dedans}</${noeud.nom}>`
    default: return dedans
  }
}

// Attention : en francais, `;`, `:`, `!`, `?` et les guillemets prennent une
// espace avant. Seules la virgule et le point n'en prennent pas. Retirer
// l'espace devant les quatre premiers corromprait tout le texte a la
// reimportation, et de facon uniforme, donc invisible a la relecture.
// Texte litteral, retours a la ligne compris. Sert aux blocs <pre>.
function brut (noeud) {
  if (noeud.nom === '#texte') return noeud.valeur
  return noeud.enfants.map(brut).join('')
}

function propre (texte) {
  return texte.replace(/[ \t]+/g, ' ').replace(/ ([,.])/g, '$1').trim()
}

// --- Rendu en blocs --------------------------------------------------------

async function blocs (noeud, sortie) {
  for (const enfant of noeud.enfants) {
    if (enfant.nom === '#texte') continue
    await bloc(enfant, sortie)
  }
}

async function bloc (n, out) {
  switch (n.nom) {
    case 'h1': return // porte par l'en-tete de page
    case 'h2': {
      const ancre = n.attrs.id ? ` {#${n.attrs.id}}` : ''
      out.push(`## ${propre(n.enfants.map(ligne).join(''))}${ancre}`, '')
      return
    }
    case 'h3':
      out.push(`### ${propre(n.enfants.map(ligne).join(''))}`, '')
      return
    case 'p': {
      // Le surtitre est deja porte par l'en-tete de page, ne pas le repeter.
      if (n.attrs.class === 'eyebrow') return
      const t = propre(n.enfants.map(ligne).join(''))
      if (t !== '') out.push(t, '')
      return
    }
    case 'ul': case 'ol': {
      let i = 1
      for (const li of n.enfants.filter(e => e.nom === 'li')) {
        const puce = n.nom === 'ol' ? `${i++}.` : '-'
        out.push(`${puce} ${propre(li.enfants.map(ligne).join(''))}`)
      }
      out.push('')
      return
    }
    case 'pre': {
      // Surtout pas `propre` ni `ligne` ici : les deux ecrasent les retours a
      // la ligne, et un bloc de configuration aplati sur une ligne n'est plus
      // un bloc de configuration.
      const t = brut(n).replace(/^\n+|\s+$/g, '')
      const marge = Math.min(...t.split('\n').filter(l => l.trim())
        .map(l => l.match(/^ */)[0].length))
      out.push('```', t.split('\n').map(l => l.slice(marge)).join('\n'), '```', '')
      return
    }
    case 'table': return tableau(n, out)
    case 'regle':
      out.push(':::regle', propre(n.enfants.map(ligne).join('')), ':::', '')
      return
    case 'aller-plus-loin':
      out.push(`:::aller-plus-loin titre="${n.attrs.titre ?? ''}"`, '')
      await blocs(n, out)
      out.push(':::', '')
      return
    case 'tableau-mesure': {
      const leg = n.attrs.legende ? ` legende="${n.attrs.legende}"` : ''
      out.push(`:::tableau${leg}`, '')
      await blocs(n, out)
      out.push(':::', '')
      return
    }
    case 'devine': {
      out.push(':::devine')
      out.push(`question: ${n.attrs.question ?? ''}`)
      out.push(`options: ${n.attrs[':options'] ?? ''}`)
      out.push(`bonne: ${n.attrs[':bonne'] ?? ''}`, '')
      const rep = n.enfants.find(e => e.nom === 'template')
      if (rep) { out.push('reponse:', ''); await blocs(rep, out) }
      out.push(':::', '')
      return
    }
    case 'article': case 'div': case 'template': case 'figure':
      return blocs(n, out)
    default:
      if (n.nom.startsWith('schema-')) return fiche(n.nom, out)
      return blocs(n, out)
  }
}

function tableau (n, out) {
  const lignes = []
  const parcourir = (x) => {
    for (const e of x.enfants ?? []) {
      if (e.nom === 'tr') lignes.push(e)
      else if (e.nom === 'thead' || e.nom === 'tbody') parcourir(e)
    }
  }
  parcourir(n)
  if (lignes.length === 0) return
  const cellules = (tr) => tr.enfants.filter(e => e.nom === 'th' || e.nom === 'td')
    .map(c => propre(c.enfants.map(ligne).join('')).replace(/\|/g, '\\|'))
  const tete = cellules(lignes[0])
  out.push('| ' + tete.join(' | ') + ' |')
  out.push('|' + tete.map(() => '---').join('|') + '|')
  for (const tr of lignes.slice(1)) out.push('| ' + cellules(tr).join(' | ') + ' |')
  out.push('')
}

const TITRES_SCHEMA = {}

function fiche (nom, out) {
  out.push(`:::schema ${nom}`)
  for (const t of TITRES_SCHEMA[nom] ?? []) out.push(`titre: ${t}`)
  out.push(`voir: ${SCHEMAS[nom] ?? 'Description manquante.'}`)
  out.push(':::', '')
}

// --- Assemblage ------------------------------------------------------------

for (const nom of Object.keys(SCHEMAS)) TITRES_SCHEMA[nom] = await titresDuSchema(nom)

const out = [
  '# Texte du site, export pour relecture',
  '',
  `Genere par \`node scripts/exporter.mjs\` depuis les fragments de chaque section, le ${new Date().toISOString().slice(0, 10)}.`,
  '',
  'La prose est en markdown, modifiable librement. Ce qui suit est fonctionnel et doit rester en place :',
  '',
  '- `## Titre {#ancre}` : l\'ancre est la cible de liens croises, ne la renomme pas.',
  '- `<jargon mot="x">y</jargon>` : definit un terme a sa premiere occurrence dans la page.',
  '- `<mesure valeur="...">y</mesure>` : un chiffre mesuré, marqué comme tel.',
  '- `:::regle`, `:::aller-plus-loin`, `:::devine`, `:::tableau` : des blocs, dont la prose interieure est modifiable.',
  '- `:::schema` : une fiche descriptive, informative seulement. Le schema lui-meme est du code.',
  '',
  '---',
  ''
]

for (const c of toutesLesPages().filter(p => p.locale === LOCALE)) {
  const html = await readFile(path.join(RACINE, c.fichier), 'utf8')
  const arbre = construire(tokeniser(html))
  const article = arbre.enfants.find(e => e.nom === 'article') ?? arbre

  const surtitre = article.enfants.find(e => e.nom === 'p' && e.attrs.class === 'eyebrow')
  const h1 = article.enfants.find(e => e.nom === 'h1')

  out.push(`# ${h1 ? propre(h1.enfants.map(ligne).join('')) : c.titre}`, '')
  out.push('```', `article   : ${c.article}`, `page      : ${c.slug}`, `fichier   : ${c.fichier}`,
    `surtitre  : ${surtitre ? propre(surtitre.enfants.map(ligne).join('')) : ''}`,
    `lecture   : ${c.minutes ?? '-'} min`, '```', '')
  await blocs(article, out)
  out.push('---', '')
}

await writeFile(SORTIE, out.join('\n').replace(/\n{3,}/g, '\n\n'), 'utf8')
console.log(`ecrit ${SORTIE}`)
