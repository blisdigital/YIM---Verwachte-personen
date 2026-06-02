# TimePopover

Inline tijdkiezer popover met twee scrollbare kolommen (uren 0-23, minuten 0-59), een huidig-tijdknop en OK/Annuleren footer. Gebruikt door ColumnFilters en AankomstWijzigenModal voor tijdfiltering.

## Relaties
- **Gebruikt door:** ColumnFilters, AankomstWijzigenModal
- **Gebruikt:** — (geen child-componenten)

## Gebruik

```vue
<TimePopover :time="currentTime" @apply="onTimeApply" @cancel="onTimeCancel" />
```

## Props

| Prop | Type | Default | Beschrijving |
|------|------|---------|-------------|
| `time` | `string \| null` | `null` | Initiele tijd in `"HH:mm"` formaat |

## Events

| Event | Payload | Beschrijving |
|-------|---------|-------------|
| `apply` | `string` (`"HH:mm"`) | Gebruiker bevestigt keuze |
| `cancel` | — | Gebruiker annuleert |

## Gedrag

- Bij mount en prop-wijziging: scroll kolommen zodat geselecteerde rij in beeld is
- "Nu"-knop vult huidige systeemtijd in
- Even uren krijgen `var(--p50)` achtergrond, oneven `var(--n0)`
- Geselecteerde rij: `border-top/bottom: 1px solid var(--n500)`
- Scrollbar verborgen (`scrollbar-width: none`)

## Design Tokens

| Element | Token | Waarde |
|---------|-------|--------|
| Container breedte | — | `200px` |
| Container bg | `--n0` | wit |
| Container radius | `--r-s` | 4px |
| Container shadow | `--shadow-m` | medium elevatie |
| Topbar tijd kleur | `--p600` | teal |
| "Nu"-knop border | `--n400` | grijs; hover: `--p500` |
| Rij even bg | `--p50` | licht teal |
| Rij oneven bg | `--n0` | wit |
| Rij hover bg | `--p100` | teal licht |
| OK bg | `--p500` | teal; hover: `--p600` |
| OK tekst | `--n0` | wit |
