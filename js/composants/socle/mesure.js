import { t } from '../../i18n.js'

export const Mesure = {
  props: {
    valeur: { type: String, required: true },
    source: { type: String, required: true }
  },
  computed: { libelle: () => t('mesure') },
  template: `
    <span class="mesure">
      <span class="mesure-valeur">{{ valeur }}</span>
      <span class="mesure-libelle"><slot></slot></span>
      <span class="mesure-source" :title="source">{{ libelle }}</span>
    </span>
  `
}
