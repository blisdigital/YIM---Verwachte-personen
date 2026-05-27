<script setup>
import { ref, watch, onBeforeUnmount } from 'vue'
import DatePickerCalendar from '@/components/ui/DatePickerCalendar.vue'
import { isoToDisplay } from '@/utils/dateFormat'

const props = defineProps({
  modelValue: { type: String, default: '' }, // ISO: YYYY-MM-DD
  label:      { type: String, default: null },
  required:   { type: Boolean, default: false },
  id:         { type: String, default: null },
})
const emit = defineEmits(['update:modelValue'])

const open        = ref(false)
const triggerRef  = ref(null)
const popoverRef  = ref(null)
const popoverStyle = ref({})

// ── Positie berekenen ────────────────────────────────────────
const CAL_HEIGHT = 320 // conservatieve schatting kalender hoogte
const CAL_WIDTH  = 280

function reposition() {
  if (!triggerRef.value) return
  const rect  = triggerRef.value.getBoundingClientRect()
  const popW  = Math.max(rect.width, CAL_WIDTH)
  const spaceBelow = window.innerHeight - rect.bottom - 8
  const goAbove    = spaceBelow < CAL_HEIGHT && rect.top > CAL_HEIGHT

  let left = rect.left
  if (left + popW > window.innerWidth - 8) left = window.innerWidth - popW - 8

  popoverStyle.value = {
    top:   goAbove ? `${rect.top - CAL_HEIGHT - 4}px` : `${rect.bottom + 4}px`,
    left:  `${left}px`,
    width: `${popW}px`,
  }
}

function toggle() {
  if (open.value) { open.value = false; return }
  reposition()
  open.value = true
}

function onSelect(iso) {
  emit('update:modelValue', iso)
  open.value = false
}

// ── Click-outside sluiten ────────────────────────────────────
function onMousedown(e) {
  if (triggerRef.value?.contains(e.target)) return
  if (popoverRef.value?.contains(e.target)) return
  open.value = false
}

watch(open, (val) => {
  if (val) document.addEventListener('mousedown', onMousedown)
  else     document.removeEventListener('mousedown', onMousedown)
})

onBeforeUnmount(() => document.removeEventListener('mousedown', onMousedown))

const displayDate = isoToDisplay
</script>

<template>
  <div class="fdf">
    <label v-if="label" class="fdf-label" :for="id">
      {{ label }}<span v-if="required" class="fdf-req"> *</span>
    </label>

    <button
      ref="triggerRef"
      type="button"
      :id="id"
      class="fdf-trigger"
      :class="{ 'fdf-trigger--open': open }"
      @click="toggle"
    >
      <span class="fdf-value" :class="{ 'fdf-placeholder': !modelValue }">
        {{ displayDate(modelValue) || 'DD-MM-JJJJ' }}
      </span>
      <div class="fdf-icon">
        <span class="mi">today</span>
      </div>
    </button>

    <!-- Floating kalender via Teleport — valt buiten modal DOM -->
    <Teleport to="body">
      <div
        v-if="open"
        ref="popoverRef"
        class="fdf-popover"
        :style="popoverStyle"
      >
        <DatePickerCalendar
          :model-value="modelValue"
          @update:model-value="onSelect"
        />
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.fdf {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}

.fdf-label {
  font-size: 14px;
  font-weight: 600;
  color: var(--n900);
  line-height: 20px;
  letter-spacing: 0.14px;
}

.fdf-req { color: var(--err); }

.fdf-trigger {
  display: flex;
  align-items: stretch;
  width: 100%;
  border: 1px solid var(--n400);
  border-radius: var(--r-s);
  overflow: hidden;
  background: var(--n0);
  cursor: pointer;
  padding: 0;
  height: 40px;
  box-sizing: border-box;
  transition: border-color 0.15s;
  font-family: var(--font);
}
.fdf-trigger:hover,
.fdf-trigger--open { border-color: var(--p500); }
.fdf-trigger:focus-visible { outline: 2px solid var(--p500); outline-offset: 2px; }

.fdf-value {
  flex: 1;
  padding: 8px 12px;
  font-size: 14px;
  color: var(--n900);
  line-height: 20px;
  text-align: left;
  white-space: nowrap;
}
.fdf-placeholder { color: var(--n500); }

.fdf-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  background: var(--n50);
  border-left: 1px solid var(--n400);
  flex-shrink: 0;
}
.fdf-icon .mi { font-size: 24px; color: var(--n700); }
</style>

<!-- Popover styles: niet scoped want via Teleport buiten component DOM -->
<style>
.fdf-popover {
  position: fixed;
  background: var(--n0);
  border: 1px solid var(--n300);
  border-radius: var(--r-s);
  box-shadow: var(--shadow-m);
  padding: 12px;
  z-index: 1100;
  box-sizing: border-box;
}
</style>
