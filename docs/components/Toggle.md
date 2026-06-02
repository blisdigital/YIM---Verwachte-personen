# Toggle

On/off-schakelaar voor booleaanse instellingen. Combineert een verborgen checkbox met een visueel track en thumb. Optioneel met tekstlabel.

**Figma:** [YIM UI Kit — Toggle, node 2396:9734](https://www.figma.com/design/RQhCroVydjMVySUhH4AoIw/YIM-UI-Kit?node-id=2396-9734)

## Relaties
- **Gebruikt door:** AanmeldenModal, AfmeldenModal, AnnulerenModal, AankomstWijzigenModal
- **Gebruikt:** —

## Gebruik

```vue
<Toggle
  v-model="notifyContact"
  label="Verstuur e-mail naar contactpersoon dat persoon is aangemeld."
/>

<Toggle v-model="autoIncheck" />
```

## Props

| Prop | Type | Default | Beschrijving |
|------|------|---------|-------------|
| `modelValue` | `boolean` | `false` | Aan/uit staat (v-model) |
| `label` | `string` | `null` | Tekst naast de toggle |
| `disabled` | `boolean` | `false` | Inactive state — visueel gedimd, niet bedienbaar |
| `id` | `string` | auto | HTML id — auto-gegenereerd als niet opgegeven |

## Events

| Event | Payload | Beschrijving |
|-------|---------|-------------|
| `update:modelValue` | `boolean` | Nieuwe staat bij klik |

## Gedrag

- Verborgen native checkbox behoudt toegankelijkheid (keyboard, screen readers).
- Focus ring via `box-shadow: 0 0 0 2px var(--p50)` op het track element.
- Thumb-positie: `transform: translateX(24px)` bij on-state.

### Visuele states

| State | Combinatie | Track achtergrond | Thumb |
|-------|-----------|-------------------|-------|
| Off default | `false` | `--n100` | `--n0` + `--shadow-xs` |
| Off hover | `false + :hover` | `--n200` | `--n0` + `--shadow-xs` |
| Off focus | `false + :focus` | `--n200` + focus ring | `--n0` + `--shadow-xs` |
| Off disabled | `false + disabled` | `--n100` | `--n50`, geen shadow |
| On default | `true` | `--p500` | `--n0` + `--shadow-xs` |
| On hover | `true + :hover` | `--p600` | `--n0` + `--shadow-xs` |
| On focus | `true + :focus` | `--p600` + focus ring | `--n0` + `--shadow-xs` |
| On disabled | `true + disabled` | `--p100` | `--n50`, geen shadow |

## Design Tokens

| Element | Token | Waarde |
|---------|-------|--------|
| Track off default | `--n100` | Lichtgrijs |
| Track off hover/focus | `--n200` | Grijs |
| Track on default | `--p500` | Teal |
| Track on hover/focus | `--p600` | Donker teal |
| Track on disabled | `--p100` | Licht teal |
| Track off disabled | `--n100` | Lichtgrijs |
| Track afmeting | `56 x 32px` | — |
| Track padding | `--sp-xs` | 4px |
| Track afronding | `--r-xl` | 360px (pill shape) |
| Focus ring | `--p50` | Licht teal, 2px |
| Thumb actief | `--n0` + `--shadow-xs` | Wit + elevation |
| Thumb disabled | `--n50` | Licht grijs, geen shadow |
| Thumb afmeting | `24 x 24px` | — |
| Gap track-label | `8px` | — |
| Label kleur | `--p800` | Donker teal, SemiBold 14px |
