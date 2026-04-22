<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  label: { type: String, required: true },
  options: { type: Array, default: () => [] }, // [{ value, label }]
  modelValue: { type: Array, default: () => [] },
})
const emit = defineEmits(['update:modelValue'])

const open = ref(false)
const dropPos = ref({ top: 0, right: 0 })

const activeCount = computed(() => props.modelValue.length)

function isChecked(val) {
  return props.modelValue.includes(val)
}

function toggle(val) {
  const current = [...props.modelValue]
  const idx = current.indexOf(val)
  if (idx > -1) current.splice(idx, 1)
  else current.push(val)
  emit('update:modelValue', current)
}

function toggleOpen(event) {
  if (!open.value) {
    const rect = event.currentTarget.getBoundingClientRect()
    dropPos.value = { top: rect.bottom + 4, right: document.documentElement.clientWidth - rect.right }
  }
  open.value = !open.value
}

function clear() {
  emit('update:modelValue', [])
  open.value = false
}
</script>

<template>
  <div class="chip-wrap">
    <button
      :class="['filter-chip', { 'filter-chip-open': open, 'filter-chip-active': activeCount > 0 && !open }]"
      @click="toggleOpen"
    >
      <span>{{ label }}</span>
      <span v-if="activeCount > 0" class="chip-badge">{{ activeCount }}</span>
      <span class="mi chip-arrow">{{ open ? 'arrow_drop_up' : 'arrow_drop_down' }}</span>
    </button>

    <Teleport to="body">
      <template v-if="open">
        <div class="click-away" @click="open = false" />
        <div
          class="chip-dropdown"
          :style="{ top: dropPos.top + 'px', right: dropPos.right + 'px' }"
        >
          <label
            v-for="opt in options"
            :key="opt.value"
            class="chip-option"
          >
            <input
              type="checkbox"
              class="filter-checkbox"
              :checked="isChecked(opt.value)"
              @change="toggle(opt.value)"
            />
            <span class="custom-checkbox"></span>
            <span class="opt-label">{{ opt.label }}</span>
          </label>

          <div v-if="activeCount > 0" class="chip-footer">
            <button class="chip-clear" @click.stop="clear">Wis filters</button>
          </div>
        </div>
      </template>
    </Teleport>
  </div>
</template>

<style scoped>
.chip-wrap {
  position: relative;
}

/* ── Trigger chip ── */
.filter-chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 8px 8px 12px;
  border: 1px solid var(--n400);
  border-radius: var(--r-s);
  background: var(--n0);
  font-family: var(--font);
  font-size: 14px;
  font-weight: 600;
  color: var(--n900);
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.15s;
  height: 40px;
  letter-spacing: 0.14px;
}
.filter-chip:hover { border-color: var(--p500); }

.filter-chip-active {
  padding: 8px 8px 8px 16px;
  border-color: var(--p700);
  background: var(--p50);
  color: var(--p700);
}

.chip-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--p500);
  color: var(--n0);
  font-size: 11px;
  font-weight: 700;
  min-width: 18px;
  height: 18px;
  padding: 0 4px;
  border-radius: 100px;
}

.chip-arrow { font-size: 18px; }
.filter-chip-active .chip-arrow { color: var(--p700); }

/* Open state: dropdown visible */
.filter-chip-open {
  background: var(--n100);
  border-color: var(--n700);
  color: var(--n900);
}
.filter-chip-open .chip-arrow { color: var(--n700); }

/* ── Dropdown (Teleported) ── */
.chip-dropdown {
  position: fixed;
  z-index: 300;
  background: var(--n0);
  border-radius: var(--r-s);
  box-shadow: var(--shadow-m);
  padding: 8px;
  min-width: max-content;
}

/* ── Option rows ── */
.chip-option {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 8px;
  cursor: pointer;
  user-select: none;
  border-radius: var(--r-s);
}
.chip-option:hover { background: var(--n100); }

.filter-checkbox {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.custom-checkbox {
  width: 20px;
  height: 20px;
  border: 1px solid var(--n800);
  border-radius: var(--r-s);
  display: inline-block;
  flex-shrink: 0;
  background: var(--n0);
  position: relative;
  transition: background 0.15s, border-color 0.15s;
}

.chip-option:hover .custom-checkbox {
  border-color: var(--n1000);
}

.filter-checkbox:checked + .custom-checkbox {
  background: var(--p500);
  border-color: var(--p500);
}

.chip-option:hover .filter-checkbox:checked + .custom-checkbox {
  background: var(--p600);
  border-color: var(--p600);
}

.filter-checkbox:checked + .custom-checkbox::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 44%;
  width: 5px;
  height: 9px;
  border: 2px solid white;
  border-top: none;
  border-left: none;
  transform: translate(-50%, -50%) rotate(45deg);
}

.opt-label {
  font-family: var(--font);
  font-size: 14px;
  font-weight: 600;
  color: var(--n800);
  letter-spacing: 0.14px;
  line-height: 20px;
  white-space: nowrap;
}

/* ── Footer ── */
.chip-footer {
  padding: 8px 8px 0;
  border-top: 1px solid var(--n300);
  margin-top: 8px;
}

.chip-clear {
  background: none;
  border: none;
  font-family: var(--font);
  font-size: 12px;
  font-weight: 600;
  color: var(--p700);
  cursor: pointer;
  padding: 0;
  transition: color 0.15s;
}
.chip-clear:hover { color: var(--p500); }

/* ── Click-away backdrop ── */
.click-away {
  position: fixed;
  inset: 0;
  z-index: 290;
}
</style>
