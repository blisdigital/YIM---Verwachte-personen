# CompliancePill

Atomic pill-component dat één compliance-item toont (dossier óf e-learning) met kleurcodering en hover-tooltip. Wordt hergebruikt in zowel de tabel (via `ComplianceCell`) als het detail panel.

**Figma:** nog te definiëren  
**Versie:** 0.1  
**Datum:** mei 2026

---

## Gebruik

```vue
<CompliancePill type="dossier" status="onvolledig" :reasons="['Dossier niet compleet', 'Dossier afgekeurd']" />
<CompliancePill type="elearning" status="niet-behaald" reason="verlopen" />
<CompliancePill type="elearning" status="behaald" />
```

---

## Props

| Prop | Type | Default | Beschrijving |
|------|------|---------|--------------|
| `type` | `'dossier' \| 'elearning'` | — | Welk compliance-item |
| `status` | `string` | — | Status waarde (zie kleurmapping) |
| `reasons` | `string[] \| null` | `null` | Tooltip-regels bij onvolledig dossier |
| `reason` | `'niet-afgerond' \| 'verlopen' \| 'op-locatie' \| null` | `null` | Reden bij e-learning niet-behaald |

---

## Kleurmapping

Achtergrond altijd `--p100`, tekstkleur `--n900`. Icoonkleur varieert per staat:

| Type | Status | Pill | Icoonkleur |
|------|--------|------|------------|
| `dossier` | `compleet` | `✓ Dossier` | `--ok` (groen) |
| `dossier` | `onvolledig` | `▲ Dossier` | `--err` (oranje) |
| `elearning` | `behaald` | `✓ E-learning` | `--ok` (groen) |
| `elearning` | `niet-behaald` | `▲ E-learning` | `--err` (oranje) |

---

## Tooltip logica

Tooltip toont alleen bij probleem (oranje pill). Groene pills hebben **geen tooltip**.

Tooltip is inline geïmplementeerd in `CompliancePill.vue` via `<Teleport to="body">` — gedrag conform [Tooltip.md](Tooltip.md).

**Dossier (`onvolledig`):**

Tooltip toont redenen uit `reasons[]`, elke reden op eigen regel.

| Reden | Situatie |
|-------|---------|
| `"Dossier niet compleet"` | Dossier niet volledig ingevuld |
| `"Dossier afgekeurd"` | Dossier afgekeurd door beoordelaar |
| `"Dossier geblokkeerd"` | Dossier geblokkeerd |

**E-learning (`niet-behaald`):**

| `reason` | Tooltiptekst |
|----------|-------------|
| `"verlopen"` | "E-learning is verlopen" |
| `"niet-afgerond"` | "E-learning verplicht, nog niet afgerond" |
| `"op-locatie"` | "E-learning moet op locatie gehaald worden" |
| `null` | "E-learning niet behaald" |

---

## Gebruik in tabel (ComplianceCell)

`ComplianceCell.vue` is een dunne wrapper die bepaalt welke pills in een tabelcel verschijnen. Props:

| Prop | Type | Beschrijving |
|------|------|--------------|
| `dossier` | `'compleet' \| 'onvolledig'` | Dossier status |
| `dossierMissing` | `string[] \| null` | Redenen voor onvolledigheid |
| `elearning` | `'behaald' \| 'niet-behaald' \| 'niet-vereist'` | E-learning status |
| `elearningReason` | `'niet-afgerond' \| 'verlopen' \| null` | Reden bij niet-behaald |

Render logica:

```text
altijd:     <CompliancePill type="dossier" :status="dossier" :reasons="dossierMissing" />

als elearning !== 'niet-vereist':
            <CompliancePill type="elearning" :status="elearning" :reason="elearningReason" />

als elearning === 'niet-vereist':
            (niet gerenderd)
```
