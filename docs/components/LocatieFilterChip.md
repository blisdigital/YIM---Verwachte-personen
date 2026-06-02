# LocatieFilterChip

Locatie-chip in de FilterStrip. Toont de geselecteerde locatie als label; opent een dropdown met alle beschikbare locaties afgeleid uit `personenStore.personen`. Synct via `v-model` met `filterStore.locatie`.

```vue
<LocatieFilterChip v-model="filterStore.locatie" />
```

## Props

| Prop | Type | Default | Beschrijving |
|------|------|---------|--------------|
| `modelValue` | `string \| null` | `null` | Geselecteerde locatie |

## Events

| Event | Payload | Beschrijving |
|-------|---------|--------------|
| `update:modelValue` | `string \| null` | Locatie geselecteerd of gewist |

## Gedrag

- Locatielijst wordt dynamisch opgebouwd uit alle unieke `locaties[]` waarden in `personenStore.personen`
- Lijst is alfabetisch gesorteerd (`nl` locale)
- Chip label: geselecteerde locatie of `"Locatie"` als fallback
- Actieve staat (locatie geselecteerd): chip krijgt branded styling
- "Alle locaties" optie bovenaan de lijst wist de selectie (`null`)

## Design tokens

| Element | Token | Waarde |
|---------|-------|--------|
| Chip achtergrond (actief) | `--p50` | `#f0f7f8` |
| Chip border (actief) | `--p300` | `#a2cbd3` |
| Chip tekst (actief) | `--p700` | `#315161` |
| Chip tekst (inactief) | `--n600` | `#7b7c7d` |
| Dropdown achtergrond | `--n0` | `#ffffff` |
| Dropdown border | `--n300` | `#eaeced` |
| Dropdown schaduw | `--shadow-m` | `0 4px 16px -2px rgba(17,19,19,0.16)` |
| Item hover | `--p50` | `#f0f7f8` |
| Item actief check | `--p500` | `#6daeba` |
