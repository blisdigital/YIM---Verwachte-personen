# InputField

Tekstveld voor enkelvoudige tekstinvoer. Gebouwd op native `<input type="text">` met label, optionele leading/trailing icons en volledige states.

**Figma:** [YIM UI Kit — Input fields, node 2546:8319](https://www.figma.com/design/RQhCroVydjMVySUhH4AoIw/YIM-UI-Kit?node-id=2546-8319)

## Relaties
- **Gebruikt door:** DetailPanel, AanmeldenModal, InformeerContactpersoonModal, CredentialActiverenModal, ElearningUitnodigingModal
- **Gebruikt:** —

## Gebruik

```vue
<InputField
  v-model="documentnummer"
  label="Vul documentnummer in"
  :required="true"
  placeholder="Documentnummer"
/>

<InputField v-model="zoekterm" placeholder="Zoek..." leading-icon="search" />
```

## Props

| Prop | Type | Default | Beschrijving |
|------|------|---------|-------------|
| `modelValue` | `string` | `''` | Veldwaarde (v-model) |
| `placeholder` | `string` | `''` | Placeholder tekst |
| `label` | `string` | `null` | Label boven het veld |
| `required` | `boolean` | `false` | Voegt ` *` toe aan het label (rood) |
| `disabled` | `boolean` | `false` | Veld is niet bewerkbaar, visueel gedimd |
| `readonly` | `boolean` | `false` | Veld is leesbaar maar niet bewerkbaar |
| `error` | `boolean` | `false` | Fout-state — rode border |
| `errorMessage` | `string` | `null` | Foutmelding onder het veld (alleen zichtbaar als `error === true`) |
| `id` | `string` | auto | HTML id voor label-koppeling — auto-gegenereerd als niet opgegeven |
| `leadingIcon` | `string` | `null` | Material Icons naam voor het leading icon (links in het veld) |
| `trailingIcon` | `string` | `null` | Material Icons naam voor het trailing icon (rechts in het veld) |
| `size` | `string` | `'md'` | `'sm'` (32px) of `'md'` (40px) |

## Events

| Event | Payload | Beschrijving |
|-------|---------|-------------|
| `update:modelValue` | `string` | Nieuwe waarde bij elke invoerwijziging |

## Gedrag

- Border-wissel van 1px naar 2px wordt via `box-shadow` geimplementeerd (geen layout-shift).
- Label toont rode asterisk bij `required`.
- Foutmelding verschijnt alleen als zowel `error` als `errorMessage` zijn ingesteld.

### Visuele states

| State | Trigger | Border | Achtergrond | Tekstkleur |
|-------|---------|--------|-------------|------------|
| Default | — | `--n400` 1px | `--n0` | `--n500` (placeholder) |
| Hover | `:hover` | `--n800` 1px | `--n0` | — |
| Focused | `:focus-within` | `--p500` 2px | `--n0` | `--n900` |
| Filled | waarde aanwezig | `--n400` 1px | `--n0` | `--n900` |
| Disabled | `disabled=true` | `--n300` 1px | `--n50` | `--n400` |
| Read-Only | `readonly=true` | geen | `--n50` | `--n800` |
| Error | `error=true` | `--err` 2px | `--n0` | `--n900` |

## Design Tokens

| Element | Token | Waarde |
|---------|-------|--------|
| Veld achtergrond (active) | `--n0` | Wit |
| Veld achtergrond (disabled/read-only) | `--n50` | Licht grijs |
| Border default | `--n400` | Grijs |
| Border hover | `--n800` | Donkergrijs |
| Border focus | `--p500` | Teal (2px) |
| Border error | `--err` | Rood (2px) |
| Border disabled | `--n300` | Licht grijs |
| Tekst | `--n900` | Bijna zwart |
| Placeholder | `--n500` | Grijs |
| Tekst disabled | `--n400` | Licht grijs |
| Tekst read-only | `--n800` | Donker grijs |
| Label | `--n900` | Bijna zwart, SemiBold 14px |
| Verplicht `*` | `--err` | Rood |
| Foutmelding | `--err` | Rood, 12px |
| Afronding | `--r-s` | 4px |
| Padding | `--sp-s` / `--sp-m` | 8px verticaal / 12px horizontaal |
| Icon kleur | `--n500` | Grijs; `--n400` bij disabled |
