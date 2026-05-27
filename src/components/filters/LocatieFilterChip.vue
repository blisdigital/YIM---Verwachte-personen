<script setup>
import { ref, computed, watch } from 'vue'
import { usePersonenStore } from '@/stores/personenStore'

const props = defineProps({
  modelValue: { type: String, default: null },
})
const emit = defineEmits(['update:modelValue'])

const store = usePersonenStore()
const open = ref(false)
const chipRef = ref(null)
const dropdownRef = ref(null)
const dropPos = ref({ top: 0, right: 0 })

const locaties = computed(() => {
  const set = new Set()
  store.personen.forEach(p => {
    if (p.locaties) p.locaties.forEach(l => set.add(l))
  })
  return [...set].sort((a, b) => a.localeCompare(b, 'nl'))
})

const chipLabel = computed(() => props.modelValue || 'Locatie')
const isActive = computed(() => !!props.modelValue)

let rafId = null

watch(open, (isOpen) => {
  if (isOpen) {
    function loop() {
      if (dropdownRef.value && chipRef.value) {
        const rect = chipRef.value.getBoundingClientRect()
        dropdownRef.value.style.top = (rect.bottom + 4) + 'px'
        dropdownRef.value.style.right = (document.documentElement.clientWidth - rect.right) + 'px'
      }
      rafId = requestAnimationFrame(loop)
    }
    loop()
  } else {
    cancelAnimationFrame(rafId)
    rafId = null
  }
}, { flush: 'post' })

function toggleOpen(event) {
  if (!open.value) {
    const rect = event.currentTarget.getBoundingClientRect()
    dropPos.value = { top: rect.bottom + 4, right: document.documentElement.clientWidth - rect.right }
  }
  open.value = !open.value
}

function select(loc) {
  emit('update:modelValue', loc === props.modelValue ? null : loc)
  open.value = false
}

function clear() {
  emit('update:modelValue', null)
  open.value = false
}
</script>

<template>
  <div class="chip-wrap">
    <button
      ref="chipRef"
      :class="['filter-chip', { 'filter-chip--active': isActive, 'filter-chip--open': open }]"
      @click="toggleOpen"
    >
      <span class="chip-label">{{ chipLabel }}</span>
      <span class="mi chip-icon">{{ open ? 'arrow_drop_up' : 'arrow_drop_down' }}</span>
    </button>

    <Teleport to="body">
      <template v-if="open">
        <div class="click-away" @click="open = false" />
        <div
          ref="dropdownRef"
          class="loc-dropdown"
          :style="{ top: dropPos.top + 'px', right: dropPos.right + 'px' }"
        >
          <button
            v-if="modelValue"
            class="loc-option loc-option--clear"
            @click="clear"
          >
            Alle locaties
          </button>
          <button
            v-for="loc in locaties"
            :key="loc"
            :class="['loc-option', { 'loc-option--selected': loc === modelValue }]"
            @click="select(loc)"
          >
            <span class="loc-text">{{ loc }}</span>
          </button>
        </div>
      </template>
    </Teleport>
  </div>
</template>

<style scoped>
.chip-wrap {
  position: relative;
}

.filter-chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px 4px 12px;
  border: 1px solid var(--n400);
  border-radius: var(--r-s);
  background: var(--n0);
  font-family: var(--font);
  font-size: 14px;
  font-weight: 600;
  color: var(--n800);
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.15s;
  height: 40px;
  letter-spacing: 0.14px;
  line-height: 20px;
}
.filter-chip:hover { border-color: var(--p500); }

.filter-chip--active {
  background: var(--p50);
  border-color: var(--p700);
  color: var(--p700);
}

.filter-chip--open {
  background: var(--n100);
  border-color: var(--n700);
  color: var(--n900);
}

.chip-label {
  max-width: 180px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.chip-icon {
  width: 24px;
  text-align: center;
  flex-shrink: 0;
}

.loc-dropdown {
  position: fixed;
  z-index: 300;
  background: var(--n0);
  border-radius: var(--r-s);
  box-shadow: var(--shadow-m);
  padding: 4px;
  min-width: 200px;
  max-height: 320px;
  overflow-y: auto;
}

.loc-option {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 8px 12px;
  border: none;
  background: none;
  cursor: pointer;
  border-radius: var(--r-s);
  font-family: var(--font);
  font-size: 14px;
  font-weight: 600;
  color: var(--n800);
  letter-spacing: 0.14px;
  line-height: 20px;
  white-space: nowrap;
  text-align: left;
}
.loc-option:hover { background: var(--n100); }

.loc-option--selected {
  color: var(--p700);
  background: var(--p50);
}

.loc-option--clear {
  color: var(--n600);
  border-bottom: 1px solid var(--n200);
  border-radius: var(--r-s) var(--r-s) 0 0;
  margin-bottom: 2px;
}

.loc-text {
  flex: 1;
}

.click-away {
  position: fixed;
  inset: 0;
  z-index: 290;
}
</style>
