# TypeTabs

Gesegmenteerde knoppengroep voor filteren op persoontype.

```vue
<TypeTabs v-model="activePersoontype" />
```

| Prop | Type | Default | Beschrijving |
|------|------|---------|--------------|
| `modelValue` | `'Bezoeker' \| 'Contractor' \| null` | `null` | Actief type (`null` = Alle, `'Contractor'` filtert op alle niet-Bezoeker persoontypen) |

**Events:** `@update:modelValue`

---

## Visuele structuur

```
┌──────────────────────────────────────────────────────┐  border --n400, --r-s
│ ┌──────────┐ ┌────────────┐ ┌─────────────────────┐  │  padding 2px, gap --sp-s
│ │   Alle   │ │ Bezoekers  │ │     Contractors      │  │
│ └──────────┘ └────────────┘ └─────────────────────┘  │
└──────────────────────────────────────────────────────┘
   active         inactive           inactive
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

Tab padding: `--sp-s` top/bottom (8px), `--sp-l` links/rechts (16px). Border-radius: `--r-s`.
