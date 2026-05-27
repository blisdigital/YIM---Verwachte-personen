# DossierHeader

Headercomponent bovenaan de dossierpagina. Toont een terugknop, de naam van de persoon en metadata zoals persoontype, e-mailadres, telefoonnummer, bedrijf en laatste wijzigingsdatum.

**Figma:** nog te definiëren

## Gebruik

```vue
<DossierHeader :person="selectedPerson" />
```

## Props

| Prop | Type | Default | Beschrijving |
| --- | --- | --- | --- |
| `person` | `Object` | *required* | Het persoonobject. Verwacht minimaal: `naam`, `persoontype`, `emailadres`, `telefoonnummer`, `bedrijf`. |

## Events

Geen events.

## Design Tokens

| Element | Token | Waarde |
| --- | --- | --- |
| Font | `--font` | basis lettertypefamilie |
| Terugknop kleur | `--n800` | donkergrijs tekst |
| Naam kleur | `--n900` | zwart/donkerst grijs |
| Meta primair kleur | `--p500` | teal — persoontype, e-mail, telefoon, bedrijf |
| Meta secundair kleur | `--n500` | grijs — "Laatst bijgewerkt op..." |

## Gedrag

- De **terugknop** toont een `arrow_back` Material Icon met het label "Terug". De knop heeft momenteel `cursor: default` (nog geen navigatielogica).
- De **personalia** sectie toont:
  - De naam als `<h1>` (32px, bold).
  - Een primaire metaregel met `persoontype`, optioneel gevolgd door `emailadres`, `telefoonnummer` en `bedrijf`, gescheiden door ` • `.
  - Een secundaire metaregel met een statische tekst "Laatst bijgewerkt op ..." (momenteel hardcoded).
- Er is 40px padding onder de personalia voor visuele ruimte richting de tabs.
