# Checklist pratique

```
page      : checklist
fichier   : blog/introduction-observabilite/11-checklist.html
surtitre  : Chapitre 11
```

Chaque ligne vient de quelque chose qui a d'abord mal tourné, quelque part dans ce
texte.

## En instrumentant le service {#en-instrumentant-le-service}

- Émettre un identifiant de trace sur chaque requête, et le mettre dans
  [chaque ligne de log](#/blog/introduction-observabilite/trois-piliers#la-colle). Rien d'autre dans cette liste ne
  compte autant.
- Formater chaque horodatage avec son décalage, et fixer
  [un seul fuseau partout](#/blog/introduction-observabilite/lire-un-graphe#une-seule-horloge), y compris le défaut des
  vues ad hoc.
- Ajouter des [exemplars](#/blog/introduction-observabilite/instrumenter#les-exemplars), pour qu'un point sur un graphe
  puisse ouvrir une requête réelle.
- Ajouter les deux ou trois [compteurs métier](#/blog/introduction-observabilite/instrumenter#les-metriques-metier) qui
  disent à quoi sert le service. Ce sont eux qui rendent un incident lisible à quelqu'un
  d'autre que son auteur.

## En écrivant les sondes {#en-ecrivant-les-sondes}

- Ne jamais mettre une vérification de dépendance dans une
  [liveness](#/blog/introduction-observabilite/sondes#jamais-de-dependance). Elle va dans la readiness.
- Écrire le délai et le nombre d'échecs de chaque sonde, sans se fier aux défauts, et
  donner à la liveness [un délai généreux](#/blog/introduction-observabilite/sondes#une-sonde-qui-ne-touche-a-rien).
  Elle existe pour attraper un processus définitivement bloqué, et elle ne doit jamais
  pouvoir échouer parce qu'il est occupé.

## En construisant les dashboards {#en-construisant-les-dashboards}

- Alerter et diagnostiquer sur le [taux](#/blog/introduction-observabilite/lire-un-graphe#plat-n-est-pas-absent), jamais
  sur un compteur brut comparé à un seuil.
- Chercher [la mesure qui porte l'instant de l'événement](#/blog/introduction-observabilite/lire-un-graphe#l-heure-du-scrape)
  quand l'heure exacte compte, plutôt que la position d'un échantillon.
- Déclencher [chaque panneau une fois](#/blog/introduction-observabilite/dashboard-vert), exprès, et confirmer qu'il
  bouge. Un panneau qu'on n'a jamais vu réagir est une décoration.

## En montant l'alerting {#en-montant-l-alerting}

- Mettre en place des [alertes et leurs notifications](#/blog/introduction-observabilite/alerting), téléphone ou mail,
  pour les pannes critiques.
- Corriger à la source toute alerte qui reste active en permanence, dès le premier jour.
  Le silence doit être l'état normal.

## En déployant {#en-deployant}

- Garder dashboards et règles d'alerte [dans le dépôt](#/blog/introduction-observabilite/livrer), et ne jamais coller un
  panneau depuis l'interface web.
- Poser une annotation de déploiement sur les dashboards.
- Retenir qu'un run vert rapporte que l'état désiré a été écrit, et rien du tout sur sa
  santé.

:::regle
Poser au système qui tourne une question dont la réponse serait différente en cas d'erreur. Pas « est-ce que ma commande a réussi », mais « le monde est-il maintenant différent de la façon dont je le voulais ».
:::
