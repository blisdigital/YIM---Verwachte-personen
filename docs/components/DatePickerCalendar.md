# DatePickerCalendar

Volledig custom kalender-component in YIM-huisstijl. Drie views: **Days** (maandgrid 7×5), **Month** (maandkeuze 4×3), **Year** (decadeoverzicht 4×3). Wordt inline getoond binnen `DatePopover` wanneer de gebruiker op het datumveld klikt.

```vue
<DatePickerCalendar
  :model-value="isoDate"
  @update:model-value="onDateSelected"
/>
```

| Prop | Type | Default | Beschrijving |
|------|------|---------|--------------|
| `modelValue` | `string` | `''` | Geselecteerde datum (ISO `YYYY-MM-DD`) |

**Event:** `@update:modelValue` — Geeft ISO-datum terug bij dagklik; signaleert de parent om de kalender te sluiten.

---

## Structuur

```
┌─────────────────────────────────────────┐
│ [April 2026]          [‹] [Vandaag] [›] │  ← Nav-rij
│  Ma  Di  Wo  Do  Vr  Za  Zo            │  ← Dag-bar (alleen Days view)
│           1   2   3   4   5            │
│  6   7   8   9  10  11  12            │
│  ...                                   │
│ 28  29  30                             │
└─────────────────────────────────────────┘
```

### Nav-rij

| Element | Stijl | Label per view |
|---------|-------|----------------|
| Label-knop (links) | Outlined (`--n400`), `12px/600`, `--n900` | Days: "April 2026" · Month: "2026" · Year: "2020 – 2029" |
| `‹` | Ghost icon-knop, 16px chevron-left, linker segment | Vorige maand / jaar / decade |
| `Vandaag` | Ghost knop `12px/600`, middensegment | Reset naar Days view op vandaag |
| `›` | Ghost icon-knop, 16px chevron-right, rechter segment | Volgende maand / jaar / decade |

`‹` en `›` krijgen `color: --n300` (IconButton ghost disabled) indien de periode niet beschikbaar is.

### Dag-bar (Days view)

Vaste rij weekdaglabels boven het grid: `Ma Di Wo Do Vr Za Zo`. Cel: 32px breed, Body S / `--n700`. Eerste kolom = maandag.

### Grid-configs

| View | Kolommen | Rijen |
|------|----------|-------|
| Days | 7 × 32px | 5 rijen van 32px |
| Month | 4 × `1fr` | 3 rijen van 32px |
| Year | 4 × `1fr` | 3 rijen van 32px |

---

## Navigatielogica

| Actie | Resultaat |
|-------|-----------|
| Klik label-knop | Één niveau omhoog: Days → Month → Year (Year heeft geen hoger niveau) |
| Klik cel | Één niveau omlaag (Month → Days, Year → Month), of: datum selecteren + sluiten (Days) |
| `‹` / `›` | Vorige / volgende periode in huidige view |
| "Vandaag" | Altijd terug naar Days view op de huidige maand |

---

## Design Tokens

### Container

| Eigenschap | Waarde |
|------------|--------|
| Breedte | `272px` (vaste breedte) |
| Padding | `var(--sp-m)` (12px) |
| Gap | `var(--sp-s)` (8px) |
| Border-radius | `var(--r-s)` (4px) |
| Box-shadow | `var(--shadow-m)` |

### Cel-states

| State | Achtergrond | Tekst | Typografie | Toelichting |
|-------|-------------|-------|------------|-------------|
| Enabled | — | `--n900` | Body S — 400, 12px/16px | Klikbare dag/maand/jaar |
| Disabled | — | `--n500` | Body S | Niet gebruikt — alle dagen zijn klikbaar (historische data raadpleegbaar) |
| Current | — | `--p500` | Label S — 600, 12px/16px, ls 0.12px | Vandaag / huidige maand / huidig jaar |
| Hover | `--p50` (`#f0f7f8`) | — | — | Niet-geselecteerde cel |
| Selected | `--p500` | `--n0` | Label S | Gekozen door gebruiker |

**Regel:** Selected wint van Current — als vandaag geselecteerd is, krijgt de cel de Selected-stijl.

**Cel-afmetingen:** `32px × 32px`, `border-radius: var(--r-xl)` (360px), `padding: var(--sp-s)`.

### Token-referentie

| Token | Waarde | Gebruik in dit component |
|-------|--------|--------------------------|
| `--p500` | `#6daeba` | Current tekst; Selected achtergrond |
| `--p50` | `#f0f7f8` | Hover achtergrond |
| `--n0` | `#ffffff` | Selected tekst |
| `--n500` | `#999a9b` | Disabled tekst |
| `--n700` | `#5d5e5e` | Dag-bar weekdaglabels |
| `--n900` | `#1d1e1f` | Enabled tekst; nav-knoppen |
| `--n400` | `#b8babb` | Label-knop border |
| `--sp-m` | `12px` | Container padding |
| `--sp-s` | `8px` | Container gap; cel padding |
| `--r-s` | `4px` | Container border-radius |
| `--r-xl` | `360px` | Cel border-radius |
| `--shadow-m` | `0 4px 16px -2px rgba(17,19,19,.16)` | Container schaduw |
