# Texte du site, export pour relecture

Genere par `node scripts/exporter.mjs` depuis les fragments de chaque section, le 2026-09-09.

La prose est en markdown, modifiable librement. Ce qui suit est fonctionnel et doit rester en place :

- `## Titre {#ancre}` : l'ancre est la cible de liens croises, ne la renomme pas.
- `<jargon mot="x">y</jargon>` : definit un terme a sa premiere occurrence dans la page.
- `<mesure valeur="...">y</mesure>` : un chiffre mesuré, marqué comme tel.
- `:::regle`, `:::aller-plus-loin`, `:::devine`, `:::tableau` : des blocs, dont la prose interieure est modifiable.
- `:::schema` : une fiche descriptive, informative seulement. Le schema lui-meme est du code.

---

# Antoine Bastos

```
article   : cv
page      : cv
fichier   : cv/cv.en.html
surtitre  : 
lecture   : - min
```

Java backend software engineer. Data migrations, legacy code, performance.

At Lunatech since 2024. Quarkus and Spring day to day, comfortable in old or poorly documented codebases, with a habit of measuring before optimising. AI-assisted development every day, Claude Code first, with guardrails: specifications, review, tests before any commit.

- Seine-et-Marne, France
- Lunatech
- [GitHub](https://github.com/4nt0ineB)
- [LinkedIn](https://www.linkedin.com/in/antoineba6/)

## Experience {#experience}

March to August 2026

### CARIAD, Volkswagen Group

Lead developer, through Lunatech

- Migration of a back-office permission-management tool, from server-side rendering to a REST API and a React frontend.
- Strangler Fig strategy: new frontend served alongside the old one behind a feature flag, endpoint-by-endpoint migration, instant rollback.
- Authorisation rework: a role, operation and scope matrix, pinned by a test suite, replaces the scattered inherited checks.
- Mentoring of an apprentice developer through code review and pairing.

Java, Spring Boot, React, TypeScript, Vitest

July 2025 to March 2026

### DARVA, Domaine Client

Backend developer, through Lunatech

- Migration of thousands of customers' data to a new master data system: batch taken over midway, completed and released to production.
- CRM calls parallelised, queries and Hibernate Reactive session handling reworked: batch run time brought from eight hours to under an hour and a half.
- Recurring business batches optimised, from tens of minutes or crashes to a few minutes.
- JVM memory saturation in acceptance testing diagnosed, nested joins simplified.
- Functional documentation of the business rules, which did not exist until then.

Java, Quarkus, Hibernate Reactive, Mutiny, Kafka, MariaDB, Jenkins

January to July 2025

### DARVA, Exiris

Full-stack developer, through Lunatech

- Electronic registered mail platform: search features and client certificate checks.
- Non-regression tests migrated from Cypress to Playwright; Jenkins pipeline maintenance and Jira statuses updated from PR state.

Java, Quarkus, React, TypeScript, Playwright, Jenkins

May to August 2024

### Open Food Facts

Backend developer, open source contributor, in English

- Odoo CRM integration over XML-RPC in the Perl monolith of the producer platform: contact and organisation creation, duplicate detection, import of three hundred existing organisations.
- Routing module rewritten into typed handlers, adopted as the project standard.
- [Thirty-four merged PRs](https://github.com/openfoodfacts/openfoodfacts-server/pulls?q=is%3Apr+author%3A4nt0ineB+is%3Amerged) in four months.

Perl, Docker, Linux

summer 2022

### VLA, catalogue raisonné

Freelance, sole developer

- Online catalogue of the six hundred and fifty works of painter Vonick Laubreton: quote, mockups, two intermediate reviews, deployment.
- [Online since 2022](https://laubreton.com).

Python, Django, JavaScript, Docker, Nginx

## Skills {#competences}

Languages

Java, TypeScript, Python, SQL

Frameworks

Quarkus, Spring Boot, Hibernate, Mutiny and Vert.x, React

Data and infra

PostgreSQL, MariaDB, Kafka, Docker, Jenkins, Linux

Practices

Hexagonal architecture, Strangler Fig, Playwright tests, continuous integration, Scrum

AI

Claude Code, Gemini CLI, GitHub Copilot

## Education {#formation}

### Master's in computer science, software and data engineering

Université Gustave Eiffel, 2025

## Languages {#langues}

French, native. Professional English, TOEIC 945 in 2025.

## Writing {#ecrits}

### [An introduction to observability](#/en/blog/introduction-observabilite)

Twelve pages, from nine failures reproduced on a test machine.

---

# Antoine Bastos

```
article   : cv
page      : fancy
fichier   : cv/fancy/cv.en.html
surtitre  : 
lecture   : - min
```

01

software engineer

Seine-et-Marne, France

Java backend, performance, legacy modernisation and data migration. At Lunatech since 2024.

## 02 career {#parcours}

1. March to August 2026 CARIAD, Volkswagen Group lead developer, through Lunatech Migration of a back-office permission-management tool, from server-side rendering to a REST API and a React frontend. The Strangler Fig pattern, endpoint by endpoint and behind a feature flag, for instant rollback and no regression. Java · Spring Boot · React · TypeScript · Vitest
2. July 2025 to March 2026 DARVA, Domaine Client backend developer, through Lunatech Migration of the CRM to a new solution. Development and production release of the data migration batch for thirty thousand customers. Java · Quarkus · Hibernate Reactive · Mutiny · Kafka · MariaDB · Jenkins
3. January to July 2025 DARVA, Exiris full-stack developer, through Lunatech Electronic registered mail platform: search and certificate-monitoring features. Test migration to Playwright. Java · Quarkus · React · TypeScript · Playwright · Jenkins
4. May to August 2024 Open Food Facts backend developer, master's internship, in English Odoo CRM integration over XML-RPC into the Perl monolith of the producer platform, import of three hundred organisations, and a rewrite of the routing into typed handlers, adopted as the project standard. Perl · Docker · Linux
5. summer 2022 [VLA, catalogue raisonné](https://laubreton.com) freelance, sole developer Online catalogue of the six hundred and fifty works of the painter Vonick Laubreton, from quote to production. The site is still online. Python · Django · JavaScript · Docker · Nginx

## 03 education {#formation}

1. Master's in Computer Science, Software and Data Engineering Université Gustave Eiffel, 2025
2. TOEIC score 945, professional English, 2025

## 04 tools {#outils}

languages

- Java
- TypeScript
- Python
- SQL

frameworks

- Quarkus
- Spring Boot
- Hibernate
- React
- Mutiny and Vert.x

data and infra

- PostgreSQL
- MariaDB
- Docker
- Jenkins
- Linux

ai

- Claude Code
- Gemini CLI
- GitHub Copilot

practices

- Hexagonal architecture
- Strangler Fig
- Playwright tests
- Continuous integration
- Scrum

## 05 contact {#contact}

- [github.com/4nt0ineB](https://github.com/4nt0ineB)
- [linkedin.com/in/antoineba6](https://www.linkedin.com/in/antoineba6/)

antoine bastos · 2026 · cv inspired by emil ruder, tm 12, 1955

---

# An introduction to observability

```
article   : introduction-observabilite
page      : accueil
fichier   : blog/introduction-observabilite/en/00-accueil.html
surtitre  : Introduction
lecture   : 1 min
```

The code is running in production and one morning, someone says the application is slow. There is no debugger, and no way to reproduce the context of the problem. If observability has been set up, a developer has something to work with. Otherwise, good luck.

This article is for someone who knows what a log line is and may have seen a Grafana dashboard on a colleague's screen, without ever having built or run what produces those graphs. No knowledge of observability tooling (Prometheus, Kubernetes, and so on) or of the related notions is assumed, and jargon is explained the first time it appears.

It comes from an AI-assisted self-training review: nine failures provoked under real load, on a real server, diagnosed from the dashboards alone. Every figure in it was observed through a series of hands-on exercises on a virtual server.

The goal is to give the reader a mental picture of observability and its key concepts. It is not about the ability to diagnose an outage, which a text of a few lines could not teach.

---

# Production has no debugger

```
article   : introduction-observabilite
page      : prod-sans-debogueur
fichier   : blog/introduction-observabilite/en/01-prod-sans-debogueur.html
surtitre  : Chapter 1
lecture   : 2 min
```

## The debugging loop, impossible in production {#la-boucle-perdue}

In development, we enjoy a loop so comfortable that it only gets noticed once it is gone: run the code, watch it fail, set a break point, run again, and the failure happens again, because we control the input.

Production makes this loop impossible. The failure happened once, twenty minutes ago, for one user out of forty thousand, on one of four processes, and the state that caused it is already gone. The system cannot be paused, since it keeps serving users.

## Instrumenting before the failure {#ecrire-a-l-avance}

What remains is what the system wrote while it was running. Observability consists in making it write, ahead of time, the data that will answer questions nobody is asking yet. Everything hangs on "ahead of time", because what was not recorded at 14:32 will never be found.

## The three questions of an investigation {#trois-questions}

Every investigation asks the same three questions, in the same order:

1. Is there a problem, and since when?
2. Where is it, in a system made of several parts?
3. Why, exactly?

They are different questions, and they call for different data, because data that answers the first one well answers the third one badly. The reason is mathematical, not historical, and the next chapter lays it out. For now, let us keep this sequence in mind: detect, locate, explain.

:::regle
Almost every bad investigation starts in the middle, by searching for a word in the logs.
:::

## Why adding logs stops being enough {#pourquoi-les-logs-cassent}

Adding logs is every developer's reflex, and the reflex is right. It breaks in three distinct ways.

It breaks on volume. One line per request, at forty thousand requests a minute, is a lot of text. Storing it stays affordable, but searching it does not, since searching means reading everything again.

It breaks on aggregation. "How many orders failed in the last hour" is a counting question, and a log line is not a count. One can certainly recount on every dashboard refresh and every alert evaluation, at the cost of rereading gigabytes of text - ouch.

It breaks across processes. When a request touches four services, its story scatters into four separate piles of text, on four machines, tied together by nothing but an approximate timestamp. Reassembling one request by hand is still possible, but not for the hundred requests that failed in the same minute.

Logs are not bad for all that. They answer the third question better than any other tool, because they keep the detail. They are unsuited to the first two, and rushing to them first is the most common mistake.

---

# Three pillars, and why exactly three

```
article   : introduction-observabilite
page      : trois-piliers
fichier   : blog/introduction-observabilite/en/02-trois-piliers.html
surtitre  : Chapter 2
lecture   : 4 min
```

## Detect, locate, explain {#detecter-localiser-expliquer}

The three pillars of observability are the metric, the <jargon mot="trace">trace</jargon> and the log. They are not three competing ways of doing the same job but three floors of the same investigation. Each answers one of the three questions of the previous chapter.

:::tableau legende="The three pillars, the question each answers, its role in the investigation."

| pillar | the question it answers | its role |
|---|---|---|
| metric | Is there a problem, and since when? | detect, raise the alert |
| trace | Where, in the system? | locate |
| log | Why, exactly? | explain |

:::

A single HTTP request produces all three at once. They are three projections of the same event but each at a different level of detail:

- a point in a histogram (the metric), where the identity of the request is thrown away;
- a tree of operations (the trace), which keeps the identity and the causality;
- two or three lines of text (the log), which keep the identity but not the structure.

## The slow checkout {#le-checkout-lent}

Let us assume a REST API on some server, and an observability dashboard already in place. We call p95 latency the threshold under which 95 % of requests complete, the remaining 5 % being slower.

### Floor one, the metric

An alert fires: the p95 of `/checkout` goes from 200 milliseconds to 3 seconds. The dashboard shows that the problem started at 14:02, that it only affects this route, and that the error rate stays flat. The service is slow but not broken. We know when and what, and no further detail about the metric will ever say why.

### Floor two, the trace

A click on the spike opens the trace of a real slow request. This trace is a tree of operations, each with a start, a duration, a parent and attributes (a span, in OpenTelemetry). The tree shows 3.1 seconds in total, 2.9 of which are held by a hundred twin operations, all `SELECT * FROM items WHERE order_id = ?`. We now know where: loading the items makes a hundred queries instead of one.

### Floor three, the log

A click on one of these operations opens the log tool, already filtered on the identifier of this request. A single line answers everything: `cache miss for order items, falling back to per-item fetch`. The cache has been empty since the 14:02 deployment.

:::schema schema-trois-etages
titre: The /checkout latency goes from 200 milliseconds to 3 seconds at 14:02
titre: A 3.1-second trace, 2.9 seconds of which in a hundred twin SQL queries
titre: A log filtered on the trace identifier
voir: L'enquete du checkout lent en trois clics. Etage 1 le graphe de latence avec son point d'exemplar, etage 2 la trace en cascade et ses cent requetes jumelles, etage 3 la ligne de log filtree sur l'identifiant de trace.
:::

Three tools, three clicks, a minute and a half. The same investigation done with logs alone takes an afternoon and usually ends with a guess.

## Cardinality {#la-cardinalite}

Why not a single tool that does all of this?

<jargon mot="cardinality">Cardinality</jargon> is the number of distinct combinations the labels of a piece of data can take. The word sounds abstract, and it is what decides the design of every tool.

A metric is aggregated ahead of time. When a request fails, a counter goes from 3 to 4, and that is all. The user, the URL, the call stack, the request identifier: everything is thrown away, on purpose, at write time. In exchange, this counter is permanent and almost free, including when queried over six weeks, since the answer was computed when the data arrived.

What remains is to make this metric able to explain. If we labelled the counter with the user's identifier, we would no longer have one metric but as many metrics as the system has users. Adding the URL with its parameters would multiply again. Prometheus keeps its indexes in memory, so it does not degrade gracefully and would collapse under its own weight.

:::schema schema-cardinalite
titre: Number of series stored by the metric, on a logarithmic scale
voir: Des cases a cocher, une par etiquette de metrique (statut 5 valeurs, route 20, methode 6, identifiant client 40 000, URL sans limite). Une barre en echelle logarithmique et un compteur suivent le nombre de series stockees, et basculent en alerte au-dela du seuil.
:::

:::devine
question: We add a customer identifier label to a metric. What happens?
options: ['Queries slow down a little', 'Storage grows proportionally', 'The database goes down']
bonne: 2

reponse:

Each label value creates one more series, kept in memory. Forty thousand customers make forty thousand series for this one counter, and the index is not designed to degrade gradually.

:::

A metric can therefore never give per-request detail. The property that makes it cheap is precisely the one that throws the detail away.

A trace does the opposite and keeps every instance with its full causality, so it costs far more. This is why production systems only keep one in ten or one in a hundred, and why one cannot alert on them: an alarm built on a sample misses the events that were not sampled.

No future tool will merge the three, because a metric detailed enough to explain destroys its own database, and a trace complete enough to alert on costs the price of all the traffic.

## Not everything is a request {#tout-n-est-pas-une-requete}

Memory in use, CPU load, the depth of a queue: this is machine state, not events. This state has no trace, since no request caused it, and often no log, since nobody writes a "memory: 512 MB" line every thirty seconds. The investigation then stays in the metrics, cross-checked with the events Kubernetes records itself.

## One identifier, propagated everywhere {#la-colle}

The three pillars are only worth something if one can move from one to the next, and a single mechanism makes it possible: a trace identifier, generated at the entrance of the system and carried through everything. It has to appear in three places:

- in the trace, where it is born;
- in every log line written while handling this request;
- attached to the data points, which is what makes the spike clickable (see exemplars in [chapter 5](#/en/blog/introduction-observabilite/instrumenter#les-exemplars)).

This is the instrumentation work that matters most, and the one most often skipped. Without it there is no observability foundation, there are three separate tools and the habit of comparing timestamps by hand.

---

# The journey of a data point

```
article   : introduction-observabilite
page      : le-trajet
fichier   : blog/introduction-observabilite/en/03-le-trajet.html
surtitre  : Chapter 3
lecture   : 3 min
```

## Stores and pipes {#deux-boites}

Most confusion about tooling disappears once each product is put into one of two boxes: those that keep the data, and those that move it. A lot of debate goes into tools that do not compete, because they are not in the same box.

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

This stack was chosen because it is proven, free, fits on an 8 GB machine, and Grafana can read all three stores. Other choices exist and the next page names one.

This map answers "what is this component". It does not answer "how does the data reach my screen", which is a question of movement.

## From the application to the screen {#de-l-application-a-l-ecran}

An instrumented application emits its three pillars through three different paths.

- Its metrics go nowhere. It exposes them on an HTTP endpoint, `/metrics`, and Prometheus comes to read them.
- Its traces leave over OTLP to the OpenTelemetry collector, which routes them to Tempo.
- Its logs go to its standard output, where an agent running on the machine, Alloy, reads them, labels them and pushes them to Loki. The application does nothing for this, which is the strength of an agent, since it collects without any cooperation from the code.

Grafana reads the three stores and puts them on the same screen. In parallel, Prometheus evaluates its alerting rules, and a fired alert can reach a human.

:::schema schema-trajet
titre: The journey of a data point, from the application to the screen
voir: Un schema en trois colonnes, application, tuyaux et stockages, ecran. Les quatre chemins s'allument l'un apres l'autre : /metrics que Prometheus vient lire, les traces vers le collecteur puis Tempo, la sortie standard lue par Alloy puis Loki, et Grafana qui lit les trois.
:::

## Pull versus push {#pull-contre-push}

Two of these three paths go one way and the third the other, and this asymmetry is not arbitrary.

Prometheus does <jargon mot="pull">pull</jargon>. The application sends its metrics nowhere, it displays its current counters as text on `/metrics`, and Prometheus connects to this endpoint every fifteen or thirty seconds to note what it sees. This operation is called a <jargon mot="scrape">scrape</jargon>.

Logs and traces, on the other hand, are <jargon mot="push">pushed</jargon>. An event happens when it happens, so something has to send it at the moment it occurs. A state, on the contrary, is measured on demand. One cannot ask a process what it logged in the last thirty seconds, but one can always ask it how much memory it is using now.

:::schema schema-pull-push
titre: Prometheus pulls its metrics, the agent pushes its logs
voir: Deux colonnes animees en boucle. A gauche Prometheus qui va chercher ses metriques, a droite l'agent qui pousse ses logs vers Loki.
:::

Pull has a consequence that comes back in [chapter 6](#/en/blog/introduction-observabilite/lire-un-graphe#la-fenetre): a metric has no continuous value, it has the value it had at the instants someone came to read it. An event that starts and ends between two scrapes never existed for Prometheus.

## What the collector is for {#ce-que-le-tuyau-achete}

The collector keeps nothing, so one may wonder what it is for. It is there so that the application only knows a single destination. Replacing Tempo with something else becomes a change in the collector's configuration, not a redeployment of forty services.

A misleading name on this point: the collector has an exporter called `prometheus`, and it sends nothing to Prometheus. It imitates it, by translating the metrics into its text format and exposing them on a `/metrics` that Prometheus comes to scrape like any other target. The pull model stays intact even there.

---

# The tools, one by one

```
article   : introduction-observabilite
page      : les-outils
fichier   : blog/introduction-observabilite/en/04-les-outils.html
surtitre  : Chapter 4
lecture   : 4 min
```

## Prometheus {#prometheus}

Prometheus is a database for numbers over time. It also carries its query language, PromQL, and the engine that evaluates alerting rules. Almost every metrics stack one will come across is either Prometheus or a tool that speaks its language.

It keeps its indexes in memory, which explains both its speed and its fragility. A label with too many distinct values does not slow it down gradually, it brings it down (see [cardinality](#/en/blog/introduction-observabilite/trois-piliers#la-cardinalite)).

## Loki {#loki}

Loki is the Prometheus of logs: the same place in the architecture and the same shape, but for timestamped text rather than numbers. It collects nothing itself, since it is the machine's agent that reads the output of the processes, labels it and pushes it.

Loki never indexes the content of the log line. It indexes a set of labels defined ahead of time, per time window. A search on these labels is cheap. Once the type of log and the period are targeted, what remains is a text search, like a grep. This choice makes it far cheaper than a full-text search engine, and worse at finding a precise identifier in everything that was ever logged.

Hence the most common Loki mistake, and a classic interview question. Labels create physically separate streams, so the cardinality constraint applies here as is. The severity level is fine, there are five of them (info, debug, warn, error, trace). A label for the user identifier or the trace identifier destroys the system, and those go into the content of the line, where a text filter finds them.

## Tempo {#tempo}

Tempo is the storage for traces, and it follows Loki's philosophy, a minimal index. It indexes the trace identifier, never the detail of each <jargon mot="span">span</jargon>, and puts the rest in cheap bulk storage.

This is a deliberate bet on how traces are used, because the main path is "I already have a trace identifier, from a log line or an exemplar, show me the tree". Searching traces by arbitrary attribute at high volume calls for another design, more expensive to run (the Elasticsearch, Logstash, Kibana stack, known as ELK).

A trace that has just been sent is not immediately searchable, since it goes through an ingestion buffer and becomes queryable a minute or two later. Do not conclude "there are no traces" twenty seconds after triggering a request.

## OpenTelemetry {#opentelemetry}

OpenTelemetry, often written OTel, is a standard in two halves.

The first is a library added to the application. It produces metrics, traces and logs in a neutral format, so the code is not written against Prometheus or against Tempo but against the standard.

The second is the collector, whose role the [previous chapter](#/en/blog/introduction-observabilite/le-trajet#ce-que-le-tuyau-achete) gives. Its configuration has three stages:

- receivers accept the telemetry;
- processors transform it (batching, memory limits, origin metadata);
- exporters send it onwards.

Processors are not scripts you write. They are components already compiled into the program, and the configuration only picks them, tunes them and sets their order.

## Grafana {#grafana}

Grafana is the display layer and stores nothing. It connects to Prometheus, Loki and Tempo at the same time, which is what makes the [three-click investigation](#/en/blog/introduction-observabilite/trois-piliers#le-checkout-lent) possible.

Around it, most components ship their own small web interface.

:::regle
An interface one has to remember to open is not monitoring.
:::

The health of a component has to become a metric, then a panel, then an alert. Otherwise one has to go and look at another tool's interface, and one will only go and look if a problem is already suspected. A piece of information not visible in Grafana teaches nothing until someone goes looking for it.

One exception: the Prometheus interface has a page that lists every application it comes to read, and says whether that read fails and why. When an expected metric does not show up in Grafana, that is usually where the answer is, because the problem is upstream of any dashboard.

:::aller-plus-loin titre="Elasticsearch, and the three cases where full text wins"

Elasticsearch, usually used in an ELK stack (Elasticsearch, Logstash, Kibana), indexes the full text of every line. This index gives broad ad hoc search, on any word, but it is expensive at scale, because it often exceeds the size of the data itself.

If the services you write yourself are well instrumented, it will not be needed for them. Three cases remain where it wins.

1. A business identifier that arrives late, through customer support, weeks after the facts. It is not a trace identifier, because traces are kept a few days and sampled, whereas logs are kept for weeks. A cold search across all services, weeks back, is what full-text indexing exists for.
2. Security and audit. "Every action of this user on every system for six months" is a cold full-text search over a long period, and no amount of tracing answers it.
3. Systems you do not control. A real company contains legacy platforms, appliances and vendor software that emit unstructured text, with no identifier in it. Full-text indexing is the lowest common denominator, since everything gets indexed for want of being able to change what is emitted.

Good instrumentation makes a full-text engine unnecessary for the code you write yourself. It remains the right tool for the code you do not write.

:::

---

# The instrumentation you write yourself

```
article   : introduction-observabilite
page      : instrumenter
fichier   : blog/introduction-observabilite/en/05-instrumenter.html
surtitre  : Chapter 5
lecture   : 2 min
```

## The metrics the framework provides {#ce-qui-existe-sans-rien-faire}

Modern frameworks already instrument a lot out of the box: incoming HTTP requests, response codes, the latency distribution, memory, the garbage collector, the usage of the database connection pool. All of this usually exists as soon as the metrics dependency is added (Micrometer for Quarkus and Spring Boot).

No need to rebuild it. The work that belongs to the developer is the layer nobody else can guess, namely what the application does for the business.

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

Worth knowing: an average latency is worth almost nothing, since it is dominated by the many fast requests and hides the slow ones. A percentile, on the contrary, describes the experience of the least lucky users, and that is what makes a histogram useful.

## Business metrics {#les-metriques-metier}

`orders_created_total`. `cart_value_euros`. `password_resets_total`. These are legitimate metrics, and impossible to instrument automatically, since no framework knows what an order is.

They are also what makes an incident readable to someone other than the developer. "Latency is rising" is a technical fact. "Payments dropped to zero four minutes ago" is an outage, and everyone understands it.

[Chapter 2](#/en/blog/introduction-observabilite/trois-piliers#la-cardinalite) gave the constraint that frames them: a label must have a small, finite, known set of values, like a status or a route name taken from a fixed list. Never an identifier, never a raw URL with its parameters, never anything that comes from user input.

## The limit: a question asked in advance {#une-question-posee-a-l-avance}

One can only query what one decided to instrument before the incident, and that is the limit of the approach. If nobody thought of counting rejected uploads, then during the incident about rejected uploads, that figure does not exist and cannot be recovered afterwards.

Logs have the symmetrical limit and strength, because they answer questions nobody had anticipated and aggregate badly. This symmetry is the reason for keeping both.

## Exemplars {#les-exemplars}

An <jargon mot="exemplar">exemplar</jargon> is a small pointer attached to a data point, carrying the identifier of one precise request that contributed to that point. It is what turns "the p95 went up" into "here is a real slow request, to look at closely".

It is a modest amount of configuration, and the highest-value link in the whole stack, since it turns a statistic into a specimen. Without it, going from a graph to a trace means copying timestamps into a search bar and hoping.

---

# Reading a graph without being fooled

```
article   : introduction-observabilite
page      : lire-un-graphe
fichier   : blog/introduction-observabilite/en/06-lire-un-graphe.html
surtitre  : Chapter 6
lecture   : 4 min
```

A graph looks like a window onto the system. It is a reconstruction of it, made of points collected at a regular interval and then run through a query.

## The right edge of the graph {#le-bord-droit}

One might be tempted to read any movement at the right of the curve as "something is happening now". But the right edge is simply where the data stops, that is, now, and every graph always ends there, whether something is happening or not.

A dashboard that refreshes by itself recreates this impression every few seconds. A line that ticks up slightly at the right edge announces nothing, because it is the last sample, as noisy as the others, which does not yet have a neighbour to smooth it. Let us wait for the next refresh before waking anyone up.

## A flat line has two causes {#plat-n-est-pas-absent}

Let us assume a request <jargon mot="counter">counter</jargon>. It only goes up, and it answers "how many since this process started".

One day, its line goes flat.

:::devine
question: The request counter has not moved for ten minutes. What is going on?
options: ['The scrape is broken', 'No requests are arriving any more', 'The counter has reached its maximum']
bonne: 1

reponse:

No requests are arriving any more, and that is the incident. Collection, for its part, runs every fifteen seconds and reads the same value again. A broken scrape does not give a flat line, it makes the series disappear.

:::

The two situations call for opposite responses, because a flat counter means the thing being counted has stopped happening, whereas an absent series means collection itself is broken.

A raw counter is therefore rarely read as is. It is converted into a rate, that is "how many per second, now", by dividing what it gained by the time elapsed. We alert on this rate and we diagnose on this rate. The raw counter is only for reading an exact total.

This is also why an alert that compares a raw counter to a fixed threshold is a design error and not a setting to tune. The counter only ever grows, so a threshold that makes sense in the first hour makes none in the third week. A rate, on the other hand, stays comparable from one day to the next.

## The window of a query {#la-fenetre}

A rate is computed over a time window, chosen at each query: the counter's variation over the window, divided by its length. This window carries two traps, which pull in opposite directions.

Too wide a window spreads a short event out. A six-second incident, averaged over a minute, draws a bump a minute wide, and nothing in the graph is broken.

:::schema schema-fenetre-rate
titre: A real 6-second incident, and what a moving average shows of it depending on the chosen window width
voir: Un incident reel de 6 secondes, et un curseur de fenetre de requete. La courbe de verite ne bouge jamais, la courbe affichee s'elargit et s'aplatit a mesure que la fenetre grandit.
:::

Too narrow a window hides an event. A query asking for the increase over the last fifteen minutes returns zero for everything that happened before, even though the raw counter still carries the mark.

For a post-mortem, it is therefore better to read the raw counter first, and to move to a window only once the incident has been located on the timeline. And when the real duration of an event matters, a source with exact timestamps is needed, such as Kubernetes events, because no moving average can resolve a few seconds.

## The time of the scrape {#l-heure-du-scrape}

The position of a point on the timeline is the moment it was collected, not the moment the event took place. Let us assume a container killed at 11:21:31, according to the timestamp of its end, with a collection every two minutes. The panel shows it at 11:23, because the next collection happened then. Two minutes of error are enough to blame the wrong deployment. When the exact instant matters, look for a metric that carries the event's timestamp as its value, not the position of the sample.

## A single clock {#une-seule-horloge}

Nothing drifts in storage, because the metrics, logs and traces databases all store an instant as a number, with no time zone attached. The risk is at display time, and in the text of the log lines.

At display time, each tool has its own time zone setting, and Grafana has two: one for the dashboards, one for ad hoc views. Without a decision, the same outage reads 12:50 on one screen and 14:50 on the other. Decide on UTC and apply it everywhere.

In the log lines, the trap is the format:

```
2026-08-20 12:16:24,793 INFO ...      ambiguous forever
2026-08-20T13:07:43.370Z INFO ...     the offset is carried in the line
```

Rendered without an offset, the same instant in two time zones produces two indistinguishable lines, two hours apart, and nothing in the line says which is which. Always format timestamps with the offset included.

:::regle
A graph shows the shape the query gave it, not the shape of the incident.
:::

---

# Probes are commands

```
article   : introduction-observabilite
page      : sondes
fichier   : blog/introduction-observabilite/en/07-sondes.html
surtitre  : Chapter 7
lecture   : 4 min
```

A healthcheck is an HTTP endpoint a service exposes to say whether it is fine, and that another program calls at a regular interval. Docker, a load balancer or an orchestrator all have one. On Kubernetes, the agent running on each machine (kubelet) asks the question, and it is called a probe.

A probe looks like monitoring but it is a command, since the kubelet acts on the answer, immediately and without asking. And if the service runs on Kubernetes, probes exist, whether they were configured or not.

## Two probes, and what each failure triggers {#deux-sondes}

:::tableau legende="The two probes, the question they ask, and what a failure does."

| probe | the question asked | on failure |
|---|---|---|
| <jargon mot="liveness">liveness</jargon> | can a restart repair this process? | the kubelet **kills** the container |
| <jargon mot="readiness">readiness</jargon> | can this pod take traffic right now? | it is **removed** from the Service, and keeps running |

:::

The Service is the stable address behind which the pods take turns, and a request that reaches it is sent to one of the ready pods. A pod removed from the Service keeps running, it just no longer receives anything.

:::regle
A liveness failure destroys, a readiness failure only redirects.
:::

## Never a dependency in a liveness probe {#jamais-de-dependance}

A liveness probe answers a single question: is this process stuck for good, by a deadlock or an event loop that will never turn again?

It must therefore check neither the database, nor another service, nor the network, because the chain reaction is mechanical. If the database goes down and the liveness probe checks the database, every pod fails its probe at the same moment, so the kubelet kills them all, in a loop. The database outage becomes a database outage plus a total loss of the service.

:::schema schema-reaction-chaine
titre: Final state: readiness failing, the four instances out of service but still running, database restored
titre: Final state: liveness failing, the four instances killed and restarted in a loop, database restored but the backoff goes on
titre: Four instances and a database, during and after an outage
voir: Quatre instances et une base. Un interrupteur « la liveness interroge la base », un bouton pour couper la base. Le compteur de redemarrages reste a zero dans le bon scenario et grimpe dans le mauvais.
:::

The test to apply: if the remedy is not "kill this process and start a new one", that check has no place in a liveness probe. Dependency checks go in the readiness probe, whose verdict removes a pod from the Service without destroying anything.

When in doubt, it is perfectly fine not to declare a liveness probe at all. The kubelet will then never kill the process, and that is a far safer default than a badly written probe.

## A probe that touches nothing {#une-sonde-qui-ne-touche-a-rien}

Let us assume a service under heavy load: twenty requests per second, each taking three seconds, against a pool of twenty threads. Its liveness probe is as simple as can be, it checks nothing and returns a fixed answer straight away.

:::devine
question: Under this load, what does the liveness probe do?
options: ['It answers, since it does nothing', 'It fails, for lack of a thread to answer', 'It slows down but stays within the deadline']
bonne: 1

reponse:

It fails. An endpoint that does nothing still needs a thread to answer, and all twenty are busy.

:::

The tolerated response time is one second by default, and three failures in a row are enough to kill. With these two defaults left as they were, the probe failed <mesure valeur="2 times out of 3">under this load, one cycle away from the crash loop, with a healthy application</mesure>. A probe that touches nothing is not a probe that needs nothing.

:::regle
A liveness probe must not be able to fail because of load.
:::

When it is sensitive to load, a passing overload becomes a <jargon mot="crash loop">crash loop</jargon>, and the crash loop destroys the capacity that would have absorbed the overload. The remedy is not to add capacity but to write the two values, wider than their defaults. It is the readiness probe that is allowed to react to load, because it removes traffic without destroying anything.

## Two failure messages that mean the opposite {#deux-messages-opposes}

When reading probe failures in the events, this distinction is the fastest diagnosis:

- "connection refused": nothing is listening. The process is starting, or it is dead.
- "deadline exceeded" or "timeout": something is listening and did not answer in time. That is saturation, and the process is probably fine.

## A single bit of output {#un-seul-bit-de-sortie}

A day comes when one needs to express "the service works, except that file upload is broken because the file storage is down". This nuance has no place in a probe, because a probe has a single bit of output and the kubelet acts on it without nuance. Fine-grained health goes into metrics and traces: error rates per route, and traces that show which dependency failed.

An application can therefore be alive, ready, and slow. A p99 of eight seconds next to a healthcheck that answers success is consistent. If that is surprising, the probe was not measuring what one assumed.

---

# An alert has to reach someone

```
article   : introduction-observabilite
page      : alerting
fichier   : blog/introduction-observabilite/en/08-alerting.html
surtitre  : Chapter 8
lecture   : 2 min
```

Everything above assumes someone is looking at a dashboard. At three in the morning, nobody is looking, and that is what an alert is for.

An alert is a query on the metrics, with a duration. Prometheus evaluates it every thirty seconds, and when it stays true for the whole duration, it fires it. What remains is to deliver it somewhere, an e-mail, a chat channel or a notification on a phone, and that is a separate setting, with its own destination. The duration is there so as not to wake someone up for a single unlucky sample. "Memory above 90 % for five minutes" is an alert, "memory above 90 %" is a nuisance.

Let us assume an observability stack installed two weeks ago with its default settings. A pod stops being ready, the alert fires, and it shows up in Grafana's alert list.

:::devine
question: Is anyone notified?
options: ['Yes, the alert reached the end of the chain', 'No, nobody', 'Only if the interface is open']
bonne: 1

reponse:

Nobody. The stack's default destination is called "null" and does nothing, so that a fresh installation does not send messages where nobody has configured anything. The alert shows up, and the chain stops there.

:::

:::regle
"We will see it" assumes a human in front of a dashboard, which is what an alert exists to remove.
:::

This default can stay for weeks without anyone noticing, and an alert rang for <mesure valeur="40 min">on a real incident without a single message leaving the machine</mesure>.

Two habits follow. The first is to send a real alert, on purpose, and to confirm that it reaches the device meant to receive it, not only the interface. The second is to keep the alert list empty in normal times, because an alert that rings permanently, even a correct one, turns the list into decoration. The third entry in a list that already has two changes nothing to the eye, and a team that starts with a noisy list durably learns to ignore it.

---

# Observability in the pipeline

```
article   : introduction-observabilite
page      : livrer
fichier   : blog/introduction-observabilite/en/09-livrer.html
surtitre  : Chapter 9
lecture   : 1 min
```

Dashboards and alerts are software. They have versions and bugs, they break when something else changes, and if they only exist as clicks made in an interface eighteen months ago, they will end up lost. It is therefore strongly suggested to keep them in the code repository. Grafana can load them from files.

Let us assume a pipeline that builds an image on every commit, then deploys it to the cluster. The deployment job has just finished green.

:::devine
question: What do we know about the service?
options: ['The new version is serving traffic', 'The new version is starting', 'The desired state was written, nothing more']
bonne: 2

reponse:

A deployment job reports a single fact, the command returned without error. If the referenced image does not exist, the run is green, the deployment is recorded as successful, and every new pod is stuck at start-up while the old ones keep serving.

:::

:::regle
A green pipeline is not a healthy service.
:::

A deployment is not finished when the command returns but when the new version serves traffic. The pipeline should therefore wait for the new pods to be ready, and the minutes that follow a deployment deserve more attention than the rest of the time. That is where [chapter 2](#/en/blog/introduction-observabilite/trois-piliers#le-checkout-lent) closed in three clicks: the decisive sentence was "the cache has been empty since the 14:02 deployment", and it was only possible because the deployment was visible on the graph. An annotation on the dashboards at every deployment, which Grafana does natively, is the best value for effort in the whole pipeline. Without it, the first question of every incident is "did we ship something recently?", and someone goes to check by hand.

---

# What a green dashboard does not say

```
article   : introduction-observabilite
page      : dashboard-vert
fichier   : blog/introduction-observabilite/en/10-dashboard-vert.html
surtitre  : Chapter 10
lecture   : 2 min
```

A flat counter and an absent series look alike. An aggregate at 65 % hides a pool at 97 %. An alert that was evaluated, routed and displayed notified nobody. A green run covers pods that do not start. Every page of this text met the same thing in a different form: an instrument that shows nothing is indistinguishable from a healthy system.

Let us assume a five-minute load test on a service, with a dashboard in front of us. Client-side result: zero failed requests, stable latency, throughput served equal to throughput requested.

:::devine
question: Is the service healthy?
options: ['Yes, the three figures say so', 'No, it is overloaded', 'We do not know']
bonne: 2

reponse:

We do not know. Zero failures says nothing was refused, not that nothing broke. The pods may have left the Service one by one while the client saw one hundred percent success, the liveness probe may be one cycle away from killing the container, and a memory limit may be crossed so fast that no request has time to fail.

:::

:::regle
A green dashboard is a hypothesis, not a result.
:::

Over the nine failures provoked for this text, this perfect client-side result appeared <mesure valeur="3 times out of 9">with, each time, a system in danger</mesure>.

Nothing in an instrument distinguishes a signal that shows nothing because nothing is broken from a signal that shows nothing because it is looking in the wrong place. The only way to settle it is to make something fail on purpose, at a chosen moment, while watching. Trigger every panel once and confirm that it moves, because a panel one has never seen react is decoration. Send an alert and wait for the phone. Kill a pod under load and read what the restart counter shows, that is, zero, since the killed pod no longer exists.

This is what the course that goes with this text makes you do. Each module sets a scene on a disposable cluster, sends load, asks for a written prediction before the first dashboard is opened, then breaks something. The written bet is what separates reading a conclusion from learning it: "the zero-failure column is the worst" teaches something to whoever bet on it, and nothing to whoever reads it in a table.

---

# A practical checklist

```
article   : introduction-observabilite
page      : checklist
fichier   : blog/introduction-observabilite/en/11-checklist.html
surtitre  : Chapter 11
lecture   : 2 min
```

Every line comes from something that first went wrong, somewhere in this text.

## When instrumenting the service {#en-instrumentant-le-service}

- Emit a trace identifier on every request, and put it in [every log line](#/en/blog/introduction-observabilite/trois-piliers#la-colle). Nothing else on this list matters as much.
- Format every timestamp with its offset, and set [a single time zone everywhere](#/en/blog/introduction-observabilite/lire-un-graphe#une-seule-horloge), including the default of ad hoc views.
- Add [exemplars](#/en/blog/introduction-observabilite/instrumenter#les-exemplars), so that a point on a graph can open a real request.
- Add the two or three [business counters](#/en/blog/introduction-observabilite/instrumenter#les-metriques-metier) that say what the service is for. They are what makes an incident readable to someone other than its author.

## When writing the probes {#en-ecrivant-les-sondes}

- Never put a dependency check in a [liveness probe](#/en/blog/introduction-observabilite/sondes#jamais-de-dependance). It goes in the readiness probe.
- Write the timeout and the failure count of every probe, without relying on the defaults, and give the liveness probe [a generous timeout](#/en/blog/introduction-observabilite/sondes#une-sonde-qui-ne-touche-a-rien). It exists to catch a process stuck for good, and it must never be able to fail because the process is busy.

## When building the dashboards {#en-construisant-les-dashboards}

- Alert and diagnose on the [rate](#/en/blog/introduction-observabilite/lire-un-graphe#plat-n-est-pas-absent), never on a raw counter compared to a threshold.
- Look for [the measurement that carries the instant of the event](#/en/blog/introduction-observabilite/lire-un-graphe#l-heure-du-scrape) when the exact time matters, rather than the position of a sample.
- Trigger [every panel once](#/en/blog/introduction-observabilite/dashboard-vert), on purpose, and confirm that it moves. A panel one has never seen react is decoration.

## When setting up alerting {#en-montant-l-alerting}

- Set up [alerts and their notifications](#/en/blog/introduction-observabilite/alerting), phone or e-mail, for critical failures.
- Fix at the source any alert that stays active permanently, from day one. Silence must be the normal state.

## When deploying {#en-deployant}

- Keep dashboards and alerting rules [in the repository](#/en/blog/introduction-observabilite/livrer), and never paste a panel from the web interface.
- Put a deployment annotation on the dashboards.
- Remember that a green run reports that the desired state was written, and nothing at all about its health.

:::regle
Ask the running system a question whose answer would be different in case of error. Not "did my command succeed", but "is the world now different from how I wanted it".
:::

---
