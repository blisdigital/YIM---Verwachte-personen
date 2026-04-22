# FilterChip

Generieke filter-chip die een checkbox-dropdown opent.

```vue
<FilterChip
  label="Status"
  :options="statusOptions"
  v-model="selectedStatuses"
/>
```

| Prop | Type | Default | Beschrijving |
|------|------|---------|--------------|
| `label` | `string` | — | Chip label |
| `options` | `{ value: string, label: string }[]` | — | Beschikbare opties |
| `modelValue` | `string[]` | `[]` | Geselecteerde waarden |

**Status opties:**
- `verwacht` / Verwacht
- `aangekomen` / Aangekomen
- `no-show` / No-show
- `geannuleerd` / Geannuleerd
- `vertrokken` / Vertrokken

**Compliance opties:**
- `dossier-volledig` / Dossier volledig
- `dossier-onvolledig` / Dossier onvolledig
- `elearning-voltooid` / E-learning voltooid
- `elearning-niet-voltooid` / E-learning niet voltooid

**Parkeren opties:**
- `gereserveerd` / Gereserveerd
- `niet-gereserveerd` / Niet gereserveerd

**Chip icoon:** `arrow_drop_down` (gesloten) / `arrow_drop_up` (open) — Material Icons caret.

**States:**
- Standaard: `--n0` achtergrond, `--n400` border
- Hover: `--p500` border
- Open: `--n100` achtergrond, `--n700` border (ongeacht selectie)
- Actief (selectie, niet open): `--p50` achtergrond, `--p700` border + tekst + badge

**Dropdown:** Teleported naar `<body>` als `position: fixed`. Rechts uitgelijnd aan de rechterrand van de chip via `right: document.documentElement.clientWidth - rect.right` (gebruik `clientWidth`, niet `innerWidth`, om scrollbar-breedte te compenseren). `min-width: max-content`. Native `<input type="checkbox">` met `accent-color: --p500`.

**Events:** `@update:modelValue`
