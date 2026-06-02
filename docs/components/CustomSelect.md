# CustomSelect

Aangepaste select-dropdown met v-model binding, floating menu via Teleport en click-outside sluiting. Vervangt de native `<select>` voor een consistent gestylde dropdown die past bij de YIM UI Kit.

**Figma:** nog te definieren

## Relaties
- **Gebruikt door:** DetailPanel, InformeerContactpersoonModal, CredentialActiverenModal, AnnulerenModal, ElearningUitnodigingModal
- **Gebruikt:** —

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
|------|------|---------|-------------|
| `modelValue` | `any` | `null` | Geselecteerde waarde (v-model) |
| `options` | `Array` | `[]` | Array van `{ value, label }` objecten |
| `placeholder` | `String` | `'Kies een optie'` | Placeholder tekst wanneer niets geselecteerd is |
| `disabled` | `Boolean` | `false` | Schakelt de select uit |
| `size` | `String` | `'md'` | `'sm'` (32px) of `'md'` (40px) |

## Events

| Event | Payload | Beschrijving |
|-------|---------|-------------|
| `update:modelValue` | `any` (de `value` van de gekozen optie) | Emit bij selectie van een optie |

## Gedrag

- Trigger toont het label van de geselecteerde optie, of de placeholder als niets geselecteerd is.
- Klikken op de trigger opent/sluit het dropdown menu.
- Dropdown menu wordt via `<Teleport to="body">` buiten de component DOM gerenderd om overflow-problemen te voorkomen.
- Menu positioneert zich `fixed` direct onder de trigger, met dezelfde breedte als de trigger.
- Click-outside via document `click` listener sluit de dropdown.
- Bij selectie van een optie wordt `update:modelValue` geemit en sluit het menu.
- Pijl-icoon (`arrow_drop_down`) roteert 180 graden wanneer het menu open is.
- Root element krijgt class `is-open` (open) en `is-disabled` (disabled).
- Trigger is een `<button type="button">` voor correcte formulier-interactie.
- Geen keyboard navigatie geimplementeerd; interactie is puur muis-gebaseerd.

## Design Tokens

| Element | Token | Waarde |
|---------|-------|--------|
| Trigger achtergrond | `--n0` | Wit |
| Trigger border (rust) | `--n400` | Grijs border (1px box-shadow) |
| Trigger border (hover) | `--n800` | Donker grijs border |
| Trigger border (open) | `--p500` | Primair teal (2px box-shadow) |
| Trigger achtergrond (disabled) | `--n50` | Lichtgrijs |
| Trigger border-radius | `--r-s` | Kleine radius |
| Trigger tekst | `--n900` | Donker |
| Placeholder tekst | `--n500` | Middengrijs |
| Arrow icoon kleur | `--n500` | Middengrijs |
| Dropdown achtergrond | `--n0` | Wit |
| Dropdown border-radius | `--r-s` | Kleine radius |
| Dropdown schaduw | `--shadow-m` | Medium elevatie |
| Optie tekst | `--p700` | Primair teal donker |
| Optie hover achtergrond | `--n50` | Lichtgrijs |
| Actieve optie achtergrond | `--p50` | Licht teal |
| Actieve optie tekst | `--p700` | Primair teal donker |
