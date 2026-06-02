# CredentialActiverenModal

Multi-scenario dialoog voor het activeren of koppelen van een credential aan een persoon. Gebouwd op `<ActionPopup>`. Ondersteunt drie scenario's op basis van `person.credentialOpties`: printbaar (A), fysiek (B), of keuze (C). Bevat een sub-modal (`CredentialMailenModal`) voor het mailen van printbare credentials.

## Relaties
- **Gebruikt door:** VerwachtePersonenView
- **Gebruikt:** ActionPopup, BaseButton, InputField, FormDateField, CustomSelect, CredentialMailenModal

## Gebruik
```vue
<CredentialActiverenModal
  v-model:open="showActiveren"
  :person="activePerson"
  @confirm="handleCredentialActiveren"
/>
```

## Props
| Prop | Type | Default | Beschrijving |
|------|------|---------|-------------|
| `open` | `boolean` | `false` | Zichtbaarheid (v-model:open) |
| `person` | `Person \| null` | `null` | Persoon waarvoor de credential geactiveerd wordt. Moet `credentialOpties` array bevatten. |

## Events
| Event | Payload | Beschrijving |
|-------|---------|-------------|
| `update:open` | `boolean` | Modal sluiten |
| `confirm` | A: `{ person, credentialType }` / B: `{ person, credentialType, pasnummer, periode, datumVanaf, datumTotEnMet }` | Credential is geactiveerd of gekoppeld |

## Inhoud

### Scenario A — Printbaar

Credentialnummer (InputField, verplicht), Datum vanaf + tot en met (FormDateField), optioneel Accessoires.
**Footer:** Annuleren + Mailen (outlined) + Printen (outlined) + Activeren (filled).

### Scenario B — Fysiek

Credentialnummer (InputField, verplicht), Periode (segmented: Permanent/Tijdelijk), Datum vanaf (verplicht), optioneel Datum tot en met, optioneel Accessoires.
**Footer:** Annuleren + Koppelen (filled).

### Scenario C — Keuze (2 stappen)

**Stap 1:** Select-dropdown. **Stap 2:** Formulier van A of B.

## Gedrag

### Scenario routing

| Conditie | Scenario | Titel |
|----------|----------|-------|
| 1 optie met `categorie === 'printbaar'` | **A** | "Credential activeren" |
| 1 optie met `categorie === 'fysiek'` | **B** | "Credential koppelen" |
| Meerdere opties | **C** | Dynamisch |
| Geen opties | **B** | "Credential koppelen" (fallback) |

### Validatie

| Computed | Conditie |
|----------|----------|
| `canMailOrPrint` | Scenario A + credentialnummer + datumVanaf + datumTotEnMet ingevuld |
| `canActivate` | `canMailOrPrint` + credential is gemaild of geprint |
| `canKoppelen` | Scenario B + credentialnummer + datumVanaf + (permanent of datumTotEnMet ingevuld) |

### Overig gedrag
- Formuliervelden reset bij sluiten.
- Scenario C "Terug" keert naar stap 1.
- Modal breedte: 560px. Backdrop sluit niet.
- Sub-modal `CredentialMailenModal` opent bij "Mailen" in scenario A.
- Gebruikt `useToast()` voor print/mail-feedback.

## Design Tokens
| Element | Token | Waarde |
|---------|-------|--------|
| Intro tekst kleur | `--n800` | Donker grijs |
| Veld label kleur | `--n900` | Bijna zwart |
| Verplicht-ster kleur | `--err` | Rood |
| Select achtergrond | `--n0` | Wit |
| Select rand | `--n400` | Grijs |
| Select rand focus | `--p500` | Teal |
| Readonly select achtergrond | `--n50` | Licht grijs |
| Segmented knop actief | `--p500` bg, `--n0` tekst | Teal |
| Segmented knop inactief tekst | `--n800` | Donker grijs |
| Accessoire box achtergrond | `--p50` | Licht teal |
| Accessoire box rand | `--p100` | Teal licht |
