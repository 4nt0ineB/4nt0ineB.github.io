import { t } from '../../i18n.js'

// Cette clé est dupliquée dans le script inline de index.html, pour la même
// raison que THEME_CLE : la palette doit être posée avant le premier rendu.
export const PALETTE_CLE = 'cv-palette'
export const PALETTES = ['jaune', 'bleu', 'orange', 'noir', 'papier']

function lireStockage () {
  try { return localStorage.getItem(PALETTE_CLE) } catch { return null }
}

function ecrireStockage (valeur) {
  try { localStorage.setItem(PALETTE_CLE, valeur) } catch { /* sans effet */ }
}

export function paletteEnregistree () {
  const p = lireStockage()
  return PALETTES.includes(p) ? p : PALETTES[0]
}

export function appliquerPalette (palette) {
  document.documentElement.setAttribute('data-cv-palette', palette)
}

// Une paire fond/encre pour la feuille du CV, choisie par le lecteur et
// retenue d'une visite à l'autre. Indépendante du thème clair/sombre du site.
export const PalettesCv = {
  data: () => ({ palettes: PALETTES, courante: paletteEnregistree() }),
  computed: { libelles: () => t('palettes') },
  methods: {
    choisir (p) {
      this.courante = p
      ecrireStockage(p)
      appliquerPalette(p)
    }
  },
  mounted () { appliquerPalette(this.courante) },
  template: `
    <div class="cv-palettes" role="radiogroup" :aria-label="libelles.choisir">
      <button v-for="p in palettes" :key="p" type="button" role="radio"
              class="cv-palette" :class="'cv-palette-' + p"
              :aria-checked="p === courante" :aria-label="libelles[p]" :title="libelles[p]"
              @click="choisir(p)"></button>
    </div>
  `
}
