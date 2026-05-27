# ProcessNav

Verticale zijbalk-navigatie voor multi-step processen. Toont een terug-knop, procestitel en genummerde stappenlijst. Herbruikbaar voor meerdere processen (bijv. "Credential koppelen", "Credential printen").

**Figma bron:** `LuyFTR1cgQe3mT6TAGvzVV`, node `208:86431` ("Menu").

---

## Props

| Naam | Type | Default | Beschrijving |
|---|---|---|---|
| `title` | `String` | required | Procestitel, getoond als H3 (bijv. "Credential koppelen") |
| `steps` | `Array` | required | Lijst van stap-objecten: `{ id, label, state }` |

**Step object:**

| Veld | Type | Waarden | Beschrijving |
|---|---|---|---|
| `id` | `String` | — | Unieke identifier |
| `label` | `String` | — | Stapnaam (bijv. "Credential koppelen") |
| `state` | `String` | `'active'` \| `'inactive'` \| `'completed'` | Visuele toestand van de stap |

## Events

| Naam | Payload | Beschrijving |
|---|---|---|
| `back` | — | Terug-knop geklikt; navigeer naar de hoofdpagina |

## Design Tokens

| Token | Element | State |
|---|---|---|
| `--p700` | Sidebar achtergrond | — |
| `--p500` | Stap-item achtergrond | active |
| `--p900` | Badge achtergrond | active |
| `--p50` | Badge tekst (active) / Badge achtergrond (inactive/completed) | — |
| `--n0` | Terug-knop, titel, stap-label | — |
| `--r-s` | Stap-item border-radius | — |
| `--r-xl` | Badge border-radius (volledig rond) | — |
| `--sp-xs` | Gap knop → titel | — |
| `--sp-s` | Stap padding-y | — |
| `--sp-m` | Gap badge → label; steps-lijst padding-x | — |
| `--sp-l` | Stap padding-x | — |
| `--sp-xxl` | Top-blok padding-right | — |

## Gebruik

```vue
<!-- Credential koppelen pagina -->
<ProcessNav
  title="Credential koppelen"
  :steps="[{ id: 'koppelen', label: 'Credential koppelen', state: 'active' }]"
  @back="router.push('/verwachte-personen')"
/>

<!-- Credential printen pagina -->
<ProcessNav
  title="Credential printen"
  :steps="[{ id: 'printen', label: 'Credential printen', state: 'active' }]"
  @back="router.push('/verwachte-personen')"
/>

<!-- Multi-step toekomst -->
<ProcessNav
  title="Credential koppelen"
  :steps="[
    { id: 'koppelen', label: 'Credential koppelen', state: 'completed' },
    { id: 'printen',  label: 'Credential printen',  state: 'active' },
  ]"
  @back="router.push('/verwachte-personen')"
/>
```

## Layout & afmetingen

- Breedte: `272 px` (vast)
- Achtergrond: `--p700`
- Padding-top: `var(--sp-xxl)` / `24 px` (component zit in normal flow onder de header)
- Padding-bottom: `40 px`
- Top-blok: `pl: 56 px` · `pr: 24 px` · `py: 8 px`
- Gap knop → titel: `4 px`
- Gap top-blok → stappenlijst: `16 px`
- Stappenlijst: `px: 12 px`, `py: 0`
- Stap-item hoogte: `48 px` · `px: 16 px` · `py: 8 px`
- Badge: `32 × 32 px`, volledig rond

## Decoratieve verticale lijn

Absolute lijn op `left: 43 px`, loopt van top tot bottom van de sidebar. Kleur: `var(--p800)` — subtiele scheiding op `--p700` achtergrond.

## Opmerkingen

- Terug-knop hergebruikt `BaseButton` (ghost) met kleur-override voor donkere achtergrond.
- Stap-items zijn in deze fase **niet klikbaar** — alleen visuele voortgangsindicator.
- `state: 'inactive'` en `'completed'` styling afgeleid; bevestig wanneer Figma-ontwerp beschikbaar is.
