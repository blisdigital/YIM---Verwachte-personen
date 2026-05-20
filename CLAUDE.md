# YIM Verwachte Personen — Vue 3 Prototype

## Project Overview

Redesign van de "Verwachte Personen" module binnen YIM (Your Identity Management).
Een receptie-dashboard voor het beheren van bezoekers en contractors.

**Tech stack:** Vue 3 (Composition API, plain JS — geen TypeScript) + Vite + Pinia

## Quick Reference

```
src/
├── components/
│   ├── layout/        # AppHeader (incl. nav drawer), PageHeader, ProcessNav
│   ├── filters/       # FilterStrip, TypeTabs, DateFilterChip, FilterChip, SearchBox
│   ├── table/         # DataTable, ColumnFilters, TableRow, Pagination
│   ├── detail/        # DetailPanel
│   ├── actions/       # BulkBar, ActionMenu, AanmeldenModal, AfmeldenModal, AnnulerenModal, AankomstWijzigenModal, InformeerContactpersoonModal
│   ├── settings/      # KolomInstellingenPanel
│   └── ui/            # BaseButton, IconButton, InputField, Toggle, StatusDot, PassStatusDot, ComplianceCell, CompliancePill, Modal, DatePopover, DatePickerCalendar, TimePopover, Tooltip, Toast, ToastContainer, ActionPopup, ProcessBottomBar, InfoSection
├── composables/       # usePersonen, useSelection, useToast
├── stores/            # Pinia stores (personenStore, filterStore, columnStore)
├── views/             # VerwachtePersonenView.vue, CredentialKoppelenView.vue, CredentialPrintenView.vue
├── data/              # mockPersonen.js
└── assets/
    ├── styles/        # _tokens.css, main.css
    ├── logo.svg       # YIM logo
    └── header-vorm.svg # Header decorative shape
```

## Architectuur Beslissingen

- **Composition API** — Gebruik `<script setup>` syntax, geen Options API
- **Composables** — Herbruikbare logica in `src/composables/`
- **Props down, events up** — Unidirectionele dataflow
- **Scoped CSS** — Per component, gebruik design tokens
- **Pinia** — Voor globale state (personen data, selectie, filters)

## Design Tokens

Alle kleuren, spacing en radii via CSS custom properties. Zie `src/assets/styles/_tokens.css`.

Primaire kleurschaal: `--p50` t/m `--p900` (teal)
Neutrale schaal: `--n0` t/m `--n900` (grijs)
Semantisch: `--ok`, `--warn`, `--err`, `--info` + `-bg` varianten
VIP: `--vip`, `--vip-bg`, `--vip-border`

## Component Conventies

### Naamgeving
- PascalCase voor componenten: `StatusDot.vue`
- camelCase voor composables: `usePersonen.js`
- kebab-case voor CSS classes: `.status-badge`

### Props & Events
```vue
<script setup>
const props = defineProps({
  person: { type: Object, required: true },
  selected: { type: Boolean, default: false },
})

const emit = defineEmits(['select', 'openDetail'])
</script>
```

### Slots
Gebruik slots voor flexibele compositie:
```vue
<DetailSection title="Bezoekgegevens">
  <template #default>...</template>
  <template #actions>...</template>
</DetailSection>
```

## Data Model

```typescript
interface Person {
  id: number
  naam: string
  personeelsnr: string              // bijv. "P0000002393"
  bedrijf: string
  persoontype: 'Bezoeker' | 'Warehouse' | 'Technisch' | 'Logistiek' | 'Maintenance' | 'IT' | 'Inspection' | 'Construction'
  // Bezoekers hebben persoontype 'Bezoeker'. Contractors hebben een specifiek subtype.
  // TypeTabs 'Contractors' tab filtert op persoontype !== 'Bezoeker'.
  // Nieuwe types worden in configuratie toegevoegd — geen code-wijziging nodig.
  bezoekreden: string               // verborgen kolom (horizontale scroll)
  locaties: string[]                // bijv. ["Hoofdkantoor Sh...", "Locatie Zuid"]
  datumVanaf: string                // "DD-MM-YYYY"
  aankomsttijd: string              // "HH:mm"
  status: 'Verwacht' | 'Nog niet aangekomen' | 'Aangemeld' | 'Afgemeld' | 'Niet aangekomen' | 'Geannuleerd'
  // 'Nog niet aangekomen' wordt automatisch gezet als aankomsttijd verstreken is en persoon niet aangemeld is.
  vip: boolean
  dossier: 'compleet' | 'onvolledig'
  dossierMissing: string[] | null
  elearning: 'behaald' | 'niet-behaald' | 'niet-vereist'
  parkeren: {
    nodig: boolean
    gereserveerd: boolean
    plek: string | null
  }
  credentialStatus: 'niet-actief' | 'actief' | 'verlopen' | 'ingetrokken' | 'geblokkeerd'
  checkinTime: string | null
  checkoutTime: string | null
  contactpersoon: string            // verborgen kolom (horizontale scroll)
  contactTel: string
  telefoonnummer: string | null     // eigen telefoonnummer persoon
  emailadres: string | null         // eigen e-mailadres persoon
  contactEmail: string | null       // e-mailadres contactpersoon
  vertrekTijd: string | null        // geplande vertrektijd "HH:mm" (zelfde datum als datumVanaf)
  credentialType: string | null     // bijv. "Bezoekerspas", "Contractorpas"
  pasnummer: string | null          // 14-cijferig pasnummer
}
```

## Tabelkolommen

De tabel heeft **horizontale scroll**. Kolom configuratie staat in `columns.json` (single source of truth). Checkbox- en actiekolom zijn **sticky** (altijd zichtbaar). Alle kolommen zijn **resizable** door de gebruiker via de rechterrand van de kolomheader. De hele rij is klikbaar en opent het detail panel.

Zie `columns.json` voor alle kolommen met breedtes, filtertypes en dropdown-opties. columns.json bevat 21 entries: 2 sticky systeemkolommen (checkbox, actie) + 19 data kolommen (waarvan 3 standaard verborgen: personeelsnr, telefoonnummer, emailadres).

## Filterstrip Layout

```
[Alle 20] [Bezoekers 8] [Contractors 12]    [Vandaag ▾] [Status ▾] [Compliance ▾] [Parkeren ▾] [🔍 Zoek op naam, bedrijf, referentie...]
```

- **Links:** TypeTabs — segmented button group met counts per type
- **Rechts:**
  - DateFilterChip "Vandaag ▾" — opent popup met datuminput + presets (Vandaag / Morgen / Deze week) + Reset/Toepassen knoppen
  - FilterChip "Status ▾" — checkboxes: Verwacht, Nog niet aangekomen, Aangemeld, Afgemeld, Niet aangekomen, Geannuleerd
  - FilterChip "Compliance ▾" — checkboxes: Dossier volledig, Dossier onvolledig, E-learning voltooid, E-learning niet voltooid
  - FilterChip "Parkeren ▾" — checkboxes: Gereserveerd, Niet gereserveerd
  - SearchBox — placeholder "Zoek op naam, bedrijf, referentie..."

## Paginaheader Knoppen

- **"Instellingen ▾"** — outlined split button (links), opent menu met:
  - **Kolominstellingen** — popover panel met kolom toggles, zoekbalk, set opslaan/laden (zie `components/KolomInstellingenPanel.md`)
  - **Opgeslagen set toepassen** — submenu met opgeslagen kolomconfiguraties
- **"Nieuwe registratie ▾"** — primary split button (rechts), met dropdown:
  - Bezoeker registreren
  - Contractor registreren en autoriseren
  - Bezoeker(s) uploaden
  - Contractor(s) uploaden

## Action Menus per Status

Zie `components/ActionMenu.md` voor de volledige specificatie. Samenvatting:

### Status: Verwacht / Nog niet aangekomen

- Persoon aanmelden
- Credential koppelen / Credential printen *(afhankelijk van credential type)*
- Aankomst wijzigen
- Persoon annuleren *(rood)*
- ─────
- Informeer contactpersoon
- Bekijk dossier
- Bel persoon

### Status: Aangemeld

- Credential koppelen / Credential ontkoppelen / Credential printen *(afhankelijk van type + status)*
- Persoon afmelden
- ─────
- Informeer contactpersoon
- Bekijk dossier
- Bel persoon

### Status: Niet aangekomen

- Niet aangekomen ongedaan
- Persoon aanmelden
- Credential koppelen / Credential printen *(afhankelijk van credential type)*
- Aankomst wijzigen
- Persoon annuleren *(rood)*
- ─────
- Informeer contactpersoon
- Bekijk dossier
- Bel persoon

### Status: Geannuleerd / Afgemeld

- Informeer contactpersoon
- Bekijk dossier
- Bel persoon

## Bulk Acties Bar

Verschijnt boven de tabel bij 1+ selecties:

```
[N geselecteerd]  [↑ Aanmelden]  [↓ Afmelden]  [🪪 Credential koppelen]  [🔓 Credential ontkoppelen]  [🖨️ Credential printen]  [⛔ Niet aangekomen]  [✕ Persoon annuleren]           [×]
```

Zie `components/BulkBar.md` voor enabled/disabled-regels per actie.

## Compliance Kolom

Toont twee iconen per rij:
- **Dossier:** `✓ Dossier` (groen) of `▲ Dossier` (oranje/waarschuwing)
- **E-learning:** `E-learning` met check (groen) of `⚡ E-learning` (waarschuwing)

## Credential Status Kolom

- `● Niet actief` — grijs bolletje (`--n400`)
- `● Actief` — groen bolletje (`--ok`)
- `● Verlopen` — oranje bolletje (`--warn`)
- `● Ingetrokken` — donkergrijs bolletje (`--n500`)
- `● Geblokkeerd` — rood bolletje (`--err`)

## Belangrijke Interacties

1. **Bulk selectie** — Checkbox in header selecteert alle zichtbare rijen; toont BulkBar
2. **Detail panel** — Slide-out panel rechts bij klik op naam (nog te specificeren)
3. **Inline acties** — Dropdown via ••• per rij; inhoud afhankelijk van status
4. **Quick filters** — DateFilterChip: datum presets (Vandaag, Morgen, Deze week)
5. **Kolom filters** — Filterrij direct onder de kolomheaders
6. **Horizontale scroll** — Verborgen kolommen bereikbaar via scrollbar onderaan tabel

## Do's

- ✅ Gebruik `<script setup>` voor alle componenten
- ✅ Extracteer logica naar composables zodra het herbruikbaar is
- ✅ Gebruik design tokens, geen hardcoded kleuren
- ✅ Maak componenten klein en gefocust (max ~150 regels)
- ✅ Gebruik plain JS (geen TypeScript)

## Don'ts

- ❌ Geen inline styles (gebruik scoped CSS of tokens)
- ❌ Geen directe DOM manipulatie (gebruik refs en Vue reactivity)
- ❌ Geen Options API (`data()`, `methods`, `computed` object syntax)
- ❌ Geen business logic in templates
- ❌ Geen globale state buiten Pinia stores

## Werkwijze: wijzigingen consistent doorvoeren

Het prototype bestaat uit twee lagen die altijd in sync moeten blijven:

- **Specificatie** — md-files (`ARCHITECTURE.md`, `COMPONENTS.md`, `components/*.md`, `TOKENS.md`, `brand.md`, `columns.json`, etc.)
- **Implementatie** — Vue/JS bronbestanden (`src/components/**/*.vue`, `src/stores/*.js`, `src/composables/*.js`, `src/data/*.js`, `src/assets/styles/*.css`)

### Regel: altijd impact checken vóór én ná een wijziging

Na elke bewerking — of die nu in een md-file of in een Vue/JS-bestand zit — altijd:

1. **Check de impact** — Scan de hele `_prototype` folder op alle bestanden (md én src/) die verwijzen naar het gewijzigde concept, component, prop, event, store-key of bestandsnaam.
2. **Geef een overzicht** — Toon per bestand welke specifieke regels niet meer kloppen of bijgewerkt moeten worden.
3. **Vraag bevestiging** — Vraag of de gevonden aanpassingen direct doorgevoerd mogen worden. Voer niets door zonder bevestiging.

### Richtingen

| Wijziging in | Check ook |
| --- | --- |
| md-file (spec) | Andere md-files + bijbehorende Vue/JS-bestanden in `src/` |
| Vue/JS-bestand (impl) | Bijbehorende md-file(s) + andere Vue/JS-bestanden die hetzelfde component/store gebruiken |
| `columns.json` | `DataTable.vue`, `ColumnFilters.vue`, `KolomInstellingenPanel.vue`, `KolomInstellingenPanel.md`, `DataTable.md` |
| `src/assets/styles/_tokens.css` | `TOKENS.md` en alle componenten die de gewijzigde token gebruiken |

Voer stap 1–3 altijd uit, ook als de bewerking klein lijkt. Sla stap 3 nooit over.

## Werkwijze: nieuwe functionaliteit bouwen

### Stap 1 — Token-first

Vóór het schrijven van enige CSS of component-code:

1. **Check `TOKENS.md`** — bestaat er al een token voor dit visuele element?
   - Ja → gebruik die token.
   - Nee → voeg de token **eerst** toe aan `_tokens.css` én `TOKENS.md` (incl. Figma-mapping of ⚠ prototype-only markering), dan pas verder.
2. **Nooit hardcoded waardes** voor kleur, spacing, radius of shadow — altijd via een token.

### Stap 2 — Component decomposition

Per nieuw onderdeel: beslis eerst of het één component is of meerdere losse componenten.

**Maak een apart component als:**

- Het herbruikbaar is in een andere context (bijv. `StatusDot` verschijnt in tabel én detail panel)
- Het eigen state, props of events heeft die los staan van de parent
- Het meer dan ~150 regels template + script zou worden als onderdeel van de parent

**Houd het samen (één component) als:**

- Het alleen in deze context voorkomt
- Het geen eigen state heeft — alleen presentatie via props van de parent
- Splitsen leidt tot prop-drilling zonder toegevoegde waarde

Bij twijfel: begin als onderdeel van de parent, extraheer zodra het tweede gebruik ontstaat.

### Stap 3 — Markdown-first

Elk nieuw los component krijgt **eerst** een `.md` spec-bestand in `components/`, daarna pas het `.vue` bestand.

Het `.md` bestand bevat minimaal:

- **Naam + korte beschrijving** — wat doet het, in welke context
- **Props tabel** — naam, type, default, beschrijving
- **Events** — naam + payload
- **Token tabel** — welke design tokens gebruikt dit component, voor welk element/state
- **Gebruik** — één of twee concrete voorbeeldregels (hoe het aangeroepen wordt)

Pas na akkoord op de `.md` spec wordt de `.vue` gebouwd.

Na het aanmaken van een nieuw component: voeg het toe aan `COMPONENTS.md` (index) en de Quick Reference bovenaan dit bestand.

---

## Referentie Documenten

- `ARCHITECTURE.md` — Componentenboom, dataflow, composables API, store API
- `COMPONENTS.md` — Index naar alle component specificaties
  - `components/AppHeader.md`, `components/PageHeader.md`, `components/ProcessNav.md` — Layout
  - `components/BaseButton.md`, `components/IconButton.md` — Knoppen
  - `components/InputField.md`, `components/Toggle.md` — Formulier elementen
  - `components/StatusDot.md`, `components/PassStatusDot.md` — Status indicators
  - `components/CompliancePill.md` — Compliance (incl. ComplianceCell)
  - `components/Tooltip.md` — Tooltip
  - `components/Modal.md`, `components/ActionPopup.md` — Dialogen
  - `components/DatePopover.md`, `components/DatePickerCalendar.md` — Datum UI
  - `components/Toast.md` — Toast / ToastContainer
  - `components/TypeTabs.md`, `components/DateFilterChip.md`, `components/FilterChip.md`, `components/FilterStrip.md`, `components/SearchBox.md` — Filters
  - `components/DataTable.md`, `components/TableRow.md`, `components/ColumnFilters.md`, `components/Pagination.md` — Tabel
  - `components/ActionMenu.md`, `components/BulkBar.md` — Acties (rij + bulk)
  - `components/AanmeldenModal.md`, `components/AnnulerenModal.md`, `components/AankomstWijzigenModal.md` — Actie-modals
  - `components/InformeerContactpersoonModal.md` — Informeer contactpersoon modal
  - `components/DetailPanel.md` — DetailPanel
  - `components/KolomInstellingenPanel.md` — InstellingenMenu, KolomInstellingenPanel
  - `components/InfoSection.md` — InfoSection (sectie-kaart voor credential-pagina's)
- `columns.json` — Kolomconfiguratie (single source of truth voor de tabel)
- `TOKENS.md` — Design tokens referentie (prototype-implementatie)
- `brand.md` — YIM UI Kit foundations: kleuren, typografie, elevaties, spacing — Figma bron
