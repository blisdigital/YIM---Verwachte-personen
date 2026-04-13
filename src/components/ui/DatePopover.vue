<!-- Shared date-filter popover. Renders inline; parent controls open state and positioning. -->
<script setup>
import { ref } from 'vue'
import DatePickerCalendar from '@/components/ui/DatePickerCalendar.vue'

const props = defineProps({
  isoDate: { type: String, default: '' },
  preset:  { type: String, default: null },
})
const emit = defineEmits(['update:isoDate', 'update:preset', 'apply', 'reset'])

const showCalendar = ref(false)

const PRESETS = [
  { key: 'vandaag', label: 'Vandaag' },
  { key: 'morgen',  label: 'Morgen' },
  { key: 'week',    label: 'Deze week' },
]

function onDateFieldClick() {
  showCalendar.value = !showCalendar.value
}

function onCalendarSelect(iso) {
  emit('update:isoDate', iso)
  emit('update:preset', null)
  showCalendar.value = false
}

function setPreset(key) {
  const now = new Date()
  if (key === 'vandaag') emit('update:isoDate', toISO(now))
  if (key === 'morgen') {
    const t = new Date(now); t.setDate(t.getDate() + 1)
    emit('update:isoDate', toISO(t))
  }
  if (key === 'week') emit('update:isoDate', toISO(now))
  emit('update:preset', key)
  showCalendar.value = false
}

function toISO(d) {
  return d.toISOString().slice(0, 10)
}

function displayDate(isoStr) {
  if (!isoStr) return ''
  const [y, m, d] = isoStr.split('-')
  return `${d}-${m}-${y}`
}
</script>

<template>
  <div class="date-popover">
    <div class="popover-title">Filter</div>

    <!-- Date field -->
    <div class="popover-field">
      <div class="field-label">Kies datum</div>
      <div
        class="date-field"
        :class="{ 'date-field--active': showCalendar }"
        @click="onDateFieldClick"
      >
        <span class="date-text">{{ displayDate(isoDate) || '—' }}</span>
        <div class="date-icon-area">
          <span class="mi" style="font-size:24px">today</span>
        </div>
      </div>

      <!-- Inline calendar -->
      <DatePickerCalendar
        v-if="showCalendar"
        :model-value="isoDate"
        @update:model-value="onCalendarSelect"
      />
    </div>

    <!-- Presets -->
    <div class="field-label">Selecteer</div>
    <div class="popover-presets">
      <button
        v-for="p in PRESETS"
        :key="p.key"
        :class="['preset-chip', { active: preset === p.key }]"
        @click="setPreset(p.key)"
      >
        {{ p.label }}
      </button>
    </div>

    <div class="popover-divider" />

    <div class="popover-actions">
      <button class="btn-reset" @click="$emit('reset')">Resetten</button>
      <button class="btn-apply" @click="$emit('apply')">Toepassen</button>
    </div>
  </div>
</template>

<style scoped>
.date-popover {
  background: var(--n0);
  border-radius: var(--r-s);
  box-shadow: 0 4px 16px rgba(17, 19, 19, 0.16);
  padding: 16px;
  width: 272px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.popover-title {
  font-family: var(--font);
  font-size: 18px;
  font-weight: 700;
  color: var(--p700);
  line-height: 24px;
}

.popover-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field-label {
  font-family: var(--font);
  font-size: 14px;
  font-weight: 600;
  color: var(--p700);
  letter-spacing: 0.14px;
  line-height: 20px;
}

.date-field {
  display: flex;
  align-items: center;
  border: 1px solid var(--n400);
  border-radius: var(--r-s);
  overflow: hidden;
  cursor: pointer;
  transition: border-color 0.15s;
}
.date-field:hover,
.date-field--active {
  border-color: var(--p500);
}

.date-text {
  flex: 1;
  padding: 8px;
  font-family: var(--font);
  font-size: 14px;
  font-weight: 400;
  color: var(--n900);
  line-height: 20px;
  white-space: nowrap;
}

.date-icon-area {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  background: var(--n50);
  color: var(--n700);
  flex-shrink: 0;
}

.popover-presets {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}

.preset-chip {
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: var(--r-s);
  border: 1px solid var(--n500);
  background: var(--n0);
  font-family: var(--font);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.14px;
  line-height: 20px;
  color: var(--n800);
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.15s;
}
.preset-chip:hover { border-color: var(--p500); color: var(--p700); }
.preset-chip.active {
  background: var(--p500);
  border-color: var(--p500);
  color: var(--n0);
}

.popover-divider {
  height: 1px;
  background: var(--n300);
}

.popover-actions {
  display: flex;
  gap: 8px;
}

.btn-reset,
.btn-apply {
  flex: 1;
  padding: 8px 12px;
  border-radius: var(--r-s);
  font-family: var(--font);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.12px;
  line-height: 16px;
  cursor: pointer;
  transition: all 0.15s;
}
.btn-reset {
  background: var(--n0);
  border: 1px solid var(--n400);
  color: var(--n900);
}
.btn-reset:hover { background: var(--n50); }
.btn-apply {
  background: var(--p500);
  border: none;
  color: var(--n0);
}
.btn-apply:hover { background: var(--p700); }
</style>
