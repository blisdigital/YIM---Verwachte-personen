# MijnActiesPanel

Zijpaneel (aside) dat de beschikbare acties voor de receptionist toont op de dossierpagina. Gerenderd als donker teal kaart met grote actieknoppen, elk met een Material Icon.

**Figma:** nog te definiëren

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
| --- | --- | --- | --- |
| `actions` | `Array` | `[]` | Array van actieobjecten. Elk object bevat: `value` (string — actie-identifier), `label` (string — zichtbare tekst), `icon` (string — Material Icon naam). |

## Events

| Event | Payload | Beschrijving |
| --- | --- | --- |
| `action` | `String` (action value) | Wordt geemit bij klik op een actieknop. De payload is de `value` van het geklikte actieobject. |

## Design Tokens

| Element | Token | Waarde |
| --- | --- | --- |
| Panel achtergrond | `--p700` | donker teal |
| Panel border-radius | hardcoded `16px` | afgeronde hoeken |
| Font | `--font` | basis lettertypefamilie |
| Titel kleur | `--n0` | wit |
| Knop tekstkleur | `--n0` | wit |
| Knop border-radius | `--r-s` | afgeronde hoeken |
| Knop hover achtergrond | `rgba(255, 255, 255, 0.1)` | semi-transparant wit |

## Gedrag

- Het panel heeft een vaste breedte van 280px en krimpt niet mee (`flex-shrink: 0`).
- Het panel lijnt zichzelf bovenaan uit (`align-self: flex-start`) zodat het niet de volledige hoogte van de parent inneemt.
- De titel "Mijn acties" is hardcoded (24px, bold, wit).
- Elke actieknop toont een Material Icon (24px) links van de labeltekst.
- Knoppen hebben een subtiele hover-transitie naar een semi-transparante witte achtergrond.
- De lijst met acties wordt volledig via de `actions` prop aangestuurd — het component bevat geen hardcoded acties.
