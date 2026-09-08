import { AllerPlusLoin } from './socle/aller-plus-loin.js'
import { Regle } from './socle/regle.js'
import { Mesure } from './socle/mesure.js'
import { Devine } from './socle/devine.js'
import { TableauMesure } from './socle/tableau-mesure.js'
import { Jargon } from './socle/jargon.js'
import { PalettesCv } from './socle/palettes-cv.js'
import { SchemaCardinalite } from './schemas/cardinalite.js'
import { SchemaTroisEtages } from './schemas/trois-etages.js'
import { SchemaPullPush } from './schemas/pull-push.js'
import { SchemaReactionChaine } from './schemas/reaction-chaine.js'
import { SchemaFenetreRate } from './schemas/fenetre-rate.js'
import { SchemaAgregat } from './schemas/agregat.js'
import { SchemaChoisirSaMort } from './schemas/choisir-sa-mort.js'
import { SchemaConnexions } from './schemas/connexions.js'
import { SchemaTroisColonnes } from './schemas/trois-colonnes.js'
import { SchemaChaineAlerte } from './schemas/chaine-alerte.js'
import { SchemaTrajet } from './schemas/trajet.js'

export function enregistrer (app) {
  app.component('aller-plus-loin', AllerPlusLoin)
  app.component('regle', Regle)
  app.component('mesure', Mesure)
  app.component('devine', Devine)
  app.component('tableau-mesure', TableauMesure)
  app.component('jargon', Jargon)
  app.component('cv-palettes', PalettesCv)
  app.component('schema-cardinalite', SchemaCardinalite)
  app.component('schema-trois-etages', SchemaTroisEtages)
  app.component('schema-pull-push', SchemaPullPush)
  app.component('schema-reaction-chaine', SchemaReactionChaine)
  app.component('schema-fenetre-rate', SchemaFenetreRate)
  app.component('schema-agregat', SchemaAgregat)
  app.component('schema-choisir-sa-mort', SchemaChoisirSaMort)
  app.component('schema-connexions', SchemaConnexions)
  app.component('schema-trois-colonnes', SchemaTroisColonnes)
  app.component('schema-chaine-alerte', SchemaChaineAlerte)
  app.component('schema-trajet', SchemaTrajet)
}
