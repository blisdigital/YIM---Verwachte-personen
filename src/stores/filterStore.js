import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFilterStore = defineStore('filters', () => {
  const datum = ref(new Date())
  const datumPreset = ref('vandaag')
  const status = ref([])
  const compliance = ref([])
  const parkeren = ref(null)
  const persoontype = ref(null)
  const search = ref('')
  const page = ref(1)
  const pageSize = ref(10)
  const columnFilters = ref({})
  const sortKey = ref('aankomsttijd')
  const sortDir = ref('asc')

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
  }

  return { datum, datumPreset, status, compliance, parkeren, persoontype, search, page, pageSize, columnFilters, sortKey, sortDir, reset }
})
