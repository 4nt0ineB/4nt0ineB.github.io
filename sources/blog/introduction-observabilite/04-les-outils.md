# Les outils, un par un

```
page      : les-outils
fichier   : blog/introduction-observabilite/04-les-outils.html
surtitre  : Chapitre 4
```

## Prometheus {#prometheus}

Prometheus est une base de données pour des nombres dans le temps. Il porte aussi son
langage de requête, PromQL, et le moteur qui évalue les règles d'alerte. Presque toute
pile de métriques qu'on croisera est soit Prometheus, soit un outil qui parle son
langage.

Il garde ses index en mémoire, ce qui explique sa vitesse et sa fragilité. Une étiquette
à trop de valeurs distinctes ne le ralentit pas progressivement, elle le fait tomber
(voir la [cardinalité](#/blog/introduction-observabilite/trois-piliers#la-cardinalite)).

## Loki {#loki}

Loki est le Prometheus des logs : la même place dans l'architecture et la même forme,
mais pour du texte horodaté plutôt que des nombres. Il ne collecte rien lui-même, car
c'est l'agent de la machine qui lit la sortie des processus, l'étiquette et la pousse.

Loki n'indexe jamais le contenu de la ligne de log. Il indexe un ensemble d'étiquettes
définies à l'avance, par fenêtre de temps. Une recherche sur ces étiquettes est bon
marché. Une fois le type de log et la période ciblés, il ne reste qu'une recherche de
texte, comme un grep. Ce choix le rend bien moins cher
qu'un moteur de recherche plein texte, et moins bon pour retrouver un identifiant précis
dans tout ce qui a jamais été loggé.

D'où l'erreur Loki la plus courante, et une question d'entretien classique. Les
étiquettes créent des flux physiquement séparés, donc la contrainte de cardinalité
s'applique ici telle quelle. Le niveau de sévérité passe bien, il y en a cinq (info,
debug, warn, error, trace). Une étiquette pour l'identifiant utilisateur ou l'identifiant
de trace détruit le système, et ceux-là vont dans le contenu de la ligne, où un filtre
texte les retrouve.

## Tempo {#tempo}

Tempo est le stockage pour les traces, et il suit la philosophie de Loki, un index
minimal. Il indexe l'identifiant de trace, jamais le détail de chaque
<jargon mot="span">span</jargon>, et met le reste dans un stockage en masse bon marché.

C'est un pari délibéré sur la façon dont les traces servent, car le chemin principal est
« j'ai déjà un identifiant de trace, venu d'une ligne de log ou d'un exemplar, montre-moi
l'arbre ». Chercher des traces par attribut arbitraire à fort volume demande une autre
conception, plus chère à faire tourner (la stack Elasticsearch, Logstash, Kibana, dite
ELK).

Une trace qui vient d'être envoyée n'est pas immédiatement cherchable, puisqu'elle passe
par un tampon d'ingestion et devient interrogeable une minute ou deux plus tard. Ne pas
conclure « il n'y a pas de traces » vingt secondes après avoir déclenché une requête.

## OpenTelemetry {#opentelemetry}

OpenTelemetry, souvent écrit OTel, est un standard en deux moitiés.

La première est une bibliothèque qu'on ajoute à l'application. Elle produit les métriques,
les traces et les logs dans un format neutre, donc le code n'est pas écrit contre
Prometheus ou contre Tempo mais contre le standard.

La seconde est le collecteur, dont le [chapitre précédent](#/blog/introduction-observabilite/le-trajet#ce-que-le-tuyau-achete)
donne le rôle. Sa configuration a trois étages :

- les receivers acceptent la télémétrie ;
- les processors la transforment (regroupement par lots, limites de mémoire, métadonnées
  d'origine) ;
- les exporters l'envoient plus loin.

Les processors ne sont pas des scripts qu'on écrit. Ce sont des composants déjà compilés
dans le programme, et la configuration ne fait que les choisir, les régler et fixer leur
ordre.

## Grafana {#grafana}

Grafana est la couche d'affichage et ne stocke rien. Il se connecte à Prometheus, Loki et
Tempo en même temps, ce qui rend possible
l'[enquête en trois clics](#/blog/introduction-observabilite/trois-piliers#le-checkout-lent).

Autour de lui, la plupart des composants embarquent leur propre petite interface web.

:::regle
Une interface qu'il faut penser à ouvrir n'est pas de la supervision.
:::

Il faut que l'état de santé d'un composant devienne une métrique, puis un panneau, puis
une alerte. Sinon il faut aller regarder l'interface d'un autre outil, et on n'ira la
voir que si on soupçonne déjà un problème. Une information qu'on ne voit pas dans
Grafana n'apprend rien tant qu'on ne va pas la chercher.

Une exception : l'interface de Prometheus a une page qui liste chaque application qu'il
vient lire, et dit si cette lecture échoue et pourquoi. Quand une métrique attendue
n'apparaît pas dans Grafana, c'est en général là que se trouve la réponse, parce que le
problème est en amont de tout dashboard.

:::aller-plus-loin titre="Elasticsearch, et les trois cas où le plein texte gagne"

Elasticsearch, en général utilisé dans une stack ELK (Elasticsearch, Logstash, Kibana),
indexe le texte intégral de chaque ligne. Cet index donne une recherche ad hoc large, sur n'importe quel mot, mais il
coûte cher à l'échelle, parce qu'il dépasse souvent la taille de la donnée elle-même.

Si les services qu'on écrit soi-même sont bien instrumentés, on n'en aura pas besoin pour
eux. Trois cas restent où il gagne.

1. Un identifiant métier qui arrive tard, par le support client, des semaines après les
   faits. Ce n'est pas un identifiant de trace, car les traces se gardent quelques jours
   et sont échantillonnées, alors que les logs se gardent des semaines. Une recherche à
   froid à travers tous les services, des semaines en arrière, c'est ce pour quoi
   l'indexation plein texte existe.
2. Sécurité et audit. « Toutes les actions de cet utilisateur sur tous les systèmes
   pendant six mois » est une recherche plein texte à froid sur une longue période, et
   aucune quantité de traçage n'y répond.
3. Des systèmes qu'on ne contrôle pas. Une vraie entreprise contient des plateformes
   historiques, des appliances et des logiciels de fournisseurs qui émettent du texte non
   structuré, sans identifiant dedans. L'indexation plein texte est le plus petit
   dénominateur commun, puisqu'on indexe tout faute de pouvoir changer ce qui est émis.

Une bonne instrumentation rend un moteur plein texte inutile pour le code qu'on écrit
soi-même. Il reste le bon outil pour le code qu'on n'écrit pas.

:::
