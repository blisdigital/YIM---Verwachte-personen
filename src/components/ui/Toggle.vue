<script setup>
const props = defineProps({
  modelValue: { type: Boolean, default: false },
  label:      { type: String,  default: null },
  disabled:   { type: Boolean, default: false },
  id:         { type: String,  default: null },
})

const emit = defineEmits(['update:modelValue'])

const _uid = `toggle-${Math.random().toString(36).slice(2, 8)}`
const toggleId = props.id ?? _uid
</script>

<template>
  <label
    class="toggle"
    :class="{
      'toggle--on':       modelValue,
      'toggle--disabled': disabled,
    }"
  >
    <input
      :id="toggleId"
      type="checkbox"
      class="toggle-input"
      :checked="modelValue"
      :disabled="disabled"
      @change="emit('update:modelValue', $event.target.checked)"
    />
    <span class="toggle-track">
      <span class="toggle-thumb" />
    </span>
    <span v-if="label" class="toggle-label">{{ label }}</span>
  </label>
</template>

<style scoped>
.toggle {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
}

.toggle--disabled {
  cursor: not-allowed;
}

/* Verborgen native checkbox — toegankelijkheid intact */
.toggle-input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  pointer-events: none;
}

.toggle-track {
  display: flex;
  align-items: center;
  width: 56px;
  height: 32px;
  padding: var(--sp-xs);
  background: var(--n100);
  border-radius: var(--r-xl);
  box-sizing: border-box;
  transition: background 150ms ease;
  flex-shrink: 0;
}

/* Off hover */
.toggle:hover:not(.toggle--disabled):not(.toggle--on) .toggle-track {
  background: var(--n200);
}

/* On */
.toggle--on .toggle-track {
  background: var(--p500);
}

/* On hover */
.toggle--on:hover:not(.toggle--disabled) .toggle-track {
  background: var(--p600);
}

/* Focus ring (keyboard nav) */
.toggle-input:focus-visible ~ .toggle-track {
  box-shadow: 0 0 0 2px var(--p50);
}

/* Off focus — track bg */
.toggle:not(.toggle--on) .toggle-input:focus-visible ~ .toggle-track {
  background: var(--n200);
}

/* On focus — track bg */
.toggle--on .toggle-input:focus-visible ~ .toggle-track {
  background: var(--p600);
}

/* Disabled off */
.toggle--disabled:not(.toggle--on) .toggle-track {
  background: var(--n100);
}

/* Disabled on */
.toggle--disabled.toggle--on .toggle-track {
  background: var(--p100);
}

.toggle-thumb {
  width: 24px;
  height: 24px;
  background: var(--n0);
  border-radius: 50%;
  box-shadow: var(--shadow-xs);
  flex-shrink: 0;
  /* Positie via transform — track 56px − 2×4px padding − 24px thumb = 24px */
  transition: transform 150ms ease;
}

.toggle--on .toggle-thumb {
  transform: translateX(24px);
}

.toggle--disabled .toggle-thumb {
  background: var(--n50);
  box-shadow: none;
}

.toggle-label {
  font-size: 14px;
  font-weight: 600;
  color: var(--p800);
  line-height: 20px;
  letter-spacing: 0.14px;
}
</style>
