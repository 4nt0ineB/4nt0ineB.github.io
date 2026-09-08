// tabindex="0" et role="button" sur le span extérieur : sans eux la
// définition n'est atteignable qu'à la souris. La bulle apparaît au survol
// et au focus (voir composants.css, règle :focus-within).
import { LEXIQUE } from '../../lexique.js'

export const Jargon = {
  props: { mot: { type: String, required: true } },
  computed: {
    definition () { return LEXIQUE[this.mot] ?? '' }
  },
  template: `
    <span class="jargon" tabindex="0" role="button" :aria-label="'Définition de ' + mot">
      <slot>{{ mot }}</slot>
      <span class="jargon-bulle" role="note">{{ definition }}</span>
    </span>
  `
}
