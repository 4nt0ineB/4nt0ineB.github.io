# Site personnel

Site statique en français, sans étape de build, servi tel quel par GitHub
Pages. Trois sections dans une seule coquille Vue chargée depuis un CDN :

- `observabilite/` : l'introduction à l'observabilité, douze pages.
- `blog/` : les articles, un fragment par article.
- `cv/` : le CV, page principale du site (`#/`), à concevoir (voir son « À faire »).

## Lancer le site

```sh
npm install --ignore-scripts --save-exact
npm start
```

`npm start` sert le dossier avec `sirv` sur `http://localhost:4321`. Aucune
étape de build : les fichiers se déposent tels quels sur n'importe quel
hébergeur statique.

## Ajouter une page

Une entrée dans `js/sections.js` (`slug`, `titre`, `minutes`, `fichier`, et
`date` pour un article), et un fragment `<article>` dans le dossier de la
section, avec un `<h1>` et des `<h2 id="...">` uniques. Le manifeste est la
source unique : sommaire, routeur, liste du blog et navigation
précédent/suivant en dérivent tous. Les routes sont `#/section/slug`.

Le texte s'écrit en markdown dans `sources/`, avec les blocs `:::regle`,
`:::devine`, `:::schema`, `:::tableau`, `:::aller-plus-loin` et les balises
`<jargon>` et `<mesure>`. La conversion en fragment HTML se fait à la main
(ou par une IA) en une passe, il n'y a pas d'importateur : les pages sont
courtes et le site est petit. `scripts/exporter.mjs` fait le chemin inverse
et sert de contrôle : `sources/site-texte.md` est son résultat, et son texte
doit coïncider avec celui des sources.

## `npm run check`

Lance `scripts/verifier.mjs` sur toutes les pages de toutes les sections :
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

## À faire, quand le premier article arrive

- **Plusieurs langues.** La langue en tête de route (`#/en/blog/slug`, rien pour
  le français), une entrée par langue dans le manifeste reliée par un `id`
  commun, un bouton de langue dans l'en-tête affiché seulement quand la page
  courante a une traduction, l'attribut `lang` du document qui suit la route.
  Le CV suit la même règle.
- **Un lexique par langue**, et le vérificateur qui choisit celui de la langue
  de la page.
