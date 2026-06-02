# ComplianceCell

Tabelcel-component dat de compliance-status van een persoon toont als een horizontale rij van `CompliancePill` componenten. Wordt gebruikt in de DataTable kolom "Compliance".

## Relaties
- **Gebruikt door:** TableRow
- **Gebruikt:** CompliancePill

## Gebruik

```vue
<ComplianceCell
  dossier="onvolledig"
  :dossier-missing="['ID bewijs', 'VOG']"
  elearning="niet-behaald"
  elearning-reason="niet-afgerond"
/>
```

## Props

| Prop | Type | Default | Beschrijving |
|------|------|---------|-------------|
| `dossier` | `String` | *(required)* | Dossierstatus: `'compleet'` of `'onvolledig'` |
| `dossierMissing` | `Array` | `null` | Ontbrekende dossier-items (tooltip van dossier-pill) |
| `elearning` | `String` | *(required)* | E-learning status: `'behaald'`, `'niet-behaald'` of `'niet-vereist'` |
| `elearningReason` | `String` | `null` | Reden voor niet-behaalde e-learning: `'niet-afgerond'` of `'verlopen'` |

## Events

Geen events -- puur presentatiecomponent. Tooltips worden afgehandeld door CompliancePill.

## Gedrag

- Toont pills horizontaal naast elkaar met `4px` gap.
- Cel heeft `overflow: hidden` om te voorkomen dat pills buiten kolomgrenzen vallen.
- Dossier-pill altijd getoond.
- E-learning-pill alleen getoond als `elearning !== 'niet-vereist'`.

## Design Tokens

| Element | Token | Waarde |
|---------|-------|--------|
| Cel gap | -- | `4px` (hardcoded) |

Visuele styling (kleuren, iconen, radius) wordt bepaald door `CompliancePill`. Zie `CompliancePill.md`.
