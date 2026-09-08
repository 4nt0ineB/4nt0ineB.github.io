// Deux scénarios, un seul curseur de temps simulé : t=0 est l'instant où la
// base est coupée, t=4 son rétablissement, t=6 la fin de la scène. Les deux
// fonctions etatCorrect/etatFaute sont pures (une position dans le temps
// donne toujours le même état) : rejouer, ou reprendre après un
// démontage/remontage du composant, ne peut jamais désynchroniser l'affichage
// d'un état interne accumulé pas à pas.
//
// La boucle requestAnimationFrame n'existe que pendant la lecture (du clic
// sur « couper la base » jusqu'à t=6) et elle est annulée dans unmounted() :
// sans ça, quitter le chapitre pendant l'animation laisse une boucle
// orpheline tourner pour le reste de la session.
const N = 4
const T_RETABLI = 4
const DUREE_TOTALE = 6
const CYCLE = 1.3
const SEUIL_TUE = 0.35

function tEchec (i) { return 0.4 + i * 0.2 }
function tRecuperation (i) { return T_RETABLI + 0.3 + i * 0.2 }

// Readiness : l'instance sort du service dès l'échec, et y reste jusqu'à ce
// que la base soit revenue ET que sa propre sonde l'ait détecté. Elle ne
// s'arrête jamais de tourner.
function etatCorrect (i, t) {
  if (t < tEchec(i)) return 'sain'
  if (t < tRecuperation(i)) return 'hors-service'
  return 'sain'
}

// Liveness : l'instance est tuée, redémarre, retombe en échec puisque la
// base est toujours coupée, et recommence. Le rétablissement de la base à
// t=4 ne casse pas ce cycle : rien dans la boucle ne dépend de l'état de la
// base une fois la sonde de liveness devenue la cause de la mort.
function etatFaute (i, t) {
  const depuis = t - tEchec(i)
  if (depuis < 0) return 'sain'
  const cycles = Math.floor(depuis / CYCLE)
  const phase = depuis - cycles * CYCLE
  if (phase < 0.15) return 'en-echec'
  if (phase < SEUIL_TUE) return 'tue'
  if (phase < 0.85) return 'redemarre'
  return 'en-attente'
}

function compteurFaute (i, t) {
  const depuis = t - tEchec(i)
  if (depuis < 0) return 0
  const cycles = Math.floor(depuis / CYCLE)
  const phase = depuis - cycles * CYCLE
  return cycles + (phase >= SEUIL_TUE ? 1 : 0)
}

const INDICES = Array.from({ length: N }, (_, i) => i)

const LIBELLES = {
  sain: 'healthy, in service',
  'hors-service': 'running, out of service',
  'en-echec': 'probe failing',
  tue: 'killed',
  redemarre: 'restarting',
  'en-attente': 'back up, waiting'
}

export const SchemaReactionChaine = {
  data () {
    return {
      t: 0,
      demarre: false,
      enCours: false,
      livenessInterroge: false,
      reduitMotion: false,
      rafId: null,
      dernierTs: null
    }
  },
  computed: {
    baseEtat () {
      if (!this.demarre) return 'up'
      return this.t < T_RETABLI ? 'down' : 'up'
    },
    instances () {
      if (!this.demarre) return INDICES.map(i => ({ n: i + 1, etat: 'sain', compteur: 0 }))
      return INDICES.map(i => ({
        n: i + 1,
        etat: this.livenessInterroge ? etatFaute(i, this.t) : etatCorrect(i, this.t),
        compteur: this.livenessInterroge ? compteurFaute(i, this.t) : 0
      }))
    },
    clientEtat () {
      if (!this.demarre) return 'The client gets normal responses.'
      if (this.livenessInterroge) {
        return this.instances.some(i => i.etat === 'en-attente')
          ? 'The client gets a few responses, between two restarts.'
          : 'The client gets connection failures.'
      }
      return this.instances.some(i => i.etat === 'sain')
        ? 'The client gets normal responses.'
        : 'The client gets connection failures.'
    },
    termine () {
      return this.demarre && !this.enCours
    },
    finCorrecte () {
      return INDICES.map(i => ({ n: i + 1, etat: etatCorrect(i, DUREE_TOTALE), compteur: 0 }))
    },
    finFautive () {
      return INDICES.map(i => ({ n: i + 1, etat: etatFaute(i, DUREE_TOTALE), compteur: compteurFaute(i, DUREE_TOTALE) }))
    }
  },
  mounted () {
    this.reduitMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  },
  unmounted () {
    if (this.rafId !== null) cancelAnimationFrame(this.rafId)
  },
  methods: {
    etiquetteEtat (etat) { return LIBELLES[etat] ?? etat },
    couperLaBase () {
      if (this.enCours) return
      this.demarre = true
      this.enCours = true
      this.t = 0
      this.dernierTs = null
      this.rafId = requestAnimationFrame(this.avancer)
    },
    avancer (ts) {
      if (this.dernierTs === null) this.dernierTs = ts
      this.t += (ts - this.dernierTs) / 1000
      this.dernierTs = ts
      if (this.t >= DUREE_TOTALE) {
        this.t = DUREE_TOTALE
        this.enCours = false
        this.rafId = null
        return
      }
      this.rafId = requestAnimationFrame(this.avancer)
    },
    rejouer () {
      if (this.rafId !== null) cancelAnimationFrame(this.rafId)
      this.rafId = null
      this.dernierTs = null
      this.t = 0
      this.enCours = false
      this.demarre = false
    }
  },
  template: `
    <div class="schema-reaction-chaine pleine-largeur">

      <div v-if="reduitMotion" class="rc-cote-a-cote">
        <div class="rc-panneau">
          <h3 class="rc-panneau-titre">Readiness: the right reflex</h3>
          <svg viewBox="0 0 300 210" role="img" aria-labelledby="rc-titre-correct" preserveAspectRatio="xMidYMid meet">
            <title id="rc-titre-correct">Final state: readiness failing, the four instances out of service but still running, database restored</title>
            <rect class="rc-base base-up" x="90" y="10" width="120" height="34" rx="4" />
            <text class="rc-texte-svg" x="150" y="32" text-anchor="middle">database: up</text>
            <g v-for="i in finCorrecte" :key="i.n">
              <rect class="rc-instance" :class="'etat-' + i.etat" x="10" :y="60 + (i.n - 1) * 38" width="280" height="30" rx="4" />
              <text class="rc-texte-svg" x="150" :y="60 + (i.n - 1) * 38 + 20" text-anchor="middle">instance {{ i.n }} · {{ etiquetteEtat(i.etat) }}</text>
            </g>
          </svg>
        </div>
        <div class="rc-panneau">
          <h3 class="rc-panneau-titre">Liveness: the mistake</h3>
          <svg viewBox="0 0 300 210" role="img" aria-labelledby="rc-titre-faute" preserveAspectRatio="xMidYMid meet">
            <title id="rc-titre-faute">Final state: liveness failing, the four instances killed and restarted in a loop, database restored but the backoff goes on</title>
            <rect class="rc-base base-up" x="90" y="10" width="120" height="34" rx="4" />
            <text class="rc-texte-svg" x="150" y="32" text-anchor="middle">database: up</text>
            <g v-for="i in finFautive" :key="i.n">
              <rect class="rc-instance" :class="'etat-' + i.etat" x="10" :y="60 + (i.n - 1) * 38" width="280" height="30" rx="4" />
              <text class="rc-texte-svg" x="150" :y="60 + (i.n - 1) * 38 + 20" text-anchor="middle">instance {{ i.n }} · {{ etiquetteEtat(i.etat) }} · {{ i.compteur }} restarts</text>
            </g>
          </svg>
        </div>
        <p class="rc-note-reduite">The two final states, without animation: on the right, the restart
        counters have moved; on the left, they all stayed at zero.</p>
      </div>

      <template v-else>
        <fieldset class="rc-controles">
          <legend>Scenario to replay</legend>
          <label class="rc-case">
            <input type="checkbox" v-model="livenessInterroge" :disabled="enCours">
            the liveness probe queries the database
          </label>
          <button type="button" class="rc-bouton" @click="couperLaBase" :disabled="enCours">Cut the database</button>
          <button v-if="termine" type="button" class="rc-bouton rc-bouton-rejouer" @click="rejouer">Replay</button>
        </fieldset>

        <svg class="rc-svg" viewBox="0 0 640 260" role="img" aria-labelledby="rc-titre" preserveAspectRatio="xMidYMid meet">
          <title id="rc-titre">Four instances and a database, during and after an outage</title>
          <rect class="rc-client" x="20" y="16" width="120" height="40" rx="4" />
          <text class="rc-texte-svg" x="80" y="40" text-anchor="middle">client</text>

          <g v-for="i in instances" :key="i.n">
            <rect class="rc-instance" :class="'etat-' + i.etat" :x="20 + (i.n - 1) * 155" y="100" width="130" height="60" rx="4" />
            <text class="rc-texte-svg" :x="20 + (i.n - 1) * 155 + 65" y="120" text-anchor="middle">instance {{ i.n }}</text>
            <text class="rc-texte-svg rc-etat-svg" :x="20 + (i.n - 1) * 155 + 65" y="138" text-anchor="middle">{{ etiquetteEtat(i.etat) }}</text>
            <text class="rc-texte-svg rc-compteur-svg" :x="20 + (i.n - 1) * 155 + 65" y="154" text-anchor="middle">{{ i.compteur }} restart(s)</text>
          </g>

          <rect class="rc-base" :class="'base-' + baseEtat" x="260" y="200" width="120" height="44" rx="4" />
          <text class="rc-texte-svg" x="320" y="226" text-anchor="middle">database: {{ baseEtat === 'up' ? 'up' : 'down' }}</text>
        </svg>

        <p class="rc-client-etat" role="status">{{ clientEtat }}</p>

        <ul class="rc-texte">
          <li v-for="i in instances" :key="i.n">Instance {{ i.n }}: {{ etiquetteEtat(i.etat) }}, {{ i.compteur }} restart(s).</li>
        </ul>
      </template>
    </div>
  `
}
