<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: { type: String, default: 'filled' }, // 'filled' | 'outlined' | 'outlined-brand' | 'ghost' | 'gray' | 'destructive'
  size: { type: String, default: 'md' },        // 'lg' | 'md' | 'sm'
  icon: { type: String, default: null },
  iconPosition: { type: String, default: 'left' },
  disabled: { type: Boolean, default: false },
})
const emit = defineEmits(['click'])

const padding = computed(() => {
  const hasIcon = !!props.icon
  if (props.size === 'lg') {
    if (!hasIcon) return '12px 24px'
    return props.iconPosition === 'left' ? '12px 16px 12px 8px' : '12px 8px 12px 16px'
  }
  if (props.size === 'sm') {
    if (!hasIcon) return '8px 12px'
    return props.iconPosition === 'left' ? '8px 12px 8px 8px' : '8px 8px 8px 12px'
  }
  // md
  if (!hasIcon) return '8px 16px'
  return props.iconPosition === 'left' ? '8px 16px 8px 8px' : '8px 8px 8px 16px'
})
</script>

<template>
  <button
    :class="['btn', `btn-${variant}`, `btn-${size}`]"
    :style="{ padding }"
    :disabled="disabled"
    @click="emit('click', $event)"
  >
    <span v-if="icon && iconPosition === 'left'" class="mi btn-icon">{{ icon }}</span>
    <slot />
    <span v-if="icon && iconPosition === 'right'" class="mi btn-icon">{{ icon }}</span>
  </button>
</template>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--sp-s);
  border-radius: var(--r-s);
  font-family: var(--font);
  font-weight: 600;
  cursor: pointer;
  border: 1px solid transparent;
  white-space: nowrap;
  box-sizing: border-box;
  transition: background 0.15s, border-color 0.15s, box-shadow 0.15s;
}
.btn:disabled { cursor: not-allowed; }

/* ── Sizes ── */
.btn-lg {
  height: 48px;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.16px;
}
.btn-md {
  height: 40px;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.14px;
}
.btn-sm {
  height: 32px;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.12px;
}

.btn-icon { flex-shrink: 0; }
.btn-lg .btn-icon { font-size: 24px; }
.btn-md .btn-icon { font-size: 24px; }
.btn-sm .btn-icon { font-size: 16px; }

/* ── Filled ── */
.btn-filled {
  background: var(--p500);
  color: var(--n0);
  border-color: transparent;
}
.btn-filled:hover:not(:disabled) {
  background: var(--p600);
  box-shadow: var(--shadow-s);
}
.btn-filled:active:not(:disabled) {
  background: var(--p700);
  box-shadow: var(--shadow-s);
}
.btn-filled:disabled {
  background: var(--p100);
  color: var(--n0);
}

/* ── Outlined ── */
.btn-outlined {
  background: var(--n0);
  color: var(--n900);
  border-color: var(--n400);
}
.btn-outlined:hover:not(:disabled) {
  background: var(--n50);
  border-color: var(--n500);
}
.btn-outlined:active:not(:disabled) {
  background: var(--n100);
  border-color: var(--n500);
}
.btn-outlined:disabled {
  color: var(--n400);
  border-color: var(--n300);
}

/* ── Ghost ── */
.btn-ghost {
  background: transparent;
  color: var(--n800);
  border-color: transparent;
}
.btn-ghost:hover:not(:disabled) {
  background: var(--n50);
  color: var(--n900);
}
.btn-ghost:active:not(:disabled) {
  background: var(--n100);
  color: var(--n900);
}
.btn-ghost:disabled {
  color: var(--n400);
}

/* ── Destructive ── */
.btn-destructive {
  background: var(--err);
  color: var(--n0);
  border-color: transparent;
}
.btn-destructive:hover:not(:disabled) {
  background: var(--err-hover);
  box-shadow: var(--shadow-s);
}
.btn-destructive:active:not(:disabled) {
  background: var(--err-active);
}
.btn-destructive:disabled {
  background: var(--err-bg);
  color: var(--n400);
}

/* ── Outlined Brand ── */
.btn-outlined-brand {
  background: var(--n0);
  color: var(--p500);
  border-color: var(--p500);
}
.btn-outlined-brand:hover:not(:disabled) {
  background: var(--p50);
  color: var(--p600);
  border-color: var(--p600);
}
.btn-outlined-brand:active:not(:disabled) {
  background: var(--p100);
  color: var(--p700);
  border-color: var(--p700);
}
.btn-outlined-brand:disabled {
  color: var(--p300);
  border-color: var(--p300);
}

/* ── Gray ── */
.btn-gray {
  background: var(--n50);
  color: var(--n800);
  border-color: transparent;
}
.btn-gray:hover:not(:disabled) {
  background: var(--n100);
  color: var(--n900);
}
.btn-gray:active:not(:disabled) {
  background: var(--n300);
  color: var(--n900);
}
.btn-gray:disabled {
  background: var(--n50);
  color: var(--n400);
}
</style>
