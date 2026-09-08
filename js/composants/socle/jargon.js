// tabindex="0" et role="button" sur le span extérieur : sans eux la
// définition n'est atteignable qu'à la souris. La bulle apparaît au survol
// et au focus (voir composants.css, règle :focus-within).
import { LEXIQUE } from '../../lexique.js'
import { locale, t } from '../../i18n.js'

export const Jargon = {
  props: { mot: { type: String, required: true } },
  computed: {
    definition () { return LEXIQUE[locale()]?.[this.mot] ?? '' },
    etiquette () { return `${t('definitionDe')} ${this.mot}` }
  },
  template: `
    <span class="jargon" tabindex="0" role="button" :aria-label="etiquette">
      <slot>{{ mot }}</slot>
      <span class="jargon-bulle" role="note">{{ definition }}</span>
    </span>
  `
}
