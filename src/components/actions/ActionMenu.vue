<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  person: { type: Object, required: true }
})
const emit = defineEmits(['action'])

const open = ref(false)
const menuRef = ref(null)
const btnRef = ref(null)
const menuStyle = ref({})

const actions = computed(() => {
  const status = props.person.status
  if (status === 'Verwacht') return [
    { value: 'inchecken', label: 'Inchecken' },
    { value: 'pas-koppelen', label: 'Pas koppelen' },
    { value: 'no-show', label: 'No-show' },
    { value: 'annuleren', label: 'Annuleren', danger: true },
    { divider: true },
    { value: 'bekijk-dossier', label: 'Bekijk dossier' },
    { value: 'contact-opnemen', label: 'Contact opnemen' },
    { value: 'bel-contactpersoon', label: 'Bel contactpersoon' },
  ]
  if (status === 'Aangekomen') return [
    { value: 'uitchecken', label: 'Uitchecken' },
    { value: 'pas-ontkoppelen', label: 'Pas ontkoppelen' },
    { value: 'pas-printen', label: 'Pas printen' },
    { divider: true },
    { value: 'bel-persoon', label: 'Bel persoon' },
    { value: 'bekijk-dossier', label: 'Bekijk dossier' },
    { value: 'contactpersoon-informeren', label: 'Contactpersoon informeren' },
  ]
  if (status === 'No-show') return [
    { value: 'no-show-ongedaan', label: 'No-show ongedaan maken' },
    { value: 'inchecken', label: 'Inchecken' },
    { value: 'pas-koppelen', label: 'Pas koppelen' },
    { value: 'annuleren', label: 'Annuleren', danger: true },
    { divider: true },
    { value: 'bel-persoon', label: 'Bel persoon' },
    { value: 'bekijk-dossier', label: 'Bekijk dossier' },
    { value: 'contactpersoon-informeren', label: 'Contactpersoon informeren' },
  ]
  // Geannuleerd / Vertrokken — no divider
  return [
    { value: 'bel-persoon', label: 'Bel persoon' },
    { value: 'bekijk-dossier', label: 'Bekijk dossier' },
    { value: 'contactpersoon-informeren', label: 'Contactpersoon informeren' },
  ]
})

function openMenu() {
  open.value = true
  // Position the menu to stay in viewport
  setTimeout(() => {
    if (!menuRef.value || !btnRef.value) return
    const btnRect = btnRef.value.getBoundingClientRect()
    const menuRect = menuRef.value.getBoundingClientRect()
    const vw = window.innerWidth
    const vh = window.innerHeight

    let top = btnRect.bottom + 4
    let left = btnRect.left

    if (left + 266 > vw) left = btnRect.right - 266
    if (top + menuRect.height > vh) top = btnRect.top - menuRect.height - 4

    menuStyle.value = {
      position: 'fixed',
      top: `${top}px`,
      left: `${left}px`,
      zIndex: 400,
    }
  }, 0)
}

function select(action) {
  if (action.divider) return
  open.value = false
  emit('action', { person: props.person, action: action.value })
}

function onClickAway(e) {
  if (!open.value) return
  if (!menuRef.value?.contains(e.target) && !btnRef.value?.contains(e.target)) {
    open.value = false
  }
}

onMounted(() => document.addEventListener('click', onClickAway))
onBeforeUnmount(() => document.removeEventListener('click', onClickAway))
</script>

<template>
  <div class="action-menu-wrap">
    <button
      ref="btnRef"
      class="action-trigger"
      @click.stop="openMenu"
      aria-label="Acties"
    >
      <span class="mi">more_horiz</span>
    </button>

    <Teleport to="body">
      <div v-if="open" ref="menuRef" class="action-dropdown" :style="menuStyle">
        <template v-for="(item, i) in actions" :key="i">
          <div v-if="item.divider" class="action-divider"></div>
          <button
            v-else
            :class="['action-item', { 'action-item-danger': item.danger }]"
            @click="select(item)"
          >
            {{ item.label }}
          </button>
        </template>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.action-menu-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-trigger {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: none;
  border: none;
  border-radius: var(--r-s);
  color: var(--n700);
  cursor: pointer;
  transition: background 0.15s;
}
.action-trigger:hover { background: var(--n100); color: var(--n900); }

.action-dropdown {
  background: var(--n0);
  border: none;
  border-radius: var(--r-s);
  box-shadow: 0px 4px 16px -2px rgba(17, 19, 19, 0.16);
  min-width: 266px;
  overflow: hidden;
  padding: 16px 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.action-divider {
  height: 1px;
  background: var(--n300);
  margin: 0;
  flex-shrink: 0;
}

.action-item {
  display: block;
  width: 100%;
  padding: 4px 16px;
  background: none;
  border: none;
  font-family: Nunito, var(--font), sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: var(--p700);
  cursor: pointer;
  text-align: left;
  transition: background 0.1s;
  line-height: 24px;
  letter-spacing: 0.16px;
  height: 32px;
}
.action-item:hover { background: var(--n50); }

.action-item-danger { color: var(--err); }
.action-item-danger:hover { background: var(--err-bg); }
</style>
