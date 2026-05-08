# Toast Messages — Design Tokens

> **Figma node:** `2196-3132` · YIM UI Kit  
> **Component naam:** `AlertBanner`

---

## Standaard variant (prototype)

Overal in de applicatie wordt de volgende variant gebruikt:

| Prop | Waarde |
|------|--------|
| `type` | `Neutral` |
| `leadingIcon` | `false` |
| `action` | `false` |
| `cancel` | `true` |

Dit geeft een donkere toast met alleen een trailing close-knop (×). Geen leading icoon, geen action button.

---

## Props (varianten)

| Prop | Type | Default | Opties |
|------|------|---------|--------|
| `type` | string | `Neutral` | `Neutral` · `Success` · `Warning` · `Error` |
| `leadingIcon` | boolean | `false` | `true` · `false` |
| `action` | boolean | `false` | `true` · `false` |
| `cancel` | boolean | `false` | `true` · `false` |

---

## Container

| Token | Waarde |
|-------|--------|
| **Breedte** | `360px` (fixed) |
| **Border radius** | `--dimensions/corners/corner-s` → `4px` |
| **Drop shadow** | `--elevation/m` → `0px 4px 8px rgba(17,19,19,0.16)` |
| **Padding left** | `--dimensions/spacing/spacing-l` → `16px` |
| **Padding right (met action/cancel)** | `--dimensions/spacing/spacing-s` → `8px` |
| **Padding right (zonder action/cancel)** | `--dimensions/spacing/spacing-m` → `12px` |
| **Padding top/bottom (met action/cancel)** | `--dimensions/spacing/spacing-s` → `8px` |
| **Padding top/bottom (zonder action/cancel)** | `--dimensions/spacing/spacing-m` → `12px` |
| **Gap (met action/cancel)** | `--dimensions/spacing/spacing-s` → `8px` |

### Achtergrondkleur per type

| Type | Token | Waarde |
|------|-------|--------|
| `Neutral` | `--color/-neutrals/-n900` | `#1d1e1f` |
| `Success` | `--color/-success/-g500` | `#24bb86` |
| `Warning` | `--color/-warning/-y500` | `#f8d32c` |
| `Error` | `--color/-error/-r500` | `#bc243b` |

---

## Tekst (message)

| Token | Waarde |
|-------|--------|
| **Font family** | `--typography/font/body` → `Nunito` |
| **Font weight** | `--typography/weight/regular` → `400` |
| **Font size** | `--typography/size/body-m` → `14px` |
| **Line height** | `--typography/line-height/body-m` → `20px` |
| **Letter spacing** | `--typography/letter-spacing/body-m` → `0px` |

### Tekstkleur per type

| Type | Token | Waarde |
|------|-------|--------|
| `Neutral` | `--color/-neutrals/-n50` | `#f8fafb` |
| `Success` | `--color/-neutrals/-n0` | `#ffffff` |
| `Warning` | `--color/-neutrals/-n900` | `#1d1e1f` |
| `Error` | `--color/-error/-r50` | `#f8e9eb` |

---

## Leading Icon (`leadingIcon = true`)

| Eigenschap | Waarde |
|------------|--------|
| **Grootte** | `24×24px` |
| **Gap naar tekst** | `--dimensions/spacing/spacing-s` → `8px` |

### Icoon per type

| Type | Icoon naam | Kleur |
|------|-----------|-------|
| `Neutral` | `check-circle` | `--color/-neutrals/-n50` → `#f8fafb` |
| `Success` | `check-circle` | `--color/-neutrals/-n0` → `#ffffff` |
| `Warning` | `warning` | `--color/-neutrals/-n900` → `#1d1e1f` |
| `Error` | `error` | `--color/-error/-r50` → `#f8e9eb` |

---

## Action Button (`action = true`)

Gebruikt de **BaseButton** component.

> → Zie **BaseButton tokens markdown** voor volledige token-specificatie.  
> Variant: **Ghost · Medium · No Icon · Enabled**  
> Figma node: `2092:4238`

### Tekstkleur label per type

| Type | Token | Waarde |
|------|-------|--------|
| `Neutral` | `--color/-brand/-p100` | `#d6e8ec` |
| `Success` | `--color/-success/-g50` | `#e9f8f3` |
| `Warning` | `--color/-neutrals/-n900` | `#1d1e1f` |
| `Error` | `--color/-error/-r100` | `#ecc2c8` |

### Label typografie

| Token | Waarde |
|-------|--------|
| **Font family** | `--typography/font/body` → `Nunito` |
| **Font weight** | `--typography/weight/semibold` → `600` |
| **Font size** | `--typography/size/label-m` → `14px` |
| **Line height** | `--typography/line-height/label-m` → `20px` |
| **Letter spacing** | `--typography/letter-spacing/label-m` → `0.14px` |

### Button layout

| Eigenschap | Token | Waarde |
|------------|-------|--------|
| Padding X | `--dimensions/spacing/spacing-l` | `16px` |
| Padding Y | `--dimensions/spacing/spacing-s` | `8px` |
| Border radius | `--dimensions/corners/corner-s` | `4px` |
| Gap intern | `--dimensions/spacing/spacing-s` | `0px` |

---

## Cancel (Sluiten) Icon Button (`cancel = true`)

Gebruikt de **IconButton** component.

> → Zie **IconButton tokens markdown** voor volledige token-specificatie.  
> Variant: **Ghost · Medium · Enabled**  
> Figma node: `2100:636`

### Icoon

| Eigenschap | Waarde |
|------------|--------|
| **Icoon** | `close` (×) |
| **Grootte** | `24×24px` |
| **Padding** | `--dimensions/spacing/spacing-s` → `8px` |
| **Border radius** | `--dimensions/corners/corner-s` → `4px` |

### Icoonkleur per type

| Type | Token | Waarde |
|------|-------|--------|
| `Neutral` | `--color/-neutrals/-n50` | `#f8fafb` (wit-ish) |
| `Success` | `--color/-success/-g50` | `#e9f8f3` |
| `Warning` | `--color/-neutrals/-n900` | `#1d1e1f` (donker) |
| `Error` | `--color/-error/-r100` | `#ecc2c8` |

---

## Variant combinaties (overzicht)

| `type` | `leadingIcon` | `action` | `cancel` | Beschrijving |
|--------|--------------|---------|---------|-------------|
| Any | `false` | `false` | `false` | Simpele toast, alleen tekst |
| Any | `true` | `false` | `false` | Toast met leading icoon |
| Any | `false` | `false` | `true` | Toast met sluit-knop ← **standaard prototype** |
| Any | `true` | `false` | `true` | Toast met icoon + sluit-knop |
| Any | `false` | `true` | `false` | Toast met action button |
| Any | `true` | `true` | `false` | Toast met icoon + action button |
| Any | `false` | `true` | `true` | Toast met action + sluit-knop |
| Any | `true` | `true` | `true` | Toast met icoon + action + sluit-knop |

---

## Interne layout

```
┌─────────────────────────────────────────────────────┐
│ [icon?]  Berichttekst                [Action] [×]   │
└─────────────────────────────────────────────────────┘
  ← padding-l →  ← flex: 1 →          ← shrink-0 → ← padding-r →
```

- Content links (`AlignLeft`): flex-row, items-center, flex: 1
- Buttons rechts (`AlignRight`): flex-row, items-center, shrink-0
- Zonder `action` en zonder `cancel`: geen AlignRight container
