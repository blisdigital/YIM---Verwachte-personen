# DataTable

Container voor de data tabel. De tabel scrolt horizontaal; de eerste twee kolommen (checkbox + actiemenu) zijn sticky. Kolommen zijn door de gebruiker breder/smaller te maken via een drag-handle op de rechterrand van elke kolomheader.

```vue
<DataTable
  :columns="columns"
  :data="personen"
  :loading="loading"
  @row-click="openDetail"
>
  <template #row="{ item }">
    <TableRow :person="item" />
  </template>
</DataTable>
```

| Prop | Type | Default | Beschrijving |
|------|------|---------|--------------|
| `columns` | `Column[]` | — | Kolom definities |
| `data` | `Person[]` | — | Data array |
| `loading` | `boolean` | `false` | Loading state |
| `sortable` | `boolean` | `true` | Sortering toestaan |

**Opbouw:**
1. [ColumnFilters](ColumnFilters.md) — filter-rij onder kolomheaders
2. [TableRow](TableRow.md) — één instantie per rij in `data`
3. [Pagination](Pagination.md) — onderaan de tabel

## Horizontale scroll

```
┌──────────────────────────────────────────────────────────────────────────┐
│  STICKY          │  SCROLLBAAR DEEL →                                    │
│  ☐  •••          │  Status | Aankomstdatum | Tijd | Naam | VIP | ... | Bezoekreden │
│                  │                                                       │
│  (left:0)(left:48)  overflow-x: auto                                     │
└──────────────────────────────────────────────────────────────────────────┘
```

**CSS structuur:**
- `.table-wrap` — Buitenste container met border en border-radius
- `.table-scroll` — `overflow-x: auto; overflow-y: visible` scroll-container
- `table` — `table-layout: auto; min-width: 100%; width: max-content` — kolommen auto-sizeen op inhoud; tabel vult minimaal 100% breedte

**Sticky kolommen:**

- `.st0` — Checkbox kolom: `position: sticky; left: 0; z-index: 6` — breedte **48px**
- `.st1` — Actie kolom: `position: sticky; left: 48px; z-index: 6` — breedte **48px**
- Sticky cellen gebruiken `background: inherit` zodat de rij-state (hover/selected) automatisch doorwerkt — geen eigen achtergrondkleur

## Kolomheader design tokens

Figma: [`54:49591`](https://www.figma.com/design/LuyFTR1cgQe3mT6TAGvzVV/Epic--Verwachte-personen?node-id=54-49591&m=dev) (sticky) + [`53:14068`](https://www.figma.com/design/LuyFTR1cgQe3mT6TAGvzVV/Epic--Verwachte-personen?node-id=53-14068&m=dev) (scrollbaar)

### Gedeelde tokens

| Token | Waarde | Gebruik |
| --- | --- | --- |
| `--n50` | `#f8fafb` | Achtergrond alle headercellen |
| `--n300` | `#eaeced` | `border-right: 1px solid` tussen cellen |
| `--col-header-height` | `40px` | Vaste hoogte elke headercel |

### Sticky kolomheaders (48px breed elk)

| Eigenschap | Waarde |
| --- | --- |
| Breedte | `48px` |
| Padding | `6px 8px` (py/px) |
| Achtergrond | `--n50` |
| Border-right | `1px solid --n300` |
| Border-top-left-radius | `4px` (alleen `.st0`, eerste cel van de tabel) |
| Layout | `flex; align-items: center; justify-content: center` |

**Checkbox** (in `.st0`-header):

| Eigenschap | Waarde |
| --- | --- |
| Afmeting | `20px × 20px` |
| Achtergrond | `--n0` (`#ffffff`) |
| Border | `1px solid --n800` (`#3e3f40`) |
| Border-radius | `4px` |

**State-layer** (hover-aura rond checkbox):

| Eigenschap | Waarde |
| --- | --- |
| Padding | `4px` |
| Border-radius | `360px` |
| Hover achtergrond | `rgba(17, 19, 19, 0.06)` |

### Scrollbare kolomheaders

| Eigenschap | Waarde |
| --- | --- |
| Padding | `8px 16px` (verticaal / horizontaal) — symmetrisch |
| Achtergrond | `--n50` |
| Border-right | `1px solid --n300` |
| Border-top-right-radius | `4px` (alleen de laatste kolom) |
| Layout | `flex; align-items: center; justify-content: space-between` |

**Kolomtitel — typografie (Label M):**

| Token | Waarde |
| --- | --- |
| Font | `Nunito` |
| Weight | `600` (semibold) |
| Size | `14px` |
| Line-height | `20px` |
| Letter-spacing | `0.14px` |
| Kleur | `--p700` (`#315161`) |
| White-space | `nowrap` |

### Sort-states

Sorteerbare kolommen tonen een **24×24 Material icon** rechts in de cel. Kleur is altijd `--p700`; alleen het icoon wisselt.

| State | `aria-sort` | Material icon |
| --- | --- | --- |
| Niet gesorteerd | `"none"` | `unfold_more` (▲▼ gestapeld) |
| Aflopend actief | `"descending"` | `arrow_drop_down` (▼) |
| Oplopend actief | `"ascending"` | `arrow_drop_up` (▲) |
| Niet sorteerbaar | — | Geen icoon |

**Klikcyclus:** `none → descending → ascending → none`

Kolommen zonder sorteeroptie (`sortable: false` in columns.json) gebruiken de "niet sorteerbaar"-variant: geen icoon, `justify-content: flex-start`. Alle kolomheaders hebben padding `8px 16px` (symmetrisch).

### Sticky shadow bij horizontaal scrollen

Zodra `scrollLeft > 0` op de tabelwrapper: voeg een rechts-gerichte shadow toe aan de laatste sticky cel (`.st1`):

```css
.table-wrap[data-scrolled="true"] .st1 {
  box-shadow: 4px 0 4px -2px rgba(17, 19, 19, 0.08);
}
```

Detecteer scrollen via een `scroll`-listener op `.table-scroll` en toggle `data-scrolled` op `.table-wrap`.

---

## Kolom resize

Elke kolomheader (behalve checkbox en actiemenu) heeft een zichtbare border rechts (`<div class="col-rz">`) aan de rechterkant. De gebruiker kan deze border slepen om de kolombreedte aan te passen.

```css
.col-rz {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 5px;
  cursor: col-resize;
  z-index: 2;
  background: transparent;
}
.col-rz:hover {
  background: var(--p300);
}
```

**Gedrag:**
1. `mousedown` op `.col-rz` → start resize (sla begin-X en oorspronkelijke kolombreedte op)
2. `mousemove` op `document` → bereken delta, pas `style.width` van de `<th>` aan
3. `mouseup` → stop resize, verwijder listeners

## Rij klik → Detail panel

De hele `<tr>` heeft een `onclick` handler. Klikken opent het slide-out detail panel rechts. Uitzondering: klikken op checkbox, actiemenu of andere interactieve elementen stopt propagatie.

```javascript
function handleRowClick(event, id) {
  if (event.target.closest('.act-wrap, .dd-wrap') || event.target.tagName === 'INPUT') return;
  openDP(id);
}
```

**Visuele feedback:**

- `cursor: pointer` op `<tr>` (body rows)
- Hover state: `background: var(--n50)` (`#f8fafb`) op de hele rij
- Geselecteerde rij (checkbox): `background: var(--p50)` (`#f0f7f8`)
- Geselecteerde rij + hover: `background: var(--p100)` (`#d6e8ec`)

## Kolom definities

Kolom configuratie staat in **`columns.json`** (single source of truth). TypeScript interface:

```typescript
interface Column {
  key: string
  label: string
  width: number               // vaste breedte in px voor sticky kolommen; voor scrollbare kolommen: fallback bij resize (kolommen auto-sizeen standaard op inhoud)
  sticky?: boolean            // sticky positie (alleen checkbox + actiemenu)
  stickyLeft?: number         // left-offset in px voor sticky kolommen
  sortable?: boolean          // sorteer-icoon tonen
  filter?: 'text' | 'dropdown' | 'date' | 'time' | null
  filterOptions?: string[]    // opties voor dropdown-filters
  description?: string        // context voor ontwikkelaars
}
```

Zie [`columns.json`](../columns.json) voor de volledige configuratie met 21 kolommen (2 sticky + 19 scrollbaar, waarvan 3 standaard verborgen).
