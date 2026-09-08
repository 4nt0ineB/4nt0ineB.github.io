# Ce qu'on écrit soi-même

```
page      : instrumenter
fichier   : blog/introduction-observabilite/fr/05-instrumenter.html
surtitre  : Chapitre 5
```

## Ce qui existe sans rien faire {#ce-qui-existe-sans-rien-faire}

Les frameworks modernes instrumentent déjà beaucoup d'office : les requêtes HTTP
entrantes, les codes de réponse, la distribution des latences, la mémoire, le garbage
collector, l'usage du pool de connexions à la base. Tout ça existe en général dès qu'on
ajoute la dépendance de métriques (Micrometer pour Quarkus et Spring Boot).

Inutile de reconstruire ça. Le travail qui appartient au développeur est la couche que
personne d'autre ne peut deviner, à savoir ce que l'application fait pour le métier.

## Les quatre types de métriques {#les-quatre-types}

Une métrique est un objet qu'on déclare une fois et qu'on met à jour dans le code.

:::tableau legende="Les quatre types de métriques et à quoi chacun sert."

| type | comportement | sert pour |
|---|---|---|
| <jargon mot="counter">counter</jargon> | ne fait qu'augmenter | requêtes servies, commandes créées, erreurs |
| <jargon mot="gauge">gauge</jargon> | monte et descend | longueur de file, connexions actives, éléments en cache |
| <jargon mot="histogram">histogram</jargon> (ou timer) | enregistre une distribution | des durées, pour pouvoir demander le p95 |
| résumé de valeurs | une distribution de valeurs non temporelles | montant d'une commande, taille d'une charge utile |

:::

À savoir : une latence moyenne ne vaut presque rien, puisqu'elle est dominée par les
nombreuses requêtes rapides et cache les lentes. Un percentile décrit au contraire
l'expérience des utilisateurs les moins chanceux, et c'est ce qui fait l'utilité d'un
histogram.

## Les métriques métier {#les-metriques-metier}

`orders_created_total`. `cart_value_euros`. `password_resets_total`. Ce sont des
métriques légitimes, et impossibles à instrumenter automatiquement, puisqu'aucun
framework ne sait ce qu'est une commande.

Ce sont aussi elles qui rendent un incident lisible pour quelqu'un d'autre que le
développeur. « La latence monte » est un fait technique. « Les paiements sont tombés à
zéro il y a quatre minutes » est une panne, et tout le monde la comprend.

Le [chapitre 2](#/fr/blog/introduction-observabilite/trois-piliers#la-cardinalite) a donné la contrainte qui les encadre :
une étiquette doit avoir un ensemble de valeurs petit, fini et connu, comme un statut ou
un nom de route tiré d'une liste fixe. Jamais un identifiant, jamais une URL brute avec
ses paramètres, jamais rien qui vient de la saisie utilisateur.

## Une question posée à l'avance {#une-question-posee-a-l-avance}

On ne peut interroger que ce qu'on a décidé d'instrumenter avant l'incident, et c'est la
limite de l'approche. Si personne n'a pensé à compter les uploads rejetés, alors pendant
l'incident sur les uploads rejetés, ce chiffre n'existe pas et ne peut pas être récupéré
après coup.

Les logs ont la limite et la force symétriques, car ils répondent à des questions que
personne n'avait anticipées et s'agrègent mal. Cette symétrie est la raison de garder les
deux.

## Les exemplars {#les-exemplars}

Un <jargon mot="exemplar">exemplar</jargon> est un petit pointeur attaché à un point de
mesure, portant l'identifiant d'une requête précise qui a contribué à ce point. C'est ce
qui transforme « le p95 est monté » en « voici une vraie requête lente, à regarder de
près ».

C'est une quantité modeste de configuration, et le lien à plus forte valeur de toute la
pile, puisqu'il convertit une statistique en spécimen. Sans lui, passer d'un graphe à une
trace veut dire copier des horodatages dans une barre de recherche et espérer.
