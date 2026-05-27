# ComplianceCell

Tabelcel-component dat de compliance-status van een persoon toont als een horizontale rij van `CompliancePill` componenten: een voor dossier en (optioneel) een voor e-learning. Wordt gebruikt in de DataTable kolom "Compliance".

**Figma:** nog te definieren

## Gebruik

```vue
<ComplianceCell
  dossier="compleet"
  :dossier-missing="null"
  elearning="behaald"
/>

<ComplianceCell
  dossier="onvolledig"
  :dossier-missing="['ID bewijs', 'VOG']"
  elearning="niet-behaald"
  elearning-reason="niet-afgerond"
/>
```

## Props

| Prop | Type | Default | Beschrijving |
| --- | --- | --- | --- |
| `dossier` | `String` | *(required)* | Dossierstatus: `'compleet'` of `'onvolledig'` |
| `dossierMissing` | `Array` | `null` | Array van ontbrekende dossier-items (getoond in tooltip van de dossier-pill) |
| `elearning` | `String` | *(required)* | E-learning status: `'behaald'`, `'niet-behaald'` of `'niet-vereist'` |
| `elearningReason` | `String` | `null` | Reden voor niet-behaalde e-learning: `'niet-afgerond'` of `'verlopen'` (getoond in tooltip) |

## Events

Geen eigen events. Interactie (tooltips) wordt afgehandeld door de child `CompliancePill` componenten.

## Relatie met CompliancePill en Tooltip

ComplianceCell is een dunne layout-wrapper die twee `CompliancePill` instanties naast elkaar plaatst:

1. **Dossier pill** -- altijd getoond. Ontvangt `type="dossier"`, `status` (dossier prop) en `reasons` (dossierMissing prop).
2. **E-learning pill** -- alleen getoond als `elearning !== 'niet-vereist'`. Ontvangt `type="elearning"`, `status` (elearning prop) en `reason` (elearningReason prop).

Elke `CompliancePill` heeft een eigen inline tooltip (gepositioneerd via Teleport):
- **Dossier compleet:** tooltip "Dossier volledig"
- **Dossier onvolledig:** tooltip met lijst van ontbrekende items ("Dossier onvolledig: [item]")
- **E-learning behaald:** tooltip "E-learning voltooid"
- **E-learning niet-behaald:** tooltip afhankelijk van `reason` ("E-learning verplicht, nog niet afgerond" / "E-learning verlopen" / "E-learning niet behaald")

## Design Tokens

| Element | Token | Waarde |
| --- | --- | --- |
| Cel gap | — | `4px` (hardcoded) |

De visuele styling (kleuren, iconen, border-radius) wordt volledig bepaald door `CompliancePill`. Zie `CompliancePill.md` voor de token-specificatie.

## Gedrag

- Toont de pills horizontaal naast elkaar met 4px gap.
- De cel heeft `overflow: hidden` om te voorkomen dat pills buiten de kolomgrenzen vallen.
- Wanneer `elearning` de waarde `'niet-vereist'` heeft, wordt alleen de dossier-pill getoond.
- Hover over een pill toont een tooltip met detail-informatie (afgehandeld in CompliancePill).
