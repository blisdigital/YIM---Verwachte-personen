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
- `nog niet aangekomen` / Nog niet aangekomen
- `aangemeld` / Aangemeld
- `afgemeld` / Afgemeld
- `niet aangekomen` / Niet aangekomen
- `geannuleerd` / Geannuleerd

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

---

## Design Tokens

| Element | Token | Waarde |
| --- | --- | --- |
| Chip achtergrond (standaard) | `--n0` | `#ffffff` |
| Chip border (standaard) | `--n400` | `#b8babb` |
| Chip tekst (standaard) | `--n900` | `#1d1e1f` |
| Chip border hover | `--p500` | `#6daeba` |
| Chip bg (open) | `--n100` | `#f3f4f5` |
| Chip border (open) | `--n700` | `#555657` |
| Chip bg (actief) | `--p50` | `#f0f7f8` |
| Chip border (actief) | `--p700` | `#1a7a8a` |
| Chip tekst (actief) | `--p700` | `#1a7a8a` |
| Badge achtergrond | `--p500` | `#6daeba` |
| Badge tekst | `--n0` | `#ffffff` |
| Badge radius | `--r-xl` | `360px` |
| Dropdown achtergrond | `--n0` | `#ffffff` |
| Dropdown shadow | `--shadow-m` | `0px 4px 16px -2px rgba(17,19,19,0.16)` |
| Dropdown radius | `--r-s` | `4px` |
| Optie hover | `--n100` | `#f3f4f5` |
| Checkbox border | `--n800` | `#3e3f40` |
| Checkbox checked bg | `--p500` | `#6daeba` |
| Checkbox checked hover | `--p600` | `#3d97a5` |
| Optie label kleur | `--n800` | `#3e3f40` |
| Chip radius | `--r-s` | `4px` |
