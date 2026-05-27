# CredentialActiverenModal

Multi-scenario dialoog voor het activeren of koppelen van een credential aan een persoon. Gebouwd op `<ActionPopup>`. Ondersteunt drie scenario's op basis van `person.credentialOpties`: printbaar (A), fysiek (B), of keuze (C). Bevat een sub-modal (`CredentialMailenModal`) voor het mailen van printbare credentials.

**Figma:** nog te definieren

---

## Gebruik

```vue
<CredentialActiverenModal
  v-model:open="showActiveren"
  :person="activePerson"
  @confirm="handleCredentialActiveren"
/>
```

---

## Props

| Prop | Type | Default | Beschrijving |
| --- | --- | --- | --- |
| `open` | `boolean` | `false` | Zichtbaarheid (v-model:open) |
| `person` | `Person \| null` | `null` | Persoon waarvoor de credential geactiveerd wordt. Moet `credentialOpties` array bevatten (zie Scenario routing) |

---

## Events

| Event | Payload | Beschrijving |
| --- | --- | --- |
| `update:open` | `boolean` | Modal sluiten |
| `confirm` | Scenario A: `{ person, credentialType }` / Scenario B: `{ person, credentialType, pasnummer, periode, datumVanaf, datumTotEnMet }` | Credential is geactiveerd of gekoppeld |

---

## Scenario routing

Het scenario wordt bepaald door `person.credentialOpties`:

| Conditie | Scenario | Titel | Beschrijving |
| --- | --- | --- | --- |
| 1 optie met `categorie === 'printbaar'` | **A** | "Credential activeren" | Printbare credential (QR-code): credentialnummer + datumbereik invullen, credential mailen of printen, dan activeren |
| 1 optie met `categorie === 'fysiek'` | **B** | "Credential koppelen" | Fysieke pas: credentialnummer + periode invullen, dan koppelen |
| Meerdere opties | **C** | Dynamisch (A of B titel) | Stap 1: kies credential type. Stap 2: formulier van scenario A of B afhankelijk van gekozen optie |
| Geen opties | **B** | "Credential koppelen" | Fallback naar fysiek scenario |

---

## Inhoud

### Alle scenario's

1. **Intro-tekst** -- "Je gaat de volgende credential activeren:"
2. **Credential veld** -- Readonly weergave van de actieve optie (scenario A/B), of een select-dropdown (scenario C stap 1)

### Scenario A -- Printbaar

3. **Credentialnummer** (`InputField`, verplicht) -- Vrij tekstveld
4. **Datum vanaf + Datum tot en met** (`FormDateField`, beide verplicht) -- Naast elkaar in een rij
5. **Accessoires** (conditioneel) -- Alleen zichtbaar als `activeOptie.accessoires` niet leeg is. Toont naam + afbeelding-placeholder per accessoire in een teal box

**Footer:** Annuleren (ghost) + Mailen (outlined, disabled tot formulier compleet) + Printen (outlined, disabled tot formulier compleet) + Activeren (filled, disabled tot gemaild of geprint)

### Scenario B -- Fysiek

3. **Credentialnummer** (`InputField`, verplicht) -- Vrij tekstveld
4. **Periode** -- Segmented button group: "Permanent" (default) / "Tijdelijk"
5. **Datum vanaf** (`FormDateField`, verplicht) -- Altijd zichtbaar
6. **Datum tot en met** (`FormDateField`, verplicht) -- Alleen zichtbaar bij `periode === 'tijdelijk'`
7. **Accessoires** (conditioneel) -- Zelfde als scenario A

**Footer:** Annuleren (ghost) + Koppelen (filled, disabled tot formulier compleet)

### Scenario C -- Keuze (2 stappen)

**Stap 1:**
- Select-dropdown met alle opties uit `person.credentialOpties`
- **Footer:** Annuleren (ghost) + Volgende (filled, disabled tot optie gekozen)

**Stap 2:**
- Formulier van scenario A of B (afhankelijk van `gekozenOptie.categorie`)
- **Footer:** Terug (ghost, links) + Annuleren (ghost) + scenario-specifieke knoppen (rechts)

---

## Validatie

| Computed | Conditie | Beschrijving |
| --- | --- | --- |
| `canMailOrPrint` | Scenario A + credentialnummer + datumVanaf + datumTotEnMet ingevuld | Mailen- en Printen-knoppen worden enabled |
| `canActivate` | `canMailOrPrint` + credential is gemaild of geprint | Activeren-knop wordt enabled |
| `canKoppelen` | Scenario B + credentialnummer + datumVanaf ingevuld + (permanent of datumTotEnMet ingevuld) | Koppelen-knop wordt enabled |

---

## Sub-modal: CredentialMailenModal

Bij klik op "Mailen" in scenario A opent `CredentialMailenModal` als geneste modal. Na bevestiging:
- `heeftGemaild` wordt `true`
- Toast: "Credential gemaild" met beschrijving "Credential verstuurd naar {emailadres}."

Bij klik op "Printen":
- `heeftGeprint` wordt `true`
- Toast: "Credential geprint" met beschrijving "De credential is succesvol geprint."

---

## Gedrag

- Formuliervelden worden volledig gereset bij sluiten (`watch` op `open`).
- Scenario C: "Terug" keert terug naar stap 1 en wist de gekozen optie.
- Activeren (scenario A): emit `confirm` met `{ person, credentialType }` en sluit modal.
- Koppelen (scenario B): emit `confirm` met `{ person, credentialType, pasnummer, periode, datumVanaf, datumTotEnMet }` en sluit modal. `datumTotEnMet` is `null` bij permanente periode.
- De modal heeft een breedte van 560px.
- Backdrop sluit modal niet -- actie vereist expliciete knop (zie `ActionPopup.md`).
- Gebruikt `useToast()` composable voor print- en mail-feedback.

---

## Design Tokens

| Element | Token | Beschrijving |
| --- | --- | --- |
| Intro tekst kleur | `--n800` | Donker grijs |
| Veld label kleur | `--n900` | Bijna zwart |
| Veld label gewicht | `600` | Semi-bold |
| Verplicht-ster kleur | `--err` | Rood |
| Select achtergrond | `--n0` | Wit |
| Select rand | `--n400` | Grijs |
| Select rand focus | `--p500` | Teal |
| Select focus ring | `--p500` | Teal (box-shadow 2px) |
| Select tekst kleur | `--n800` | Donker grijs |
| Select pijl kleur | `--n700` | Grijs |
| Select afronding | `--r-s` | Klein |
| Readonly select achtergrond | `--n50` | Licht grijs |
| Readonly select tekst kleur | `--n800` | Donker grijs |
| Segmented group rand | `--n500` | Middengrijs |
| Segmented group achtergrond | `--n0` | Wit |
| Segmented group afronding | `--r-s` | Klein |
| Segmented knop actief achtergrond | `--p500` | Teal |
| Segmented knop actief tekst | `--n0` | Wit |
| Segmented knop inactief tekst | `--n800` | Donker grijs |
| Accessoire box achtergrond | `--p50` | Licht teal |
| Accessoire box rand | `--p100` | Teal licht |
| Accessoire box afronding | `--r-s` | Klein |
| Accessoire naam kleur | `--n900` | Bijna zwart |
| Accessoire afbeelding achtergrond | `--n0` | Wit |
| Accessoire afbeelding placeholder kleur | `--n700` | Grijs |
| Font family | `--font` | Systeemlettertype |
