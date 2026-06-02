# InformeerContactpersoonModal

Pop-up voor het informeren van een contactpersoon — bellen of mailen — vanuit een persoonrij. Gebouwd op `<ActionPopup>`. Bestaat uit twee schermen die in volgorde worden getoond.

**Figma:** [600 Pop-up contactpersoon informeren](https://www.figma.com/design/LuyFTR1cgQe3mT6TAGvzVV/Epic--Verwachte-personen?node-id=252-82592) · [601 Mail versturen](https://www.figma.com/design/LuyFTR1cgQe3mT6TAGvzVV/Epic--Verwachte-personen?node-id=252-82613)

## Relaties
- **Gebruikt door:** VerwachtePersonenView
- **Gebruikt:** ActionPopup, BaseButton, InputField, CustomSelect

## Gebruik
```vue
<InformeerContactpersoonModal
  v-model:open="showInformeer"
  :person="activePerson"
  @confirm="handleInformeerConfirm"
/>
```

## Props
| Prop | Type | Default | Beschrijving |
|------|------|---------|-------------|
| `open` | `boolean` | `false` | Zichtbaarheid (v-model:open) |
| `person` | `Person \| null` | `null` | Persoon wiens contactpersoon(en) geïnformeerd worden |
| `initialScreen` | `'info' \| 'mail'` | `'info'` | Startscherm bij openen. `'mail'` slaat scherm 1 over en opent direct het e-mail opstellen scherm. |

## Events
| Event | Payload | Beschrijving |
|-------|---------|-------------|
| `update:open` | `boolean` | Modal sluiten |
| `confirm` | `{ person, contact, bericht }` | Gebruiker verstuurt mail — `contact` is het geselecteerde contactpersoon-object `{ naam, tel, email }` |

## Inhoud

### Scherm 1 — Contactgegevens (standaard)

**Titel:** "Contactpersoon informeren"

- **Dropdown "Kies contactpersoon"** — toont naam geselecteerde contactpersoon. 1 contactpersoon: disabled (read-only). Meerdere: interactief. `person.contactpersonen[0]` is de primaire.
- **Telefoonrij** — `phone`-icoon (teal) + telefoonnummer als klikbare `tel:`-link.
- **E-mailrij** — `email`-icoon (teal) + e-mailadres + inline knop "Verstuur mail" (outlined small).
- Geen footer-knoppen op scherm 1. Sluiten via X-knop.

### Scherm 2 — E-mail opstellen

- **"Contactpersoon"** — read-only veld met naam.
- **"Verstuur een bericht per e-mail"** — label boven textarea (96px hoog, niet verplicht).
- **Footer:** "Annuleren" (ghost) + "Versturen" (filled teal).

## Gedrag
- Formulier en scherm worden gereset bij sluiten of bevestigen.
- Bevestigen: emit `confirm` met `{ person, contact, bericht }` en modal sluit.
- Toast na bevestigen: "Contactpersoon van [naam] is geïnformeerd."
- "Versturen"-knop is altijd enabled (bericht is optioneel).
- Backdrop sluit modal **niet** — zie `ActionPopup.md`.

## Design Tokens
| Element | Token | Waarde |
|---------|-------|--------|
| Modal achtergrond | `--n0` | Wit |
| Intro tekst kleur | `--n800` | Donker grijs |
| Dropdown achtergrond | `--n50` | Licht grijs |
| Dropdown tekst | `--n800` | Donker grijs |
| Contactrij achtergrond | `--n0` | Wit |
| Contactrij rand | `--n300` | Licht grijs |
| Contactrij afronding | `--r-s` | 4px |
| Icoon kleur | `--p700` | Donker teal |
| Telefoonnummer / e-mail tekst | `--p700` | Donker teal |
| "Verstuur mail" rand | `--n400` | Grijs |
| "Verstuur mail" tekst | `--n900` | Bijna zwart |
| Veld rand | `--n400` | Grijs |
| Veld rand focus | `--p500` | Teal |
| Veld afronding | `--r-s` | 4px |
| Primaire knop | `--p500` | Teal |
