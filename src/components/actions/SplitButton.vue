<script setup>
import { ref } from 'vue'

const props = defineProps({
  label: { type: String, required: true },
  icon: { type: String, default: null },
  variant: { type: String, default: 'primary' }, // 'primary' | 'outlined'
  options: { type: Array, default: () => [] },
})
const emit = defineEmits(['click', 'select'])

const open = ref(false)

function onMainClick() {
  if (props.options.length) {
    open.value = !open.value
  } else {
    emit('click')
  }
}

function onSelect(option) {
  open.value = false
  emit('select', option.value)
}
</script>

<template>
  <div class="split-btn-wrap">
    <button :class="['split-btn', `split-btn-${variant}`]" @click="onMainClick">
      <span>{{ label }}</span>
      <span class="mi btn-icon">expand_more</span>
    </button>

    <div v-if="open" class="split-dropdown">
      <template v-for="opt in options" :key="opt.value ?? opt.type">
        <div v-if="opt.type === 'divider'" class="split-divider"></div>
        <button
          v-else
          class="split-option"
          @click="onSelect(opt)"
        >
          <span>{{ opt.label }}</span>
        </button>
      </template>
    </div>

    <div v-if="open" class="click-away" @click="open = false"></div>
  </div>
</template>

<style scoped>
.split-btn-wrap {
  position: relative;
  display: inline-flex;
  flex-direction: column;
}

.split-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 48px;
  padding: 12px 12px 12px 24px;
  border-radius: var(--r-s);
  font-family: var(--font);
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  letter-spacing: 0.16px;
  line-height: 24px;
  transition: all 0.15s;
  border: 1px solid transparent;
}

.split-btn-primary {
  background: var(--p500);
  border-color: var(--p500);
  color: var(--n0);
}
.split-btn-primary:hover { background: var(--p700); border-color: var(--p700); }

.split-btn-outlined {
  background: var(--n0);
  border-color: var(--n400);
  color: var(--n900);
}
.split-btn-outlined:hover { background: var(--n50); }

.btn-icon { font-size: 24px; }

.split-dropdown {
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  background: var(--n0);
  border: none;
  border-radius: var(--r-s);
  box-shadow: 0px 4px 16px 0px rgba(17,19,19,0.16);
  z-index: 300;
  min-width: 260px;
  padding: var(--sp-l) 0;
  display: flex;
  flex-direction: column;
  gap: var(--sp-s);
}

.split-option {
  display: flex;
  align-items: flex-start;
  width: 100%;
  padding: var(--sp-xs) var(--sp-l);
  background: none;
  border: none;
  border-radius: var(--r-s);
  font-family: var(--font);
  font-size: 16px;
  font-weight: 600;
  color: var(--p700);
  cursor: pointer;
  text-align: left;
  transition: background 0.15s;
  white-space: normal;
  line-height: 24px;
  letter-spacing: 0.16px;
}
.split-option:hover { background: var(--n50); }

.split-divider {
  height: 1px;
  background: var(--n300);
  flex-shrink: 0;
}

.click-away {
  position: fixed;
  inset: 0;
  z-index: 290;
}
</style>
