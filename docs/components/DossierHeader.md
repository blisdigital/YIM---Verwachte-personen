# DossierHeader

Headercomponent bovenaan de dossierpagina. Toont een terugknop, de naam van de persoon en metadata zoals persoontype, e-mailadres, telefoonnummer, bedrijf en laatste wijzigingsdatum.

## Relaties
- **Gebruikt door:** DossierView
- **Gebruikt:** — (geen child-componenten)

## Gebruik

```vue
<DossierHeader :person="selectedPerson" />
```

## Props

| Prop | Type | Default | Beschrijving |
|------|------|---------|-------------|
| `person` | `Object` | *required* | Verwacht minimaal: `naam`, `persoontype`, `emailadres`, `telefoonnummer`, `bedrijf`. |

## Events

Geen events.

## Gedrag

- **Terugknop** toont `arrow_back` Material Icon met label "Terug" (`cursor: default` — nog geen navigatielogica)
- **Personalia:** Naam als `<h1>` (32px, bold), primaire metaregel (persoontype, email, telefoon, bedrijf gescheiden door ` • `), secundaire metaregel ("Laatst bijgewerkt op ...")
- 40px padding onder personalia richting de tabs

## Design Tokens

| Element | Token | Waarde |
|---------|-------|--------|
| Terugknop kleur | `--n800` | donkergrijs |
| Naam kleur | `--n900` | zwart/donkerst grijs |
| Meta primair kleur | `--p500` | teal |
| Meta secundair kleur | `--n500` | grijs |
