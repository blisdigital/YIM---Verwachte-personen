# SearchBox

Zoek input veld met debounce, cancel-knop en decoratief zoekicoon. Gebruikt in de FilterStrip voor het doorzoeken van de personentabel.

## Relaties
- **Gebruikt door:** FilterStrip
- **Gebruikt:** —

## Gebruik

```vue
<SearchBox
  v-model="searchQuery"
  placeholder="Zoek op naam, bedrijf, referentie..."
/>
```

## Props

| Prop | Type | Default | Beschrijving |
|------|------|---------|-------------|
| `modelValue` | `string` | `''` | Zoekterm (v-model) |
| `placeholder` | `string` | `'Zoek op naam, bedrijf, referentie...'` | Placeholder tekst |
| `debounce` | `number` | `300` | Debounce in ms |

## Events

| Event | Payload | Beschrijving |
|-------|---------|-------------|
| `update:modelValue` | `string` | Zoekterm na debounce |

## Gedrag

- **Hover** op container: border naar `--n800`.
- **Focus** (klik/Tab): border `2px --p500`, cancel-icoon verschijnt, caret zichtbaar.
- **Typen**: state "Filled" (persisteert na blur zolang er tekst is).
- **Cancel** (x-icoon): wist input, terug naar Enabled/Hover.
- **Search-icoon** (rechts): decoratief bij live-search.
- **Disabled**: `pointer-events: none`, border blijft `--n400`, search-icoon naar `--n400`.
- Hoogte: 40px. Breedte: 260px default.

### Visuele states

| State | Border | Placeholder / waarde | Cancel-icoon | Icon-action |
|-------|--------|----------------------|--------------|-------------|
| Enabled | `1px --n400` | placeholder `--n500` | verborgen | search `--n800` |
| Hover | `1px --n800` | placeholder `--n500` | verborgen | search `--n800` |
| Focused | `2px --p500` | waarde `--n900` + caret | zichtbaar `--n800` | search `--n800` |
| Filled | `1px --n400` | waarde `--n900` | zichtbaar `--n800` | search `--n800` |
| Disabled | `1px --n400` | placeholder `--n500` | verborgen | search `--n400` |

## Design Tokens

| Element | Token | Waarde |
|---------|-------|--------|
| Achtergrond | `--n0` | Wit |
| Icon-area achtergrond | `--n50` | Lichtgrijs |
| Border default | `--n400` | Grijs |
| Border hover | `--n800` | Donkergrijs |
| Border focus | `--p500` | Teal (2px) |
| Tekst | `--n900` | Bijna zwart |
| Placeholder | `--n500` | Middengrijs |
| Cancel-icoon | `--n800` | Donkergrijs |
| Search-icoon | `--n800` | Donkergrijs |
| Afronding | `--r-s` | 4px |
| Padding | `--sp-s` | 8px |
| Typografie | Body L — Nunito Regular | 16/24 |
