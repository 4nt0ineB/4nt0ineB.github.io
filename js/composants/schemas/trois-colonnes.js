// Le pari d'abord, le tableau ensuite : ce composant embarque lui-même le
// quatrième et dernier <devine> du site, parce que ce chapitre n'a de sens
// que si le lecteur choisit avant de voir. Le tableau complet vit dans le
// slot nommé "reponse" de <devine>, dont le gabarit conditionne déjà ce
// slot par un v-if sur repondu (voir socle/devine.js) : rien n'est écrit
// dans le DOM avant la réponse, ce n'est pas un simple masquage CSS.
//
// Options et lignes en data()/computed plutôt qu'en littéral inline dans le
// template : un texte français avec apostrophe ("d'échec", "l'application")
// casserait la petite grammaire d'expression que Vue lit dans un attribut
// comme :options="[...]", qui utilise des guillemets simples pour chaque
// chaîne. Passer par une propriété évite d'avoir à éviter l'apostrophe.
//
// Etat en data(), jamais setup()/ref : voir la note de devine.js.
const COLONNES = ['rien', 'limite de concurrence', 'rate limit au bord']

const LIGNES = [
  { label: 'échecs vus par le client', valeurs: ['0 %', '40,8 %', '74,5 %'], condamne: false },
  { label: "latence d'un refus", valeurs: ['aucun', '1,48 ms', '0,70 ms'], condamne: false },
  { label: 'p95 des requêtes servies', valeurs: ['4,44 s', '3,00 s', '3,08 s'], condamne: true },
  { label: 'itérations abandonnées', valeurs: ['56', '19', '6'], condamne: false },
  { label: 'pool de clients simulés', valeurs: ['8 à 73', '11 à 37', '1 à 25'], condamne: false },
  { label: 'liveness en timeout', valeurs: ['oui, 2 sur 3', 'non', 'non'], condamne: true },
  { label: 'instances sorties du service', valeurs: ['4 sur 4', 'aucune', 'aucune'], condamne: true }
]

export const SchemaTroisColonnes = {
  data () {
    return { colonnes: COLONNES, lignes: LIGNES }
  },
  computed: {
    apercu () { return this.lignes.slice(0, 1) },
    options () {
      return [
        'Aucune protection (échecs à 0 %)',
        'Une limite de concurrence dans l’application (échecs à 40,8 %)',
        'Un rate limit au bord (échecs à 74,5 %)'
      ]
    }
  },
  template: `
    <div class="schema-trois-colonnes pleine-largeur">
      <tableau-mesure legende="Un seul chiffre, avant le pari : le taux d'échec vu par le client, sur trois façons de traiter le même excès de demande.">
        <table class="tc-tableau">
          <thead>
            <tr><th scope="col">mesure</th><th v-for="c in colonnes" :key="c" scope="col">{{ c }}</th></tr>
          </thead>
          <tbody>
            <tr v-for="l in apercu" :key="l.label">
              <th scope="row">{{ l.label }}</th>
              <td v-for="(v, i) in l.valeurs" :key="i">{{ v }}</td>
            </tr>
          </tbody>
        </table>
      </tableau-mesure>

      <devine
        question="Vingt requêtes par seconde de trois secondes de travail, contre quatre instances : laquelle des trois colonnes a produit le pire service au total ?"
        :options="options"
        :bonne="0">
        <template #reponse>
          <tableau-mesure legende="Le tableau complet. Les trois lignes marquées condamnent la colonne « rien », malgré ses 0 % d'échec.">
            <table class="tc-tableau">
              <thead>
                <tr><th scope="col">mesure</th><th v-for="c in colonnes" :key="c" scope="col">{{ c }}</th></tr>
              </thead>
              <tbody>
                <tr v-for="l in lignes" :key="l.label" :class="{ 'tc-condamne': l.condamne }">
                  <th scope="row">{{ l.condamne ? '⚠ ' : '' }}{{ l.label }}</th>
                  <td v-for="(v, i) in l.valeurs" :key="i">{{ v }}</td>
                </tr>
              </tbody>
            </table>
          </tableau-mesure>
          <p class="tc-note">Le p95 des requêtes servies tombe à 3,00 s dès qu'un refus existe quelque
          part : la file n'a pas rétréci, elle a disparu. Le pool de clients simulés cesse de gonfler
          pour la même raison, un refus rendant son thread au client tout de suite plutôt que de le
          garder en attente. Les trois lignes marquées ⚠ sont celles où la colonne « rien » a perdu :
          c'est elle qui a fait timeouter la liveness et sorti les quatre instances du service.</p>
        </template>
      </devine>
    </div>
  `
}
