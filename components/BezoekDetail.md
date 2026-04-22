# Detail Components

## DetailPanel

Slide-out paneel dat rechts van het scherm inschuift bij klik op een tabelrij. Toont alle gegevens van een persoon en biedt directe acties. Wordt afgedekt door een semi-transparante overlay; klikken op de overlay sluit het paneel.

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
┌─────────────────────────────────────┐  ← 480px breed, position: fixed right 0
│ [Avatar]  Naam       [Status] [✕]  │  ← panel-header (flex-shrink: 0)
│           Bedrijf                   │
├─────────────────────────────────────┤
│ BEZOEKGEGEVENS                      │  ↑
│  Persoontype    Bezoeker            │
│  Locatie(s)     Hoofdkantoor...     │  panel-body
│  Datum          14-04-2026          │  overflow-y: auto
│  Aankomsttijd   09:00               │
│  Ingecheckt om  09:04  ← groen      │
│  Bezoekreden    ...                 │
│  Personeelsnr.  P0000002393 (mono)  │
├─────────────────────────────────────┤
│ TOEGANGSPAS                         │
│  ● Gekoppeld                        │
├─────────────────────────────────────┤
│ COMPLIANCE                          │
│  ✓ Dossier  ▲ E-learning           │
├─────────────────────────────────────┤
│ PARKEREN                            │
│  Nodig        Ja                   │
│  Gereserveerd Ja                   │
│  Parkeerplaats P-12                 │
├─────────────────────────────────────┤
│ CONTACTPERSOON                      │
│  Naam    Jan de Vries               │
│  Telefoon 06-12345678  ← tel: link  │  ↓
├─────────────────────────────────────┤
│ [Inchecken ↑]  [Pas koppelen]       │  ← panel-footer (flex-shrink: 0)
│ [Bekijk dossier]  [Bel contactpersoon] │
└─────────────────────────────────────┘
```

### Paneel layout

| Eigenschap | Waarde |
|------------|--------|
| Breedte | `480px` |
| Positie | `fixed; top: 0; right: 0; bottom: 0` |
| Z-index | `600` (boven overlay `590`) |
| Achtergrond | `var(--n0)` |
| Shadow | `-4px 0 24px rgba(0,0,0,0.12)` |

**Overlay:** `position: fixed; inset: 0; background: rgba(0,0,0,0.2); z-index: 590`

**Transitie:** `<Transition name="panel">` — `transform: translateX(100%)` bij sluiten (schuift naar rechts)

### Header

- Avatar: 44×44px, `border-radius: 50%`, initialen (eerste letter van elke naamsdeel, max 2)
  - Normaal: `background: var(--p500)`, `color: var(--n0)`
  - VIP: `background: var(--vip-bg)`, `color: var(--vip)`, `border: 2px solid var(--vip-border)`
- Naam: `16px / 700`, `var(--n900)` — met `star`-icoon (16px, `var(--vip-border)`) als VIP
- Bedrijf: `14px`, `var(--n700)`
- Sluitknop: `<IconButton variant="ghost" size="md" icon="close" aria-label="Sluiten" />`

### Secties (panel-body)

Elke sectie heeft een titel in `11px / 700 uppercase var(--n700) letter-spacing: 0.5px`, gevolgd door content. Secties worden gescheiden door een `1px` divider (`var(--n300)`).

| Sectie | Content |
|--------|---------|
| Bezoekgegevens | Label-waarde grid: persoontype, contractortype (indien contractor), locaties, datum, aankomsttijd, ingecheckt om (groen), uitgecheckt om, bezoekreden, personeelsnr (monospace) |
| Toegangspas | `<PassStatusDot>` |
| Compliance | `<ComplianceCell>` |
| Parkeren | Nodig, gereserveerd, parkeerplaats (indien aanwezig) |
| Contactpersoon | Naam, telefoon als klikbare `tel:`-link |

**Info-grid:**
- Label: `12px / 600`, `var(--n700)`, `min-width: 130px`
- Waarde: `14px`, `var(--n900)`
- Ingecheckt-waarde: `color: var(--ok); font-weight: 600`

### Acties (panel-footer)

Primaire acties (buttons) en secundaire acties (ghost links) worden computed op basis van `person.status`:

| Status | Primaire acties | Secundaire acties |
|--------|----------------|-------------------|
| Verwacht | Inchecken (primary), Pas koppelen (outlined) | Bekijk dossier, Bel contactpersoon |
| Aangekomen | Uitchecken (primary), Pas printen (outlined) | Bekijk dossier, Bel contactpersoon |
| No-show | Inchecken (primary), Ongedaan maken (outlined) | Bekijk dossier, Bel contactpersoon |
| Vertrokken / Geannuleerd | — | Bekijk dossier, Bel contactpersoon |

Primaire acties: `display: flex; gap: 8px; flex-wrap: wrap`
Secundaire acties: `display: flex; gap: 4px; flex-wrap: wrap` (ghost, size sm)

Acties emiten `{ person, action: string }` omhoog naar `VerwachtePersonenView`, die vervolgens `handleAction()` aanroept (zelfde handler als `ActionMenu`).
