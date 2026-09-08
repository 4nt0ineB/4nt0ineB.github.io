# Reading a graph without being fooled

```
page      : lire-un-graphe
fichier   : blog/introduction-observabilite/en/06-lire-un-graphe.html
surtitre  : Chapter 6
```

A graph looks like a window onto the system. It is a reconstruction of it, made of
points collected at a regular interval and then run through a query.

## The right edge of the graph {#le-bord-droit}

One might be tempted to read any movement at the right of the curve as "something is
happening now". But the right edge is simply where the data stops, that is, now, and
every graph always ends there, whether something is happening or not.

A dashboard that refreshes by itself recreates this impression every few seconds. A line
that ticks up slightly at the right edge announces nothing, because it is the last
sample, as noisy as the others, which does not yet have a neighbour to smooth it. Let us
wait for the next refresh before waking anyone up.

## A flat line has two causes {#plat-n-est-pas-absent}

Let us assume a request <jargon mot="counter">counter</jargon>. It only goes up, and it
answers "how many since this process started".

One day, its line goes flat.

:::devine
question: The request counter has not moved for ten minutes. What is going on?
options: ['The scrape is broken', 'No requests are arriving any more', 'The counter has reached its maximum']
bonne: 1

reponse: No requests are arriving any more, and that is the incident. Collection, for its part, runs every fifteen seconds and reads the same value again. A broken scrape does not give a flat line, it makes the series disappear.

:::

The two situations call for opposite responses, because a flat counter means the thing
being counted has stopped happening, whereas an absent series means collection itself is
broken.

A raw counter is therefore rarely read as is. The tool is `rate()`, which turns it into
"how many per second, now". We alert on this rate and we diagnose on this rate. The raw
counter is only for reading an exact total.

This is also why an alert that compares a raw counter to a fixed threshold is a design
error and not a setting to tune. The counter only ever grows, so a threshold that makes
sense in the first hour makes none in the third week. A rate, on the other hand, stays
comparable from one day to the next.

## The window of a query {#la-fenetre}

`rate()` computes its average over a time window, chosen at each query. This window
carries two traps, which pull in opposite directions.

Too wide a window spreads a short event out. A six-second incident, averaged over a
minute, draws a bump a minute wide, and nothing in the graph is broken.

:::schema schema-fenetre-rate
titre: A real 6-second incident, and what a moving average shows of it depending on the chosen window width
voir: A real 6-second incident, and a query window slider. The truth curve never moves, the displayed curve widens and flattens as the window grows.
:::

Too narrow a window hides an event. A query asking for the increase over the last
fifteen minutes returns zero for everything that happened before, even though the raw
counter still carries the mark.

For a post-mortem, it is therefore better to read the raw counter first, and to move to a window only once the incident has been located on the timeline. And when the real duration of an event
matters, a source with exact timestamps is needed, such as Kubernetes events, because no
moving average can resolve a few seconds.

## The time of the scrape {#l-heure-du-scrape}

The position of a point on the timeline is the moment it was collected, not the moment
the event took place. Let us assume a container killed at 11:21:31, according to the timestamp of its end, with a collection every two minutes. The panel shows it at 11:23, because the next collection happened then. Two minutes of error are enough to blame the
wrong deployment. When the exact instant matters, look for a metric that carries the
event's timestamp as its value, not the position of the sample.

## A single clock {#une-seule-horloge}

Nothing drifts in storage, because the metrics, logs and traces databases all store an
instant as a number, with no time zone attached. The risk is at display time, and in the
text of the log lines.

At display time, each tool has its own time zone setting, and Grafana has two: one for
the dashboards, one for ad hoc views (`default_timezone` in `grafana.ini`). Without a
decision, the same outage reads 12:50 on one screen and 14:50 on the other. Decide on
UTC and apply it everywhere.

In the log lines, the trap is the format:

```
2026-08-20 12:16:24,793 INFO ...      ambiguous forever
2026-08-20T13:07:43.370Z INFO ...     the offset is carried in the line
```

Rendered without an offset, the same instant in two time zones produces two
indistinguishable lines, two hours apart, and nothing in the line says which is which.
Always format timestamps with the offset included.

:::regle
A graph shows the shape the query gave it, not the shape of the incident.
:::
