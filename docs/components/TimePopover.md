# TimePopover

Inline tijdkiezer popover. Toont twee scrollbare kolommen (uren 0–23, minuten 0–59) met een huidig-tijdknop en OK/Annuleren footer. Wordt gebruikt door ColumnFilters voor tijdfiltering.

```vue
<TimePopover
  :time="currentTime"
  @apply="onTimeApply"
  @cancel="onTimeCancel"
/>
```

| Prop | Type | Default | Beschrijving |
|------|------|---------|--------------|
| `time` | `string \| null` | `null` | Initiële tijd in `"HH:mm"` formaat |

**Events:**
- `@apply` — Gebruiker bevestigt keuze (`"HH:mm"` string)
- `@cancel` — Gebruiker annuleert

### Structuur

```
┌─────────────────────┐  ← 200px breed
│ 14:30      [Nu]     │  ← topbar: huidig geselecteerde tijd + Nu-knop
│ Uren    Minuten     │  ← kolomlabels
│ ┌──────────────────┐│
│ │  12  :  28       ││  ← scrollbare kolommen, 5 rijen zichtbaar (180px)
│ │  13  :  29       ││    geselecteerde rij: border top+bottom n500
│ │ [14] : [30]      ││    even uren: p50 achtergrond, oneven: n0
│ │  15  :  31       ││
│ │  16  :  32       ││
│ └──────────────────┘│
│ [Annuleren]  [OK]   │  ← footer knoppen
└─────────────────────┘
```

### Layout & Design

**Container:**

| Eigenschap | Waarde |
|------------|--------|
| Breedte | `200px` |
| Achtergrond | `var(--n0)` |
| Border-radius | `var(--r-s)` |
| Shadow | `var(--shadow-m)` |
| Padding | `var(--sp-s)` |
| Gap secties | `10px` |

**Topbar (`.tp-topbar`):**
- Display: `flex`, `align-items: center`, `justify-content: space-between`
- Huidig tijd display: `12px / 600`, `var(--p600)`, padding `8px 12px`
- "Nu"-knop: `12px / 600`, `var(--n900)`, `border: 1px solid var(--n400)`, `border-radius: var(--r-s)`, padding `8px 12px`; hover: `border-color: var(--p500)`

**Kolomlabels (`.tp-labels`):**
- Font: `12px / 400 var(--n900)`, gecentreerd per kolom
- Display: `flex`, gap `2px`

**Scroll-area (`.tp-scroll-area`):**
- Display: `flex`, `align-items: stretch`
- Elke kolom (`.tp-col`): `flex: 1`, hoogte `180px` (5 rijen × 36px), `overflow-y: scroll`, scrollbar verborgen (`scrollbar-width: none`)
- Scheiding (`.tp-sep`): `16px` breed, gecentreerde `:` — verschuiving `padding-top: 72px` om uit te lijnen met geselecteerde rij

**Rijen (`.tp-row`):**
- Hoogte: `36px`, `display: flex`, `align-items: center`, `justify-content: center`
- Font: `14px / 400 var(--n700)`, `cursor: pointer`, `user-select: none`
- Even uren (`.tp-row-alt`): achtergrond `var(--p50)`
- Niet-even (`.tp-row-plain`): achtergrond `var(--n0)`
- Hover (niet geselecteerd): kleur `var(--n900)`, achtergrond `var(--p100)`
- Geselecteerd (`.tp-selected`): achtergrond `var(--n0)`, `border-top: 1px solid var(--n500)`, `border-bottom: 1px solid var(--n500)`, kleur `var(--n1000)`

**Footer (`.tp-footer`):**
- Display: `flex`, gap `8px`
- Beide knoppen: `flex: 1`, `12px / 600`, `border-radius: var(--r-s)`, padding `8px 12px`
- Annuleren: `border: 1px solid var(--n400)`, achtergrond `var(--n0)`, kleur `var(--n900)`; hover: `border-color: var(--p500)`
- OK: achtergrond `var(--p500)`, kleur `var(--n0)`, geen border; hover: achtergrond `var(--p600)`

### Gedrag

- Bij mount en prop-wijziging: scroll uren- en minutenkolom zodat geselecteerde rij in beeld is (offset: `(index - 2) × 36px`)
- "Nu"-knop: vult huidige systeemtijd in
- `@apply` emit bij OK-klik met geselecteerde `"HH:mm"` waarde
- `@cancel` emit bij Annuleren-klik (geen wijziging)
