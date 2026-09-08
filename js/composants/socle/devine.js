// Le lecteur choisit, puis la révélation apparaît. Un bouton par option,
// jamais un <div> : à réserver à un chiffre vraiment contre-intuitif, au
// plus quatre usages sur tout le site, au-delà le document devient un quiz.
//
// Etat declare par data() plutot que par ref() dans un setup() : ce composant
// n'importe alors RIEN, et par ricochet js/composants/index.js n'a plus aucun
// import CDN dans son graphe. C'est ce qui permet au verificateur d'importer ce
// module sous Node, qui refuse les imports https en module ES. Sans ca il
// faudrait un chargeur reseau maison, et npm run check exigerait Internet.
import { t } from '../../i18n.js'

export const Devine = {
  props: {
    question: { type: String, required: true },
    options: { type: Array, required: true },
    bonne: { type: Number, required: true }
  },
  data () {
    return { choix: null, repondu: false }
  },
  methods: {
    t,
    choisir (i) { this.choix = i; this.repondu = true }
  },
  template: `
    <div class="devine" :class="{ 'devine-repondu': repondu }">
      <p class="devine-question">{{ question }}</p>
      <div class="devine-options" role="group" :aria-label="question">
        <button v-for="(o, i) in options" :key="i" type="button"
                class="devine-option"
                :class="{ 'est-choisi': choix === i, 'est-bonne': repondu && i === bonne }"
                :disabled="repondu"
                :aria-pressed="choix === i"
                @click="choisir(i)">{{ o }}</button>
      </div>
      <p v-if="repondu" class="devine-verdict" role="status">
        {{ choix === bonne ? t('devineExact') : t('devineFaux') }}
      </p>
      <div v-if="repondu" class="devine-reponse"><slot name="reponse"></slot></div>
    </div>
  `
}
