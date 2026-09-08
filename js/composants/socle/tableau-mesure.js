export const TableauMesure = {
  props: { legende: { type: String, default: '' } },
  template: `
    <figure class="tableau-mesure pleine-largeur">
      <div class="deborde"><slot></slot></div>
      <figcaption v-if="legende">{{ legende }}</figcaption>
    </figure>
  `
}
