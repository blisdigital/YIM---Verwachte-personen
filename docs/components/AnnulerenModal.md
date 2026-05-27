# AnnulerenModal

Bevestigingsdialoog voor het annuleren van een verwachte persoon. Gebouwd op `<ActionPopup>`.

**Figma:** [Epic: Verwachte personen — node 208:99269](https://www.figma.com/design/LuyFTR1cgQe3mT6TAGvzVV/Epic--Verwachte-personen?node-id=208-99269)  
**Versie:** 0.2  
**Datum:** mei 2026

---

## Gebruik

```vue
<AnnulerenModal
  v-model:open="showAnnuleren"
  :person="activePerson"
  @confirm="handleAnnulerenConfirm"
/>
```

---

## Props

| Prop | Type | Default | Beschrijving |
|------|------|---------|--------------|
| `open` | `boolean` | `false` | Zichtbaarheid (v-model:open) |
| `person` | `Person \| null` | `null` | Persoon die geannuleerd wordt |

---

## Events

| Event | Payload | Beschrijving |
|-------|---------|--------------|
| `update:open` | `boolean` | Modal sluiten |
| `confirm` | `{ person, reden, toelichting, notifyContact }` | Gebruiker heeft bevestigd — ouder verantwoordelijk voor statuswijziging |

---

## Inhoud

1. **Intro-tekst** — "Je staat op het punt de aanmelding van deze persoon te annuleren. Dit kan niet ongedaan worden gemaakt. Persoon moet dan opnieuw geregistreerd en aangemeld worden."

2. **Reden (optioneel)** — select-dropdown met placeholder "Selecteer een reden". Opties worden geconfigureerd in het prototype.

3. **Toelichting (optioneel)** — textarea (96px hoog).

4. **E-mail toggle** — "Verstuur e-mail naar contactpersoon dat persoon is geannuleerd." — standaard uit.

**Footer:** Annuleren (ghost) + Bevestigen (filled — primair teal).

---

## Gedrag

- Formuliervelden worden gereset bij sluiten of bevestigen
- Bevestigen: emit `confirm` met `{ person, reden, toelichting, notifyContact }` → modal sluit
- Status wijzigt naar `'Geannuleerd'` in de parent (`handleAnnulerenConfirm`)
- Toast na bevestigen: "De aankomst van [naam] is geannuleerd."

---

## Design Tokens

| Element | Token | Beschrijving |
|---------|-------|--------------|
| Veld achtergrond | `--n0` | Wit |
| Veld rand | `--n400` | Grijs |
| Veld rand focus | `--p500` | Teal |
| Toggle actief | `--p500` | Teal |
| Toggle inactief | `--n300` | Licht grijs |
| Toggle label kleur | `--p800` | Donker teal |
