<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'

const props = defineProps({
  modelValue: { default: null },
  options:    { type: Array,   default: () => [] }, // [{ value, label }]
  placeholder:{ type: String,  default: 'Kies een optie' },
  disabled:   { type: Boolean, default: false },
})
const emit = defineEmits(['update:modelValue'])

const open      = ref(false)
const triggerRef = ref(null)
const menuRef   = ref(null)
const menuStyle = ref({})

const selectedLabel = computed(() => {
  const found = props.options.find(o => o.value === props.modelValue)
  return found ? found.label : null
})

async function toggle() {
  if (props.disabled) return
  open.value = !open.value
  if (open.value) {
    await nextTick()
    positionMenu()
  }
}

function positionMenu() {
  if (!triggerRef.value || !menuRef.value) return
  const rect = triggerRef.value.getBoundingClientRect()
  menuStyle.value = {
    position: 'fixed',
    top:   `${rect.bottom + 4}px`,
    left:  `${rect.left}px`,
    width: `${rect.width}px`,
    zIndex: 1100,
  }
}

function select(option) {
  emit('update:modelValue', option.value)
  open.value = false
}

function onClickAway(e) {
  if (!open.value) return
  if (
    !menuRef.value?.contains(e.target) &&
    !triggerRef.value?.contains(e.target)
  ) {
    open.value = false
  }
}

onMounted(()        => document.addEventListener('click', onClickAway))
onBeforeUnmount(()  => document.removeEventListener('click', onClickAway))
</script>

<template>
  <div class="custom-select" :class="{ 'is-open': open, 'is-disabled': disabled }">
    <button
      ref="triggerRef"
      type="button"
      class="select-trigger"
      :disabled="disabled"
      @click.stop="toggle"
    >
      <span :class="['trigger-label', { placeholder: !selectedLabel }]">
        {{ selectedLabel ?? placeholder }}
      </span>
      <span class="mi select-arrow" :class="{ rotated: open }">arrow_drop_down</span>
    </button>

    <Teleport to="body">
      <div v-if="open" ref="menuRef" class="select-dropdown" :style="menuStyle">
        <button
          v-for="option in options"
          :key="String(option.value)"
          type="button"
          :class="['select-option', { 'is-active': option.value === modelValue }]"
          @click="select(option)"
        >
          {{ option.label }}
        </button>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.custom-select {
  position: relative;
  width: 100%;
}

.select-trigger {
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  padding: 8px 8px 8px 12px;
  background: var(--n0);
  border: none;
  box-shadow: 0 0 0 1px var(--n400);
  border-radius: var(--r-s);
  font-family: var(--font);
  font-size: 14px;
  color: var(--n900);
  line-height: 20px;
  cursor: pointer;
  text-align: left;
  transition: box-shadow 0.15s;
  box-sizing: border-box;
}

.select-trigger:hover:not(:disabled) {
  box-shadow: 0 0 0 1px var(--n800);
}

.is-open .select-trigger {
  box-shadow: 0 0 0 2px var(--p500);
}

.select-trigger:disabled {
  background: var(--n50);
  box-shadow: none;
  cursor: default;
}

.trigger-label {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--n900);
}

.trigger-label.placeholder {
  color: var(--n500);
}

.select-arrow {
  font-size: 24px;
  color: var(--n500);
  flex-shrink: 0;
  line-height: 1;
  transition: transform 0.15s;
}

.select-arrow.rotated {
  transform: rotate(180deg);
}

/* ── Dropdown ── matches ActionMenu styling ── */
.select-dropdown {
  background: var(--n0);
  border-radius: var(--r-s);
  box-shadow: var(--shadow-m);
  overflow: hidden;
  padding: 16px 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.select-option {
  display: block;
  width: 100%;
  padding: 4px 16px;
  background: none;
  border: none;
  font-family: var(--font);
  font-size: 16px;
  font-weight: 600;
  color: var(--p700);
  cursor: pointer;
  text-align: left;
  line-height: 24px;
  letter-spacing: 0.16px;
  height: 32px;
  transition: background 0.1s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.select-option:hover {
  background: var(--n50);
}

.select-option.is-active {
  background: var(--p50);
  color: var(--p700);
}
</style>
