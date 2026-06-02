# AanmeldenModal

Bevestigingsdialoog voor het aanmelden van een verwachte persoon. Gebouwd op `<ActionPopup>`.

**Figma:** [Epic: Verwachte personen — node 208:60024](https://www.figma.com/design/LuyFTR1cgQe3mT6TAGvzVV/Epic--Verwachte-personen?node-id=208-60024)

## Relaties
- **Gebruikt door:** VerwachtePersonenView
- **Gebruikt:** ActionPopup, BaseButton, InputField, Toggle

## Gebruik

```vue
<AanmeldenModal
  v-model:open="showAanmelden"
  :person="activePerson"
  :requiresIdentiteitscontrole="config.identiteitscontroleVerplicht"
  :showContactpersoonToggle="config.contactpersoonInformeren === 'handmatig'"
  @confirm="handleAanmeldenConfirm"
/>
```

## Props

| Prop | Type | Default | Beschrijving |
|------|------|---------|-------------|
| `open` | `boolean` | `false` | Zichtbaarheid (v-model:open) |
| `person` | `Person \| null` | `null` | Persoon die aangemeld wordt |
| `requiresIdentiteitscontrole` | `boolean` | `false` | Toont identiteitscontrole-sectie met documentnummer-input |
| `showContactpersoonToggle` | `boolean` | `false` | Toont toggle "Verstuur e-mail naar contactpersoon" |

## Events

| Event | Payload | Beschrijving |
|-------|---------|-------------|
| `update:open` | `boolean` | Modal sluiten |
| `confirm` | `{ person, documentnummer, notifyContact }` | Bevestigd — ouder verantwoordelijk voor statuswijziging |

## Inhoud

1. **Intro-tekst** — "Je gaat de volgende persoon aanmelden:"
2. **Persoon-card** (`--p50`) — naam + VIP-ster, type/bedrijf subline, contactpersoon-rij (wit balkje)
3. **Identiteitscontrole** (conditioneel, `requiresIdentiteitscontrole`) — heading + verplicht documentnummer-veld
4. **E-mail toggle** (conditioneel, `showContactpersoonToggle`) — standaard **uit**
5. **Footer:** Annuleren (ghost) + Bevestigen (filled teal)

> **Configuratieregel:** klantconfiguratie bepaalt of e-mail automatisch of handmatig wordt verstuurd. Bij automatisch: toggle niet tonen. Bij handmatig: toggle tonen (default uit).

## Gedrag

- Formuliervelden worden gereset bij sluiten of bevestigen
- Bevestigen: emit `confirm` met `{ person, documentnummer, notifyContact }` -> modal sluit
- Ouder roept `personenStore.updateStatus(person.id, 'Aangemeld')` aan na confirm
- Statusovergangen: `'Verwacht'` → `'Aangemeld'` en `'Nog niet aangekomen'` → `'Aangemeld'`
- Toast: "[naam] is aangemeld."
- Bevestigen-knop **disabled** als `requiresIdentiteitscontrole === true` en documentnummer leeg
- Backdrop sluit modal **niet** (zie ActionPopup)

## Design Tokens

| Element | Token | Waarde |
|---------|-------|--------|
| Modal achtergrond | `--n0` | Wit |
| Modal schaduw | `elevation-m` | `0px 4px 16px -2px rgba(17,19,19,0.16)` |
| Modal afronding | `--corner-s` | `4px` |
| Header titel kleur | `--p700` | Donker teal |
| Intro tekst kleur | `--n800` | Donker grijs |
| Persoon-card achtergrond | `--p50` | Licht teal |
| Persoon naam kleur | `--p700` | Donker teal |
| Persoon subline kleur | `--p500` | Teal |
| Contact-rij achtergrond | `--n0` | Wit |
| Contact-rij tekst kleur | `--p700` | Donker teal |
| Contact-rij afronding | `--corner-s` | `4px` |
| Sectieheader kleur | `--p700` | Donker teal |
| Veld label kleur | `--n900` | Bijna zwart |
| Veld achtergrond | `--n0` | Wit |
| Veld rand | `--n400` | Grijs |
| Veld rand focus | `--p500` | Teal |
| Toggle actief | `--p500` | Teal |
| Toggle inactief | `--n100` | Licht grijs |
| Toggle afronding | `--corner-xl` | `32px` |
| Toggle label kleur | `--p800` | Donker teal |
