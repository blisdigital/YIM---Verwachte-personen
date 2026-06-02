# AankomstWijzigenModal

Modal voor het wijzigen van de verwachte aankomstdatum, aankomsttijd, vertrekdatum en vertrektijd van een persoon. Gebouwd op `<Modal>`.

**Figma:** [Epic: Verwachte personen — node 208:99142](https://www.figma.com/design/LuyFTR1cgQe3mT6TAGvzVV/Epic--Verwachte-personen?node-id=208-99142)

## Relaties
- **Gebruikt door:** VerwachtePersonenView, DossierView
- **Gebruikt:** Modal, BaseButton, DatePickerCalendar, TimePopover, Toggle

## Gebruik

```vue
<AankomstWijzigenModal
  v-model:open="showAankomstWijzigen"
  :person="activePerson"
  @confirm="handleAankomstWijzigenConfirm"
/>
```

## Props

| Prop | Type | Default | Beschrijving |
|------|------|---------|-------------|
| `open` | `boolean` | `false` | Zichtbaarheid (v-model:open) |
| `person` | `Person \| null` | `null` | Persoon waarvan het bezoek wordt gewijzigd |

## Events

| Event | Payload | Beschrijving |
|-------|---------|-------------|
| `update:open` | `boolean` | Modal sluiten/openen |
| `confirm` | `{ person, aankomstdatum, aankomsttijd, vertrekdatum, vertrektijd, opmerking, notifyContact }` | Bevestigd |

### Confirm payload

| Veld | Type | Beschrijving |
|------|------|-------------|
| `aankomstdatum` | `string` | `DD-MM-YYYY` |
| `aankomsttijd` | `string` | `HH:mm` |
| `vertrekdatum` | `string` | `DD-MM-YYYY` |
| `vertrektijd` | `string \| null` | `HH:mm` of `null` |
| `opmerking` | `string` | Optioneel (mag leeg) |
| `notifyContact` | `boolean` | Contactpersoon per e-mail informeren |

## Inhoud

1. **Header** — titel "Bezoek wijzigen" + sluit-knop
2. **Intro-tekst** — "Wijzig het verwachte bezoek van:"
3. **Datum- en tijdvelden** — twee rijen, elk twee kolommen:
   - Rij 1: Aankomstdatum (kalender-icoon -> DatePickerCalendar) + Aankomsttijd (klok-icoon -> TimePopover)
   - Rij 2: Vertrekdatum + Vertrektijd (idem)
4. **Opmerking** (optioneel) — textarea 96px
5. **Toggle** — "Verstuur e-mail naar contactpersoon" — standaard **uit**
6. **Footer:** Annuleren (ghost) + Bevestigen (filled teal)

## Gedrag

- **Vooraf invullen:** velden initialiseren op huidige waarden van persoon bij openen
- **DatePickerCalendar-integratie:** trigger toont `DD-MM-YYYY`, intern ISO. Dag selecteren -> datum overnemen + popover sluiten
- **TimePopover-integratie:** trigger toont `HH:mm`. `@apply` neemt tijd over; `@cancel` sluit zonder wijziging
- **Popovers:** via `<Teleport to="body">`, `position: fixed`, breedte = trigger-veld breedte
- Formulier reset bij sluiten en na bevestigen
- Bevestigen: emit `confirm` -> ouder roept `personenStore.updateAankomst()` aan
- Toast: "Bezoek van [naam] is gewijzigd naar [aankomstdatum] om [aankomsttijd]."
- Persoon kan verdwijnen uit lijst als nieuwe datum afwijkt van datumfilter
- Bevestigen-knop altijd **enabled** (velden zijn vooraf gevuld)
- Backdrop sluit modal **niet**

### Maatvoering

| Zone | Eigenschap | Waarde |
|------|------------|--------|
| Modal wrapper | `border-radius` | `8px` |
| Modal wrapper | `box-shadow` | `0px 4px 16px -2px rgba(17,19,19,0.16)` |
| Header | padding | `8px 16px` |
| Content | padding | `0 16px`, gap `16px` |
| Datum+tijd rijen | gap | `16px` (kolommen en rijen) |
| Trigger-veld | padding | `8px`, radius `4px` |
| Textarea | hoogte `96px`, padding `8px 12px`, radius `4px` |
| Footer | padding `16px`, knoppen gap `8px` |

## Design Tokens

| Element | Token | Waarde |
|---------|-------|--------|
| Modal achtergrond | `--n0` | `#ffffff` |
| Modal schaduw | `elevation-m` | `0px 4px 16px -2px rgba(17,19,19,0.16)` |
| Modal afronding | `--r-s` | `8px` |
| Header titel kleur | `--p700` | `#315161` |
| Intro tekst kleur | `--n800` | `#3e3f40` |
| Veld label kleur | `--n900` | `#1d1e1f` |
| Trigger-veld rand | `--n400` | `#b8babb` |
| Trigger-veld rand (open/hover) | `--p500` | `#6daeba` |
| Trigger-veld tekst kleur | `--n900` | `#1d1e1f` |
| Trigger-veld icoon achtergrond | `--n50` | `#f8fafb` |
| Trigger-veld afronding | `--r-xs` | `4px` |
| Textarea rand | `--n400` | `#b8babb` |
| Textarea rand (focus) | `--p500` | `#6daeba` |
| Toggle actief | `--p500` | `#6daeba` |
| Toggle inactief | `--n100` | `#f3f4f5` |
| Toggle indicator schaduw | `elevation-xs` | `0px 1px 4px rgba(17,19,19,0.12)` |
| Toggle label kleur | `--p800` | `#243f4c` |
| Annuleren-knop tekst | `--n900` | `#1d1e1f` |
| Bevestigen-knop achtergrond | `--p500` | `#6daeba` |
| Bevestigen-knop tekst | `--n0` | `#ffffff` |
