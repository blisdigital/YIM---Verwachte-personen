# Settings Components

## InstellingenMenu

Custom dropdown button in de PageHeader. Geen SplitButton — eigen implementatie. Zie [BaseButton.md](BaseButton.md) voor de button-tokens.

```vue
<BaseButton variant="outlined" size="lg" icon="expand_more" icon-position="right">Instellingen</BaseButton>
```

**HTML-structuur:**

```html
<div class="instellingen-wrap">          <!-- position: relative -->
  <div class="instellingen-backdrop" />  <!-- position: fixed, z-index: 100 -->
  <button class="instellingen-btn" />    <!-- z-index: 101 -->
  <div class="instellingen-menu" />      <!-- z-index: 102 -->
  <KolomInstellingenPanel />
</div>
```

**Menu-opties:**

| Label | Actie |
|-------|-------|
| Kolominstellingen | Opent `KolomInstellingenPanel` |
| Opgeslagen set toepassen | Toont submenu met opgeslagen kolomsets, of neutral toast¹ als er geen zijn |

¹ Neutral toast · trailing close icon · zie [toast-messages-tokens.md](toast-messages-tokens.md)

**Button styling:**

| Eigenschap | Waarde |
|------------|--------|
| Hoogte | `48px` |
| Padding | `12px 12px 12px 24px` |
| Font | `16px / 600` Nunito, letter-spacing `0.16px` |
| Kleur | `var(--n900)` |
| Achtergrond | `var(--n0)` |
| Achtergrond hover | `var(--n50)` |
| Border | `1px solid var(--n400)` |
| Border-radius | `var(--r-s)` |
| Z-index | `101` |
| Caret-icoon | `expand_more`, 24px, `var(--n900)` |

**Dropdown menu:**

| Eigenschap | Waarde |
|------------|--------|
| Breedte | `230px` |
| Padding | `16px 0` |
| Gap tussen items | `8px` |
| Border-radius | `var(--r-s)` (4px) |
| Shadow | `0 4px 16px -2px rgba(17, 19, 19, 0.16)` |
| Z-index | `102` |

**Menu-item styling:**

- Font: `16px / 600` Nunito, letter-spacing `0.16px`, line-height `24px`
- Kleur: `var(--n900)` (default), `var(--p700)` (active/`aria-current="true"`)
- Padding: `4px 16px`
- Hover achtergrond: `var(--n50)`

**Z-index principe:** Alle Instellingen-gerelateerde z-indexen liggen onder de sticky app header (`z-index: 200`), zodat het panel en de dropdown correct onder de header verdwijnen bij scrollen.

---

## KolomInstellingenPanel

Popover panel voor kolomzichtbaarheid. Gerenderd als `position: absolute` relatief aan `.instellingen-wrap`. Opent bij klik op "Kolominstellingen".

```vue
<KolomInstellingenPanel
  :open="showKolomPanel"
  @close="showKolomPanel = false"
/>
```

### Props & Events

| Prop/Event | Type | Beschrijving |
|------------|------|--------------|
| `:open` | `boolean` | Zichtbaarheid |
| `@close` | — | Panel sluiten |

### Kolommenlijst

Kolommen komen uit `columns.json` (single source of truth). Volgorde in het panel = volgorde in de tabel.

**Vergrendeld (altijd zichtbaar, niet uitschakelbaar):**

| Key | Label |
|-----|-------|
| `naam` | Naam persoon |

Wordt weergegeven met 45% opacity en is niet klikbaar.

**Standaard AAN (bij eerste gebruik):**

| Key | Label |
|-----|-------|
| `status` | Status |
| `datumVanaf` | Aankomstdatum |
| `aankomsttijd` | Aankomsttijd |
| `vip` | VIP |
| `persoontype` | Persoonstype |
| `contractortype` | Contractortype |
| `bedrijf` | Bedrijf |
| `passtatus` | Passtatus |
| `compliance` | Compliance |
| `parkeren` | Parkeren |
| `locaties` | Locatie(s) |
| `contactpersoon` | Contactpersoon |
| `bezoekreden` | Bezoekreden |

**Standaard UIT (persoonsinformatie, na Naam persoon):**

| Key | Label |
|-----|-------|
| `personeelsnr` | Personeelsnr |
| `telefoonnummer` | Telefoonnummer |
| `emailadres` | E-mailadres |

### Layout

```
┌─────────────────────────────────────┐  ← 337px breed
│ Selecteer alles               [—]   │  ← sticky, fontweight 600
│ ─────────────────────────────────── │  ← sticky divider
│ Naam persoon                  [✓]   │  ← locked (45% opacity)
│ Personeelsnr                  [ ]   │  ← standaard UIT (persoonsinformatie)
│ Telefoonnummer                [ ]   │
│ E-mailadres                   [ ]   │
│ Status                        [✓]   │
│ Aankomstdatum                 [✓]   │
│ Aankomsttijd                  [✓]   │  ↑ scrollable
│ VIP                           [✓]   │
│ Persoonstype                  [✓]   │
│ ...                                 │
│ Bezoekreden                   [✓]   │  ↓
│ ─────────────────────────────────── │
│ Reset standaard  [Set opslaan] [Toepassen] │
└─────────────────────────────────────┘
```

### Visueel Design

**Panel container:**

| Eigenschap | Waarde |
|------------|--------|
| Breedte | `400px` |
| Padding | `8px 0` |
| Achtergrond | `var(--n0)` |
| Border-radius | `var(--r-s)` (4px) |
| Shadow | `0 4px 16px -2px rgba(17, 19, 19, 0.16)` |
| Z-index | `102` |
| Overflow | `hidden` |

**Scrollbare kolomlijst (`.col-list`):**

| Eigenschap | Waarde |
|------------|--------|
| Max hoogte | `240px` |
| Overflow-y | `auto` |
| Scrollbar breedte | `16px` track, `8px` thumb |
| Scrollbar kleur | thumb `var(--p700)`, track `var(--n50)`, `Corner-m` (8px) |

Bevat: sticky "Selecteer alles" + divider, vergrendelde "Naam persoon" rij, en alle configureerbare kolomrijen.

**"Selecteer alles" (sticky header):**

| Eigenschap | Waarde |
|------------|--------|
| Positie | `sticky; top: 0` binnen `.col-list` |
| Achtergrond | `var(--n50)` |
| Min-hoogte | `44px` |
| Padding | `4px 16px` (`py-xs px-l`) |
| Font | `14px / 600` Nunito |
| Z-index | `1` (binnen scroll container) |

**Kolom-rijen:**

| Eigenschap | Waarde |
|------------|--------|
| Min-hoogte | `40px` |
| Padding | `0 16px` |
| Font label | `14px / 600` Nunito SemiBold, `var(--n900)` |
| Hover achtergrond | `var(--p50)` |
| Cursor | `pointer` |

**Vergrendelde rij (naam persoon):**
- Zelfde als kolom-rij maar `cursor: default`, `opacity: 0.45`, geen hover-effect

**Checkbox icons (Material Icons Round):**

| State | Icon | Kleur |
|-------|------|-------|
| Gecheckt | `check_box` | `var(--p500)` |
| Niet gecheckt | `check_box_outline_blank` | `var(--n400)` |
| Indeterminate | `indeterminate_check_box` | `var(--p500)` |
| Vergrendeld | `check_box` | `var(--p500)` |

Alle checkbox icons: `font-size: 20px`.

**Footer knoppen:**

| Button | Positie | Hoogte | Font | Variant |
|--------|---------|--------|------|---------|
| Reset standaard | Links | `32px` | `12px / 600` | Ghost |
| Set opslaan | Rechts (gegroepeerd) | `32px` | `12px / 600` | Outlined |
| Toepassen | Rechts (gegroepeerd) | `32px` | `12px / 600` | Filled (p500) |

Footer padding: `8px 16px` (`py-0 px-l`). "Reset standaard" staat links, "Set opslaan" + "Toepassen" worden naar rechts geduwd via `margin-left: auto` op "Set opslaan".

### State Management (columnStore)

```js
// src/stores/columnStore.js
const LOCKED_COLUMNS = ['naam']          // altijd zichtbaar
const DEFAULT_VISIBLE = [
  'naam',
  'status', 'datumVanaf', 'aankomsttijd',
  'vip', 'persoontype', 'contractortype', 'bedrijf',
  'passtatus', 'compliance', 'parkeren',
  'locaties', 'contactpersoon', 'bezoekreden',
  // 'personeelsnr', 'telefoonnummer', 'emailadres' — standaard UIT
]

// Store exposeert:
// visibleColumns: ref<string[]>
// savedSets: ref<ColumnSet[]>  (localStorage: 'yim-column-sets')
// DEFAULT_VISIBLE, LOCKED_COLUMNS
// applyColumns(keys), saveSet(name), applySet(set), resetToDefault()
```

`applyColumns` en `applySet` voegen `LOCKED_COLUMNS` altijd toe, ook als ze niet in de meegegeven keys staan.

### Gedrag

- Panel sluit bij: klik op "Toepassen", klik buiten het panel
- Wijzigingen zijn lokaal totdat "Toepassen" wordt geklikt
- Minimum: minstens 1 niet-vergrendelde kolom moet geselecteerd blijven
- "Naam persoon" is altijd geselecteerd en niet togglebaar
- "Set opslaan" opent een inline tekstveld in de footer (vervangt de drie knoppen tijdelijk)
- "Opgeslagen set toepassen" in het InstellingenMenu toont een neutral toast (trailing close icon) als er geen sets zijn — zie [toast-messages-tokens.md](toast-messages-tokens.md)
