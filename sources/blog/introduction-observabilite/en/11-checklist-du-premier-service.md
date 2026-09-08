# A practical checklist

```
page      : checklist
fichier   : blog/introduction-observabilite/en/11-checklist.html
surtitre  : Chapter 11
```

Every line comes from something that first went wrong, somewhere in this text.

## When instrumenting the service {#en-instrumentant-le-service}

- Emit a trace identifier on every request, and put it in
  [every log line](#/en/blog/introduction-observabilite/trois-piliers#la-colle). Nothing
  else on this list matters as much.
- Format every timestamp with its offset, and set
  [a single time zone everywhere](#/en/blog/introduction-observabilite/lire-un-graphe#une-seule-horloge),
  including the default of ad hoc views.
- Add [exemplars](#/en/blog/introduction-observabilite/instrumenter#les-exemplars), so
  that a point on a graph can open a real request.
- Add the two or three
  [business counters](#/en/blog/introduction-observabilite/instrumenter#les-metriques-metier)
  that say what the service is for. They are what makes an incident readable to someone
  other than its author.

## When writing the probes {#en-ecrivant-les-sondes}

- Never put a dependency check in a
  [liveness probe](#/en/blog/introduction-observabilite/sondes#jamais-de-dependance). It
  goes in the readiness probe.
- Write the timeout and the failure count of every probe, without relying on the
  defaults, and give the liveness probe
  [a generous timeout](#/en/blog/introduction-observabilite/sondes#une-sonde-qui-ne-touche-a-rien).
  It exists to catch a process stuck for good, and it must never be able to fail because
  the process is busy.

## When building the dashboards {#en-construisant-les-dashboards}

- Alert and diagnose on the
  [rate](#/en/blog/introduction-observabilite/lire-un-graphe#plat-n-est-pas-absent), never
  on a raw counter compared to a threshold.
- Look for
  [the measurement that carries the instant of the event](#/en/blog/introduction-observabilite/lire-un-graphe#l-heure-du-scrape)
  when the exact time matters, rather than the position of a sample.
- Trigger [every panel once](#/en/blog/introduction-observabilite/dashboard-vert), on
  purpose, and confirm that it moves. A panel one has never seen react is decoration.

## When setting up alerting {#en-montant-l-alerting}

- Set up [alerts and their notifications](#/en/blog/introduction-observabilite/alerting),
  phone or e-mail, for critical failures.
- Fix at the source any alert that stays active permanently, from day one. Silence must
  be the normal state.

## When deploying {#en-deployant}

- Keep dashboards and alerting rules
  [in the repository](#/en/blog/introduction-observabilite/livrer), and never paste a
  panel from the web interface.
- Put a deployment annotation on the dashboards.
- Remember that a green run reports that the desired state was written, and nothing at
  all about its health.

:::regle
Ask the running system a question whose answer would be different in case of error. Not "did my command succeed", but "is the world now different from how I wanted it".
:::
