# Tooltip

Generiek hover-tooltip component. Toont een of meerdere regels tekst bij hover op het wrapped element. Read-only -- geen acties in de tooltip zelf.

## Relaties
- **Gebruikt door:** TableRow
- **Gebruikt:** geen child components

## Gebruik

```vue
<Tooltip :content="['Dossier niet compleet', 'Dossier afgekeurd']">
  <CompliancePill type="dossier" status="onvolledig" />
</Tooltip>

<Tooltip content="E-learning is verlopen">
  <span>trigger element</span>
</Tooltip>
```

## Props

| Prop | Type | Default | Beschrijving |
|------|------|---------|-------------|
| `content` | `string \| string[]` | -- (required) | Tooltip-tekst. Array = meerdere regels |

## Events

Geen events -- puur presentatiecomponent.

## Slots

| Slot | Beschrijving |
|------|-------------|
| `default` | Trigger-element waarop gehoverd wordt |

## Gedrag

- Tooltip verschijnt bij **mouseenter**, verdwijnt bij **mouseleave**.
- Meerdere regels (array) worden verticaal gestapeld.
- Positionering: **boven** het trigger-element, horizontaal gecentreerd.
- Via `<Teleport to="body">` + `position: fixed` -- voorkomt overflow-clipping door tabelcellen.
- Geen tooltip renderen als `content` leeg of afwezig is.

## Design Tokens

| Element | Token | Waarde |
|---------|-------|--------|
| Achtergrond | `--n800` | `#3E3F40` |
| Tekstkleur | `--n50` | `#F8FAFB` |
| Schaduw | Elevation/S | `drop-shadow: 0px 2px 4px rgba(17,19,19,0.16)` |
| Border-radius | `--r-s` | `4px` |
| Padding | `var(--sp-xs) var(--sp-s)` | `4px 8px` |
| Tekstgrootte | Body-S | `12px` |
| Regelhoogte | Line-height/Body-S | `16px` |
