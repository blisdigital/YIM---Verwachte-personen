# FilterStrip

Horizontale balk die alle filtercomponenten combineert: type-tabs, locatie, datum, filter-chips en zoekbalk. Centrale orchestrator van alle filterinteracties.

## Relaties
- **Gebruikt door:** VerwachtePersonenView
- **Gebruikt:** TypeTabs, LocatieFilterChip, DateFilterChip, FilterChip, SearchBox

## Gebruik
```vue
<FilterStrip />
```

FilterStrip leest en schrijft alle filterwaarden rechtstreeks via `filterStore` (geen props/events nodig).

## Props
Geen props -- alle state komt uit `filterStore`.

## Events
Geen events -- alle mutaties gaan via `filterStore`.

## Gedrag
- **Opbouw (links naar rechts):**
  1. TypeTabs -- persoontype segmented control
  2. LocatieFilterChip -- locatie preset filter (default: receptie-locatie)
  3. DateFilterChip -- datumfilter chip
  4. FilterChip label="Status" -- statusfilter
  5. FilterChip label="Compliance" -- compliancefilter
  6. FilterChip label="Parkeren" -- parkerenfilter
  7. SearchBox -- zoekbalk (320px fixed breed)
- **Layout:** twee groepen in `display: flex` met `justify-content: space-between`.
  - **`filter-left`** -- TypeTabs, `flex-shrink: 0`, `align-items: center`.
  - **`filter-right`** -- overige filters + SearchBox; `gap: --sp-s` (8px); alle items `height: 40px`.
- **Responsive (max-width: 1279px):** strip wordt `column`; rechter groep `100%` breed met `nowrap` + `overflow-x: auto`. TypeTabs full-width bovenaan; filters scrollen horizontaal.
- Popovers en dropdowns via `<Teleport to="body">` om clipping door `overflow-x: auto` te voorkomen.

## Design Tokens
| Element | Token | Waarde |
|---------|-------|--------|
| Strip gap | `--sp-m` | `12px` |
| Strip margin-bottom | `--sp-xxl` | `32px` |
| Rechter groep gap | `--sp-s` | `8px` |
| Tablet strip gap | `--sp-s` | `8px` |
