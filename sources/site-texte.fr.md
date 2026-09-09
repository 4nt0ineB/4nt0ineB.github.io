# Texte du site, export pour relecture

Genere par `node scripts/exporter.mjs` depuis les fragments de chaque section, le 2026-09-09.

La prose est en markdown, modifiable librement. Ce qui suit est fonctionnel et doit rester en place :

- `## Titre {#ancre}` : l'ancre est la cible de liens croises, ne la renomme pas.
- `<jargon mot="x">y</jargon>` : definit un terme a sa premiere occurrence dans la page.
- `<mesure valeur="...">y</mesure>` : un chiffre mesuré, marqué comme tel.
- `:::regle`, `:::aller-plus-loin`, `:::devine`, `:::tableau` : des blocs, dont la prose interieure est modifiable.
- `:::schema` : une fiche descriptive, informative seulement. Le schema lui-meme est du code.

---

# Antoine Bastos

```
article   : accueil
page      : accueil
fichier   : accueil/accueil.fr.html
surtitre  : 
lecture   : - min
```

Ingénieur logiciel

Systèmes backend, applications métier, migrations de données.

Seine-et-Marne, France

- [GitHub](https://github.com/4nt0ineB)
- [LinkedIn](https://www.linkedin.com/in/antoineba6/)
- [CV](#/fr/cv)

Je travaille surtout sur des systèmes backend Java, des migrations de données et des applications métier. Chez Lunatech depuis 2024.

## Travaux choisis {#travaux}

### Produit web personnel, non public

depuis 2026

Développement en solo

Un produit web sur un monorepo TypeScript, banc d'essai d'un développement mené en spec-driven (OpenSpec) avec plusieurs agents Claude Code, un orchestrateur et des revues automatisées.

TypeScript · React · OpenSpec · Claude Code

### Open Food Facts

2024

Contributeur backend, open source

Intégration du CRM Odoo dans le monolithe Perl de la plateforme producteurs, et refonte du module de routage en handlers typés, adoptée comme standard du projet.

Perl · Docker · Linux

[Trente-quatre PR fusionnées ↗](https://github.com/openfoodfacts/openfoodfacts-server/pulls?q=is%3Apr+author%3A4nt0ineB+is%3Amerged)

### Catalogue raisonné VLA

2022

Freelance, seul développeur

Catalogue en ligne de six cent cinquante œuvres d'un peintre : devis, maquettes, deux revues, déploiement.

Python · Django · Docker · Nginx

[laubreton.com ↗](https://laubreton.com)

## Expérience {#experience}

depuis 2026

### CARIAD, groupe Volkswagen

Lead dev, via Lunatech

Migration d'un back-office de permissions vers une API REST et un frontend React, endpoint par endpoint derrière un feature flag. Refonte du modèle d'autorisations en une matrice rôle, opération, périmètre.

Java · Spring Boot · React · TypeScript

2025 à 2026

### DARVA, Domaine Client

Développeur backend, via Lunatech

Migration des données clients d'un assureur vers un nouveau référentiel. Batch repris et optimisé, de huit heures à moins d'une heure et demie.

Java · Quarkus · Hibernate Reactive · Kafka

2025

### DARVA, Exiris

Développeur full-stack, via Lunatech

Plateforme de lettre recommandée électronique. Tests de non-régression migrés vers Playwright.

Java · Quarkus · React · Playwright

[Parcours complet → CV](#/fr/cv)

## Blog {#ecrits}

2026-09

### [Introduction à l'observabilité](#/fr/blog/introduction-observabilite)

Douze pages, à partir de neuf pannes reproduites sur une machine de test.

Observabilité · Kubernetes · Prometheus

[Lire →](#/fr/blog/introduction-observabilite)

## Outils {#outils}

## Sujets {#sujets}

- Systèmes distribués
- Modélisation des données
- Observabilité
- Simulation
- Architecture logicielle
- Développement assisté par IA

## À propos {#a-propos}

Ingénieur logiciel en Seine-et-Marne. Je travaille surtout sur des systèmes backend et des applications métier. Master en informatique, Université Gustave Eiffel, 2025. Français, anglais professionnel.

Antoine Bastos
Ingénieur logiciel, France

- [GitHub](https://github.com/4nt0ineB)
- [LinkedIn](https://www.linkedin.com/in/antoineba6/)
- [CV](#/fr/cv)

---

# Antoine Bastos

```
article   : cv
page      : cv
fichier   : cv/cv.fr.html
surtitre  : 
lecture   : - min
```

Ingénieur logiciel backend Java. Migrations de données, reprise de code existant, performance.

Chez Lunatech depuis 2024.

- Seine-et-Marne, France
- Lunatech
- [GitHub](https://github.com/4nt0ineB)
- [LinkedIn](https://www.linkedin.com/in/antoineba6/)

## Expérience {#experience}

mars à août 2026

### CARIAD, groupe Volkswagen

Lead dev, via Lunatech

- Migration d'un outil back-office de gestion des permissions, d'un rendu côté serveur vers une API REST et un frontend React.
- Stratégie Strangler Fig : nouveau frontend servi en parallèle de l'ancien derrière un feature flag, migration endpoint par endpoint, retour arrière instantané.
- Refonte des autorisations : une matrice rôle, opération et périmètre, figée par une suite de tests, remplace les contrôles dispersés hérités.
- Encadrement d'un développeur apprenti par revue de code et binômage.

Java, Spring Boot, React, TypeScript, Vitest

juillet 2025 à mars 2026

### DARVA, Domaine Client

Développeur backend, via Lunatech

- Migration des données de milliers de clients vers un nouveau référentiel : batch repris en cours de route, terminé et mis en production.
- Appels au CRM parallélisés, requêtes et gestion de session Hibernate Reactive revues : optimisation du batch passant de huit heures à moins d'une heure et demie.
- Batchs métier récurrents optimisés, de plusieurs dizaines de minutes ou de plantages à quelques minutes.
- Saturation mémoire de la JVM en recette diagnostiquée, jointures imbriquées simplifiées.
- Documentation fonctionnelle des règles métier, inexistante jusque-là.

Java, Quarkus, Hibernate Reactive, Mutiny, Kafka, MariaDB, Jenkins

janvier à juillet 2025

### DARVA, Exiris

Développeur full-stack, via Lunatech

- Plateforme de lettre recommandée électronique : fonctionnalités de recherche et contrôle des certificats clients.
- Migration de tests de non-régression de Cypress vers Playwright ; maintenance du pipeline Jenkins et mise à jour des statuts Jira depuis l'état des PR.

Java, Quarkus, React, TypeScript, Playwright, Jenkins

mai à août 2024

### Open Food Facts

Développeur backend, contributeur open source, en anglais

- Intégration du CRM Odoo par XML-RPC dans le monolithe Perl de la plateforme producteurs : création des contacts et organisations, dédoublonnage, import de trois cents organisations existantes.
- Refonte du module de routage en handlers typés, adoptée comme standard du projet.
- [Trente-quatre PR fusionnées](https://github.com/openfoodfacts/openfoodfacts-server/pulls?q=is%3Apr+author%3A4nt0ineB+is%3Amerged) en quatre mois.

Perl, Docker, Linux

été 2022

### VLA, catalogue raisonné

Freelance, seul développeur

- Catalogue en ligne des six cent cinquante œuvres du peintre Vonick Laubreton : devis, maquettes, deux revues intermédiaires, déploiement.
- [En ligne depuis 2022](https://laubreton.com).

Python, Django, JavaScript, Docker, Nginx

## Compétences {#competences}

Langages

Java, TypeScript, Python, SQL

Frameworks

Quarkus, Spring Boot, Hibernate, Mutiny et Vert.x, React

Données et infra

PostgreSQL, MariaDB, Kafka, Docker, Jenkins, Linux

Pratiques

Architecture hexagonale, Strangler Fig, tests Playwright, intégration continue, Scrum

IA

Claude Code, Gemini CLI, GitHub Copilot, OpenSpec (spec-driven development)

## Formation {#formation}

### Master en informatique, ingénierie logicielle et données

Université Gustave Eiffel, 2025

## Langues {#langues}

Français, langue maternelle. Anglais professionnel, TOEIC 945 en 2025.

## Écrits {#ecrits}

### [Introduction à l'observabilité](#/fr/blog/introduction-observabilite)

Douze pages, à partir de neuf pannes reproduites sur une machine de test.

---

# Antoine Bastos

```
article   : cv
page      : fancy
fichier   : cv/fancy/cv.fr.html
surtitre  : 
lecture   : - min
```

01

ingénieur logiciel

Seine-et-Marne, France

Backend Java, performance, modernisation de code existant et migration de données. Chez Lunatech depuis 2024.

## 02 parcours {#parcours}

1. mars à août 2026 CARIAD, groupe Volkswagen lead dev, via Lunatech Migration d'un outil back-office de gestion des permissions, d'un rendu côté serveur à une API REST et un frontend React. Mise en place du pattern Strangler Fig, endpoint par endpoint et derrière un feature flag, pour un retour arrière instantané et sans régression. Java · Spring Boot · React · TypeScript · Vitest
2. juillet 2025 à mars 2026 DARVA, Domaine Client développeur backend, via Lunatech Migration du CRM vers une nouvelle solution. Développement et mise en production du batch de migration des données de trente mille clients. Java · Quarkus · Hibernate Reactive · Mutiny · Kafka · MariaDB · Jenkins
3. janvier à juillet 2025 DARVA, Exiris développeur full-stack, via Lunatech Plateforme de lettre recommandée électronique : fonctionnalités de recherche et de contrôle des certificats. Migration de tests vers Playwright. Java · Quarkus · React · TypeScript · Playwright · Jenkins
4. mai à août 2024 Open Food Facts développeur backend, stage de master, en anglais Intégration du CRM Odoo par XML-RPC dans le monolithe Perl de la plateforme producteurs, import de trois cents organisations, et refonte du routage en handlers typés, adoptée comme standard du projet. Perl · Docker · Linux
5. été 2022 [VLA, catalogue raisonné](https://laubreton.com) freelance, seul développeur Catalogue en ligne des six cent cinquante œuvres du peintre Vonick Laubreton, du devis à la mise en production. Le site est toujours en ligne. Python · Django · JavaScript · Docker · Nginx

## 03 formation {#formation}

1. Master en informatique, ingénierie logicielle et données Université Gustave Eiffel, 2025
2. TOEIC score 945, anglais professionnel, 2025

## 04 outils {#outils}

langages

- Java
- TypeScript
- Python
- SQL

frameworks

- Quarkus
- Spring Boot
- Hibernate
- React
- Mutiny et Vert.x

données et infra

- PostgreSQL
- MariaDB
- Docker
- Jenkins
- Linux

ia

- Claude Code
- Gemini CLI
- GitHub Copilot

pratiques

- Architecture hexagonale
- Strangler Fig
- Tests Playwright
- Intégration continue
- Scrum

## 05 contact {#contact}

- [github.com/4nt0ineB](https://github.com/4nt0ineB)
- [linkedin.com/in/antoineba6](https://www.linkedin.com/in/antoineba6/)

antoine bastos · 2026 · cv inspired by emil ruder, tm 12, 1955

---

# Introduction à l'observabilité

```
article   : introduction-observabilite
page      : accueil
fichier   : blog/introduction-observabilite/fr/00-accueil.html
surtitre  : Introduction
lecture   : 1 min
```

Le code tourne en prod et un matin, quelqu'un dit que l'application est lente. Il n'y a ni débogueur, ni moyen de reproduire le contexte du problème. Si l'observabilité a été mise en place, un développeur a de quoi tenter de comprendre. Sinon, bon courage.

Cet article s'adresse à qui sait ce qu'est une ligne de log et a peut-être vu un dashboard Grafana sur l'écran d'un collègue, sans jamais avoir construit ni fait tourner ce qui produit ces graphes. Aucune connaissance des outils de l'observabilité (Prometheus, Kubernetes, etc.) ou des notions associées n'est supposée, et les mots de jargon sont expliqués à leur première apparition.

Il vient d'un bilan d'auto-apprentissage aidé par l'IA : neuf pannes provoquées sous charge réelle, sur un vrai serveur, diagnostiquées depuis les dashboards seuls. Tout ce qui est chiffré ici a été constaté par un enchaînement d'exercices pratiques sur un serveur virtuel.

L'objectif est de donner au lecteur une image mentale de l'observabilité et de ses concepts clés. Il ne s'agit pas ici de la capacité de diagnostiquer une panne, qu'un texte de quelques lignes ne pourrait pas enseigner. Une suite, [L'observabilité, pour aller plus loin](#/fr/blog/observabilite-aller-plus-loin), traite de la lecture des séries temporelles, des sondes Kubernetes et du déploiement.

---

# La prod n'a pas de débogueur

```
article   : introduction-observabilite
page      : prod-sans-debogueur
fichier   : blog/introduction-observabilite/fr/01-prod-sans-debogueur.html
surtitre  : Chapitre 1
lecture   : 2 min
```

## La boucle de débogage, impossible en prod {#la-boucle-perdue}

En développement, on profite d'une boucle si confortable qu'elle ne se remarque qu'une fois perdue : on exécute le code, on le regarde échouer, on pose un break point, on relance, et l'échec se reproduit, parce qu'on maîtrise l'entrée.

La production rend cette boucle impossible. La panne a eu lieu une fois il y a vingt minutes, pour un utilisateur sur quarante mille, parmi quatre processus, et l'état qui l'a provoquée a déjà disparu. Impossible de mettre le système en pause, puisqu'il continue de servir les utilisateurs.

## Instrumenter avant la panne {#ecrire-a-l-avance}

Il reste ce que le système a écrit pendant qu'il tournait. L'observabilité consiste à lui faire écrire, à l'avance, des données qui permettront de répondre à des questions qu'on ne se pose pas encore. Tout tient dans « à l'avance », car ce qui n'a pas été enregistré à 14h32 ne se retrouvera jamais.

## Les trois questions d'une enquête {#trois-questions}

Chaque enquête pose les mêmes trois questions, dans le même ordre :

1. Y a-t-il un problème, et depuis quand ?
2. Où se trouve-t-il, dans un système fait de plusieurs parties ?
3. Pourquoi, exactement ?

Ce sont des questions différentes, qui réclament des données différentes, car une donnée qui répond bien à la première répond mal à la troisième. La raison est mathématique et non historique, et le chapitre suivant l'expose. Pour l'instant, retenons cet enchaînement : détecter, localiser, expliquer.

:::regle
Presque toutes les mauvaises enquêtes commencent au milieu, en cherchant un mot dans les logs.
:::

## Pourquoi ajouter des logs cesse de suffire {#pourquoi-les-logs-cassent}

Ajouter des logs est le réflexe de tout développeur, et ce réflexe est juste. Il casse de trois façons distinctes.

Il casse en volume. Une ligne par requête, à quarante mille requêtes la minute, ça fait beaucoup de texte. Le stocker reste abordable, mais le chercher ne l'est plus, puisque chercher veut dire tout relire.

Il casse en agrégation. « Combien de commandes ont échoué dans la dernière heure » est une question de comptage, et une ligne de log n'est pas un compte. On peut tout à fait recompter à chaque rafraîchissement de dashboard et à chaque évaluation d'alerte, au prix de relire des gigaoctets de texte - aïe.

Il casse à la traversée des processus. Quand une requête touche quatre services, son histoire se disperse en quatre tas de texte séparés, sur quatre machines, que rien ne relie sinon un horodatage approximatif. Reconstituer une requête à la main reste possible, mais pas pour les cent requêtes qui ont échoué la même minute.

Les logs ne sont pas mauvais pour autant. Ils répondent à la troisième question mieux que n'importe quel autre outil, parce qu'ils gardent le détail. Ils ne conviennent pas aux deux premières, et s'y précipiter d'abord est l'erreur la plus commune.

---

# Trois signaux, trois niveaux de détail

```
article   : introduction-observabilite
page      : trois-piliers
fichier   : blog/introduction-observabilite/fr/02-trois-piliers.html
surtitre  : Chapitre 2
lecture   : 5 min
```

## Détecter, localiser, expliquer {#detecter-localiser-expliquer}

Les trois signaux de base de l'observabilité sont la métrique, la <jargon mot="trace">trace</jargon> et le log. Ce ne sont pas trois façons concurrentes de faire le même travail mais trois étages d'une même enquête. Chacun répond à l'une des trois questions du chapitre précédent. Pour les enquêtes de ce texte, un modèle utile est : la métrique détecte, la trace localise, le log explique. Ce n'est pas une exclusivité, car une trace peut aussi expliquer une cause et un log peut détecter une panne. OpenTelemetry en compte d'autres, et parle de signaux plutôt que de piliers.

:::tableau legende="Les trois piliers, la question qu'ils répondent, leur rôle dans l'enquête."

| pilier | la question qu'il répond | son rôle |
|---|---|---|
| métrique | Y a-t-il un problème, et depuis quand ? | détecter, donner l'alerte |
| trace | Où, dans le système ? | localiser |
| log | Pourquoi, exactement ? | expliquer |

:::

Une seule requête HTTP produit les trois à la fois. Ce sont trois projections du même événement mais chacune à un niveau de détail différent :

- un point dans un histogramme (la métrique), où l'identité de la requête est jetée ;
- un arbre d'opérations (la trace), qui garde l'identité et la causalité ;
- deux ou trois lignes de texte (le log), qui gardent l'identité mais pas la structure.

## Le checkout lent {#le-checkout-lent}

Admettons une API REST sur un serveur quelconque, et un dashboard d'observabilité déjà en place. On désigne p95 de latence le seuil sous lequel aboutissent 95 % des requêtes, les 5 % restantes étant plus lentes.

### Étage un, la métrique

Une alerte se déclenche : le p95 de `/checkout` passe de 200 millisecondes à 3 secondes. Le dashboard montre que le problème a commencé à 14h02, qu'il ne touche que cette route, et que le taux d'erreur reste plat. Le service est lent mais pas cassé. On sait quand et quoi, et aucun détail supplémentaire sur la métrique ne dira jamais pourquoi.

### Étage deux, la trace

Un clic sur le pic ouvre la trace d'une vraie requête lente. Cette trace est un arbre d'opérations, chacune avec un début, une durée, un parent et des attributs (un span, dans OpenTelemetry). L'arbre montre 3,1 secondes au total, dont 2,9 tenues par cent opérations jumelles, toutes `SELECT * FROM items WHERE order_id = ?`. On sait maintenant où : le chargement des articles fait cent requêtes au lieu d'une.

### Étage trois, le log

Un clic sur l'une de ces opérations ouvre l'outil de logs, déjà filtré sur l'identifiant de cette requête. Une seule ligne répond à tout : `cache miss for order items, falling back to per-item fetch`. Le cache est vide depuis le déploiement de 14h02.

:::schema schema-trois-etages
titre: The /checkout latency goes from 200 milliseconds to 3 seconds at 14:02
titre: A 3.1-second trace, 2.9 seconds of which in a hundred twin SQL queries
titre: A log filtered on the trace identifier
voir: L'enquete du checkout lent en trois clics. Etage 1 le graphe de latence avec son point d'exemplar, etage 2 la trace en cascade et ses cent requetes jumelles, etage 3 la ligne de log filtree sur l'identifiant de trace.
:::

Trois outils, trois clics, une minute et demie. La même enquête menée aux logs seuls prend une après-midi et finit en général par une supposition.

## La cardinalité {#la-cardinalite}

Pourquoi pas un seul outil qui fait tout ça ?

La <jargon mot="cardinalité">cardinalité</jargon> est le nombre de combinaisons distinctes que peuvent prendre les étiquettes d'une donnée. Le mot a l'air abstrait, et c'est lui qui décide de la conception de chaque outil.

Une métrique est agrégée à l'avance. Quand une requête échoue, un compteur passe de 3 à 4, et c'est tout. L'utilisateur, l'URL, la pile d'appels, l'identifiant de la requête : tout est jeté, exprès, au moment de l'écriture. En échange, ce compteur est permanent et presque gratuit, l'interroger sur six semaines y compris, puisque la réponse a été calculée quand la donnée est arrivée.

Reste à rendre cette métrique capable d'expliquer. Si on étiquetait le compteur avec l'identifiant de l'utilisateur, on n'aurait plus une seule métrique mais autant de métriques que le système a d'utilisateurs. Ajouter l'URL avec ses paramètres multiplierait encore. Prometheus garde ses index en mémoire, et ce n'est pas une étiquette de quarante mille valeurs qui l'épuise, c'est la multiplication. Avec le statut, la route et la méthode déjà en place, l'identifiant client porte le compte à 5 × 20 × 6 × 40 000, soit vingt-quatre millions de séries possibles, et une URL avec ses paramètres n'a même pas de compte.

:::schema schema-cardinalite
titre: Number of series stored by the metric, on a logarithmic scale
voir: Des cases a cocher, une par etiquette de metrique (statut 5 valeurs, route 20, methode 6, identifiant client 40 000, URL sans limite). Une barre en echelle logarithmique et un compteur suivent le nombre de series stockees, et basculent en alerte au-dela du seuil.
:::

:::devine
question: On ajoute une étiquette d'identifiant client à une métrique. Que se passe-t-il ?
options: ['Les requêtes ralentissent un peu', 'Le stockage grossit proportionnellement', 'Le nombre de séries explose, et la mémoire du serveur avec']
bonne: 2

reponse:

Chaque valeur d'étiquette crée une série de plus, gardée en mémoire. Quarante mille séries seules, Prometheus les tient. Mais l'étiquette se combine avec celles qui existent déjà, et le compte passe à des millions de séries possibles. La mémoire du serveur s'épuise et il devient instable, sans se dégrader progressivement.

:::

Une série de métrique ne garde donc pas l'identité de chaque requête. La propriété qui la rend bon marché est justement celle qui jette le détail.

Une trace fait l'inverse et garde chaque instance avec sa causalité complète, donc elle coûte bien plus cher. C'est pourquoi les systèmes en production n'en gardent souvent qu'une fraction, une sur dix ou une sur cent, et c'est pourquoi on n'alerte pas dessus : une alarme construite sur un échantillon rate les événements qui n'ont pas été échantillonnés.

Aucun outil ne fait bien les trois à la fois, car une métrique assez détaillée pour expliquer détruit sa propre base, et une trace assez complète pour alerter coûte le prix de tout le trafic.

## Tout n'est pas une requête {#tout-n-est-pas-une-requete}

La mémoire utilisée, la charge processeur, la profondeur d'une file : c'est de l'état de la machine et non des événements. Cet état n'a pas de trace, puisqu'aucune requête ne l'a causé, et souvent pas de log, puisque personne n'écrit une ligne « mémoire : 512 Mo » toutes les trente secondes. L'enquête reste alors dans les métriques, recoupées avec les events que Kubernetes enregistre lui-même.

## Un identifiant, propagé partout {#la-colle}

Les trois signaux ne valent que si on peut passer de l'un à l'autre, et un seul mécanisme le rend possible : un identifiant de trace, généré à l'entrée du système et transporté à travers tout. Il doit apparaître à trois endroits :

- dans la trace, où il naît ;
- dans chaque ligne de log écrite en traitant cette requête ;
- attaché aux points de mesure, ce qui rend le pic cliquable (voir les exemplars au [chapitre 5](#/fr/blog/introduction-observabilite/instrumenter#les-exemplars)).

C'est le travail d'instrumentation qui compte le plus, et celui qu'on saute le plus souvent. Sans lui, il n'y a pas de socle d'observabilité, il y a trois outils séparés et l'habitude de comparer des horodatages à la main.

---

# Le trajet d'une donnée

```
article   : introduction-observabilite
page      : le-trajet
fichier   : blog/introduction-observabilite/fr/03-le-trajet.html
surtitre  : Chapitre 3
lecture   : 3 min
```

## Stockages et tuyaux {#deux-boites}

La plupart des confusions sur l'outillage disparaissent une fois chaque produit rangé dans l'une de deux boîtes : ceux qui gardent la donnée, et ceux qui la déplacent. On discute beaucoup d'outils qui ne se concurrencent pas, parce qu'ils ne sont pas dans la même boîte.

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

Bien d'autres piles mettent en œuvre les mêmes idées. Celle-ci a été choisie parce qu'elle est rodée, libre, et tient sur une machine de 8 Go, et que Grafana sait lire les trois stockages. Elle sert de pile de référence pour la suite du texte, afin que chaque notion ait un composant réel en face d'elle, mais les notions comptent plus que les produits. La page suivante cite un autre choix.

Cette carte répond à « qu'est-ce que ce composant ». Elle ne répond pas à « comment la donnée arrive sur mon écran », qui est une question de mouvement.

## De l'application à l'écran {#de-l-application-a-l-ecran}

Une application instrumentée émet ses trois piliers par trois chemins différents.

- Ses métriques ne partent nulle part. Elle les expose sur un endpoint HTTP, `/metrics`, et Prometheus vient les lire.
- Ses traces partent en OTLP vers le collecteur OpenTelemetry, qui les route vers Tempo.
- Ses logs vont sur sa sortie standard, où un agent qui tourne sur la machine, Alloy, les lit, les étiquette et les pousse vers Loki. L'application ne fait rien pour ça, ce qui est la force d'un agent, puisqu'il collecte sans aucune coopération du code.

Grafana lit les trois stockages et les met sur le même écran. En parallèle, Prometheus évalue ses règles d'alerte, et une alerte déclenchée peut joindre un humain.

:::schema schema-trajet
titre: The journey of a data point, from the application to the screen
voir: Un schema en trois colonnes, application, tuyaux et stockages, ecran. Les quatre chemins s'allument l'un apres l'autre : /metrics que Prometheus vient lire, les traces vers le collecteur puis Tempo, la sortie standard lue par Alloy puis Loki, et Grafana qui lit les trois.
:::

## Pull contre push {#pull-contre-push}

Deux de ces trois chemins vont dans un sens et le troisième dans l'autre, et cette asymétrie n'est pas arbitraire.

Prometheus fait du <jargon mot="pull">pull</jargon>. L'application n'envoie ses métriques nulle part, elle affiche ses compteurs actuels en texte sur `/metrics`, et Prometheus se connecte à cet endpoint toutes les quinze ou trente secondes pour noter ce qu'il voit. Cette opération s'appelle un <jargon mot="scrape">scrape</jargon>.

Les logs et les traces, eux, se <jargon mot="push">push</jargon>. Un événement arrive quand il arrive, donc il faut bien que quelque chose l'envoie au moment où il se produit. Un état, au contraire, se mesure sur commande. On ne peut pas demander à un processus ce qu'il a loggé dans les trente dernières secondes, mais on peut toujours lui demander combien de mémoire il utilise maintenant.

:::schema schema-pull-push
titre: Prometheus pulls its metrics, the agent pushes its logs
voir: Deux colonnes animees en boucle. A gauche Prometheus qui va chercher ses metriques, a droite l'agent qui pousse ses logs vers Loki.
:::

Le pull a une conséquence qui revient au [chapitre 6](#/fr/blog/introduction-observabilite/lire-un-graphe#la-fenetre) : une métrique n'a pas de valeur continue, elle a la valeur qu'elle avait aux instants où on est venu la lire. Un état passager qui apparaît et disparaît entre deux scrapes n'a jamais existé pour Prometheus. Un compteur, lui, garde la marque de l'événement qui l'a incrémenté, et le scrape suivant voit l'augmentation.

## À quoi sert le collecteur {#ce-que-le-tuyau-achete}

Le collecteur ne garde rien, donc on peut se demander à quoi il sert. Il sert à ce que l'application ne connaisse qu'une seule destination. Remplacer Tempo par autre chose devient un changement dans la configuration du collecteur, et non un redéploiement de quarante services.

Un nom qui trompe, sur ce point : le collecteur a un exporter appelé `prometheus`, et il n'envoie rien à Prometheus. Il l'imite, en traduisant les métriques dans son format texte et en les exposant sur un `/metrics` que Prometheus vient scraper comme n'importe quelle autre cible. Le modèle pull reste intact même là.

---

# Les outils, un par un

```
article   : introduction-observabilite
page      : les-outils
fichier   : blog/introduction-observabilite/fr/04-les-outils.html
surtitre  : Chapitre 4
lecture   : 5 min
```

## Prometheus {#prometheus}

Prometheus est une base de données pour des nombres dans le temps. Il porte aussi son langage de requête, PromQL, et le moteur qui évalue les règles d'alerte. Presque toute pile de métriques qu'on croisera est soit Prometheus, soit un outil qui parle son langage.

Il garde ses index en mémoire, ce qui explique sa vitesse et sa fragilité. Une étiquette dont les valeurs se multiplient sans borne ne le ralentit pas progressivement, elle épuise sa mémoire (voir la [cardinalité](#/fr/blog/introduction-observabilite/trois-piliers#la-cardinalite)).

## Loki {#loki}

Loki est le Prometheus des logs : la même place dans l'architecture et la même forme, mais pour du texte horodaté plutôt que des nombres. Il ne collecte rien lui-même, car c'est l'agent de la machine qui lit la sortie des processus, l'étiquette et la pousse.

Loki n'indexe jamais le contenu de la ligne de log. Il indexe un ensemble d'étiquettes définies à l'avance, par fenêtre de temps. Une recherche sur ces étiquettes est bon marché. Une fois le type de log et la période ciblés, il ne reste qu'une recherche de texte, comme un grep. Ce choix le rend bien moins cher qu'un moteur de recherche plein texte, et moins bon pour retrouver un identifiant précis dans tout ce qui a jamais été loggé.

D'où l'erreur Loki la plus courante, et une question d'entretien classique. Les étiquettes créent des flux physiquement séparés, donc la contrainte de cardinalité s'applique ici telle quelle. Le niveau de sévérité passe bien, il y en a cinq (info, debug, warn, error, trace). Une étiquette pour l'identifiant utilisateur ou l'identifiant de trace détruit le système, et ceux-là vont dans les structured metadata, que Loki prévoit pour ces valeurs à forte cardinalité, ou à défaut dans le contenu de la ligne, où un filtre texte les retrouve.

## Tempo {#tempo}

Tempo est le stockage pour les traces. Le chemin le moins cher et le plus direct reste l'identifiant de trace : « j'ai déjà un identifiant, venu d'une ligne de log ou d'un exemplar, montre-moi l'arbre ». Tempo sait aussi chercher des traces avec son langage de requête, TraceQL, par attribut de <jargon mot="span">span</jargon>, par durée ou par structure. Mais ces recherches parcourent les traces elles-mêmes, et elles n'ont rien de commun avec l'index d'une base de métriques.

Une trace qui vient d'être envoyée n'est pas immédiatement cherchable, puisqu'elle passe par un tampon d'ingestion et devient interrogeable une minute ou deux plus tard. Ne pas conclure « il n'y a pas de traces » vingt secondes après avoir déclenché une requête.

## OpenTelemetry {#opentelemetry}

OpenTelemetry, souvent écrit OTel, est un standard en deux moitiés.

La première est une bibliothèque qu'on ajoute à l'application. Elle produit les métriques, les traces et les logs dans un format neutre, donc le code n'est pas écrit contre Prometheus ou contre Tempo mais contre le standard.

La seconde est le collecteur, dont le [chapitre précédent](#/fr/blog/introduction-observabilite/le-trajet#ce-que-le-tuyau-achete) donne le rôle. Sa configuration a trois étages :

- les receivers acceptent la télémétrie ;
- les processors la transforment (regroupement par lots, limites de mémoire, métadonnées d'origine) ;
- les exporters l'envoient plus loin.

Les processors ne sont pas des scripts qu'on écrit. Ce sont des composants déjà compilés dans le programme, et la configuration ne fait que les choisir, les régler et fixer leur ordre.

## Grafana {#grafana}

Grafana est la couche d'affichage et ne stocke rien. Il se connecte à Prometheus, Loki et Tempo en même temps, ce qui rend possible l'[enquête en trois clics](#/fr/blog/introduction-observabilite/trois-piliers#le-checkout-lent).

Autour de lui, la plupart des composants embarquent leur propre petite interface web.

:::regle
Une interface qu'il faut penser à ouvrir n'est pas de la supervision.
:::

Il faut que l'état de santé d'un composant devienne une métrique, puis un panneau, puis une alerte. Sinon il faut aller regarder l'interface d'un autre outil, et on n'ira la voir que si on soupçonne déjà un problème. Une information qu'on ne voit pas dans Grafana n'apprend rien tant qu'on ne va pas la chercher.

Une exception : l'interface de Prometheus a une page qui liste chaque application qu'il vient lire, et dit si cette lecture échoue et pourquoi. Quand une métrique attendue n'apparaît pas dans Grafana, c'est en général là que se trouve la réponse, parce que le problème est en amont de tout dashboard.

:::aller-plus-loin titre="Elasticsearch, et les trois cas où le plein texte gagne"

Elasticsearch, en général utilisé dans une stack ELK (Elasticsearch, Logstash, Kibana), indexe le texte intégral de chaque ligne. Cet index donne une recherche ad hoc large, sur n'importe quel mot, mais il coûte cher à l'échelle, parce qu'il dépasse souvent la taille de la donnée elle-même.

Si les services qu'on écrit soi-même sont bien instrumentés, on n'en aura pas besoin pour eux. Trois cas restent où il gagne.

1. Un identifiant métier qui arrive tard, par le support client, des semaines après les faits. Ce n'est pas un identifiant de trace, car les traces se gardent quelques jours et sont échantillonnées, alors que les logs se gardent des semaines. Une recherche à froid à travers tous les services, des semaines en arrière, c'est ce pour quoi l'indexation plein texte existe.
2. Sécurité et audit. « Toutes les actions de cet utilisateur sur tous les systèmes pendant six mois » est une recherche plein texte à froid sur une longue période, et aucune quantité de traçage n'y répond.
3. Des systèmes qu'on ne contrôle pas. Une vraie entreprise contient des plateformes historiques, des appliances et des logiciels de fournisseurs qui émettent du texte non structuré, sans identifiant dedans. L'indexation plein texte est le plus petit dénominateur commun, puisqu'on indexe tout faute de pouvoir changer ce qui est émis.

Une bonne instrumentation rend un moteur plein texte inutile pour le code qu'on écrit soi-même. Il reste le bon outil pour le code qu'on n'écrit pas.

:::

---

# L'instrumentation qu'on écrit soi-même

```
article   : introduction-observabilite
page      : instrumenter
fichier   : blog/introduction-observabilite/fr/05-instrumenter.html
surtitre  : Chapitre 5
lecture   : 3 min
```

## Les métriques fournies par le framework {#ce-qui-existe-sans-rien-faire}

Les frameworks modernes instrumentent déjà beaucoup d'office : les requêtes HTTP entrantes, les codes de réponse, la distribution des latences, la mémoire, le garbage collector, l'usage du pool de connexions à la base. Tout ça existe en général dès qu'on ajoute la dépendance de métriques (Micrometer pour Quarkus et Spring Boot).

Inutile de reconstruire ça. Le travail qui appartient au développeur est la couche que personne d'autre ne peut deviner, à savoir ce que l'application fait pour le métier.

## Les quatre types de métriques {#les-quatre-types}

Une métrique est un objet qu'on déclare une fois et qu'on met à jour dans le code.

:::tableau legende="Les quatre types de métriques et à quoi chacun sert."

| type | comportement | sert pour |
|---|---|---|
| <jargon mot="counter">counter</jargon> | ne fait qu'augmenter | requêtes servies, commandes créées, erreurs |
| <jargon mot="gauge">gauge</jargon> | monte et descend | longueur de file, connexions actives, éléments en cache |
| <jargon mot="histogram">histogram</jargon> (ou timer) | enregistre une distribution | des durées, pour pouvoir demander le p95 |
| distribution summary (Micrometer) | une distribution de valeurs non temporelles | montant d'une commande, taille d'une charge utile |

:::

À savoir : une latence moyenne décrit mal ce que vivent les utilisateurs, puisqu'elle est dominée par les nombreuses requêtes rapides et cache les lentes. Elle sert à dimensionner, pas à juger la queue de la distribution. Un percentile décrit au contraire l'expérience des utilisateurs les moins chanceux, et c'est ce qui fait l'utilité d'un histogram.

## Les métriques métier {#les-metriques-metier}

`orders_created_total`. `cart_value_euros`. `password_resets_total`. Ce sont des métriques légitimes, et impossibles à instrumenter automatiquement, puisqu'aucun framework ne sait ce qu'est une commande.

Ce sont aussi elles qui rendent un incident lisible pour quelqu'un d'autre que le développeur. « La latence monte » est un fait technique. « Les paiements sont tombés à zéro il y a quatre minutes » est une panne, et tout le monde la comprend.

Le [chapitre 2](#/fr/blog/introduction-observabilite/trois-piliers#la-cardinalite) a donné la contrainte qui les encadre : une étiquette doit avoir un ensemble de valeurs petit, fini et connu, comme un statut ou un nom de route tiré d'une liste fixe. Jamais un identifiant, jamais une URL brute avec ses paramètres, jamais rien qui vient de la saisie utilisateur.

## La limite : une question posée à l'avance {#une-question-posee-a-l-avance}

On ne peut interroger que ce qu'on a décidé d'instrumenter avant l'incident, et c'est la limite de l'approche. Si personne n'a pensé à compter les uploads rejetés, alors pendant l'incident sur les uploads rejetés, ce chiffre n'existe pas et ne peut pas être récupéré après coup.

Les logs ont la limite et la force symétriques, car ils répondent à des questions que personne n'avait anticipées et s'agrègent mal. Cette symétrie est la raison de garder les deux.

## Les exemplars {#les-exemplars}

Un <jargon mot="exemplar">exemplar</jargon> est un petit pointeur attaché à un point de mesure, portant l'identifiant d'une requête précise qui a contribué à ce point. C'est ce qui transforme « le p95 est monté » en « voici une vraie requête lente, à regarder de près ».

C'est une quantité modeste de configuration, et le lien à plus forte valeur de toute la pile, puisqu'il convertit une statistique en spécimen. Sans lui, passer d'un graphe à une trace veut dire copier des horodatages dans une barre de recherche et espérer.

---

# Lire un graphe sans se tromper

```
article   : introduction-observabilite
page      : lire-un-graphe
fichier   : blog/introduction-observabilite/fr/06-lire-un-graphe.html
surtitre  : Chapitre 6
lecture   : 2 min
```

Un graphe a l'air d'une fenêtre sur le système. C'en est une reconstruction, faite de points collectés à intervalle régulier puis passés dans une requête. Deux choses sur cette reconstruction ont leur place dans une introduction. Le reste, le bord droit du graphe, l'heure du scrape et les fuseaux, est dans [la suite de cet article](#/fr/blog/observabilite-aller-plus-loin/lire-une-serie).

## Une ligne plate a deux causes {#plat-n-est-pas-absent}

Admettons un <jargon mot="counter">compteur</jargon> de requêtes. Il ne fait qu'augmenter, et il répond à « combien depuis le démarrage de ce processus ».

Un jour, sa ligne devient plate.

:::devine
question: Le compteur de requêtes ne bouge plus depuis dix minutes. Que se passe-t-il ?
options: ['Le scrape est cassé', 'Plus aucune requête n\'arrive', 'Le compteur a atteint son maximum']
bonne: 1

reponse:

Plus aucune requête n'arrive, et c'est l'incident. La collecte, elle, tourne toutes les quinze secondes et relit la même valeur. Un scrape cassé ne donne pas une ligne plate, il fait disparaître la série.

:::

Les deux situations réclament des réponses opposées, car un compteur plat veut dire que la chose comptée a cessé de se produire, alors qu'une série absente veut dire que la collecte elle-même est cassée.

Un compteur brut se lit donc rarement tel quel. On le convertit en taux, c'est-à-dire en « combien par seconde, maintenant », en divisant ce qu'il a gagné par le temps écoulé. On alerte sur ce taux et on diagnostique sur ce taux. Le compteur brut ne sert qu'à lire un total exact.

C'est aussi pourquoi une alerte qui compare un compteur brut à un seuil fixe est une erreur de conception et non un réglage à corriger. Le compteur ne fait que grossir, donc un seuil qui a un sens la première heure n'en a plus aucun la troisième semaine. Un taux, lui, reste comparable d'un jour à l'autre.

## La fenêtre d'une requête {#la-fenetre}

Un taux se calcule sur une fenêtre de temps, choisie à chaque requête, et cette fenêtre décide de ce qu'on voit. Une fenêtre trop large étale un événement court : un incident de six secondes, moyenné sur une minute, dessine une bosse d'une minute de large, et rien n'est cassé dans le graphe. Une fenêtre trop étroite cache un événement qui s'est produit avant elle.

:::regle
Un graphe montre la forme que la requête lui a donnée, pas la forme de l'incident.
:::

---

# Une alerte doit atteindre quelqu'un

```
article   : introduction-observabilite
page      : alerting
fichier   : blog/introduction-observabilite/fr/07-alerting.html
surtitre  : Chapitre 7
lecture   : 2 min
```

Tout ce qui précède suppose que quelqu'un regarde un dashboard. À trois heures du matin, personne ne regarde, et c'est le rôle d'une alerte.

Une alerte est une requête sur les métriques, avec une durée. Prometheus l'évalue toutes les trente secondes, et quand elle reste vraie pendant toute la durée, il la déclenche. Il ne la livre pas lui-même : il la remet à un composant de routage (Alertmanager, dans la pile Prometheus), qui la regroupe et l'envoie à une destination, un mail, un canal de discussion ou une notification sur un téléphone. Cette destination est un réglage à part. Grafana, lui, affiche les alertes mais ne les livre pas. La durée sert à ne pas réveiller quelqu'un pour une seule mesure malchanceuse. « Mémoire au-dessus de 90 % pendant cinq minutes » est une alerte, « mémoire au-dessus de 90 % » est une nuisance.

Admettons la pile kube-prometheus-stack, installée depuis deux semaines avec ses réglages par défaut. Un pod cesse d'être prêt, l'alerte se déclenche, et elle s'affiche dans la liste des alertes de Grafana.

:::devine
question: Quelqu'un est-il prévenu ?
options: ['Oui, l\'alerte est arrivée au bout de la chaîne', 'Non, personne', 'Seulement si l\'interface est ouverte']
bonne: 1

reponse:

Personne. Dans cette pile, la destination par défaut du routage s'appelle « null » et ne fait rien, pour qu'une installation neuve n'envoie pas de messages là où personne n'a rien configuré. L'alerte s'affiche, et la chaîne s'arrête là.

:::

:::regle
« On le verra » suppose un humain devant un dashboard, ce qu'une alerte existe pour supprimer.
:::

Ce défaut peut rester des semaines sans que personne le remarque, et une alerte a sonné <mesure valeur="40 min">sur un vrai incident sans qu'un seul message sorte de la machine</mesure>.

Il en découle deux habitudes. La première est d'envoyer une vraie alerte, exprès, et de confirmer qu'elle arrive sur l'appareil censé la recevoir, pas seulement dans l'interface. La seconde est de garder la liste des alertes vide en temps normal, car une alerte qui sonne en permanence, même juste, transforme la liste en décor. La troisième entrée dans une liste qui en compte déjà deux ne change rien à l'œil, et une équipe qui démarre avec une liste bruyante apprend durablement à l'ignorer.

---

# Ce qu'un dashboard vert ne dit pas

```
article   : introduction-observabilite
page      : dashboard-vert
fichier   : blog/introduction-observabilite/fr/08-dashboard-vert.html
surtitre  : Chapitre 8
lecture   : 2 min
```

Un compteur plat et une série absente se ressemblent. Un agrégat à 65 % cache un pool à 97 %. Une alerte évaluée et affichée ne signifie pas quelqu'un la vu. Un run vert recouvre des pods qui ne démarrent pas. Chaque page de ce texte a rencontré la même chose sous une forme différente : un instrument qui ne montre rien est indiscernable d'un système sain.

Deux autres instruments ont la même propriété. Un healthcheck n'est pas un signal d'observabilité mais l'entrée d'une décision automatique, prise par l'orchestrateur tout de suite et sans nuance, donc un healthcheck vert ne prouve pas que le service va bien, seulement que la sonde a répondu. Un job de déploiement vert rapporte un seul fait, la commande a retourné sans erreur, et rien sur la version qui sert le trafic. [La suite de cet article](#/fr/blog/observabilite-aller-plus-loin) les démonte.

Admettons un test de charge de cinq minutes sur un service, avec un dashboard sous les yeux. Résultat côté client : zéro requête échouée, latence stable, débit servi égal au débit demandé.

:::devine
question: Le service est-il en bonne santé ?
options: ['Oui, les trois chiffres le disent', 'Non, il est en surcharge', 'On ne sait pas']
bonne: 2

reponse:

On ne sait pas. Zéro échec dit que rien n'a été refusé, pas que rien n'a cassé. Les pods peuvent être sortis du Service un par un pendant que le client voit cent pour cent de succès, la liveness peut être à un cycle de tuer le conteneur, et une limite mémoire peut se franchir si vite qu'aucune requête n'a le temps d'échouer.

:::

:::regle
Un dashboard vert est une hypothèse, pas un résultat.
:::

Sur les neuf pannes provoquées pour ce texte, ce résultat parfait côté client est apparu <mesure valeur="3 fois sur 9">avec, à chaque fois, un système en danger</mesure>.

Rien dans un instrument ne distingue un signal qui ne montre rien parce que rien n'est cassé d'un signal qui ne montre rien parce qu'il regarde au mauvais endroit. La seule façon de trancher est de faire échouer quelque chose exprès, à un moment choisi, en regardant. Déclencher chaque panneau une fois et confirmer qu'il bouge, car un panneau qu'on n'a jamais vu réagir est une décoration. Envoyer une alerte et attendre le téléphone. Tuer un pod sous charge et lire ce que le compteur de redémarrages affiche, c'est-à-dire zéro, puisque le pod tué n'existe plus.

C'est ce que le cours qui accompagne ce texte fait faire. Chaque module pose un décor sur un cluster jetable, envoie de la charge, demande une prédiction écrite avant d'ouvrir le premier dashboard, puis casse quelque chose. Le pari écrit est ce qui sépare lire une conclusion de l'apprendre : « la colonne à zéro échec est la pire » enseigne quelque chose à qui a parié sur elle, et rien à qui le lit dans un tableau.

---

# Checklist pratique

```
article   : introduction-observabilite
page      : checklist
fichier   : blog/introduction-observabilite/fr/09-checklist.html
surtitre  : Chapitre 9
lecture   : 2 min
```

Chaque ligne vient de quelque chose qui a d'abord mal tourné, quelque part dans ce texte ou dans sa suite.

## En instrumentant le service {#en-instrumentant-le-service}

- Émettre un identifiant de trace sur chaque requête, et le mettre dans [chaque ligne de log](#/fr/blog/introduction-observabilite/trois-piliers#la-colle). Rien d'autre dans cette liste ne compte autant.
- Formater chaque horodatage avec son décalage, et fixer [un seul fuseau partout](#/fr/blog/observabilite-aller-plus-loin/lire-une-serie#une-seule-horloge), y compris le défaut des vues ad hoc.
- Ajouter des [exemplars](#/fr/blog/introduction-observabilite/instrumenter#les-exemplars), pour qu'un point sur un graphe puisse ouvrir une requête réelle.
- Ajouter les deux ou trois [compteurs métier](#/fr/blog/introduction-observabilite/instrumenter#les-metriques-metier) qui disent à quoi sert le service. Ce sont eux qui rendent un incident lisible à quelqu'un d'autre que son auteur.

## En écrivant les sondes {#en-ecrivant-les-sondes}

- Ne jamais mettre une vérification de dépendance dans une [liveness](#/fr/blog/observabilite-aller-plus-loin/sondes#jamais-de-dependance). Elle peut aller dans la readiness, si retirer le pod du Service aide vraiment.
- Écrire le délai et le nombre d'échecs de chaque sonde, sans se fier aux défauts, et donner à la liveness [un délai généreux](#/fr/blog/observabilite-aller-plus-loin/sondes#une-sonde-qui-ne-touche-a-rien). Elle existe pour attraper un processus définitivement bloqué, et elle ne doit jamais pouvoir échouer parce qu'il est occupé.

## En construisant les dashboards {#en-construisant-les-dashboards}

- Alerter et diagnostiquer sur le [taux](#/fr/blog/introduction-observabilite/lire-un-graphe#plat-n-est-pas-absent), jamais sur un compteur brut comparé à un seuil.
- Chercher [la mesure qui porte l'instant de l'événement](#/fr/blog/observabilite-aller-plus-loin/lire-une-serie#l-heure-du-scrape) quand l'heure exacte compte, plutôt que la position d'un échantillon.
- Déclencher [chaque panneau une fois](#/fr/blog/introduction-observabilite/dashboard-vert), exprès, et confirmer qu'il bouge. Un panneau qu'on n'a jamais vu réagir est une décoration.

## En montant l'alerting {#en-montant-l-alerting}

- Mettre en place des [alertes et leurs notifications](#/fr/blog/introduction-observabilite/alerting), téléphone ou mail, pour les pannes critiques.
- Corriger à la source toute alerte qui reste active en permanence, dès le premier jour. Le silence doit être l'état normal.

## En déployant {#en-deployant}

- Garder dashboards et règles d'alerte [dans le dépôt](#/fr/blog/observabilite-aller-plus-loin/livrer), et ne jamais coller un panneau depuis l'interface web.
- Poser une annotation de déploiement sur les dashboards.
- Retenir qu'un run vert rapporte que l'état désiré a été écrit, et rien du tout sur sa santé.

:::regle
Poser au système qui tourne une question dont la réponse serait différente en cas d'erreur. Pas « est-ce que ma commande a réussi », mais « le monde est-il maintenant différent de la façon dont je le voulais ».
:::

---

# L'observabilité, pour aller plus loin

```
article   : observabilite-aller-plus-loin
page      : accueil
fichier   : blog/observabilite-aller-plus-loin/fr/00-accueil.html
surtitre  : Introduction
lecture   : 1 min
```

La suite de l'[introduction à l'observabilité](#/fr/blog/introduction-observabilite). Elle en suppose l'image mentale : métriques, traces et logs, la pile de référence, compteurs et taux, et l'idée qu'un dashboard vert est une hypothèse.

Trois choses tournent mal une fois les bases en place. Un graphe montre la forme que la requête lui a donnée, et non celle de l'incident. Une sonde Kubernetes est une commande et non une mesure, et elle peut abattre un service sain. Un pipeline rapporte vert alors que la version neuve n'a jamais démarré.

Comme l'introduction, ce texte vient de neuf pannes provoquées sous charge réelle sur un serveur virtuel, et tout ce qui y est chiffré a été constaté.

---

# Lire une série temporelle

```
article   : observabilite-aller-plus-loin
page      : lire-une-serie
fichier   : blog/observabilite-aller-plus-loin/fr/01-lire-une-serie.html
surtitre  : Chapitre 1
lecture   : 3 min
```

Un graphe a l'air d'une fenêtre sur le système. C'en est une reconstruction, faite de points collectés à intervalle régulier puis passés dans une requête. L'introduction a donné la différence entre un compteur plat et une série absente, et l'idée qu'un taux se calcule sur une fenêtre. Voici les pièges qui restent.

## Le bord droit du graphe {#le-bord-droit}

On pourrait être tenté de lire tout mouvement à la droite de la courbe comme « il se passe quelque chose maintenant ». Mais le bord droit est simplement l'endroit où la donnée s'arrête, c'est-à-dire maintenant, et chaque graphe finit toujours là, qu'il se passe quelque chose ou non.

Un dashboard qui se rafraîchit tout seul recrée cette impression toutes les quelques secondes. Une ligne qui remonte légèrement au bord droit n'annonce rien, car c'est le dernier échantillon, bruité comme les autres, qui n'a pas encore de voisin pour le lisser. Attendons le rafraîchissement suivant avant de réveiller quelqu'un.

## La fenêtre d'une requête {#la-fenetre}

Un taux se calcule sur une fenêtre de temps, choisie à chaque requête : la variation du compteur sur la fenêtre, divisée par sa durée. Cette fenêtre porte deux pièges, qui tirent en sens opposé.

Une fenêtre trop large étale un événement court. Un incident de six secondes, moyenné sur une minute, dessine une bosse d'une minute de large, et rien n'est cassé dans le graphe. Cette bosse est celle d'une moyenne mobile idéale. La fonction rate() de Prometheus travaille sur les points observés et extrapole aux bords de la fenêtre, donc une requête réelle donne un chiffre un peu différent, mais la forme est la même.

:::schema schema-fenetre-rate
titre: A real 6-second incident, and what a moving average shows of it depending on the chosen window width
voir: Un incident reel de 6 secondes, et un curseur de fenetre de requete. La courbe de verite ne bouge jamais, la courbe affichee s'elargit et s'aplatit a mesure que la fenetre grandit.
:::

Une fenêtre trop étroite cache un événement. Une requête qui demande l'augmentation sur les quinze dernières minutes rend zéro pour tout ce qui s'est passé avant, même si le compteur brut, lui, porte encore la trace.

Pour un post-mortem, il vaut donc mieux lire d'abord le compteur brut, et ne passer à une fenêtre qu'une fois l'incident situé sur la ligne du temps. Et quand la durée réelle d'un événement compte, il faut une source qui porte des horodatages exacts, comme les events Kubernetes, car aucune moyenne glissante ne peut résoudre quelques secondes.

## L'heure du scrape {#l-heure-du-scrape}

La position d'un point sur la ligne du temps est le moment où il a été collecté, pas le moment où l'événement a eu lieu. Admettons un conteneur tué à 11:21:31, d'après l'horodatage de sa fin, avec une collecte toutes les deux minutes. Le panneau l'affiche à 11:23, parce que la collecte suivante a eu lieu à ce moment-là. Deux minutes d'erreur suffisent à accuser le mauvais déploiement. Quand l'instant exact compte, il faut chercher une métrique qui porte l'horodatage de l'événement comme valeur, pas la position de l'échantillon.

## Une seule horloge {#une-seule-horloge}

Rien ne dérive dans le stockage, car les bases de métriques, de logs et de traces stockent toutes un instant sous forme de nombre, sans fuseau attaché. Le risque est à l'affichage, et dans le texte des lignes de log.

À l'affichage, chaque outil a son propre réglage de fuseau, et Grafana en a deux : un pour les dashboards, un pour les vues ad hoc. Sans décision, une même panne se lit à 12:50 sur un écran et à 14:50 sur l'autre. Décider de l'UTC et l'appliquer partout.

Dans les lignes de log, le piège est le format :

```
2026-08-20 12:16:24,793 INFO ...      ambigu pour toujours
2026-08-20T13:07:43.370Z INFO ...     le décalage est porté dans la ligne
```

Rendu sans décalage, le même instant dans deux fuseaux produit deux lignes indiscernables, à deux heures d'écart, et rien dans la ligne ne dit laquelle est laquelle. Toujours formater les horodatages avec le décalage inclus.

:::regle
Un graphe montre la forme que la requête lui a donnée, pas la forme de l'incident.
:::

---

# Les sondes sont des commandes

```
article   : observabilite-aller-plus-loin
page      : sondes
fichier   : blog/observabilite-aller-plus-loin/fr/02-sondes.html
surtitre  : Chapitre 2
lecture   : 4 min
```

Un healthcheck est un endpoint HTTP qu'un service expose pour dire s'il va bien, et qu'un autre programme appelle à intervalle régulier. Docker, un load balancer ou un orchestrateur en ont tous un. Sur Kubernetes, c'est l'agent qui tourne sur chaque machine (kubelet) qui pose la question, et on parle de sonde.

Une sonde ressemble à de la supervision mais c'est une commande, puisque le kubelet agit sur la réponse, tout de suite et sans demander. Sur Kubernetes, une sonde n'existe que si on la déclare, et sans sonde le kubelet tient le conteneur pour vivant et prêt.

## Deux sondes, et ce que déclenche chaque échec {#deux-sondes}

:::tableau legende="Les deux sondes, la question qu'elles posent, ce que fait un échec."

| sonde | la question posée | en cas d'échec |
|---|---|---|
| <jargon mot="liveness">liveness</jargon> | un redémarrage peut-il réparer ce processus ? | le kubelet **tue** le conteneur |
| <jargon mot="readiness">readiness</jargon> | ce pod peut-il prendre du trafic maintenant ? | il est **retiré** du Service, et continue de tourner |

:::

Le Service est l'adresse stable derrière laquelle les pods se relaient, et une requête qui lui arrive est envoyée à l'un des pods prêts. Un pod retiré du Service continue de tourner, il ne reçoit juste plus rien.

:::regle
Un échec de liveness détruit, un échec de readiness redirige seulement.
:::

## Jamais de dépendance dans une liveness {#jamais-de-dependance}

Une liveness répond à une seule question : ce processus est-il définitivement bloqué, par un deadlock ou une boucle d'événements qui ne tournera plus ?

Elle ne doit donc vérifier ni la base, ni un autre service, ni le réseau, car la réaction en chaîne est mécanique. Si la base tombe et que la liveness vérifie la base, tous les pods échouent leur sonde au même moment, donc le kubelet les tue tous, en boucle. La panne de base devient une panne de base plus une perte totale du service.

:::schema schema-reaction-chaine
titre: Final state: readiness failing, the four instances out of service but still running, database restored
titre: Final state: liveness failing, the four instances killed and restarted in a loop, database restored but the backoff goes on
titre: Four instances and a database, during and after an outage
voir: Quatre instances et une base. Un interrupteur « la liveness interroge la base », un bouton pour couper la base. Le compteur de redemarrages reste a zero dans le bon scenario et grimpe dans le mauvais.
:::

Le test à appliquer : si le remède n'est pas « tuer ce processus et en démarrer un nouveau », cette vérification n'a rien à faire dans une liveness. Une vérification de dépendance peut aller dans la readiness, dont le verdict retire un pod du Service sans rien détruire. Encore faut-il que retirer ce pod aide, car si vingt pods dépendent de la même base et échouent tous leur readiness, le Service n'a plus personne derrière lui. Un service qui peut encore répondre en mode dégradé, depuis un cache ou sur certaines routes, gagne parfois à rester prêt.

Dans le doute, on peut tout à fait ne pas déclarer de liveness du tout. Le kubelet ne tuera alors jamais le processus, et c'est un défaut bien plus sûr qu'une sonde mal écrite.

## Une sonde qui ne touche à rien {#une-sonde-qui-ne-touche-a-rien}

Admettons un service sous forte charge : vingt requêtes par seconde, chacune prenant trois secondes, contre un pool de vingt threads. Sa liveness est aussi simple que possible, elle ne vérifie rien et renvoie une réponse fixe tout de suite.

:::devine
question: Sous cette charge, que fait la liveness ?
options: ['Elle répond, puisqu\'elle ne fait rien', 'Elle échoue, faute de thread pour répondre', 'Elle ralentit mais tient dans le délai']
bonne: 1

reponse:

Elle échoue. Un endpoint qui ne fait rien a quand même besoin d'un thread pour répondre, et les vingt sont occupés.

:::

Le délai de réponse toléré vaut une seconde par défaut, et trois échecs de suite suffisent pour tuer. Avec ces deux défauts laissés tels quels, la sonde a échoué <mesure valeur="2 fois sur 3">sous cette charge, à un cycle du crash loop, avec une application saine</mesure>. Une sonde qui ne touche à rien n'est pas une sonde qui n'a besoin de rien.

:::regle
Une liveness ne doit pas pouvoir échouer à cause de la charge.
:::

Quand elle y est sensible, une surcharge passagère devient un <jargon mot="crash loop">crash loop</jargon>, et le crash loop détruit la capacité qui aurait absorbé la surcharge. Le premier remède est d'écrire les deux valeurs, plus larges que leurs défauts, pour qu'une charge passagère ne devienne pas une boucle de redémarrages. La saturation, elle, reste à traiter à part. C'est la readiness qui a le droit de réagir à la charge, parce qu'elle retire du trafic sans rien détruire.

## Deux messages d'échec qui veulent dire le contraire {#deux-messages-opposes}

En lisant des échecs de sonde dans les events, cette distinction est le premier tri :

- « connection refused » : rien n'écoute. Le processus démarre, ou il est mort.
- « deadline exceeded » ou « timeout » : quelque chose écoute et n'a pas répondu à temps. Sous forte charge, c'est un indice sérieux de saturation. Mais un deadlock, une pause du garbage collector ou une dépendance appelée par erreur donnent le même message, donc c'est un signal à interpréter et non un diagnostic.

## Un seul bit de sortie {#un-seul-bit-de-sortie}

Vient un jour où il faut exprimer « le service marche, sauf que l'upload de fichier est cassé parce que le stockage de fichiers est en panne ». Cette nuance n'a pas sa place dans une sonde, car une sonde a un seul bit de sortie et le kubelet agit dessus sans nuance. La santé fine va dans les métriques et les traces : des taux d'erreur par route, et des traces qui montrent quelle dépendance a échoué.

Une application peut donc être vivante, prête, et lente. Un p99 de huit secondes à côté d'un healthcheck qui répond succès est cohérent. Si ça surprend, la sonde ne mesurait pas ce qu'on supposait.

---

# L'observabilité dans le pipeline

```
article   : observabilite-aller-plus-loin
page      : livrer
fichier   : blog/observabilite-aller-plus-loin/fr/03-livrer.html
surtitre  : Chapitre 3
lecture   : 2 min
```

Les dashboards et les alertes sont du logiciel. Ils ont des versions et des bugs, ils cassent quand autre chose change, et s'ils n'existent que sous forme de clics faits dans une interface il y a dix-huit mois, ils finiront par se perdre. Il est donc vivement suggéré de les faire vivre dans le dépôt de code. Grafana sait les charger depuis des fichiers.

Admettons un pipeline qui construit une image à chaque commit, puis la déploie sur le cluster. Le job de déploiement vient de se terminer en vert.

:::devine
question: Que sait-on du service ?
options: ['La nouvelle version sert le trafic', 'La nouvelle version démarre', 'L\'état désiré a été écrit, rien de plus']
bonne: 2

reponse:

Un job de déploiement rapporte un seul fait, la commande a retourné sans erreur. Si l'image référencée n'existe pas, le run est vert, le déploiement enregistré comme réussi, et chaque pod neuf est bloqué au démarrage pendant que les anciens continuent de servir.

:::

:::regle
Un pipeline vert n'est pas un service sain.
:::

Un déploiement n'est pas terminé quand la commande retourne mais quand la version neuve sert le trafic. Le pipeline devrait donc attendre que les pods neufs soient prêts, et les minutes qui suivent un déploiement méritent plus d'attention que le reste du temps. C'est là que le [checkout lent de l'introduction](#/fr/blog/introduction-observabilite/trois-piliers#le-checkout-lent) s'est refermé en trois clics : la phrase décisive était « le cache est vide depuis le déploiement de 14h02 », et elle n'était possible que parce que le déploiement était visible sur le graphe. Une annotation sur les dashboards à chaque déploiement, que Grafana fait nativement, est le meilleur rapport valeur sur effort de tout le pipeline. Sans elle, la première question de chaque incident est « est-ce qu'on a livré quelque chose récemment ? », et quelqu'un va vérifier à la main.

## Ce qu'il faut retenir {#ce-qu-il-faut-retenir}

- Pour un post-mortem, lire d'abord le compteur brut, et choisir la fenêtre une fois l'incident situé. Quand l'instant exact compte, chercher une source qui porte l'horodatage de l'événement.
- Ne jamais mettre une dépendance partagée dans une liveness. Écrire le délai et le nombre d'échecs de chaque sonde, et donner à la liveness un délai généreux.
- Faire attendre au pipeline que les pods neufs soient prêts, et poser une annotation de déploiement sur les dashboards.
- Tuer un pod sous charge, exprès, et lire ce que le compteur de redémarrages affiche : zéro, puisque le pod tué n'existe plus. Un instrument qu'on n'a jamais vu réagir est une décoration.

---
