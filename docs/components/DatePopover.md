# DatePopover

Gedeeld popover-paneel voor datumfilters. Gebruikt in DateFilterChip (filterstrip) en ColumnFilters (kolomfilter). Bevat geen positioneringslogica — de parent is verantwoordelijk voor plaatsing.

## Relaties
- **Gebruikt door:** DateFilterChip, ColumnFilters
- **Gebruikt:** DatePickerCalendar

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

## Props

| Prop | Type | Default | Beschrijving |
|------|------|---------|-------------|
| `isoDate` | `string` | `''` | Geselecteerde datum in ISO-formaat (`YYYY-MM-DD`) |
| `preset` | `string \| null` | `null` | Actieve preset: `'vandaag'`, `'morgen'`, `'week'` |

## Events

| Event | Payload | Beschrijving |
|-------|---------|-------------|
| `update:isoDate` | `string` | Nieuwe ISO-datum |
| `update:preset` | `string \| null` | Nieuwe preset |
| `apply` | — | Gebruiker klikt "Toepassen" |
| `reset` | — | Gebruiker klikt "Reset" |

## Inhoud

- Titel "Filter"
- Label "Kies datum" + datumveld (tekst + kalender-icoon trigger)
- `DatePickerCalendar` — conditioneel, inline
- Label "Selecteer" + preset-chips: Vandaag / Morgen / Deze week
- Divider
- Footer: Reset (outlined) + Toepassen (filled), beide `flex: 1`

**Breedte:** `272px` (vast)

## Gedrag

- Kalender opent inline bij klik op kalender-icoon
- Preset-chips zijn toggle-knoppen (actief/inactief)
- Reset wist datum en preset; Toepassen bevestigt keuze

## Design Tokens

| Element | Token | Waarde |
|---------|-------|--------|
| Container padding | `--sp-l` | 16px |
| Container gap | `--sp-s` | 8px |
| Container radius | `--r-s` | 4px |
| Container shadow | `--shadow-m` | medium elevatie |
| Titel kleur | `--p700` | teal |
| Preset actief bg | `--p50` | licht teal |
| Preset actief border/tekst | `--p700` | teal |
| Preset inactief bg | `--n0` | wit |
| Preset inactief border | `--n500` | grijs |
| Reset bg | `--n0` | wit, border `--n400` |
| Toepassen bg | `--p500` | teal, tekst `--n0` |
