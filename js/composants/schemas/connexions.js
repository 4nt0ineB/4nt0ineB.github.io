// Etat en data(), jamais setup()/ref : voir la note de devine.js.
//
// Chaque connexion est épinglée à une instance UNE SEULE FOIS, au
// chargement du module, par un générateur pseudo-aléatoire à graine
// fixe (mulberry32) : le tirage est donc identique à chaque rechargement
// de la page. Faire varier le curseur ne retire jamais une connexion déjà
// tirée, il ne fait qu'en révéler plus : à 5 connexions, les 5 premières
// sont EXACTEMENT celles qu'on verra à 6, 7, 40. C'est le même invariant
// que « une connexion garde son backend à vie » appliqué à la
// démonstration elle-même.
function mulberry32 (graine) {
  return function () {
    graine |= 0
    graine = (graine + 0x6D2B79F5) | 0
    let t = Math.imul(graine ^ (graine >>> 15), 1 | graine)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const MAX_CONNEXIONS = 40
const NOMS = ['A', 'B', 'C', 'D']

const tirer = mulberry32(20260826)
const ASSIGNATIONS = Array.from({ length: MAX_CONNEXIONS }, () => Math.floor(tirer() * NOMS.length))

// Valeurs réelles, game-day 7, mesurées à une seule connexion ouverte par
// le client de charge.
const MESURE_UNE_CONNEXION = [
  { nom: 'A', reqs: '4,79', throttle: '78,3 %' },
  { nom: 'B', reqs: '1,19', throttle: '24,6 %' },
  { nom: 'C', reqs: '0', throttle: '9,6 %' },
  { nom: 'D', reqs: '0', throttle: '11,4 %' }
]

export const SchemaConnexions = {
  data () {
    return { nConnexions: 1, cinquieme: false }
  },
  computed: {
    mesureUneConnexion () { return MESURE_UNE_CONNEXION },
    repartition () {
      const comptes = [0, 0, 0, 0]
      for (let i = 0; i < this.nConnexions; i++) comptes[ASSIGNATIONS[i]]++
      return comptes
    },
    instances () {
      const insts = NOMS.map((nom, i) => ({ nom, connexions: this.repartition[i], nouvelle: false }))
      if (this.cinquieme) insts.push({ nom: 'E', connexions: 0, nouvelle: true })
      return insts
    },
    maxRepartition () { return Math.max(1, ...this.repartition) },
    auUneConnexion () { return this.nConnexions === 1 },
    labelAccessible () {
      const detail = this.instances.map(i => `instance ${i.nom} : ${i.connexions} connexion${i.connexions !== 1 ? 's' : ''}`).join(', ')
      return `Répartition de ${this.nConnexions} connexion${this.nConnexions !== 1 ? 's' : ''} sur ${this.instances.length} instances. ${detail}.`
    }
  },
  methods: {
    largeurBarre (instance) { return (instance.connexions / this.maxRepartition) * 100 }
  },
  template: `
    <div class="schema-connexions pleine-largeur">
      <div class="cx-controles">
        <label for="cx-connexions">Connexions ouvertes par le client</label>
        <input id="cx-connexions" type="range" min="1" :max="40" step="1"
               v-model.number="nConnexions"
               :aria-valuetext="nConnexions + (nConnexions > 1 ? ' connexions' : ' connexion')">
        <span class="cx-valeur">{{ nConnexions }}</span>
      </div>

      <label class="cx-case">
        <input type="checkbox" v-model="cinquieme">
        ajouter une cinquième instance maintenant
      </label>

      <div class="cx-barres" role="img" :aria-label="labelAccessible">
        <div class="cx-ligne" v-for="inst in instances" :key="inst.nom" :class="{ 'est-nouvelle': inst.nouvelle }">
          <span class="cx-etiquette">instance {{ inst.nom }}</span>
          <span class="cx-jauge">
            <span class="cx-barre-remplissage" :style="{ width: largeurBarre(inst) + '%' }"></span>
          </span>
          <span class="cx-valeur-connexions">{{ inst.connexions }} connexion{{ inst.connexions !== 1 ? 's' : '' }}</span>
        </div>
      </div>

      <tableau-mesure v-if="auUneConnexion"
          legende="À une seule connexion ouverte, ce qui a réellement été mesuré (game-day 7).">
        <table>
          <thead>
            <tr><th>instance</th><th>req/s</th><th>périodes throttlées</th></tr>
          </thead>
          <tbody>
            <tr v-for="m in mesureUneConnexion" :key="m.nom">
              <td>{{ m.nom }}</td><td>{{ m.reqs }}</td><td>{{ m.throttle }}</td>
            </tr>
          </tbody>
        </table>
      </tableau-mesure>
      <p v-else class="cx-note">Au-delà de quelques connexions, la répartition s'égalise : ce
      n'était pas la charge qui était mal répartie, c'était le nombre de connexions.</p>

      <p v-if="cinquieme" class="cx-note-cinquieme">La cinquième instance reste à zéro
      connexion, quel que soit le curseur : les connexions existantes ne bougent jamais.
      Résultat mesuré du game-day 8 : l'instance arrivée en dernier traitait 0,27 req/s
      contre 6,65 pour les trois autres, en étant saine du début à la fin.</p>
    </div>
  `
}
