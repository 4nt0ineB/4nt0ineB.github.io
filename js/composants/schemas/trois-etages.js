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
            <title id="titre-etage-metrique">The /checkout latency goes from 200 milliseconds to 3 seconds at 14:02</title>
            <polyline class="etage-trait" fill="none" stroke="currentColor" stroke-width="2"
                      points="20,179 340,178 378,176 400,60 420,24 620,27" />
            <circle class="point-exemplar" cx="400" cy="60" r="7" />
          </svg>
          <p class="etage-note">The highlighted point is an <strong>exemplar</strong>: a pointer to a real request that produced this point.</p>
          <button type="button" class="etage-bouton" @click="descendre">Open the 14:02 exemplar: see the trace</button>
        </div>

        <div v-else-if="etage === 1" key="1" class="etage etage-anime etage-trace">
          <svg viewBox="0 0 640 220" role="img" aria-labelledby="titre-etage-trace"
               preserveAspectRatio="xMidYMid meet">
            <title id="titre-etage-trace">A 3.1-second trace, 2.9 seconds of which in a hundred twin SQL queries</title>
            <rect class="span-racine" x="10" y="14" width="620" height="26" />
            <text class="span-texte" x="20" y="32">root span · 3.1 s</text>
            <g v-for="n in spans" :key="n">
              <rect class="span-jumeau" :x="10 + n * 30" y="70" width="26" height="16" />
            </g>
            <text class="etage-legende-svg" x="10" y="112">20 of the 100 twin spans, and 80 more</text>
            <text class="etage-legende-svg" x="10" y="132">SELECT * FROM items WHERE order_id = ? · 2.9 s in total</text>
          </svg>
          <button type="button" class="etage-bouton" @click="descendre">Open a span: see the log</button>
        </div>

        <div v-else key="2" class="etage etage-anime etage-log">
          <svg viewBox="0 0 640 90" role="img" aria-labelledby="titre-etage-log"
               preserveAspectRatio="xMidYMid meet">
            <title id="titre-etage-log">A log filtered on the trace identifier</title>
            <rect class="log-cadre" x="10" y="10" width="620" height="60" />
            <text class="log-ligne" x="24" y="46">cache miss for order items, falling back to per-item fetch</text>
          </svg>
          <p class="etage-note">The log view opens already filtered on the trace identifier: this single line answers the why.</p>
        </div>

        <button v-if="etage > 0" type="button" class="etage-bouton-remonter" @click="remonter">Back to the top</button>
      </div>

      <ol class="etages-texte">
        <li><strong>The metric.</strong> p95 latency of /checkout: 200 ms, then 3 s from 14:02.</li>
        <li><strong>The trace.</strong> Root span of 3.1 s, 2.9 s of which held by a hundred twin SQL queries.</li>
        <li><strong>The log.</strong> "cache miss for order items, falling back to per-item fetch".</li>
      </ol>
    </div>
  `
}
