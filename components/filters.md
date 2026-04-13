# Filter Components

## TypeTabs

Gesegmenteerde knoppengroep voor filteren op persoontype, met count-badges.

```vue
<TypeTabs v-model="activePersoontype" :counts="counts" />
```

| Prop | Type | Default | Beschrijving |
|------|------|---------|--------------|
| `modelValue` | `'Bezoeker' \| 'Contractor' \| null` | `null` | Actief type (null = Alle) |
| `counts` | `{ alle: number, bezoekers: number, contractors: number }` | — | Aantallen per categorie |

**Visueel:**
```
[Alle 20] [Bezoekers 8] [Contractors 12]
```
Actieve tab heeft teal achtergrond (`--p500`), inactieve tabs zijn outlined.

**Events:** `@update:modelValue`

---

## DateFilterChip

Chip-knop die een datum-filterpopover opent. Gebruikt `DatePopover` (gedeelde component) en rendert de popover via `<Teleport to="body">` met `position: fixed` zodat de overflow van de filterstrip-container het paneel niet afsnijdt.

```vue
<DateFilterChip
  v-model="selectedDate"
  v-model:preset="activePreset"
/>
```

| Prop | Type | Default | Beschrijving |
|------|------|---------|--------------|
| `modelValue` | `Date` | `new Date()` | Geselecteerde datum |
| `preset` | `'vandaag' \| 'morgen' \| 'week' \| null` | `'vandaag'` | Actieve preset |

**Popover inhoud** (zie `DatePopover`):
- "Filter" titel — `18px / 700`, `--p700`
- "Kies datum": styled datumveld met kalender-icoon; klikken opent `DatePickerCalendar` inline
- `DatePickerCalendar`: volledig custom kalender in YIM-stijl
- "Selecteer": preset-chips — Vandaag / Morgen / Deze week (rechthoekig `--r-s`)
- Knoppen: Resetten | Toepassen (beide `flex: 1`, gelijke breedte)

**Chip label:** toont actieve preset of geformatteerde datum (DD-MM-YYYY).

**Chip icoon:** `arrow_drop_down` (gesloten) / `arrow_drop_up` (open) — Material Icons caret.

**Positionering:** popover opent rechts-uitgelijnd (`right: document.documentElement.clientWidth - rect.right`) via `position: fixed`. Geclamped zodat de 272px-brede popover nooit buiten het scherm links valt. `z-index: 300`.

**Events:**
- `@update:modelValue` — Datum gewijzigd
- `@update:preset` — Preset gewijzigd

---

## FilterChip

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

---

## SearchBox

Zoek input veld.

```vue
<SearchBox
  v-model="searchQuery"
  placeholder="Zoek op naam, bedrijf, referentie..."
/>
```

| Prop | Type | Default | Beschrijving |
|------|------|---------|--------------|
| `modelValue` | `string` | `''` | Zoekterm |
| `placeholder` | `string` | `'Zoeken'` | Placeholder tekst |
| `debounce` | `number` | `300` | Debounce in ms |
