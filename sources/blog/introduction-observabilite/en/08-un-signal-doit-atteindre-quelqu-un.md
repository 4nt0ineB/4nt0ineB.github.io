# An alert has to reach someone

```
page      : alerting
fichier   : blog/introduction-observabilite/en/08-alerting.html
surtitre  : Chapter 8
```

Everything above assumes someone is looking at a dashboard. At three in the morning,
nobody is looking, and that is what an alert is for.

An alert is a query on the metrics, with a duration. Prometheus evaluates it every
thirty seconds, and when it stays true for the whole duration, it fires it. What remains
is to deliver it somewhere, an e-mail, a chat channel or a notification on a phone, and
that is a separate setting, with its own destination. The duration is there so as not to
wake someone up for a single unlucky sample. "Memory above 90 % for five minutes" is an
alert, "memory above 90 %" is a nuisance.

Let us assume an observability stack installed two weeks ago with its default settings.
A pod stops being ready, the alert fires, and it shows up in Grafana's alert list.

:::devine
question: Is anyone notified?
options: ['Yes, the alert reached the end of the chain', 'No, nobody', 'Only if the interface is open']
bonne: 1

reponse: Nobody. The stack's default destination is called "null" and does nothing, so that a fresh installation does not send messages where nobody has configured anything. The alert shows up, and the chain stops there.

:::

:::regle
"We will see it" assumes a human in front of a dashboard, which is what an alert exists to remove.
:::

This default can stay for weeks without anyone noticing, and an alert rang for
<mesure valeur="40 min">on a real incident without a single message leaving the machine</mesure>.

Two habits follow. The first is to send a real alert, on purpose, and to confirm that it
reaches the device meant to receive it, not only the interface. The second is to keep
the alert list empty in normal times, because an alert that rings permanently, even a
correct one, turns the list into decoration. The third entry in a list that already has
two changes nothing to the eye, and a team that starts with a noisy list durably learns
to ignore it.
