# The instrumentation you write yourself

```
page      : instrumenter
fichier   : blog/introduction-observabilite/en/05-instrumenter.html
surtitre  : Chapter 5
```

## The metrics the framework provides {#ce-qui-existe-sans-rien-faire}

Modern frameworks already instrument a lot out of the box: incoming HTTP requests,
response codes, the latency distribution, memory, the garbage collector, the usage of the
database connection pool. All of this usually exists as soon as the metrics dependency
is added (Micrometer for Quarkus and Spring Boot).

No need to rebuild it. The work that belongs to the developer is the layer nobody else
can guess, namely what the application does for the business.

## The four kinds of metric {#les-quatre-types}

A metric is an object declared once and updated in the code.

:::tableau legende="The four kinds of metric and what each is for."

| kind | behaviour | used for |
|---|---|---|
| <jargon mot="counter">counter</jargon> | only goes up | requests served, orders created, errors |
| <jargon mot="gauge">gauge</jargon> | goes up and down | queue length, active connections, cached items |
| <jargon mot="histogram">histogram</jargon> (or timer) | records a distribution | durations, so that the p95 can be asked for |
| value summary | a distribution of non-temporal values | order amount, payload size |

:::

Worth knowing: an average latency is worth almost nothing, since it is dominated by the
many fast requests and hides the slow ones. A percentile, on the contrary, describes the
experience of the least lucky users, and that is what makes a histogram useful.

## Business metrics {#les-metriques-metier}

`orders_created_total`. `cart_value_euros`. `password_resets_total`. These are
legitimate metrics, and impossible to instrument automatically, since no framework knows
what an order is.

They are also what makes an incident readable to someone other than the developer.
"Latency is rising" is a technical fact. "Payments dropped to zero four minutes ago" is
an outage, and everyone understands it.

[Chapter 2](#/en/blog/introduction-observabilite/trois-piliers#la-cardinalite) gave the
constraint that frames them: a label must have a small, finite, known set of values, like
a status or a route name taken from a fixed list. Never an identifier, never a raw URL
with its parameters, never anything that comes from user input.

## The limit: a question asked in advance {#une-question-posee-a-l-avance}

One can only query what one decided to instrument before the incident, and that is the
limit of the approach. If nobody thought of counting rejected uploads, then during the
incident about rejected uploads, that figure does not exist and cannot be recovered
afterwards.

Logs have the symmetrical limit and strength, because they answer questions nobody had
anticipated and aggregate badly. This symmetry is the reason for keeping both.

## Exemplars {#les-exemplars}

An <jargon mot="exemplar">exemplar</jargon> is a small pointer attached to a data point,
carrying the identifier of one precise request that contributed to that point. It is what
turns "the p95 went up" into "here is a real slow request, to look at closely".

It is a modest amount of configuration, and the highest-value link in the whole stack,
since it turns a statistic into a specimen. Without it, going from a graph to a trace
means copying timestamps into a search bar and hoping.
