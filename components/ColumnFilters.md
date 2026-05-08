# ColumnFilters

Rij met per-kolom filter-inputs direct onder de kolomheaders. Bestaat uit twee delen: **sticky cellen** links (boven de checkbox- en actiekolom) en **scrollbare filter-cellen** per data-kolom.

Bron: Figma [Epic - Verwachte personen `53:15693`](https://www.figma.com/design/LuyFTR1cgQe3mT6TAGvzVV/Epic--Verwachte-personen?node-id=53-15693&m=dev) + [Sticky columns `54:49592`](https://www.figma.com/design/LuyFTR1cgQe3mT6TAGvzVV/Epic--Verwachte-personen?node-id=54-49592&m=dev).

```vue
<ColumnFilters :columns="columns" :column-widths="columnWidths" v-model="columnFilters" />
```

---

## Structuur

```text
┌───────────┬────────────┬────────┬────────────┬────────────┬──────────────────┬────────────┬──────
│ Zoeken  🔍│ Zoeken  🔍 │Alle ▾  │ Alle    ▾  │ Alle    ▾  │ Zoeken       🔍  │08-04  📅  │…   │
└───────────┴────────────┴────────┴────────────┴────────────┴──────────────────┴────────────┴──────
  ↑ Naam     ↑ Pers.nr    ↑VIP     ↑Pers.type   ↑Contr.type  ↑Bedrijf           ↑Aankomst
```

Twee sticky lege cellen (48×48) links → scrollbare filtercellen per datakolom. Celbreedtes matchen 1-op-1 de kolomheaders.

---

## Design tokens

| Categorie | Token | Waarde |
|---|---|---|
| Colors | `--n0` / `--n50` | `#ffffff` / `#f8fafb` |
| | `--n300` / `--n400` / `--n500` | `#eaeced` / `#b8babb` / `#999a9b` |
| | `--n900` | `#1d1e1f` |
| Spacing | `--s-xs` / `--s-s` | `4px` / `8px` |
| Corners | `--r-s` | `4px` |
| Typography | Body M — Nunito Regular | 14px / 20px, 0 |

---

## Sticky cellen

Twee lege cellen links in de filterrij, exact boven de sticky headerkolommen (checkbox + actie). Geen filterveld — puur visuele verlenging van de tabelgrid.

| Prop | Waarde |
|---|---|
| Afmeting | 48×48 per cel |
| Bg | `--n50` |
| Border-bottom | 1px `--n300` |
| Border-right | 1px `--n300` |
| Padding | — (leeg) |
| Positie | `sticky; left: 0` (cel 1) / `left: 48px` (cel 2), `z-index` boven scrollbare cellen |
| Shadow | `box-shadow: 4px 0 4px -2px rgba(17,19,19,.08)` op de laatste sticky cel wanneer `scrollLeft > 0` |

---

## Cel (wrapper per scrollbare kolom)

| Prop | Waarde |
|---|---|
| Bg | `--n50` |
| Border-bottom | 1px `--n300` |
| Border-right | 1px `--n300` |
| Padding | `8px` rondom het veld |
| Breedte | volgt column-header breedte |
| Display | `flex`, `align-items: center` |

---

## Veldtypes (allemaal small / 32px hoog)

Alle vier delen deze basis: bg `--n0`, `border: 1px solid var(--n400)`, `border-radius: var(--r-s)` (4px), hoogte 32px, `flex: 1`, `overflow: clip`.

### 1. Search (type-to-filter)

Flex container: label/input links + 32×32px icon-area rechts.

| Onderdeel | Waarde |
|---|---|
| Label/input | `padding: 8px`, Body M, kleur `--n500`, placeholder "Zoeken" |
| Icon-action | 32×32, `padding: 8px`, icoon 20px `search`, kleur `--n800` |

### 2. Select / dropdown

Tighter verticale padding (`6px` i.p.v. `8px`). Geen aparte icon-action container.

| Onderdeel | Waarde |
|---|---|
| Label | Body M / `--n900`, default "Alle" |
| Chevron | 18×18 `arrow_drop_down`, kleur `--n800` |

### 3. Date (small)

| Onderdeel | Waarde |
|---|---|
| Label | `padding: 8px`, Body M / `--n900` (bv. "08-04-2026") |
| Icon-action | 32×32, `padding: 8px`, 20px `today`-icoon, kleur `--n800` |

### 4. Time

| Onderdeel | Waarde |
|---|---|
| Label | `padding: 8px`, Body M / `--n900`, default "Alle" |
| Icon-action | 32×32, `padding: 8px`, 20px `access_time`-icoon, kleur `--n800` |

---

## Per-kolom mapping

| # | Kolom | Breedte | Veldtype | Standaard zichtbaar |
|---|---|---|---|---|
| 1 | Status | 130 | select | ja |
| 2 | Aankomstdatum | 144 | date | ja — prefilled vandaag, volgt FilterStrip preset |
| 3 | Aankomsttijd | 144 | time | ja |
| 4 | Naam persoon | 160 | search | ja (vergrendeld) |
| 5 | Personeelsnr | 152 | search | nee |
| 6 | Telefoonnummer | 160 | search | nee |
| 7 | E-mailadres | 200 | search | nee |
| 8 | VIP | 88 | select | ja |
| 9 | Persoonstype | 144 | select | ja |
| 10 | Contractortype | 152 | select | ja |
| 11 | Bedrijf | 160 | search | ja |
| 12 | Passtatus | 176 | select | ja |
| 13 | Compliance | 216 | select | ja |
| 14 | Parkeren | 160 | select | ja |
| 15 | Locatie(s) | 160 | search | ja |
| 16 | Contactpersoon | 200 | search | ja |
| 17 | Bezoekreden | 200 | search | ja |

Zie `columns.json` voor de volledige kolomconfiguratie (single source of truth).

---

## Gedrag

- **Search-velden** filteren live op typen (debounce applicable), substring match op `oninput`.
- **Select-dropdowns** openen een menu zoals de filter-chip dropdowns (multi-select met checkboxes). "Alle" = geen filter actief.
- **Date-veld** opent `DatePopover` via `<Teleport to="body">`; gekoppeld aan `filterStore.datum`. Default = vandaag.
- **Time-veld** opent een time-picker. Default "Alle".
- Filters stapelen met de globale filterstrip — een kolom-filter is een extra AND-clause bovenop de strip.
- Cel-border blijft zichtbaar ook als het veld leeg is (visuele tabelgrid-structuur, niet van het veld zelf).
- Focus: `border-color: var(--p500)` op het veld; de cel-wrapper verandert niet.

---

## Implementatie-notes

- Hergebruik `SearchBox`, filter-chip dropdowns, `DatePopover` en een time-picker uit de UI kit — `ColumnFilters` is een compositie, geen nieuwe stijl.
- **Celbreedtes zijn gedeeld met de kolomheaders.** Definieer breedtes éénmalig (bv. CSS-vars of een gemeenschappelijke `grid-template`) en gebruik ze op beide rijen, zodat kolommen 1-op-1 uitlijnen.
- De cel-borders (`--n300` bottom + right) sluiten naadloos aan op de grid van de body-rijen.
- Laatste kolom in de rij: geen `border-right` — of consistent laten staan als de tabel verder scrollt (volg dezelfde regel als de kolomheaders).
- Deze rij scrollt **horizontaal mee** met de tabelbody; de sticky cellen links plakken net als de sticky headerkolommen.
