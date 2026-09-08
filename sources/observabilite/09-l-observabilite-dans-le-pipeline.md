# L'observabilité dans le pipeline

```
page      : livrer
fichier   : chapitres/09-livrer.html
surtitre  : Chapitre 9
```

Les dashboards et les alertes sont du logiciel. Ils ont des versions et des bugs, ils
cassent quand autre chose change, et s'ils n'existent que sous forme de clics faits dans
une interface il y a dix-huit mois, ils finiront par se perdre. Il est donc vivement suggéré de les faire vivre dans le dépôt de code. Grafana sait les charger depuis des fichiers.

Admettons un pipeline qui construit une image à chaque commit, puis la déploie sur le
cluster. Le job de déploiement vient de se terminer en vert.

:::devine
question: Que sait-on du service ?
options: ['La nouvelle version sert le trafic', 'La nouvelle version démarre', 'L\'état désiré a été écrit, rien de plus']
bonne: 2

reponse: Un job de déploiement rapporte un seul fait, la commande a retourné sans erreur. Si l'image référencée n'existe pas, le run est vert, le déploiement enregistré comme réussi, et chaque pod neuf est bloqué au démarrage pendant que les anciens continuent de servir.

:::

:::regle
Un pipeline vert n'est pas un service sain.
:::

Un déploiement n'est pas terminé quand la commande retourne mais quand la version neuve
sert le trafic. Le pipeline devrait donc attendre que les pods neufs soient prêts, et les
minutes qui suivent un déploiement méritent plus d'attention que le reste du temps. C'est
là que le [chapitre 2](#/observabilite/trois-piliers#le-checkout-lent) s'est refermé en trois clics :
la phrase décisive était « le cache est vide depuis le déploiement de 14h02 », et elle
n'était possible que parce que le déploiement était visible sur le graphe. Une
annotation sur les dashboards à chaque déploiement, que Grafana fait nativement, est le
meilleur rapport valeur sur effort de tout le pipeline. Sans elle, la première question
de chaque incident est « est-ce qu'on a livré quelque chose récemment ? », et quelqu'un
va vérifier à la main.
