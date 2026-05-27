# DateFilterChip

Chip-knop die een datum-filterpopover opent. Altijd zichtbaar in de filterstrip; toont de actieve preset of een specifieke datum. Rendert de popover via `<Teleport to="body">` met `position: fixed` zodat de overflow van de filterstrip-container het paneel niet afsnijdt.

```vue
<DateFilterChip
  v-model="selectedDate"
  v-model:preset="activePreset"
/>
```

| Prop | Type | Default | Beschrijving |
| --- | --- | --- | --- |
| `modelValue` | `Date` | `new Date()` | Geselecteerde datum |
| `preset` | `'vandaag' \| 'morgen' \| 'week' \| null` | `'vandaag'` | Actieve preset |

**Chip label:** toont actieve preset ("Vandaag", "Morgen", "Deze week") of geformatteerde datum (DD-MM-YYYY). Zonder selectie: "Datum".

**Chip icoon:** `arrow_drop_down` (gesloten) / `arrow_drop_up` (open) — Material Icons caret.

**Positionering:** popover opent rechts-uitgelijnd (`right: document.documentElement.clientWidth - rect.right`) via `position: fixed`. Geclamped zodat de 272px-brede popover nooit buiten het scherm links valt. `z-index: 300`. Positie wordt bijgehouden via een `requestAnimationFrame`-loop zolang de popover open is — hierdoor volgt de popover de knop bij scrollen en layout-wijzigingen zonder lag.

**Events:**

- `@update:modelValue` — Datum gewijzigd
- `@update:preset` — Preset gewijzigd

---

## Chip-states

| State | Achtergrond | Border | Tekst | Typografie |
| --- | --- | --- | --- | --- |
| Actief (preset of datum geselecteerd) | `--p50` | `1px solid --p700` | `--p700` | Label M — 600, 14px/20px, ls 0.14px |
| Inactief (geen selectie) | `--n0` | `1px solid --n50` | `--n800` | Label M |
| Open (popup zichtbaar) | `--p50` | `1px solid --p700` | `--p700` | Label M |

Chip-afmetingen: `padding: var(--sp-xs) var(--sp-s)` (4px 8px), `border-radius: var(--r-s)` (4px).

---

## Popover-inhoud

De popover-inhoud wordt volledig geleverd door `DatePopover`. Zie [DatePopover.md](DatePopover.md) voor de volledige specificatie inclusief tokens.

---

## Componenthiërarchie

```text
DateFilterChip
└── DatePopover                    ← popover-paneel (filter, datumveld, presets, footer)
    └── DatePickerCalendar         ← kalender (opent bij klik op datumveld)
```

Zie [DatePickerCalendar.md](DatePickerCalendar.md) voor de volledige kalenderspecificatie.

---

## Koppeling met kolomfilter

`DateFilterChip` en het kolomfilter `datumVanaf` zijn aan elkaar gekoppeld via `filterStore.datum`. Wijzigen in de chip werkt door in de kolomfilter, en vice versa. Dit is de single source of truth voor het datumfilter. Zie `ARCHITECTURE.md → filterStore` voor de implementatietoelichting.
