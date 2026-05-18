<script setup>
import { ref, computed, watch, onMounted, nextTick } from 'vue'

const props = defineProps({
  time: { type: String, default: null }, // "HH:mm" or null
})
const emit = defineEmits(['apply', 'cancel'])

const selectedHour = ref(12)
const selectedMinute = ref(0)

function initFromProp() {
  if (props.time && /^\d{1,2}:\d{2}$/.test(props.time)) {
    const [h, m] = props.time.split(':')
    selectedHour.value = parseInt(h, 10)
    selectedMinute.value = parseInt(m, 10)
  } else {
    const now = new Date()
    selectedHour.value = now.getHours()
    selectedMinute.value = now.getMinutes()
  }
}

watch(() => props.time, initFromProp, { immediate: true })

const hours = Array.from({ length: 24 }, (_, i) => i)
const minutes = Array.from({ length: 60 }, (_, i) => i)

function pad(n) { return String(n).padStart(2, '0') }

const displayTime = computed(() => `${pad(selectedHour.value)}:${pad(selectedMinute.value)}`)

const hourListRef = ref(null)
const minListRef = ref(null)
const ROW_H = 36

function scrollToSelected() {
  if (hourListRef.value) {
    hourListRef.value.scrollTop = Math.max(0, (selectedHour.value - 2) * ROW_H)
  }
  if (minListRef.value) {
    minListRef.value.scrollTop = Math.max(0, (selectedMinute.value - 2) * ROW_H)
  }
}

onMounted(() => nextTick(scrollToSelected))

watch([selectedHour, selectedMinute], () => nextTick(scrollToSelected))

function setNow() {
  const now = new Date()
  selectedHour.value = now.getHours()
  selectedMinute.value = now.getMinutes()
}

function selectHour(h) { selectedHour.value = h }
function selectMinute(m) { selectedMinute.value = m }

function apply() { emit('apply', displayTime.value) }
function cancel() { emit('cancel') }
</script>

<template>
  <div class="time-popover">
    <!-- Top bar -->
    <div class="tp-topbar">
      <span class="tp-current">{{ displayTime }}</span>
      <button class="tp-now" @click="setNow">Nu</button>
    </div>

    <!-- Column labels -->
    <div class="tp-labels">
      <span class="tp-label">Uren</span>
      <span class="tp-label tp-label-min">Minuten</span>
    </div>

    <!-- Scroll columns -->
    <div class="tp-scroll-area">
      <div ref="hourListRef" class="tp-col">
        <div
          v-for="h in hours"
          :key="h"
          :class="['tp-row', h % 2 === 0 ? 'tp-row-alt' : 'tp-row-plain', { 'tp-selected': h === selectedHour }]"
          @click="selectHour(h)"
        >
          {{ pad(h) }}
        </div>
      </div>

      <div class="tp-sep">
        <span>:</span>
      </div>

      <div ref="minListRef" class="tp-col">
        <div
          v-for="m in minutes"
          :key="m"
          :class="['tp-row', 'tp-row-plain', { 'tp-selected': m === selectedMinute }]"
          @click="selectMinute(m)"
        >
          {{ pad(m) }}
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="tp-footer">
      <button class="tp-btn tp-cancel" @click="cancel">Annuleren</button>
      <button class="tp-btn tp-ok" @click="apply">OK</button>
    </div>
  </div>
</template>

<style scoped>
.time-popover {
  background: var(--n0);
  border-radius: var(--r-s);
  box-shadow: var(--shadow-m);
  padding: var(--sp-s);
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 200px;
}

/* ── Top bar ── */
.tp-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.tp-current {
  padding: 8px 12px;
  font-family: var(--font);
  font-size: 12px;
  font-weight: 600;
  color: var(--p600);
  letter-spacing: 0.12px;
  line-height: 16px;
}

.tp-now {
  padding: 8px 12px;
  border: 1px solid var(--n400);
  border-radius: var(--r-s);
  background: var(--n0);
  font-family: var(--font);
  font-size: 12px;
  font-weight: 600;
  color: var(--n900);
  cursor: pointer;
  letter-spacing: 0.12px;
  line-height: 16px;
  transition: border-color 0.15s;
}
.tp-now:hover { border-color: var(--p500); }

/* ── Column labels ── */
.tp-labels {
  display: flex;
  gap: 2px;
}

.tp-label {
  flex: 1;
  text-align: center;
  padding: 4px 8px;
  font-family: var(--font);
  font-size: 12px;
  font-weight: 400;
  color: var(--n900);
  line-height: 12px;
  background: var(--n0);
}

.tp-label-min {
  /* minute column aligns with tp-col after separator */
}

/* ── Scroll area ── */
.tp-scroll-area {
  display: flex;
  align-items: stretch;
}

.tp-col {
  flex: 1;
  height: 180px; /* 5 rows × 36px */
  overflow-y: scroll;
  scrollbar-width: none;
}
.tp-col::-webkit-scrollbar { display: none; }

/* Separator column */
.tp-sep {
  width: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font);
  font-size: 14px;
  font-weight: 400;
  color: var(--n1000);
  /* vertically centered at selected row level handled by flex-align on parent */
  padding-top: 72px; /* offset to align : with middle (selected) row */
}

/* ── Rows ── */
.tp-row {
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font);
  font-size: 14px;
  font-weight: 400;
  color: var(--n700);
  cursor: pointer;
  box-sizing: border-box;
  transition: color 0.1s;
  user-select: none;
}

.tp-row-alt {
  background: var(--p50);
}

.tp-row-plain {
  background: var(--n0);
}

.tp-row:not(.tp-selected):hover {
  color: var(--n900);
  background: var(--p100);
}

.tp-row.tp-selected {
  background: var(--n0);
  border-top: 1px solid var(--n500);
  border-bottom: 1px solid var(--n500);
  color: var(--n1000);
}

/* ── Footer ── */
.tp-footer {
  display: flex;
  gap: 8px;
}

.tp-btn {
  flex: 1;
  padding: 8px 12px;
  border-radius: var(--r-s);
  font-family: var(--font);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  letter-spacing: 0.12px;
  line-height: 16px;
  transition: all 0.15s;
}

.tp-cancel {
  border: 1px solid var(--n400);
  background: var(--n0);
  color: var(--n900);
}
.tp-cancel:hover { border-color: var(--p500); }

.tp-ok {
  border: none;
  background: var(--p500);
  color: var(--n0);
}
.tp-ok:hover { background: var(--p600); }
</style>
