# ElearningUitnodigingModal

Pop-up voor het starten van een e-learning voor een persoon met e-learning status `niet-behaald`. Twee-staps flow: eerst keuze maken (activeer op locatie of verstuur per mail), daarna het gekozen scherm.

**Zichtbaarheid:** Alleen beschikbaar in het ActionMenu als `person.elearning === 'niet-behaald'`.

## Props

| Prop | Type | Default | Beschrijving |
|------|------|---------|--------------|
| `open` | `Boolean` | `false` | v-model — zichtbaarheid modal |
| `person` | `Person \| null` | `null` | Persoon waarvoor de e-learning geldt |

## Events

| Event | Payload | Beschrijving |
|-------|---------|--------------|
| `update:open` | `boolean` | Sluit modal |
| `confirm` | `{ person, method: 'locatie' \| 'email' }` | Actie bevestigd |

## Flow

### Stap 1 — Keuze

```
┌──────────────────────────────────────────────┐
│ E-learning code                         [✕]  │
├──────────────────────────────────────────────┤
│                                              │
│  Kies hoe de e-learning gestart wordt        │
│  voor {person.naam}.                         │
│                                              │
│  Methode                                     │
│  ┌──────────────────────────────────────┐    │
│  │ Kies een optie                    ▾  │    │
│  └──────────────────────────────────────┘    │
│                                              │
│  Opties:                                     │
│  - Activeer op locatie                       │
│  - Verstuur een mail                         │
│                                              │
├──────────────────────────────────────────────┤
│                    [Annuleren] [Volgende]     │
└──────────────────────────────────────────────┘
```

- Dropdown via `<CustomSelect>` met twee opties.
- "Volgende" knop (`filled`, `md`) — disabled zolang geen keuze gemaakt.
- "Annuleren" knop (`ghost`) — sluit modal.

### Stap 2a — Activeer op locatie

```
┌──────────────────────────────────────────────┐
│ E-learning code                         [✕]  │
├──────────────────────────────────────────────┤
│                                              │
│  ┌────────────────────────────────────────┐  │
│  │ Naam training     Veiligheidstraining  │  │
│  │ Cursus-code       EL-2024-0847         │  │
│  │ Pincode           482917               │  │
│  └────────────────────────────────────────┘  │
│                                              │
├──────────────────────────────────────────────┤
│  [Terug]              [Sluiten]  [Printen]   │
└──────────────────────────────────────────────┘
```

- Gebruikt `<InfoSection>` zonder title, met `rows` prop voor label/waarde-weergave.
- Rijen: Naam training, Cursus-code, Pincode.
- "Terug" knop (`ghost`, links uitgelijnd via `margin-right: auto`) — terug naar stap 1.
- "Sluiten" knop (`outlined`, `md`) — sluit modal.
- "Printen" knop (`filled`, `md`) — opent printvenster met dezelfde informatie.

### Stap 2b — Verstuur een mail

```
┌──────────────────────────────────────────────┐
│ E-learning code                         [✕]  │
├──────────────────────────────────────────────┤
│                                              │
│  De persoon ontvangt een e-mail met een      │
│  link naar de e-learning module.             │
│                                              │
│  E-mailadres                                 │
│  ┌──────────────────────────────────┬───┐    │
│  │ naam@bedrijf.nl                  │ ✎ │    │
│  └──────────────────────────────────┴───┘    │
│                                              │
│  ● Email bekend → read-only veld met         │
│    potlood-icoon. Klik potlood → wordt       │
│    bewerkbaar InputField.                    │
│  ● Geen email in dossier → direct            │
│    bewerkbaar InputField (leeg).             │
│                                              │
├──────────────────────────────────────────────┤
│  [Terug]           [Verstuur uitnodiging]    │
└──────────────────────────────────────────────┘
```

- E-mailveld: read-only weergave met potlood-icoon als `person.emailadres` bekend. Klik potlood schakelt naar bewerkbaar `<InputField>`. Geen email in dossier → direct bewerkbaar `<InputField>` (leeg).
- "Terug" knop (`ghost`, links uitgelijnd) — terug naar stap 1.
- "Verstuur uitnodiging" knop (`filled`, `md`) — disabled bij leeg e-mailadres. Na klik: emit `confirm` met `method: 'email'`, toon toast "Uitnodiging verstuurd".

## Mock data

Per persoon wordt deterministische data gegenereerd:

```js
function generatePin(personId) {
  const seed = personId * 7919 + 1013
  return String(seed % 1000000).padStart(6, '0')
}

function generateCursusCode(personId) {
  const num = ((personId * 3571 + 847) % 9000) + 1000
  return `EL-2024-${num}`
}
```

Naam training is altijd "Veiligheidstraining" (mock).

## Gedrag

- Modal opent alleen als `person.elearning === 'niet-behaald'`.
- Stap 1: dropdown selectie verplicht voor "Volgende".
- Stap 2a: informatie direct zichtbaar, print opent nieuw venster.
- Stap 2b: e-mailadres read-only met potlood als email bekend; direct editable als geen email. "Verstuur" disabled bij leeg.
- "Terug" gaat altijd terug naar stap 1, behoudt eerder gemaakte keuze. Altijd links uitgelijnd in footer.
- Form reset bij sluiten modal (stap → 1, keuze → null, email → '', emailEditing → false).
- Backdrop sluit modal NIET (ActionPopup gedrag).

## Design Tokens

| Element | Token | Waarde |
|---------|-------|--------|
| InfoSection (stap 2a) | Zie `InfoSection.md` | Standaard InfoSection tokens (zonder title) |
| Pincode waarde | `monospace` font | Visueel onderscheid van overige waarden |
| Read-only email veld | `--n50` | Achtergrond |
| Read-only email tekst | `--n800` | Tekstkleur |
| Potlood-icoon | `--n500` → `--n700` hover | Icoonkleur |
| Potlood-icoon hover | `--n200` | Achtergrond hover |
| Read-only veld radius | `--r-s` | Border-radius |

## Gebruik

```vue
<ElearningUitnodigingModal
  v-model:open="elearningUitnodigingOpen"
  :person="elearningUitnodigingPerson"
  @confirm="handleElearningUitnodigingConfirm"
/>
```
