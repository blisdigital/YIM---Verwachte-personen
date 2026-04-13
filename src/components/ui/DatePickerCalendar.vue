<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  modelValue: { type: String, default: '' }, // ISO: YYYY-MM-DD
})
const emit = defineEmits(['update:modelValue'])

const WEEKDAYS = ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo']

const todayISO = (() => {
  const d = new Date()
  return toISO(d)
})()

// View state: which month/year is shown
const selected = computed(() => props.modelValue)
const initDate = props.modelValue ? new Date(props.modelValue) : new Date()
const viewYear  = ref(initDate.getFullYear())
const viewMonth = ref(initDate.getMonth()) // 0–11

const monthLabel = computed(() => {
  const d = new Date(viewYear.value, viewMonth.value, 1)
  const label = d.toLocaleDateString('nl-NL', { month: 'long', year: 'numeric' })
  return label.charAt(0).toUpperCase() + label.slice(1)
})

function prevMonth() {
  if (viewMonth.value === 0) { viewMonth.value = 11; viewYear.value-- }
  else viewMonth.value--
}

function nextMonth() {
  if (viewMonth.value === 11) { viewMonth.value = 0; viewYear.value++ }
  else viewMonth.value++
}

function goToday() {
  const d = new Date()
  viewYear.value  = d.getFullYear()
  viewMonth.value = d.getMonth()
}

// Build grid: nulls for padding, Date objects for real days
const calendarDays = computed(() => {
  const year  = viewYear.value
  const month = viewMonth.value
  const firstDay = new Date(year, month, 1)
  const lastDate  = new Date(year, month + 1, 0).getDate()
  // Week starts Monday: getDay() 0=Sun → offset 6, 1=Mon → 0, etc.
  const startOffset = (firstDay.getDay() + 6) % 7
  const days = []
  for (let i = 0; i < startOffset; i++) days.push(null)
  for (let d = 1; d <= lastDate; d++) days.push(new Date(year, month, d))
  while (days.length % 7 !== 0) days.push(null)
  return days
})

function toISO(d) {
  const m   = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${m}-${day}`
}

function dayISO(d) { return d ? toISO(d) : '' }

function dayState(d) {
  if (!d) return 'empty'
  const iso = toISO(d)
  if (iso === selected.value) return 'selected'
  if (iso === todayISO)       return 'today'
  if (iso < todayISO)         return 'past'
  return 'future'
}

function selectDay(d) {
  if (!d) return
  emit('update:modelValue', toISO(d))
}
</script>

<template>
  <div class="cal">
    <!-- Nav -->
    <div class="cal-nav">
      <button class="cal-month-btn">{{ monthLabel }}</button>
      <div class="cal-nav-group">
        <button class="cal-icon-btn cal-icon-btn--left" @click="prevMonth">
          <span class="mi" style="font-size:16px; line-height:1">chevron_left</span>
        </button>
        <button class="cal-today-btn" @click="goToday">Vandaag</button>
        <button class="cal-icon-btn cal-icon-btn--right" @click="nextMonth">
          <span class="mi" style="font-size:16px; line-height:1">chevron_right</span>
        </button>
      </div>
    </div>

    <!-- Day-of-week headers -->
    <div class="cal-grid">
      <div v-for="wd in WEEKDAYS" :key="wd" class="cal-weekday">{{ wd }}</div>

      <!-- Day cells -->
      <div
        v-for="(day, i) in calendarDays"
        :key="i"
        class="cal-cell"
        :class="{ 'cal-cell--clickable': !!day }"
        @click="selectDay(day)"
      >
        <span
          v-if="day"
          class="cal-day"
          :class="`cal-day--${dayState(day)}`"
        >{{ day.getDate() }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cal {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}

/* ── Nav ── */
.cal-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.cal-month-btn {
  padding: 8px 12px;
  border: 1px solid var(--n400);
  border-radius: var(--r-s);
  background: var(--n0);
  font-family: var(--font);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.12px;
  color: var(--n900);
  cursor: pointer;
  white-space: nowrap;
  line-height: 16px;
}
.cal-month-btn:hover { background: var(--n50); }

/* Connected nav group: ‹ Vandaag › */
.cal-nav-group {
  display: flex;
  align-items: center;
}

.cal-icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  background: var(--n0);
  color: var(--n700);
  cursor: pointer;
  border-top: 1px solid var(--n400);
  border-bottom: 1px solid var(--n400);
}
.cal-icon-btn:hover { background: var(--n50); }
.cal-icon-btn--left {
  border-left: 1px solid var(--n400);
  border-right: none;
  border-radius: var(--r-s) 0 0 var(--r-s);
}
.cal-icon-btn--right {
  border-right: 1px solid var(--n400);
  border-left: none;
  border-radius: 0 var(--r-s) var(--r-s) 0;
}

.cal-today-btn {
  padding: 8px 4px;
  border-top: 1px solid var(--n400);
  border-bottom: 1px solid var(--n400);
  border-left: none;
  border-right: none;
  background: var(--n0);
  font-family: var(--font);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.12px;
  color: var(--n900);
  cursor: pointer;
  line-height: 16px;
  white-space: nowrap;
}
.cal-today-btn:hover { background: var(--n50); }

/* ── Grid ── */
.cal-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 100%;
}

.cal-weekday {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  font-family: var(--font);
  font-size: 12px;
  font-weight: 400;
  color: var(--n700);
  line-height: 16px;
}

.cal-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
}
.cal-cell--clickable { cursor: pointer; }

/* Day pill */
.cal-day {
  width: 28px;
  height: 28px;
  border-radius: 360px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font);
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  transition: background 0.1s;
}

.cal-cell--clickable:hover .cal-day:not(.cal-day--selected) {
  background: var(--p50);
}

.cal-day--past {
  color: var(--n500);
}
.cal-day--future {
  color: var(--n900);
}
.cal-day--today {
  color: var(--p500);
  font-weight: 600;
  letter-spacing: 0.12px;
}
.cal-day--selected {
  background: var(--p500);
  color: var(--n0);
  font-weight: 600;
  letter-spacing: 0.12px;
}
</style>
