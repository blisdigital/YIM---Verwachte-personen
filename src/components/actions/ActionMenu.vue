<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import moreIconDefault from '../../assets/icons/more-icon-default.svg'
import moreIconActive from '../../assets/icons/more-icon-active.svg'

const props = defineProps({
  person: { type: Object, required: true }
})
const emit = defineEmits(['action'])

const open = ref(false)
const hovered = ref(false)
const menuRef = ref(null)
const btnRef = ref(null)
const menuStyle = ref({})

// Credential types that are printable (QR-code based). All other non-null types are physical.
const PRINTABLE_CREDENTIAL_TYPES = new Set(['QR-code'])

const credentialAction = computed(() => {
  const type = props.person.credentialType
  if (!type) return null
  if (PRINTABLE_CREDENTIAL_TYPES.has(type)) {
    return { value: 'credential-printen', label: 'Credential printen' }
  }
  // Physical: ontkoppelen als al gekoppeld, anders koppelen
  if (props.person.credentialStatus === 'actief') {
    return { value: 'credential-ontkoppelen', label: 'Credential ontkoppelen' }
  }
  return { value: 'credential-koppelen', label: 'Credential koppelen' }
})

const actions = computed(() => {
  const status = props.person.status
  const credItems = credentialAction.value ? [credentialAction.value] : []

  if (status === 'Verwacht' || status === 'Nog niet aangekomen') return [
    { value: 'persoon-aanmelden', label: 'Persoon aanmelden' },
    ...credItems,
    { value: 'aankomst-wijzigen', label: 'Aankomst wijzigen' },
    { value: 'persoon-annuleren', label: 'Persoon annuleren', danger: true },
    { divider: true },
    { value: 'informeer-contactpersoon', label: 'Informeer contactpersoon' },
    { value: 'bekijk-dossier', label: 'Bekijk dossier' },
    { value: 'bel-persoon', label: 'Bel persoon' },
  ]
  if (status === 'Aangemeld') return [
    ...credItems,
    { value: 'persoon-afmelden', label: 'Persoon afmelden' },
    { divider: true },
    { value: 'informeer-contactpersoon', label: 'Informeer contactpersoon' },
    { value: 'bekijk-dossier', label: 'Bekijk dossier' },
    { value: 'bel-persoon', label: 'Bel persoon' },
  ]
  if (status === 'Niet aangekomen') return [
    { value: 'niet-aangekomen-ongedaan', label: 'Niet aangekomen ongedaan' },
    { value: 'persoon-aanmelden', label: 'Persoon aanmelden' },
    ...credItems,
    { value: 'aankomst-wijzigen', label: 'Aankomst wijzigen' },
    { value: 'persoon-annuleren', label: 'Persoon annuleren', danger: true },
    { divider: true },
    { value: 'informeer-contactpersoon', label: 'Informeer contactpersoon' },
    { value: 'bekijk-dossier', label: 'Bekijk dossier' },
    { value: 'bel-persoon', label: 'Bel persoon' },
  ]
  // Geannuleerd / Afgemeld
  return [
    { value: 'informeer-contactpersoon', label: 'Informeer contactpersoon' },
    { value: 'bekijk-dossier', label: 'Bekijk dossier' },
    { value: 'bel-persoon', label: 'Bel persoon' },
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
      :class="['action-trigger', { 'is-active': open }]"
      @click.stop="openMenu"
      @mouseenter="hovered = true"
      @mouseleave="hovered = false"
      aria-label="Acties"
    >
      <img :src="(open || hovered) ? moreIconActive : moreIconDefault" class="more-icon" alt="" />
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
  cursor: pointer;
  padding: 0;
}

.more-icon {
  width: 32px;
  height: 32px;
  display: block;
}

.action-dropdown {
  background: var(--n0);
  border: none;
  border-radius: var(--r-s);
  box-shadow: var(--shadow-m);
  width: max-content;
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
  font-family: var(--font);
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
