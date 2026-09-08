// L'enquête du checkout lent, en trois clics : descendre d'étage rejoue la
// même transition (opacité + translation) à chaque fois, remonter la fait
// à nouveau dans l'autre sens. Les trois étages sont aussi listés en texte
// sous le schéma : l'information ne dépend pas de l'interaction.
//
// Les cent spans jumeaux ne sont dessinés qu'à hauteur de vingt : au-delà le
// SVG devient un mur de traits et cesse de montrer ce qu'il montre. Les
// quatre-vingts autres sont nommés dans le texte, pas cachés.
export const SchemaTroisEtages = {
  data () {
    return { etage: 0, spans: Array.from({ length: 20 }, (_, i) => i) }
  },
  methods: {
    descendre () { this.etage = Math.min(2, this.etage + 1) },
    remonter () { this.etage = 0 }
  },
  template: `
    <div class="schema-trois-etages pleine-largeur">
      <div class="etage-scene">
        <div v-if="etage === 0" key="0" class="etage etage-anime etage-metrique">
          <svg viewBox="0 0 640 200" role="img" aria-labelledby="titre-etage-metrique"
               preserveAspectRatio="xMidYMid meet">
            <title id="titre-etage-metrique">La latence de /checkout passe de 200 millisecondes à 3 secondes à 14h02</title>
            <polyline class="etage-trait" fill="none" stroke="currentColor" stroke-width="2"
                      points="20,179 340,178 378,176 400,60 420,24 620,27" />
            <circle class="point-exemplar" cx="400" cy="60" r="7" />
          </svg>
          <p class="etage-note">Le point en surbrillance est un <strong>exemplar</strong> : un pointeur vers une requête réelle qui a produit ce point.</p>
          <button type="button" class="etage-bouton" @click="descendre">Ouvrir l'exemplar de 14h02 : voir la trace</button>
        </div>

        <div v-else-if="etage === 1" key="1" class="etage etage-anime etage-trace">
          <svg viewBox="0 0 640 220" role="img" aria-labelledby="titre-etage-trace"
               preserveAspectRatio="xMidYMid meet">
            <title id="titre-etage-trace">Une trace de 3,1 secondes, dont 2,9 secondes en cent requêtes SQL jumelles</title>
            <rect class="span-racine" x="10" y="14" width="620" height="26" />
            <text class="span-texte" x="20" y="32">span racine · 3,1 s</text>
            <g v-for="n in spans" :key="n">
              <rect class="span-jumeau" :x="10 + n * 30" y="70" width="26" height="16" />
            </g>
            <text class="etage-legende-svg" x="10" y="112">20 des 100 spans jumeaux, et 80 autres</text>
            <text class="etage-legende-svg" x="10" y="132">SELECT * FROM items WHERE order_id = ? · 2,9 s au total</text>
          </svg>
          <button type="button" class="etage-bouton" @click="descendre">Ouvrir un span : voir le log</button>
        </div>

        <div v-else key="2" class="etage etage-anime etage-log">
          <svg viewBox="0 0 640 90" role="img" aria-labelledby="titre-etage-log"
               preserveAspectRatio="xMidYMid meet">
            <title id="titre-etage-log">Un log filtré sur l'identifiant de trace</title>
            <rect class="log-cadre" x="10" y="10" width="620" height="60" />
            <text class="log-ligne" x="24" y="46">cache miss for order items, falling back to per-item fetch</text>
          </svg>
          <p class="etage-note">Le tableau de logs ouvre déjà filtré sur l'identifiant de trace : cette ligne seule répond au pourquoi.</p>
        </div>

        <button v-if="etage > 0" type="button" class="etage-bouton-remonter" @click="remonter">Revenir en haut</button>
      </div>

      <ol class="etages-texte">
        <li><strong>La métrique.</strong> Latence p95 de /checkout : 200 ms, puis 3 s à partir de 14h02.</li>
        <li><strong>La trace.</strong> Span racine de 3,1 s, dont 2,9 s tenus par cent requêtes SQL jumelles.</li>
        <li><strong>Le log.</strong> « cache miss for order items, falling back to per-item fetch ».</li>
      </ol>
    </div>
  `
}
