<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  modelValue: { type: String, default: '' }, // ISO: YYYY-MM-DD
})
const emit = defineEmits(['update:modelValue'])

const WEEKDAYS  = ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo']
const MONTHS_NL = ['Jan', 'Feb', 'Mrt', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec']

const today    = new Date()
const todayISO = toISO(today)

// ── View state ──────────────────────────────────────────────────────────────
const view = ref('days') // 'days' | 'month' | 'year'

const initDate  = props.modelValue ? new Date(props.modelValue) : new Date()
const viewYear  = ref(initDate.getFullYear())
const viewMonth = ref(initDate.getMonth()) // 0–11

const selected     = computed(() => props.modelValue)
const decadeStart  = computed(() => Math.floor(viewYear.value / 10) * 10)

// ── Nav label (per view) ────────────────────────────────────────────────────
const navLabel = computed(() => {
  if (view.value === 'days') {
    const d     = new Date(viewYear.value, viewMonth.value, 1)
    const label = d.toLocaleDateString('nl-NL', { month: 'long', year: 'numeric' })
    return label.charAt(0).toUpperCase() + label.slice(1)
  }
  if (view.value === 'month') return String(viewYear.value)
  return `${decadeStart.value} – ${decadeStart.value + 9}`
})

// ── Navigation ──────────────────────────────────────────────────────────────
function goUp() {
  if (view.value === 'days')  view.value = 'month'
  else if (view.value === 'month') view.value = 'year'
  // Year has no higher level
}

function prev() {
  if (view.value === 'days') {
    if (viewMonth.value === 0) { viewMonth.value = 11; viewYear.value-- }
    else viewMonth.value--
  } else if (view.value === 'month') {
    viewYear.value--
  } else {
    viewYear.value -= 10
  }
}

function next() {
  if (view.value === 'days') {
    if (viewMonth.value === 11) { viewMonth.value = 0; viewYear.value++ }
    else viewMonth.value++
  } else if (view.value === 'month') {
    viewYear.value++
  } else {
    viewYear.value += 10
  }
}

function goToday() {
  viewYear.value  = today.getFullYear()
  viewMonth.value = today.getMonth()
  view.value = 'days'
}

// ── Days grid ───────────────────────────────────────────────────────────────
const calendarDays = computed(() => {
  const year      = viewYear.value
  const month     = viewMonth.value
  const firstDay  = new Date(year, month, 1)
  const lastDate  = new Date(year, month + 1, 0).getDate()
  // Week starts Monday: getDay() 0=Sun → offset 6
  const startOffset = (firstDay.getDay() + 6) % 7
  const days = []
  for (let i = 0; i < startOffset; i++) days.push(null)
  for (let d = 1; d <= lastDate; d++) days.push(new Date(year, month, d))
  while (days.length % 7 !== 0) days.push(null)
  return days
})

// ── Months grid (4 × 3) ─────────────────────────────────────────────────────
const calendarMonths = computed(() =>
  MONTHS_NL.map((name, i) => ({ name, month: i }))
)

// ── Years grid (4 × 3, decade + 2 padding) ──────────────────────────────────
const calendarYears = computed(() => {
  const start = decadeStart.value
  const years = Array.from({ length: 10 }, (_, i) => start + i)
  while (years.length < 12) years.push(null)
  return years
})

// ── State helpers ────────────────────────────────────────────────────────────
function toISO(d) {
  const m   = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${m}-${day}`
}

function dayState(d) {
  if (!d) return 'empty'
  const iso = toISO(d)
  if (iso === selected.value) return 'selected'
  if (iso === todayISO)       return 'current'
  return 'enabled'
}

function monthState(monthIdx) {
  const sel = selected.value ? new Date(selected.value) : null
  if (sel && sel.getFullYear() === viewYear.value && sel.getMonth() === monthIdx) return 'selected'
  if (today.getFullYear() === viewYear.value && today.getMonth() === monthIdx)    return 'current'
  return 'enabled'
}

function yearState(year) {
  if (year === null) return 'empty'
  const sel = selected.value ? new Date(selected.value) : null
  if (sel && sel.getFullYear() === year)  return 'selected'
  if (today.getFullYear() === year)       return 'current'
  return 'enabled'
}

// ── Selection handlers ───────────────────────────────────────────────────────
function selectDay(d) {
  if (!d) return
  emit('update:modelValue', toISO(d))
}

function selectMonth(monthIdx) {
  viewMonth.value = monthIdx
  view.value = 'days'
}

function selectYear(year) {
  if (year === null) return
  viewYear.value = year
  view.value = 'month'
}
</script>

<template>
  <div class="cal">
    <!-- Nav -->
    <div class="cal-nav">
      <button class="cal-label-btn" @click="goUp">{{ navLabel }}</button>
      <div class="cal-nav-group">
        <button class="cal-icon-btn" @click="prev">
          <span class="mi" style="font-size:16px; line-height:1">chevron_left</span>
        </button>
        <button class="cal-today-btn" @click="goToday">Vandaag</button>
        <button class="cal-icon-btn" @click="next">
          <span class="mi" style="font-size:16px; line-height:1">chevron_right</span>
        </button>
      </div>
    </div>

    <!-- Days view -->
    <div v-if="view === 'days'" class="cal-grid cal-grid--days">
      <div v-for="wd in WEEKDAYS" :key="wd" class="cal-weekday">{{ wd }}</div>
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

    <!-- Month view -->
    <div v-else-if="view === 'month'" class="cal-grid cal-grid--month">
      <div
        v-for="{ name, month } in calendarMonths"
        :key="month"
        class="cal-cell cal-cell--clickable"
        @click="selectMonth(month)"
      >
        <span class="cal-day" :class="`cal-day--${monthState(month)}`">{{ name }}</span>
      </div>
    </div>

    <!-- Year view -->
    <div v-else class="cal-grid cal-grid--year">
      <div
        v-for="(year, i) in calendarYears"
        :key="i"
        class="cal-cell"
        :class="{ 'cal-cell--clickable': year !== null }"
        @click="selectYear(year)"
      >
        <span
          v-if="year !== null"
          class="cal-day"
          :class="`cal-day--${yearState(year)}`"
        >{{ year }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cal {
  display: flex;
  flex-direction: column;
  gap: var(--sp-s);
  width: 100%;
}

/* ── Nav ── */
.cal-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.cal-label-btn {
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
.cal-label-btn:hover { background: var(--n50); }

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
  background: transparent;
  color: var(--n700);
  border: none;
  border-radius: var(--r-s);
  cursor: pointer;
}
.cal-icon-btn:hover { background: var(--n50); }
.cal-icon-btn:disabled { color: var(--n300); cursor: default; }
.cal-icon-btn:disabled:hover { background: transparent; }

.cal-today-btn {
  padding: 8px 12px;
  border: none;
  background: transparent;
  font-family: var(--font);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.12px;
  color: var(--n900);
  cursor: pointer;
  line-height: 16px;
  white-space: nowrap;
  border-radius: var(--r-s);
}
.cal-today-btn:hover { background: var(--n50); }

/* ── Grids ── */
.cal-grid {
  display: grid;
  width: 100%;
}

.cal-grid--days {
  grid-template-columns: repeat(7, 1fr);
}

.cal-grid--month,
.cal-grid--year {
  grid-template-columns: repeat(4, 1fr);
}

.cal-weekday {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
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
  height: 32px;
}
.cal-cell--clickable { cursor: pointer; }

/* Day/month/year pill */
.cal-day {
  width: 32px;
  height: 32px;
  border-radius: var(--r-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font);
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  transition: background 0.1s;
}

/* Month/year pills are wider */
.cal-grid--month .cal-day,
.cal-grid--year .cal-day {
  width: 100%;
  padding: 0 var(--sp-s);
}

.cal-cell--clickable:hover .cal-day:not(.cal-day--selected) {
  background: var(--p50);
}

/* States */
.cal-day--enabled {
  color: var(--n900);
}
.cal-day--current {
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
