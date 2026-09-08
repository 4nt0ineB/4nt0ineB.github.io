# Three pillars, and why exactly three

```
page      : trois-piliers
fichier   : blog/introduction-observabilite/en/02-trois-piliers.html
surtitre  : Chapter 2
```

## Detect, locate, explain {#detecter-localiser-expliquer}

The three pillars of observability are the metric, the <jargon mot="trace">trace</jargon>
and the log. They are not three competing ways of doing the same job but three floors of
the same investigation. Each answers one of the three questions of the previous chapter.

:::tableau legende="The three pillars, the question each answers, its role in the investigation."

| pillar | the question it answers | its role |
|---|---|---|
| metric | Is there a problem, and since when? | detect, raise the alert |
| trace | Where, in the system? | locate |
| log | Why, exactly? | explain |

:::

A single HTTP request produces all three at once. They are three projections of the
same event but each at a different level of detail:

- a point in a histogram (the metric), where the identity of the request is thrown away;
- a tree of operations (the trace), which keeps the identity and the causality;
- two or three lines of text (the log), which keep the identity but not the structure.

## The slow checkout {#le-checkout-lent}

Let us assume a REST API on some server, and an observability dashboard already in
place. We call p95 latency the threshold under which 95 % of requests complete, the
remaining 5 % being slower.

### Floor one, the metric

An alert fires: the p95 of `/checkout` goes from 200 milliseconds to 3 seconds. The
dashboard shows that the problem started at 14:02, that it only affects this route, and
that the error rate stays flat. The service is slow but not broken. We know when and
what, and no further detail about the metric will ever say why.

### Floor two, the trace

A click on the spike opens the trace of a real slow request. This trace is a tree of
operations, each with a start, a duration, a parent and attributes (a span, in
OpenTelemetry). The tree shows 3.1 seconds in total, 2.9 of which are held by a hundred
twin operations, all `SELECT * FROM items WHERE order_id = ?`. We now know where: loading
the items makes a hundred queries instead of one.

### Floor three, the log

A click on one of these operations opens the log tool, already filtered on the
identifier of this request. A single line answers everything: `cache miss for order
items, falling back to per-item fetch`. The cache has been empty since the 14:02
deployment.

:::schema schema-trois-etages
titre: The /checkout latency goes from 200 milliseconds to 3 seconds at 14:02
titre: A 3.1-second trace, 2.9 seconds of which in a hundred twin SQL queries
titre: A log filtered on the trace identifier
voir: The slow checkout investigation in three clicks. Floor 1 the latency graph with the clickable point on the spike, floor 2 the waterfall trace and its hundred twin queries, floor 3 the log line filtered on the trace identifier.
:::

Three tools, three clicks, a minute and a half. The same investigation done with logs
alone takes an afternoon and usually ends with a guess.

## Cardinality {#la-cardinalite}

Why not a single tool that does all of this?

<jargon mot="cardinality">Cardinality</jargon> is the number of distinct combinations
the labels of a piece of data can take. The word sounds abstract, and it is what decides
the design of every tool.

A metric is aggregated ahead of time. When a request fails, a counter goes from 3 to 4,
and that is all. The user, the URL, the call stack, the request identifier: everything
is thrown away, on purpose, at write time. In exchange, this counter is permanent and
almost free, including when queried over six weeks, since the answer was computed when
the data arrived.

What remains is to make this metric able to explain. If we labelled the counter with the
user's identifier, we would no longer have one metric but as many metrics as the system
has users. Adding the URL with its parameters would multiply again. Prometheus keeps its
indexes in memory, so it does not degrade gracefully and would collapse under its own
weight.

:::schema schema-cardinalite
titre: Number of series stored by the metric, on a logarithmic scale
voir: Checkboxes, one per metric label (status 5 values, route 20, method 6, customer identifier 40,000, URL unbounded). A logarithmic bar and a counter follow the number of stored series, and switch to alert beyond the threshold.
:::

:::devine
question: We add a customer identifier label to a metric. What happens?
options: ['Queries slow down a little', 'Storage grows proportionally', 'The database goes down']
bonne: 2

reponse: Each label value creates one more series, kept in memory. Forty thousand customers make forty thousand series for this one counter, and the index is not designed to degrade gradually.

:::

A metric can therefore never give per-request detail. The property that makes it cheap
is precisely the one that throws the detail away.

A trace does the opposite and keeps every instance with its full causality, so it costs
far more. This is why production systems only keep one in ten or one in a hundred, and
why one cannot alert on them: an alarm built on a sample misses the events that were not
sampled.

No future tool will merge the three, because a metric detailed enough to explain
destroys its own database, and a trace complete enough to alert on costs the price of
all the traffic.

## Not everything is a request {#tout-n-est-pas-une-requete}

Memory in use, CPU load, the depth of a queue: this is machine state, not events. This
state has no trace, since no request caused it, and often no log, since nobody writes a
"memory: 512 MB" line every thirty seconds. The investigation then stays in the
metrics, cross-checked with the events Kubernetes records itself.

## One identifier, propagated everywhere {#la-colle}

The three pillars are only worth something if one can move from one to the next, and a
single mechanism makes it possible: a trace identifier, generated at the entrance of the
system and carried through everything. It has to appear in three places:

- in the trace, where it is born;
- in every log line written while handling this request;
- attached to the data points, which is what makes the spike clickable (see exemplars in
  [chapter 5](#/en/blog/introduction-observabilite/instrumenter#les-exemplars)).

This is the instrumentation work that matters most, and the one most often skipped.
Without it there is no observability foundation, there are three separate tools and the
habit of comparing timestamps by hand.
