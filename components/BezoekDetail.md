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
┌──────────────────────────────────────────┐  ← 832px breed, gecentreerd
│ Sophie van der Berg ★   [Verwacht] [✕]  │  ← panel-header
│ Bezoeker | P0000002393 | CleanPro BV     │
├──────────────────────────────────────────┤
│ Bezoekgegevens                           │  ↑
│ ┌──────────────────────────────────────┐ │
│ │ Aankomstdatum en -tijd  Vandaag ...  │ │  panel-body
│ │ Vertrekdatum en -tijd   Vandaag ...  │ │  overflow-y: auto
│ │ Locatie(s)  [chip] [chip]            │ │
│ │ VIP         ★                        │ │
│ │ Parkeerplaats  00-AAB-11             │ │
│ │ Telefoonnummer  06-xxx  [☎]          │ │
│ │ E-mailadres     x@x.nl  [✉]          │ │
│ └──────────────────────────────────────┘ │
│ Compliance                               │
│ ┌──────────────────────────────────────┐ │
│ │ Dossier     ✓ Dossier compleet       │ │
│ │ E-learning  ✓ E-learning behaald     │ │
│ └──────────────────────────────────────┘ │
│ Contactpersoon                           │
│ ┌──────────────────────────────────────┐ │
│ │ Naam contactpersoon  Mark Dekker     │ │
│ │ Telefoonnummer  06-xxx  [☎]          │ │
│ │ E-mailadres     x@x.nl  [✉]          │ │
│ └──────────────────────────────────────┘ │
│ Toegangspas                              │
│ ┌──────────────────────────────────────┐ │
│ │ Credential type  Bezoekerspas        │ │
│ │ Pasnummer        00001240230232      │ │
│ │ Status           ● Gekoppeld         │ │
│ └──────────────────────────────────────┘ │  ↓
├──────────────────────────────────────────┤
│ [Annuleren] [No-show]   [Dossier] [Pas koppelen] [Inchecken ↑] │
└──────────────────────────────────────────┘
```

### Paneel layout

| Eigenschap | Waarde |
|------------|--------|
| Breedte | `832px` |
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
- Subtitel: `16px / 400 var(--n700)` — formaat: `persoontype | personeelsnr | bedrijf`
- Header-border-bottom: `1px solid var(--n400)`
- Sluitknop: 40×40px, `border-radius: 360px`, ghost stijl, `close` icon 24px

### Secties (panel-body)

Elke sectie bevat een sectietitel + een info-list kaart. Secties gescheiden door `1px solid var(--n300)` border-bottom. Padding per sectie: `8px 16px 16px`.

**Sectietitel:** `14px / 600 var(--p700)`, line-height: 20px, letter-spacing: 0.14px — **niet** uppercase

**Info-list kaart:**
- `border: 1px solid var(--p100)`, `border-radius: var(--r-s)`, `overflow: hidden`
- Elke rij: `background: var(--p50)`, `border-bottom: 1px solid var(--p100)`, `padding: 8px 16px`, `gap: 16px`
- Laatste rij geen border-bottom

**Rijopbouw:**
- Label: `width: 180px, flex-shrink: 0`, `14px / 600 var(--p700)`, letter-spacing: 0.14px
- Waarde: `14px / 400 var(--n800)`, `flex: 1`

| Sectie | Rijen | Conditioneel |
|--------|-------|--------------|
| Bezoekgegevens | Aankomstdatum en -tijd, Vertrekdatum en -tijd, Locatie(s), VIP, Parkeerplaats, Telefoonnummer, E-mailadres | Vertrekdatum alleen als `vertrekTijd` gevuld; VIP alleen als `vip === true`; Parkeerplaats alleen als `parkeren.plek` gevuld; Telefoon/email alleen als veld bestaat |
| Compliance | Dossier, E-learning | — |
| Contactpersoon | Naam contactpersoon, Telefoonnummer, E-mailadres | Telefoon/email alleen als veld bestaat |
| Toegangspas | Credential type, Pasnummer, Status | Credential type + pasnummer alleen als gevuld |

**Speciale rij-elementen:**

- **Locatie chips:** witte pills per locatie — `bg: var(--n0)`, `border: 1px solid var(--n300)`, `border-radius: var(--r-s)`, `padding: 4px 8px`, `14px / 600 var(--n800)`
- **VIP-rij:** `star` Material Icon 20px in `var(--vip-border)`
- **Telefoon/email rijen:** `action-link` (blauw, underlined, `var(--info)`) + `icon-btn-sm` rechts (bg: `var(--n0)`, hover: `var(--n100)`, r-s, padding: 8px, icon 16px)
- **Compliance rijen:** icon 20px + tekst; `check_circle` groen (`var(--ok)`) bij ok, `warning` oranje (`var(--warn)`) bij niet ok, `remove_circle_outline` grijs bij niet-vereist
- **Passtatus-dot:** 12px cirkel — grijs (`var(--n400)`) / blauw (`var(--info)`) / groen (`var(--ok)`)

**Aankomst/vertrek datetime formattering:**
- Formaat: `"Vandaag DD-MM-YYYY, HH:mm"` als datum = vandaag, anders `"DD-MM-YYYY, HH:mm"`
- Bron: `datumVanaf` + `aankomsttijd` / `vertrekTijd`

### Footer

Layout: `display: flex; justify-content: space-between; align-items: center; gap: 8px; padding: 16px; border-top: 1px solid var(--n400)`

Footer-knoppen: `<BaseButton>` zonder iconen, `size="md"`. Twee groepen:

| Groep | Inhoud | Variant |
|-------|--------|---------|
| Links (`footer-left`) | Persoon annuleren *(rood)*, No-show | `outlined` — annuleren met `color: var(--err)`, `border-color: var(--err)` |
| Rechts (`footer-right`) | Bekijk dossier, Pas koppelen, Persoon inchecken | `outlined` / `filled` voor primaire actie |

**Per status:**

| Status | Links | Rechts |
|--------|-------|--------|
| Verwacht | Annuleren *(rood)*, No-show | Bekijk dossier, Pas koppelen, **Persoon inchecken** (filled) |
| Aangekomen | — | Bekijk dossier, **Uitchecken** (filled) |
| No-show | Annuleren *(rood)* | Bekijk dossier, No-show ongedaan, **Persoon inchecken** (filled) |
| Vertrokken / Geannuleerd | — | Bekijk dossier |

### Data model — nieuwe velden

Naast het bestaande model zijn de volgende velden toegevoegd:

| Veld | Type | Beschrijving |
|------|------|--------------|
| `vertrekTijd` | `string \| null` | Geplande vertrektijd `HH:mm` (zelfde datum als `datumVanaf`) |
| `contactEmail` | `string \| null` | E-mailadres contactpersoon |
| `credentialType` | `string \| null` | Type toegangspas (bijv. `"Bezoekerspas"`, `"Contractorpas"`) |
| `pasnummer` | `string \| null` | Pasnummer (14 cijfers) |

> **Verwijderd uit UI:** de Parkeren-sectie (nodig/gereserveerd) verdwijnt uit het detail panel. `parkeren.plek` blijft zichtbaar als rij in Bezoekgegevens. De overige parkeervelden blijven in het datamodel maar worden niet getoond.
