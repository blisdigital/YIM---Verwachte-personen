# Architectuur: YIM Verwachte Personen

## Componentenhiërarchie

```text
App.vue
└── VerwachtePersonenView.vue
    ├── AppHeader.vue (hamburger + logo + user/taal; sidebar schuift in van links zonder overlay)
    │
    ├── PageHeader.vue
    │   ├── InstellingenMenu (custom dropdown — geen SplitButton)
    │   │   └── KolomInstellingenPanel.vue (popover, position: absolute)
    │   └── BaseButton + ActionMenu (Nieuwe registratie)
    │
    ├── FilterStrip.vue
    │   ├── TypeTabs.vue (Alle / Bezoekers / Contractors — met counts)
    │   ├── DateFilterChip.vue (Vandaag ▾)
    │   ├── FilterChip.vue (Status ▾)
    │   ├── FilterChip.vue (Compliance ▾)
    │   ├── FilterChip.vue (Parkeren ▾)
    │   └── SearchBox.vue
    │
    ├── BulkBar.vue (conditioneel: bij selectie)
    │
    ├── DataTable.vue
    │   ├── ColumnFilters.vue (filterrij per kolom: tekst, dropdown, datum of tijd)
    │   ├── TableRow.vue (per persoon)
    │   │   ├── ActionMenu.vue
    │   │   ├── StatusBadge.vue
    │   │   ├── PassStatusDot.vue
    │   │   ├── ComplianceCell.vue
    │   │   └── CompliancePill.vue
    │   └── Pagination.vue
    │
    ├── DetailPanel.vue (gecentreerde modal 832px; sections: Bezoekgegevens, Compliance, Contactpersoon, Toegangspas + footer-acties per status)
    │
    ├── CheckinModal.vue   (check-in / check-out bevestiging)
    ├── NoShowModal.vue    (no-show registratie met formulier)
    ├── AnnulerenModal.vue (destructieve bevestiging)
    │
    └── ToastContainer.vue
        └── Toast.vue
```

## Dataflow

```text
┌─────────────────────────────────────────────────────────────────┐
│                         Pinia Store                              │
│  ┌─────────────┐  ┌─────────────────────────┐  ┌──────────────┐  │
│  │ personenStore│  │       filterStore        │  │ columnStore  │  │
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
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────────┐ │
│  │  usePersonen()  │  │  useSelection() │  │   useToast()     │ │
│  │                 │  │                 │  │                  │ │
│  │ - filtered      │  │ - toggle()      │  │ - show(type,...) │ │
│  │ - sorted        │  │ - selectAll()   │  │ - dismiss(id)    │ │
│  │ - paginated     │  │ - clearAll()    │  │ - toasts[]       │ │
│  │ - counts        │  │ - isSelected()  │  │                  │ │
│  │ - total         │  │ - count         │  │                  │ │
│  └────────┬────────┘  └────────┬────────┘  └──────────────────┘ │
└───────────┼────────────────────┼────────────────────────────────┘
            │                    │
            ▼                    ▼
┌─────────────────────────────────────────────────────────────────┐
│                        Components                                │
│                                                                  │
│   FilterStrip ──updates──▶ filterStore                          │
│                                                                  │
│   DataTable ◀──reads── usePersonen().paginated                  │
│       │                                                          │
│       └── TableRow ──emits──▶ useSelection().toggle()           │
│              │                                                   │
│              └── @click ──emits──▶ openDetail(person)           │
│                                                                  │
│   DetailPanel ◀──reads── selectedPerson                         │
│       │                                                          │
│       └── Actions ──emits──▶ checkin / checkout / etc.          │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Composables Specificatie

### usePersonen

```javascript
export function usePersonen() {
  const store = usePersonenStore()
  const filterStore = useFilterStore()

  // Computed: gefilterde lijst op basis van alle actieve filters
  const filtered = computed(() => {
    let result = store.personen

    // Datum filter
    if (filterStore.datum) {
      result = result.filter(p => matchesDatum(p, filterStore.datum))
    }

    // Status filter (multi-select)
    if (filterStore.status.length) {
      result = result.filter(p => filterStore.status.includes(p.status))
    }

    // Persoontype filter (Bezoeker/Contractor tab)
    if (filterStore.persoontype) {
      result = result.filter(p => p.persoontype === filterStore.persoontype)
    }

    // Compliance filter (multi-select)
    if (filterStore.compliance.length) {
      result = result.filter(p => matchesCompliance(p, filterStore.compliance))
    }

    // Parkeren filter
    if (filterStore.parkeren !== null) {
      result = result.filter(p => p.parkeren.gereserveerd === (filterStore.parkeren === 'gereserveerd'))
    }

    // Zoekterm (naam, bedrijf, personeelsnr, bezoekreden)
    if (filterStore.search) {
      const q = filterStore.search.toLowerCase()
      result = result.filter(p =>
        p.naam.toLowerCase().includes(q) ||
        p.bedrijf.toLowerCase().includes(q) ||
        p.personeelsnr.toLowerCase().includes(q) ||
        p.bezoekreden.toLowerCase().includes(q)
      )
    }

    // Kolomfilters (filterrij direct onder tabelheaders)
    Object.entries(filterStore.columnFilters).forEach(([key, val]) => {
      if (!val || val === '' || val === 'Alle') return
      result = result.filter(p => {
        const pval = p[key]
        if (pval === null || pval === undefined) return false
        if (Array.isArray(pval)) return pval.some(v => v.toLowerCase().includes(val.toLowerCase()))
        if (key === 'vip') return val === 'Ja' ? pval : !pval
        return String(pval).toLowerCase().includes(val.toLowerCase())
      })
    })

    return result
  })

  // Computed: gesorteerd op basis van filterStore.sortKey en filterStore.sortDir
  const sorted = computed(() => {
    const key = filterStore.sortKey
    const dir = filterStore.sortDir
    return [...filtered.value].sort((a, b) => {
      let av = a[key] ?? ''
      let bv = b[key] ?? ''
      if (typeof av === 'boolean') av = av ? 1 : 0
      if (typeof bv === 'boolean') bv = bv ? 1 : 0
      const cmp = String(av).localeCompare(String(bv), 'nl')
      return dir === 'asc' ? cmp : -cmp
    })
  })

  // Computed: gepagineerd
  const paginated = computed(() => {
    const start = (filterStore.page - 1) * filterStore.pageSize
    return sorted.value.slice(start, start + filterStore.pageSize)
  })

  // Counts per type (voor TypeTabs)
  const counts = computed(() => ({
    alle: store.personen.length,
    bezoekers: store.personen.filter(p => p.persoontype === 'Bezoeker').length,
    contractors: store.personen.filter(p => p.persoontype === 'Contractor').length,
  }))

  return {
    personen: store.personen,
    filtered,
    sorted,
    paginated,
    counts,
    total: computed(() => filtered.value.length),
    loading: computed(() => store.loading),
  }
}
```

### useSelection

```javascript
export function useSelection() {
  const selected = ref(new Set())

  function toggle(id) {
    if (selected.value.has(id)) {
      selected.value.delete(id)
    } else {
      selected.value.add(id)
    }
    selected.value = new Set(selected.value)
  }

  function selectAll(ids) {
    ids.forEach(id => selected.value.add(id))
    selected.value = new Set(selected.value)
  }

  function clearAll() {
    selected.value = new Set()
  }

  function isSelected(id) {
    return selected.value.has(id)
  }

  return {
    selectedIds: computed(() => [...selected.value]),
    count: computed(() => selected.value.size),
    toggle,
    selectAll,
    clearAll,
    isSelected,
  }
}
```

### useToast

```javascript
// toasts is een module-level ref — gedeeld tussen alle componenten die useToast() aanroepen
const toasts = ref([])

export function useToast() {
  function show(type, title, message) {
    // type: 'ok' | 'err' | 'warn' | 'info'
    const id = Date.now()
    toasts.value.push({ id, type, title, message })
    setTimeout(() => {
      toasts.value = toasts.value.filter(t => t.id !== id)
    }, 4000) // auto-dismiss na 4 seconden
  }

  function dismiss(id) {
    toasts.value = toasts.value.filter(t => t.id !== id)
  }

  return { toasts, show, dismiss }
}
```

## State Management (Pinia)

### personenStore

```javascript
export const usePersonenStore = defineStore('personen', () => {
  const personen = ref<Person[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetch() {
    loading.value = true
    try {
      personen.value = MOCK_DATA
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  function updateStatus(id, status) {
    const person = personen.value.find(p => p.id === id)
    if (person) {
      person.status = status
      if (status === 'Aangekomen') {
        person.checkinTime = new Date().toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' })
      }
      if (status === 'Vertrokken') {
        person.checkoutTime = new Date().toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' })
      }
    }
  }

  function updatePassStatus(id, passtatus) {
    const person = personen.value.find(p => p.id === id)
    if (person) person.passtatus = passtatus
  }

  return { personen, loading, error, fetch, updateStatus, updatePassStatus }
})
```

### filterStore

```javascript
export const useFilterStore = defineStore('filters', () => {
  // Datum filter
  const datum = ref<Date>(new Date())
  const datumPreset = ref<'vandaag' | 'morgen' | 'week'>('vandaag')

  // Chip filters (multi-select)
  const status = ref<string[]>([])
  const compliance = ref<string[]>([])   // 'dossier-volledig' | 'dossier-onvolledig' | 'elearning-voltooid' | 'elearning-niet-voltooid'
  const parkeren = ref<'gereserveerd' | 'niet-gereserveerd' | null>(null)

  // TypeTabs
  const persoontype = ref<'Bezoeker' | 'Contractor' | null>(null)

  // Zoekterm
  const search = ref('')

  // Paginering
  const page = ref(1)
  const pageSize = ref(10)

  // Kolomfilters (filterrij in de tabel)
  // LET OP: columnFilters['datumVanaf'] en filterStore.datum zijn gekoppeld.
  // Beide componenten (DateFilterChip en kolomfilter 'datumVanaf') lezen en
  // schrijven naar dezelfde filterStore.datum. Zie DateFilterChip.md en ColumnFilters.md.
  const columnFilters = ref({})  // { [columnKey]: string }

  // Sortering
  const sortKey = ref('datumVanaf')    // default sortering (primair); tiebreaker: aankomsttijd
  const sortDir = ref('asc')           // 'asc' | 'desc'

  function reset() {
    datum.value = new Date()
    datumPreset.value = 'vandaag'
    status.value = []
    compliance.value = []
    parkeren.value = null
    persoontype.value = null
    search.value = ''
    page.value = 1
    columnFilters.value = {}
    // sortKey en sortDir worden NIET gereset — dat is gebruikersvoorkeur
  }

  return {
    datum, datumPreset,
    status, compliance, parkeren,
    persoontype,
    search,
    page, pageSize,
    columnFilters,
    sortKey, sortDir,
    reset
  }
})
```

### columnStore

```javascript
export const useColumnStore = defineStore('columns', () => {
  const LOCKED_COLUMNS = ['naam']          // altijd zichtbaar, niet togglebaar
  const DEFAULT_VISIBLE = [
    'naam',
    'vip', 'persoontype', 'contractortype', 'bedrijf', 'locaties',
    'datumVanaf', 'aankomsttijd', 'status', 'passtatus', 'compliance',
    'parkeren', 'contactpersoon', 'bezoekreden',
  ]

  const visibleColumns = ref([...DEFAULT_VISIBLE])
  const savedSets = ref([])  // localStorage: 'yim-column-sets'

  function withLocked(keys) {
    return [...new Set([...LOCKED_COLUMNS, ...keys])]
  }

  function applyColumns(keys) { visibleColumns.value = withLocked(keys) }
  function saveSet(name) { /* saves current visibleColumns to localStorage */ }
  function applySet(set) { visibleColumns.value = withLocked(set.columns) }
  function resetToDefault() { visibleColumns.value = [...DEFAULT_VISIBLE] }

  return { visibleColumns, savedSets, DEFAULT_VISIBLE, LOCKED_COLUMNS,
           applyColumns, saveSet, applySet, resetToDefault }
})
```

`LOCKED_COLUMNS` worden altijd toegevoegd door `withLocked()`, ook als ze ontbreken in de meegegeven keys. Kolominstellingen worden direct in de store opgeslagen; `visibleColumns` is de enige source of truth voor kolomzichtbaarheid in `DataTable`.

## Performance Overwegingen

1. **Horizontale scroll** — `overflow-x: auto` op de tabel-wrapper; vaste breedte per kolom
2. **Debounce search** — 300ms debounce op zoek-input
3. **Memoization** — Gebruik `computed` voor afgeleide data, niet methods
4. **Virtual scrolling** — Bij 1000+ rijen, overweeg `vue-virtual-scroller`

## Testing

Prototype bevat geen tests. Bij productie-implementatie: Vitest voor unit tests, Playwright voor E2E.
