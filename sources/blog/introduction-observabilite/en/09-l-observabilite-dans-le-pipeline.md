# Observability in the pipeline

```
page      : livrer
fichier   : blog/introduction-observabilite/en/09-livrer.html
surtitre  : Chapter 9
```

Dashboards and alerts are software. They have versions and bugs, they break when
something else changes, and if they only exist as clicks made in an interface eighteen
months ago, they will end up lost. It is therefore strongly suggested to keep them in
the code repository. Grafana can load them from files.

Let us assume a pipeline that builds an image on every commit, then deploys it to the
cluster. The deployment job has just finished green.

:::devine
question: What do we know about the service?
options: ['The new version is serving traffic', 'The new version is starting', 'The desired state was written, nothing more']
bonne: 2

reponse: A deployment job reports a single fact, the command returned without error. If the referenced image does not exist, the run is green, the deployment is recorded as successful, and every new pod is stuck at start-up while the old ones keep serving.

:::

:::regle
A green pipeline is not a healthy service.
:::

A deployment is not finished when the command returns but when the new version serves
traffic. The pipeline should therefore wait for the new pods to be ready, and the minutes
that follow a deployment deserve more attention than the rest of the time. That is where
[chapter 2](#/en/blog/introduction-observabilite/trois-piliers#le-checkout-lent) closed
in three clicks: the decisive sentence was "the cache has been empty since the 14:02
deployment", and it was only possible because the deployment was visible on the graph. An
annotation on the dashboards at every deployment, which Grafana does natively, is the
best value for effort in the whole pipeline. Without it, the first question of every
incident is "did we ship something recently?", and someone goes to check by hand.
