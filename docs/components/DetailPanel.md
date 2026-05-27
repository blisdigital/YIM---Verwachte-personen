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

## Events

| Event | Payload | Beschrijving |
| --- | --- | --- |
| `close` | — | Sluitknop of overlay geklikt |
| `action` | `{ person: Person, action: string }` | Actieknop ingedrukt (bijv. `'inchecken'`, `'afmelden'`, `'bekijk-dossier'`) |

## Design Tokens

| Element | Token | Waarde |
| --- | --- | --- |
| Paneel achtergrond | `--n0` | `#ffffff` |
| Paneel radius | `--r-m` | `8px` |
| Paneel shadow | `--shadow-m` | `0px 4px 16px -2px rgba(17,19,19,0.16)` |
| Header border | `--n400` | `#b8babb` |
| Header padding | `--sp-l` | `16px` |
| Naam kleur | `--p700` | `#1a7a8a` |
| Subtitel kleur | `--p500` | `#6daeba` |
| VIP ster | `--vip-border` | `#f59e0b` |
| Sectie border | `--n300` | `#eaeced` |
| Info-list border | `--p100` | `#d6e8ec` |
| Info-rij achtergrond | `--p50` | `#f0f7f8` |
| Rij label kleur | `--p700` | `#1a7a8a` |
| Rij waarde kleur | `--n800` | `#3e3f40` |
| Link kleur | `--info` | `#2464bb` |
| Close knop hover | `--n100` | `#f3f4f5` |
| Close knop kleur | `--n700` | `#555657` |
| Compliance ok | `--ok` | `#24bb86` |
| Compliance waarschuwing | `--err` | `#bc243b` |
| Compliance neutraal | `--n400` | `#b8babb` |
| Footer border | `--n400` | `#b8babb` |
| Overlay achtergrond | — | `rgba(0,0,0,0.2)` |
| Locatie chip bg | `--n0` | `#ffffff` |
| Locatie chip border | `--n300` | `#eaeced` |

### Structuur

```
┌──────────────────────────────────────────────┐  ← 860px breed, gecentreerd
│ Sophie van der Berg ★                   [✕]  │  ← panel-header
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
│ │ Credential nummer -                    │   │
│ │ Status            ● Niet actief        │   │
│ └────────────────────────────────────────┘   │  ↓
├──────────────────────────────────────────────┤
│ [Bekijk dossier]     [Credential activeren] [Persoon aanmelden ↑] │
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
- Header-rechts: `<IconButton icon="close" size="lg">` (48×48px, `border-radius: 360px`, ghost)
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
| Credential | Credential type, Credential nummer, Status | Credential type + nummer alleen als gevuld |

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
- **E-mailadres (Contactpersoon):** klikbare `mailto:`-link, blauw (`var(--info)`), SemiBold, underlined + `<IconButton icon="email" size="sm">` rechts in de rij (bg: `var(--n0)`, border: `var(--n400)`, `border-radius: var(--r-s)`, padding: 8px, icon 16px). Klik op dit icon button opent `InformeerContactpersoonModal` **direct op scherm 2** (e-mail opstellen), scherm 1 wordt overgeslagen. Emits action `'informeer-contactpersoon-mail'`.
- **Credential status-dot:** 12px cirkel + label — gebruikt `credentialStatus`-veld; conform `PassStatusDot` kleurmapping en labels

### Footer

Layout: `display: flex; justify-content: space-between; align-items: center; gap: 8px; padding: 16px; border-top: 1px solid var(--n400)`

Footer-knoppen: `<BaseButton>` zonder iconen, `size="md"`. Twee groepen:

| Groep | Inhoud | Variant |
| --- | --- | --- |
| Links (`footer-left`) | Bekijk dossier | `outlined` — altijd zichtbaar |
| Rechts (`footer-right`) | Credential-actie(s), e-learning code, primaire actie | `outlined` / `filled` voor primaire actie |

**Per status:**

| Status | Links | Rechts |
|--------|-------|--------|
| Verwacht / Nog niet aangekomen | Bekijk dossier | Credential activeren *(disabled bij non-compliant)*, E-learning code *(alleen bij elearning niet-behaald)*, **Persoon aanmelden** *(disabled bij non-compliant)* |
| Aangemeld | Bekijk dossier | Credential activeren OF Credential printen + mailen + ontkoppelen *(bij actieve QR-code)* OF Credential ontkoppelen *(bij actieve fysieke pas)*, **Persoon afmelden** |
| Niet aangekomen | Bekijk dossier | Credential activeren *(disabled bij non-compliant)*, E-learning code *(alleen bij elearning niet-behaald)*, **Persoon aanmelden** *(disabled bij non-compliant)* |
| Afgemeld / Geannuleerd | Bekijk dossier | — |

**Credential-knoppen condities:**

- **Credential activeren** — `credentialStatus === 'niet-actief'`; disabled bij non-compliant (Verwacht/Nog niet aangekomen/Niet aangekomen)
- **Credential printen / mailen** — `credentialType === 'QR-code'` én `credentialStatus !== 'niet-actief'`
- **Credential ontkoppelen** — `credentialStatus !== 'niet-actief'`
- **E-learning code** — `elearning === 'niet-behaald'`; opent ElearningUitnodigingModal
- **Persoon aanmelden** — disabled bij non-compliant
- **Persoon afmelden** — Aangemeld status; altijd enabled

**Compliance blokkering:**

Persoon is *niet compliant* als `dossier === 'onvolledig'` OF `elearning === 'niet-behaald'`. In dat geval worden "Credential activeren" en "Persoon aanmelden" disabled gerenderd (`BaseButton :disabled="true"`).

> **Annuleren** is niet beschikbaar in het detail panel. Deze actie is verplaatst naar de dossierpagina.

### Data model — nieuwe velden

Naast het bestaande model zijn de volgende velden toegevoegd:

| Veld | Type | Beschrijving |
|------|------|--------------|
| `vertrekTijd` | `string \| null` | Geplande vertrektijd `HH:mm` (zelfde datum als `datumVanaf`) |
| `contactEmail` | `string \| null` | E-mailadres contactpersoon |
| `credentialType` | `string \| null` | Type credential (bijv. `"QR-code"`, `"Bezoekerspas"`, `"Contractorpas"`) |
| `pasnummer` | `string \| null` | Credential nummer — UI-label: `"Credential nummer"` |

> **Verwijderd uit UI:** de Parkeerplaats-rij en Parkeren-sectie verschijnen niet meer in het detail panel. Parkeervelden blijven in het datamodel maar worden niet getoond.
