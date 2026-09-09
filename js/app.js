import { createApp, defineComponent, ref, shallowRef, computed, onMounted, nextTick } from 'https://cdn.jsdelivr.net/npm/vue@3.5.13/dist/vue.esm-browser.prod.js'
import { pageFixe, CV, articlesParDate, article, pageDe, voisins } from './sections.js'
import { routeCourante, lien, surChangement } from './routeur.js'
import { LOCALES, TEXTES } from './i18n.js'
import { themeEffectif, basculerTheme } from './theme.js'
import { enregistrer } from './composants/index.js'
import { observer } from './visibilite.js'

const SITE = 'Antoine Bastos'
// Ordre d'affichage du sélecteur de langue, décision d'Antoine.
const ORDRE_LANGUES = ['en', 'fr']

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

    const locale = computed(() => route.value.locale)
    const T = computed(() => TEXTES[locale.value])
    const blog = computed(() => route.value.section === 'blog')
    // La liste du blog est rendue par la coquille, pas par un fragment :
    // elle dérive du manifeste, donc elle ne peut pas se désynchroniser.
    const liste = computed(() => blog.value && route.value.article === null)
    const courant = computed(() => blog.value && route.value.article ? article(route.value.article) : null)
    // La page hors blog : accueil, CV ou CV fancy.
    const fixe = computed(() => blog.value ? null : pageFixe(route.value.section, route.value.article))
    const estAccueil = computed(() => fixe.value?.slug === 'accueil')
    const estCv = computed(() => fixe.value !== null && !estAccueil.value)
    const estFancy = computed(() => fixe.value?.slug === 'fancy')
    // La version de l'article ou de la page fixe dans la langue courante, ou null.
    const version = computed(() => {
      if (!blog.value) return fixe.value?.[locale.value] ?? null
      return courant.value?.[locale.value] ?? null
    })
    const courante = computed(() => {
      if (version.value === null) return null
      if (courant.value) return pageDe(version.value, route.value.page)
      return version.value
    })
    const sommaire = computed(() => courant.value && version.value && courante.value !== null && version.value.pages.length > 1)
    const cote = computed(() => courant.value && version.value && courante.value
      ? voisins(version.value, courante.value.slug) : { precedent: null, suivant: null })

    // La même page dans l'autre langue, si elle existe. Sinon null et le
    // bouton n'apparaît pas : mieux vaut pas de bouton qu'une page absente.
    const autreLangue = computed(() => {
      const autre = LOCALES.find(l => l !== locale.value)
      if (liste.value) return lien(autre, 'blog')
      if (fixe.value) {
        if (!fixe.value[autre]) return null
        if (estAccueil.value) return lien(autre)
        return estFancy.value ? lien(autre, CV.slug, fixe.value.slug) : lien(autre, CV.slug)
      }
      const v = courant.value?.[autre]
      if (!v) return null
      const page = courante.value && v.pages.some(p => p.slug === courante.value.slug) ? courante.value.slug : null
      return lien(autre, 'blog', courant.value.slug, page)
    })

    // Les deux langues côte à côte : la courante en évidence, l'autre en lien
    // si la page existe dans cette langue, sinon en grisé.
    const langues = computed(() => ORDRE_LANGUES.map(code => ({
      code,
      courante: code === locale.value,
      href: code === locale.value ? null : autreLangue.value
    })))

    // Le numéro d'une page est celui de son chapitre dans le texte, l'accueil
    // étant le chapitre 0, sur deux chiffres comme les feuilles du CV.
    const numero = i => String(i).padStart(2, '0')
    const numeroPage = computed(() => {
      const pages = version.value?.pages ?? []
      return numero(Math.max(0, pages.findIndex(p => p.slug === courante.value?.slug)))
    })

    function dateLongue (iso) {
      return new Intl.DateTimeFormat(T.value.dateFormat, { dateStyle: 'long' }).format(new Date(`${iso}T00:00:00`))
    }

    // Deux navigations rapprochées peuvent avoir leurs promesses résolues
    // dans le désordre. `demande` fige la route visée au moment de l'appel :
    // après chaque `await`, une navigation plus récente abandonne l'affichage
    // silencieusement.
    async function charger () {
      const demande = route.value
      document.documentElement.lang = demande.locale
      erreur.value = null
      vue.value = null
      // La feuille du CV fancy couvre toute la page, en-tête compris : la
      // classe se pose sur la racine, hors de portée de la coquille.
      document.documentElement.classList.toggle('page-cv', estFancy.value && courante.value !== null)
      if (liste.value) { document.title = `${T.value.blog} | ${SITE}`; window.scrollTo(0, 0); return }
      if (courante.value === null) { erreur.value = 'introuvable'; return }
      try {
        const c = await chargerFragment(courante.value.fichier)
        if (route.value !== demande) return
        vue.value = c
        document.title = estAccueil.value ? SITE : `${estCv.value ? T.value.cv : courante.value.titre} | ${SITE}`
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

    return { SITE, T, locale, route, blog, liste, courant, version, courante, estAccueil, estCv, estFancy, sommaire, vue, erreur, theme,
             avancement, cote, autreLangue, langues, lien, dateLongue, numero, numeroPage,
             articles: computed(() => articlesParDate(locale.value)),
             bascule: () => { theme.value = basculerTheme() } }
  },
  template: `
    <div class="progression" :style="{ '--avancement': avancement }"></div>
    <a class="saut-contenu" href="#contenu">{{ T.sauter }}</a>
    <header class="entete">
      <div class="entete-int">
      <a class="titre-site" :href="lien(locale)">{{ SITE }}</a>
      <div class="boutons-entete">
        <nav class="sections" aria-label="Sections">
          <a :href="lien(locale, null, null, null, 'travaux')">{{ T.travaux }}</a>
          <a :href="lien(locale, 'blog')" :aria-current="blog ? 'page' : null">{{ T.blog }}</a>
          <a :href="lien(locale, 'cv')" :aria-current="estCv ? 'page' : null">{{ T.cv }}</a>
          <a href="https://github.com/4nt0ineB" target="_blank" rel="noopener">GitHub</a>
        </nav>
        <nav class="langues" :aria-label="T.langue">
          <template v-for="l in langues" :key="l.code">
            <span v-if="l.courante" class="langue est-courante" aria-current="page">{{ l.code }}</span>
            <a v-else-if="l.href" class="langue" :href="l.href" :hreflang="l.code">{{ l.code }}</a>
            <span v-else class="langue est-absente" aria-disabled="true">{{ l.code }}</span>
          </template>
        </nav>
        <button v-if="!estFancy" type="button" class="bascule-theme" @click="bascule"
                :aria-label="theme === 'dark' ? T.themeClair : T.themeSombre">
          {{ theme === 'dark' ? T.clair : T.sombre }}
        </button>
      </div>
      </div>
    </header>
    <div class="coquille" :class="{ 'sans-sommaire': !sommaire, 'section-cv': estCv, 'section-accueil': estAccueil }">
      <nav v-if="sommaire" class="sommaire" aria-label="Sommaire">
        <a v-for="(p, i) in version.pages" :key="p.slug" :href="lien(locale, 'blog', courant.slug, p.slug)"
           :aria-current="p.slug === courante.slug ? 'page' : null">
          <span class="index">{{ numero(i) }}</span>
          <span>{{ p.titre }}</span>
          <span v-if="p.minutes" class="minutes">{{ p.minutes }} min</span>
        </a>
      </nav>
      <main id="contenu" class="contenu">
        <cv-palettes v-if="estFancy && vue" />
        <template v-if="liste">
          <p class="repere"><span class="carre"></span></p>
          <h1>{{ T.blog }}</h1>
          <p v-if="articles.length === 0">{{ T.aucunArticle }}</p>
          <ul v-else class="liste-articles">
            <li v-for="a in articles" :key="a.slug">
              <a :href="lien(locale, 'blog', a.slug)">{{ a[locale].titre }}</a>
              <time class="date" :datetime="a.publie">{{ dateLongue(a.publie) }}</time>
            </li>
          </ul>
        </template>
        <template v-else-if="vue">
          <p v-if="courant" class="repere"><span class="carre"></span><span class="index">{{ numeroPage }}</span></p>
          <p v-if="courant" class="dates">
            {{ T.publie }} <time :datetime="courant.publie">{{ dateLongue(courant.publie) }}</time><template v-if="courant.maj !== courant.publie">,
            {{ T.maj }} <time :datetime="courant.maj">{{ dateLongue(courant.maj) }}</time></template>
            <span v-if="courant.ecriture" class="badge-ecriture" :class="'ecriture-' + courant.ecriture"
                  :title="T.ecriture[courant.ecriture].detail">{{ T.ecriture[courant.ecriture].libelle }}</span>
          </p>
          <component :is="vue" :key="courante.fichier" />
        </template>
        <p v-else-if="!erreur">{{ T.chargement }}</p>
        <div v-else>
          <h1>{{ T.introuvable }}</h1>
          <p>{{ T.introuvableDetail }} <a :href="lien(locale, 'blog')">{{ T.lesArticles }}</a>, {{ T.ou }} <a :href="lien(locale)">{{ T.lAccueil }}</a>.</p>
        </div>
        <nav v-if="cote.precedent || cote.suivant" class="nav-chapitre">
          <a v-if="cote.precedent" :href="lien(locale, 'blog', courant.slug, cote.precedent.slug)">{{ T.precedent }} : {{ cote.precedent.titre }}</a>
          <a v-if="cote.suivant" :href="lien(locale, 'blog', courant.slug, cote.suivant.slug)">{{ T.suivant }} : {{ cote.suivant.titre }}</a>
        </nav>
      </main>
    </div>
  `
})

const app = createApp(App)
enregistrer(app)
app.mount('#app')
