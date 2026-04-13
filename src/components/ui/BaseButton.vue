<script setup>
defineProps({
  variant: { type: String, default: 'primary' }, // 'primary' | 'outlined' | 'ghost'
  size: { type: String, default: 'md' },          // 'sm' | 'md'
  icon: { type: String, default: null },
  iconPosition: { type: String, default: 'left' },
  disabled: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  danger: { type: Boolean, default: false },
})
const emit = defineEmits(['click'])
</script>

<template>
  <button
    :class="['btn', `btn-${variant}`, `btn-${size}`, { 'btn-danger': danger, 'btn-loading': loading }]"
    :disabled="disabled || loading"
    @click="emit('click', $event)"
  >
    <span v-if="icon && iconPosition === 'left'" class="mi">{{ icon }}</span>
    <slot />
    <span v-if="icon && iconPosition === 'right'" class="mi">{{ icon }}</span>
  </button>
</template>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 12px 20px;
  border-radius: var(--r-s);
  font-family: var(--font);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  border: 1px solid transparent;
  white-space: nowrap;
  height: 48px;
  box-sizing: border-box;
  letter-spacing: 0.14px;
}
.btn .mi { font-size: 18px; }
.btn:disabled { opacity: 0.5; cursor: not-allowed; }

.btn-primary { background: var(--p500); color: var(--n0); border-color: var(--p500); }
.btn-primary:hover:not(:disabled) { background: #5a9daa; border-color: #5a9daa; }

.btn-outlined { background: var(--n0); color: var(--n900); border-color: var(--n400); }
.btn-outlined:hover:not(:disabled) { background: var(--n50); }

.btn-ghost { background: transparent; color: var(--n800); border-color: transparent; }
.btn-ghost:hover:not(:disabled) { background: var(--n50); }

.btn-danger.btn-ghost { color: var(--err); }
.btn-danger.btn-ghost:hover { background: var(--err-bg); }

.btn-sm { padding: 5px 10px; font-size: 12px; height: 32px; }
.btn-sm .mi { font-size: 14px; }
</style>
