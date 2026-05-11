# TypeTabs

Gesegmenteerde knoppengroep voor filteren op persoontype, met count-badges.

```vue
<TypeTabs v-model="activePersoontype" :counts="counts" />
```

| Prop | Type | Default | Beschrijving |
|------|------|---------|--------------|
| `modelValue` | `'Bezoeker' \| 'Contractor' \| null` | `null` | Actief type (`null` = Alle, `'Contractor'` filtert op alle niet-Bezoeker persoontypen) |
| `counts` | `{ alle: number, bezoekers: number, contractors: number }` | — | Aantallen per categorie (`contractors` = alle personen met `persoontype !== 'Bezoeker'`) |

**Events:** `@update:modelValue`

---

## Visuele structuur

```
┌─────────────────────────────────────────────────────────┐  border --n400, --r-s
│ ┌──────────────┐ ┌───────────────┐ ┌─────────────────┐  │  padding 2px, gap --sp-s
│ │ Alle    [20] │ │ Bezoekers [8] │ │ Contractors[12] │  │
│ └──────────────┘ └───────────────┘ └─────────────────┘  │
└─────────────────────────────────────────────────────────┘
   active             inactive           inactive
```

---

## Container

| Eigenschap | Waarde |
| ------------ | -------- |
| Background | `--n0` |
| Border | `1px solid --n400` |
| Border-radius | `--r-s` (4px) |
| Padding | `2px` (Spacing-xxs) |
| Gap | `--sp-s` (8px) |
| Align-items | `flex-start` |

---

## Tab-states

| State | Bg | Tekst | Typografie |
| ------- | ---- | ------- | ----------- |
| Actief | `--p500` | `--n0` | Label M — 14/20, 600, 0.14px |
| Inactief | `--n0` | `--n800` | Label M — 14/20, 600, 0.14px |
| Hover (inactief) | `--n50` | `--n800` | — |

Tab padding: `--sp-s` top/bottom (8px), `--sp-l` links (16px), `--sp-m` rechts (12px). Gap tussen label en badge: `--sp-s` (8px). Border-radius: `--r-s`.

---

## Badge (counter)

| Eigenschap | Waarde |
| ------------ | -------- |
| Background | `--p100` (altijd — actief én inactief) |
| Tekst | `--p800` |
| Typografie | Label S — 12/16, 600, 0.12px |
| Padding | `2px` verticaal / `--sp-xs` (4px) horizontaal |
| Border-radius | `--r-xl` (360px, pill) |
| Min-breedte | `20px` |
| Hoogte | Auto — afgeleid van content (line-height 16px + 2×2px padding = 20px) |
