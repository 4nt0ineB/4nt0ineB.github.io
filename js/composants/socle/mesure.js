export const Mesure = {
  props: {
    valeur: { type: String, required: true },
    source: { type: String, required: true }
  },
  template: `
    <span class="mesure">
      <span class="mesure-valeur">{{ valeur }}</span>
      <span class="mesure-libelle"><slot></slot></span>
      <span class="mesure-source" :title="source">mesuré</span>
    </span>
  `
}
