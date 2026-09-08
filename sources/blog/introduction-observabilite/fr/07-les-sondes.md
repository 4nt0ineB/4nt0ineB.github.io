# Les sondes sont des commandes

```
page      : sondes
fichier   : blog/introduction-observabilite/fr/07-sondes.html
surtitre  : Chapitre 7
```

Un healthcheck est un endpoint HTTP qu'un service expose pour dire s'il va bien, et
qu'un autre programme appelle à intervalle régulier. Docker, un load balancer ou un
orchestrateur en ont tous un. Sur Kubernetes, c'est l'agent qui tourne sur chaque
machine (kubelet) qui pose la question, et on parle de sonde.

Une sonde ressemble à de la supervision mais c'est une commande, puisque le kubelet agit
sur la réponse, tout de suite et sans demander. Et si le service tourne sur Kubernetes,
des sondes existent, qu'elles aient été configurées ou non.

## Deux sondes, et ce que déclenche chaque échec {#deux-sondes}

:::tableau legende="Les deux sondes, la question qu'elles posent, ce que fait un échec."

| sonde | la question posée | en cas d'échec |
|---|---|---|
| <jargon mot="liveness">liveness</jargon> | un redémarrage peut-il réparer ce processus ? | le kubelet **tue** le conteneur |
| <jargon mot="readiness">readiness</jargon> | ce pod peut-il prendre du trafic maintenant ? | il est **retiré** du Service, et continue de tourner |

:::

Le Service est l'adresse stable derrière laquelle les pods se relaient, et une requête
qui lui arrive est envoyée à l'un des pods prêts. Un pod retiré du Service continue de
tourner, il ne reçoit juste plus rien.

:::regle
Un échec de liveness détruit, un échec de readiness redirige seulement.
:::

## Jamais de dépendance dans une liveness {#jamais-de-dependance}

Une liveness répond à une seule question : ce processus est-il définitivement bloqué,
par un deadlock ou une boucle d'événements qui ne tournera plus ?

Elle ne doit donc vérifier ni la base, ni un autre service, ni le réseau, car la
réaction en chaîne est mécanique. Si la base tombe et que la liveness vérifie la base,
tous les pods échouent leur sonde au même moment, donc le kubelet les tue tous, en
boucle. La panne de base devient une panne de base plus une perte totale du service.

:::schema schema-reaction-chaine
titre: État final : readiness en échec, les quatre instances hors service mais toujours en cours d'exécution, base rétablie
titre: État final : liveness en échec, les quatre instances tuées et redémarrées en boucle, base rétablie mais le backoff continue
titre: Quatre instances et une base de données, pendant et après une coupure
voir: Quatre instances et une base. Un interrupteur « la liveness interroge la base », un bouton pour couper la base. Le compteur de redemarrages reste a zero dans le bon scenario et grimpe dans le mauvais.
:::

Le test à appliquer : si le remède n'est pas « tuer ce processus et en démarrer un
nouveau », cette vérification n'a rien à faire dans une liveness. Les vérifications de
dépendance vont dans la readiness, dont le verdict retire un pod du Service sans rien
détruire.

Dans le doute, on peut tout à fait ne pas déclarer de liveness du tout. Le kubelet ne
tuera alors jamais le processus, et c'est un défaut bien plus sûr qu'une sonde mal
écrite.

## Une sonde qui ne touche à rien {#une-sonde-qui-ne-touche-a-rien}

Admettons un service sous forte charge : vingt requêtes par seconde, chacune prenant
trois secondes, contre un pool de vingt threads. Sa liveness est aussi simple que
possible, elle ne vérifie rien et renvoie une réponse fixe tout de suite.

:::devine
question: Sous cette charge, que fait la liveness ?
options: ['Elle répond, puisqu\'elle ne fait rien', 'Elle échoue, faute de thread pour répondre', 'Elle ralentit mais tient dans le délai']
bonne: 1

reponse: Elle échoue. Un endpoint qui ne fait rien a quand même besoin d'un thread pour répondre, et les vingt sont occupés.

:::

Le délai de réponse toléré vaut une seconde par défaut, et trois échecs de suite
suffisent pour tuer. Avec ces deux défauts laissés tels quels, la sonde a échoué
<mesure valeur="2 fois sur 3" source="labo, 2026-08-26">sous cette charge, à un cycle du crash loop, avec une application saine</mesure>.
Une sonde qui ne touche à rien n'est pas une sonde qui n'a besoin de rien.

:::regle
Une liveness ne doit pas pouvoir échouer à cause de la charge.
:::

Quand elle y est sensible, une surcharge passagère devient un <jargon mot="crash loop">crash loop</jargon>, et le crash
loop détruit la capacité qui aurait absorbé la surcharge. Le remède n'est pas d'ajouter
de la capacité mais d'écrire les deux valeurs, plus larges que leurs défauts. C'est la
readiness qui a le droit de réagir à la charge, parce qu'elle retire du trafic sans rien
détruire.

## Deux messages d'échec qui veulent dire le contraire {#deux-messages-opposes}

En lisant des échecs de sonde dans les events, cette distinction est le diagnostic le
plus rapide :

- « connection refused » : rien n'écoute. Le processus démarre, ou il est mort.
- « deadline exceeded » ou « timeout » : quelque chose écoute et n'a pas répondu à temps.
  C'est de la saturation, et le processus va probablement bien.

## Un seul bit de sortie {#un-seul-bit-de-sortie}

Vient un jour où il faut exprimer « le service marche, sauf que l'upload de fichier est
cassé parce que le stockage de fichiers est en panne ». Cette nuance n'a pas sa place
dans une sonde, car une sonde a un seul bit de sortie et le kubelet agit dessus sans
nuance. La santé fine va dans les métriques et les traces : des taux d'erreur par route,
et des traces qui montrent quelle dépendance a échoué.

Une application peut donc être vivante, prête, et lente. Un p99 de huit secondes à côté
d'un healthcheck qui répond succès est cohérent. Si ça surprend, la sonde ne mesurait
pas ce qu'on supposait.
