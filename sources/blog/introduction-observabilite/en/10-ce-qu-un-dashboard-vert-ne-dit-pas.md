# What a green dashboard does not say

```
page      : dashboard-vert
fichier   : blog/introduction-observabilite/en/10-dashboard-vert.html
surtitre  : Chapter 10
```

A flat counter and an absent series look alike. An aggregate at 65 % hides a pool at
97 %. An alert that was evaluated, routed and displayed notified nobody. A green run
covers pods that do not start. Every page of this text met the same thing in a different
form: an instrument that shows nothing is indistinguishable from a healthy system.

Let us assume a five-minute load test on a service, with a dashboard in front of us.
Client-side result: zero failed requests, stable latency, throughput served equal to
throughput requested.

:::devine
question: Is the service healthy?
options: ['Yes, the three figures say so', 'No, it is overloaded', 'We do not know']
bonne: 2

reponse: We do not know. Zero failures says nothing was refused, not that nothing broke. The pods may have left the Service one by one while the client saw one hundred percent success, the liveness probe may be one cycle away from killing the container, and a memory limit may be crossed so fast that no request has time to fail.

:::

:::regle
A green dashboard is a hypothesis, not a result.
:::

Over the nine failures provoked for this text, this perfect client-side result appeared
<mesure valeur="3 times out of 9">with, each time, a system in danger</mesure>.

Nothing in an instrument distinguishes a signal that shows nothing because nothing is
broken from a signal that shows nothing because it is looking in the wrong place. The
only way to settle it is to make something fail on purpose, at a chosen moment, while
watching. Trigger every panel once and confirm that it moves, because a panel one has
never seen react is decoration. Send an alert and wait for the phone. Kill a pod under
load and read what the restart counter shows, that is, zero, since the killed pod no
longer exists.

This is what the course that goes with this text makes you do. Each module sets a scene
on a disposable cluster, sends load, asks for a written prediction before the first
dashboard is opened, then breaks something. The written bet is what separates reading a
conclusion from learning it: "the zero-failure column is the worst" teaches something to
whoever bet on it, and nothing to whoever reads it in a table.
