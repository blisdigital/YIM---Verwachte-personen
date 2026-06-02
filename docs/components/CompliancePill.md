# CompliancePill

Atomic pill-component dat een compliance-item toont (dossier of e-learning) met kleurcodering en hover-tooltip. Wordt gebruikt in de tabel (via `ComplianceCell`) en het detail panel.

## Relaties
- **Gebruikt door:** ComplianceCell
- **Gebruikt:** geen child components (tooltip is inline via `<Teleport>`)

## Gebruik

```vue
<CompliancePill type="dossier" status="onvolledig" :reasons="['Dossier niet compleet']" />
<CompliancePill type="elearning" status="behaald" />
```

## Props

| Prop | Type | Default | Beschrijving |
|------|------|---------|-------------|
| `type` | `'dossier' \| 'elearning'` | -- | Welk compliance-item |
| `status` | `string` | -- | Status waarde (zie kleurmapping) |
| `reasons` | `string[] \| null` | `null` | Tooltip-regels bij onvolledig dossier |
| `reason` | `'niet-afgerond' \| 'verlopen' \| 'op-locatie' \| null` | `null` | Reden bij e-learning niet-behaald |

## Events

Geen events -- puur presentatiecomponent.

## Gedrag

- Achtergrond altijd `--p100`, tekstkleur `--n900`. Icoonkleur varieert per staat.
- Tooltip verschijnt alleen bij probleem (oranje pill). Groene pills hebben geen tooltip.
- Tooltip via `<Teleport to="body">` + `position: fixed` -- conform Tooltip-patroon.

### Kleurmapping

| Type | Status | Pill | Icoonkleur |
|------|--------|------|------------|
| `dossier` | `compleet` | `check_circle Dossier` | `--ok` (groen) |
| `dossier` | `onvolledig` | `warning Dossier` | `--err` (rood) |
| `elearning` | `behaald` | `check_circle E-learning` | `--ok` (groen) |
| `elearning` | `niet-behaald` | `warning E-learning` | `--err` (rood) |

### Tooltip logica

**Dossier (`onvolledig`):** toont redenen uit `reasons[]`, elke reden op eigen regel.

| Reden | Situatie |
|-------|---------|
| `"Dossier niet compleet"` | Dossier niet volledig ingevuld |
| `"Dossier afgekeurd"` | Dossier afgekeurd door beoordelaar |
| `"Dossier geblokkeerd"` | Dossier geblokkeerd |

**E-learning (`niet-behaald`):**

| `reason` | Tooltiptekst |
|----------|-------------|
| `"verlopen"` | "E-learning verlopen" |
| `"niet-afgerond"` | "E-learning verplicht, nog niet afgerond" |
| `"op-locatie"` | "E-learning moet op locatie gehaald worden" |
| `null` | "E-learning niet behaald" |

## Design Tokens

| Element | Token | Waarde |
|---------|-------|--------|
| Pill achtergrond | `--p100` | `#d6e8ec` |
| Pill tekst | `--n900` | `#1d1e1f` |
| Pill gap | `--sp-xs` | `4px` |
| Pill radius | `--r-xl` | `360px` |
| Icoon ok | `--ok` | `#24bb86` |
| Icoon waarschuwing | `--err` | `#bc243b` |
| Tooltip achtergrond | `--n900` | `#1d1e1f` |
| Tooltip tekst | `--n0` | `#ffffff` |
| Tooltip radius | `--r-s` | `4px` |
| Tooltip schaduw | `--shadow-s` | `0px 2px 4px rgba(17,19,19,0.16)` |
