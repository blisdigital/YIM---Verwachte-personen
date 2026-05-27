<script setup>
import { ref, reactive, computed } from 'vue'
import DatePopover from '@/components/ui/DatePopover.vue'
import TimePopover from '@/components/ui/TimePopover.vue'
import { usePersonenStore } from '@/stores/personenStore'
import { isoToDisplay, displayToIso } from '@/utils/dateFormat'

const props = defineProps({
  columns: { type: Array, default: () => [] },
  columnWidths: { type: Object, default: () => ({}) },
  modelValue: { type: Object, default: () => ({}) },
})
const emit = defineEmits(['update:modelValue'])

function update(key, val) {
  emit('update:modelValue', { ...props.modelValue, [key]: val })
}

// ── Date popover per column ──────────────────────────────────────────────────
const openDateKey = ref(null)
const popoverPos = reactive({ top: 0, left: 0 })
const dateState = reactive({}) // key → { isoDate, preset }

function getDateState(key) {
  if (!dateState[key]) {
    const raw = props.modelValue[key] || ''
    let iso = ''
    if (raw && raw.includes('-')) {
      iso = raw.split('-')[0].length === 2 ? displayToIso(raw) : raw
    }
    dateState[key] = { isoDate: iso, preset: null }
  }
  return dateState[key]
}

function openDatePopover(key, event) {
  const rect = event.currentTarget.getBoundingClientRect()
  popoverPos.top = rect.bottom + 4
  popoverPos.left = rect.left
  const raw = props.modelValue[key] || ''
  let iso = ''
  if (raw && raw.includes('-')) {
    iso = raw.split('-')[0].length === 2 ? displayToIso(raw) : raw
  }
  dateState[key] = { isoDate: iso, preset: null }
  openDateKey.value = key
}

function closeDatePopover() { openDateKey.value = null }


function applyDate(key) {
  const state = getDateState(key)
  update(key, isoToDisplay(state.isoDate))
  closeDatePopover()
}

function resetDate(key) {
  dateState[key] = { isoDate: '', preset: null }
  update(key, '')
  closeDatePopover()
}

// ── Time popover per column ──────────────────────────────────────────────────
const openTimeKey = ref(null)
const timePos = reactive({ top: 0, left: 0 })

function openTimePopover(key, event) {
  const rect = event.currentTarget.getBoundingClientRect()
  timePos.top = rect.bottom + 4
  timePos.left = rect.left
  openTimeKey.value = key
}

function closeTimePopover() { openTimeKey.value = null }

function applyTime(key, time) {
  update(key, time)
  closeTimePopover()
}

function resetTime(key) {
  update(key, '')
  closeTimePopover()
}

// ── Dropdown popover per column ──────────────────────────────────────────────
const openDropKey = ref(null)
const dropPos = reactive({ top: 0, left: 0 })
const pendingDrop = reactive({})

function openDropPopover(key, event) {
  const rect = event.currentTarget.getBoundingClientRect()
  dropPos.top = rect.bottom + 4
  dropPos.left = rect.left
  pendingDrop[key] = props.modelValue[key] || ''
  openDropKey.value = key
}

function closeDropPopover() { openDropKey.value = null }

function applyDrop(key) {
  update(key, pendingDrop[key])
  closeDropPopover()
}

function resetDrop(key) {
  pendingDrop[key] = ''
  update(key, '')
  closeDropPopover()
}

// ── Combobox (locaties) popover ──────────────────────────────────────────────
const personenStore = usePersonenStore()

const uniqueLocations = computed(() => {
  const locs = new Set()
  personenStore.personen.forEach(p => {
    if (p.locaties) p.locaties.forEach(l => locs.add(l))
  })
  return [...locs].sort()
})

const openLocKey = ref(null)
const locPos = reactive({ top: 0, left: 0, width: 0 })
const pendingLocText = reactive({})

function openLocPopover(key, event) {
  const rect = event.currentTarget.getBoundingClientRect()
  locPos.top = rect.bottom + 4
  locPos.left = rect.left
  locPos.width = rect.width
  pendingLocText[key] = props.modelValue[key] || ''
  openLocKey.value = key
}

function closeLocPopover() { openLocKey.value = null }

function applyLoc(key) {
  update(key, pendingLocText[key])
  closeLocPopover()
}

function resetLoc(key) {
  pendingLocText[key] = ''
  update(key, '')
  closeLocPopover()
}

function filteredLocsFor(key) {
  const q = (pendingLocText[key] || '').toLowerCase()
  if (!q) return uniqueLocations.value
  return uniqueLocations.value.filter(l => l.toLowerCase().includes(q))
}
</script>

<template>
  <tr class="col-filter-row">
    <th
      v-for="col in columns"
      :key="col.key"
      :class="['cf-cell', { sticky: col.sticky }]"
      :style="{
        minWidth: col.width + 'px',
        width: col.sticky ? col.width + 'px' : (columnWidths[col.key] != null ? columnWidths[col.key] + 'px' : undefined),
        left: col.stickyLeft != null ? col.stickyLeft + 'px' : undefined,
        right: col.stickyRight != null ? col.stickyRight + 'px' : undefined,
      }"
    >
      <!-- Checkbox and action columns: no filter -->
      <template v-if="col.key === 'select' || col.key === 'actions'">
        <!-- empty -->
      </template>

      <!-- Text filter -->
      <template v-else-if="col.filter === 'text'">
        <div class="cf-input-wrap">
          <input
            type="text"
            class="cf-input"
            placeholder="Zoeken"
            :value="modelValue[col.key] || ''"
            @input="update(col.key, $event.target.value)"
          />
          <span class="cf-input-icon-area">
            <span class="mi cf-icon">search</span>
          </span>
        </div>
      </template>

      <!-- Date filter — opens popover -->
      <template v-else-if="col.filter === 'date'">
        <button
          class="cf-date-btn"
          @click="openDatePopover(col.key, $event)"
        >
          <span class="cf-date-text">
            {{ modelValue[col.key] || 'Filter' }}
          </span>
          <span class="mi cf-caret">expand_more</span>
        </button>

        <Teleport to="body">
          <template v-if="openDateKey === col.key">
            <div class="cf-backdrop" @click="closeDatePopover" />
            <div
              class="cf-teleport"
              :style="{ top: popoverPos.top + 'px', left: popoverPos.left + 'px' }"
            >
              <DatePopover
                :iso-date="getDateState(col.key).isoDate"
                :preset="getDateState(col.key).preset"
                @update:iso-date="getDateState(col.key).isoDate = $event"
                @update:preset="getDateState(col.key).preset = $event"
                @apply="applyDate(col.key)"
                @reset="resetDate(col.key)"
              />
            </div>
          </template>
        </Teleport>
      </template>

      <!-- Time filter — opens scroll-picker popover -->
      <template v-else-if="col.filter === 'time'">
        <button
          class="cf-date-btn"
          @click="openTimePopover(col.key, $event)"
        >
          <span class="cf-date-text">
            {{ modelValue[col.key] || 'Filter' }}
          </span>
          <span class="mi cf-caret">expand_more</span>
        </button>

        <Teleport to="body">
          <template v-if="openTimeKey === col.key">
            <div class="cf-backdrop" @click="closeTimePopover" />
            <div
              class="cf-teleport"
              :style="{ top: timePos.top + 'px', left: timePos.left + 'px' }"
            >
              <TimePopover
                :time="modelValue[col.key] || null"
                @apply="applyTime(col.key, $event)"
                @cancel="closeTimePopover"
              />
              <button
                v-if="modelValue[col.key]"
                class="cf-time-reset"
                @click="resetTime(col.key)"
              >
                Wis filter
              </button>
            </div>
          </template>
        </Teleport>
      </template>

      <!-- Dropdown filter — custom popover panel -->
      <template v-else-if="col.filter === 'dropdown'">
        <button
          class="cf-date-btn"
          :class="{ 'cf-date-btn--active': modelValue[col.key] && modelValue[col.key] !== 'Alle' }"
          @click="openDropPopover(col.key, $event)"
        >
          <span class="cf-date-text">
            {{ modelValue[col.key] && modelValue[col.key] !== 'Alle' ? modelValue[col.key] : 'Filter' }}
          </span>
          <span class="mi cf-caret">expand_more</span>
        </button>

        <Teleport to="body">
          <template v-if="openDropKey === col.key">
            <div class="cf-backdrop" @click="closeDropPopover" />
            <div
              class="cf-teleport"
              :style="{ top: dropPos.top + 'px', left: dropPos.left + 'px' }"
            >
              <div class="cf-filter-popover">
                <div class="cf-popover-title">Filter</div>
                <div class="cf-option-list">
                  <button
                    v-for="opt in col.filterOptions.filter(o => o !== 'Alle')"
                    :key="opt"
                    :class="['cf-option-item', { 'cf-option-item--selected': pendingDrop[col.key] === opt }]"
                    @click="pendingDrop[col.key] = pendingDrop[col.key] === opt ? '' : opt"
                  >
                    {{ opt }}
                  </button>
                </div>
                <div class="cf-popover-divider" />
                <div class="cf-popover-actions">
                  <button class="cf-btn-reset" @click="resetDrop(col.key)">Reset</button>
                  <button class="cf-btn-apply" @click="applyDrop(col.key)">Toepassen</button>
                </div>
              </div>
            </div>
          </template>
        </Teleport>
      </template>

      <!-- Combobox filter (locaties) — text input popover -->
      <template v-else-if="col.filter === 'combobox'">
        <button
          class="cf-date-btn"
          :class="{ 'cf-date-btn--active': modelValue[col.key] }"
          @click="openLocPopover(col.key, $event)"
        >
          <span class="cf-date-text">
            {{ modelValue[col.key] || 'Filter' }}
          </span>
          <span class="mi cf-caret">expand_more</span>
        </button>

        <Teleport to="body">
          <template v-if="openLocKey === col.key">
            <div class="cf-backdrop" @click="closeLocPopover" />
            <div
              class="cf-teleport"
              :style="{ top: locPos.top + 'px', left: locPos.left + 'px' }"
            >
              <div class="cf-filter-popover" :style="{ width: locPos.width + 'px' }">
                <div class="cf-popover-title">Filter</div>
                <div class="cf-loc-input-wrap">
                  <input
                    type="text"
                    class="cf-loc-input"
                    placeholder="Zoek locatie"
                    :value="pendingLocText[col.key]"
                    @input="pendingLocText[col.key] = $event.target.value"
                  />
                </div>
                <div
                  v-if="filteredLocsFor(col.key).length"
                  class="cf-loc-options"
                >
                  <button
                    v-for="loc in filteredLocsFor(col.key)"
                    :key="loc"
                    :class="['cf-option-item', { 'cf-option-item--selected': pendingLocText[col.key] === loc }]"
                    @click="pendingLocText[col.key] = pendingLocText[col.key] === loc ? '' : loc"
                  >
                    {{ loc }}
                  </button>
                </div>
                <div class="cf-popover-divider" />
                <div class="cf-popover-actions">
                  <button class="cf-btn-reset" @click="resetLoc(col.key)">Reset</button>
                  <button class="cf-btn-apply" @click="applyLoc(col.key)">Toepassen</button>
                </div>
              </div>
            </div>
          </template>
        </Teleport>
      </template>

      <!-- No filter -->
      <template v-else>
        <span></span>
      </template>
    </th>
  </tr>
</template>

<style scoped>
.col-filter-row th {
  background: var(--p700);
  border-bottom: 1px solid var(--p800);
  border-right: 1px solid var(--p800);
  padding: 4px 8px;
  vertical-align: middle;
}

.sticky {
  position: sticky;
  z-index: 3;
  background: var(--p700);
}

/* ── Text input ── */
.cf-input-wrap {
  display: flex;
  align-items: center;
  border: 1px solid var(--n400);
  border-radius: var(--r-s);
  background: var(--n0);
  overflow: hidden;
  transition: border-color 0.15s;
  height: 28px;
  box-sizing: border-box;
}
.cf-input-wrap:focus-within { border-color: var(--p500); }

.cf-input {
  flex: 1;
  min-width: 0;
  padding: 4px 4px 4px 8px;
  border: none;
  font-family: var(--font);
  font-size: 14px;
  font-weight: 400;
  color: var(--n900);
  line-height: 20px;
  background: transparent;
  outline: none;
  box-sizing: border-box;
}
.cf-input::placeholder { color: var(--n500); }

.cf-input-icon-area {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  flex-shrink: 0;
}

.cf-icon {
  font-size: 18px;
  color: var(--n800);
  pointer-events: none;
}

/* ── Date / Time / Dropdown / Combobox trigger button ── */
.cf-date-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  width: 100%;
  height: 28px;
  padding: 0 6px 0 0;
  border: none;
  border-radius: var(--r-s);
  background: var(--p700);
  font-family: var(--font);
  font-size: 14px;
  font-weight: 600;
  color: var(--n0);
  cursor: pointer;
  text-align: left;
  box-sizing: border-box;
  overflow: hidden;
  transition: opacity 0.15s;
}
.cf-date-btn:hover { opacity: 0.85; }

.cf-date-btn--active {
  background: var(--n0);
  color: var(--p700);
}
.cf-date-btn--active .cf-caret { color: var(--p700); }
.cf-date-btn--active .cf-date-text { color: var(--p700); }

.cf-date-text {
  flex: 1;
  min-width: 0;
  padding: 4px 0 4px 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: inherit;
  font-size: 14px;
  line-height: 20px;
}

/* ── Shared teleport backdrop ── */
.cf-backdrop {
  position: fixed;
  inset: 0;
  z-index: 299;
}

.cf-teleport {
  position: fixed;
  z-index: 300;
}

/* ── Time reset button (below time popover) ── */
.cf-time-reset {
  display: block;
  margin-top: 4px;
  padding: 4px 8px;
  border: none;
  background: none;
  font-family: var(--font);
  font-size: 12px;
  font-weight: 600;
  color: var(--p600);
  cursor: pointer;
  border-radius: var(--r-s);
  width: 100%;
  text-align: left;
}
.cf-time-reset:hover { background: var(--n100); }

/* ── Filter popover panel (dropdown + combobox) ── */
.cf-filter-popover {
  background: var(--n0);
  border-radius: var(--r-s);
  box-shadow: var(--shadow-m);
  padding: 16px;
  width: 240px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 8px;
}


.cf-popover-title {
  font-family: var(--font);
  font-size: 18px;
  font-weight: 700;
  color: var(--p700);
  line-height: 24px;
}

/* Option list (dropdown) */
.cf-option-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
  max-height: 200px;
  overflow-y: auto;
}

.cf-option-item {
  display: block;
  width: 100%;
  padding: 8px 10px;
  border: none;
  background: none;
  font-family: var(--font);
  font-size: 14px;
  font-weight: 600;
  color: var(--n800);
  text-align: left;
  cursor: pointer;
  border-radius: var(--r-s);
  letter-spacing: 0.14px;
  line-height: 20px;
  white-space: nowrap;
  transition: background 0.1s, color 0.1s;
}
.cf-option-item:hover { background: var(--n100); }
.cf-option-item--selected {
  background: var(--p50);
  color: var(--p700);
}
.cf-option-item--selected:hover { background: var(--p100); }

/* Locatie text input */
.cf-loc-input-wrap {
  border: 1px solid var(--n400);
  border-radius: var(--r-s);
  overflow: hidden;
  transition: border-color 0.15s;
}
.cf-loc-input-wrap:focus-within { border-color: var(--p500); }

.cf-loc-input {
  width: 100%;
  padding: 8px;
  border: none;
  font-family: var(--font);
  font-size: 14px;
  font-weight: 400;
  color: var(--n900);
  line-height: 20px;
  background: transparent;
  outline: none;
  box-sizing: border-box;
}
.cf-loc-input::placeholder { color: var(--n500); }

/* Locatie options list */
.cf-loc-options {
  display: flex;
  flex-direction: column;
  gap: 2px;
  max-height: 160px;
  overflow-y: auto;
}

.cf-popover-divider {
  height: 1px;
  background: var(--n300);
}

.cf-popover-actions {
  display: flex;
  gap: 8px;
}

.cf-btn-reset,
.cf-btn-apply {
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

.cf-btn-reset {
  background: var(--n0);
  border: 1px solid var(--n400);
  color: var(--n900);
}
.cf-btn-reset:hover { background: var(--n50); }

.cf-btn-apply {
  background: var(--p500);
  border: none;
  color: var(--n0);
}
.cf-btn-apply:hover { background: var(--p700); }

.cf-caret {
  flex-shrink: 0;
  font-size: 18px;
  color: var(--n0);
  pointer-events: none;
}
</style>
