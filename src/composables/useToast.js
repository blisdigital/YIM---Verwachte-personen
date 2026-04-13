import { ref } from 'vue'

const toasts = ref([])

export function useToast() {
  function show(type, title, message) {
    const id = Date.now()
    toasts.value.push({ id, type, title, message })
    setTimeout(() => {
      toasts.value = toasts.value.filter(t => t.id !== id)
    }, 4000)
  }

  function dismiss(id) {
    toasts.value = toasts.value.filter(t => t.id !== id)
  }

  return { toasts, show, dismiss }
}
