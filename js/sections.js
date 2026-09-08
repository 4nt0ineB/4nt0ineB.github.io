// Manifeste des sections et de leurs pages : source unique pour le routeur,
// le sommaire, la navigation précédent/suivant et le vérificateur.
//
// Une section avec `sommaire: true` affiche la liste de ses pages en marge,
// comme un livre. Le blog en est un, trié par date décroissante. Le CV n'a
// qu'une page et pas de marge.
export const SECTIONS = {
  observabilite: {
    titre: "Introduction à l'observabilité",
    sommaire: true,
    pages: [
      { slug: 'accueil',              titre: "Introduction à l'observabilité", minutes: 1, fichier: 'observabilite/00-accueil.html' },
      { slug: 'prod-sans-debogueur',  titre: "La prod n'a pas de débogueur", minutes: 2, fichier: 'observabilite/01-prod-sans-debogueur.html' },
      { slug: 'trois-piliers',        titre: 'Trois piliers, et pourquoi exactement trois', minutes: 5, fichier: 'observabilite/02-trois-piliers.html' },
      { slug: 'le-trajet',            titre: "Le trajet d'une donnée", minutes: 3, fichier: 'observabilite/03-le-trajet.html' },
      { slug: 'les-outils',           titre: 'Les outils, un par un', minutes: 5, fichier: 'observabilite/04-les-outils.html' },
      { slug: 'instrumenter',         titre: "Ce qu'on écrit soi-même", minutes: 3, fichier: 'observabilite/05-instrumenter.html' },
      { slug: 'lire-un-graphe',       titre: 'Lire un graphe sans se tromper', minutes: 4, fichier: 'observabilite/06-lire-un-graphe.html' },
      { slug: 'sondes',               titre: 'Les sondes sont des commandes', minutes: 4, fichier: 'observabilite/07-sondes.html' },
      { slug: 'alerting',             titre: "Un signal doit atteindre quelqu'un", minutes: 2, fichier: 'observabilite/08-alerting.html' },
      { slug: 'livrer',               titre: "L'observabilité dans le pipeline", minutes: 1, fichier: 'observabilite/09-livrer.html' },
      { slug: 'dashboard-vert',       titre: "Ce qu'un dashboard vert ne dit pas", minutes: 2, fichier: 'observabilite/10-dashboard-vert.html' },
      { slug: 'checklist',            titre: 'Checklist pratique', minutes: 2, fichier: 'observabilite/11-checklist.html' }
    ]
  },
  blog: {
    titre: 'Blog',
    sommaire: true,
    // { slug, titre, date: 'AAAA-MM-JJ', minutes, fichier: 'blog/<slug>.html' }
    pages: []
  },
  cv: {
    titre: 'CV',
    sommaire: false,
    pages: [
      { slug: 'cv', titre: 'Antoine Bastos', fichier: 'cv/cv.html' }
    ]
  }
}

// La page principale du site est le CV : #/ et #/cv affichent la même page.
export const ACCUEIL = SECTIONS.cv.pages[0]

// Les sections proposées dans l'en-tête. Le CV n'y est pas : le titre du
// site y mène déjà.
export const SECTIONS_EN_TETE = ['observabilite', 'blog']

export function toutesLesPages () {
  return Object.values(SECTIONS).flatMap(s => s.pages)
}

export function page (section, slug) {
  const s = SECTIONS[section]
  if (!s) return null
  if (slug === null) return s.pages[0] ?? null
  return s.pages.find(p => p.slug === slug) ?? null
}

export function voisins (section, slug) {
  const pages = SECTIONS[section]?.pages ?? []
  const i = pages.findIndex(p => p.slug === slug)
  if (i === -1) return { precedent: null, suivant: null }
  return {
    precedent: i > 0 ? pages[i - 1] : null,
    suivant: i < pages.length - 1 ? pages[i + 1] : null
  }
}
