// Etat en data(), jamais setup()/ref : voir la note de devine.js.
//
// Les trois boîtes ne sont pas vraiment imbriquées dans le DOM : ce sont
// trois barres ancrées sur la même base, à la même échelle, superposées
// par largeur décroissante (limite la plus large, heap la plus étroite).
// Une barre plus étroite peut quand même dépasser en hauteur une barre
// plus large : c'est exactement le débordement que le brief demande, et
// il se lit sans ambiguïté parce que la limite du conteneur reste un
// contour fixe pendant que les deux autres bougent avec le curseur.
const LIMITE = 512
const HORS_HEAP = 150
const SEUIL_SAIN = LIMITE - HORS_HEAP // 362
const ECHELLE_MAX = 1200 // Mio, plafond visuel : accueille le pire cas (1024 + 150)

const XMX_MIN = 128
const XMX_MAX = 1024
const XMX_DEFAUT = 320

const VERDICTS = {
  sain: "La JVM tient sous la limite du conteneur, avec de la marge pour les coûts hors heap. Si elle manque de mémoire, elle meurt sur ses propres termes : exit 3, un log, parfois un dump.",
  serre: "Il reste peu de marge pour les coûts hors heap. La mort devient probable, et son auteur incertain : le runtime ou le noyau, selon lequel touche sa limite en premier.",
  dangereux: "Le heap peut à lui seul dépasser la limite du conteneur. exit 137, le noyau tue, sans préavis : aucun log, aucun event Kubernetes."
}

export const SchemaChoisirSaMort = {
  data () {
    return { xmx: XMX_DEFAUT }
  },
  computed: {
    empreinte () { return this.xmx + HORS_HEAP },
    regime () {
      if (this.xmx <= SEUIL_SAIN) return 'sain'
      if (this.xmx <= LIMITE) return 'serre'
      return 'dangereux'
    },
    verdict () { return VERDICTS[this.regime] },
    pctLimite () { return (LIMITE / ECHELLE_MAX) * 100 },
    pctEmpreinte () { return (this.empreinte / ECHELLE_MAX) * 100 },
    pctHeap () { return (this.xmx / ECHELLE_MAX) * 100 },
    empreinteDeborde () { return this.empreinte > LIMITE },
    heapDeborde () { return this.xmx > LIMITE },
    limite () { return LIMITE },
    xmxTexte () { return `${this.xmx} Mio` },
    labelAccessible () {
      return `Limite du conteneur : ${LIMITE} Mio. Empreinte du processus : ${this.empreinte} Mio. Heap : ${this.xmx} Mio. Régime ${this.regime}.`
    }
  },
  template: `
    <div class="schema-choisir-sa-mort pleine-largeur">
      <div class="csm-controles">
        <label for="csm-xmx">-Xmx, la taille maximale du heap</label>
        <input id="csm-xmx" type="range" :min="128" :max="1024" step="8"
               v-model.number="xmx" :aria-valuetext="xmxTexte">
        <span class="csm-valeur">{{ xmxTexte }}</span>
      </div>

      <div class="csm-scene" role="img" :aria-label="labelAccessible">
        <div class="csm-barre csm-limite" :style="{ height: pctLimite + '%' }">
          <span class="csm-etiquette">limite conteneur · {{ limite }} Mio</span>
        </div>
        <div class="csm-barre csm-empreinte" :class="{ 'est-alerte': empreinteDeborde }"
             :style="{ height: pctEmpreinte + '%' }">
          <span class="csm-etiquette">empreinte · {{ empreinte }} Mio</span>
        </div>
        <div class="csm-barre csm-heap" :class="{ 'est-alerte': heapDeborde }"
             :style="{ height: pctHeap + '%' }">
          <span class="csm-etiquette">heap · {{ xmx }} Mio</span>
        </div>
      </div>

      <p class="csm-verdict" role="status" :class="'est-' + regime">{{ verdict }}</p>

      <p class="csm-mesures">
        <mesure valeur="exit 3" source="game-day 2">avec -Xmx 320m, sous une limite de 512 Mio</mesure>
        <mesure valeur="exit 137" source="game-day 2 bis">avec -Xmx 1 Gio, sous la même limite de 512 Mio</mesure>
      </p>
    </div>
  `
}
