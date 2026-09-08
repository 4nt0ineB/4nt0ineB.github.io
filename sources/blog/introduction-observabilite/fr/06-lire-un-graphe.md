# Lire un graphe sans se tromper

```
page      : lire-un-graphe
fichier   : blog/introduction-observabilite/fr/06-lire-un-graphe.html
surtitre  : Chapitre 6
```

Un graphe a l'air d'une fenêtre sur le système. C'en est une reconstruction, faite de
points collectés à intervalle régulier puis passés dans une requête.

## Le bord droit du graphe {#le-bord-droit}

On pourrait être tenté de lire tout mouvement à la droite de la courbe comme « il se
passe quelque chose maintenant ». Mais le bord droit est simplement l'endroit où la
donnée s'arrête, c'est-à-dire maintenant, et chaque graphe finit toujours là, qu'il se
passe quelque chose ou non.

Un dashboard qui se rafraîchit tout seul recrée cette impression toutes les quelques
secondes. Une ligne qui remonte légèrement au bord droit n'annonce rien, car c'est le
dernier échantillon, bruité comme les autres, qui n'a pas encore de voisin pour le
lisser. Attendons le rafraîchissement suivant avant de réveiller quelqu'un.

## Une ligne plate a deux causes {#plat-n-est-pas-absent}

Admettons un <jargon mot="counter">compteur</jargon> de requêtes. Il ne fait
qu'augmenter, et il répond à « combien depuis le démarrage de ce processus ».

Un jour, sa ligne devient plate.

:::devine
question: Le compteur de requêtes ne bouge plus depuis dix minutes. Que se passe-t-il ?
options: ['Le scrape est cassé', 'Plus aucune requête n\'arrive', 'Le compteur a atteint son maximum']
bonne: 1

reponse: Plus aucune requête n'arrive, et c'est l'incident. La collecte, elle, tourne toutes les quinze secondes et relit la même valeur. Un scrape cassé ne donne pas une ligne plate, il fait disparaître la série.

:::

Les deux situations réclament des réponses opposées, car un compteur plat veut dire que
la chose comptée a cessé de se produire, alors qu'une série absente veut dire que la
collecte elle-même est cassée.

Un compteur brut se lit donc rarement tel quel. On le convertit en taux, c'est-à-dire en « combien par seconde, maintenant », en divisant ce qu'il a gagné par le temps écoulé. On alerte sur ce taux et on diagnostique sur ce taux. Le compteur brut ne sert qu'à lire un total exact.

C'est aussi pourquoi une alerte qui compare un compteur brut à un seuil fixe est une
erreur de conception et non un réglage à corriger. Le compteur ne fait que grossir, donc
un seuil qui a un sens la première heure n'en a plus aucun la troisième semaine. Un taux,
lui, reste comparable d'un jour à l'autre.

## La fenêtre d'une requête {#la-fenetre}

Un taux se calcule sur une fenêtre de temps, choisie à chaque requête : la variation du compteur sur la fenêtre, divisée par sa durée. Cette fenêtre porte deux pièges, qui tirent en sens opposé.

Une fenêtre trop large étale un événement court. Un incident de six secondes, moyenné
sur une minute, dessine une bosse d'une minute de large, et rien n'est cassé dans le
graphe.

:::schema schema-fenetre-rate
titre: Un incident réel de 6 secondes, et ce qu'une moyenne glissante en montre selon la largeur de la fenêtre choisie
voir: Un incident reel de 6 secondes, et un curseur de fenetre de requete. La courbe de verite ne bouge jamais, la courbe affichee s'elargit et s'aplatit a mesure que la fenetre grandit.
:::

Une fenêtre trop étroite cache un événement. Une requête qui demande l'augmentation
sur les quinze dernières minutes rend zéro pour tout ce qui s'est passé avant, même si
le compteur brut, lui, porte encore la trace.

Pour un post-mortem, il vaut donc mieux lire d'abord le compteur brut, et ne passer à une fenêtre qu'une fois l'incident situé sur la ligne du temps. Et quand la durée
réelle d'un événement compte, il faut une source qui porte des horodatages exacts, comme
les events Kubernetes, car aucune moyenne glissante ne peut résoudre quelques secondes.

## L'heure du scrape {#l-heure-du-scrape}

La position d'un point sur la ligne du temps est le moment où il a été collecté, pas le
moment où l'événement a eu lieu. Admettons un conteneur tué à 11:21:31, d'après l'horodatage de sa fin, avec une collecte toutes les deux minutes. Le panneau l'affiche à 11:23, parce que la collecte suivante a eu lieu à ce moment-là. Deux minutes d'erreur suffisent
à accuser le mauvais déploiement. Quand l'instant exact compte, il faut chercher une métrique qui porte l'horodatage de
l'événement comme valeur, pas la position de l'échantillon.

## Une seule horloge {#une-seule-horloge}

Rien ne dérive dans le stockage, car les bases de métriques, de logs et de traces
stockent toutes un instant sous forme de nombre, sans fuseau attaché. Le risque est à
l'affichage, et dans le texte des lignes de log.

À l'affichage, chaque outil a son propre réglage de fuseau, et Grafana en a deux : un
pour les dashboards, un pour les vues ad hoc.
Sans décision, une même panne se lit à 12:50 sur un écran et à 14:50 sur l'autre.
Décider de l'UTC et l'appliquer partout.

Dans les lignes de log, le piège est le format :

```
2026-08-20 12:16:24,793 INFO ...      ambigu pour toujours
2026-08-20T13:07:43.370Z INFO ...     le décalage est porté dans la ligne
```

Rendu sans décalage, le même instant dans deux fuseaux produit deux lignes
indiscernables, à deux heures d'écart, et rien dans la ligne ne dit laquelle est
laquelle. Toujours formater les horodatages avec le décalage inclus.

:::regle
Un graphe montre la forme que la requête lui a donnée, pas la forme de l'incident.
:::
