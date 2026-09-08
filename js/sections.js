// Manifeste du site : source unique pour le routeur, la liste du blog, le
// sommaire d'un article, la navigation précédent/suivant et le vérificateur.
//
// Un article a une ou plusieurs pages. Avec plusieurs pages, un sommaire
// s'affiche en marge et la route porte la page : #/blog/article/page. Avec
// une seule, #/blog/article suffit et le sommaire n'apparaît pas.
// Dates en AAAA-MM-JJ : `publie` sert au tri de la liste, `maj` s'affiche
// dans l'article.
const OBS = 'blog/introduction-observabilite'

export const ARTICLES = [
  {
    slug: 'introduction-observabilite',
    titre: "Introduction à l'observabilité",
    publie: '2026-09-08',
    maj: '2026-09-08',
    pages: [
      { slug: 'accueil',              titre: "Introduction à l'observabilité", minutes: 1, fichier: `${OBS}/00-accueil.html` },
      { slug: 'prod-sans-debogueur',  titre: "La prod n'a pas de débogueur", minutes: 2, fichier: `${OBS}/01-prod-sans-debogueur.html` },
      { slug: 'trois-piliers',        titre: 'Trois piliers, et pourquoi exactement trois', minutes: 5, fichier: `${OBS}/02-trois-piliers.html` },
      { slug: 'le-trajet',            titre: "Le trajet d'une donnée", minutes: 3, fichier: `${OBS}/03-le-trajet.html` },
      { slug: 'les-outils',           titre: 'Les outils, un par un', minutes: 5, fichier: `${OBS}/04-les-outils.html` },
      { slug: 'instrumenter',         titre: "Ce qu'on écrit soi-même", minutes: 3, fichier: `${OBS}/05-instrumenter.html` },
      { slug: 'lire-un-graphe',       titre: 'Lire un graphe sans se tromper', minutes: 4, fichier: `${OBS}/06-lire-un-graphe.html` },
      { slug: 'sondes',               titre: 'Les sondes sont des commandes', minutes: 4, fichier: `${OBS}/07-sondes.html` },
      { slug: 'alerting',             titre: "Un signal doit atteindre quelqu'un", minutes: 2, fichier: `${OBS}/08-alerting.html` },
      { slug: 'livrer',               titre: "L'observabilité dans le pipeline", minutes: 1, fichier: `${OBS}/09-livrer.html` },
      { slug: 'dashboard-vert',       titre: "Ce qu'un dashboard vert ne dit pas", minutes: 2, fichier: `${OBS}/10-dashboard-vert.html` },
      { slug: 'checklist',            titre: 'Checklist pratique', minutes: 2, fichier: `${OBS}/11-checklist.html` }
    ]
  }
]

// La page principale du site : #/ et #/cv l'affichent.
export const CV = { slug: 'cv', titre: 'Antoine Bastos', fichier: 'cv/cv.html' }

// Du plus récent au plus ancien, quel que soit l'ordre d'écriture ci-dessus.
export function articlesParDate () {
  return [...ARTICLES].sort((a, b) => b.publie.localeCompare(a.publie))
}

export function article (slug) {
  return ARTICLES.find(a => a.slug === slug) ?? null
}

export function pageDe (art, slug) {
  if (slug === null) return art.pages[0]
  return art.pages.find(p => p.slug === slug) ?? null
}

export function voisins (art, slug) {
  const i = art.pages.findIndex(p => p.slug === slug)
  return {
    precedent: i > 0 ? art.pages[i - 1] : null,
    suivant: i >= 0 && i < art.pages.length - 1 ? art.pages[i + 1] : null
  }
}

export function toutesLesPages () {
  return [CV, ...ARTICLES.flatMap(a => a.pages)]
}
