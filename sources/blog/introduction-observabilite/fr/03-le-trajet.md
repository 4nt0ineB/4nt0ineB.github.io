# Le trajet d'une donnée

```
page      : le-trajet
fichier   : blog/introduction-observabilite/fr/03-le-trajet.html
surtitre  : Chapitre 3
```

## Stockages et tuyaux {#deux-boites}

La plupart des confusions sur l'outillage disparaissent une fois chaque produit rangé
dans l'une de deux boîtes : ceux qui gardent la donnée, et ceux qui la déplacent. On
discute beaucoup d'outils qui ne se concurrencent pas, parce qu'ils ne sont pas dans la
même boîte.

:::tableau legende="La carte de la pile : chaque outil, sa boîte, et s'il garde la donnée."

| outil | boîte | garde la donnée ? |
|---|---|---|
| Prometheus | stockage, pour les métriques | oui, et il fait aussi tourner les requêtes et les alertes |
| Loki | stockage, pour les logs | oui |
| Tempo | stockage, pour les traces | oui |
| OpenTelemetry Collector | tuyau | non |
| Grafana Alloy | tuyau | non |
| Grafana | affichage | non |

:::

Cette pile a été choisie parce qu'elle est rodée, libre, et tient sur une machine de 8 Go, et que Grafana sait lire les trois stockages. D'autres choix existent et la page suivante en cite un.

Cette carte répond à « qu'est-ce que ce composant ». Elle ne répond pas à « comment la
donnée arrive sur mon écran », qui est une question de mouvement.

## De l'application à l'écran {#de-l-application-a-l-ecran}

Une application instrumentée émet ses trois piliers par trois chemins différents.

- Ses métriques ne partent nulle part. Elle les expose sur un endpoint HTTP, `/metrics`,
  et Prometheus vient les lire.
- Ses traces partent en OTLP vers le collecteur OpenTelemetry, qui les route vers Tempo.
- Ses logs vont sur sa sortie standard, où un agent qui tourne sur la machine, Alloy, les
  lit, les étiquette et les pousse vers Loki. L'application ne fait rien pour ça, ce qui
  est la force d'un agent, puisqu'il collecte sans aucune coopération du code.

Grafana lit les trois stockages et les met sur le même écran. En parallèle, Prometheus
évalue ses règles d'alerte, et une alerte déclenchée peut joindre un humain.

:::schema schema-trajet
titre: Le trajet d'une donnée, de l'application jusqu'à l'écran et jusqu'au téléphone
voir: Un schema en trois colonnes, application, stockages, surfaces. Une seule requete emet trois donnees qui suivent chacune son chemin, chaque chemin s'allumant a son tour : /metrics tire par Prometheus, OTLP pousse vers le collecteur puis Tempo, sortie standard lue par Alloy puis Loki. Les trois convergent vers Grafana.
:::

## Pull contre push {#pull-contre-push}

Deux de ces trois chemins vont dans un sens et le troisième dans l'autre, et cette
asymétrie n'est pas arbitraire.

Prometheus fait du <jargon mot="pull">pull</jargon>. L'application n'envoie ses métriques
nulle part, elle affiche ses compteurs actuels en texte sur `/metrics`, et Prometheus se
connecte à cet endpoint toutes les quinze ou trente secondes pour noter ce qu'il voit.
Cette opération s'appelle un <jargon mot="scrape">scrape</jargon>.

Les logs et les traces, eux, se <jargon mot="push">push</jargon>. Un événement arrive
quand il arrive, donc il faut bien que quelque chose l'envoie au moment où il se produit.
Un état, au contraire, se mesure sur commande. On ne peut pas demander à un processus ce
qu'il a loggé dans les trente dernières secondes, mais on peut toujours lui demander
combien de mémoire il utilise maintenant.

:::schema schema-pull-push
titre: Prometheus tire ses métriques, l'agent pousse ses logs
voir: Deux colonnes animees en boucle. A gauche Prometheus qui va chercher ses metriques, a droite l'agent qui pousse ses logs vers Loki.
:::

Le pull a une conséquence qui revient au [chapitre 6](#/fr/blog/introduction-observabilite/lire-un-graphe#la-fenetre) : une
métrique n'a pas de valeur continue, elle a la valeur qu'elle avait aux instants où on
est venu la lire. Un événement qui commence et se termine entre deux scrapes n'a jamais
existé pour Prometheus.

## À quoi sert le collecteur {#ce-que-le-tuyau-achete}

Le collecteur ne garde rien, donc on peut se demander à quoi il sert. Il sert à ce que
l'application ne connaisse qu'une seule destination. Remplacer Tempo par autre chose
devient un changement dans la configuration du collecteur, et non un redéploiement de
quarante services.

Un nom qui trompe, sur ce point : le collecteur a un exporter appelé `prometheus`, et il
n'envoie rien à Prometheus. Il l'imite, en traduisant les métriques dans son format texte
et en les exposant sur un `/metrics` que Prometheus vient scraper comme n'importe quelle
autre cible. Le modèle pull reste intact même là.
