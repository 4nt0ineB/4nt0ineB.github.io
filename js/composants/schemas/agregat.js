// Etat en data(), jamais setup()/ref : voir la note de devine.js.
//
// La bascule utilise le <transition> natif de Vue (compilé depuis ce
// gabarit de chaîne, jamais importé) pour le fondu d'opacité entre les
// deux vues. Chaque barre part de 0 et grandit jusqu'à sa valeur à chaque
// bascule, via `revele` remis à zéro puis relevé un battement plus tard :
// c'est la transition sur `width` demandée par le brief, rejouée à chaque
// clic plutôt que vue une seule fois au chargement.
//
// La barre d'alerte ne repose jamais sur la seule couleur (daltonisme) :
// au-delà du seuil elle porte en plus un motif de hachures (voir
// composants.css, .est-alerte) et son pourcentage est toujours écrit.
const POOLS = [
  { nom: 'Eden', pourcent: 12, plafond: '640 Mio' },
  { nom: 'Survivor', pourcent: 30, plafond: '80 Mio' },
  { nom: 'PS Old Gen', pourcent: 97, plafond: '213 Mio' }
]

const SOMME = 65

export const SchemaAgregat = {
  data () {
    return { vueDetail: false, revele: false }
  },
  computed: {
    pools () { return POOLS },
    largeurSomme () { return this.revele ? SOMME : 0 }
  },
  mounted () {
    this.declencherRevelation()
  },
  watch: {
    vueDetail () {
      this.revele = false
      this.declencherRevelation()
    }
  },
  methods: {
    basculer (detail) {
      if (this.vueDetail === detail) return
      this.vueDetail = detail
    },
    largeurPool (p) { return this.revele ? p.pourcent : 0 },
    declencherRevelation () {
      // Un battement après le changement, pas dans le même tick : sans
      // lui, le navigateur peut fusionner l'état 0 % et l'état final dans
      // la même image, et la transition ne se voit jamais.
      requestAnimationFrame(() => { this.revele = true })
    }
  },
  template: `
    <div class="schema-agregat pleine-largeur">
      <div class="ag-bascule" role="group" aria-label="Découpage affiché">
        <button type="button" class="ag-bouton" :class="{ 'est-actif': !vueDetail }"
                :aria-pressed="!vueDetail" @click="basculer(false)">Somme des pools</button>
        <button type="button" class="ag-bouton" :class="{ 'est-actif': vueDetail }"
                :aria-pressed="vueDetail" @click="basculer(true)">Par pool</button>
      </div>

      <transition name="ag-fondu" mode="out-in">
        <div v-if="!vueDetail" key="somme" class="ag-vue">
          <div class="ag-ligne">
            <span class="ag-etiquette">mémoire de la JVM</span>
            <span class="ag-jauge" role="img" :aria-label="'Mémoire utilisée : ' + 65 + ' pour cent'">
              <span class="ag-barre-remplissage" :style="{ width: largeurSomme + '%' }"></span>
            </span>
            <span class="ag-valeur">65 %</span>
          </div>
        </div>

        <div v-else key="detail" class="ag-vue ag-vue-detail">
          <div class="ag-ligne" v-for="p in pools" :key="p.nom">
            <span class="ag-etiquette">{{ p.nom }} <span class="ag-plafond">/ {{ p.plafond }}</span></span>
            <span class="ag-jauge" role="img" :aria-label="p.nom + ' : ' + p.pourcent + ' pour cent de son propre plafond'">
              <span class="ag-barre-remplissage" :class="{ 'est-alerte': p.pourcent >= 90 }"
                    :style="{ width: largeurPool(p) + '%' }"></span>
            </span>
            <span class="ag-valeur" :class="{ 'est-alerte': p.pourcent >= 90 }">{{ p.pourcent }} %</span>
          </div>
        </div>
      </transition>

      <p class="ag-note">La même mesure, deux découpages.</p>
    </div>
  `
}
