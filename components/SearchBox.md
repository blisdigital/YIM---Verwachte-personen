# SearchBox

Zoek input veld.

```vue
<SearchBox
  v-model="searchQuery"
  placeholder="Zoek op naam, bedrijf, referentie..."
/>
```

| Prop | Type | Default | Beschrijving |
|------|------|---------|--------------|
| `modelValue` | `string` | `''` | Zoekterm |
| `placeholder` | `string` | `'Zoeken'` | Placeholder tekst |
| `debounce` | `number` | `300` | Debounce in ms |

---

## Structuur

```text
┌──────────────────────────────────────┬───────┐   border, Corner-s
│ Zoek op naam, bedrijf, referentie... │  🔍  │   input (flex:1) + icon-action (40×40, N50 bg)
└──────────────────────────────────────┴───────┘
  ↑ padding Spacing-s (8px)              ↑ search-icoon 24px
```

Filled / Focused tonen een **cancel-icoon** (✕, 24px, `N800`) rechts binnen het input-deel, vóór de icon-action.

Hoogte: **40px**. Breedte: content-driven (default 320px). `box-sizing: border-box` zodat de 2px focus-border de hoogte niet vergroot.

---

## Tokens

| Categorie | Token | Waarde |
| --- | --- | --- |
| Colors | `N0` / `N50` | `#ffffff` / `#f8fafb` |
| | `N400` / `N500` / `N800` / `N900` | `#b8babb` / `#999a9b` / `#3e3f40` / `#1d1e1f` |
| | `P500` | `#6daeba` |
| Spacing | `Spacing-s` | `8px` |
| Corners | `Corner-s` | `4px` |
| Typography | Body L — Nunito Regular | 16/24, 0 |

---

## States

| State | Border | Placeholder / waarde | Cancel-icoon | Icon-action |
| --- | --- | --- | --- | --- |
| Enabled | `1px N400` | placeholder `N500` | verborgen | search `N800` |
| Hover | `1px N800` | placeholder `N500` | verborgen | search `N800` |
| Focused | **`2px P500`** | waarde `N900` + caret | zichtbaar `N800` 24px | search `N800` |
| Filled | `1px N400` | waarde `N900` | zichtbaar `N800` 24px | search `N800` |
| Disabled | `1px N400` | placeholder `N500` | verborgen | search `N400` |

---

## Gedrag

- **Hover** op container → border `N800`
- **Focus** (klik/Tab) → border `2px P500`, cancel-icoon verschijnt, caret zichtbaar
- **Typen** → state "Filled" (persisteert na blur zolang er tekst is)
- **Cancel** (✕) → wis input, terug naar Enabled/Hover
- **Search-icoon** (rechts) → decoratief bij live-search; kan ook zoekactie triggeren
- **Disabled** → `pointer-events: none`; border blijft `N400`, search-icoon naar `N400`
