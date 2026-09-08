// Chaînes de l'interface, par langue. Les fragments portent leur propre
// texte ; ici ne vit que ce que la coquille et les composants affichent.
export const LOCALES = ['fr', 'en']
export const LOCALE_DEFAUT = 'fr'

export const TEXTES = {
  fr: {
    blog: 'Blog',
    aucunArticle: "Aucun article pour l'instant.",
    publie: 'Publié le',
    maj: 'mis à jour le',
    chargement: 'Chargement de la page.',
    introuvable: 'Page introuvable',
    introuvableDetail: "Cette page n'existe pas.",
    lesArticles: 'Les articles du blog',
    leCv: 'le CV',
    ou: 'ou',
    precedent: 'Précédent',
    suivant: 'Suivant',
    themeClair: 'Passer au thème clair',
    themeSombre: 'Passer au thème sombre',
    clair: 'Clair',
    sombre: 'Sombre',
    autreLangue: 'English',
    sauter: 'Aller au contenu',
    ecriture: {
      main: { libelle: 'Écrit à la main', detail: 'Rédigé sans IA. Une IA a pu relire.' },
      ia: { libelle: 'Écrit avec une IA', detail: 'Rédigé avec une IA, relu et corrigé à la main.' }
    },
    devineExact: 'Exact.',
    devineFaux: 'Non, et c’est tout l’intérêt.',
    allerPlusLoin: 'Aller plus loin',
    mesure: 'mesuré',
    definitionDe: 'Définition de',
    palettes: { choisir: 'Couleurs de la feuille', jaune: 'Jaune', bleu: 'Bleu', orange: 'Orange', noir: 'Noir', papier: 'Papier' },
    dateFormat: 'fr-FR'
  },
  en: {
    blog: 'Blog',
    aucunArticle: 'No articles yet.',
    publie: 'Published on',
    maj: 'updated on',
    chargement: 'Loading the page.',
    introuvable: 'Page not found',
    introuvableDetail: 'This page does not exist.',
    lesArticles: 'The blog posts',
    leCv: 'the CV',
    ou: 'or',
    precedent: 'Previous',
    suivant: 'Next',
    themeClair: 'Switch to light theme',
    themeSombre: 'Switch to dark theme',
    clair: 'Light',
    sombre: 'Dark',
    autreLangue: 'Français',
    sauter: 'Skip to content',
    ecriture: {
      main: { libelle: 'Handwritten', detail: 'Written without AI. An AI may have proofread it.' },
      ia: { libelle: 'Written with AI', detail: 'Written with an AI, reviewed and corrected by hand.' }
    },
    devineExact: 'Correct.',
    devineFaux: 'No, and that is the whole point.',
    allerPlusLoin: 'Going further',
    mesure: 'measured',
    definitionDe: 'Definition of',
    palettes: { choisir: 'Sheet colours', jaune: 'Yellow', bleu: 'Blue', orange: 'Orange', noir: 'Black', papier: 'Paper' },
    dateFormat: 'en-GB'
  }
}

// La langue courante est celle du document : app.js la pose à chaque route,
// et les composants la lisent au rendu sans avoir à la recevoir en prop.
export function locale () {
  const l = document.documentElement.lang
  return LOCALES.includes(l) ? l : LOCALE_DEFAUT
}

export function t (cle) {
  return TEXTES[locale()][cle]
}
