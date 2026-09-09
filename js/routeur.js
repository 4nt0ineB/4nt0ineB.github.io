// Routage par hash, pas par l'API History : le hash fonctionne depuis
// n'importe quel hébergeur statique sans réécriture côté serveur, GitHub
// Pages compris. Formes : #/fr (l'accueil), #/fr/cv, #/fr/cv/fancy, #/fr/blog,
// #/fr/blog/article, #/fr/blog/article/page, et #ancre en suffixe. Sans
// langue en tête, la langue par défaut est prise.
import { LOCALES, LOCALE_DEFAUT } from './i18n.js'

export function routeCourante () {
  const brut = window.location.hash.replace(/^#\/?/, '')
  const [chemin, ancre = null] = brut.split('#')
  const parts = chemin.split('/').filter(Boolean)
  const locale = LOCALES.includes(parts[0]) ? parts.shift() : LOCALE_DEFAUT
  const [section = null, article = null, page = null] = parts
  return { locale, section, article, page, ancre }
}

export function lien (locale, section = null, article = null, page = null, ancre = null) {
  const parts = [locale, section, article, page].filter(Boolean)
  const base = `#/${parts.join('/')}`
  return ancre ? `${base}#${ancre}` : base
}

export function surChangement (cb) {
  window.addEventListener('hashchange', cb)
}
