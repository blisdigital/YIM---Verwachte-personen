# Pagination

Paginering controls onderaan de tabel.

Figma-bronnen: [Epic – Verwachte personen `6:32511`](https://www.figma.com/design/LuyFTR1cgQe3mT6TAGvzVV/Epic--Verwachte-personen?node-id=6-32511&m=dev) (sub-frame Pagination `6:14384`) · YIM UI Kit [Pagination `2410:5555`](https://www.figma.com/design/RQhCroVydjMVySUhH4AoIw/YIM-UI-Kit?node-id=2410-5555) · [Dropdown (Date field) `2410:5327`](https://www.figma.com/design/RQhCroVydjMVySUhH4AoIw/YIM-UI-Kit?node-id=2410-5327)

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
| `pageSizeOptions` | `number[]` | `[10, 25, 50, 100]` | Beschikbare page sizes |

---

## Structuur

```
┌─ Pagination bar ────────────────────────────────────────────────────────────┐
│ ┌──────┐                                                                     │
│ │ 10 ▾ │  resultaten per pagina | 1-10 van 20      |◀  ◀  [1]  2  ▶  ▶|    │
│ └──────┘                                                                     │
└─────────────────────────────────────────────────────────────────────────────┘
  └ dropdown    └ tellertekst                          └ paginaknoppen
  └──── linker groep (gap 16px) ────┘                 └── rechter groep (gap 8px) ┘
  └────────────────────── justify-between ──────────────────────────────────────┘
```

---

## Design Tokens

| Categorie | Token | Waarde |
| --- | --- | --- |
| Colors | `N0` / `N50` | `#ffffff` / `#f8fafb` |
| | `N200` / `N300` / `N400` | `#ebeced` / `#eaeced` / `#b8babb` |
| | `N500` / `N800` / `N900` | `#999a9b` / `#3e3f40` / `#1d1e1f` |
| | `P500` | `#6daeba` |
| Spacing | `xs` / `s` / `m` / `l` / `xl` | `4px` / `8px` / `12px` / `16px` / `20px` |
| Corners | `s` / `m` | `4px` / `8px` |
| Typography | Label M — Nunito SemiBold | 14/20, tracking 0.14 |
| | Body M — Nunito Regular | 14/20, tracking 0 |

---

## Container

Hoogte 56px, padding `pt-xl pb-s px-l` (top 20 / bottom 8 / horizontaal 16), `flex`, `justify-between`, `align-items: center`, `width: 100%`. Geen eigen achtergrond of border.

---

## Links — per-page dropdown + tellertekst

| Prop | Waarde |
| --- | --- |
| Group gap | `Spacing-l` (16px) |
| Display | `flex`, `align-items: center` |

### Dropdown (YIM UI Kit `2410:5327`)

Bg `N0`, `Corner-s` (4px), overflow clip, hoogte 40px. Labeldeel: padding `Spacing-s`, breedte 48px, Body M. Icon-action: 40×40, bg `N50`, padding `Spacing-s`, 24px icoon.

| State | Border | Tekst | Icoon |
| --- | --- | --- | --- |
| Enabled | 1px `N400` | `N900` | `expand-more` (▾) |
| Hover | 1px `N800` | `N900` | `expand-more` (▾) |
| Focus/Open | **2px** `P500` | `N900` | `expand-less` (▴) |
| Disabled | 1px `N200` | `N500` | `expand-more` (▾) |

### Tellertekst

Label M / `N800`. Formaat: `{start}-{end} van {total}` waarbij `{end} = min(start + pageSize − 1, total)`.
Voorbeeld: `resultaten per pagina | 1-10 van 20`.

---

## Rechts — paginaknoppen

| Prop | Waarde |
| --- | --- |
| Group gap | `Spacing-s` (8px) |
| Knop-afmeting | 40×40 (`px-m` 12, `py-s` 8) |
| Knop-radius | `Corner-s` (4px) |
| Icoon-afmeting | 24px |

Volgorde: `first-page` · `chevron-left` · [paginanummers + ellipsis] · `chevron-right` · `last-page`

| Knop-state | Bg | Border | Inhoud | Wanneer |
| --- | --- | --- | --- | --- |
| Page — active | `P500` | — | `N0`, Label M | huidige pagina |
| Page — inactive | `N0` | 1px `N400` | `N800`, Label M | klikbare pagina |
| Ellipsis (…) | `N0` | 1px `N400` | `N800`, Label M | afgekorte reeks (niet klikbaar) |
| Nav — enabled | `N0` | 1px `N400` | icoon `N800` 24px | kan navigeren |
| Nav — disabled | `N0` | 1px **`N300`** | icoon `N400` 24px | einde reeks |

Icons (Material): `first-page` ⏮ · `chevron-left` ‹ · `chevron-right` › · `last-page` ⏭

Opmerking: disabled nav-knoppen hebben **border-kleur `N300`** (vs `N400` enabled) en **icoonkleur `N400`** (vs `N800` enabled) om de inactieve staat duidelijk zichtbaar te maken. `opacity: 0.5` staat niet in de Figma-tokens.

---

## Gedrag

- Ellipsis-knoppen `…` zijn **niet klikbaar** (geen hover/focus), puur visueel.
- Paginanummer-algoritme: max 7 knoppen — `eerste | ellipsis | huidig−2 | huidig−1 | huidig | huidig+1 | huidig+2 | ellipsis | laatste`. Op pagina 1 ellipsis rechts vóór laatste; op laatste pagina ellipsis links na eerste.
- Nav-knoppen `first`/`prev` zijn disabled op pagina 1; `next`/`last` zijn disabled op de laatste pagina.
- Per-page dropdown opent een menu met de `pageSizeOptions`. Na wijziging: pas paginering aan en ga terug naar pagina 1.
