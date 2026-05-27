<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue:   { type: String,  default: '' },
  placeholder:  { type: String,  default: '' },
  label:        { type: String,  default: null },
  required:     { type: Boolean, default: false },
  disabled:     { type: Boolean, default: false },
  readonly:     { type: Boolean, default: false },
  error:        { type: Boolean, default: false },
  errorMessage: { type: String,  default: null },
  id:           { type: String,  default: null },
  leadingIcon:  { type: String,  default: null },
  trailingIcon: { type: String,  default: null },
})

const emit = defineEmits(['update:modelValue'])

const _uid = `input-${Math.random().toString(36).slice(2, 8)}`
const inputId = computed(() => props.id ?? _uid)
</script>

<template>
  <div class="input-wrapper">
    <label v-if="label" :for="inputId" class="input-label">
      {{ label }}<span v-if="required" class="input-required" aria-hidden="true"> *</span>
    </label>
    <div
      class="input-field"
      :class="{
        'input-field--error':    error && !disabled && !readonly,
        'input-field--disabled': disabled,
        'input-field--readonly': readonly,
      }"
    >
      <span v-if="leadingIcon" class="material-icons input-icon" aria-hidden="true">{{ leadingIcon }}</span>
      <input
        :id="inputId"
        class="input-element"
        type="text"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        @input="emit('update:modelValue', $event.target.value)"
      />
      <span v-if="trailingIcon" class="material-icons input-icon" aria-hidden="true">{{ trailingIcon }}</span>
    </div>
    <p v-if="error && errorMessage" class="input-error-msg">{{ errorMessage }}</p>
  </div>
</template>

<style scoped>
.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}

.input-label {
  font-size: 14px;
  font-weight: 600;
  color: var(--n900);
  line-height: 20px;
  letter-spacing: 0.14px;
}

.input-required {
  color: var(--err);
}

/* Border via box-shadow — geen layout-shift bij 1px→2px wissel */
.input-field {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: var(--n0);
  border-radius: var(--r-s);
  box-shadow: 0 0 0 1px var(--n400);
  box-sizing: border-box;
  transition: box-shadow 0.15s;
}

.input-field:hover:not(.input-field--disabled):not(.input-field--readonly):not(.input-field--error) {
  box-shadow: 0 0 0 1px var(--n800);
}

.input-field:focus-within:not(.input-field--disabled):not(.input-field--readonly):not(.input-field--error) {
  box-shadow: 0 0 0 2px var(--p500);
}

.input-field--error {
  box-shadow: 0 0 0 2px var(--err);
}

.input-field--disabled {
  background: var(--n50);
  box-shadow: 0 0 0 1px var(--n300);
  cursor: not-allowed;
}

.input-field--readonly {
  background: var(--n50);
  box-shadow: none;
}

.input-element {
  flex: 1 0 0;
  min-width: 0;
  height: 24px;
  padding: 2px 0;
  border: none;
  outline: none;
  background: transparent;
  font-family: var(--font);
  font-size: 14px;
  color: var(--n900);
  line-height: 20px;
  letter-spacing: 0px;
}

.input-element::placeholder {
  color: var(--n500);
}

.input-element:disabled {
  color: var(--n400);
  cursor: not-allowed;
}

.input-field--readonly .input-element {
  color: var(--n800);
}

.input-icon {
  font-size: 24px;
  color: var(--n500);
  flex-shrink: 0;
  line-height: 1;
  user-select: none;
}

.input-field--disabled .input-icon {
  color: var(--n400);
}

.input-error-msg {
  font-size: 12px;
  color: var(--err);
  line-height: 16px;
  margin: 0;
}
</style>
