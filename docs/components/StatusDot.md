# StatusDot

Gekleurde stip + label voor bezoekstatus van een persoon. Label erft fontkleur van de parent context.

## Relaties
- **Gebruikt door:** TableRow, DetailPanel
- **Gebruikt:** geen child components

## Gebruik

```vue
<StatusDot status="Verwacht" />
<StatusDot status="Aangemeld" />
```

## Props

| Prop | Type | Default | Beschrijving |
|------|------|---------|-------------|
| `status` | `'Verwacht' \| 'Nog niet aangekomen' \| 'Aangemeld' \| 'Afgemeld' \| 'Niet aangekomen' \| 'Geannuleerd'` | -- | Status waarde |

## Events

Geen events -- puur presentatiecomponent.

## Gedrag

- Dot diameter `12px`, gap dot-label `8px`.
- Font: `14px` / `600` / `line-height 20px`. Labelkleur `inherit` (erft van parent).

### Kleurmapping (dot)

| Status | Token |
|--------|-------|
| `Verwacht` | `--info` |
| `Nog niet aangekomen` | `--warn-y500` |
| `Aangemeld` | `--ok` |
| `Afgemeld` | `--n800` |
| `Niet aangekomen` | `--err` |
| `Geannuleerd` | `--n400` |

## Design Tokens

| Element | Token | Waarde |
|---------|-------|--------|
| Verwacht dot | `--info` | `#2464bb` |
| Nog niet aangekomen dot | `--warn-y500` | `#c9a825` |
| Aangemeld dot | `--ok` | `#24bb86` |
| Afgemeld dot | `--n800` | `#3e3f40` |
| Niet aangekomen dot | `--err` | `#bc243b` |
| Geannuleerd dot | `--n400` | `#b8babb` |
