# UI Components (Atomics)

## BaseButton

Generieke button met varianten.

```vue
<BaseButton variant="primary" icon="add">Nieuwe registratie</BaseButton>
<BaseButton variant="outlined" size="sm">Annuleren</BaseButton>
<BaseButton variant="ghost" danger>Verwijderen</BaseButton>
```

| Prop | Type | Default | Beschrijving |
|------|------|---------|--------------|
| `variant` | `'primary' \| 'outlined' \| 'ghost'` | `'primary'` | Visuele stijl |
| `size` | `'sm' \| 'md'` | `'md'` | Grootte |
| `icon` | `string` | — | Material icon naam (optioneel) |
| `iconPosition` | `'left' \| 'right'` | `'left'` | Icon positie |
| `disabled` | `boolean` | `false` | Disabled state |
| `loading` | `boolean` | `false` | Loading state |
| `danger` | `boolean` | `false` | Rode/destructieve stijl |

**Events:** `@click`

---

## StatusBadge

Toont de status van een persoon met kleurcodering.

```vue
<StatusBadge status="Verwacht" />
<StatusBadge status="Aangekomen" />
```

| Prop | Type | Default | Beschrijving |
|------|------|---------|--------------|
| `status` | `'Verwacht' \| 'Aangekomen' \| 'Vertrokken' \| 'No-show' \| 'Geannuleerd'` | — | Status waarde |

**Visuele specs:**
- `border-radius: 4px`, `padding: 2px 8px`, `font-size: 12px`, `line-height: 20px`, `min-width: 90px`
- Tekst gecentreerd, `font-weight: 500`

**Kleurmapping:**
- Verwacht → Blauw (`#e9f0f8` / `#2464bb`)
- Aangekomen → Groen (`#e9f8f3` / `#24bb86`)
- Vertrokken → Grijs (`--n100` / `--n700`)
- No-show → Oranje (`#f8f0e9` / `#bb6424`)
- Geannuleerd → Rood (`#f8e9e9` / `#bb2424`)

---

## PassStatusDot

Toont de passtatus als gekleurde stip met label.

```vue
<PassStatusDot status="niet-gekoppeld" />
<PassStatusDot status="gekoppeld" />
<PassStatusDot status="geprint" />
```

| Prop | Type | Default | Beschrijving |
|------|------|---------|--------------|
| `status` | `'niet-gekoppeld' \| 'gekoppeld' \| 'geprint'` | — | Passtatus waarde |

**Kleurmapping:**
- `niet-gekoppeld` → Grijze stip (`--n400`) + label "Niet gekoppeld"
- `gekoppeld` → Blauwe stip + label "Gekoppeld"
- `geprint` → Groene stip (`--ok`) + label "Geprint"

---

## CompliancePill

Atomic pill-component dat één compliance-item toont (dossier óf e-learning) met kleurcodering en hover-tooltip. Wordt hergebruikt in zowel de tabel (via `ComplianceCell`) als het detail panel.

```vue
<CompliancePill type="dossier" status="onvolledig" :reasons="['VCA certificaat verlopen']" />
<CompliancePill type="elearning" status="niet-behaald" reason="verlopen" />
<CompliancePill type="elearning" status="behaald" />
```

| Prop | Type | Default | Beschrijving |
|------|------|---------|--------------|
| `type` | `'dossier' \| 'elearning'` | — | Welk compliance-item |
| `status` | `string` | — | Status waarde (zie hieronder) |
| `reasons` | `string[] \| null` | `null` | Redenen bij onvolledig dossier |
| `reason` | `string \| null` | `null` | Reden bij e-learning niet-behaald |

### Visueel

| Type | Status | Pill | Kleur |
|------|--------|------|-------|
| `dossier` | `compleet` | `✓ Dossier` | Groen (`--ok` / `--ok-bg`) |
| `dossier` | `onvolledig` | `▲ Dossier` | Oranje (`--warn` / `--warn-bg`) |
| `elearning` | `behaald` | `✓ E-learning` | Groen (`--ok` / `--ok-bg`) |
| `elearning` | `niet-behaald` | `▲ E-learning` | Oranje (`--warn` / `--warn-bg`) |

### Tooltip logica

Elke pill heeft een hover-tooltip met context:

**Dossier:**
- `compleet` → `"Dossier volledig"`
- `onvolledig` → toont de reden(en) uit `reasons[]`:
  - `"Dossier onvolledig: VCA certificaat verlopen"`
  - `"Dossier onvolledig: ID document ontbreekt"`
  - `"Dossier afgekeurd: verzekeringsbewijs ontbreekt"`
  - Meerdere redenen → elke reden op een eigen regel in de tooltip

**E-learning:**
- `behaald` → `"E-learning voltooid"`
- `niet-behaald` → verschilt per situatie (via `reason` prop):
  - `reason="niet-afgerond"` → `"E-learning verplicht, nog niet afgerond"`
  - `reason="verlopen"` → `"E-learning verlopen"`
  - Geen `reason` → `"E-learning niet behaald"`

---

## ComplianceCell

Compositie-component dat nul, één of twee `CompliancePill`s rendert in een tabelcel. Bepaalt *welke* pills getoond worden; `CompliancePill` regelt het *hoe*.

```vue
<ComplianceCell
  :dossier="person.dossier"
  :dossierMissing="person.dossierMissing"
  :elearning="person.elearning"
  :elearningReason="person.elearningReason"
/>
```

| Prop | Type | Default | Beschrijving |
|------|------|---------|--------------|
| `dossier` | `'compleet' \| 'onvolledig'` | — | Dossier status |
| `dossierMissing` | `string[] \| null` | `null` | Redenen voor onvolledigheid |
| `elearning` | `'behaald' \| 'niet-behaald' \| 'niet-vereist'` | — | E-learning status |
| `elearningReason` | `'niet-afgerond' \| 'verlopen' \| null` | `null` | Reden bij niet-behaald |

### Render logica

```
altijd:     <CompliancePill type="dossier" :status="dossier" :reasons="dossierMissing" />

als elearning !== 'niet-vereist':
            <CompliancePill type="elearning" :status="elearning" :reason="elearningReason" />

als elearning === 'niet-vereist':
            (niets — pill niet zichtbaar)
```

### Voorbeeld rendering

```html
<!-- Compleet dossier + behaalde e-learning -->
<CompliancePill type="dossier" status="compleet" />
<CompliancePill type="elearning" status="behaald" />

<!-- Onvolledig dossier + niet-behaalde e-learning (verlopen) -->
<CompliancePill type="dossier" status="onvolledig" :reasons="['VCA certificaat verlopen']" />
<CompliancePill type="elearning" status="niet-behaald" reason="verlopen" />

<!-- Compleet dossier, e-learning niet vereist → alleen dossier-pill -->
<CompliancePill type="dossier" status="compleet" />
```

---

## Dropdown

Generieke dropdown menu component.

```vue
<Dropdown>
  <template #trigger>
    <BaseButton variant="outlined">Opties</BaseButton>
  </template>
  <DropdownItem icon="edit">Bewerken</DropdownItem>
  <DropdownDivider />
  <DropdownItem icon="delete" danger>Verwijderen</DropdownItem>
</Dropdown>
```

| Prop | Type | Default | Beschrijving |
|------|------|---------|--------------|
| `align` | `'left' \| 'right'` | `'left'` | Uitlijning t.o.v. trigger |
| `width` | `string` | `'220px'` | Minimum breedte |

**Slots:**
- `trigger` — Element dat dropdown opent
- `default` — Dropdown content (items)

---

## Modal

Modale dialoog voor bevestigingen en formulieren.

```vue
<Modal v-model:open="showCheckin" title="Inchecken bevestigen">
  <p>Weet je zeker dat je Sophie van der Berg wilt inchecken?</p>
  <template #footer>
    <BaseButton variant="outlined" @click="showCheckin = false">Annuleren</BaseButton>
    <BaseButton @click="confirmCheckin">Inchecken</BaseButton>
  </template>
</Modal>
```

| Prop | Type | Default | Beschrijving |
|------|------|---------|--------------|
| `open` | `boolean` | `false` | Zichtbaarheid (v-model) |
| `title` | `string` | — | Modal titel |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Breedte |

**Slots:**
- `default` — Body content
- `footer` — Actie buttons

---

## DatePopover

Gedeeld popover-paneel voor datumfilters. Gebruikt in `DateFilterChip` (filterstrip) en `ColumnFilters` (kolomfilter). Bevat geen positioneringslogica — de parent is verantwoordelijk voor de plaatsing (via Teleport of absolute positioning).

```vue
<DatePopover
  :iso-date="localDate"
  :preset="localPreset"
  @update:iso-date="localDate = $event"
  @update:preset="localPreset = $event"
  @apply="apply"
  @reset="reset"
/>
```

| Prop | Type | Beschrijving |
|------|------|--------------|
| `isoDate` | `string` | Geselecteerde datum in ISO-formaat (`YYYY-MM-DD`) |
| `preset` | `string \| null` | Actieve preset (`vandaag`, `morgen`, `week`) |

| Event | Payload | Beschrijving |
|-------|---------|--------------|
| `update:isoDate` | `string` | Nieuwe ISO-datum |
| `update:preset` | `string \| null` | Nieuwe preset |
| `apply` | — | Gebruiker klikt "Toepassen" |
| `reset` | — | Gebruiker klikt "Resetten" |

**Structuur:**
- Titel "Filter": `18px / 700`, `--p700`
- Datumveld: styled wrapper (tekst links, kalender-icoon rechts met `--n50` achtergrond); klikken toggelt `DatePickerCalendar`
- `DatePickerCalendar` (inline, conditioneel)
- Preset-chips: rechthoekig (`--r-s`), actief = gevuld `--p500`, inactief = omlijnd `--n500`
- Divider
- Footer: Resetten (outlined) + Toepassen (filled `--p500`), beide `flex: 1`

**Breedte:** `272px` (vaste breedte, box-sizing: border-box)

---

## DatePickerCalendar

Volledig custom kalender-component in YIM-huisstijl. Wordt inline getoond binnen `DatePopover` wanneer de gebruiker op het datumveld klikt.

```vue
<DatePickerCalendar
  :model-value="isoDate"
  @update:model-value="onDateSelected"
/>
```

| Prop | Type | Default | Beschrijving |
|------|------|---------|--------------|
| `modelValue` | `string` | `''` | Geselecteerde datum (ISO `YYYY-MM-DD`) |

**Event:** `@update:modelValue` — Geeft ISO-datum terug bij dagklik; sluit de kalender in de parent.

### Structuur

```
┌─────────────────────────────────────────┐
│ [April 2026]          [‹] [Vandaag] [›] │  ← Nav
│  Ma  Di  Wo  Do  Vr  Za  Zo            │  ← Weekdagen
│           1   2   3   4   5            │
│  6   7   8   9  10  11  12            │
│  ...                                   │
│ 28  29  30                             │
└─────────────────────────────────────────┘
```

### Nav

| Element | Stijl |
|---------|-------|
| Maandknop | Outlined (`--n400`), `12px / 600`, `--n900` |
| `‹` (vorige maand) | Icon-button, linker segment (border links + top + bottom) |
| `Vandaag` | Middensegment (border top + bottom), navigeert view naar huidige maand |
| `›` (volgende maand) | Icon-button, rechter segment (border rechts + top + bottom) |

De drie nav-elementen rechts delen hun randen (geen dubbele border).

### Dagcellen

| State | Achtergrond | Tekst | Gewicht |
|-------|-------------|-------|---------|
| Verleden | — | `--n500` | 400 |
| Toekomst | — | `--n900` | 400 |
| Vandaag | — | `--p500` | 600 |
| Geselecteerd | `--p500` | `--n0` | 600 |
| Hover (niet geselecteerd) | `--p50` | — | — |

- Cel: `border-radius: 360px` (volledig rond), `28px × 28px`
- Font: `12px`, letter-spacing `0.12px`
- Grid: 7 kolommen (`1fr` elk), weekdaglabels als eerste rij

---

## Toast

Notificatie toast (wordt beheerd via `useToast` composable).

```typescript
const { show } = useToast()
show('ok', 'Ingecheckt', 'Sophie van der Berg is succesvol ingecheckt')
```

| Type | Kleur | Icon |
|------|-------|------|
| `ok` | Groen | `check_circle` |
| `err` | Rood | `error` |
| `warn` | Oranje | `warning` |
| `info` | Blauw | `info` |
