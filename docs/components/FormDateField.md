# FormDateField

Formulier datumveld met optioneel label, een klikbare trigger die de geselecteerde datum toont (DD-MM-JJJJ), en een floating `DatePickerCalendar` popover. Wordt gebruikt in modals en formulieren waar een datum gekozen moet worden.

**Figma:** nog te definieren

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
| --- | --- | --- | --- |
| `modelValue` | `String` | `''` | Geselecteerde datum in ISO-formaat (`YYYY-MM-DD`), v-model |
| `label` | `String` | `null` | Label tekst boven het veld; niet getoond als `null` |
| `required` | `Boolean` | `false` | Toont een rode asterisk (`*`) na het label |
| `id` | `String` | `null` | HTML `id` attribuut voor de trigger-button, gekoppeld aan het label via `for` |

## Events

| Event | Payload | Beschrijving |
| --- | --- | --- |
| `update:modelValue` | `String` (ISO datum `YYYY-MM-DD`) | Emit wanneer een datum geselecteerd wordt in de kalender |

## Design Tokens

| Element | Token | Waarde |
| --- | --- | --- |
| Label tekst | `--n900` | Donker |
| Label font-weight | — | `600` |
| Verplicht asterisk | `--err` | Rood |
| Trigger achtergrond | `--n0` | Wit |
| Trigger border (rust) | `--n400` | Grijs |
| Trigger border (hover/open) | `--p500` | Primair teal |
| Trigger border-radius | `--r-s` | Kleine radius |
| Trigger focus-outline | `--p500` | Primair teal (2px, offset 2px) |
| Trigger font | `--font` | Systeemfont |
| Datum tekst | `--n900` | Donker |
| Placeholder tekst | `--n500` | Middengrijs |
| Icoon container achtergrond | `--n50` | Lichtgrijs |
| Icoon container border | `--n400` | Grijs |
| Icoon kleur | `--n700` | Donkergrijs |
| Popover achtergrond | `--n0` | Wit |
| Popover border | `--n300` | Lichtgrijs |
| Popover border-radius | `--r-s` | Kleine radius |
| Popover schaduw | `--shadow-m` | Medium elevatie |

## Gedrag

- De trigger toont de geselecteerde datum in weergaveformaat (`DD-MM-JJJJ`) via de `isoToDisplay` utility, of de placeholder `DD-MM-JJJJ` als geen datum geselecteerd is.
- Klikken op de trigger opent de `DatePickerCalendar` in een floating popover.
- De popover wordt via `<Teleport to="body">` gerenderd om buiten de DOM van modals of scrollbare containers te vallen.
- **Positionering:** de popover verschijnt standaard 4px onder de trigger. Wanneer er onvoldoende ruimte onder is (minder dan ~320px) en er wel ruimte boven is, springt de popover naar boven de trigger.
- De popover breedte is minimaal de trigger breedte of 280px, welke groter is.
- Horizontale correctie: als de popover buiten het viewport valt, wordt de `left`-positie aangepast.
- **Click-outside:** klikken buiten de trigger en popover sluit de kalender. De listener wordt dynamisch toegevoegd/verwijderd via een `watch` op de `open` state.
- De trigger bevat rechts een kalendericoon (Material Icon `today`) in een apart icoon-compartiment met lichtgrijze achtergrond.
- Bij selectie van een datum in de kalender sluit de popover automatisch.
- De popover `z-index` is `1100`, hoog genoeg om boven modals (`z-index: 1000`) te verschijnen.
