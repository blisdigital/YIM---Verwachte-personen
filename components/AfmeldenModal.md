# AfmeldenModal

Bevestigingsdialoog voor het afmelden van een aangemelde persoon. Gebouwd op `<ActionPopup>`. Gebruikt `<Toggle>` uit `src/components/ui/`.

**Figma:** [Epic: Verwachte personen — node 214:32627](https://www.figma.com/design/LuyFTR1cgQe3mT6TAGvzVV/Epic--Verwachte-personen?node-id=214-32627)  
**Versie:** 0.1  
**Datum:** mei 2026

---

## Gebruik

```vue
<AfmeldenModal
  v-model:open="showAfmelden"
  :person="activePerson"
  :showContactpersoonToggle="config.contactpersoonInformeren === 'handmatig'"
  @confirm="handleAfmeldenConfirm"
/>
```

---

## Props

| Prop | Type | Default | Beschrijving |
|------|------|---------|--------------|
| `open` | `boolean` | `false` | Zichtbaarheid (v-model:open) |
| `person` | `Person \| null` | `null` | Persoon die afgemeld wordt |
| `showContactpersoonToggle` | `boolean` | `false` | Toont toggle "Verstuur e-mail naar contactpersoon" |

---

## Events

| Event | Payload | Beschrijving |
|-------|---------|--------------|
| `update:open` | `boolean` | Modal sluiten |
| `confirm` | `{ person, notifyContact }` | Gebruiker heeft bevestigd — ouder verantwoordelijk voor statuswijziging |

---

## Inhoud

1. **Intro-tekst** — "Je gaat de volgende persoon afmelden:"

2. **Persoon-card** (achtergrond `--p50`) — toont naam + VIP-ster (indien `person.vip === true`), type en bedrijf als subline (`type • bedrijf`), en contactpersoon-rij (wit balkje, naam + e-mail van contactpersoon).

3. **E-mail toggle** (conditioneel — alleen zichtbaar als `showContactpersoonToggle === true`) — "Verstuur e-mail naar contactpersoon dat persoon is afgemeld." — standaard **uit**.

   > **Configuratieregel:** in klantconfiguratie wordt vastgelegd of e-mail naar contactpersoon automatisch of handmatig verstuurd wordt. Bij automatisch: toggle niet tonen. Bij handmatig: toggle tonen (default uit, receptionist beslist zelf).

**Footer:** Annuleren (ghost) + Bevestigen (filled — primair teal)

---

## Gedrag

- Formuliervelden worden gereset bij sluiten of bevestigen.
- Bevestigen: emit `confirm` met `{ person, notifyContact }` → modal sluit.
- Ouder roept `personenStore.updateStatus(person.id, 'Afgemeld')` aan na confirm.
- Statusovergang: `'Aangemeld'` → `'Afgemeld'`.
- Toast na bevestigen: "[naam] is afgemeld."
- Bevestigen-knop is altijd **enabled** (geen verplichte velden).
- Backdrop sluit modal **niet** — actie vereist expliciete knop (zie `ActionPopup.md`).

---

## Design Tokens

| Element | Token | Beschrijving |
|---------|-------|--------------|
| Modal achtergrond | `--n0` | Wit |
| Modal schaduw | `elevation-m` | 0px 4px 16px -2px rgba(17,19,19,0.16) |
| Modal afronding | `--corner-s` | 4px |
| Header titel kleur | `--p700` | Donker teal |
| Intro tekst kleur | `--n800` | Donker grijs |
| Persoon-card achtergrond | `--p50` | Licht teal |
| Persoon naam kleur | `--p700` | Donker teal |
| Persoon subline kleur | `--p500` | Teal (type • bedrijf) |
| Contact-rij achtergrond | `--n0` | Wit |
| Contact-rij tekst kleur | `--p700` | Donker teal |
| Contact-rij afronding | `--corner-s` | 4px |
| Toggle actief | `--p500` | Teal |
| Toggle inactief | `--n100` | Licht grijs |
| Toggle afronding | `--corner-xl` | 32px |
| Toggle label kleur | `--p800` | Donker teal |
