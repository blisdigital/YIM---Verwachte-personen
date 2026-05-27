# InformeerContactpersoonModal

Pop-up voor het informeren van een contactpersoon — bellen of mailen — vanuit een persoonrij. Gebouwd op `<ActionPopup>`. Bestaat uit twee schermen die in volgorde worden getoond.

**Figma:** [600 Pop-up contactpersoon informeren](https://www.figma.com/design/LuyFTR1cgQe3mT6TAGvzVV/Epic--Verwachte-personen?node-id=252-82592) · [601 Mail versturen](https://www.figma.com/design/LuyFTR1cgQe3mT6TAGvzVV/Epic--Verwachte-personen?node-id=252-82613)  
**Versie:** 0.2  
**Datum:** mei 2026

---

## Gebruik

```vue
<InformeerContactpersoonModal
  v-model:open="showInformeer"
  :person="activePerson"
  @confirm="handleInformeerConfirm"
/>
```

---

## Props

| Prop | Type | Default | Beschrijving |
|------|------|---------|--------------|
| `open` | `boolean` | `false` | Zichtbaarheid (v-model:open) |
| `person` | `Person \| null` | `null` | Persoon wiens contactpersoon(en) geïnformeerd worden |
| `initialScreen` | `'info' \| 'mail'` | `'info'` | Startscherm bij openen. `'mail'` slaat scherm 1 over en opent direct het e-mail opstellen scherm. Gebruik `'mail'` wanneer de gebruiker al expliciet voor e-mail heeft gekozen (bijv. mail icon button in DetailPanel). |

---

## Events

| Event | Payload | Beschrijving |
|-------|---------|--------------|
| `update:open` | `boolean` | Modal sluiten |
| `confirm` | `{ person, contact, bericht }` | Gebruiker verstuurt mail — `contact` is het geselecteerde contactpersoon-object `{ naam, tel, email }` |

---

## Scherm 1 — Contactgegevens (standaard)

**Titel:** "Contactpersoon informeren"  
**Intro:** "Informeer de contactpersoon door ze te bellen of te mailen."

### Dropdown "Kies contactpersoon"

- Toont naam van geselecteerde contactpersoon.
- **1 contactpersoon:** dropdown is visueel aanwezig maar disabled (read-only, geen pijl).
- **Meerdere contactpersonen:** dropdown is interactief met pijl-icoon (`arrow_drop_down`). Gebruiker kiest welk contactpersoon ze wil informeren.
- De eerst opgevoerde contactpersoon in `person.contactpersonen[0]` is de primaire.

### Contactrijen

Twee rijen met border (`--n300`) en `--n0` achtergrond:

1. **Telefoonrij** — `phone`-icoon (teal `--p700`) + telefoonnummer als `(+31) 6 ...` — klikbare `tel:`-link.
2. **E-mailrij** — `email`-icoon (teal `--p700`) + e-mailadres + inline knop **"Verstuur mail"** (outlined small, `--n900` tekst, `--n400` rand).

**Geen footer-knoppen op scherm 1.** Sluiten via X-knop in header.

---

## Scherm 2 — E-mail opstellen

Opent na klik op "Verstuur mail" op scherm 1.

**Titel:** "Contactpersoon informeren"  
**Intro:** "Stuur een bericht naar contactpersoon."

- **"Contactpersoon"** — read-only veld toont naam van geselecteerde contactpersoon (geen dropdown, geen pijl).
- **"Verstuur een bericht per e-mail"** — label boven textarea (96px hoog, vrij te typen, niet verplicht).

**Footer:** "Annuleren" (ghost) + "Versturen" (filled teal `--p500`)

---

## Gedrag

- Formulier en scherm worden gereset bij sluiten of bevestigen.
- Bevestigen: emit `confirm` met `{ person, contact, bericht }` → modal sluit.
- Toast na bevestigen: "Contactpersoon van [naam] is geïnformeerd."
- "Versturen"-knop is altijd enabled (bericht is optioneel).
- Backdrop sluit modal **niet** — zie `ActionPopup.md`.
- Navigatie scherm 1 → scherm 2 via "Verstuur mail" knop; terugkeer alleen via "Annuleren" of X.

---

## Design Tokens

| Element | Token | Beschrijving |
|---------|-------|--------------|
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
