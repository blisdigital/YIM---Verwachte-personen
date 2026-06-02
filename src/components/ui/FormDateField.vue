<script setup>
import { ref, watch, onBeforeUnmount } from 'vue'
import DatePickerCalendar from '@/components/ui/DatePickerCalendar.vue'
import { isoToDisplay } from '@/utils/dateFormat'

const props = defineProps({
  modelValue: { type: String, default: '' }, // ISO: YYYY-MM-DD
  label:      { type: String, default: null },
  required:   { type: Boolean, default: false },
  id:         { type: String, default: null },
  size:       { type: String, default: 'md' }, // 'sm' (32px) | 'md' (40px)
})
const emit = defineEmits(['update:modelValue'])

const open        = ref(false)
const triggerRef  = ref(null)
const popoverRef  = ref(null)

function toggle() {
  open.value = !open.value
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
      :class="{ 'fdf-trigger--open': open, 'fdf-trigger--sm': size === 'sm' }"
      @click="toggle"
    >
      <span class="fdf-value" :class="{ 'fdf-placeholder': !modelValue }">
        {{ displayDate(modelValue) || 'DD-MM-JJJJ' }}
      </span>
      <div class="fdf-icon">
        <span class="mi">today</span>
      </div>
    </button>

    <!-- Kalender popover — inline, scrollt mee -->
    <div
      v-if="open"
      ref="popoverRef"
      class="fdf-popover"
    >
      <DatePickerCalendar
        :model-value="modelValue"
        @update:model-value="onSelect"
      />
    </div>
  </div>
</template>

<style scoped>
.fdf {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  position: relative;
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

.fdf-trigger--sm {
  height: 32px;
}
.fdf-trigger--sm .fdf-value {
  padding: 4px 8px;
}
.fdf-trigger--sm .fdf-icon {
  width: 32px;
  padding: 0;
  justify-content: center;
}
.fdf-trigger--sm .fdf-icon .mi {
  font-size: 20px;
}

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

.fdf-popover {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 4px;
  background: var(--n0);
  border: 1px solid var(--n300);
  border-radius: var(--r-s);
  box-shadow: var(--shadow-m);
  padding: 12px;
  z-index: 1100;
  box-sizing: border-box;
  width: 280px;
}
</style>
