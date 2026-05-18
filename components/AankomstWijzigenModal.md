# AankomstWijzigenModal

Modal voor het wijzigen van de verwachte aankomstdatum, aankomsttijd en vertrektijd van een persoon. Gebouwd op `<ActionPopup>`. Gebruikt `<DatePopover>`, `<TimePopover>` en `<Toggle>`.

**Figma:** [Epic: Verwachte personen — node 208:99142](https://www.figma.com/design/LuyFTR1cgQe3mT6TAGvzVV/Epic--Verwachte-personen?node-id=208-99142)  
**Versie:** 0.1  
**Datum:** mei 2026

---

## Gebruik

```vue
<AankomstWijzigenModal
  v-model:open="showAankomstWijzigen"
  :person="activePerson"
  @confirm="handleAankomstWijzigenConfirm"
/>
```

---

## Props

| Prop | Type | Default | Beschrijving |
|------|------|---------|--------------|
| `open` | `boolean` | `false` | Zichtbaarheid (v-model:open) |
| `person` | `Person \| null` | `null` | Persoon waarvan de aankomst wordt gewijzigd |

---

## Events

| Event | Payload | Beschrijving |
|-------|---------|--------------|
| `update:open` | `boolean` | Modal sluiten/openen |
| `confirm` | `{ person, datum, aankomsttijd, vertrektijd, toelichting, notifyContact }` | Gebruiker heeft bevestigd |

Payload-velden:

| Veld | Type | Beschrijving |
|------|------|--------------|
| `person` | `Person` | Het persoon-object |
| `datum` | `string` | Nieuwe aankomstdatum in `DD-MM-YYYY` formaat |
| `aankomsttijd` | `string` | Nieuwe aankomsttijd in `HH:mm` formaat |
| `vertrektijd` | `string \| null` | Nieuwe vertrektijd in `HH:mm` formaat, of `null` |
| `toelichting` | `string` | Optionele toelichting (mag leeg zijn) |
| `notifyContact` | `boolean` | Of contactpersoon per e-mail geïnformeerd moet worden |

---

## Inhoud

1. **Intro-tekst** — "Wijzig de verwachte aankomst van:"

2. **Persoon-card** (achtergrond `--p50`) — toont:
   - Naam + VIP-ster (indien `person.vip === true`)
   - Bedrijf als subline (`--n700`)
   - Drie info-rijen (witte balkjes, `--n0`, `--corner-s`):
     - **Contactpersoon:** naam (e-mail van contactpersoon)
     - **Aankomstdatum:** huidige `datumVanaf` van persoon
     - **Aankomsttijd:** huidige `aankomsttijd` van persoon

3. **Velden:**
   - **Aankomstdatum wijzigen \*** — trigger-veld met kalender-icoon (rechts, `--n50` achtergrond) → klik opent `DatePickerCalendar` in een eenvoudige popover (geen presets, geen knoppen; dag selecteren sluit direct)
   - **Aankomsttijd wijzigen \*** — trigger-veld met klok-icoon (rechts, `--n50` achtergrond) → klik opent `TimePopover` via teleport
   - **Vertrektijd wijzigen \*** — trigger-veld met klok-icoon (rechts, `--n50` achtergrond) → klik opent `TimePopover` via teleport
   - **Toelichting (optioneel)** — textarea, 96px hoogte, `border-radius: var(--r-s)`

4. **Toggle** — "Verstuur e-mail naar contactpersoon dat persoon is aangemeld." — standaard **uit**.

**Footer:** Annuleren (ghost) + Bevestigen (filled — primair teal)

---

## Gedrag

- **Vooraf invullen:** velden worden geïnitialiseerd op de huidige waarden van de persoon (`datumVanaf`, `aankomsttijd`, `vertrekTijd`) zodra de modal opent (`watch` op `open` + `person`).
- **DatePickerCalendar-integratie:** trigger-veld toont datum in `DD-MM-YYYY` formaat. Intern wordt ISO (`YYYY-MM-DD`) gebruikt. Klik op trigger → popover met alleen `DatePickerCalendar` (geen presets, geen knoppen). Dag selecteren → datum overnemen + popover sluiten.
- **TimePopover-integratie:** trigger-veld toont de tijd in `HH:mm`. Bij `@apply` wordt de geselecteerde tijd overgenomen; bij `@cancel` sluit de popover zonder wijziging.
- **Popovers:** renderen via `<Teleport to="body">` met `position: fixed`, gepositioneerd direct onder het trigger-veld (via `getBoundingClientRect()`). Breedte = breedte van het trigger-veld (inline style overschrijft de hardcoded breedte van DatePopover/TimePopover). Sluiten bij klik buiten (via `onClickOutside` of klik-op-overlay).
- **Formulier reset:** alle velden worden gereset bij sluiten (cancel of ×) én na bevestigen.
- **Bevestigen:** emit `confirm` → modal sluit → ouder verwerkt de data.
  - Ouder roept `personenStore.updateAankomst(person.id, datum, aankomsttijd, vertrektijd)` aan.
  - Toast: *"Aankomst van [naam] is gewijzigd naar [datum] om [aankomsttijd]."*
- **Lijst-effect:** omdat `personen` reactief is, herberekenen `filtered` en `sorted` automatisch:
  - Persoon verdwijnt uit lijst als de nieuwe datum afwijkt van de actieve datumfilter.
  - Persoon schuift omhoog of omlaag in de volgorde op basis van de nieuwe `aankomsttijd`.
- Bevestigen-knop is altijd **enabled** (velden zijn vooraf gevuld met geldige waarden).
- Backdrop sluit modal **niet** (zie `ActionPopup.md`).

---

## Design Tokens

| Element | Token | Beschrijving |
|---------|-------|--------------|
| Modal achtergrond | `--n0` | Wit |
| Modal schaduw | `--shadow-m` | 0px 4px 16px -2px rgba(17,19,19,0.16) |
| Modal afronding | `--r-s` | 4px |
| Header titel kleur | `--p700` | Donker teal |
| Intro tekst kleur | `--n800` | Donker grijs |
| Persoon-card achtergrond | `--p50` | Licht teal |
| Persoon naam kleur | `--p700` | Donker teal |
| Persoon bedrijf kleur | `--n700` | Grijs |
| Info-rij achtergrond | `--n0` | Wit |
| Info-rij label breedte | `120px` | Vaste breedte (gelijklijning) |
| Info-rij label kleur | `--p700` | Donker teal, semibold |
| Info-rij waarde kleur | `--p700` | Donker teal |
| Info-rij afronding | `--r-s` | 4px |
| Veld label kleur | `--n900` | Bijna zwart |
| Trigger-veld rand | `--n400` | Grijs |
| Trigger-veld rand (open/hover) | `--p500` | Teal |
| Trigger-veld icoon achtergrond | `--n50` | Licht grijs |
| Trigger-veld icoon kleur | `--n700` | Grijs |
| Textarea rand | `--n400` | Grijs |
| Textarea rand (focus) | `--p500` | Teal |
| Toggle actief | `--p500` | Teal |
| Toggle inactief | `--n100` | Licht grijs |
| Toggle label kleur | `--p800` | Donker teal |
