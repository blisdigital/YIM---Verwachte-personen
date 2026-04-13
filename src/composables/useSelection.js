import { ref, computed } from 'vue'

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
