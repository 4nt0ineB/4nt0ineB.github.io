let observateur = null

export function observer () {
  cesser()
  if (!('IntersectionObserver' in window)) {
    // Sans l'API, tout est visible tout de suite : l'information passe,
    // seule la mise en scène est perdue.
    for (const el of document.querySelectorAll('.anime')) el.classList.add('est-visible')
    return
  }
  observateur = new IntersectionObserver((entrees) => {
    for (const e of entrees) {
      if (!e.isIntersecting) continue
      e.target.classList.add('est-visible')
      observateur.unobserve(e.target)
    }
  }, { rootMargin: '0px 0px -12% 0px' })

  for (const el of document.querySelectorAll('.anime')) observateur.observe(el)
}

export function cesser () {
  if (observateur) { observateur.disconnect(); observateur = null }
}
