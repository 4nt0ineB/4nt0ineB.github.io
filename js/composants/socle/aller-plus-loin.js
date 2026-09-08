// Bâti sur <details> natif, ce qui donne le clavier et les lecteurs
// d'écran sans code : ouverture à la souris, à Entrée et à Espace.
export const AllerPlusLoin = {
  props: { titre: { type: String, required: true } },
  template: `
    <details class="aller-plus-loin">
      <summary>
        <span class="apl-etiquette">Aller plus loin</span>
        <span class="apl-titre">{{ titre }}</span>
      </summary>
      <div class="apl-corps"><slot></slot></div>
    </details>
  `
}
