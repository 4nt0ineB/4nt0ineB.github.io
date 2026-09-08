# Probes are commands

```
page      : sondes
fichier   : blog/introduction-observabilite/en/07-sondes.html
surtitre  : Chapter 7
```

A healthcheck is an HTTP endpoint a service exposes to say whether it is fine, and that
another program calls at a regular interval. Docker, a load balancer or an orchestrator
all have one. On Kubernetes, the agent running on each machine (kubelet) asks the
question, and it is called a probe.

A probe looks like monitoring but it is a command, since the kubelet acts on the answer,
immediately and without asking. And if the service runs on Kubernetes, probes exist,
whether they were configured or not.

## Two probes, and what each failure triggers {#deux-sondes}

:::tableau legende="The two probes, the question they ask, and what a failure does."

| probe | the question asked | on failure |
|---|---|---|
| <jargon mot="liveness">liveness</jargon> | can a restart repair this process? | the kubelet **kills** the container |
| <jargon mot="readiness">readiness</jargon> | can this pod take traffic right now? | it is **removed** from the Service, and keeps running |

:::

The Service is the stable address behind which the pods take turns, and a request that
reaches it is sent to one of the ready pods. A pod removed from the Service keeps
running, it just no longer receives anything.

:::regle
A liveness failure destroys, a readiness failure only redirects.
:::

## Never a dependency in a liveness probe {#jamais-de-dependance}

A liveness probe answers a single question: is this process stuck for good, by a
deadlock or an event loop that will never turn again?

It must therefore check neither the database, nor another service, nor the network,
because the chain reaction is mechanical. If the database goes down and the liveness
probe checks the database, every pod fails its probe at the same moment, so the kubelet
kills them all, in a loop. The database outage becomes a database outage plus a total
loss of the service.

:::schema schema-reaction-chaine
titre: Final state, readiness failing, the four instances out of service but still running, database restored
titre: Final state, liveness failing, the four instances killed and restarted in a loop, database restored but the backoff goes on
titre: Four instances and a database, during and after an outage
voir: Four instances and a database. A switch "the liveness probe queries the database", a button to cut the database. The restart counter stays at zero in the good scenario and climbs in the bad one.
:::

The test to apply: if the remedy is not "kill this process and start a new one", that
check has no place in a liveness probe. Dependency checks go in the readiness probe,
whose verdict removes a pod from the Service without destroying anything.

When in doubt, it is perfectly fine not to declare a liveness probe at all. The kubelet
will then never kill the process, and that is a far safer default than a badly written
probe.

## A probe that touches nothing {#une-sonde-qui-ne-touche-a-rien}

Let us assume a service under heavy load: twenty requests per second, each taking three
seconds, against a pool of twenty threads. Its liveness probe is as simple as can be, it
checks nothing and returns a fixed answer straight away.

:::devine
question: Under this load, what does the liveness probe do?
options: ['It answers, since it does nothing', 'It fails, for lack of a thread to answer', 'It slows down but stays within the deadline']
bonne: 1

reponse: It fails. An endpoint that does nothing still needs a thread to answer, and all twenty are busy.

:::

The tolerated response time is one second by default, and three failures in a row are
enough to kill. With these two defaults left as they were, the probe failed
<mesure valeur="2 times out of 3" source="lab, 2026-08-26">under this load, one cycle away from the crash loop, with a healthy application</mesure>.
A probe that touches nothing is not a probe that needs nothing.

:::regle
A liveness probe must not be able to fail because of load.
:::

When it is sensitive to load, a passing overload becomes a
<jargon mot="crash loop">crash loop</jargon>, and the crash loop destroys the capacity
that would have absorbed the overload. The remedy is not to add capacity but to write
the two values, wider than their defaults. It is the readiness probe that is allowed to
react to load, because it removes traffic without destroying anything.

## Two failure messages that mean the opposite {#deux-messages-opposes}

When reading probe failures in the events, this distinction is the fastest diagnosis:

- "connection refused": nothing is listening. The process is starting, or it is dead.
- "deadline exceeded" or "timeout": something is listening and did not answer in time.
  That is saturation, and the process is probably fine.

## A single bit of output {#un-seul-bit-de-sortie}

A day comes when one needs to express "the service works, except that file upload is
broken because the file storage is down". This nuance has no place in a probe, because a
probe has a single bit of output and the kubelet acts on it without nuance. Fine-grained
health goes into metrics and traces: error rates per route, and traces that show which
dependency failed.

An application can therefore be alive, ready, and slow. A p99 of eight seconds next to a
healthcheck that answers success is consistent. If that is surprising, the probe was not
measuring what one assumed.
