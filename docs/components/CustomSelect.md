# CustomSelect

Aangepaste select-dropdown met v-model binding, floating menu via Teleport en click-outside sluiting. Vervangt de native `<select>` voor een consistent gestylde dropdown die past bij de YIM UI Kit.

**Figma:** nog te definieren

## Gebruik

```vue
<CustomSelect
  v-model="selectedStatus"
  :options="[
    { value: 'actief', label: 'Actief' },
    { value: 'inactief', label: 'Inactief' },
  ]"
  placeholder="Kies een status"
/>
```

## Props

| Prop | Type | Default | Beschrijving |
| --- | --- | --- | --- |
| `modelValue` | `any` | `null` | Geselecteerde waarde (v-model) |
| `options` | `Array` | `[]` | Array van `{ value, label }` objecten |
| `placeholder` | `String` | `'Kies een optie'` | Placeholder tekst wanneer niets geselecteerd is |
| `disabled` | `Boolean` | `false` | Schakelt de select uit |

## Events

| Event | Payload | Beschrijving |
| --- | --- | --- |
| `update:modelValue` | `any` (de `value` van de gekozen optie) | Emit bij selectie van een optie |

## Design Tokens

| Element | Token | Waarde |
| --- | --- | --- |
| Trigger achtergrond | `--n0` | Wit |
| Trigger border (rust) | `--n400` | Grijs border (1px box-shadow) |
| Trigger border (hover) | `--n800` | Donker grijs border |
| Trigger border (open) | `--p500` | Primair teal (2px box-shadow) |
| Trigger achtergrond (disabled) | `--n50` | Lichtgrijs |
| Trigger border-radius | `--r-s` | Kleine radius |
| Trigger tekst | `--n900` | Donker |
| Placeholder tekst | `--n500` | Middengrijs |
| Arrow icoon kleur | `--n500` | Middengrijs |
| Trigger font | `--font` | Systeemfont |
| Dropdown achtergrond | `--n0` | Wit |
| Dropdown border-radius | `--r-s` | Kleine radius |
| Dropdown schaduw | `--shadow-m` | Medium elevatie |
| Optie tekst | `--p700` | Primair teal donker |
| Optie hover achtergrond | `--n50` | Lichtgrijs |
| Actieve optie achtergrond | `--p50` | Licht teal |
| Actieve optie tekst | `--p700` | Primair teal donker |

## Gedrag

- De trigger toont het label van de geselecteerde optie, of de placeholder als niets geselecteerd is.
- Klikken op de trigger opent/sluit het dropdown menu.
- Het dropdown menu wordt via `<Teleport to="body">` buiten de component DOM gerenderd om overflow-problemen te voorkomen (bijv. binnen modals of scrollbare containers).
- Het menu positioneert zich `fixed` direct onder de trigger, met dezelfde breedte als de trigger.
- Klikken buiten de trigger en het menu sluit de dropdown (click-outside via document `click` event listener).
- Bij selectie van een optie wordt `update:modelValue` geemit en sluit het menu.
- Het pijl-icoon (Material Icon `arrow_drop_down`) roteert 180 graden wanneer het menu open is.
- De component voegt de class `is-open` toe aan de root wanneer het menu open is en `is-disabled` wanneer disabled.
- De trigger is een `<button>` element met `type="button"` voor correcte formulier-interactie.
- Er is geen keyboard navigatie geimplementeerd (pijltjestoetsen, Enter/Escape); interactie is puur muis-gebaseerd.
