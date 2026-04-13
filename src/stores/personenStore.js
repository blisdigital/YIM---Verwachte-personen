import { defineStore } from 'pinia'
import { ref } from 'vue'
import { MOCK_PERSONEN } from '@/data/mockPersonen'

export const usePersonenStore = defineStore('personen', () => {
  const personen = ref([])
  const loading = ref(false)
  const error = ref(null)

  async function fetch() {
    loading.value = true
    try {
      personen.value = MOCK_PERSONEN.map(p => ({ ...p, parkeren: { ...p.parkeren } }))
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
    if (person) {
      person.passtatus = passtatus
    }
  }

  return { personen, loading, error, fetch, updateStatus, updatePassStatus }
})
