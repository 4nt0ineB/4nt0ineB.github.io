// Le trajet d'une donnée, de l'application à l'écran. Statique et animé en
// CSS seul : les trois chemins se dessinent l'un après l'autre une fois
// .est-visible posée par visibilite.js. Les trois chemins sont aussi listés
// en texte sous le schéma, donc l'information ne dépend pas de l'animation.
//
// Les flèches des métriques pointent de Prometheus vers l'application : c'est
// lui qui vient lire, et le sens de la flèche est tout le propos du pull.
export const SchemaTrajet = {
  template: `
    <div class="schema-trajet pleine-largeur">
      <svg class="trajet-svg anime" viewBox="0 0 720 300" width="100%"
           preserveAspectRatio="xMidYMid meet" role="img" aria-labelledby="trajet-titre">
        <title id="trajet-titre">The journey of a data point, from the application to the screen</title>

        <text class="trajet-colonne" x="90" y="24" text-anchor="middle">application</text>
        <text class="trajet-colonne" x="400" y="24" text-anchor="middle">pipes and stores</text>
        <text class="trajet-colonne" x="640" y="24" text-anchor="middle">screen</text>

        <rect class="trajet-boite trajet-app" x="30" y="110" width="120" height="80" rx="4" />
        <text class="trajet-texte" x="90" y="142" text-anchor="middle">the service</text>
        <text class="trajet-sous" x="90" y="162" text-anchor="middle">one request</text>

        <rect class="trajet-boite" x="330" y="50" width="130" height="40" rx="4" />
        <text class="trajet-texte" x="395" y="75" text-anchor="middle">Prometheus</text>

        <rect class="trajet-boite trajet-tuyau" x="240" y="130" width="90" height="40" rx="4" />
        <text class="trajet-sous" x="285" y="155" text-anchor="middle">collector</text>
        <rect class="trajet-boite" x="360" y="130" width="100" height="40" rx="4" />
        <text class="trajet-texte" x="410" y="155" text-anchor="middle">Tempo</text>

        <rect class="trajet-boite trajet-tuyau" x="240" y="210" width="90" height="40" rx="4" />
        <text class="trajet-sous" x="285" y="235" text-anchor="middle">Alloy</text>
        <rect class="trajet-boite" x="360" y="210" width="100" height="40" rx="4" />
        <text class="trajet-texte" x="410" y="235" text-anchor="middle">Loki</text>

        <rect class="trajet-boite trajet-grafana" x="580" y="110" width="120" height="80" rx="4" />
        <text class="trajet-texte" x="640" y="155" text-anchor="middle">Grafana</text>

        <g class="trajet-chemin trajet-chemin-1">
          <path d="M330,70 H200 A20,20 0 0 0 180,90 V110" fill="none" stroke="currentColor" stroke-width="2" marker-end="url(#trajet-fleche)" />
          <text class="trajet-etiquette" x="240" y="62" text-anchor="middle">comes to read /metrics</text>
        </g>
        <g class="trajet-chemin trajet-chemin-2">
          <path d="M150,150 H240" fill="none" stroke="currentColor" stroke-width="2" marker-end="url(#trajet-fleche)" />
          <path d="M330,150 H360" fill="none" stroke="currentColor" stroke-width="2" marker-end="url(#trajet-fleche)" />
          <text class="trajet-etiquette" x="195" y="142" text-anchor="middle">sends its traces</text>
        </g>
        <g class="trajet-chemin trajet-chemin-3">
          <path d="M150,170 H200 A20,20 0 0 1 220,190 V230 H240" fill="none" stroke="currentColor" stroke-width="2" marker-end="url(#trajet-fleche)" />
          <path d="M330,230 H360" fill="none" stroke="currentColor" stroke-width="2" marker-end="url(#trajet-fleche)" />
          <text class="trajet-etiquette" x="180" y="262" text-anchor="middle">writes to its output</text>
        </g>
        <g class="trajet-chemin trajet-chemin-4">
          <path d="M460,70 H540 A20,20 0 0 1 560,90 V120 H580" fill="none" stroke="currentColor" stroke-width="2" marker-end="url(#trajet-fleche)" />
          <path d="M460,150 H580" fill="none" stroke="currentColor" stroke-width="2" marker-end="url(#trajet-fleche)" />
          <path d="M460,230 H540 A20,20 0 0 0 560,210 V180 H580" fill="none" stroke="currentColor" stroke-width="2" marker-end="url(#trajet-fleche)" />
          <text class="trajet-etiquette" x="520" y="115" text-anchor="middle">reads all three</text>
        </g>

        <defs>
          <marker id="trajet-fleche" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="currentColor" />
          </marker>
        </defs>
      </svg>

      <ol class="trajet-texte-liste">
        <li><strong>Metrics.</strong> The service exposes them on <code>/metrics</code>, and Prometheus comes to read them at a regular interval.</li>
        <li><strong>Traces.</strong> The service sends them to the OpenTelemetry collector, which routes them to Tempo.</li>
        <li><strong>Logs.</strong> The service writes to its standard output, Alloy reads it and pushes to Loki.</li>
        <li><strong>Screen.</strong> Grafana reads the three stores and puts them on the same page.</li>
      </ol>
    </div>
  `
}
