# Architectuur: YIM Verwachte Personen

## Componentenhiërarchie

```text
App.vue
├── VerwachtePersonenView.vue
    ├── AppHeader.vue (hamburger + logo + user/taal; sidebar schuift in van links zonder overlay)
    │
    ├── PageHeader.vue
    │   ├── InstellingenMenu (custom dropdown — geen SplitButton)
    │   │   └── KolomInstellingenPanel.vue (popover, position: absolute)
    │   └── BaseButton + ActionMenu (Nieuwe registratie)
    │
    ├── FilterStrip.vue
    │   ├── TypeTabs.vue (Alle / Bezoekers / Contractors — met counts)
    │   ├── LocatieFilterChip.vue (Hoofdkantoor Sh. ▾)
    │   ├── DateFilterChip.vue (Vandaag ▾)
    │   ├── FilterChip.vue (Status ▾)
    │   ├── FilterChip.vue (Compliance ▾)
    │   ├── FilterChip.vue (Parkeren ▾)
    │   └── SearchBox.vue
    │
    ├── DataTable.vue
    │   ├── ColumnFilters.vue (filterrij per kolom: tekst, dropdown, datum of tijd)
    │   ├── TableRow.vue (per persoon)
    │   │   ├── ActionMenu.vue
    │   │   ├── StatusDot.vue
    │   │   ├── PassStatusDot.vue
    │   │   ├── ComplianceCell.vue
    │   │   └── CompliancePill.vue
    │   └── Pagination.vue
    │
    ├── DetailPanel.vue (gecentreerde modal 860px; sections: Bezoekgegevens, Credential, Compliance, Contactpersoon + footer-acties per status)
    │
    ├── AanmeldenModal.vue (check-in / check-out bevestiging)
    ├── AnnulerenModal.vue (destructieve bevestiging)
    │
    └── ToastContainer.vue
        └── Toast.vue
│
└── DossierView.vue
```

## Dataflow

```text
┌─────────────────────────────────────────────────────────────────┐
│                         Pinia Store                              │
│  ┌─────────────┐  ┌─────────────────────────┐  ┌──────────────┐  ┌───────────────┐ │
│  │ personenStore│  │       filterStore        │  │ columnStore  │  │navigationStore│ │
│  │             │  │                         │  │              │  │
│  │ - personen  │  │ - datum / datumPreset    │  │-visibleColumns│  │
│  │ - loading   │  │ - status[]              │  │- savedSets   │  │
│  │ - error     │  │ - compliance[]          │  │-DEFAULT_VISIBLE│ │
│  │             │  │ - parkeren              │  │-LOCKED_COLUMNS│  │
│  │             │  │ - persoontype           │  │              │  │
│  │             │  │ - search                │  │              │  │
│  │             │  │ - columnFilters {}      │  │              │  │
│  │             │  │ - sortKey / sortDir     │  │              │  │
│  │             │  │ - page / pageSize       │  │              │  │
│  └──────┬──────┘  └──────┬──────────────────┘  └──────┬───────┘  │
└─────────┼────────────────────────────────────────────────────┘
          │
          ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Composables                                 │
│  ┌─────────────────┐  ┌──────────────────┐ │
│  │  usePersonen()  │  │   useToast()     │ │
│  │                 │  │                  │ │
│  │ - filtered      │  │ - show(type,...) │ │
│  │ - sorted        │  │ - dismiss(id)    │ │
│  │ - paginated     │  │ - toasts[]       │ │
│  │ - total         │  │                  │ │
│  └────────┬────────┘  └──────────────────┘ │
└───────────┼────────────────────────────────┘
            │
            ▼
┌─────────────────────────────────────────────────────────────────┐
│                        Components                                │
│                                                                  │
│   FilterStrip ──updates──▶ filterStore                          │
│                                                                  │
│   DataTable ◀──reads── usePersonen().paginated                  │
│       │                                                          │
│       └── TableRow                                               │
│              │                                                   │
│              └── @click ──emits──▶ openDetail(person)           │
│                                                                  │
│   DetailPanel ◀──reads── selectedPerson                         │
│       │                                                          │
│       └── Actions ──emits──▶ checkin / checkout / etc.          │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Composables

### usePersonen

Berekent gefilterde, gesorteerde en gepagineerde data op basis van de actieve filterstate in `filterStore`.

| Return | Type | Beschrijving |
|--------|------|--------------|
| `personen` | `Ref<Person[]>` | Ruwe lijst uit `personenStore` |
| `filtered` | `ComputedRef<Person[]>` | Gefilterd op datum, persoontype, status, compliance, parkeren, zoekterm en kolomfilters |
| `sorted` | `ComputedRef<Person[]>` | Gesorteerd op `filterStore.sortKey` / `sortDir`; tiebreaker `aankomsttijd` bij sortering op `datumVanaf` |
| `paginated` | `ComputedRef<Person[]>` | Gefilterd + gesorteerd, gepagineerd op `page` × `pageSize` |
| `total` | `ComputedRef<number>` | Aantal gefilterde rijen |
| `loading` | `ComputedRef<boolean>` | Doorsturen van `personenStore.loading` |

**Filtervolgorde:** datum → persoontype → status → compliance → parkeren → zoekterm → kolomfilters

### useToast

Module-level singleton — `toasts` ref is gedeeld tussen alle componenten die `useToast()` aanroepen.

| Export | Type | Beschrijving |
|--------|------|--------------|
| `toasts` | `Ref<{id, title, message}[]>` | Actieve toasts |
| `show(title, message?)` | `function` | Toont neutral toast; auto-dismiss na 4s |
| `dismiss(id)` | `function` | Sluit toast direct |

Zie [Toast.md](docs/components/Toast.md) voor de volledige Toast / ToastContainer documentatie.

## State Management (Pinia)

### personenStore

| State / Actie | Type | Beschrijving |
|---|---|---|
| `personen` | `Ref<Person[]>` | Alle personen |
| `loading` | `Ref<boolean>` | Laadstatus |
| `error` | `Ref<string\|null>` | Foutmelding |
| `fetch()` | `async function` | Laad `MOCK_PERSONEN`; klont `parkeren` object per persoon |
| `updateStatus(id, status)` | `function` | Update status met validatie (VALID_TRANSITIONS); zet `checkinTime` bij `Aangemeld`, `checkoutTime` bij `Afgemeld` |
| `updateCredentialStatus(id, credentialStatus)` | `function` | Update `credentialStatus` van één persoon |
| `activeerCredential(id, opts)` | `function` | Zet credential actief met type, pasnummer, geldigheid en duur |
| `ontkoppelCredential(id)` | `function` | Reset credential naar niet-actief, wist type/pasnummer/geldigheid |
| `updateAankomst(id, datum, aankomsttijd, vertrekdatum, vertrektijd)` | `function` | Update aankomst- en vertrekgegevens |

### filterStore

| State / Actie | Type | Beschrijving |
|---|---|---|
| `datum` | `Ref<Date>` | Geselecteerde filterdatum (default: vandaag) |
| `datumPreset` | `Ref<string>` | `'vandaag'` \| `'morgen'` \| `'week'` |
| `locatie` | `Ref<string\|null>` | Actief locatiefilter (default: `'Hoofdkantoor Sh.'`); synct naar `columnFilters.locaties` via watcher |
| `status` | `Ref<string[]>` | Actieve statusfilters |
| `compliance` | `Ref<string[]>` | Actieve compliance-filters |
| `parkeren` | `Ref<string\|null>` | Parkerenfilter |
| `persoontype` | `Ref<string\|null>` | Actief tab-type |
| `search` | `Ref<string>` | Zoekterm |
| `page` | `Ref<number>` | Huidige pagina |
| `pageSize` | `Ref<number>` | Rijen per pagina (default: 20) |
| `columnFilters` | `Ref<object>` | `{ [key]: value }` — `datumVanaf` gesynchroniseerd met `datum` via watcher; preset `week` verwijdert `datumVanaf` kolomfilter |
| `sortKey` | `Ref<string>` | Sorteerkolom (default: `'datumVanaf'`) |
| `sortDir` | `Ref<string>` | `'asc'` \| `'desc'` |
| `reset()` | `function` | Reset filters; `sortKey` en `sortDir` worden **niet** gereset |

### columnStore

| State / Actie | Type | Beschrijving |
|---|---|---|
| `visibleColumns` | `Ref<string[]>` | Zichtbare kolom keys (altijd inclusief `LOCKED_COLUMNS`) |
| `savedSets` | `Ref<object[]>` | Opgeslagen sets (persisted in localStorage: `yim-column-sets`) |
| `DEFAULT_VISIBLE` | `string[]` | Standaard zichtbare kolommen |
| `LOCKED_COLUMNS` | `string[]` | Altijd zichtbaar: `['naam']` |
| `applyColumns(keys)` | `function` | Stel zichtbare kolommen in (`LOCKED_COLUMNS` altijd aanwezig) |
| `saveSet(name)` | `function` | Sla huidige selectie op als benoemde set |
| `applySet(setItem)` | `function` | Laad een opgeslagen set |
| `resetToDefault()` | `function` | Herstel `visibleColumns` naar `DEFAULT_VISIBLE` |

`visibleColumns` is de enige source of truth voor kolomzichtbaarheid in `DataTable`.

### navigationStore

| State / Actie | Type | Beschrijving |
|---|---|---|
| `currentPage` | `Ref<string>` | Actieve pagina (`'verwachte-personen'` \| `'dossier'`) |
| `currentPerson` | `Ref<Person\|null>` | Persoon voor dossier-weergave |
| `returnPage` | `Ref<string\|null>` | Vorige pagina (voor terug-navigatie) |
| `navigate(page, person?)` | `function` | Navigeer naar pagina; slaat returnPage op; scrollt naar top |
| `goBack()` | `function` | Terug naar vorige pagina; wist currentPerson |

State wordt gepersisteerd in `sessionStorage` (`yim-nav`).

## Performance Overwegingen

1. **Horizontale scroll** — `overflow-x: auto` op de tabel-wrapper; vaste breedte per kolom
2. **Debounce search** — 300ms debounce op zoek-input
3. **Memoization** — Gebruik `computed` voor afgeleide data, niet methods
4. **Virtual scrolling** — Bij 1000+ rijen, overweeg `vue-virtual-scroller`

## Testing

Prototype bevat geen tests. Bij productie-implementatie: Vitest voor unit tests, Playwright voor E2E.
