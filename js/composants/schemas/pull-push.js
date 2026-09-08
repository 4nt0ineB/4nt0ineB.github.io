// Statique et animé en CSS seul : les deux boucles sont des @keyframes qui
// ne démarrent qu'une fois .est-visible posée par visibilite.js, donc rien
// à observer côté JavaScript ici, pas de data() ni de méthode.
export const SchemaPullPush = {
  template: `
    <div class="schema-pull-push pleine-largeur">
      <svg class="pull-push-svg anime" viewBox="0 0 640 240" width="100%"
           preserveAspectRatio="xMidYMid meet" role="img" aria-labelledby="pull-push-titre">
        <title id="pull-push-titre">Prometheus pulls its metrics, the agent pushes its logs</title>

        <rect class="pp-boite" x="20" y="30" width="130" height="50" rx="4" />
        <text class="pp-texte" x="85" y="60" text-anchor="middle">Prometheus</text>
        <rect class="pp-boite" x="170" y="140" width="130" height="50" rx="4" />
        <text class="pp-texte" x="235" y="170" text-anchor="middle">the service</text>

        <g class="pp-boucle-pull">
          <path class="pp-fleche-aller" d="M155,60 H300 A20,20 0 0 1 320,80 V140" fill="none" stroke="currentColor" stroke-width="2" marker-end="url(#fleche-pull)" />
          <path class="pp-fleche-retour" d="M300,150 H180 A20,20 0 0 1 160,130 V80" fill="none" stroke="currentColor" stroke-width="2" marker-end="url(#fleche-pull)" />
        </g>
        <text class="pp-legende-svg" x="85" y="20" text-anchor="middle">pulls, on a fixed interval</text>

        <rect class="pp-boite" x="490" y="140" width="130" height="50" rx="4" />
        <text class="pp-texte" x="555" y="170" text-anchor="middle">the service</text>
        <rect class="pp-boite" x="490" y="30" width="130" height="50" rx="4" />
        <text class="pp-texte" x="555" y="60" text-anchor="middle">Loki</text>

        <line class="pp-tuyau" x1="555" y1="140" x2="555" y2="80" stroke="currentColor" stroke-width="2" marker-end="url(#fleche-push)" />
        <circle class="pp-paquet pp-paquet-1" cx="555" cy="140" r="6" />
        <circle class="pp-paquet pp-paquet-2" cx="555" cy="140" r="6" />
        <circle class="pp-paquet pp-paquet-3" cx="555" cy="140" r="6" />
        <text class="pp-legende-svg" x="555" y="20" text-anchor="middle">pushes, as soon as an event exists</text>

        <defs>
          <marker id="fleche-pull" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="currentColor" />
          </marker>
          <marker id="fleche-push" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="currentColor" />
          </marker>
        </defs>
      </svg>

      <p class="pull-push-legende">
        On the left, Prometheus <strong>pulls</strong>: it queries the service at a regular
        interval and collects the state of its counters. On the right, the agent
        <strong>pushes</strong>: every log line leaves for Loki as soon as it exists. Logs are
        pushed because an event happens when it happens. Metrics are pulled because a state
        is measured on demand.
      </p>
    </div>
  `
}
