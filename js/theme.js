// Cette valeur est dupliquée dans le script inline de index.html : un module
// ES ne peut pas s'exécuter de façon synchrone et bloquante dans le head,
// avant le premier rendu, donc ce script ne peut pas importer THEME_CLE.
// Si cette chaîne change, changer aussi celle de index.html.
export const THEME_CLE = 'obs-theme'

// localStorage lève en navigation privée et quand le navigateur bloque le
// stockage. Une préférence de thème ne vaut pas une page blanche.
function lireStockage (cle) {
  try { return localStorage.getItem(cle) } catch { return null }
}

function ecrireStockage (cle, valeur) {
  try { localStorage.setItem(cle, valeur) } catch { /* sans effet */ }
}

export function themeEnregistre () {
  const t = lireStockage(THEME_CLE)
  return t === 'light' || t === 'dark' ? t : null
}

export function themePrefere () {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function themeEffectif () {
  return themeEnregistre() ?? themePrefere()
}

export function appliquerTheme (theme) {
  if (theme === null) {
    document.documentElement.removeAttribute('data-theme')
    return
  }
  document.documentElement.setAttribute('data-theme', theme)
}

export function basculerTheme () {
  const suivant = themeEffectif() === 'dark' ? 'light' : 'dark'
  ecrireStockage(THEME_CLE, suivant)
  appliquerTheme(suivant)
  return suivant
}
