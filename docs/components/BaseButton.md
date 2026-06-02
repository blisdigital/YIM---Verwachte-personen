# BaseButton

Tekstbutton voor primaire, secundaire en tertiaire acties. Ondersteunt zes visuele varianten, drie groottes en een optioneel icon links of rechts.

**Figma:** [YIM UI Kit — Buttons, node 2092:3952](https://www.figma.com/design/RQhCroVydjMVySUhH4AoIw/YIM-UI-Kit?node-id=2092-3952)

## Relaties
- **Gebruikt door:** PageHeader, DetailPanel, ProcessBottomBar, AanmeldenModal, AfmeldenModal, AnnulerenModal, AankomstWijzigenModal, InformeerContactpersoonModal, CredentialActiverenModal, CredentialMailenModal, CredentialOntkoppelenModal, ElearningUitnodigingModal
- **Gebruikt:** —

## Gebruik

```vue
<BaseButton variant="filled" size="lg" icon="expand_more" icon-position="right">
  Nieuwe registratie
</BaseButton>
<BaseButton variant="outlined" size="md">Annuleren</BaseButton>
<BaseButton variant="destructive" size="md">Verwijderen</BaseButton>
```

## Props

| Prop | Type | Default | Beschrijving |
|------|------|---------|-------------|
| `variant` | `'filled' \| 'outlined' \| 'outlined-brand' \| 'ghost' \| 'gray' \| 'destructive'` | `'filled'` | Visuele stijl |
| `size` | `'lg' \| 'md' \| 'sm'` | `'md'` | Grootte |
| `icon` | `string` | — | Material icon naam (optioneel) |
| `iconPosition` | `'left' \| 'right'` | `'left'` | Icon positie |
| `disabled` | `boolean` | `false` | Uitgeschakeld |

## Events

| Event | Payload | Beschrijving |
|-------|---------|-------------|
| `click` | `MouseEvent` | Klik op de button |

## Slots

| Slot | Beschrijving |
|------|-------------|
| `default` | Button label tekst |

## Gedrag

- Knoppen met een dropdown gebruiken een `<ActionMenu>` als dropdown-paneel — er is geen aparte split-button component.
- De Instellingen-knop in PageHeader heeft een eigen dropdown-implementatie met subpanelen (zie PageHeader.md).

### Maatvoering

| Size | Hoogte | Padding (no icon) | Font | Icon |
|------|--------|--------------------|------|------|
| `lg` | `48px` | `12px 24px` | 16px/24px | 24px |
| `md` | `40px` | `8px 16px` | 14px/20px | 24px |
| `sm` | `32px` | `8px 12px` | 12px/16px | 16px |

Gap icon-tekst: `--sp-s` (8px). Font: Nunito SemiBold (600). `white-space: nowrap`.

### Visuele states per variant

**Filled** — primaire actie, gevulde achtergrond:

| State | Achtergrond | Tekst | Extra |
|-------|-------------|-------|-------|
| Enabled | `--p500` | `--n0` | — |
| Hover | `--p600` | `--n0` | `box-shadow: --shadow-s` |
| Pressed | `--p700` | `--n0` | `box-shadow: --shadow-s` |
| Disabled | `--p100` | `--n0` | `cursor: not-allowed` |

**Outlined** — secundaire actie, transparant met rand:

| State | Achtergrond | Tekst | Border |
|-------|-------------|-------|--------|
| Enabled | `--n0` | `--n900` | `--n400` |
| Hover | `--n50` | `--n900` | `--n500` |
| Pressed | `--n100` | `--n900` | `--n500` |
| Disabled | `--n0` | `--n400` | `--n300` |

**Ghost** — tertiaire actie, geen achtergrond in rust:

| State | Achtergrond | Tekst |
|-------|-------------|-------|
| Enabled | transparent | `--n800` |
| Hover | `--n50` | `--n900` |
| Pressed | `--n100` | `--n900` |
| Disabled | transparent | `--n400` |

**Outlined Brand** -- secundaire brand-actie (prototype-specifiek):

| State | Achtergrond | Tekst | Border |
|-------|-------------|-------|--------|
| Enabled | transparent | `--p500` | `--p500` |
| Hover | `--p50` | `--p600` | `--p600` |
| Pressed | `--p100` | `--p700` | `--p700` |
| Disabled | transparent | `--p300` | `--p300` |

**Gray** — neutrale actie:

| State | Achtergrond | Tekst |
|-------|-------------|-------|
| Enabled | `--n50` | `--n800` |
| Hover | `--n100` | `--n900` |
| Pressed | `--n200` | `--n900` |
| Disabled | `--n50` | `--n400` |

**Destructive** — onomkeerbare actie (prototype-specifiek):

| State | Achtergrond | Tekst | Extra |
|-------|-------------|-------|-------|
| Enabled | `--err` | `--n0` | — |
| Hover | `--err-hover` | `--n0` | `box-shadow: --shadow-s` |
| Pressed | `--err-active` | `--n0` | — |
| Disabled | `--err-bg` | `--n400` | `cursor: not-allowed` |

## Design Tokens

| Element | Token | Waarde |
|---------|-------|--------|
| Border-radius | `--r-s` | 4px |
| Gap icon + tekst | `--sp-s` | 8px |
