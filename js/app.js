import { createApp, defineComponent, ref, shallowRef, computed, onMounted, nextTick } from 'https://cdn.jsdelivr.net/npm/vue@3.5.13/dist/vue.esm-browser.prod.js'
import { SECTIONS, SECTIONS_EN_TETE, ACCUEIL, page, voisins } from './sections.js'
import { routeCourante, lien, surChangement } from './routeur.js'
import { themeEffectif, basculerTheme } from './theme.js'
import { enregistrer } from './composants/index.js'
import { observer } from './visibilite.js'

const SITE = 'Antoine Bastos'

// Une page compile une fois par session. Sans ce cache, chaque retour
// sur une page la recompilerait.
const cache = new Map()

async function chargerFragment (fichier) {
  if (cache.has(fichier)) return cache.get(fichier)
  const reponse = await fetch(fichier)
  if (!reponse.ok) throw new Error(`${fichier} : HTTP ${reponse.status}`)
  const composant = defineComponent({ template: await reponse.text() })
  cache.set(fichier, composant)
  return composant
}

const App = defineComponent({
  setup () {
    const route = ref(routeCourante())
    const vue = shallowRef(null)
    const erreur = ref(null)
    const theme = ref(themeEffectif())
    const avancement = ref(0)

    const section = computed(() => SECTIONS[route.value.section] ?? null)
    // La liste du blog est rendue par la coquille, pas par un fragment :
    // elle dérive du manifeste, donc elle ne peut pas se désynchroniser.
    const liste = computed(() => route.value.section === 'blog' && route.value.slug === null)
    const courante = computed(() => {
      if (route.value.section === null) return ACCUEIL
      if (liste.value) return null
      return page(route.value.section, route.value.slug)
    })
    const cote = computed(() => courante.value && route.value.section ? voisins(route.value.section, courante.value.slug) : { precedent: null, suivant: null })

    // Deux navigations rapprochées peuvent avoir leurs promesses résolues
    // dans le désordre. `demande` fige la route visée au moment de l'appel :
    // après chaque `await`, une navigation plus récente abandonne l'affichage
    // silencieusement.
    async function charger () {
      const demande = route.value
      erreur.value = null
      vue.value = null
      if (route.value.section !== null && section.value === null) { erreur.value = 'introuvable'; return }
      if (liste.value) { document.title = `Blog | ${SITE}`; window.scrollTo(0, 0); return }
      if (courante.value === null) { erreur.value = 'introuvable'; return }
      try {
        const c = await chargerFragment(courante.value.fichier)
        if (route.value !== demande) return
        vue.value = c
        document.title = courante.value === ACCUEIL ? SITE : `${courante.value.titre} | ${SITE}`
        await nextTick()
        if (route.value !== demande) return
        const cible = demande.ancre ? document.getElementById(demande.ancre) : null
        if (cible) cible.scrollIntoView()
        else window.scrollTo(0, 0)
        observer()
      } catch (e) {
        if (route.value !== demande) return
        erreur.value = e.message
      }
    }

    function majAvancement () {
      const hauteurDefilable = document.documentElement.scrollHeight - window.innerHeight
      avancement.value = hauteurDefilable > 0 ? Math.min(1, window.scrollY / hauteurDefilable) : 0
    }

    onMounted(() => {
      charger()
      surChangement(() => { route.value = routeCourante(); charger() })
      window.addEventListener('scroll', majAvancement, { passive: true })
      majAvancement()
    })

    return { SITE, SECTIONS, SECTIONS_EN_TETE, route, section, liste, courante, vue, erreur, theme, avancement, cote, lien,
             bascule: () => { theme.value = basculerTheme() } }
  },
  template: `
    <div class="progression" :style="{ '--avancement': avancement }"></div>
    <header class="entete">
      <a class="titre-site" href="#/">{{ SITE }}</a>
      <nav class="sections" aria-label="Sections">
        <a v-for="nom in SECTIONS_EN_TETE" :key="nom" :href="lien(nom)"
           :aria-current="nom === route.section ? 'page' : null">{{ SECTIONS[nom].titre }}</a>
      </nav>
      <button type="button" class="bascule-theme" @click="bascule"
              :aria-label="theme === 'dark' ? 'Passer au thème clair' : 'Passer au thème sombre'">
        {{ theme === 'dark' ? 'Clair' : 'Sombre' }}
      </button>
    </header>
    <div class="coquille" :class="{ 'sans-sommaire': !section || !section.sommaire, ['section-' + (route.section ?? 'cv')]: true }">
      <nav v-if="section && section.sommaire" class="sommaire" aria-label="Sommaire">
        <a v-for="p in section.pages" :key="p.slug" :href="lien(route.section, p.slug)"
           :aria-current="courante && p.slug === courante.slug ? 'page' : null">
          {{ p.titre }}
          <span v-if="p.minutes" class="minutes">{{ p.minutes }} min</span>
        </a>
        <p v-if="section.pages.length === 0" class="sommaire-vide">Rien encore.</p>
      </nav>
      <main id="contenu" class="contenu">
        <template v-if="liste">
          <h1>Blog</h1>
          <p v-if="section.pages.length === 0">Aucun article pour l'instant.</p>
          <ul v-else class="liste-articles">
            <li v-for="p in section.pages" :key="p.slug">
              <a :href="lien('blog', p.slug)">{{ p.titre }}</a>
              <span class="date">{{ p.date }}</span>
            </li>
          </ul>
        </template>
        <component :is="vue" v-else-if="vue" :key="courante.fichier" />
        <p v-else-if="!erreur">Chargement de la page.</p>
        <div v-else>
          <h1>Page introuvable</h1>
          <p>Cette page n'existe pas. Les sections du site :</p>
          <ul>
            <li v-for="(s, nom) in SECTIONS" :key="nom"><a :href="lien(nom)">{{ s.titre }}</a></li>
          </ul>
        </div>
        <nav v-if="cote.precedent || cote.suivant" class="nav-chapitre">
          <a v-if="cote.precedent" :href="lien(route.section, cote.precedent.slug)">Précédent : {{ cote.precedent.titre }}</a>
          <a v-if="cote.suivant" :href="lien(route.section, cote.suivant.slug)">Suivant : {{ cote.suivant.titre }}</a>
        </nav>
      </main>
    </div>
  `
})

const app = createApp(App)
enregistrer(app)
app.mount('#app')
