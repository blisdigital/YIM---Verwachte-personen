# UI Components (Atomics)

## BaseButton

Zie [BaseButton.md](BaseButton.md) voor de volledige componentdocumentatie inclusief design tokens en states.

---

## StatusBadge

Toont de status van een persoon met kleurcodering.

```vue
<StatusBadge status="Verwacht" />
<StatusBadge status="Aangekomen" />
```

| Prop | Type | Default | Beschrijving |
| --- | --- | --- | --- |
| `status` | `'Verwacht' \| 'Aangekomen' \| 'Vertrokken' \| 'No-show' \| 'Geannuleerd'` | — | Status waarde |

**Visuele specs:**
- `border-radius: 4px`, `padding: 2px 8px`, `font-size: 12px`, `line-height: 16px`, `min-width: 90px`
- Tekst gecentreerd, `font-weight: 600`

**Kleurmapping:**
- Verwacht → Blauw (`#e9f0f8` / `#2464bb`)
- Aangekomen → Groen (`#e9f8f3` / `#24bb86`)
- Vertrokken → Grijs (`--n100` / `--n700`)
- No-show → Oranje (`--warn-bg` / `--warn`)
- Geannuleerd → Rood (`--err-bg` / `--err`)

---

## PassStatusDot

Toont de passtatus als gekleurde stip met label.

```vue
<PassStatusDot status="niet-gekoppeld" />
<PassStatusDot status="gekoppeld" />
<PassStatusDot status="geprint" />
```

| Prop | Type | Default | Beschrijving |
| --- | --- | --- | --- |
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
| --- | --- | --- | --- |
| `type` | `'dossier' \| 'elearning'` | — | Welk compliance-item |
| `status` | `string` | — | Status waarde (zie hieronder) |
| `reasons` | `string[] \| null` | `null` | Redenen bij onvolledig dossier |
| `reason` | `string \| null` | `null` | Reden bij e-learning niet-behaald |

### Visueel

| Type | Status | Pill | Kleur |
| --- | --- | --- | --- |
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
| --- | --- | --- | --- |
| `dossier` | `'compleet' \| 'onvolledig'` | — | Dossier status |
| `dossierMissing` | `string[] \| null` | `null` | Redenen voor onvolledigheid |
| `elearning` | `'behaald' \| 'niet-behaald' \| 'niet-vereist'` | — | E-learning status |
| `elearningReason` | `'niet-afgerond' \| 'verlopen' \| null` | `null` | Reden bij niet-behaald |

### Render logica

```text
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

> **Niet geïmplementeerd als zelfstandige component.** Dropdowns in dit prototype zijn ingebouwd in de componenten die ze gebruiken (ActionMenu, FilterChip, PageHeader), elk via `<Teleport to="body">` met `position: fixed`. Bij een productie-implementatie zou dit een herbruikbare `<Dropdown>` component worden.

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
| --- | --- | --- | --- |
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
| --- | --- | --- |
| `isoDate` | `string` | Geselecteerde datum in ISO-formaat (`YYYY-MM-DD`) |
| `preset` | `string \| null` | Actieve preset (`vandaag`, `morgen`, `week`) |

| Event | Payload | Beschrijving |
| --- | --- | --- |
| `update:isoDate` | `string` | Nieuwe ISO-datum |
| `update:preset` | `string \| null` | Nieuwe preset |
| `apply` | — | Gebruiker klikt "Toepassen" |
| `reset` | — | Gebruiker klikt "Resetten" |

**Structuur:**

- Titel "Filter" — H5, `--p700`
- Label "Kies datum" — Label M, `--p700`
- Datumveld: styled wrapper (tekst links, kalender-icoon rechts); klikken toggelt `DatePickerCalendar`
- `DatePickerCalendar` (inline, conditioneel) — zie [DatePickerCalendar.md](DatePickerCalendar.md)
- Label "Selecteer" — Label M, `--p700`
- Preset-chips: Vandaag / Morgen / Deze week
- Divider
- Footer: Resetten (outlined) + Toepassen (filled), beide `flex: 1`

**Breedte:** `272px` (vaste breedte, box-sizing: border-box)

### Design Tokens

**Container:** `padding: var(--sp-l)` (16px), `gap: var(--sp-s)` (8px), `border-radius: var(--r-s)` (4px), `box-shadow: var(--shadow-m)`.

| Element | Eigenschap | Waarde |
| --- | --- | --- |
| Titel "Filter" | Typografie | H5 — Nunito Bold, 18px/24px |
| Titel "Filter" | Kleur | `--p700` |
| Labels ("Kies datum", "Selecteer") | Typografie | Label M — 600, 14px/20px, ls 0.14px |
| Labels | Kleur | `--p700` |
| Datumveld wrapper | Border | `1px solid --n400` |
| Datumveld wrapper | Border-radius | `var(--r-s)` (4px) |
| Datumveld input | Typografie | Body M — 400, 14px/20px |
| Datumveld input | Kleur | `--n900` |
| Datumveld input | Padding | `var(--sp-s)` (8px) |
| Kalender-icoon trigger | Achtergrond | `--n50` |
| Kalender-icoon trigger | Icongrootte | 24px, kleur `--n900` |
| Preset-chips | Padding | `var(--sp-xs) var(--sp-s)` (4px 8px) |
| Preset-chips | Border-radius | `var(--r-s)` (4px) |
| Divider | Kleur | `--n300`, 1px hoog |
| Toolbar | Gap | `var(--sp-s)` (8px) |
| Toolbar-knoppen | Padding | `var(--sp-s) var(--sp-m)` (8px 12px) |
| Toolbar-knoppen | Border-radius | `var(--r-s)` (4px) |
| Toolbar-knoppen | Flex | `flex: 1` (gelijke breedte) |

**Preset-chip states:**

| State | Achtergrond | Border | Tekst | Typografie |
| --- | --- | --- | --- | --- |
| Actief | `--p50` | `1px solid --p700` | `--p700` | Label M |
| Inactief | `--n0` | `1px solid --n500` | `--n800` | Label M |

**Toolbar-knop states:**

| Knop | Achtergrond | Border | Tekst | Typografie |
| --- | --- | --- | --- | --- |
| Resetten | `--n0` | `1px solid --n400` | `--n900` | Label S — 600, 12px/16px, ls 0.12px |
| Toepassen | `--p500` | — | `--n0` | Label S |

---

## DatePickerCalendar

Zie [DatePickerCalendar.md](DatePickerCalendar.md) voor de volledige specificatie (drie views, nav-logica, cel-states, tokens).

---

## Toast

Notificatie toast (wordt beheerd via `useToast` composable en gerenderd in `ToastContainer`).

```javascript
const { show, dismiss } = useToast()
show('ok', 'Ingecheckt', 'Sophie van der Berg is succesvol ingecheckt')
show('err', 'Fout', 'Actie kon niet worden uitgevoerd')
```

**useToast API:**

| Functie | Signature | Beschrijving |
| --- | --- | --- |
| `show` | `(type, title, message?)` | Toont een toast; verdwijnt automatisch na 4 seconden |
| `dismiss` | `(id)` | Sluit een specifieke toast direct |

**Type enum:** `'ok' | 'err' | 'warn' | 'info'`

| Type | Kleur | Icon |
| --- | --- | --- |
| `ok` | Groen | `check_circle` |
| `err` | Rood | `error` |
| `warn` | Oranje | `warning` |
| `info` | Blauw | `info` |

**Implementatiedetails:**
- `toasts` ref is module-level (buiten de functie) — gedeeld singleton over alle componenten
- Auto-dismiss via `setTimeout` van 4000ms (niet configureerbaar)
- `ToastContainer` gebruikt `<Teleport to="body">` + `<TransitionGroup name="toast-list">`
