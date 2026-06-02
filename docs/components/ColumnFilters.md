# ColumnFilters

Rij met per-kolom filter-inputs direct onder de kolomheaders. Twee sticky lege cellen links (checkbox + actie), scrollbare filtercellen per datakolom. Celbreedtes matchen 1-op-1 de kolomheaders.

**Figma:** [`53:15693`](https://www.figma.com/design/LuyFTR1cgQe3mT6TAGvzVV/Epic--Verwachte-personen?node-id=53-15693&m=dev) · [`54:49592`](https://www.figma.com/design/LuyFTR1cgQe3mT6TAGvzVV/Epic--Verwachte-personen?node-id=54-49592&m=dev) · [`207:39083`](https://www.figma.com/design/LuyFTR1cgQe3mT6TAGvzVV/Epic--Verwachte-personen?node-id=207-39083&m=dev)

## Relaties
- **Gebruikt door:** DataTable
- **Gebruikt:** DatePopover, TimePopover

## Gebruik

```vue
<ColumnFilters :columns="columns" :column-widths="columnWidths" v-model="columnFilters" />
```

## Props

| Prop | Type | Default | Beschrijving |
|------|------|---------|-------------|
| `columns` | `Array` | `[]` | Kolom definities |
| `columnWidths` | `Object` | `{}` | Breedte overrides per kolom-key |
| `modelValue` | `Object` | `{}` | Filter-object met per kolom-key de filterwaarde |

## Events

| Event | Payload | Beschrijving |
|-------|---------|-------------|
| `update:modelValue` | `Object` | Bijgewerkt filter-object |

## Gedrag

- **Search-velden** filteren live op typen (debounce), substring match.
- **Dropdown-velden** openen een custom popover: "Filter" titel, klikbare optielijst, [Reset] [Toepassen] footer.
- **Combobox (locaties)** opent popover met tekst-input + gefilterde suggestielijst.
- **Date-veld** opent `DatePopover` via `<Teleport to="body">`; gekoppeld aan `filterStore.datum`.
- **Time-veld** opent een time-picker.
- Filters stapelen met de globale filterstrip (extra AND-clause).

### Veldtypes (allemaal 32px hoog)

| Type | Stijl | Trigger |
|------|-------|---------|
| Search | bg `--n0`, border `--n400`, radius `--r-s` | Type-to-filter |
| Dropdown/Date/Time chip | bg `--p700`, witte tekst + chevron | Klik opent popover |
| Actief filter | bg `--n0`, tekst `--p700` | Waarde gezet |

### Dropdown popover

Bg `--n0`, shadow `--shadow-m`, 240px breed. Titel "Filter" 18px/700/`--p700`. Footer: [Reset] outlined + [Toepassen] primary.

### Per-kolom mapping

Zie `columns.json` voor volledige configuratie. 17 data-kolommen met filter types: text (6x), dropdown (6x), date (1x), time (1x), combobox (1x), geen filter (2x sticky).

## Design Tokens

| Element | Token | Waarde |
|---------|-------|--------|
| Sticky cel bg | `--n50` | `#f8fafb` |
| Sticky cel border | `--n300` | `#eaeced` |
| Scrollbare cel bg | `--p700` | teal |
| Scrollbare cel border | `--p800` | -- |
| Cel padding | `--s-xs` `--s-s` | 4px 8px |
| Search veld bg | `--n0` | `#ffffff` |
| Search veld border | `--n400` | `#b8babb` |
| Chip tekst kleur | `--n0` | `#ffffff` |
| Focus border | `--p500` | -- |
| Corner radius | `--r-s` | 4px |
