// Bâti sur <details> natif, ce qui donne le clavier et les lecteurs
// d'écran sans code : ouverture à la souris, à Entrée et à Espace.
import { t } from '../../i18n.js'

export const AllerPlusLoin = {
  props: { titre: { type: String, required: true } },
  computed: { etiquette: () => t('allerPlusLoin') },
  template: `
    <details class="aller-plus-loin">
      <summary>
        <span class="apl-etiquette">{{ etiquette }}</span>
        <span class="apl-titre">{{ titre }}</span>
      </summary>
      <div class="apl-corps"><slot></slot></div>
    </details>
  `
}
