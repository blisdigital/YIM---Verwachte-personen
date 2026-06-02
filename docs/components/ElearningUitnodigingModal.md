# ElearningUitnodigingModal

Pop-up voor het starten van een e-learning voor een persoon met e-learning status `niet-behaald`. Twee-staps flow: eerst keuze maken (activeer op locatie of verstuur per mail), daarna het gekozen scherm.

**Zichtbaarheid:** Alleen beschikbaar in het ActionMenu als `person.elearning === 'niet-behaald'`.

## Relaties
- **Gebruikt door:** VerwachtePersonenView
- **Gebruikt:** ActionPopup, BaseButton, CustomSelect, InputField

## Gebruik
```vue
<ElearningUitnodigingModal
  v-model:open="elearningUitnodigingOpen"
  :person="elearningUitnodigingPerson"
  @confirm="handleElearningUitnodigingConfirm"
/>
```

## Props
| Prop | Type | Default | Beschrijving |
|------|------|---------|-------------|
| `open` | `Boolean` | `false` | v-model — zichtbaarheid modal |
| `person` | `Person \| null` | `null` | Persoon waarvoor de e-learning geldt |

## Events
| Event | Payload | Beschrijving |
|-------|---------|-------------|
| `update:open` | `boolean` | Sluit modal |
| `confirm` | `{ person, method: 'locatie' \| 'email' }` | Actie bevestigd |

## Inhoud

### Stap 1 — Keuze

- Intro: "Kies hoe de e-learning gestart wordt voor {person.naam}."
- Dropdown: "Activeer op locatie" / "Verstuur een mail".
- **Footer:** "Annuleren" (ghost) + "Volgende" (filled, disabled zolang geen keuze).

### Stap 2a — Activeer op locatie

- Label/waarde-weergave (InfoSection-stijl): Naam training, Cursus-code, Pincode.
- **Footer:** "Terug" (ghost, links) + "Sluiten" (outlined) + "Printen" (filled).

### Stap 2b — Verstuur een mail

- E-mailveld: read-only met potlood-icoon als `person.emailadres` bekend. Geen email: direct bewerkbaar.
- **Footer:** "Terug" (ghost, links) + "Verstuur uitnodiging" (filled, disabled bij leeg).

## Gedrag
- Modal opent alleen als `person.elearning === 'niet-behaald'`.
- Stap 1: dropdown selectie verplicht voor "Volgende".
- Stap 2a: informatie direct zichtbaar, print opent nieuw venster.
- Stap 2b: "Verstuur" disabled bij leeg e-mailadres. Na klik: emit `confirm` met `method: 'email'`, toast "Uitnodiging verstuurd".
- "Terug" gaat altijd terug naar stap 1, behoudt eerder gemaakte keuze.
- Form reset bij sluiten modal.
- Backdrop sluit modal niet (ActionPopup gedrag).

## Design Tokens
| Element | Token | Waarde |
|---------|-------|--------|
| InfoSection (stap 2a) | Zie `InfoSection.md` | Standaard InfoSection tokens (zonder title) |
| Pincode waarde | `monospace` font | Visueel onderscheid van overige waarden |
| Read-only email veld | `--n50` | Achtergrond |
| Read-only email tekst | `--n800` | Tekstkleur |
| Potlood-icoon | `--n500` / `--n700` hover | Icoonkleur |
| Potlood-icoon hover | `--n200` | Achtergrond hover |
| Read-only veld radius | `--r-s` | Border-radius |
