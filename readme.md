# Site personnel

Site statique en français, sans étape de build, servi tel quel par GitHub
Pages. Une seule coquille Vue chargée depuis un CDN, deux choses dedans :

- `cv/` : le CV, page principale du site (`#/`), à concevoir (voir son « À faire »).
- `blog/` : les articles, du plus récent au plus ancien. Un article a une ou
  plusieurs pages (`blog/introduction-observabilite/` en a douze), une date de
  publication et une date de mise à jour.

## Lancer le site

```sh
npm install --ignore-scripts --save-exact
npm start
```

`npm start` sert le dossier avec `sirv` sur `http://localhost:4321`. Aucune
étape de build : les fichiers se déposent tels quels sur n'importe quel
hébergeur statique.

## Ajouter un article

Une entrée dans `ARTICLES` de `js/sections.js` (`slug`, `titre`, `publie`,
`maj`, `ecriture` qui vaut `main` ou `ia` et devient un badge à côté des
dates, et ses `pages` avec `slug`, `titre`, `minutes`, `fichier`), et un
fragment `<article>` par page, avec un `<h1>` et des `<h2 id="...">`
uniques. Le manifeste est la source unique : liste du blog, sommaire, routeur
et navigation précédent/suivant en dérivent tous. Les routes sont
`#/fr/blog/article` et `#/fr/blog/article/page`. Un article d'une seule page
n'a pas de sommaire.

Chaque article et le CV ont une entrée par langue (`fr`, `en`). Une langue
absente veut dire pas de traduction : l'article ne figure pas dans la liste de
cette langue et le bouton de langue n'apparaît pas. Les chaînes de l'interface
et des composants vivent dans `js/i18n.js`, le lexique des bulles de jargon
dans `js/lexique.js`, un objet par langue. Les textes des schémas (SVG, boutons, légendes) sont en anglais dans les deux
langues : un schéma se lit en anglais dans le métier, et la compréhension de
l'article doit survivre sans lui.

Le texte s'écrit en markdown dans `sources/`, avec les blocs `:::regle`,
`:::devine`, `:::schema`, `:::tableau`, `:::aller-plus-loin` et les balises
`<jargon>` et `<mesure>`. La conversion en fragment HTML se fait à la main
(ou par une IA) en une passe, il n'y a pas d'importateur : les pages sont
courtes et le site est petit. `scripts/exporter.mjs` fait le chemin inverse
et sert de contrôle : `sources/site-texte.fr.md` et `sources/site-texte.en.md` sont son résultat (`node scripts/exporter.mjs en`), et son texte
doit coïncider avec celui des sources.

## `npm run check`

Lance `scripts/verifier.mjs` sur toutes les pages des deux langues, CV compris :
zéro tiret cadratin, dépliants fermés et jamais imbriqués, un seul `<h1>` par
page, toute balise standard ou enregistrée par `js/composants/index.js`, tout
mot de `<jargon>` présent dans `js/lexique.js` et enveloppé une seule fois,
chaque `<h2>` avec un `id` unique. Le nombre de mots est affiché comme une
observation, pas comme une limite.

## Ajouter un composant

Un fichier dans `js/composants/socle/` ou `js/composants/schemas/`, un
enregistrement dans `js/composants/index.js`, et ses styles dans
`css/composants.css`. Aucun import CDN dans ce dossier : le vérificateur
importe ce graphe sous Node, qui refuse les imports `https://`.

Cinq schémas restent enregistrés sans page (`agregat`, `chaine-alerte`,
`choisir-sa-mort`, `connexions`, `trois-colonnes`) : ils illustrent des
pannes qui ont quitté l'introduction pour un cours, et ils sont gardés pour
lui.

## Publication

GitHub Pages sur la branche `main`, à la racine. Un nom de domaine se pose
avec un fichier `CNAME` à la racine et un enregistrement DNS. Le routage par
hash ne demande aucune configuration serveur.

## Ce qui reste à vérifier au navigateur

`npm run check` couvre ce qu'un script peut constater. Restent à regarder à
la main : `prefers-reduced-motion` sur chaque schéma, la largeur de 375 px
sans défilement horizontal, la bascule de thème sur chaque schéma, et chaque
ancre `#/section/slug#id` ouverte dans un onglet neuf.
