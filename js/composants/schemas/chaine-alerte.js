// Cinq boîtes sur une seule ligne, reliées par un chemin rectiligne : règle
// évaluée, alerte (pending puis firing), routeur, récepteur, appareil. Le
// pulse est un point animé le long de ce chemin par offset-path/
// offset-distance, jamais par une boucle requestAnimationFrame : l'animation
// est purement déclarative en CSS (voir composants.css), pilotée par une
// seule classe posée ici selon l'état du récepteur.
//
// Sur « null », le pulse s'arrête à 75 % du chemin (le récepteur, la
// quatrième boîte) : l'appareil ne s'allume jamais. Sur « ntfy », il va
// jusqu'à 100 % (l'appareil). Les positions des cinq boîtes sont à 0, 25,
// 50, 75 et 100 % du même chemin, donc le pourcentage d'arrêt suffit à
// désigner la boîte sans dupliquer les coordonnées.
//
// Sous prefers-reduced-motion, deux panneaux statiques remplacent
// l'animation : chacun montre un état FIXE (celui de son propre scénario),
// jamais celui du récepteur actuellement sélectionné par les boutons. Deux
// jeux d'étiquettes séparés existent pour ça : ETAPES_BASE, réutilisé tel
// quel dans les deux panneaux, et le libellé dynamique de la boîte
// « appareil », qui ne s'applique qu'à la scène animée du dessous.
//
// Etat en data(), jamais setup()/ref : voir la note de devine.js.
const ETAPES_BASE = [
  { id: 'regle', libelle: 'règle évaluée', x: 70, largeur: 110 },
  { id: 'alerte', libelle: 'alerte : pending puis firing', x: 220, largeur: 110 },
  { id: 'routeur', libelle: 'routeur (Alertmanager)', x: 370, largeur: 110 },
  { id: 'recepteur', libelle: 'récepteur', x: 520, largeur: 90 },
  { id: 'appareil', libelle: 'appareil', x: 620, largeur: 40 }
]

export const SchemaChaineAlerte = {
  data () {
    return { recepteur: 'null', reduitMotion: false, base: ETAPES_BASE }
  },
  computed: {
    estNtfy () { return this.recepteur === 'ntfy' },
    etapes () {
      return ETAPES_BASE.map(e => e.id === 'appareil'
        ? { ...e, libelle: this.estNtfy ? 'appareil : sonne' : 'appareil : reste éteint' }
        : e)
    },
    resultat () {
      return this.estNtfy
        ? "L'alerte est partie, a été routée, s'affiche dans l'interface, et le téléphone sonne."
        : "L'alerte est partie, elle a été routée, elle s'affiche dans l'interface, et personne n'a rien reçu."
    }
  },
  mounted () {
    this.reduitMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  },
  methods: {
    basculer (valeur) { this.recepteur = valeur }
  },
  template: `
    <div class="schema-chaine-alerte pleine-largeur">
      <div class="cae-bascule" role="group" aria-label="Récepteur configuré">
        <button type="button" class="cae-bouton" :class="{ 'est-actif': recepteur === 'null' }"
                :aria-pressed="recepteur === 'null'" @click="basculer('null')">récepteur : null</button>
        <button type="button" class="cae-bouton" :class="{ 'est-actif': recepteur === 'ntfy' }"
                :aria-pressed="recepteur === 'ntfy'" @click="basculer('ntfy')">récepteur : ntfy</button>
      </div>

      <template v-if="reduitMotion">
        <div class="cae-cote-a-cote">
          <div class="cae-panneau">
            <h3 class="cae-panneau-titre">null : le pulse s'arrête au récepteur</h3>
            <svg viewBox="0 0 660 110" role="img" aria-labelledby="cae-titre-null" preserveAspectRatio="xMidYMid meet">
              <title id="cae-titre-null">La chaîne s'arrête au récepteur, l'appareil reste éteint</title>
              <line class="cae-chemin" x1="70" y1="70" x2="620" y2="70" />
              <g v-for="e in base" :key="e.id">
                <rect class="cae-boite" :class="{ 'est-eteinte': e.id === 'appareil' }" :x="e.x - e.largeur / 2" y="50" :width="e.largeur" height="40" rx="4" />
                <text class="cae-texte" :x="e.x" y="105" text-anchor="middle">{{ e.id === 'appareil' ? 'appareil : reste éteint' : e.libelle }}</text>
              </g>
              <circle class="cae-point" cx="520" cy="70" r="6" />
            </svg>
          </div>
          <div class="cae-panneau">
            <h3 class="cae-panneau-titre">ntfy : le pulse atteint l'appareil</h3>
            <svg viewBox="0 0 660 110" role="img" aria-labelledby="cae-titre-ntfy" preserveAspectRatio="xMidYMid meet">
              <title id="cae-titre-ntfy">La chaîne va jusqu'à l'appareil, qui sonne</title>
              <line class="cae-chemin" x1="70" y1="70" x2="620" y2="70" />
              <g v-for="e in base" :key="e.id">
                <rect class="cae-boite" :class="{ 'est-allumee': e.id === 'appareil' }" :x="e.x - e.largeur / 2" y="50" :width="e.largeur" height="40" rx="4" />
                <text class="cae-texte" :x="e.x" y="105" text-anchor="middle">{{ e.id === 'appareil' ? 'appareil : sonne' : e.libelle }}</text>
              </g>
              <circle class="cae-point" cx="620" cy="70" r="6" />
            </svg>
          </div>
        </div>
      </template>

      <template v-else>
        <svg class="cae-svg" viewBox="0 0 660 110" role="img" aria-labelledby="cae-titre" preserveAspectRatio="xMidYMid meet">
          <title id="cae-titre">Une alerte parcourt la chaîne de la règle jusqu'à l'appareil, selon le récepteur configuré</title>
          <path class="cae-chemin" d="M 70,70 L 620,70" fill="none" />
          <g v-for="e in etapes" :key="e.id">
            <rect class="cae-boite" :class="{ 'est-allumee': e.id === 'appareil' && estNtfy, 'est-eteinte': e.id === 'appareil' && !estNtfy }"
                  :x="e.x - e.largeur / 2" y="50" :width="e.largeur" height="40" rx="4" />
            <text class="cae-texte" :x="e.x" y="105" text-anchor="middle">{{ e.libelle }}</text>
          </g>
          <circle class="cae-point" :class="estNtfy ? 'cae-va-loin' : 'cae-va-court'"></circle>
        </svg>
      </template>

      <p class="cae-resultat" role="status">{{ resultat }}</p>

      <ol class="cae-texte-liste">
        <li v-for="e in etapes" :key="e.id">{{ e.libelle }}</li>
      </ol>
    </div>
  `
}
