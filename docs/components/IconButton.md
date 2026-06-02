# IconButton

Icon-only button voor compacte acties zonder tekstlabel.

**Figma:** [`2092:4565`](https://www.figma.com/design/RQhCroVydjMVySUhH4AoIw/YIM-UI-Kit?node-id=2092-4565)

## Relaties
- **Gebruikt door:** Modal, ActionPopup
- **Gebruikt:** geen child components

## Gebruik

```vue
<IconButton variant="ghost" size="md" icon="close" aria-label="Sluiten" @click="onClose" />
<IconButton variant="filled" size="lg" icon="add" aria-label="Toevoegen" />
<IconButton variant="outlined" size="md" icon="more_horiz" aria-label="Meer opties" />
```

## Props

| Prop | Type | Default | Beschrijving |
|------|------|---------|-------------|
| `variant` | `'filled' \| 'outlined' \| 'ghost' \| 'gray'` | `'ghost'` | Visuele stijl |
| `size` | `'lg' \| 'md' \| 'sm'` | `'md'` | Grootte |
| `icon` | `string` | -- (required) | Material icon naam |
| `ariaLabel` | `string` | -- (required) | Toegankelijkheidslabel (geen zichtbare tekst) |
| `disabled` | `boolean` | `false` | Uitgeschakeld |

## Events

| Event | Payload | Beschrijving |
|-------|---------|-------------|
| `click` | `MouseEvent` | Klik op de button |

## Gedrag

- Altijd vierkant. Padding rondom het icon is symmetrisch.
- `DatePickerCalendar` navigatieknoppen volgen ghost-variant tokens (disabled: `--n300`).

### Maatvoering

| Size | Afmeting | Padding | Icon |
|------|----------|---------|------|
| `lg` | `48 x 48px` | `12px` (`--sp-m`) | `24 x 24px` |
| `md` | `40 x 40px` | `8px` (`--sp-s`) | `24 x 24px` |
| `sm` | `32 x 32px` | `8px` (`--sp-s`) | `16 x 16px` |

### Variant tokens

#### Filled

| State | Achtergrond | Icon | Extra |
|-------|-------------|------|-------|
| Enabled | `--p500` | `--n0` | -- |
| Hover | `--p600` | `--n0` | `box-shadow: var(--shadow-s)` |
| Pressed | `--p700` | `--n0` | -- |
| Disabled | `--p100` | `--n0` | `cursor: not-allowed` |

#### Outlined

| State | Achtergrond | Icon | Border |
|-------|-------------|------|--------|
| Enabled | `--n0` | `--n900` | `1px solid --n400` |
| Hover | `--n50` | `--n900` | `1px solid --n500` |
| Pressed | `--n100` | `--n900` | `1px solid --n500` |
| Disabled | `--n0` | `--n400` | `1px solid --n300` |

#### Ghost

| State | Achtergrond | Icon |
|-------|-------------|------|
| Enabled | transparant | `--n700` |
| Hover | `--n100` | `--n700` |
| Pressed | `--n100` | `--n900` |
| Disabled | transparant | `--n300` |

#### Gray

| State | Achtergrond | Icon |
|-------|-------------|------|
| Enabled | `--n50` | `--n700` |
| Hover | `--n100` | `--n700` |
| Pressed | `--n100` | `--n900` |
| Disabled | `--n50` | `--n300` |

## Design Tokens

| Element | Token | Waarde |
|---------|-------|--------|
| Border-radius | `--r-s` | `4px` |
| Padding (lg) | `--sp-m` | `12px` |
| Padding (md / sm) | `--sp-s` | `8px` |
