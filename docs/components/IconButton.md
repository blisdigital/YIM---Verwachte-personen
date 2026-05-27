# IconButton

Icon-only button voor compacte acties zonder tekstlabel.

**Figma:** [`2092:4565`](https://www.figma.com/design/RQhCroVydjMVySUhH4AoIw/YIM-UI-Kit?node-id=2092-4565)

```vue
<IconButton variant="ghost" size="md" icon="close" aria-label="Sluiten" />
<IconButton variant="filled" size="lg" icon="add" aria-label="Toevoegen" />
<IconButton variant="outlined" size="md" icon="more_horiz" aria-label="Meer opties" />
<IconButton variant="ghost" size="md" icon="menu" aria-label="Menu openen" />
```

| Prop | Type | Default | Beschrijving |
|------|------|---------|--------------|
| `variant` | `'filled' \| 'outlined' \| 'ghost' \| 'gray'` | `'ghost'` | Visuele stijl |
| `size` | `'lg' \| 'md' \| 'sm'` | `'md'` | Grootte |
| `icon` | `string` | — | Material icon naam (verplicht) |
| `ariaLabel` | `string` | — | Toegankelijkheidslabel (verplicht — geen zichtbare tekst aanwezig) |
| `disabled` | `boolean` | `false` | Uitgeschakeld |

**Events:** `@click`

**Gebruik in dit prototype:**
- `md` + `ghost` → AppHeader (hamburger-knop), BezoekDetail (sluitknop `close`)
- `md` + `ghost` → BulkBar (× sluitknop)

> De `‹` / `›` navigatieknoppen in `DatePickerCalendar` volgen de ghost-variant tokens van `IconButton` (disabled: `--n300`).

---

## Maatvoering

Altijd vierkant. Padding rondom het icon is symmetrisch.

| Size | Afmeting | Padding | Icon |
|------|----------|---------|------|
| `lg` | `48 × 48px` | `12px` (`--sp-m`) | `24 × 24px` |
| `md` | `40 × 40px` | `8px` (`--sp-s`) | `24 × 24px` |
| `sm` | `32 × 32px` | `8px` (`--sp-s`) | `16 × 16px` |

`border-radius`: `--r-s` (`4px`)

---

## Variant tokens

### Filled

Primaire actie. Zelfde kleurlogica als `BaseButton variant="filled"`.

| State | Achtergrond | Icon | Extra |
|-------|-------------|------|-------|
| Enabled | `--p500` `#6daeba` | `--n0` | — |
| Hover | `--p600` `#598f99` | `--n0` | `box-shadow: 0 2px 8px rgba(17,19,19,0.16)` |
| Focus | `--p500` | `--n0` | focus ring `2px solid --p700` |
| Pressed | `--p700` `#315161` | `--n0` | — |
| Disabled | `--p100` `#d6e8ec` | `--n0` | `cursor: not-allowed`, geen interactie |

### Outlined

Secundaire actie. Zelfde kleurlogica als `BaseButton variant="outlined"`.

| State | Achtergrond | Icon | Border |
|-------|-------------|------|--------|
| Enabled | `--n0` | `--n900` | `1px solid --n400` |
| Hover | `--n50` | `--n900` | `1px solid --n500` |
| Focus | `--n0` | `--n900` | `1px solid --n400` + focus ring `2px solid --p700` |
| Pressed | `--n100` | `--n900` | `1px solid --n500` |
| Disabled | `--n0` | `--n400` | `1px solid --n300` |

### Ghost

Tertiaire actie. Geen achtergrond of rand in rust. Meest gebruikte variant voor sluit- en contextknoppen.

| State | Achtergrond | Icon |
|-------|-------------|------|
| Enabled | transparant | `--n700` |
| Hover | `--n100` | `--n700` |
| Focus | transparant | `--n700` + focus ring `2px solid --p700` |
| Pressed | `--n100` | `--n900` |
| Disabled | transparant | `--n300` |

### Gray

Neutrale actie op gekleurde of gevulde achtergronden. Grijze achtergrond in rust.

| State | Achtergrond | Icon |
|-------|-------------|------|
| Enabled | `--n50` | `--n700` |
| Hover | `--n100` | `--n700` |
| Focus | `--n50` | `--n700` + focus ring `2px solid --p700` |
| Pressed | `--n100` | `--n900` |
| Disabled | `--n50` | `--n300` |

> Ghost en Gray worden in dit prototype op dit moment alleen voor de `ghost`-variant toegepast. De `gray`-variant is onderdeel van het design system maar nog niet in gebruik.

---

## Gedeelde container tokens

| Element | Token | Waarde |
|---------|-------|--------|
| `border-radius` | `--r-s` | `4px` |
| Padding (lg) | `--sp-m` | `12px` |
| Padding (md / sm) | `--sp-s` | `8px` |
