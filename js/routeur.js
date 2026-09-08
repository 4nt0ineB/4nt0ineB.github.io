// Routage par hash, pas par l'API History : le hash fonctionne depuis
// n'importe quel hébergeur statique sans réécriture côté serveur, GitHub
// Pages compris. Formes : #/ (le CV), #/cv, #/blog, #/blog/article,
// #/blog/article/page, et #ancre en suffixe.
export function routeCourante () {
  const brut = window.location.hash.replace(/^#\/?/, '')
  const [chemin, ancre = null] = brut.split('#')
  const [section = '', article = '', page = ''] = chemin.split('/')
  return { section: section || null, article: article || null, page: page || null, ancre }
}

export function lienArticle (article, page = null, ancre = null) {
  const base = page ? `#/blog/${article}/${page}` : `#/blog/${article}`
  return ancre ? `${base}#${ancre}` : base
}

export function surChangement (cb) {
  window.addEventListener('hashchange', cb)
}
