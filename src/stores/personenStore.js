import { defineStore } from 'pinia'
import { ref } from 'vue'
import { MOCK_PERSONEN } from '@/data/mockPersonen'

// Geldige statusovergangen — elke status mapt naar de statussen waar hij naartoe mag.
const VALID_TRANSITIONS = {
  'Verwacht':             ['Aangemeld', 'Niet aangekomen', 'Geannuleerd'],
  'Nog niet aangekomen':  ['Aangemeld', 'Geannuleerd'],
  'Aangemeld':            ['Afgemeld'],
  'Afgemeld':             [],
  'Niet aangekomen':      [],
  'Geannuleerd':          [],
}

export const usePersonenStore = defineStore('personen', () => {
  const personen = ref(MOCK_PERSONEN.map(p => ({ ...p, parkeren: { ...p.parkeren } })))
  const loading = ref(false)
  const error = ref(null)

  async function fetch() {
    personen.value = MOCK_PERSONEN.map(p => ({ ...p, parkeren: { ...p.parkeren } }))
  }

  function updateStatus(id, status) {
    const person = personen.value.find(p => p.id === id)
    if (!person) return false

    const allowed = VALID_TRANSITIONS[person.status] ?? []
    if (!allowed.includes(status)) {
      console.warn(`[personenStore] Ongeldige statusovergang: ${person.status} → ${status} (persoon ${id})`)
      return false
    }

    person.status = status
    if (status === 'Aangemeld') {
      person.checkinTime = new Date().toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' })
    }
    if (status === 'Afgemeld') {
      person.checkoutTime = new Date().toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' })
    }
    return true
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

  function activeerCredential(id, { credentialType, pasnummer, geldigVan, geldigTot, duur }) {
    const person = personen.value.find(p => p.id === id)
    if (person) {
      person.credentialStatus    = 'actief'
      person.credentialType      = credentialType
      person.pasnummer           = pasnummer || String(Math.floor(10000000000000 + Math.random() * 89999999999999))
      person.credentialGeldigVan = geldigVan ?? null
      person.credentialGeldigTot = geldigTot ?? null
      person.credentialDuur      = duur ?? null
    }
  }

  function ontkoppelCredential(id) {
    const person = personen.value.find(p => p.id === id)
    if (person) {
      person.credentialStatus    = 'niet-actief'
      person.credentialType      = null
      person.pasnummer           = null
      person.credentialGeldigVan = null
      person.credentialGeldigTot = null
      person.credentialDuur      = null
    }
  }

  function updateAankomst(id, datum, aankomsttijd, vertrekdatum, vertrektijd) {
    const person = personen.value.find(p => p.id === id)
    if (person) {
      person.datumVanaf    = datum
      person.aankomsttijd  = aankomsttijd
      person.vertrekDatum  = vertrekdatum ?? datum
      person.vertrekTijd   = vertrektijd ?? null
    }
  }

  return { personen, loading, error, fetch, updateStatus, updateCredentialStatus, activeerCredential, ontkoppelCredential, updateAankomst }
})
