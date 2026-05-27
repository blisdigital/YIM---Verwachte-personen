# AanmeldingenTable

Tabel die alle aanmeldingen van een persoon toont binnen de dossierpagina. Elke rij bevat type aanmelding, locaties, datum/tijd, dossier- en autorisatieresultaat, status en een actiemenu.

**Figma:** nog te definiëren

## Gebruik

```vue
<AanmeldingenTable
  :aanmeldingen="aanmeldingenData"
  @action="handleAction"
/>
```

## Props

| Prop | Type | Default | Beschrijving |
| --- | --- | --- | --- |
| `aanmeldingen` | `Array` | `[]` | Array van aanmeldingobjecten. Elk object bevat: `id`, `typeAanmelding`, `locaties` (array), `aankomstdatum`, `aankomsttijd`, `resultaatDossier`, `resultaatAutorisatie`, `status`. |

## Events

| Event | Payload | Beschrijving |
| --- | --- | --- |
| `action` | `{ row, action }` | Wordt geemit wanneer een actie gekozen wordt uit het actiemenu. `row` is het volledige aanmeldingobject, `action` is een string (`'bezoek-wijzigen'` of `'aanmelding-annuleren'`). |

## Kolommen

| Kolom | CSS class | Min-breedte | Beschrijving |
| --- | --- | --- | --- |
| Type aanmelding | `col-type` | 200px | Type van de aanmelding |
| Locaties | `col-locaties` | 184px | Aantal locaties met `location_on` icoon |
| Aankomstdatum | `col-datum` | 168px | Datum van aankomst |
| Aankomsttijd | `col-tijd` | 144px | Tijd van aankomst |
| Resultaat dossier | `col-dossier` | 168px | Resultaat van de dossiercheck |
| Resultaat autorisatie | `col-autorisatie` | 200px | Resultaat van de autorisatiecheck |
| Status | `col-status` | 181px | Status met gekleurde dot |
| Acties | `col-acties` | 72px | Actiemenu (niet flex-grow) |

## Status kleuren

| Status | Kleur token |
| --- | --- |
| Afgehandeld | `--ok` |
| In behandeling | `--warn` |
| Geannuleerd | `--err` |
| Overig | `--n400` |

## Actiemenu items

Het actiemenu wordt via `<Teleport to="body">` gerenderd en bevat:

- **Bezoek wijzigen** — standaard actie
- **Aanmelding annuleren** — danger-stijl (rood)

## Design Tokens

| Element | Token | Waarde |
| --- | --- | --- |
| Tabel border-radius | `--r-s` | border-radius van de container |
| Tabel border | `--p100` | 1px solid rand |
| Header achtergrond | `--p700` | donker teal |
| Header border | `--p800` | scheiding tussen kolommen en onderrand |
| Header tekstkleur | `--n0` | wit |
| Rij achtergrond | `--p50` | licht teal |
| Rij border | `--p100` | scheiding tussen rijen |
| Rij tekstkleur | `--p800` | donker teal |
| Locatie icoon | `--p600` | teal icoonkleur |
| Font | `--font` | basis lettertypefamilie |
| Actie-knop border | `--p500` | 2px solid rand |
| Actie-knop hover | `--p100` | hover achtergrond |
| Actie-knop icoonkleur | `--p700` | teal |
| Actie-knop border-radius | `--r-xl` | ronde knop |
| Dropdown achtergrond | `--n0` | wit |
| Dropdown border-radius | `--r-s` | afgeronde hoeken |
| Dropdown schaduw | `--shadow-m` | medium elevatie |
| Dropdown item kleur | `--p700` | teal |
| Dropdown item hover | `--n50` | lichtgrijs |
| Danger item kleur | `--err` | rood |
| Danger item hover | `--err-bg` | licht rood |

## Gedrag

- De tabel ondersteunt horizontale scroll (`overflow-x: auto`) wanneer de kolommen breder zijn dan de container.
- Alle kolommen gebruiken `flex: 1 0 auto` zodat ze mee groeien op brede schermen.
- De actiekolom heeft `flex: 0 0 auto` en groeit niet mee.
- Het actiemenu opent als floating dropdown via `<Teleport to="body">` met fixed positionering.
- Het menu positioneert zich onder de triggering knop; als het buiten het viewport zou vallen, schuift het naar links.
- Klikken buiten het menu sluit het (click-away via document event listener).
- De status dot gebruikt een inline `background` style op basis van de status-waarde.
