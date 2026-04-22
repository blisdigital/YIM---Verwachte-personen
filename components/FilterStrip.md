# FilterStrip

Horizontale balk die alle filtercomponenten combineert: type-tabs, datum, filter-chips en zoekbalk.

```vue
<FilterStrip
  v-model:persoontype="activePersoontype"
  v-model:date="selectedDate"
  v-model:preset="activePreset"
  v-model:statuses="selectedStatuses"
  v-model:compliance="selectedCompliance"
  v-model:parkeren="selectedParkeren"
  v-model:search="searchQuery"
  :counts="counts"
/>
```

**Opbouw (links → rechts):**

1. [`TypeTabs`](TypeTabs.md) — persoontype segmented control
2. [`DateFilterChip`](DateFilterChip.md) — datumfilter chip
3. [`FilterChip`](FilterChip.md) label="Status" — statusfilter
4. [`FilterChip`](FilterChip.md) label="Compliance" — compliancefilter
5. [`FilterChip`](FilterChip.md) label="Parkeren" — parkerenfilter
6. [`SearchBox`](SearchBox.md) — zoekbalk

**Layout:** twee groepen in een `display: flex` container met `justify-content: space-between` en `gap: --sp-m` (12px) tussen de groepen.

- **`filter-left`** — TypeTabs, `flex-shrink: 0`, `align-items: center`
- **`filter-right`** — DateFilterChip + 3× FilterChip + SearchBox; `gap: --sp-s` (8px) tussen items; alle items `height: 40px` (chips stretchen mee met de SearchBox-hoogte)

SearchBox is `320px` fixed breed (niet `flex: 1`).

**Responsive — breakpoint `max-width: 1279px` (tablet):**

| Aspect | Desktop (≥1280px) | Tablet (<1280px) |
| --- | --- | --- |
| Strip-richting | `row`, `space-between` | `column`, `stretch` |
| Gap strip | `--sp-m` (12px) | `--sp-s` (8px) |
| Rechts-groep breedte | content-driven | `100%` |
| Rechts-groep overflow | `wrap` | `nowrap` + `overflow-x: auto` |
| SearchBox breedte | 320px | 320px (scrollt mee) |

TypeTabs blijft full-width bovenaan op tablet; de rechter groep scrollt horizontaal in een eigen rij.

**Overflow/Teleport:** popovers en dropdowns zijn via `<Teleport to="body">` losgemaakt van de scrollende container — anders clipt `overflow-x: auto` op tablet ze weg.
