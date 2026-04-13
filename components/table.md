# Table Components

## DataTable

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

### Horizontale scroll

```
┌──────────────────────────────────────────────────────────────────────────┐
│  STICKY          │  SCROLLBAAR DEEL →                                    │
│  ☐  •••          │  Naam | Personeelsnr | VIP | ... | Bezoekreden        │
│                  │                                                       │
│  (left:0)(left:40)  overflow-x: auto                                     │
└──────────────────────────────────────────────────────────────────────────┘
```

**CSS structuur:**
- `.table-wrap` — Buitenste container met border en border-radius
- `.table-scroll` — `overflow-x: auto; overflow-y: visible` scroll-container
- `table` — Volledige breedte tabel (`min-width` groter dan viewport)

**Sticky kolommen:**
- `.st0` — Checkbox kolom: `position: sticky; left: 0; z-index: 6`
- `.st1` — Actie kolom: `position: sticky; left: 40px; z-index: 6`
- Achtergrondkleur van sticky cellen moet meegaan met hover/selected state zodat onderliggende content niet doorschijnt

### Kolom resize

Elke kolomheader (behalve checkbox en actiemenu) heeft een zichtbare border rechts (`<div class="col-rz">`) aan de rechterkant. De gebruiker kan deze border slepen om de kolombreedte aan te passen (groter of kleiner maken).

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

### Rij klik → Detail panel

De hele `<tr>` heeft een `onclick` handler. Klikken opent het slide-out detail panel rechts (zie `openDP()` in index.html). Uitzondering: klikken op checkbox, actiemenu of andere interactieve elementen stopt propagatie.

```javascript
function handleRowClick(event, id) {
  // Niet openen als er op een checkbox, dropdown of interactief element geklikt is
  if (event.target.closest('.act-wrap, .dd-wrap') || event.target.tagName === 'INPUT') return;
  openDP(id);
}
```

**Visuele feedback:**
- `cursor: pointer` op `<tr>` (body rows)
- Hover state: `background: var(--p50)` op de hele rij
- Geselecteerde rij (checkbox): `background: #e2eff4`

---

### Kolom definities

Kolom configuratie staat in **`columns.json`** (single source of truth). TypeScript interface:

```typescript
interface Column {
  key: string
  label: string
  width: number               // initiële breedte in px (resizable door gebruiker)
  sticky?: boolean            // sticky positie (alleen checkbox + actiemenu)
  stickyLeft?: number         // left-offset in px voor sticky kolommen
  sortable?: boolean          // sorteer-icoon tonen
  filter?: 'text' | 'dropdown' | 'date' | 'time' | null
  filterOptions?: string[]    // opties voor dropdown-filters
  description?: string        // context voor ontwikkelaars
}
```

Zie [`columns.json`](../columns.json) voor de volledige configuratie met 17 kolommen (2 sticky + 15 scrollbaar).

---

## TableRow

Enkele rij in de tabel. De hele rij is klikbaar en opent het detail model pop-up in het midden van het scherm.

```vue
<TableRow
  :person="person"
  :selected="isSelected(person.id)"
  @select="toggleSelect(person.id)"
  @open-detail="openDetail(person)"
  @action="handleAction"
/>
```

| Prop | Type | Default | Beschrijving |
|------|------|---------|--------------|
| `person` | `Person` | — | Persoon data |
| `selected` | `boolean` | `false` | Is geselecteerd |

**Events:**
- `@select` — Checkbox toggle
- `@open-detail` — Rij geklikt (buiten checkbox/actiemenu)
- `@action` — Actie uit dropdown menu

**Cel rendering per kolom:**

| Kolom | Rendering |
|-------|-----------|
| `select` | `<Checkbox />` — sticky, stopt propagatie |
| `actions` | `<ActionMenu />` via ••• icoon — sticky, stopt propagatie |
| `naam` | Klikbare `<button>` met naam van persoon (geen VIP-ster — die staat in de VIP-kolom) |
| `personeelsnr` | Plain tekst |
| `vip` | Sterretje icoon (`star`) als `true`, anders `—` |
| `persoontype` | Plain tekst ("Bezoeker" / "Contractor") |
| `contractortype` | Plain tekst of `—` als null |
| `bedrijf` | Plain tekst |
| `locaties` | Kommagescheiden; bij overflow afgekapt met `text-overflow: ellipsis` + tooltip |
| `datumVanaf` | Geformatteerde datum (DD-MM-YYYY) |
| `aankomsttijd` | Tijd (HH:mm) |
| `status` | `<StatusBadge />` |
| `passtatus` | `<PassStatusDot />` |
| `compliance` | `<ComplianceCell />` — zie `components/ui-atoms.md` voor tooltip-spec |
| `parkeren` | Parkeer-indicator |
| `contactpersoon` | Naam + telefoonicoon |
| `bezoekreden` | Plain tekst |

**VIP rij styling:**
- Gele accent `border-left: 3px solid var(--vip-border)` op de eerste sticky cel
- Subtiele VIP achtergrondkleur

---

## ColumnFilters

Rij met filter-inputs direct onder de kolomheaders. Elke kolom heeft een eigen filtertype.

```vue
<ColumnFilters :columns="columns" v-model="columnFilters" />
```

**Filter types per kolom:**

| Type | Element | Gedrag |
|------|---------|--------|
| `text` | Flex container: `<input>` links + 32×32px icon-area rechts met `search` (24px) | Filtert op substring match, `oninput`; border op de wrapper, niet op input |
| `dropdown` | `<select appearance:none>` + `arrow_drop_down` caret (18px) rechts | Filtert op exacte match, default "Alle" |
| `date` | `<button>` met datum-tekst links + `today` icoon (18px) rechts | Opent `DatePopover` via `<Teleport to="body">` |
| `time` | `<select appearance:none>` + `schedule` icoon (18px) rechts (geen caret) | Filtert op tijdstip, default "Alle" |

**Visuele specs:**
- Alle filter-controls: hoogte 32px, `border: 1px solid var(--n400)`, `border-radius: var(--r-s)`
- Font: 14px / 400, `letter-spacing: 0`, kleur `var(--n900)`
- Placeholder kleur: `var(--n500)`
- Focus: `border-color: var(--p500)`
- Icons: `var(--n500)`, Material Icons Round

**Sticky kolommen** (checkbox + actiemenu) hebben lege filtercellen die ook sticky zijn.

---

## Pagination

Paginering controls onderaan de tabel.

```vue
<Pagination
  :total="totalItems"
  :page-size="pageSize"
  v-model:page="currentPage"
  v-model:page-size="pageSize"
/>
```

| Prop | Type | Default | Beschrijving |
|------|------|---------|--------------|
| `total` | `number` | — | Totaal aantal items |
| `page` | `number` | `1` | Huidige pagina |
| `pageSize` | `number` | `10` | Items per pagina |
| `pageSizeOptions` | `number[]` | `[10, 20, 50]` | Beschikbare page sizes |

**Visueel:**
```
[10 ▾] resultaten per pagina | 1–10 van 20     |◀ ◀ [1] [2] ▶ ▶|
```

**Gedrag:**
- Eerste/vorige/volgende/laatste navigatie
- Actieve pagina heeft teal achtergrond (`--p500`)
- Disabled state voor eerste/laatste pagina knoppen
