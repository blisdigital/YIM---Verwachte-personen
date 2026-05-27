# ColumnFilters

Rij met per-kolom filter-inputs direct onder de kolomheaders. Bestaat uit twee delen: **sticky cellen** links (boven de checkbox- en actiekolom) en **scrollbare filter-cellen** per data-kolom.

Bron: Figma [Epic - Verwachte personen `53:15693`](https://www.figma.com/design/LuyFTR1cgQe3mT6TAGvzVV/Epic--Verwachte-personen?node-id=53-15693&m=dev) + [Sticky columns `54:49592`](https://www.figma.com/design/LuyFTR1cgQe3mT6TAGvzVV/Epic--Verwachte-personen?node-id=54-49592&m=dev) + [UI update `207:39083`](https://www.figma.com/design/LuyFTR1cgQe3mT6TAGvzVV/Epic--Verwachte-personen?node-id=207-39083&m=dev).

```vue
<ColumnFilters :columns="columns" :column-widths="columnWidths" v-model="columnFilters" />
```

---

## Structuur

```text
┌───────────┬────────────┬──────────┬────────────┬────────────┬──────────────────┬──────────────┬──────
│ Zoeken  🔍│ Zoeken  🔍 │Filter  ∨ │ Filter   ∨ │ Filter   ∨ │ Zoeken       🔍  │Filter      ∨ │…   │
└───────────┴────────────┴──────────┴────────────┴────────────┴──────────────────┴──────────────┴──────
  ↑ Naam     ↑ Pers.nr    ↑VIP       ↑Pers.type   ↑Contr.type  ↑Bedrijf           ↑Aankomst
```

Filtercel-achtergrond is nu altijd `--p700` (teal). Zoek-cellen (text) blijven wit.

Twee sticky lege cellen (48×48) links → scrollbare filtercellen per datakolom. Celbreedtes matchen 1-op-1 de kolomheaders.

---

## Events

| Event | Payload | Beschrijving |
| --- | --- | --- |
| `update:modelValue` | `Object` | Bijgewerkt filter-object met per kolom-key de filterwaarde |

---

## Design Tokens

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
| Bg | `--p700` |
| Border-bottom | 1px `--p800` |
| Border-right | 1px `--p800` |
| Padding | `4px 8px` (spacing-xs spacing-s) |
| Breedte | volgt column-header breedte |
| Display | `flex`, `align-items: center` |

---

## Veldtypes (allemaal 32px hoog)

**Search-cellen:** bg `--n0`, `border: 1px solid var(--n400)`, `border-radius: var(--r-s)` (4px), hoogte 32px.

**Chip-cellen** (dropdown / date / time): bg `--p700`, `border: none`, `border-radius: var(--r-s)` (4px), hoogte 32px, witte semibold tekst, chevron `expand_more`.

### 1. Search (type-to-filter)

Flex container: label/input links + 32×32px icon-area rechts.

| Onderdeel | Waarde |
|---|---|
| Label/input | `padding: 6px 8px`, Body M, kleur `--n500`, placeholder "Zoeken" |
| Icon-area | 32×32, icoon 20px `search`, kleur `--n800` |

### 2. Dropdown — chip + popover

Trigger-knop identiek aan Date/Time chip. Actief filter (waarde ≠ leeg): knop krijgt `--n0` achtergrond + `--p700` tekst/chevron.

**Popover panel** (via `<Teleport to="body">`, `position: fixed`, `z-index: 300`):

| Onderdeel | Waarde |
|---|---|
| Bg / shadow | `--n0`, `var(--shadow-m)`, `border-radius: var(--r-s)` |
| Breedte | 240px |
| Padding | 16px |
| Titel "Filter" | 18px / 700 / `--p700` |
| Opties lijst | Klikbaar, één selectie tegelijk; geselecteerde optie: `--p50` bg + `--p700` tekst; "Alle" niet getoond (Reset-knop vervangt dit) |
| Divider | 1px `--n300` |
| Footer | `[Reset]` outlined links — `[Toepassen]` primary rechts (volgorde = DatePopover) |

### 3b. Combobox (locaties) — chip + popover

Trigger-knop identiek aan dropdown chip. Actief filter: zelfde active-state als dropdown.

**Popover panel** (272px breed):

| Onderdeel | Waarde |
|---|---|
| Titel "Filter" | 18px / 700 / `--p700` |
| Tekst input | Placeholder "Filter", `border: 1px solid --n400`, focus → `--p500` |
| Suggestie-lijst | Gefilterde unieke locaties uit store; klikken vult input; geselecteerde optie highlighted |
| Divider + footer | Identiek aan dropdown popover |

### 3. Date — chip

| Onderdeel | Waarde |
|---|---|
| Bg | `--p700` |
| Label | `padding: 6px 8px`, Body M SemiBold / `--n0` (datum of "Filter") |
| Chevron | 18px `expand_more`, kleur `--n0`, `position: absolute; right: 4px` |

### 4. Time — chip

| Onderdeel | Waarde |
|---|---|
| Bg | `--p700` (transparant in select, kleur van wrapper) |
| Label | Body M SemiBold / `--n0`, default "Filter" |
| Chevron | 18px `expand_more`, kleur `--n0`, `position: absolute; right: 4px` |

---

## Per-kolom mapping

| # | Kolom | Breedte | Veldtype | Standaard zichtbaar |
|---|---|---|---|---|
| 1 | Status | 130 | dropdown | ja |
| 2 | Aankomstdatum | 144 | date | ja — prefilled vandaag, volgt FilterStrip preset |
| 3 | Aankomsttijd | 144 | time | ja |
| 4 | Naam persoon | 160 | text | ja (vergrendeld) |
| 5 | Personeelsnr | 152 | text | nee |
| 6 | Telefoonnummer | 160 | text | nee |
| 7 | E-mailadres | 200 | text | nee |
| 8 | VIP | 88 | dropdown | ja |
| 9 | Persoonstype | 144 | dropdown | ja |
| 10 | Contractortype | 152 | dropdown | ja |
| 11 | Bedrijf | 160 | text | ja |
| 12 | Passtatus | 176 | dropdown | ja |
| 13 | Compliance | 216 | dropdown | ja |
| 14 | Parkeren | 160 | dropdown | ja |
| 15 | Locatie(s) | 160 | combobox | ja |
| 16 | Contactpersoon | 200 | text | ja |
| 17 | Bezoekreden | 200 | text | ja |

Zie `columns.json` voor de volledige kolomconfiguratie (single source of truth).

---

## Gedrag

- **Search-velden** filteren live op typen (debounce applicable), substring match op `oninput`.
- **Dropdown-velden** openen een custom popover panel (DatePopover-stijl): "Filter" titel, klikbare optielijst (enkelvoudige selectie), divider, [Reset] [Toepassen] footer. "Alle" is niet als optie getoond — Reset-knop vervangt dit.
- **Combobox (locaties)** opent een popover met tekst-input + gefilterde suggestielijst van unieke locaties uit de store. Dezelfde [Reset] [Toepassen] footer.
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
