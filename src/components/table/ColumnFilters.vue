<script setup>
import { ref, reactive } from 'vue'
import DatePopover from '@/components/ui/DatePopover.vue'

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
    // initialise from current modelValue (DD-MM-YYYY → ISO)
    const raw = props.modelValue[key] || ''
    let iso = ''
    if (raw && raw.includes('-')) {
      const parts = raw.split('-')
      if (parts[0].length === 2) iso = `${parts[2]}-${parts[1]}-${parts[0]}`
      else iso = raw
    }
    dateState[key] = { isoDate: iso, preset: null }
  }
  return dateState[key]
}

function openDatePopover(key, event) {
  const rect = event.currentTarget.getBoundingClientRect()
  popoverPos.top = rect.bottom + 4
  popoverPos.left = rect.left
  // Always re-sync from current modelValue when opening, so external changes
  // (e.g. FilterStrip date preset change) are reflected in the popover.
  const raw = props.modelValue[key] || ''
  let iso = ''
  if (raw && raw.includes('-')) {
    const parts = raw.split('-')
    if (parts[0].length === 2) iso = `${parts[2]}-${parts[1]}-${parts[0]}`
    else iso = raw
  }
  dateState[key] = { isoDate: iso, preset: null }
  openDateKey.value = key
}

function closeDatePopover() {
  openDateKey.value = null
}

function isoToDisplay(iso) {
  if (!iso) return ''
  const [y, m, d] = iso.split('-')
  return `${d}-${m}-${y}`
}

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
</script>

<template>
  <tr class="col-filter-row">
    <th
      v-for="col in columns"
      :key="col.key"
      :class="['cf-cell', { sticky: col.sticky }]"
      :style="{
        width: col.sticky ? col.width + 'px' : (columnWidths[col.key] != null ? columnWidths[col.key] + 'px' : undefined),
        minWidth: col.sticky ? col.width + 'px' : (columnWidths[col.key] != null ? columnWidths[col.key] + 'px' : undefined),
        left: col.sticky ? col.stickyLeft + 'px' : undefined
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
          <span :class="['cf-date-text', { 'cf-date-text--active': modelValue[col.key] }]">
            {{ modelValue[col.key] || 'Alle' }}
          </span>
          <span class="cf-input-icon-area">
            <span class="mi cf-icon">today</span>
          </span>
        </button>

        <Teleport to="body">
          <template v-if="openDateKey === col.key">
            <div class="date-popover-backdrop" @click="closeDatePopover" />
            <div
              class="date-popover-teleport"
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

      <!-- Time filter -->
      <template v-else-if="col.filter === 'time'">
        <div class="cf-select-wrap">
          <select
            class="cf-select cf-select--icon-right"
            :value="modelValue[col.key] || 'Alle'"
            @change="update(col.key, $event.target.value)"
          >
            <option value="Alle">Alle</option>
          </select>
          <span class="mi cf-icon-right">access_time</span>
        </div>
      </template>

      <!-- Dropdown filter -->
      <template v-else-if="col.filter === 'dropdown'">
        <div class="cf-select-wrap">
          <select
            class="cf-select"
            :value="modelValue[col.key] || 'Alle'"
            @change="update(col.key, $event.target.value)"
          >
            <option
              v-for="opt in col.filterOptions"
              :key="opt"
              :value="opt"
            >{{ opt }}</option>
          </select>
          <span class="mi cf-caret">arrow_drop_down</span>
        </div>
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
  background: var(--n50);
  border-bottom: 1px solid var(--n300);
  border-right: 1px solid var(--n300);
  padding: 8px;
  vertical-align: middle;
}

.sticky {
  position: sticky;
  z-index: 3;
  background: var(--n50);
}

.cf-input-wrap {
  display: flex;
  align-items: center;
  border: 1px solid var(--n400);
  border-radius: var(--r-s);
  background: var(--n0);
  overflow: hidden;
  transition: border-color 0.15s;
  height: 32px;
  box-sizing: border-box;
}
.cf-input-wrap:focus-within { border-color: var(--p500); }

.cf-input {
  flex: 1;
  min-width: 0;
  padding: 6px 6px 6px 8px;
  border: none;
  font-family: var(--font);
  font-size: 14px;
  font-weight: 400;
  color: var(--n900);
  line-height: 20px;
  letter-spacing: 0;
  background: transparent;
  outline: none;
  box-sizing: border-box;
}
.cf-input::placeholder { color: var(--n500); }

.cf-input-icon-area {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  flex-shrink: 0;
}

.cf-icon {
  font-size: 20px;
  color: var(--n800);
  pointer-events: none;
}

/* Date filter button — same two-part layout as search field */
.cf-date-btn {
  display: flex;
  align-items: center;
  width: 100%;
  height: 32px;
  padding: 0;
  border: 1px solid var(--n400);
  border-radius: var(--r-s);
  background: var(--n0);
  font-family: var(--font);
  font-size: 14px;
  font-weight: 400;
  color: var(--n900);
  cursor: pointer;
  text-align: left;
  box-sizing: border-box;
  overflow: hidden;
  transition: border-color 0.15s;
}
.cf-date-btn:focus-within,
.cf-date-btn:hover { border-color: var(--p500); }

.cf-date-text {
  flex: 1;
  min-width: 0;
  padding: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--n500);
  font-size: 14px;
  line-height: 20px;
}
.cf-date-text--active { color: var(--n900); }

/* Teleported popover */
.date-popover-backdrop {
  position: fixed;
  inset: 0;
  z-index: 299;
}

.date-popover-teleport {
  position: fixed;
  z-index: 300;
}

.cf-select-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.cf-select {
  width: 100%;
  height: 32px;
  padding: 6px 28px 6px 8px;
  border: 1px solid var(--n400);
  border-radius: var(--r-s);
  font-family: var(--font);
  font-size: 14px;
  font-weight: 400;
  color: var(--n900);
  line-height: 20px;
  letter-spacing: 0;
  background: var(--n0);
  outline: none;
  transition: border-color 0.15s;
  box-sizing: border-box;
  cursor: pointer;
  appearance: none;
}
.cf-select:focus { border-color: var(--p500); }

.cf-select--icon-right {
  padding-right: 28px;
}

.cf-caret {
  position: absolute;
  right: 4px;
  font-size: 18px;
  color: var(--n800);
  pointer-events: none;
}

.cf-icon-right {
  position: absolute;
  right: 4px;
  font-size: 20px;
  color: var(--n800);
  pointer-events: none;
}
</style>
