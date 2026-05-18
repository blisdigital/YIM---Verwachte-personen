import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

function todayFormatted() {
  const now = new Date()
  const d = String(now.getDate()).padStart(2, '0')
  const m = String(now.getMonth() + 1).padStart(2, '0')
  return `${d}-${m}-${now.getFullYear()}`
}

export const useFilterStore = defineStore('filters', () => {
  const datum = ref(new Date())
  const datumPreset = ref('vandaag')
  const status = ref([])
  const compliance = ref([])
  const parkeren = ref(null)
  const persoontype = ref(null)
  const search = ref('')
  const page = ref(1)
  const pageSize = ref(20)
  const columnFilters = ref({ datumVanaf: todayFormatted() })
  const sortKey = ref('datumVanaf')
  const sortDir = ref('asc')

  // Sync datumVanaf column filter with the FilterStrip date preset
  watch([datum, datumPreset], ([newDatum, newPreset]) => {
    if (newPreset === 'week') {
      // Week range — clear single-date column filter
      const updated = { ...columnFilters.value }
      delete updated.datumVanaf
      columnFilters.value = updated
    } else if (newDatum) {
      const d = String(newDatum.getDate()).padStart(2, '0')
      const m = String(newDatum.getMonth() + 1).padStart(2, '0')
      columnFilters.value = { ...columnFilters.value, datumVanaf: `${d}-${m}-${newDatum.getFullYear()}` }
    }
  })

  function reset() {
    datum.value = new Date()
    datumPreset.value = 'vandaag'
    status.value = []
    compliance.value = []
    parkeren.value = null
    persoontype.value = null
    search.value = ''
    page.value = 1
    columnFilters.value = { datumVanaf: todayFormatted() }
  }

  return { datum, datumPreset, status, compliance, parkeren, persoontype, search, page, pageSize, columnFilters, sortKey, sortDir, reset }
})
