// La courbe affichée est CALCULÉE depuis la courbe de vérité (une moyenne
// mobile sur la fenêtre choisie, ré-échantillonnée toutes les 15 secondes,
// comme un scrape Prometheus), jamais dessinée à la main : sans ça, le
// schéma illustrerait l'affirmation du texte au lieu de la démontrer.
//
// Etat en data()/computed, jamais setup()/ref : voir la note de devine.js.
const DEBUT = 90
const FIN = 96
const DOMAINE = 330
const PAS_ECHANTILLON = 15

const FENETRES = [
  { secondes: 15, libelle: '15 s' },
  { secondes: 30, libelle: '30 s' },
  { secondes: 60, libelle: '1 min' },
  { secondes: 300, libelle: '5 min' }
]

const MARGE_G = 40
const MARGE_D = 20
const HAUT = 20
const BAS = 170
const LARGEUR_TRACE = 640 - MARGE_G - MARGE_D
const HAUTEUR_TRACE = BAS - HAUT

function x (t) { return MARGE_G + (t / DOMAINE) * LARGEUR_TRACE }
function y (v) { return BAS - v * HAUTEUR_TRACE }

// Moyenne mobile arrière (comme rate()) : la part de la fenêtre [t-W, t]
// recouverte par l'incident réel [DEBUT, FIN], divisée par la largeur de
// la fenêtre. Un incident de 6 s dilué sur 300 s ne peut valoir que 2 %.
function moyenneMobile (t, fenetre) {
  const a = Math.max(DEBUT, t - fenetre)
  const b = Math.min(FIN, t)
  return Math.max(0, b - a) / fenetre
}

export const SchemaFenetreRate = {
  data () {
    return { indexFenetre: 2 }
  },
  computed: {
    fenetre () { return FENETRES[this.indexFenetre] },
    echantillons () {
      const pts = []
      for (let t = 0; t <= DOMAINE; t += PAS_ECHANTILLON) {
        const v = moyenneMobile(t, this.fenetre.secondes)
        pts.push({ t, cx: x(t), cy: y(v) })
      }
      return pts
    },
    pointsAffiches () {
      return this.echantillons.map(p => `${p.cx},${p.cy}`).join(' ')
    },
    cheminVerite () {
      return [
        `M ${x(0)},${y(0)}`,
        `L ${x(DEBUT)},${y(0)}`,
        `L ${x(DEBUT)},${y(1)}`,
        `L ${x(FIN)},${y(1)}`,
        `L ${x(FIN)},${y(0)}`,
        `L ${x(DOMAINE)},${y(0)}`
      ].join(' ')
    }
  },
  methods: {
    formatSecondes (s) { return s.toLocaleString('fr-FR') }
  },
  template: `
    <div class="schema-fenetre-rate pleine-largeur">
      <div class="fr-controles">
        <label for="fr-fenetre">Fenêtre de la requête</label>
        <input id="fr-fenetre" type="range" min="0" max="3" step="1"
               v-model.number="indexFenetre"
               :aria-valuetext="fenetre.libelle">
        <span class="fr-fenetre-valeur">{{ fenetre.libelle }}</span>
      </div>

      <svg class="fr-svg" viewBox="0 0 640 200" role="img" aria-labelledby="fr-titre"
           preserveAspectRatio="xMidYMid meet">
        <title id="fr-titre">Un incident réel de 6 secondes, et ce qu'une moyenne glissante en montre selon la largeur de la fenêtre choisie</title>
        <line class="fr-axe" :x1="40" :y1="170" :x2="620" :y2="170" />
        <path class="fr-verite" :d="cheminVerite" fill="none" />
        <polyline class="fr-affichee" :points="pointsAffiches" fill="none" />
        <g class="fr-points">
          <circle v-for="p in echantillons" :key="p.t" :cx="p.cx" :cy="p.cy" r="2.5" />
        </g>
      </svg>

      <p class="fr-libelles" role="status">
        <span class="fr-libelle">durée réelle : <strong>6 s</strong></span>
        <span class="fr-libelle">largeur affichée : <strong>{{ formatSecondes(fenetre.secondes) }} s</strong></span>
      </p>
    </div>
  `
}
