# AankomstWijzigenModal

Modal voor het wijzigen van de verwachte aankomstdatum, aankomsttijd, vertrekdatum en vertrektijd van een persoon. Gebouwd op `<Modal>`. Gebruikt `<DatePopover>`, `<TimePopover>` en `<Toggle>`.

**Figma:** [Epic: Verwachte personen — node 208:99142](https://www.figma.com/design/LuyFTR1cgQe3mT6TAGvzVV/Epic--Verwachte-personen?node-id=208-99142)  
**Versie:** 0.2  
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
| `person` | `Person \| null` | `null` | Persoon waarvan het bezoek wordt gewijzigd |

---

## Events

| Event | Payload | Beschrijving |
|-------|---------|--------------|
| `update:open` | `boolean` | Modal sluiten/openen |
| `confirm` | `{ person, aankomstdatum, aankomsttijd, vertrekdatum, vertrektijd, opmerking, notifyContact }` | Gebruiker heeft bevestigd |

Payload-velden:

| Veld | Type | Beschrijving |
|------|------|--------------|
| `person` | `Person` | Het persoon-object |
| `aankomstdatum` | `string` | Nieuwe aankomstdatum in `DD-MM-YYYY` formaat |
| `aankomsttijd` | `string` | Nieuwe aankomsttijd in `HH:mm` formaat |
| `vertrekdatum` | `string` | Nieuwe vertrekdatum in `DD-MM-YYYY` formaat |
| `vertrektijd` | `string \| null` | Nieuwe vertrektijd in `HH:mm` formaat, of `null` |
| `opmerking` | `string` | Optionele opmerking (mag leeg zijn) |
| `notifyContact` | `boolean` | Of contactpersoon per e-mail geïnformeerd moet worden |

---

## Inhoud

De modal bestaat uit drie zones: **Header**, **Content** en **Bottom (footer)**.

### Header

- Titel: **"Bezoek wijzigen"** — `h3`, kleur `--p700`
- Sluit-knop (×) rechts — `<IconButton>` met `close`-icoon

### Content

1. **Intro-tekst** — "Wijzig het verwachte bezoek van:" — `body-m`, kleur `--n800`, gecentreerd

2. **Datum- en tijdvelden** — twee rijen van elk twee kolommen (elk veld neemt `flex: 1`):

   **Rij 1**

   - **Aankomstdatum wijzigen \*** — trigger-veld met kalender-icoon (rechts, `--n50` achtergrond) → klik opent `DatePickerCalendar` in een eenvoudige popover
   - **Aankomsttijd wijzigen \*** — trigger-veld met klok-icoon (rechts, `--n50` achtergrond) → klik opent `TimePopover`

   **Rij 2**

   - **Vertrekdatum wijzigen \*** — trigger-veld met kalender-icoon (rechts, `--n50` achtergrond) → klik opent `DatePickerCalendar` in een eenvoudige popover
   - **Vertrektijd wijzigen \*** — trigger-veld met klok-icoon (rechts, `--n50` achtergrond) → klik opent `TimePopover`

   Veldlabels zijn `label-m` semibold, kleur `--n900`.  
   Trigger-veldwaarden zijn `body-m` regular, kleur `--n900`.  
   Icoon-zone heeft achtergrond `--n50`.

3. **Opmerking (optioneel)** — textarea, hoogte `96px`, `border-radius: var(--r-s)`, rand `--n400`

4. **Toggle** — "Verstuur e-mail naar contactpersoon dat persoon is aangemeld." — standaard **uit**.  
   Toggle-label is `label-m` semibold, kleur `--p800`.

### Footer (Bottom)

Knoppen rechts uitgelijnd, gap `8px`:

- **Annuleren** — ghost/tekst-knop, kleur `--n900`
- **Bevestigen** — filled primary-knop, achtergrond `--p500`, tekst wit

---

## Gedrag

- **Vooraf invullen:** velden worden geïnitialiseerd op de huidige waarden van de persoon (`datumVanaf`, `aankomsttijd`, `vertrekTijd`) zodra de modal opent (`watch` op `open` + `person`). Vertrekdatum valt terug op `datumVanaf` als er geen aparte vertrekdatum beschikbaar is.
- **DatePickerCalendar-integratie:** trigger-veld toont datum in `DD-MM-YYYY` formaat. Intern wordt ISO (`YYYY-MM-DD`) gebruikt. Klik op trigger → popover met alleen `DatePickerCalendar` (geen presets, geen knoppen). Dag selecteren → datum overnemen + popover sluiten.
- **TimePopover-integratie:** trigger-veld toont de tijd in `HH:mm`. Bij `@apply` wordt de geselecteerde tijd overgenomen; bij `@cancel` sluit de popover zonder wijziging.
- **Popovers:** renderen via `<Teleport to="body">` met `position: fixed`, gepositioneerd direct onder het trigger-veld (via `getBoundingClientRect()`). Breedte = breedte van het trigger-veld (inline style overschrijft de hardcoded breedte van DatePopover/TimePopover). Sluiten bij klik buiten (via `onClickOutside` of klik-op-overlay).
- **Formulier reset:** alle velden worden gereset bij sluiten (cancel of ×) én na bevestigen.
- **Bevestigen:** emit `confirm` → modal sluit → ouder verwerkt de data.
  - Ouder roept `personenStore.updateAankomst(person.id, aankomstdatum, aankomsttijd, vertrekdatum, vertrektijd)` aan.
  - Toast: *"Bezoek van [naam] is gewijzigd naar [aankomstdatum] om [aankomsttijd]."*
- **Lijst-effect:** omdat `personen` reactief is, herberekenen `filtered` en `sorted` automatisch:
  - Persoon verdwijnt uit lijst als de nieuwe aankomstdatum afwijkt van de actieve datumfilter.
  - Persoon schuift omhoog of omlaag in de volgorde op basis van de nieuwe `aankomsttijd`.
- Bevestigen-knop is altijd **enabled** (velden zijn vooraf gevuld met geldige waarden).
- Backdrop sluit modal **niet** (zie `Modal.md`).

---

## Layout & Maatvoering

| Zone | Eigenschap | Waarde |
|------|------------|--------|
| Modal wrapper | `border-radius` | `8px` (var(--dimensions/spacing/spacing-s)) |
| Modal wrapper | `box-shadow` | `0px 4px 16px -2px rgba(17,19,19,0.16)` (Elevation/m) |
| Header | padding | `8px 16px` |
| Content | padding | `0 16px` |
| Content | gap (tussen secties) | `16px` |
| Datum+tijd rijen | gap (tussen kolommen) | `16px` |
| Datum+tijd rijen | gap (tussen rij 1 en rij 2) | `16px` |
| Veld-wrapper | gap (label → trigger) | `8px` |
| Trigger-veld | padding tekst-zone | `8px` |
| Trigger-veld | padding icoon-zone | `8px` |
| Trigger-veld | `border-radius` | `4px` (var(--dimensions/spacing/spacing-xs)) |
| Textarea | hoogte | `96px` |
| Textarea | padding | `8px 12px` |
| Textarea | `border-radius` | `4px` (var(--dimensions/corners/corner-s)) |
| Toggle-rij | gap (toggle → label) | `8px` |
| Footer | padding | `16px` |
| Footer knoppen | gap | `8px` |
| Knop | padding | `8px 16px` |
| Knop | `border-radius` | `4px` (var(--dimensions/corners/corner-s)) |

---

## Design Tokens

| Element | Token | Waarde | Beschrijving |
|---------|-------|--------|--------------|
| Modal achtergrond | `--n0` | `#ffffff` | Wit |
| Modal schaduw | Elevation/m | `0px 4px 16px -2px rgba(17,19,19,0.16)` | Zwevend paneel |
| Modal afronding | `--r-s` | `8px` | Hoeken modal |
| Header titel kleur | `--p700` | `#315161` | Donker teal |
| Intro tekst kleur | `--n800` | `#3e3f40` | Donker grijs |
| Veld label kleur | `--n900` | `#1d1e1f` | Bijna zwart |
| Veld label gewicht | `semibold` | `600` | Label M |
| Trigger-veld rand | `--n400` | `#b8babb` | Standaard grijs |
| Trigger-veld rand (open/hover) | `--p500` | `#6daeba` | Teal |
| Trigger-veld tekst kleur | `--n900` | `#1d1e1f` | Ingevulde waarde |
| Trigger-veld icoon achtergrond | `--n50` | `#f8fafb` | Licht grijs |
| Trigger-veld afronding | `--r-xs` | `4px` | Hoeken veld |
| Textarea rand | `--n400` | `#b8babb` | Grijs |
| Textarea rand (focus) | `--p500` | `#6daeba` | Teal |
| Toggle actief | `--p500` | `#6daeba` | Teal |
| Toggle inactief | `--n100` | `#f3f4f5` | Licht grijs |
| Toggle indicator schaduw | Elevation/xs | `0px 1px 4px rgba(17,19,19,0.12), 0px 1px 2px rgba(17,19,19,0.08)` | Toggle-knop |
| Toggle label kleur | `--p800` | `#243f4c` | Donker teal |
| Annuleren-knop tekst | `--n900` | `#1d1e1f` | Ghost stijl |
| Bevestigen-knop achtergrond | `--p500` | `#6daeba` | Primair teal |
| Bevestigen-knop tekst | `--n0` | `#ffffff` | Wit |
