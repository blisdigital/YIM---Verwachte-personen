# ProcessNav

Verticale zijbalk-navigatie voor multi-step processen. Toont procestitel en genummerde stappenlijst. Herbruikbaar voor meerdere processen (bijv. "Credential koppelen", "Credential printen").

**Figma:** `LuyFTR1cgQe3mT6TAGvzVV` · node-id: `208:86431`

## Relaties
- **Gebruikt door:** — *(nog niet gebruikt in views)*
- **Gebruikt:** — *(geen child-componenten)*

## Gebruik

```vue
<ProcessNav
  title="Credential koppelen"
  :steps="[
    { id: 'koppelen', label: 'Credential koppelen', state: 'completed' },
    { id: 'printen',  label: 'Credential printen',  state: 'active' },
  ]"
  @back="router.push('/verwachte-personen')"
/>
```

## Props

| Prop | Type | Default | Beschrijving |
|------|------|---------|-------------|
| `title` | `String` | required | Procestitel (bijv. "Credential koppelen") |
| `steps` | `Array` | required | Lijst van stap-objecten: `{ id, label, state }` |

### Step object

| Veld | Type | Waarden | Beschrijving |
|------|------|---------|-------------|
| `id` | `String` | — | Unieke identifier |
| `label` | `String` | — | Stapnaam |
| `state` | `String` | `'active'` \| `'inactive'` \| `'completed'` | Visuele toestand |

## Events

| Event | Payload | Beschrijving |
|-------|---------|-------------|
| `back` | — | Terug-knop geklikt; navigeer naar hoofdpagina |

## Gedrag

- Breedte: `272px` (vast), achtergrond `--p700`.
- Decoratieve verticale lijn op `left: 43px`, kleur `var(--p800)`.
- Stap-items zijn **niet klikbaar** — alleen visuele voortgangsindicator.
- Badge: `32x32 px`, volledig rond. Active: `--p900` bg, `--p50` tekst. Inactive/completed: `--p50` bg, `--p900` tekst.
- `state: 'inactive'` en `'completed'` styling afgeleid; bevestig wanneer Figma-ontwerp beschikbaar is.

## Design Tokens

| Element | Token | Waarde |
|---------|-------|--------|
| Sidebar achtergrond | `--p700` | — |
| Stap-item achtergrond (active) | `--p500` | — |
| Badge achtergrond (active) | `--p900` | — |
| Badge tekst (active) / badge bg (inactive) | `--p50` | — |
| Terug-knop, titel, stap-label | `--n0` | — |
| Stap-item border-radius | `--r-s` | — |
| Badge border-radius | `--r-xl` | volledig rond |
| Gap knop naar titel | `--sp-xs` | — |
| Stap padding-y | `--sp-s` | — |
| Gap badge naar label; steps padding-x | `--sp-m` | — |
| Stap padding-x | `--sp-l` | — |
| Top-blok padding-right | `--sp-xxl` | — |
| Decoratieve lijn | `--p800` | — |
