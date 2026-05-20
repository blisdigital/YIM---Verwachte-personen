import { defineStore } from 'pinia'
import { ref } from 'vue'
import { MOCK_PERSONEN } from '@/data/mockPersonen'

export const usePersonenStore = defineStore('personen', () => {
  const personen = ref(MOCK_PERSONEN.map(p => ({ ...p, parkeren: { ...p.parkeren } })))
  const loading = ref(false)
  const error = ref(null)

  async function fetch() {
    personen.value = MOCK_PERSONEN.map(p => ({ ...p, parkeren: { ...p.parkeren } }))
  }

  function updateStatus(id, status) {
    const person = personen.value.find(p => p.id === id)
    if (person) {
      person.status = status
      if (status === 'Aangemeld') {
        person.checkinTime = new Date().toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' })
      }
      if (status === 'Afgemeld') {
        person.checkoutTime = new Date().toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' })
      }
    }
  }

  function updateCredentialStatus(id, credentialStatus) {
    const person = personen.value.find(p => p.id === id)
    if (person) {
      person.credentialStatus = credentialStatus
      if (credentialStatus === 'actief' && !person.pasnummer) {
        person.pasnummer = String(Math.floor(10000000000000 + Math.random() * 89999999999999))
      }
      if (credentialStatus === 'niet-actief') {
        person.pasnummer = null
      }
    }
  }

  function updateAankomst(id, datum, aankomsttijd, vertrektijd) {
    const person = personen.value.find(p => p.id === id)
    if (person) {
      person.datumVanaf   = datum
      person.aankomsttijd = aankomsttijd
      person.vertrekTijd  = vertrektijd ?? null
    }
  }

  return { personen, loading, error, fetch, updateStatus, updateCredentialStatus, updateAankomst }
})
