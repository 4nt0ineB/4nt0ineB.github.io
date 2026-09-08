import { createApp, defineComponent, ref, shallowRef, computed, onMounted, nextTick } from 'https://cdn.jsdelivr.net/npm/vue@3.5.13/dist/vue.esm-browser.prod.js'
import { CV, ECRITURE, articlesParDate, article, pageDe, voisins } from './sections.js'
import { routeCourante, lienArticle, surChangement } from './routeur.js'
import { themeEffectif, basculerTheme } from './theme.js'
import { enregistrer } from './composants/index.js'
import { observer } from './visibilite.js'

const SITE = 'Antoine Bastos'
const DATE = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long' })

function dateLongue (iso) {
  return DATE.format(new Date(`${iso}T00:00:00`))
}

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

    const blog = computed(() => route.value.section === 'blog')
    // La liste du blog est rendue par la coquille, pas par un fragment :
    // elle dérive du manifeste, donc elle ne peut pas se désynchroniser.
    const liste = computed(() => blog.value && route.value.article === null)
    const courant = computed(() => blog.value && route.value.article ? article(route.value.article) : null)
    const courante = computed(() => {
      if (route.value.section === null || route.value.section === 'cv') return CV
      if (courant.value) return pageDe(courant.value, route.value.page)
      return null
    })
    const sommaire = computed(() => courant.value && courant.value.pages.length > 1)
    const cote = computed(() => courant.value && courante.value ? voisins(courant.value, courante.value.slug) : { precedent: null, suivant: null })

    // Deux navigations rapprochées peuvent avoir leurs promesses résolues
    // dans le désordre. `demande` fige la route visée au moment de l'appel :
    // après chaque `await`, une navigation plus récente abandonne l'affichage
    // silencieusement.
    async function charger () {
      const demande = route.value
      erreur.value = null
      vue.value = null
      if (liste.value) { document.title = `Blog | ${SITE}`; window.scrollTo(0, 0); return }
      if (courante.value === null) { erreur.value = 'introuvable'; return }
      try {
        const c = await chargerFragment(courante.value.fichier)
        if (route.value !== demande) return
        vue.value = c
        document.title = courante.value === CV ? SITE : `${courante.value.titre} | ${SITE}`
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

    return { SITE, CV, ECRITURE, route, blog, liste, courant, courante, sommaire, vue, erreur, theme, avancement, cote,
             articles: articlesParDate(), lienArticle, dateLongue,
             bascule: () => { theme.value = basculerTheme() } }
  },
  template: `
    <div class="progression" :style="{ '--avancement': avancement }"></div>
    <header class="entete">
      <a class="titre-site" href="#/">{{ SITE }}</a>
      <nav class="sections" aria-label="Sections">
        <a href="#/blog" :aria-current="blog ? 'page' : null">Blog</a>
      </nav>
      <button type="button" class="bascule-theme" @click="bascule"
              :aria-label="theme === 'dark' ? 'Passer au thème clair' : 'Passer au thème sombre'">
        {{ theme === 'dark' ? 'Clair' : 'Sombre' }}
      </button>
    </header>
    <div class="coquille" :class="{ 'sans-sommaire': !sommaire, 'section-cv': courante === CV }">
      <nav v-if="sommaire" class="sommaire" aria-label="Sommaire">
        <a v-for="p in courant.pages" :key="p.slug" :href="lienArticle(courant.slug, p.slug)"
           :aria-current="p.slug === courante.slug ? 'page' : null">
          {{ p.titre }}
          <span v-if="p.minutes" class="minutes">{{ p.minutes }} min</span>
        </a>
      </nav>
      <main id="contenu" class="contenu">
        <template v-if="liste">
          <h1>Blog</h1>
          <p v-if="articles.length === 0">Aucun article pour l'instant.</p>
          <ul v-else class="liste-articles">
            <li v-for="a in articles" :key="a.slug">
              <a :href="lienArticle(a.slug)">{{ a.titre }}</a>
              <time class="date" :datetime="a.publie">{{ dateLongue(a.publie) }}</time>
            </li>
          </ul>
        </template>
        <template v-else-if="vue">
          <p v-if="courant" class="dates">
            Publié le <time :datetime="courant.publie">{{ dateLongue(courant.publie) }}</time><template v-if="courant.maj !== courant.publie">,
            mis à jour le <time :datetime="courant.maj">{{ dateLongue(courant.maj) }}</time></template>
            <span v-if="courant.ecriture" class="badge-ecriture" :class="'ecriture-' + courant.ecriture"
                  :title="ECRITURE[courant.ecriture].detail">{{ ECRITURE[courant.ecriture].libelle }}</span>
          </p>
          <component :is="vue" :key="courante.fichier" />
        </template>
        <p v-else-if="!erreur">Chargement de la page.</p>
        <div v-else>
          <h1>Page introuvable</h1>
          <p>Cette page n'existe pas. <a href="#/blog">Les articles du blog</a>, ou <a href="#/">le CV</a>.</p>
        </div>
        <nav v-if="cote.precedent || cote.suivant" class="nav-chapitre">
          <a v-if="cote.precedent" :href="lienArticle(courant.slug, cote.precedent.slug)">Précédent : {{ cote.precedent.titre }}</a>
          <a v-if="cote.suivant" :href="lienArticle(courant.slug, cote.suivant.slug)">Suivant : {{ cote.suivant.titre }}</a>
        </nav>
      </main>
    </div>
  `
})

const app = createApp(App)
enregistrer(app)
app.mount('#app')
