# DatePopover

Gedeeld popover-paneel voor datumfilters. Gebruikt in `DateFilterChip` (filterstrip) en `ColumnFilters` (kolomfilter). Bevat geen positioneringslogica — de parent is verantwoordelijk voor plaatsing.

**Figma:** nog te definiëren  
**Versie:** 0.1  
**Datum:** mei 2026

---

## Gebruik

```vue
<DatePopover
  :iso-date="localDate"
  :preset="localPreset"
  @update:iso-date="localDate = $event"
  @update:preset="localPreset = $event"
  @apply="apply"
  @reset="reset"
/>
```

---

## Props

| Prop | Type | Beschrijving |
|------|------|-------------|
| `isoDate` | `string` | Geselecteerde datum in ISO-formaat (`YYYY-MM-DD`) |
| `preset` | `string \| null` | Actieve preset: `'vandaag'`, `'morgen'`, `'week'` |

---

## Events

| Event | Payload | Beschrijving |
|-------|---------|-------------|
| `update:isoDate` | `string` | Nieuwe ISO-datum |
| `update:preset` | `string \| null` | Nieuwe preset |
| `apply` | — | Gebruiker klikt "Toepassen" |
| `reset` | — | Gebruiker klikt "Resetten" |

---

## Structuur

- Titel "Filter"
- Label "Kies datum" + datumveld (tekst + kalender-icoon trigger)
- `DatePickerCalendar` — conditioneel, inline; zie [DatePickerCalendar.md](DatePickerCalendar.md)
- Label "Selecteer" + preset-chips: Vandaag / Morgen / Deze week
- Divider
- Footer: Resetten (outlined) + Toepassen (filled), beide `flex: 1`

**Breedte:** `272px` (vaste breedte, `box-sizing: border-box`)

---

## Design Tokens

**Container:** `padding: var(--sp-l)` (16px), `gap: var(--sp-s)` (8px), `border-radius: var(--r-s)` (4px), `box-shadow: var(--shadow-m)`

| Element | Eigenschap | Waarde |
|---------|-----------|--------|
| Titel "Filter" | Typografie | H5 — Nunito Bold 18px/24px |
| Titel "Filter" | Kleur | `--p700` |
| Labels | Typografie | Label M — 600, 14px/20px, ls 0.14px |
| Labels | Kleur | `--p700` |
| Datumveld border | | `1px solid --n400`, `border-radius: var(--r-s)` |
| Kalender-icoon | Achtergrond | `--n50` |
| Preset-chips | Padding | `var(--sp-xs) var(--sp-s)` |

**Preset-chip states:**

| State | Achtergrond | Border | Tekst |
|-------|------------|--------|-------|
| Actief | `--p50` | `1px solid --p700` | `--p700` |
| Inactief | `--n0` | `1px solid --n500` | `--n800` |

**Toolbar-knoppen:**

| Knop | Achtergrond | Tekst |
|------|------------|-------|
| Resetten | `--n0` | `--n900` (border: `1px solid --n400`) |
| Toepassen | `--p500` | `--n0` |
