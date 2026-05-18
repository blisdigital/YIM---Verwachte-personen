# InformeerContactpersoonModal

Pop-up voor het sturen van een e-mail naar de contactpersoon van een verwachte bezoeker of contractor. Gebouwd op `<ActionPopup>`.

**Figma:** *(geen design beschikbaar — prototype-only)*  
**Versie:** 0.1  
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
| `person` | `Person \| null` | `null` | Persoon wiens contactpersoon geïnformeerd wordt |

---

## Events

| Event | Payload | Beschrijving |
|-------|---------|--------------|
| `update:open` | `boolean` | Modal sluiten |
| `confirm` | `{ person, bericht }` | Gebruiker verstuurt bericht — ouder verantwoordelijk voor e-mailactie |

---

## Inhoud

1. **Intro-tekst** — "Verstuur een e-mail naar contactpersoon"

2. **Contactpersoon chip** — Geeft naam + e-mailadres van de contactpersoon. Achtergrond `--p50`, afgerond (`--r-s`), met `account_box`-icoon. Toont `person.contactpersoon` en `person.contactEmail`.

3. **Berichtveld** — Label "Bericht" boven een textarea (120px hoog, vrij te typen). Niet verplicht — receptionist kan eigen bericht invullen of leeg laten.

**Footer:** Annuleren (ghost) + Bericht versturen (filled — primair teal)

---

## Gedrag

- Formulierveld wordt gereset bij sluiten of bevestigen.
- Bevestigen: emit `confirm` met `{ person, bericht }` → modal sluit.
- Toast na bevestigen: "Contactpersoon van [naam] is geïnformeerd."
- Bericht versturen-knop is altijd enabled (bericht is optioneel).
- Backdrop sluit modal **niet** — zie `ActionPopup.md`.

---

## Design Tokens

| Element | Token | Beschrijving |
|---------|-------|--------------|
| Modal achtergrond | `--n0` | Wit |
| Header titel kleur | `--p700` | Donker teal |
| Intro tekst kleur | `--n800` | Donker grijs |
| Contact chip achtergrond | `--p50` | Licht teal |
| Contact chip tekst | `--p700` | Donker teal |
| Contact chip afronding | `--r-s` | 4px |
| Veld label kleur | `--n900` | Bijna zwart |
| Veld achtergrond | `--n0` | Wit |
| Veld rand | `--n400` | Grijs |
| Veld rand focus | `--p500` | Teal |
| Veld afronding | `--r-s` | 4px |
