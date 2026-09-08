# Introduction à l'observabilité

```
page      : accueil
fichier   : chapitres/00-accueil.html
surtitre  : Introduction
```

Le code tourne en prod et un matin, quelqu'un dit que l'application est lente. Il n'y a
ni débogueur, ni moyen de reproduire le contexte du problème. Si l'observabilité a été
mise en place, un développeur a de quoi tenter de comprendre. Sinon, bon courage.

Ce texte s'adresse à qui sait ce qu'est une ligne de log et a peut-être vu un dashboard
Grafana sur l'écran d'un collègue, sans jamais avoir construit ni fait tourner ce qui
produit ces graphes. Aucune connaissance de Prometheus, de Kubernetes ou de la notion de
trace n'est supposée, et les mots de jargon sont expliqués à leur première apparition.

Il vient d'un bilan d'auto-apprentissage aidé par l'IA : neuf pannes provoquées sous
charge réelle, sur un vrai serveur, diagnostiquées depuis les dashboards seuls. Tout ce
qui est chiffré ici a été mesuré là.

L'objectif est une image mentale correcte, pas la capacité de diagnostiquer une panne.
Cette capacité-là ne s'obtient qu'en cassant quelque chose et en regardant ce que
racontent les instruments, donc elle est dans le cours qui accompagne ce texte, où
chaque panne se rejoue sur un cluster jetable posé sur son propre portable.
