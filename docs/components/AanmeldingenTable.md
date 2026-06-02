# AanmeldingenTable

Tabel die alle aanmeldingen van een persoon toont binnen de dossierpagina. Elke rij bevat type aanmelding, locaties, datum/tijd, dossier- en autorisatieresultaat, status en een actiemenu.

## Relaties
- **Gebruikt door:** DossierView
- **Gebruikt:** — (geen child-componenten)

## Gebruik

```vue
<AanmeldingenTable
  :aanmeldingen="aanmeldingenData"
  @action="handleAction"
/>
```

## Props

| Prop | Type | Default | Beschrijving |
|------|------|---------|-------------|
| `aanmeldingen` | `Array` | `[]` | Array van aanmeldingobjecten: `id`, `typeAanmelding`, `locaties`, `aankomstdatum`, `aankomsttijd`, `resultaatDossier`, `resultaatAutorisatie`, `status`. |

## Events

| Event | Payload | Beschrijving |
|-------|---------|-------------|
| `action` | `{ row, action }` | `action`: `'bezoek-wijzigen'` of `'aanmelding-annuleren'`. |

## Gedrag

- Horizontale scroll (`overflow-x: auto`) bij brede kolommen
- Actiemenu opent als floating dropdown via `<Teleport to="body">`
- Click-away sluit het menu
- Status kleuren: Afgehandeld `--ok`, In behandeling `--warn`, Geannuleerd `--err`, Overig `--n400`

## Design Tokens

| Element | Token | Waarde |
|---------|-------|--------|
| Tabel border | `--p100` | 1px solid rand |
| Header achtergrond | `--p700` | donker teal |
| Header tekstkleur | `--n0` | wit |
| Rij achtergrond | `--p50` | licht teal |
| Rij tekstkleur | `--p800` | donker teal |
| Actie-knop border | `--p500` | 2px solid |
| Dropdown achtergrond | `--n0` | wit |
| Dropdown schaduw | `--shadow-m` | medium elevatie |
| Dropdown item kleur | `--p700` | teal |
| Danger item kleur | `--err` | rood |
