import { defineStore } from 'pinia'
import { ref } from 'vue'

// Columns always visible, cannot be hidden by user
const LOCKED_COLUMNS = ['naam']

const DEFAULT_VISIBLE = [
  'naam',
  'vip', 'persoontype', 'contractortype', 'bedrijf', 'locaties',
  'datumVanaf', 'aankomsttijd', 'status', 'passtatus', 'compliance',
  'parkeren', 'contactpersoon', 'bezoekreden',
]

const LS_KEY = 'yim-column-sets'

function withLocked(keys) {
  return [...new Set([...LOCKED_COLUMNS, ...keys])]
}

export const useColumnStore = defineStore('columns', () => {
  const visibleColumns = ref([...DEFAULT_VISIBLE])
  const savedSets = ref(loadSavedSets())

  function loadSavedSets() {
    try {
      return JSON.parse(localStorage.getItem(LS_KEY) || '[]')
    } catch {
      return []
    }
  }

  function applyColumns(keys) {
    visibleColumns.value = withLocked(keys)
  }

  function saveSet(name) {
    const set = {
      id: Date.now().toString(),
      name,
      columns: [...visibleColumns.value],
      createdAt: new Date().toISOString(),
    }
    savedSets.value = [...savedSets.value, set]
    localStorage.setItem(LS_KEY, JSON.stringify(savedSets.value))
    return set
  }

  function applySet(setItem) {
    visibleColumns.value = withLocked(setItem.columns)
  }

  function resetToDefault() {
    visibleColumns.value = [...DEFAULT_VISIBLE]
  }

  return { visibleColumns, savedSets, DEFAULT_VISIBLE, LOCKED_COLUMNS, applyColumns, saveSet, applySet, resetToDefault }
})
