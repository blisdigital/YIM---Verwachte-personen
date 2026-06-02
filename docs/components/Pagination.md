# Pagination

Pagineringscontrols onderaan de tabel. Bevat paginaknoppen, een per-page dropdown en een tellertekst.

**Figma:** [Epic -- Verwachte personen](https://www.figma.com/design/LuyFTR1cgQe3mT6TAGvzVV/Epic--Verwachte-personen?node-id=6-32511&m=dev) node-id: 6:14384 -- [YIM UI Kit Pagination](https://www.figma.com/design/RQhCroVydjMVySUhH4AoIw/YIM-UI-Kit?node-id=2410-5555) -- [Dropdown](https://www.figma.com/design/RQhCroVydjMVySUhH4AoIw/YIM-UI-Kit?node-id=2410-5327)

## Relaties
- **Gebruikt door:** VerwachtePersonenView
- **Gebruikt:** Geen child-componenten

## Gebruik
```vue
<Pagination
  :total="totalItems"
  :page-size="pageSize"
  v-model:page="currentPage"
  v-model:page-size="pageSize"
/>
```

## Props
| Prop | Type | Default | Beschrijving |
|------|------|---------|-------------|
| `total` | `number` | `0` | Totaal aantal items |
| `page` | `number` | `1` | Huidige pagina |
| `pageSize` | `number` | `10` | Items per pagina |
| `pageSizeOptions` | `number[]` | `[10, 20, 30, 50]` | Beschikbare page sizes |

## Events
| Event | Payload | Beschrijving |
|-------|---------|-------------|
| `update:page` | `number` | Gebruiker navigeert naar een andere pagina |
| `update:page-size` | `number` | Gebruiker wijzigt het aantal items per pagina; reset pagina naar 1 |

## Gedrag
- **Layout:** `flex`, `justify-between`, `align-items: center`. Padding `pt-xl pb-l px-l` (20/16/16). Geen eigen achtergrond of border.
- **Links:** paginaknoppen (gap 8px) + per-page dropdown (gap 16px ertussen).
- **Rechts:** tellertekst `{start}-{end} van {total} items` (Label M / `--n800`).
- **Paginaknoppen:** volgorde `first-page` - `chevron-left` - [nummers + ellipsis] - `chevron-right` - `last-page`. Knop 40x40, pill-radius (`360px`), icoon 24px.
- **Paginanummer-algoritme:** max 7 knoppen -- `eerste | ellipsis | huidig-2 | huidig-1 | huidig | huidig+1 | huidig+2 | ellipsis | laatste`.
- Ellipsis-knoppen `...` zijn niet klikbaar (puur visueel).
- Nav-knoppen `first`/`prev` disabled op pagina 1; `next`/`last` disabled op laatste pagina.
- Per-page dropdown opent een menu met `pageSizeOptions`. Na wijziging: reset naar pagina 1.

### Knop-states
| State | Bg | Tekst/Icoon | Wanneer |
|-------|----|-------------|---------|
| Page actief | `--p500` | `--n0`, Label M | huidige pagina |
| Page inactief | `--p50` | `--p700`, Label M | klikbare pagina |
| Ellipsis | `--p50` | `--p700`, Label M | afgekorte reeks |
| Nav enabled | `--p50` | icoon `--n800` 24px | kan navigeren |
| Nav disabled | `--n50` | icoon `--n400` 24px | einde reeks |

### Dropdown-states
| State | Border | Tekst | Icoon |
|-------|--------|-------|-------|
| Enabled | 1px `--n400` | `--n900` | `arrow_drop_down` |
| Hover | 1px `--n800` | `--n900` | `arrow_drop_down` |
| Focus/Open | 2px `--p500` | `--n900` | `arrow_drop_down` |
| Disabled | 1px `--n200` | `--n500` | `arrow_drop_down` |

Dropdown: bg `--n0`, `border-radius: --r-s` (4px), hoogte 40px. Labeldeel: padding `--sp-s`, breedte 48px, Body M. Icon-action: 40x40, border-left 1px `--n400`.

## Design Tokens
| Element | Token | Waarde |
|---------|-------|--------|
| Kleuren | `--n0` / `--n50` | `#ffffff` / `#f8fafb` |
| | `--n200` / `--n400` / `--n500` | `#ebeced` / `#b8babb` / `#999a9b` |
| | `--n800` / `--n900` | `#3e3f40` / `#1d1e1f` |
| | `--p50` / `--p500` / `--p700` | `#f0f7f8` / `#6daeba` / `#1a7a8a` |
| Spacing | `--sp-xs` / `--sp-s` / `--sp-m` / `--sp-l` / `--sp-xl` | `4px` / `8px` / `12px` / `16px` / `20px` |
| Corners | `--r-s` / `--r-m` | `4px` / `8px` |
| Typografie | Label M | Nunito SemiBold 14/20, ls 0.14px |
| | Body M | Nunito Regular 14/20 |
