# Detail Components

## DetailPanel

Modal die gecentreerd in het scherm verschijnt bij klik op een tabelrij. Toont alle gegevens van een persoon en biedt directe acties. Wordt afgedekt door een semi-transparante overlay; klikken op de overlay sluit het paneel.

```vue
<DetailPanel
  :person="selectedPerson"
  :open="detailOpen"
  @close="detailOpen = false"
  @action="handleAction"
/>
```

| Prop | Type | Default | Beschrijving |
|------|------|---------|--------------|
| `person` | `Person \| null` | `null` | Persoon om te tonen |
| `open` | `boolean` | `false` | Paneel zichtbaar |

**Events:**
- `@close` — Sluitknop of overlay geklikt
- `@action` — Actieknop ingedrukt (`{ person, action: string }`)

### Structuur

```
┌──────────────────────────────────────────────┐  ← 860px breed, gecentreerd
│ Sophie van der Berg ★  [Bekijk dossier] [✕]  │  ← panel-header
│ Bezoeker • CleanPro Services BV              │
├──────────────────────────────────────────────┤
│ Bezoekgegevens                               │  ↑
│ ┌────────────────────────────────────────┐   │
│ │ Status          ● Verwacht             │   │  panel-body
│ │ Datum           08/06/2026 (vandaag)   │   │  overflow-y: auto
│ │ Aankomsttijd    13:00                  │   │
│ │ Vertrektijd     14:00                  │   │
│ │ Locatie(s)      [Hoofdkantoor Shell]   │   │
│ │ VIP             ★                      │   │
│ │ Telefoonnummer  (+31) 6 239021203      │   │
│ │ E-mailadres     s.vanderberg@x.nl      │   │
│ └────────────────────────────────────────┘   │
│ Compliance                                   │
│ ┌────────────────────────────────────────┐   │
│ │ Dossier     ✓ Dossier compleet         │   │
│ │ E-learning  ✓ E-learning geldig en     │   │
│ │               behaald                  │   │
│ └────────────────────────────────────────┘   │
│ Contactpersoon                               │
│ ┌────────────────────────────────────────┐   │
│ │ Naam contactpersoon  Mark Dekker       │   │
│ │ Telefoonnummer       (+31) 6 12235678  │   │
│ │ E-mailadres          m.dekker@x.nl [✉] │   │
│ └────────────────────────────────────────┘   │
│ Credential                                   │
│ ┌────────────────────────────────────────┐   │
│ │ Credential type   QR-code              │   │
│ │ Status            ● Niet gekoppeld     │   │
│ │ Credential nummer -                    │   │
│ └────────────────────────────────────────┘   │  ↓
├──────────────────────────────────────────────┤
│ [Persoon annuleren] [Aankomst wijzigen]       │
│              [Credential koppelen] [Persoon aanmelden ↑] │
└──────────────────────────────────────────────┘
```

### Paneel layout

| Eigenschap | Waarde |
|------------|--------|
| Breedte | `860px` |
| Max-hoogte | `90vh` |
| Positie | `fixed; top: 50%; left: 50%; transform: translate(-50%, -50%)` |
| Border-radius | `var(--r-m)` (8px) |
| Z-index | `600` (boven overlay `590`) |
| Achtergrond | `var(--n0)` |
| Shadow | `var(--shadow-m)` — `0px 4px 16px -2px rgba(17,19,19,0.16)` |

**Overlay:** `position: fixed; inset: 0; background: rgba(0,0,0,0.2); z-index: 590`

**Transitie:** `<Transition name="panel">` — fade + lichte opwaartse beweging (`translateY 8px`) bij openen/sluiten

### Header

- Naam: `24px / 700 var(--p700)`, line-height: 32px, letter-spacing: -0.12px — met `star`-icoon (24px, `var(--vip-border)`) rechts van naam als VIP
- Subtitel: `14px / 600 var(--p500)`, line-height: 20px, letter-spacing: 0.14px — formaat: `persoontype • bedrijf`
- Header-rechts: `<BaseButton variant="outlined" size="md">Bekijk dossier</BaseButton>` + `<IconButton icon="close" size="lg">` (48×48px, `border-radius: 360px`, ghost)
- Header-border-bottom: `1px solid var(--n400)`
- Header-padding: `16px`

### Secties (panel-body)

Elke sectie bevat een sectietitel + een info-list kaart. Secties gescheiden door `1px solid var(--n300)` border-bottom. Padding per sectie: `8px 16px 16px`.

**Sectietitel:** `14px / 600 var(--p700)`, line-height: 20px, letter-spacing: 0.14px — **niet** uppercase

**Info-list kaart:**
- `border: 1px solid var(--p100)`, `border-radius: var(--r-s)`, `overflow: hidden`
- Elke rij: `background: var(--p50)`, `border-bottom: 1px solid var(--p100)`, `padding: 8px 16px`, `gap: 16px`
- Laatste rij geen border-bottom

**Rijopbouw:**
- Label: `width: 318px, flex-shrink: 0`, `14px / 600 var(--p700)`, letter-spacing: 0.14px
- Waarde: `14px / 400 var(--n800)`, `flex: 1`

| Sectie | Rijen | Conditioneel |
|--------|-------|--------------|
| Bezoekgegevens | Status, Datum, Aankomsttijd, Vertrektijd, Locatie(s), VIP, Telefoonnummer, E-mailadres | Vertrektijd alleen als `vertrekTijd` gevuld; VIP-rij alleen als `vip === true`; Telefoon/email alleen als veld bestaat |
| Compliance | Dossier, E-learning | — |
| Contactpersoon | Naam contactpersoon, Telefoonnummer, E-mailadres | Telefoon/email alleen als veld bestaat |
| Credential | Credential type, Status, Credential nummer | Credential type + nummer alleen als gevuld |

**Speciale rij-elementen:**

- **Status-rij (Bezoekgegevens):** StatusDot 12px + label — kleuren en labels conform `status`-schema in `StatusDot`
- **Datum-rij:** tekst `DD/MM/YYYY` + suffix `(vandaag)` wanneer datum = vandaag. Bron: `datumVanaf`
- **Aankomsttijd / Vertrektijd:** tekst `HH:mm`. Bron: `aankomsttijd` / `vertrekTijd`
- **Locatie chips:** witte pills per locatie — `bg: var(--n0)`, `border: 1px solid var(--n300)`, `border-radius: var(--r-s)`, `padding: 4px 8px`, `14px / 600 var(--n800)`
- **VIP-rij:** `star` Material Icon 20px in `var(--vip-border)`
- **Telefoonnummer (Bezoekgegevens):** klikbare `tel:`-link, blauw (`var(--info)`), SemiBold — **geen** icon button
- **E-mailadres (Bezoekgegevens):** klikbare `mailto:`-link, blauw (`var(--info)`), SemiBold, underlined — **geen** icon button
- **Compliance rijen:** icon 20px + tekst; `check_circle` groen (`var(--ok)`) bij ok, `warning` oranje (`var(--warn)`) bij niet ok, `remove_circle_outline` grijs bij niet-vereist
  - E-learning ok-label: `"E-learning geldig en behaald"`
- **Telefoonnummer (Contactpersoon):** klikbare `tel:`-link, blauw (`var(--info)`), SemiBold, underlined — **geen** icon button
- **E-mailadres (Contactpersoon):** klikbare `mailto:`-link, blauw (`var(--info)`), SemiBold, underlined + `<IconButton icon="email" size="sm">` rechts in de rij (bg: `var(--n0)`, border: `var(--n400)`, `border-radius: var(--r-s)`, padding: 8px, icon 16px)
- **Credential status-dot:** 12px cirkel + label — gebruikt `credentialStatus`-veld; 'niet-actief' toont als grijs (`var(--n500)`) + label `"Niet gekoppeld"`; overige states conform `PassStatusDot`

### Footer

Layout: `display: flex; justify-content: space-between; align-items: center; gap: 8px; padding: 16px; border-top: 1px solid var(--n400)`

Footer-knoppen: `<BaseButton>` zonder iconen, `size="md"`. Twee groepen:

| Groep | Inhoud | Variant |
| --- | --- | --- |
| Links (`footer-left`) | Persoon annuleren *(rood)*, Aankomst wijzigen | `outlined` — annuleren met `color: var(--err)`, `border-color: var(--err)` |
| Rechts (`footer-right`) | Credential koppelen, primaire actie | `outlined` / `filled` voor primaire actie |

**Per status:**

| Status | Links | Rechts |
|--------|-------|--------|
| Verwacht / Nog niet aangekomen | Persoon annuleren *(rood)*, Aankomst wijzigen | Credential printen/koppelen *(conditioneel, disabled bij non-compliant)*, **Persoon aanmelden** *(disabled bij non-compliant)* |
| Aangemeld | — | Credential printen/koppelen of ontkoppelen *(conditioneel)*, **Persoon afmelden** |
| Niet aangekomen | Persoon annuleren *(rood)*, Aankomst wijzigen | Credential printen/koppelen *(conditioneel, disabled bij non-compliant)*, **Persoon aanmelden** *(disabled bij non-compliant)* |
| Afgemeld / Geannuleerd | — | — *(geen footer)* |

**Credential-knoppen condities:**

- **Credential printen** — `credentialType === 'QR-code'` én `credentialStatus === 'niet-actief'`; disabled bij non-compliant (Verwacht/Nog niet aangekomen/Niet aangekomen)
- **Credential koppelen** — `credentialType !== null && credentialType !== 'QR-code'` én `credentialStatus === 'niet-actief'`; disabled bij non-compliant
- **QR-code ontkoppelen / Credential ontkoppelen** — `credentialType !== null` én `credentialStatus !== 'niet-actief'`; label afhankelijk van type
- **Persoon aanmelden** — disabled bij non-compliant
- **Persoon afmelden** — Aangemeld status; altijd enabled (compliance al gepasseerd bij inchecken)

**Compliance blokkering:**

Persoon is *niet compliant* als `dossier === 'onvolledig'` OF `elearning === 'niet-behaald'`. In dat geval worden "Credential printen/koppelen" en "Persoon aanmelden" disabled gerenderd (`BaseButton :disabled="true"`).

**Compliance teksten:**

- Dossier onvolledig: `"Dossier niet compleet: [dossierMissing.join(', ')]."`
- E-learning niet geldig: `"E-learning niet geldig."`

> "Bekijk dossier" staat niet langer in de footer maar als `outlined` knop in de **header** (altijd zichtbaar, statusinafhankelijk).

### Data model — nieuwe velden

Naast het bestaande model zijn de volgende velden toegevoegd:

| Veld | Type | Beschrijving |
|------|------|--------------|
| `vertrekTijd` | `string \| null` | Geplande vertrektijd `HH:mm` (zelfde datum als `datumVanaf`) |
| `contactEmail` | `string \| null` | E-mailadres contactpersoon |
| `credentialType` | `string \| null` | Type credential (bijv. `"QR-code"`, `"Bezoekerspas"`, `"Contractorpas"`) |
| `pasnummer` | `string \| null` | Credential nummer — UI-label: `"Credential nummer"` |

> **Verwijderd uit UI:** de Parkeerplaats-rij en Parkeren-sectie verschijnen niet meer in het detail panel. Parkeervelden blijven in het datamodel maar worden niet getoond.
