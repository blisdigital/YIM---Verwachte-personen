# MijnActiesPanel

Zijpaneel (aside) dat de beschikbare acties voor de receptionist toont op de dossierpagina. Donker teal kaart met grote actieknoppen, elk met een Material Icon.

## Relaties
- **Gebruikt door:** DossierView
- **Gebruikt:** — (geen child-componenten)

## Gebruik

```vue
<MijnActiesPanel
  :actions="[
    { value: 'aanmelden', label: 'Persoon aanmelden', icon: 'login' },
    { value: 'credential', label: 'Credential koppelen', icon: 'badge' },
    { value: 'afmelden', label: 'Persoon afmelden', icon: 'logout' },
  ]"
  @action="handleAction"
/>
```

## Props

| Prop | Type | Default | Beschrijving |
|------|------|---------|-------------|
| `actions` | `Array` | `[]` | Actieobjecten: `{ value: string, label: string, icon: string }`. |

## Events

| Event | Payload | Beschrijving |
|-------|---------|-------------|
| `action` | `String` (action value) | Klik op actieknop. |

## Gedrag

- Vaste breedte 280px, `flex-shrink: 0`, `align-self: flex-start`
- Titel "Mijn acties" hardcoded (24px, bold, wit)
- Hover-transitie naar semi-transparante witte achtergrond
- Acties volledig via `actions` prop

## Design Tokens

| Element | Token | Waarde |
|---------|-------|--------|
| Panel achtergrond | `--p700` | donker teal |
| Panel border-radius | hardcoded `16px` | afgeronde hoeken |
| Titel kleur | `--n0` | wit |
| Knop tekstkleur | `--n0` | wit |
| Knop hover achtergrond | `rgba(255,255,255,0.1)` | semi-transparant wit |
