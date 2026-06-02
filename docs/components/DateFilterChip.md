# DateFilterChip

Chip-knop die een datum-filterpopover opent. Altijd zichtbaar in de filterstrip; toont de actieve preset of een specifieke datum. Rendert de popover via `<Teleport to="body">` met `position: fixed`.

## Relaties
- **Gebruikt door:** FilterStrip
- **Gebruikt:** DatePopover

## Gebruik
```vue
<DateFilterChip
  v-model="selectedDate"
  v-model:preset="activePreset"
/>
```

## Props
| Prop | Type | Default | Beschrijving |
|------|------|---------|-------------|
| `modelValue` | `Date` | `new Date()` | Geselecteerde datum |
| `preset` | `'vandaag' \| 'morgen' \| 'week' \| null` | `'vandaag'` | Actieve preset |

## Events
| Event | Payload | Beschrijving |
|-------|---------|-------------|
| `update:modelValue` | `Date` | Datum gewijzigd |
| `update:preset` | `string \| null` | Preset gewijzigd |

## Gedrag
- **Chip label:** toont actieve preset ("Vandaag", "Morgen", "Deze week") of geformatteerde datum (DD-MM-YYYY). Zonder selectie: "Datum".
- **Chip icoon:** `arrow_drop_down` (gesloten) / `arrow_drop_up` (open) via Material Icons.
- **Positionering:** popover rechts-uitgelijnd (`right: document.documentElement.clientWidth - rect.right`) via `position: fixed`. Geclamped zodat de 272px-brede popover nooit buiten het scherm links valt. `z-index: 300`. Positie wordt bijgehouden via een `requestAnimationFrame`-loop.
- **Popover-inhoud:** volledig geleverd door DatePopover (zie DatePopover.md). DatePopover bevat op zijn beurt DatePickerCalendar.
- **Koppeling met kolomfilter:** `DateFilterChip` en het kolomfilter `datumVanaf` zijn gekoppeld via `filterStore.datum`. Wijzigen in de chip werkt door in de kolomfilter, en vice versa.

### Chip-states
| State | Achtergrond | Border | Tekst |
|-------|-------------|--------|-------|
| Actief (preset of datum) | `--p50` | `1px solid --p700` | `--p700` |
| Inactief (geen selectie) | `--n0` | `1px solid --n50` | `--n800` |
| Open (popup zichtbaar) | `--p50` | `1px solid --p700` | `--p700` |

Chip-afmetingen: `padding: var(--sp-xs) var(--sp-s)` (4px 8px), `border-radius: var(--r-s)` (4px). Typografie: Label M -- 600, 14px/20px, ls 0.14px.

## Design Tokens
| Element | Token | Waarde |
|---------|-------|--------|
| Chip bg (actief/open) | `--p50` | `#f0f7f8` |
| Chip border (actief/open) | `--p700` | `#1a7a8a` |
| Chip tekst (actief/open) | `--p700` | `#1a7a8a` |
| Chip bg (inactief) | `--n0` | `#ffffff` |
| Chip border (inactief) | `--n50` | `#f8fafb` |
| Chip tekst (inactief) | `--n800` | `#3e3f40` |
| Chip padding | `--sp-xs` / `--sp-s` | `4px` / `8px` |
| Chip radius | `--r-s` | `4px` |
