# DataTable

Container voor de data tabel met horizontale scroll. Actie- en checkbox-kolom zijn sticky. Kolommen zijn resizable via drag-handle op de rechterrand van elke kolomheader.

**Figma:** [`54:49591`](https://www.figma.com/design/LuyFTR1cgQe3mT6TAGvzVV/Epic--Verwachte-personen?node-id=54-49591&m=dev) (sticky) · [`53:14068`](https://www.figma.com/design/LuyFTR1cgQe3mT6TAGvzVV/Epic--Verwachte-personen?node-id=53-14068&m=dev) (scrollbaar)

## Relaties
- **Gebruikt door:** VerwachtePersonenView
- **Gebruikt:** TableRow, ColumnFilters

## Gebruik

```vue
<DataTable
  :data="personen"
  :loading="loading"
  @row-click="openDetail"
  @action="handleAction"
/>
```

## Props

| Prop | Type | Default | Beschrijving |
|------|------|---------|-------------|
| `data` | `Array` | `[]` | Data array (Person objecten) |
| `loading` | `Boolean` | `false` | Loading state |

## Events

| Event | Payload | Beschrijving |
|-------|---------|-------------|
| `row-click` | `person` | Rij geklikt (buiten checkbox/actiemenu) |
| `sort` | `{ key, direction }` | Kolomsortering gewijzigd |
| `action` | `{ action, person }` | Actie uit rij-dropdown menu |

## Gedrag

### Horizontale scroll

- `.table-wrap` — buitenste container met border en border-radius
- `.table-scroll` — `overflow-x: auto; overflow-y: visible`
- `table` — `table-layout: auto; min-width: 100%; width: max-content`
- Sticky actie kolom: `position: sticky; left: 0; z-index: 6`
- Shadow bij scroll: `box-shadow: 4px 0 4px -2px rgba(17,19,19,0.08)`

### Sort-states

Klikcyclus: `none` -> `descending` -> `ascending` -> `none`.

| State | `aria-sort` | Icon |
|-------|-------------|------|
| Niet gesorteerd | `"none"` | `unfold_more` |
| Aflopend | `"descending"` | `arrow_drop_down` |
| Oplopend | `"ascending"` | `arrow_drop_up` |

### Kolom resize

Drag-handle `.col-rz` op rechterrand van elke kolomheader (behalve checkbox/actie). `mousedown` start resize, `mousemove` past breedte aan, `mouseup` stopt.

### Rij klik

Hele `<tr>` klikbaar, opent detail panel. Klik op checkbox/actiemenu stopt propagatie. Hover `--n50`, selected `--p50`, selected+hover `--p100`.

### Kolom definities

Configuratie in `columns.json` (single source of truth): 21 kolommen (2 sticky + 19 scrollbaar, waarvan 3 standaard verborgen).

## Design Tokens

| Element | Token | Waarde |
|---------|-------|--------|
| Header achtergrond | `--n50` | `#f8fafb` |
| Header border | `--n300` | `#eaeced` |
| Header hoogte | `--col-header-height` | `40px` |
| Kolomtitel kleur | `--p700` | `#315161` |
| Kolomtitel font | Nunito 600 | 14px/20px, 0.14px |
| Checkbox | `--n0` bg, `--n800` border | 20x20, radius 4px |
| Resize handle hover | `--p300` | -- |
| Sticky shadow | -- | `4px 0 4px -2px rgba(17,19,19,0.08)` |
