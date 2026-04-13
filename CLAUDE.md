# YIM Verwachte Personen — Vue 3 Prototype

## Project Overview

Redesign van de "Verwachte Personen" module binnen YIM (Your Identity Management).
Een receptie-dashboard voor het beheren van bezoekers en contractors.

**Tech stack:** Vue 3 (Composition API, plain JS — geen TypeScript) + Vite + Pinia

## Quick Reference

```
src/
├── components/
│   ├── layout/        # AppHeader (incl. nav drawer), PageHeader
│   ├── filters/       # FilterStrip, TypeTabs, DateFilterChip, FilterChip, SearchBox
│   ├── table/         # DataTable, ColumnFilters, TableRow, Pagination
│   ├── detail/        # DetailPanel
│   ├── actions/       # BulkBar, ActionMenu, SplitButton, CheckinModal
│   └── ui/            # BaseButton, StatusBadge, PassStatusDot, ComplianceCell, CompliancePill, Modal, Toast, ToastContainer
├── composables/       # usePersonen, useSelection, useToast
├── stores/            # Pinia stores (personenStore, filterStore)
├── views/             # VerwachtePersonenView.vue
├── data/              # mockPersonen.js
└── assets/
    ├── styles/        # _tokens.css, main.css
    ├── logo.svg       # YiM logo
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
- PascalCase voor componenten: `StatusBadge.vue`
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
  persoontype: 'Bezoeker' | 'Contractor'
  contractortype: string | null     // bijv. "Elektromonteur", "Schoonmaker"
  bezoekreden: string               // verborgen kolom (horizontale scroll)
  locaties: string[]                // bijv. ["Hoofdkantoor Sh...", "Locatie Zuid"]
  datumVanaf: string                // "DD-MM-YYYY"
  aankomsttijd: string              // "HH:mm"
  status: 'Verwacht' | 'Aangekomen' | 'Vertrokken' | 'No-show' | 'Geannuleerd'
  vip: boolean
  dossier: 'compleet' | 'onvolledig'
  dossierMissing: string[] | null
  elearning: 'behaald' | 'niet-behaald' | 'niet-vereist'
  parkeren: {
    nodig: boolean
    gereserveerd: boolean
    plek: string | null
  }
  passtatus: 'niet-gekoppeld' | 'gekoppeld' | 'geprint'
  checkinTime: string | null
  checkoutTime: string | null
  contactpersoon: string            // verborgen kolom (horizontale scroll)
  contactTel: string
}
```

## Tabelkolommen

De tabel heeft **horizontale scroll**. Kolom configuratie staat in `columns.json` (single source of truth). Checkbox- en actiekolom zijn **sticky** (altijd zichtbaar). Alle kolommen zijn **resizable** door de gebruiker via de rechterrand van de kolomheader. De hele rij is klikbaar en opent het detail panel.

Zie `columns.json` voor alle 17 kolommen met breedtes, filtertypes en dropdown-opties.

## Filterstrip Layout

```
[Alle 20] [Bezoekers 8] [Contractors 12]    [Vandaag ▾] [Status ▾] [Compliance ▾] [Parkeren ▾] [🔍 Zoek op naam, bedrijf, referentie...]
```

- **Links:** TypeTabs — segmented button group met counts per type
- **Rechts:**
  - DateFilterChip "Vandaag ▾" — opent popup met datuminput + presets (Vandaag / Morgen / Deze week) + Resetten/Toepassen knoppen
  - FilterChip "Status ▾" — checkboxes: Verwacht, Aangekomen, No-show, Geannuleerd, Vertrokken
  - FilterChip "Compliance ▾" — checkboxes: Dossier volledig, Dossier onvolledig, E-learning voltooid, E-learning niet voltooid
  - FilterChip "Parkeren ▾" — checkboxes: Gereserveerd, Niet gereserveerd
  - SearchBox — placeholder "Zoek op naam, bedrijf, referentie..."

## Paginaheader Knoppen

- **"Instellingen ▾"** — outlined split button (links), opent menu met:
  - **Kolominstellingen** — popover panel met kolom toggles, zoekbalk, set opslaan/laden (zie `components/settings.md`)
  - **Opgeslagen set toepassen** — submenu met opgeslagen kolomconfiguraties
- **"Nieuwe registratie ▾"** — primary split button (rechts), met dropdown:
  - Bezoeker registreren
  - Contractor registreren en autoriseren
  - Bezoeker(s) uploaden
  - Contractor(s) uploaden

## Action Menus per Status

### Status: Verwacht
- Inchecken
- Pas koppelen
- No-show
- Annuleren *(rood)*
- ─────
- Bekijk dossier
- Contact opnemen
- Bel contactpersoon

### Status: Aangekomen
- Uitchecken
- Pas ontkoppelen
- Pas printen
- ─────
- Bel persoon
- Bekijk dossier
- Contactpersoon informeren

### Status: No-show
- No-show ongedaan maken
- Inchecken
- Pas koppelen
- Annuleren *(rood)*
- ─────
- Bel persoon
- Bekijk dossier
- Contactpersoon informeren

### Status: Geannuleerd / Vertrokken
- Bel persoon
- Bekijk dossier
- Contactpersoon informeren

## Bulk Acties Bar

Verschijnt boven de tabel bij 1+ selecties:

```
[N geselecteerd]  [↑ Inchecken]  [↓ Uitchecken]  [🪪 Pas koppelen]  [🖨️ Pas printen]  [👤 No-show]  [✕ Annuleren]           [×]
```

Uitchecken en Pas printen zijn disabled als er geen ingecheckte personen geselecteerd zijn.

## Compliance Kolom

Toont twee iconen per rij:
- **Dossier:** `✓ Dossier` (groen) of `▲ Dossier` (oranje/waarschuwing)
- **E-learning:** `E-learning` met check (groen) of `⚡ E-learning` (waarschuwing)

## Passtatus Kolom

- `● Niet gekoppeld` — grijs bolletje
- `● Gekoppeld` — blauw bolletje
- `● Geprint` — groen bolletje

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

## Referentie Documenten

- `ARCHITECTURE.md` — Gedetailleerde componentenboom en dataflow
- `COMPONENTS.md` — Index naar component specificaties
  - `components/ui-atoms.md` — BaseButton, StatusBadge, PassStatusDot, ComplianceCell, Dropdown, Modal, Toast
  - `components/filters.md` — TypeTabs, DateFilterChip, FilterChip, SearchBox
  - `components/table.md` — DataTable, TableRow, ColumnFilters, Pagination
  - `components/actions.md` — ActionMenu, BulkBar, SplitButton
  - `components/settings.md` — InstellingenMenu, KolomInstellingenPanel
- `columns.json` — Kolomconfiguratie (single source of truth voor de tabel)
- `TOKENS.md` — Design tokens referentie
