// Routage par hash, pas par l'API History : le hash fonctionne depuis
// n'importe quel hébergeur statique sans réécriture côté serveur, GitHub
// Pages compris. Forme : #/section/slug, #/section/slug#ancre, #/section,
// ou #/ pour l'accueil.
export function routeCourante () {
  const brut = window.location.hash.replace(/^#\/?/, '')
  const [chemin, ancre = null] = brut.split('#')
  const [section = '', slug = ''] = chemin.split('/')
  return { section: section || null, slug: slug || null, ancre }
}

export function lien (section, slug = null, ancre = null) {
  const base = slug ? `#/${section}/${slug}` : `#/${section}`
  return ancre ? `${base}#${ancre}` : base
}

export function surChangement (cb) {
  window.addEventListener('hashchange', cb)
}
