# TypeTabs

Gesegmenteerde knoppengroep voor filteren op persoontype. Drie tabs: Alle, Bezoekers, Contractors.

## Relaties
- **Gebruikt door:** FilterStrip
- **Gebruikt:** Geen child-componenten

## Gebruik
```vue
<TypeTabs v-model="activePersoontype" />
```

## Props
| Prop | Type | Default | Beschrijving |
|------|------|---------|-------------|
| `modelValue` | `'Bezoeker' \| 'Contractor' \| null` | `null` | Actief type (`null` = Alle, `'Contractor'` filtert op alle niet-Bezoeker persoontypen) |

## Events
| Event | Payload | Beschrijving |
|-------|---------|-------------|
| `update:modelValue` | `'Bezoeker' \| 'Contractor' \| null` | Gebruiker selecteert een ander tab; `null` = Alle |

## Gedrag
- Drie tabs: "Alle" (`null`), "Bezoekers" (`'Bezoeker'`), "Contractors" (`'Contractor'`).
- `role="tablist"` op de container, `role="tab"` + `aria-selected` op elke knop.
- "Contractors" filtert op alle persoontypen behalve `'Bezoeker'` (warehouse, technisch, logistiek, etc.).
- Slechts een tab tegelijk actief. Klik op de actieve tab doet niets (geen toggle-off).
- Bij wisselen reset de pagina naar 1 (afgehandeld door de parent via `filterStore`).

### Tab-states
| State | Bg | Tekst | Typografie |
|-------|-----|-------|-----------|
| Actief | `--p500` | `--n0` | Label M -- 14/20, 600, 0.14px |
| Inactief | `--n0` | `--n800` | Label M -- 14/20, 600, 0.14px |
| Hover (inactief) | `--n50` | `--n800` | -- |

Tab padding: `--sp-s` top/bottom (8px), `--sp-l` links/rechts (16px). Border-radius: `--r-s`.

## Design Tokens
| Element | Token | Waarde |
|---------|-------|--------|
| Container achtergrond | `--n0` | `#ffffff` |
| Container border | `--n400` | `#b8babb` |
| Container radius | `--r-s` | `4px` |
| Container padding | -- | `2px` |
| Container gap | `--sp-s` | `8px` |
| Tab actief achtergrond | `--p500` | `#6daeba` |
| Tab actief tekst | `--n0` | `#ffffff` |
| Tab inactief achtergrond | `--n0` | `#ffffff` |
| Tab inactief tekst | `--n800` | `#3e3f40` |
| Tab hover achtergrond | `--n50` | `#f8fafb` |
| Tab padding verticaal | `--sp-s` | `8px` |
| Tab padding horizontaal | `--sp-l` | `16px` |
| Tab radius | `--r-s` | `4px` |
| Tab typografie | `--font` | Nunito SemiBold 14/20, letter-spacing 0.14px |
