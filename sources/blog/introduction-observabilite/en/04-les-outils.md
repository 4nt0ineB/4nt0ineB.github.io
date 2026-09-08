# The tools, one by one

```
page      : les-outils
fichier   : blog/introduction-observabilite/en/04-les-outils.html
surtitre  : Chapter 4
```

## Prometheus {#prometheus}

Prometheus is a database for numbers over time. It also carries its query language,
PromQL, and the engine that evaluates alerting rules. Almost every metrics stack one will
come across is either Prometheus or a tool that speaks its language.

It keeps its indexes in memory, which explains both its speed and its fragility. A label
with too many distinct values does not slow it down gradually, it brings it down (see
[cardinality](#/en/blog/introduction-observabilite/trois-piliers#la-cardinalite)).

## Loki {#loki}

Loki is the Prometheus of logs: the same place in the architecture and the same shape,
but for timestamped text rather than numbers. It collects nothing itself, since it is the
machine's agent that reads the output of the processes, labels it and pushes it.

Loki never indexes the content of the log line. It indexes a set of labels defined ahead
of time, per time window. A search on these labels is cheap. Once the type of log and the
period are targeted, what remains is a text search, like a grep. This choice makes it far
cheaper than a full-text search engine, and worse at finding a precise identifier in
everything that was ever logged.

Hence the most common Loki mistake, and a classic interview question. Labels create
physically separate streams, so the cardinality constraint applies here as is. The
severity level is fine, there are five of them (info, debug, warn, error, trace). A label
for the user identifier or the trace identifier destroys the system, and those go into
the content of the line, where a text filter finds them.

## Tempo {#tempo}

Tempo is the storage for traces, and it follows Loki's philosophy, a minimal index. It
indexes the trace identifier, never the detail of each <jargon mot="span">span</jargon>,
and puts the rest in cheap bulk storage.

This is a deliberate bet on how traces are used, because the main path is "I already
have a trace identifier, from a log line or an exemplar, show me the tree". Searching
traces by arbitrary attribute at high volume calls for another design, more expensive to
run (the Elasticsearch, Logstash, Kibana stack, known as ELK).

A trace that has just been sent is not immediately searchable, since it goes through an
ingestion buffer and becomes queryable a minute or two later. Do not conclude "there are
no traces" twenty seconds after triggering a request.

## OpenTelemetry {#opentelemetry}

OpenTelemetry, often written OTel, is a standard in two halves.

The first is a library added to the application. It produces metrics, traces and logs in
a neutral format, so the code is not written against Prometheus or against Tempo but
against the standard.

The second is the collector, whose role the
[previous chapter](#/en/blog/introduction-observabilite/le-trajet#ce-que-le-tuyau-achete)
gives. Its configuration has three stages:

- receivers accept the telemetry;
- processors transform it (batching, memory limits, origin metadata);
- exporters send it onwards.

Processors are not scripts you write. They are components already compiled into the
program, and the configuration only picks them, tunes them and sets their order.

## Grafana {#grafana}

Grafana is the display layer and stores nothing. It connects to Prometheus, Loki and
Tempo at the same time, which is what makes the
[three-click investigation](#/en/blog/introduction-observabilite/trois-piliers#le-checkout-lent)
possible.

Around it, most components ship their own small web interface.

:::regle
An interface one has to remember to open is not monitoring.
:::

The health of a component has to become a metric, then a panel, then an alert.
Otherwise one has to go and look at another tool's interface, and one will only go and
look if a problem is already suspected. A piece of information not visible in Grafana
teaches nothing until someone goes looking for it.

One exception: the Prometheus interface has a page that lists every application it comes
to read, and says whether that read fails and why. When an expected metric does not show
up in Grafana, that is usually where the answer is, because the problem is upstream of
any dashboard.

:::aller-plus-loin titre="Elasticsearch, and the three cases where full text wins"

Elasticsearch, usually used in an ELK stack (Elasticsearch, Logstash, Kibana), indexes
the full text of every line. This index gives broad ad hoc search, on any word, but it is
expensive at scale, because it often exceeds the size of the data itself.

If the services you write yourself are well instrumented, it will not be needed for
them. Three cases remain where it wins.

1. A business identifier that arrives late, through customer support, weeks after the
   facts. It is not a trace identifier, because traces are kept a few days and sampled,
   whereas logs are kept for weeks. A cold search across all services, weeks back, is
   what full-text indexing exists for.
2. Security and audit. "Every action of this user on every system for six months" is a
   cold full-text search over a long period, and no amount of tracing answers it.
3. Systems you do not control. A real company contains legacy platforms, appliances
   and vendor software that emit unstructured text, with no identifier in it. Full-text
   indexing is the lowest common denominator, since everything gets indexed for want of
   being able to change what is emitted.

Good instrumentation makes a full-text engine unnecessary for the code you write yourself. It remains the right tool for the code you do not write.

:::
