// Etat en data()/computed, jamais setup()/ref : voir la note de devine.js.
// Chiffres du livre, aucun n'est invente : statut vaut 5 valeurs, route 20,
// methode HTTP 6, identifiant client 40 000, URL avec parametres n'a pas de
// limite (traitee comme un cas a part plutot qu'un nombre).
const ETIQUETTES = [
  { cle: 'statut', nom: 'statut', valeurs: 5, defaut: true, danger: false },
  { cle: 'route', nom: 'route', valeurs: 20, defaut: true, danger: false },
  { cle: 'methode', nom: 'méthode HTTP', valeurs: 6, defaut: false, danger: false },
  { cle: 'user', nom: 'identifiant client', valeurs: 40000, defaut: false, danger: true },
  { cle: 'url', nom: 'URL avec paramètres', valeurs: 0, defaut: false, danger: true }
]

const SEUIL = 1000000

export const SchemaCardinalite = {
  data () {
    return {
      etiquettes: ETIQUETTES.map(e => ({ ...e, coche: e.defaut }))
    }
  },
  computed: {
    // Une valeur de 0 est la marque de « sans limite » : une seule étiquette
    // de ce genre suffit à rendre le compte sans objet, la multiplication
    // qui suit ne s'applique donc qu'aux étiquettes finies.
    infini () {
      return this.etiquettes.some(e => e.coche && e.valeurs === 0)
    },
    series () {
      if (this.infini) return Infinity
      return this.etiquettes.reduce((n, e) => e.coche ? n * e.valeurs : n, 1)
    },
    rompu () {
      return this.infini || this.series > SEUIL
    },
    texte () {
      return this.infini ? 'sans limite' : this.series.toLocaleString('fr-FR')
    },
    // Barre logarithmique : une échelle linéaire écrase tout dès la
    // troisième étiquette cochée (100 contre 4 000 000 sur la même règle).
    largeur () {
      if (this.infini) return 100
      return Math.min(100, (Math.log10(Math.max(this.series, 1)) / 7) * 100)
    },
    verdict () {
      return this.rompu
        ? 'la base garde ses index en mémoire, et elle ne se dégrade pas doucement : elle tombe'
        : 'une base de métriques encaisse ça sans effort'
    }
  },
  template: `
    <div class="schema-cardinalite pleine-largeur">
      <fieldset class="cardinalite-etiquettes">
        <legend>Les étiquettes de ta métrique</legend>
        <label v-for="e in etiquettes" :key="e.cle" class="cardinalite-etiquette" :class="{ 'est-dangereuse': e.danger }">
          <input type="checkbox" v-model="e.coche">
          {{ e.nom }} <span class="cardinalite-valeurs">({{ e.valeurs === 0 ? 'sans limite' : e.valeurs.toLocaleString('fr-FR') }})</span>
        </label>
      </fieldset>

      <svg class="cardinalite-barre" viewBox="0 0 100 14" preserveAspectRatio="none"
           role="img" aria-labelledby="cardinalite-titre">
        <title id="cardinalite-titre">Nombre de séries stockées par la métrique, en échelle logarithmique</title>
        <rect class="cardinalite-fond" x="0" y="0" width="100" height="14" />
        <rect class="cardinalite-remplissage" :class="{ 'est-rompu': rompu }" x="0" y="0" :width="largeur" height="14" />
      </svg>

      <p class="cardinalite-compte">{{ texte }} <span class="cardinalite-unite">séries stockées</span></p>
      <p class="cardinalite-verdict" role="status" :class="{ 'est-rompu': rompu }">{{ verdict }}</p>
    </div>
  `
}
