# Architectuur: YIM Verwachte Personen

## Componentenhiërarchie

```
App.vue
└── VerwachtePersonenView.vue
    ├── AppHeader.vue (hamburger + logo + user/taal; sidebar schuift in van links zonder overlay)
    │
    ├── PageHeader.vue
    │   ├── InstellingenMenu (custom dropdown — geen SplitButton)
    │   │   └── KolomInstellingenPanel.vue (popover, position: absolute)
    │   └── SplitButton.vue (Nieuwe registratie)
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
    ├── DetailPanel.vue (slide-out, nog nader te specificeren)
    │
    ├── CheckinModal.vue
    │
    └── ToastContainer.vue
        └── Toast.vue
```

## Dataflow

```
┌─────────────────────────────────────────────────────────────────┐
│                         Pinia Store                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌──────────────┐  │
│  │ personenStore│  │ filterStore │  │selectionStore│  │ columnStore  │  │
│  │             │  │             │  │             │  │              │  │
│  │ - personen  │  │ - datum     │  │ - selected  │  │-visibleColumns│  │
│  │ - loading   │  │ - status[]  │  │ - selectAll │  │- savedSets   │  │
│  │ - error     │  │ - persoontype│  │             │  │-DEFAULT_VISIBLE│ │
│  │             │  │ - compliance[]│ │             │  │-LOCKED_COLUMNS│  │
│  │             │  │ - parkeren  │  │             │  │              │  │
│  │             │  │ - search    │  │             │  │              │  │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └──────┬───────┘  │
└─────────┼────────────────┼────────────────┼─────────────────────┘
          │                │                │
          ▼                ▼                ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Composables                                 │
│  ┌─────────────────┐  ┌─────────────────┐                       │
│  │  usePersonen()  │  │  useSelection() │                       │
│  │                 │  │                 │                       │
│  │ - filtered      │  │ - toggle()      │                       │
│  │ - sorted        │  │ - selectAll()   │                       │
│  │ - paginated     │  │ - clearAll()    │                       │
│  └────────┬────────┘  └────────┬────────┘                       │
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
│       └── TableRow ──emits──▶ selectionStore.toggle()           │
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

    // Zoekterm (naam, bedrijf, personeelsnr, referentie)
    if (filterStore.search) {
      result = result.filter(p => matchesSearch(p, filterStore.search))
    }

    return result
  })

  // Computed: gesorteerd
  const sorted = computed(() => {
    return [...filtered.value].sort((a, b) => {
      // Default: sorteer op aankomsttijd
      return a.aankomsttijd.localeCompare(b.aankomsttijd)
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
  const selected = ref<Set<number>>(new Set())

  function toggle(id: number) {
    if (selected.value.has(id)) {
      selected.value.delete(id)
    } else {
      selected.value.add(id)
    }
  }

  function selectAll(ids: number[]) {
    ids.forEach(id => selected.value.add(id))
  }

  function clearAll() {
    selected.value.clear()
  }

  function isSelected(id: number) {
    return selected.value.has(id)
  }

  return {
    selected: computed(() => [...selected.value]),
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
export function useToast() {
  const toasts = ref<Toast[]>([])

  function show(type: 'ok' | 'err' | 'warn' | 'info', title: string, message?: string) {
    const id = Date.now()
    toasts.value.push({ id, type, title, message })

    setTimeout(() => {
      toasts.value = toasts.value.filter(t => t.id !== id)
    }, 4000)
  }

  return { toasts, show }
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

  function updateStatus(id: number, status: Person['status']) {
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

  return { personen, loading, error, fetch, updateStatus }
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

  function reset() {
    datum.value = new Date()
    datumPreset.value = 'vandaag'
    status.value = []
    compliance.value = []
    parkeren.value = null
    persoontype.value = null
    search.value = ''
    page.value = 1
  }

  return {
    datum, datumPreset,
    status, compliance, parkeren,
    persoontype,
    search,
    page, pageSize,
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
