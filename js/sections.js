// Manifeste du site : source unique pour le routeur, la liste du blog, le
// sommaire d'un article, la navigation précédent/suivant, le bouton de
// langue et le vérificateur.
//
// Un article a une entrée par langue (`fr`, `en`), chacune avec son titre et
// ses pages. Une langue absente veut dire pas de traduction : l'article ne
// figure pas dans la liste de cette langue et le bouton de langue ne le
// propose pas. Avec plusieurs pages, un sommaire s'affiche en marge et la
// route porte la page : #/fr/blog/article/page.
//
// Dates en AAAA-MM-JJ : `publie` sert au tri de la liste, `maj` s'affiche
// dans l'article. `ecriture` dit qui a tenu la plume, affiché en badge à
// côté des dates : 'main' (écrit à la main, relu par une IA au plus) ou
// 'ia' (écrit avec une IA, relu et corrigé à la main).
const OBS = 'blog/introduction-observabilite'

export const ARTICLES = [
  {
    slug: 'introduction-observabilite',
    publie: '2026-09-08',
    maj: '2026-09-08',
    ecriture: 'ia',
    fr: {
      titre: "Introduction à l'observabilité",
      pages: [
        { slug: 'accueil',              titre: "Introduction à l'observabilité", minutes: 1, fichier: `${OBS}/fr/00-accueil.html` },
        { slug: 'prod-sans-debogueur',  titre: "La prod n'a pas de débogueur", minutes: 2, fichier: `${OBS}/fr/01-prod-sans-debogueur.html` },
        { slug: 'trois-piliers',        titre: 'Trois piliers, et pourquoi exactement trois', minutes: 5, fichier: `${OBS}/fr/02-trois-piliers.html` },
        { slug: 'le-trajet',            titre: "Le trajet d'une donnée", minutes: 3, fichier: `${OBS}/fr/03-le-trajet.html` },
        { slug: 'les-outils',           titre: 'Les outils, un par un', minutes: 5, fichier: `${OBS}/fr/04-les-outils.html` },
        { slug: 'instrumenter',         titre: "L'instrumentation qu'on écrit soi-même", minutes: 3, fichier: `${OBS}/fr/05-instrumenter.html` },
        { slug: 'lire-un-graphe',       titre: 'Lire un graphe sans se tromper', minutes: 4, fichier: `${OBS}/fr/06-lire-un-graphe.html` },
        { slug: 'sondes',               titre: 'Les sondes sont des commandes', minutes: 4, fichier: `${OBS}/fr/07-sondes.html` },
        { slug: 'alerting',             titre: "Une alerte doit atteindre quelqu'un", minutes: 2, fichier: `${OBS}/fr/08-alerting.html` },
        { slug: 'livrer',               titre: "L'observabilité dans le pipeline", minutes: 1, fichier: `${OBS}/fr/09-livrer.html` },
        { slug: 'dashboard-vert',       titre: "Ce qu'un dashboard vert ne dit pas", minutes: 2, fichier: `${OBS}/fr/10-dashboard-vert.html` },
        { slug: 'checklist',            titre: 'Checklist pratique', minutes: 2, fichier: `${OBS}/fr/11-checklist.html` }
      ]
    },
    en: {
      titre: 'An introduction to observability',
      pages: [
        { slug: 'accueil',              titre: 'An introduction to observability', minutes: 1, fichier: `${OBS}/en/00-accueil.html` },
        { slug: 'prod-sans-debogueur',  titre: 'Production has no debugger', minutes: 2, fichier: `${OBS}/en/01-prod-sans-debogueur.html` },
        { slug: 'trois-piliers',        titre: 'Three pillars, and why exactly three', minutes: 4, fichier: `${OBS}/en/02-trois-piliers.html` },
        { slug: 'le-trajet',            titre: 'The journey of a data point', minutes: 3, fichier: `${OBS}/en/03-le-trajet.html` },
        { slug: 'les-outils',           titre: 'The tools, one by one', minutes: 4, fichier: `${OBS}/en/04-les-outils.html` },
        { slug: 'instrumenter',         titre: 'The instrumentation you write yourself', minutes: 2, fichier: `${OBS}/en/05-instrumenter.html` },
        { slug: 'lire-un-graphe',       titre: 'Reading a graph without being fooled', minutes: 4, fichier: `${OBS}/en/06-lire-un-graphe.html` },
        { slug: 'sondes',               titre: 'Probes are commands', minutes: 4, fichier: `${OBS}/en/07-sondes.html` },
        { slug: 'alerting',             titre: 'An alert has to reach someone', minutes: 2, fichier: `${OBS}/en/08-alerting.html` },
        { slug: 'livrer',               titre: 'Observability in the pipeline', minutes: 1, fichier: `${OBS}/en/09-livrer.html` },
        { slug: 'dashboard-vert',       titre: 'What a green dashboard does not say', minutes: 2, fichier: `${OBS}/en/10-dashboard-vert.html` },
        { slug: 'checklist',            titre: 'A practical checklist', minutes: 2, fichier: `${OBS}/en/11-checklist.html` }
      ]
    }
  }
]

// La page principale du site : #/fr et #/fr/cv l'affichent.
export const CV = {
  slug: 'cv',
  fr: { titre: 'Antoine Bastos', fichier: 'cv/cv.fr.html' },
  en: { titre: 'Antoine Bastos', fichier: 'cv/cv.en.html' }
}

// Du plus récent au plus ancien, dans une langue donnée.
export function articlesParDate (locale) {
  return ARTICLES.filter(a => a[locale]).sort((a, b) => b.publie.localeCompare(a.publie))
}

export function article (slug) {
  return ARTICLES.find(a => a.slug === slug) ?? null
}

export function pageDe (version, slug) {
  if (slug === null) return version.pages[0]
  return version.pages.find(p => p.slug === slug) ?? null
}

export function voisins (version, slug) {
  const i = version.pages.findIndex(p => p.slug === slug)
  return {
    precedent: i > 0 ? version.pages[i - 1] : null,
    suivant: i >= 0 && i < version.pages.length - 1 ? version.pages[i + 1] : null
  }
}

// Toutes les pages, avec leur langue, pour le vérificateur et l'exporteur.
export function toutesLesPages () {
  const pages = []
  for (const locale of ['fr', 'en']) {
    if (CV[locale]) pages.push({ locale, article: 'cv', slug: 'cv', ...CV[locale] })
    for (const a of ARTICLES) for (const p of a[locale]?.pages ?? []) pages.push({ locale, article: a.slug, ...p })
  }
  return pages
}
