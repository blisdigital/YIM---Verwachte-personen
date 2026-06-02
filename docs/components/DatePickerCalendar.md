# DatePickerCalendar

Volledig custom kalender-component in YIM-huisstijl. Drie views: **Days** (maandgrid 7x5), **Month** (maandkeuze 4x3), **Year** (decadeoverzicht 4x3). Wordt inline getoond binnen DatePopover wanneer de gebruiker op het datumveld klikt.

## Relaties
- **Gebruikt door:** DatePopover, FormDateField, AankomstWijzigenModal
- **Gebruikt:** — (geen child-componenten)

## Gebruik

```vue
<DatePickerCalendar :model-value="isoDate" @update:model-value="onDateSelected" />
```

## Props

| Prop | Type | Default | Beschrijving |
|------|------|---------|-------------|
| `modelValue` | `string` | `''` | Geselecteerde datum (ISO `YYYY-MM-DD`) |

## Events

| Event | Payload | Beschrijving |
|-------|---------|-------------|
| `update:modelValue` | `string` | ISO-datum bij dagklik |

## Gedrag

### Navigatielogica

| Actie | Resultaat |
|-------|-----------|
| Klik label-knop | Niveau omhoog: Days -> Month -> Year |
| Klik cel | Niveau omlaag of datum selecteren (Days) |
| `‹` / `›` | Vorige/volgende periode |
| "Vandaag" | Terug naar Days view op huidige maand |

### Grid-configuratie

| View | Kolommen | Rijen | Cel |
|------|----------|-------|-----|
| Days | 7 x 32px | 5 x 32px | Ma=eerste kolom |
| Month | 4 x `1fr` | 3 x 32px | NL afkortingen |
| Year | 4 x `1fr` | 3 x 32px | Decadeoverzicht |

## Design Tokens

| Element | Token | Waarde |
|---------|-------|--------|
| Container breedte | — | `272px` vast |
| Container padding | `--sp-m` | 12px |
| Cel afmeting | — | `32px x 32px` |
| Cel radius | `--r-xl` | 360px |
| Enabled tekst | `--n900` | zwart |
| Current tekst | `--p500` | teal |
| Selected bg | `--p500` | teal |
| Selected tekst | `--n0` | wit |
| Hover bg | `--p50` | `#f0f7f8` |
| Disabled tekst | `--n500` | grijs |
| Dag-bar kleur | `--n700` | donkergrijs |
| Label-knop border | `--n400` | grijs |

Selected wint van Current — als vandaag geselecteerd is, krijgt de cel de Selected-stijl.
