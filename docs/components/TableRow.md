# TableRow

Enkele rij in de data tabel. De hele rij is klikbaar en opent het detail panel. Bevat twee sticky cellen (checkbox + actiemenu) en scrollbare datacellen.

**Figma:** [`53:1341`](https://www.figma.com/design/LuyFTR1cgQe3mT6TAGvzVV/Epic--Verwachte-personen?node-id=53-1341&m=dev) · [`6:14979`](https://www.figma.com/design/LuyFTR1cgQe3mT6TAGvzVV/Epic--Verwachte-personen?node-id=6-14979&m=dev)

## Relaties
- **Gebruikt door:** DataTable
- **Gebruikt:** StatusDot, PassStatusDot, ComplianceCell, ActionMenu, Tooltip

## Gebruik

```vue
<TableRow
  :person="person"
  :columns="columns"
  :column-widths="columnWidths"
  @open-detail="openDetail(person)"
  @action="handleAction"
/>
```

## Props

| Prop | Type | Default | Beschrijving |
|------|------|---------|-------------|
| `person` | `Object` | *required* | Persoon data |
| `columns` | `Array` | `[]` | Zichtbare kolom definities |
| `columnWidths` | `Object` | `{}` | Breedte overrides per kolom-key |

## Events

| Event | Payload | Beschrijving |
|-------|---------|-------------|
| `open-detail` | `person` | Rij geklikt (buiten checkbox/actiemenu) |
| `action` | `{ action, person }` | Actie uit ActionMenu dropdown |

## Gedrag

### Rij-states

| State | Achtergrond | Trigger |
|-------|-------------|---------|
| Default | `--n0` | -- |
| Hover | `--n50` | Muis over rij |
| Selected | `--p50` | Checkbox checked |
| Selected + hover | `--p100` | Hover op geselecteerde rij |

### Cel rendering per kolom

| Kolom | Rendering |
|-------|-----------|
| `naam` | Plain tekst, rij-click trigger |
| `vip` | `star` filled icon `--vip-border` als true |
| `status` | Chip met kleur per status |
| `credentialStatus` | Dot + label (PassStatusDot) |
| `compliance` | Twee pills via ComplianceCell |
| `locaties` | Pills `--p100`/`--p700`; max 3, overflow `+n` met Tooltip |
| `parkeren` | Kenteken of "Niet gereserveerd" |
| Overige | Plain tekst Body M `--n900` |

### Status chip kleuren

| Status | Achtergrond | Tekst |
|--------|-------------|-------|
| Verwacht | `--b50` | `--b500` |
| Nog niet aangekomen | `--y50` | `--y700` |
| Aangemeld | `--g50` | `--g500` |
| Afgemeld | `--n100` | `--n800` |
| Niet aangekomen | `--r50` | `--r500` |
| Geannuleerd | `--r50` | `--r500` |

## Design Tokens

| Element | Token | Waarde |
|---------|-------|--------|
| Rij default bg | `--n0` | `#ffffff` |
| Rij hover | `--n50` | `#f8fafb` |
| Rij selected | `--p50` | `#f0f7f8` |
| Rij selected+hover | `--p100` | `#d6e8ec` |
| Cel border | `--n200` | -- |
| Cel tekst | `--n900` | `#1d1e1f` |
| Cel padding | -- | 16px H x 12px V |
| VIP icon | `--vip-border` | `#f59e0b` |
| Locatie pill bg | `--p100` | `#d6e8ec` |
| Locatie pill tekst | `--p700` | `#1a7a8a` |
| Locatie pill radius | `--r-xl` | `360px` |
| Sticky shadow | -- | `4px 0 4px -2px rgba(17,19,19,0.08)` |
