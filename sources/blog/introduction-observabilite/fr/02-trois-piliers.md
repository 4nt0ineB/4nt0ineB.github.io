# Trois piliers, et pourquoi exactement trois

```
page      : trois-piliers
fichier   : blog/introduction-observabilite/fr/02-trois-piliers.html
surtitre  : Chapitre 2
```

## Détecter, localiser, expliquer {#detecter-localiser-expliquer}

Les trois piliers de l'observabilité sont la métrique, la <jargon mot="trace">trace</jargon>
et le log. Ce ne sont pas trois façons concurrentes de faire le même travail mais trois
étages d'une même enquête. Chacun répond à l'une des trois questions du chapitre
précédent.

:::tableau legende="Les trois piliers, la question qu'ils répondent, leur rôle dans l'enquête."

| pilier | la question qu'il répond | son rôle |
|---|---|---|
| métrique | Y a-t-il un problème, et depuis quand ? | détecter, donner l'alerte |
| trace | Où, dans le système ? | localiser |
| log | Pourquoi, exactement ? | expliquer |

:::

Une seule requête HTTP produit les trois à la fois. Ce sont trois projections du même
événement mais chacune à un niveau de détail différent :

- un point dans un histogramme (la métrique), où l'identité de la requête est jetée ;
- un arbre d'opérations (la trace), qui garde l'identité et la causalité ;
- deux ou trois lignes de texte (le log), qui gardent l'identité mais pas la structure.

## Le checkout lent {#le-checkout-lent}

Admettons une API REST sur un serveur quelconque, et un dashboard d'observabilité déjà en
place. On désigne p95 de latence le seuil sous lequel aboutissent 95 % des requêtes, les
5 % restantes étant plus lentes.

### Étage un, la métrique

Une alerte se déclenche : le p95 de `/checkout` passe de 200
millisecondes à 3 secondes. Le dashboard montre que le problème a commencé à 14h02, qu'il
ne touche que cette route, et que le taux d'erreur reste plat. Le service est lent mais
pas cassé. On sait quand et quoi, et aucun détail supplémentaire sur la métrique ne dira
jamais pourquoi.

### Étage deux, la trace

Un clic sur le pic ouvre la trace d'une vraie requête lente. Cette trace est un arbre
d'opérations, chacune avec un début, une durée, un parent et des attributs (un span,
dans OpenTelemetry). L'arbre montre 3,1 secondes au total, dont 2,9 tenues par cent
opérations jumelles, toutes `SELECT * FROM items WHERE order_id = ?`. On sait maintenant
où : le chargement des articles fait cent requêtes au lieu d'une.

### Étage trois, le log

Un clic sur l'une de ces opérations ouvre l'outil de logs, déjà filtré sur
l'identifiant de cette requête. Une seule ligne répond à tout : `cache miss for order
items, falling back to per-item fetch`. Le cache est vide depuis le déploiement de 14h02.

:::schema schema-trois-etages
titre: La latence de /checkout passe de 200 millisecondes à 3 secondes à 14h02
titre: Une trace de 3,1 secondes, dont 2,9 secondes en cent requêtes SQL jumelles
titre: Un log filtré sur l'identifiant de trace
voir: L'enquete du checkout lent en trois clics. Etage 1 le graphe de latence avec le point cliquable sur le pic, etage 2 la trace en cascade et ses cent requetes jumelles, etage 3 la ligne de log filtree sur l'identifiant de trace.
:::

Trois outils, trois clics, une minute et demie. La même enquête menée aux logs seuls
prend une après-midi et finit en général par une supposition.

## La cardinalité {#la-cardinalite}

Pourquoi pas un seul outil qui fait tout ça ?

La <jargon mot="cardinalité">cardinalité</jargon> est le nombre de combinaisons
distinctes que peuvent prendre les étiquettes d'une donnée. Le mot a l'air abstrait, et
c'est lui qui décide de la conception de chaque outil.

Une métrique est agrégée à l'avance. Quand une requête échoue, un compteur passe de 3 à
4, et c'est tout. L'utilisateur, l'URL, la pile d'appels, l'identifiant de la requête :
tout est jeté, exprès, au moment de l'écriture. En échange, ce compteur est permanent et
presque gratuit, l'interroger sur six semaines y compris, puisque la réponse a été
calculée quand la donnée est arrivée.

Reste à rendre cette métrique capable d'expliquer. Si on étiquetait le compteur avec
l'identifiant de l'utilisateur, on n'aurait plus une seule métrique mais autant de
métriques que le système a d'utilisateurs. Ajouter l'URL avec ses paramètres
multiplierait encore. Prometheus garde ses index en mémoire, donc il ne se dégrade pas
en douceur et tomberait sous son propre poids.

:::schema schema-cardinalite
titre: Nombre de séries stockées par la métrique, en échelle logarithmique
voir: Des cases a cocher, une par etiquette de metrique (statut 5 valeurs, route 20, methode 6, identifiant client 40 000, URL sans limite). Une barre en echelle logarithmique et un compteur suivent le nombre de series stockees, et basculent en alerte au-dela du seuil.
:::

:::devine
question: On ajoute une étiquette d'identifiant client à une métrique. Que se passe-t-il ?
options: ['Les requêtes ralentissent un peu', 'Le stockage grossit proportionnellement', 'La base tombe']
bonne: 2

reponse: Chaque valeur d'étiquette crée une série de plus, gardée en mémoire. Quarante mille clients font quarante mille séries pour ce seul compteur, et l'index n'est pas conçu pour se dégrader progressivement.

:::

Une métrique ne peut donc jamais donner le détail par requête. La propriété qui
la rend bon marché est justement celle qui jette le détail.

Une trace fait l'inverse et garde chaque instance avec sa causalité complète, donc elle
coûte bien plus cher. C'est pourquoi les systèmes en production n'en gardent qu'une sur
dix ou une sur cent, et c'est pourquoi on ne peut pas alerter dessus : une alarme
construite sur un échantillon rate les événements qui n'ont pas été échantillonnés.

Aucun futur outil ne fusionnera les trois, car une métrique assez détaillée pour
expliquer détruit sa propre base, et une trace assez complète pour alerter coûte le prix
de tout le trafic.

## Tout n'est pas une requête {#tout-n-est-pas-une-requete}

La mémoire utilisée, la charge processeur, la profondeur d'une file : c'est de l'état de
la machine et non des événements. Cet état n'a pas de trace, puisqu'aucune requête ne l'a
causé, et souvent pas de log, puisque personne n'écrit une ligne « mémoire : 512 Mo »
toutes les trente secondes. L'enquête reste alors dans les métriques, recoupées avec les
events que Kubernetes enregistre lui-même.

## Un identifiant, propagé partout {#la-colle}

Les trois piliers ne valent que si on peut passer de l'un à l'autre, et un seul mécanisme
le rend possible : un identifiant de trace, généré à l'entrée du système et transporté à
travers tout. Il doit apparaître à trois endroits :

- dans la trace, où il naît ;
- dans chaque ligne de log écrite en traitant cette requête ;
- attaché aux points de mesure, ce qui rend le pic cliquable (voir les exemplars au
  [chapitre 5](#/fr/blog/introduction-observabilite/instrumenter#les-exemplars)).

C'est le travail d'instrumentation qui compte le plus, et celui qu'on saute le plus
souvent. Sans lui, il n'y a pas de socle d'observabilité, il y a trois outils séparés et
l'habitude de comparer des horodatages à la main.
