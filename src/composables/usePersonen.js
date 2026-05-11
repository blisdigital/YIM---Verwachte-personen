import { computed } from 'vue'
import { usePersonenStore } from '@/stores/personenStore'
import { useFilterStore } from '@/stores/filterStore'

export function usePersonen() {
  const store = usePersonenStore()
  const filterStore = useFilterStore()

  const filtered = computed(() => {
    let result = store.personen

    // Datum filter
    if (filterStore.datum) {
      const filterDate = filterStore.datum
      const fd = String(filterDate.getDate()).padStart(2, '0')
      const fm = String(filterDate.getMonth() + 1).padStart(2, '0')
      const fy = filterDate.getFullYear()
      const formatted = `${fd}-${fm}-${fy}`

      if (filterStore.datumPreset === 'week') {
        // Show whole week (Mon-Sun)
        const start = new Date(filterDate)
        start.setDate(start.getDate() - ((start.getDay() + 6) % 7))
        const end = new Date(start)
        end.setDate(end.getDate() + 6)
        result = result.filter(p => {
          const [dd, mm, yyyy] = p.datumVanaf.split('-').map(Number)
          const d = new Date(yyyy, mm - 1, dd)
          return d >= start && d <= end
        })
      } else {
        result = result.filter(p => p.datumVanaf === formatted)
      }
    }

    // 'Bezoeker' → exact match; 'Contractor' → alle niet-Bezoeker types
    if (filterStore.persoontype) {
      if (filterStore.persoontype === 'Contractor') {
        result = result.filter(p => p.persoontype !== 'Bezoeker')
      } else {
        result = result.filter(p => p.persoontype === filterStore.persoontype)
      }
    }

    if (filterStore.status.length) {
      result = result.filter(p => filterStore.status.includes(p.status.toLowerCase()))
    }

    if (filterStore.compliance.length) {
      result = result.filter(p => {
        return filterStore.compliance.some(c => {
          if (c === 'dossier-volledig') return p.dossier === 'compleet'
          if (c === 'dossier-onvolledig') return p.dossier === 'onvolledig'
          if (c === 'elearning-voltooid') return p.elearning === 'behaald'
          if (c === 'elearning-niet-voltooid') return p.elearning === 'niet-behaald'
          return true
        })
      })
    }

    if (filterStore.parkeren !== null) {
      result = result.filter(p => p.parkeren.gereserveerd === (filterStore.parkeren === 'gereserveerd'))
    }

    if (filterStore.search) {
      const q = filterStore.search.toLowerCase()
      result = result.filter(p =>
        p.naam.toLowerCase().includes(q) ||
        p.bedrijf.toLowerCase().includes(q) ||
        p.personeelsnr.toLowerCase().includes(q) ||
        p.bezoekreden.toLowerCase().includes(q)
      )
    }

    // Column filters
    const cf = filterStore.columnFilters
    Object.entries(cf).forEach(([key, val]) => {
      if (!val || val === '' || val === 'Alle') return
      result = result.filter(p => {
        const pval = p[key]
        if (pval === null || pval === undefined) return false
        if (Array.isArray(pval)) return pval.some(v => v.toLowerCase().includes(val.toLowerCase()))
        if (typeof pval === 'boolean') {
          if (key === 'vip') return val === 'Ja' ? pval : !pval
          return true
        }
        return String(pval).toLowerCase().includes(val.toLowerCase())
      })
    })

    return result
  })

  function parseDatum(v) {
    const [d, m, y] = String(v).split('-')
    return `${y}-${m}-${d}`
  }

  const sorted = computed(() => {
    const key = filterStore.sortKey
    const dir = filterStore.sortDir
    return [...filtered.value].sort((a, b) => {
      let av = a[key] ?? ''
      let bv = b[key] ?? ''
      if (typeof av === 'boolean') av = av ? 1 : 0
      if (typeof bv === 'boolean') bv = bv ? 1 : 0
      if (key === 'datumVanaf') {
        av = parseDatum(av)
        bv = parseDatum(bv)
      }
      let cmp = String(av).localeCompare(String(bv), 'nl')
      if (cmp === 0 && key === 'datumVanaf') {
        cmp = String(a.aankomsttijd ?? '').localeCompare(String(b.aankomsttijd ?? ''), 'nl')
      }
      return dir === 'asc' ? cmp : -cmp
    })
  })

  const paginated = computed(() => {
    const start = (filterStore.page - 1) * filterStore.pageSize
    return sorted.value.slice(start, start + filterStore.pageSize)
  })

  const counts = computed(() => ({
    alle: store.personen.length,
    bezoekers: store.personen.filter(p => p.persoontype === 'Bezoeker').length,
    contractors: store.personen.filter(p => p.persoontype !== 'Bezoeker').length,
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
