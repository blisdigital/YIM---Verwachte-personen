# DetailPanel

Modal die gecentreerd in het scherm verschijnt bij klik op een tabelrij. Toont alle gegevens van een persoon en biedt directe acties. Overlay sluit het paneel bij klik erbuiten.

## Relaties
- **Gebruikt door:** VerwachtePersonenView
- **Gebruikt:** StatusDot, BaseButton, FormDateField, InputField, CustomSelect

## Gebruik

```vue
<DetailPanel
  :person="selectedPerson"
  :open="detailOpen"
  @close="detailOpen = false"
  @action="handleAction"
/>
```

## Props

| Prop | Type | Default | Beschrijving |
|------|------|---------|-------------|
| `person` | `Person \| null` | `null` | Persoon om te tonen |
| `open` | `boolean` | `false` | Paneel zichtbaar |

## Events

| Event | Payload | Beschrijving |
|-------|---------|-------------|
| `close` | — | Sluitknop of overlay geklikt |
| `action` | `{ person, action }` | Actieknop ingedrukt |

## Inhoud

### Structuur

```
┌──────────────────────────────────────────────┐  860px breed, gecentreerd
│ Naam ★                                  [✕]  │  header
│ Persoontype • Bedrijf                        │
├──────────────────────────────────────────────┤
│ Bezoekgegevens  │  Credential                │  panel-body
│ Compliance      │  Contactpersoon            │  (overflow-y: auto)
├──────────────────────────────────────────────┤
│ [Bekijk dossier]  [Credential koppelen] [Aanmelden] │  footer
└──────────────────────────────────────────────┘
```

### Paneel layout

| Eigenschap | Waarde |
|------------|--------|
| Breedte | `860px`, max-hoogte `90vh` |
| Positie | `fixed; top/left 50%; transform: translate(-50%,-50%)` |
| Z-index | `600` (overlay `590`) |

### Secties

| Sectie | Rijen | Conditioneel |
|--------|-------|--------------|
| Bezoekgegevens | Status, Datum, Tijd, Locatie(s), Tel, Email | Tel/email alleen als veld bestaat |
| Credential | Afhankelijk van scenario (printbaar/fysiek/meerdere) | |
| Compliance | Dossier, E-learning | — |
| Contactpersoon | Per contact: Naam, Tel, Email | `[✉]` bij primair → InformeerContactpersoonModal |

### Credential blok — scenario's

**Printbaar:** Type (disabled), Nummer, Geldigheid (2x FormDateField), Status, Accessoires.
**Fysiek:** Type (disabled), Nummer, Periode (Permanent/Tijdelijk), Datum vanaf, Status, Accessoires.
**Meerdere:** Actief dropdown, daarna velden conform printbaar of fysiek.

## Gedrag

- **Footer:** Links "Bekijk dossier" (outlined). Rechts: credential-actie(s), e-learning code, primaire actie.
- **Compliance blokkering:** `dossier === 'onvolledig'` OF `elearning === 'niet-behaald'` → "Credential koppelen" en "Persoon aanmelden" disabled.
- **Annuleren** niet beschikbaar in detail panel (verplaatst naar dossierpagina).

### Data model — nieuwe velden

| Veld | Type | Beschrijving |
|------|------|--------------|
| `vertrekTijd` | `string \| null` | Geplande vertrektijd `HH:mm` |
| `vertrekDatum` | `string \| null` | Vertrekdatum `DD-MM-YYYY` |
| `credentialType` | `string \| null` | Type credential |
| `credentialCategorie` | `'printbaar' \| 'fysiek'` | Bepaalt invoer-scenario |
| `beschikbareCredentials` | `string[] \| null` | Lijst voor scenario 3 |
| `pasnummer` | `string \| null` | 14-cijferig nummer |
| `credentialGeldigVan/Tot` | `string \| null` | Geldigheidsperiode |
| `credentialDuur` | `'permanent' \| 'tijdelijk' \| null` | Duurkeuze fysiek |
| `credentialGeprint` | `boolean` | Of credential al geprint/gemaild is |
| `accessoire` | `string \| null` | Bijv. "Lanyard blauw" |

## Design Tokens

| Element | Token | Waarde |
|---------|-------|--------|
| Paneel achtergrond | `--n0` | `#ffffff` |
| Paneel radius | `--r-m` | `8px` |
| Paneel shadow | `--shadow-m` | `0px 4px 16px -2px rgba(17,19,19,0.16)` |
| Naam kleur | `--p700` | `#1a7a8a` |
| Subtitel kleur | `--p500` | `#6daeba` |
| VIP ster | `--vip-border` | `#f59e0b` |
| Sectie border | `--n300` | `#eaeced` |
| Info-rij achtergrond | `--p50` | `#f0f7f8` |
| Rij label kleur | `--p700` | `#1a7a8a` |
| Rij waarde kleur | `--n800` | `#3e3f40` |
| Link kleur | `--info` | `#2464bb` |
| Compliance ok | `--ok` | `#24bb86` |
| Compliance waarschuwing | `--err` | `#bc243b` |
| Overlay | — | `rgba(0,0,0,0.2)` |
