# ComplianceCell

Compositie-component dat nul, één of twee `CompliancePill`s rendert in een tabelcel. Bepaalt *welke* pills getoond worden; `CompliancePill` regelt het *hoe*.

**Figma:** nog te definiëren  
**Versie:** 0.1  
**Datum:** mei 2026

---

## Gebruik

```vue
<ComplianceCell
  :dossier="person.dossier"
  :dossierMissing="person.dossierMissing"
  :elearning="person.elearning"
  :elearningReason="person.elearningReason"
/>
```

---

## Props

| Prop | Type | Default | Beschrijving |
|------|------|---------|--------------|
| `dossier` | `'compleet' \| 'onvolledig'` | — | Dossier status |
| `dossierMissing` | `string[] \| null` | `null` | Redenen voor onvolledigheid |
| `elearning` | `'behaald' \| 'niet-behaald' \| 'niet-vereist'` | — | E-learning status |
| `elearningReason` | `'niet-afgerond' \| 'verlopen' \| null` | `null` | Reden bij niet-behaald |

---

## Render logica

```text
altijd:     <CompliancePill type="dossier" :status="dossier" :reasons="dossierMissing" />

als elearning !== 'niet-vereist':
            <CompliancePill type="elearning" :status="elearning" :reason="elearningReason" />

als elearning === 'niet-vereist':
            (niet gerenderd)
```

Zie [CompliancePill.md](CompliancePill.md) voor pill-specifieke documentatie.
