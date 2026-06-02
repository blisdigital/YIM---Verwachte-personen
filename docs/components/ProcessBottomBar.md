# ProcessBottomBar

Vaste actie-balk onderaan de pagina voor procesflows (Credential koppelen / Credential printen). Altijd zichtbaar; scrollt niet mee met de pagina-inhoud.

**Figma:** [`213:59721`](https://www.figma.com/design/LuyFTR1cgQe3mT6TAGvzVV/Epic--Verwachte-personen?node-id=213-59721)

## Relaties
- **Gebruikt door:** — *(nog niet gebruikt in views)*
- **Gebruikt:** BaseButton

## Gebruik

```vue
<!-- Credential koppelen -->
<ProcessBottomBar flow="koppelen" @cancel="nav.goBack()" @submit="handleSubmit" />

<!-- Credential printen -->
<ProcessBottomBar
  flow="printen"
  :primary-disabled="!activateEnabled"
  @cancel="nav.goBack()"
  @print="handlePrint"
  @activate="handleActivate"
/>
```

## Props

| Prop | Type | Default | Beschrijving |
|------|------|---------|-------------|
| `flow` | `'koppelen'` \| `'printen'` | required | Bepaalt welke knoppen rechts verschijnen |
| `primaryDisabled` | `Boolean` | `false` | Zet de primaire actieknop op disabled |

## Events

| Event | Payload | Beschrijving |
|-------|---------|-------------|
| `cancel` | — | Annuleren geklikt (beide flows) |
| `submit` | — | "Koppelen" geklikt (flow `koppelen`) |
| `print` | — | "Printen" geklikt (flow `printen`) |
| `activate` | — | "Activeren" geklikt (flow `printen`) |

## Gedrag

- **flow="koppelen":** links Annuleren (ghost), rechts Koppelen (filled).
- **flow="printen":** links Annuleren (ghost), rechts Printen (outlined-brand) + Activeren (filled, standaard disabled).
- `Activeren` wordt enabled nadat print, scan en code-invoer geslaagd zijn. De parent beheert deze state.
- Plaatsing: laatste kind van `.app-layout` (flex column). De `.page-body` erboven heeft `flex: 1` en `overflow: hidden`.
- Alle knoppen: `BaseButton` met `size="lg"`. Zie [BaseButton.md](BaseButton.md) voor variant-tokens.

## Design Tokens

| Element | Token | Waarde |
|---------|-------|--------|
| Achtergrond | `--p50` | `#f0f7f8` |
| Bovenrand | `--p100` | `#d6e8ec` |
| Padding verticaal | `--sp-s` | `8px` |
| Padding horizontaal | `--sp-l` | `16px` |
| Gap knoppen rechts | `--sp-s` | `8px` |
