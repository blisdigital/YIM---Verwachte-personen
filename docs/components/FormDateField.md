# FormDateField

Formulier datumveld met optioneel label, een klikbare trigger die de geselecteerde datum toont (DD-MM-JJJJ), en een floating `DatePickerCalendar` popover. Wordt gebruikt in modals en formulieren waar een datum gekozen moet worden.

**Figma:** nog te definieren

## Relaties
- **Gebruikt door:** DetailPanel, CredentialActiverenModal
- **Gebruikt:** DatePickerCalendar

## Gebruik

```vue
<FormDateField
  v-model="datum"
  label="Startdatum"
  :required="true"
  id="start-datum"
/>
```

## Props

| Prop | Type | Default | Beschrijving |
|------|------|---------|-------------|
| `modelValue` | `String` | `''` | Geselecteerde datum in ISO-formaat (`YYYY-MM-DD`), v-model |
| `label` | `String` | `null` | Label tekst boven het veld; niet getoond als `null` |
| `required` | `Boolean` | `false` | Toont een rode asterisk (`*`) na het label |
| `id` | `String` | `null` | HTML `id` attribuut voor de trigger-button, gekoppeld aan het label via `for` |
| `size` | `String` | `'md'` | `'sm'` (32px) of `'md'` (40px) |

## Events

| Event | Payload | Beschrijving |
|-------|---------|-------------|
| `update:modelValue` | `String` (ISO datum `YYYY-MM-DD`) | Emit wanneer een datum geselecteerd wordt in de kalender |

## Gedrag

- Trigger toont de geselecteerde datum in weergaveformaat (`DD-MM-JJJJ`) via de `isoToDisplay` utility, of de placeholder `DD-MM-JJJJ` als geen datum geselecteerd is.
- Klikken op de trigger opent/sluit de `DatePickerCalendar` in een floating popover.
- **Positionering:** popover verschijnt 4px onder de trigger (absolute positioned, `z-index: 1100`).
- **Click-outside:** klikken buiten trigger en popover sluit de kalender. Listener wordt dynamisch toegevoegd/verwijderd via `watch` op de `open` state.
- Trigger bevat rechts een kalendericoon (Material Icon `today`) in een apart icoon-compartiment met lichtgrijze achtergrond.
- Bij selectie van een datum sluit de popover automatisch.

## Design Tokens

| Element | Token | Waarde |
|---------|-------|--------|
| Label tekst | `--n900` | Donker |
| Label font-weight | — | `600` |
| Verplicht asterisk | `--err` | Rood |
| Trigger achtergrond | `--n0` | Wit |
| Trigger border (rust) | `--n400` | Grijs |
| Trigger border (hover/open) | `--p500` | Primair teal |
| Trigger border-radius | `--r-s` | Kleine radius |
| Trigger focus-outline | `--p500` | Primair teal (2px, offset 2px) |
| Datum tekst | `--n900` | Donker |
| Placeholder tekst | `--n500` | Middengrijs |
| Icoon container achtergrond | `--n50` | Lichtgrijs |
| Icoon container border | `--n400` | Grijs |
| Icoon kleur | `--n700` | Donkergrijs |
| Popover achtergrond | `--n0` | Wit |
| Popover border | `--n300` | Lichtgrijs |
| Popover border-radius | `--r-s` | Kleine radius |
| Popover schaduw | `--shadow-m` | Medium elevatie |
