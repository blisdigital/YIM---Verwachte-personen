<script setup>
const props = defineProps({
  variant:   { type: String,  default: 'ghost' }, // 'filled' | 'outlined' | 'ghost' | 'gray'
  size:      { type: String,  default: 'md' },    // 'lg' | 'md' | 'sm'
  icon:      { type: String,  required: true },
  ariaLabel: { type: String,  required: true },
  disabled:  { type: Boolean, default: false },
})
const emit = defineEmits(['click'])
</script>

<template>
  <button
    :class="['icon-btn', `icon-btn--${variant}`, `icon-btn--${size}`]"
    :disabled="disabled"
    :aria-label="ariaLabel"
    @click="emit('click', $event)"
  >
    <span class="mi">{{ icon }}</span>
  </button>
</template>

<style scoped>
.icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  border-radius: var(--r-s);
  cursor: pointer;
  flex-shrink: 0;
  transition: background 0.15s, border-color 0.15s, box-shadow 0.15s;
}
.icon-btn:disabled { cursor: not-allowed; }
.icon-btn .mi { display: flex; align-items: center; justify-content: center; }

/* ── Sizes ── */
.icon-btn--lg { width: 48px; height: 48px; }
.icon-btn--lg .mi { font-size: 24px; }

.icon-btn--md { width: 40px; height: 40px; }
.icon-btn--md .mi { font-size: 24px; }

.icon-btn--sm { width: 32px; height: 32px; }
.icon-btn--sm .mi { font-size: 16px; }

/* ── Filled ── */
.icon-btn--filled            { background: var(--p500); color: var(--n0); }
.icon-btn--filled:hover:not(:disabled)  { background: var(--p600); box-shadow: var(--shadow-s); }
.icon-btn--filled:active:not(:disabled) { background: var(--p700); }
.icon-btn--filled:disabled   { background: var(--p100); color: var(--n0); }

/* ── Outlined ── */
.icon-btn--outlined            { background: var(--n0); color: var(--n900); border-color: var(--n400); }
.icon-btn--outlined:hover:not(:disabled)  { background: var(--n50);  border-color: var(--n500); }
.icon-btn--outlined:active:not(:disabled) { background: var(--n100); border-color: var(--n500); }
.icon-btn--outlined:disabled   { color: var(--n400); border-color: var(--n300); }

/* ── Ghost ── */
.icon-btn--ghost            { background: transparent; color: var(--n700); }
.icon-btn--ghost:hover:not(:disabled)  { background: var(--n100); }
.icon-btn--ghost:active:not(:disabled) { background: var(--n100); color: var(--n900); }
.icon-btn--ghost:disabled   { color: var(--n300); }

/* ── Gray ── */
.icon-btn--gray            { background: var(--n50); color: var(--n700); }
.icon-btn--gray:hover:not(:disabled)  { background: var(--n100); }
.icon-btn--gray:active:not(:disabled) { background: var(--n100); color: var(--n900); }
.icon-btn--gray:disabled   { background: var(--n50); color: var(--n300); }
</style>
