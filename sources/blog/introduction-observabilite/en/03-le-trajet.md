# The journey of a data point

```
page      : le-trajet
fichier   : blog/introduction-observabilite/en/03-le-trajet.html
surtitre  : Chapter 3
```

## Two boxes {#deux-boites}

Most confusion about tooling disappears once each product is put into one of two boxes:
those that keep the data, and those that move it. A lot of debate goes into tools that
do not compete, because they are not in the same box.

:::tableau legende="The map of the stack: each tool, its box, and whether it keeps the data."

| tool | box | keeps the data? |
|---|---|---|
| Prometheus | storage, for metrics | yes, and it also runs the queries and the alerts |
| Loki | storage, for logs | yes |
| Tempo | storage, for traces | yes |
| OpenTelemetry Collector | pipe | no |
| Grafana Alloy | pipe | no |
| Grafana | display | no |

:::

This stack was chosen because it is proven, free, fits on an 8 GB machine, and Grafana
can read all three stores. Other choices exist and the next page names one.

This map answers "what is this component". It does not answer "how does the data reach
my screen", which is a question of movement.

## From the application to the screen {#de-l-application-a-l-ecran}

An instrumented application emits its three pillars through three different paths.

- Its metrics go nowhere. It exposes them on an HTTP endpoint, `/metrics`, and Prometheus
  comes to read them.
- Its traces leave over OTLP to the OpenTelemetry collector, which routes them to Tempo.
- Its logs go to its standard output, where an agent running on the machine, Alloy,
  reads them, labels them and pushes them to Loki. The application does nothing for this,
  which is the strength of an agent, since it collects without any cooperation from the
  code.

Grafana reads the three stores and puts them on the same screen. In parallel, Prometheus
evaluates its alerting rules, and a fired alert can reach a human.

:::schema schema-trajet
titre: The journey of a data point, from the application to the screen and to the phone
voir: A three-column diagram, application, stores, surfaces. A single request emits three pieces of data that each follow their path, each path lighting up in turn: /metrics pulled by Prometheus, OTLP pushed to the collector then Tempo, standard output read by Alloy then Loki. All three converge on Grafana.
:::

## Pull versus push {#pull-contre-push}

Two of these three paths go one way and the third the other, and this asymmetry is not
arbitrary.

Prometheus does <jargon mot="pull">pull</jargon>. The application sends its metrics
nowhere, it displays its current counters as text on `/metrics`, and Prometheus connects
to this endpoint every fifteen or thirty seconds to note what it sees. This operation is
called a <jargon mot="scrape">scrape</jargon>.

Logs and traces, on the other hand, are <jargon mot="push">pushed</jargon>. An event
happens when it happens, so something has to send it at the moment it occurs. A state,
on the contrary, is measured on demand. One cannot ask a process what it logged in the
last thirty seconds, but one can always ask it how much memory it is using now.

:::schema schema-pull-push
titre: Prometheus pulls its metrics, the agent pushes its logs
voir: Two columns animated in a loop. On the left Prometheus fetching its metrics, on the right the agent pushing its logs to Loki.
:::

Pull has a consequence that comes back in
[chapter 6](#/en/blog/introduction-observabilite/lire-un-graphe#la-fenetre): a metric has
no continuous value, it has the value it had at the instants someone came to read it. An
event that starts and ends between two scrapes never existed for Prometheus.

## What the pipe buys {#ce-que-le-tuyau-achete}

The collector keeps nothing, so one may wonder what it is for. It is there so that the
application only knows a single destination. Replacing Tempo with something else becomes
a change in the collector's configuration, not a redeployment of forty services.

A misleading name on this point: the collector has an exporter called `prometheus`, and
it sends nothing to Prometheus. It imitates it, by translating the metrics into its text
format and exposing them on a `/metrics` that Prometheus comes to scrape like any other
target. The pull model stays intact even there.
