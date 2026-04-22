# BaseButton

Tekstbutton voor primaire, secundaire en tertiaire acties.

**Figma:** [`2092:3952`](https://www.figma.com/design/RQhCroVydjMVySUhH4AoIw/YIM-UI-Kit?node-id=2092-3952)

```vue
<BaseButton variant="filled" size="lg" icon="expand_more" icon-position="right">Nieuwe registratie</BaseButton>
<BaseButton variant="outlined" size="lg" icon="expand_more" icon-position="right">Instellingen</BaseButton>
<BaseButton variant="outlined" size="md">Annuleren</BaseButton>
<BaseButton variant="filled" size="md" :disabled="true">Opslaan</BaseButton>
```

| Prop | Type | Default | Beschrijving |
|------|------|---------|--------------|
| `variant` | `'filled' \| 'outlined' \| 'ghost' \| 'gray'` | `'filled'` | Visuele stijl |
| `size` | `'lg' \| 'md' \| 'sm'` | `'md'` | Grootte |
| `icon` | `string` | — | Material icon naam (optioneel) |
| `iconPosition` | `'left' \| 'right'` | `'left'` | Icon positie |
| `disabled` | `boolean` | `false` | Uitgeschakeld |

**Events:** `@click`

**Gebruik in dit prototype:**

- `lg` + `icon right` → PageHeader (Nieuwe registratie)
- `lg` + `icon right` → PageHeader (Instellingen)
- `md` → BezoekDetail, CheckinModal (actiebuttons en annuleren)

---

## Maatvoering

| Size | Hoogte | Padding icon left | Padding icon right | Padding no icon | Font |
|------|--------|-------------------|--------------------|-----------------|------|
| `lg` | `48px` | `12px 16px 12px 8px` | `12px 8px 12px 16px` | `12px 24px` | Label L |
| `md` | `40px` | `8px 16px 8px 8px` | `8px 8px 8px 16px` | `8px 16px` | Label M |
| `sm` | `32px` | `8px 12px 8px 8px` | `8px 8px 8px 12px` | `8px 12px` | Label S |

Hoogte is niet gefixeerd — volgt line-height + verticale padding. Icon `24px × 24px` voor `lg` en `md`, `16px × 16px` voor `sm`. Gap icon–tekst: `--sp-s` (`8px`).

### Typografie

| Token | Label L (`lg`) | Label M (`md`) | Label S (`sm`) |
|-------|---------------|---------------|---------------|
| `font-family` | `Nunito` | `Nunito` | `Nunito` |
| `font-weight` | `600` (semibold) | `600` (semibold) | `600` (semibold) |
| `font-size` | `16px` | `14px` | `12px` |
| `line-height` | `24px` | `20px` | `16px` |
| `letter-spacing` | `0.16px` | `0.14px` | `0.12px` |
| `white-space` | `nowrap` | `nowrap` | `nowrap` |

---

## Variant tokens

### Filled

Primaire actie. Achtergrond gevuld met brandkleur.

| State | Achtergrond | Tekst | Border | Extra |
|-------|-------------|-------|--------|-------|
| Enabled | `--p500` `#6daeba` | `--n0` `#ffffff` | — | — |
| Hover | `--p600` `#598f99` | `--n0` | — | `box-shadow: 0 2px 8px rgba(17,19,19,0.16)` |
| Focus | `--p600` `#598f99` | `--n0` | `2px solid --p400` `#87bdc6` | — |
| Pressed | `--p700` `#315161` | `--n0` | — | `box-shadow: 0 2px 8px rgba(17,19,19,0.16)` |
| Disabled | `--p100` `#d6e8ec` | `--n0` | — | `cursor: not-allowed`, geen interactie |

### Outlined

Secundaire actie. Transparante achtergrond met rand.

| State | Achtergrond | Tekst | Border |
|-------|-------------|-------|--------|
| Enabled | `--n0` `#ffffff` | `--n900` `#1d1e1f` | `1px solid --n400` `#b8babb` |
| Hover | `--n50` `#f8fafb` | `--n900` | `1px solid --n500` `#999a9b` |
| Focus | `--n0` `#ffffff` | `--n900` | `2px solid --n600` `#707172` |
| Pressed | `--n100` `#f3f4f5` | `--n900` | `1px solid --n500` `#999a9b` |
| Disabled | `--n0` `#ffffff` | `--n400` `#b8babb` | `1px solid --n300` `#eaeced` |

### Ghost

Tertiaire actie. Geen achtergrond of rand in rust. Hover toont lichte achtergrond.

| State | Achtergrond | Tekst | Border |
|-------|-------------|-------|--------|
| Enabled | transparent | `--n800` `#3e3f40` | — |
| Hover | `--n50` `#f8fafb` | `--n900` `#1d1e1f` | — |
| Focus | `--n0` `#ffffff` | `--n900` `#1d1e1f` | `2px solid --n50` `#f8fafb` |
| Pressed | `--n100` `#f3f4f5` | `--n900` `#1d1e1f` | — |
| Disabled | transparent | `--n400` `#b8babb` | — |

### Gray

Neutrale actie. Grijze achtergrond in rust; geschikt op witte én gekleurde achtergronden.

| State | Achtergrond | Tekst | Border |
|-------|-------------|-------|--------|
| Enabled | `--n50` `#f8fafb` | `--n800` `#3e3f40` | — |
| Hover | `--n100` `#f3f4f5` | `--n900` `#1d1e1f` | — |
| Focus | `--n100` `#f3f4f5` | `--n900` `#1d1e1f` | `2px solid --n50` `#f8fafb` |
| Pressed | `--n200` `#ebeced` | `--n900` `#1d1e1f` | — |
| Disabled | `--n50` `#f8fafb` | `--n400` `#b8babb` | — |

---

## Gedeelde container tokens

| Element | Token | Waarde |
|---------|-------|--------|
| `border-radius` | `--r-s` | `4px` |
| Gap icon + tekst | `--sp-s` | `8px` |

---

## Button met ActionMenu (dropdown-patroon)

Knoppen met een dropdown gebruiken een `<ActionMenu>` als dropdown-paneel. Er is geen aparte split-button component — de button triggert zelf het menu.

```vue
<div class="relative">
  <BaseButton variant="filled" size="lg" icon="add" @click="menuOpen = !menuOpen">
    Nieuwe registratie
  </BaseButton>
  <ActionMenu
    v-if="menuOpen"
    :options="registratieOpties"
    @select="handleSelect"
    @close="menuOpen = false"
  />
</div>
```

Zie [ActionMenu.md](ActionMenu.md) voor de dropdown-opties en tokens van het menu-paneel.

**Uitzondering:** de Instellingen-knop in de PageHeader heeft een eigen dropdown-implementatie met subpanelen — zie [PageHeader.md](PageHeader.md).
