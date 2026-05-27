import { defineStore } from 'pinia'
import { ref } from 'vue'

const SESSION_KEY = 'yim-nav'

function loadSession() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function saveSession(page, person, returnPage) {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({ page, person, returnPage }))
  } catch {}
}

export const useNavigationStore = defineStore('navigation', () => {
  const session = loadSession()

  const currentPage = ref(session?.page ?? 'verwachte-personen')
  const currentPerson = ref(session?.person ?? null)
  const returnPage = ref(session?.returnPage ?? null)

  function navigate(page, person = null) {
    returnPage.value = currentPage.value
    currentPage.value = page
    currentPerson.value = person
    saveSession(page, person, returnPage.value)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  function goBack() {
    currentPage.value = returnPage.value || 'verwachte-personen'
    currentPerson.value = null
    returnPage.value = null
    saveSession(currentPage.value, null, null)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  return { currentPage, currentPerson, returnPage, navigate, goBack }
})
