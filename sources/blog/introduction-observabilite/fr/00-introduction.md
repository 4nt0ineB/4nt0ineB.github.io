# Introduction à l'observabilité

```
page      : accueil
fichier   : blog/introduction-observabilite/fr/00-accueil.html
surtitre  : Introduction
```

Le code tourne en prod et un matin, quelqu'un dit que l'application est lente. Il n'y a
ni débogueur, ni moyen de reproduire le contexte du problème. Si l'observabilité a été
mise en place, un développeur a de quoi tenter de comprendre. Sinon, bon courage.

Cet article s'adresse à qui sait ce qu'est une ligne de log et a peut-être vu un
dashboard Grafana sur l'écran d'un collègue, sans jamais avoir construit ni fait tourner
ce qui produit ces graphes. Aucune connaissance des outils de l'observabilité
(Prometheus, Kubernetes, etc.) ou des notions associées n'est supposée, et les mots de
jargon sont expliqués à leur première apparition.

Il vient d'un bilan d'auto-apprentissage aidé par l'IA : neuf pannes provoquées sous
charge réelle, sur un vrai serveur, diagnostiquées depuis les dashboards seuls. Tout ce
qui est chiffré ici a été constaté par un enchaînement d'exercices pratiques sur un
serveur virtuel.

L'objectif est de donner au lecteur une image mentale de l'observabilité et de ses
concepts clés. Il ne s'agit pas ici de la capacité de
diagnostiquer une panne, qu'un texte de quelques lignes ne pourrait pas enseigner.
