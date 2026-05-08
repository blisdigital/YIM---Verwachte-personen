<script setup>
import ActionPopup from '@/components/ui/ActionPopup.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { ref, computed, watch } from 'vue'

const REDEN_OPTIONS = [
  'Persoon heeft niet afgezegd',
  'Persoon heeft afgezegd',
  'Bezoek niet doorgegaan',
  'Onbekend',
]

const props = defineProps({
  open:   { type: Boolean, default: false },
  person: { type: Object,  default: null },
})
const emit = defineEmits(['update:open', 'confirm'])

const selectedReden = ref('')
const opmerking     = ref('')
const showError     = ref(false)

const canConfirm = computed(() => !!selectedReden.value)

// Reset state whenever popup closes — handles both Annuleren-knop én × sluitknop
watch(() => props.open, (val) => {
  if (!val) reset()
})

function cancel() { emit('update:open', false) }

function confirm() {
  if (!canConfirm.value) {
    showError.value = true
    return
  }
  emit('confirm', {
    person:    props.person,
    reden:     selectedReden.value,
    opmerking: opmerking.value || null,
  })
  reset()
  emit('update:open', false)
}

function reset() {
  selectedReden.value = ''
  opmerking.value     = ''
  showError.value     = false
}

function onRedenChange() {
  if (selectedReden.value) showError.value = false
}
</script>

<template>
  <ActionPopup :open="open" title="Registreren als no-show" @update:open="emit('update:open', $event)">
    <div class="field-group">
      <label class="field-label" for="noshow-reden">
        Reden <span class="required-mark" aria-hidden="true">*</span>
      </label>
      <div class="select-wrapper" :class="{ 'is-error': showError }">
        <select
          id="noshow-reden"
          v-model="selectedReden"
          class="field-select"
          @change="onRedenChange"
        >
          <option value="" disabled>Selecteer een reden</option>
          <option v-for="opt in REDEN_OPTIONS" :key="opt" :value="opt">{{ opt }}</option>
        </select>
        <span class="mi select-caret">expand_more</span>
      </div>
      <p v-if="showError" class="error-msg" role="alert">
        <span class="mi error-icon">error</span>
        Selecteer een reden om door te gaan.
      </p>
    </div>

    <div class="field-group">
      <label class="field-label" for="noshow-opmerking">
        Opmerking <span class="optional-mark">(optioneel)</span>
      </label>
      <textarea
        id="noshow-opmerking"
        v-model="opmerking"
        class="field-textarea"
        rows="3"
        placeholder="Voeg een opmerking toe (optioneel)"
      />
    </div>

    <template #footer>
      <BaseButton variant="ghost" @click="cancel">Annuleren</BaseButton>
      <BaseButton variant="filled" @click="confirm">Bevestigen</BaseButton>
    </template>
  </ActionPopup>
</template>

<style scoped>
.field-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field-label {
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0.14px;
  color: var(--n700);
}

.required-mark {
  color: var(--err);
  margin-left: 1px;
}

.optional-mark {
  font-weight: 400;
  color: var(--n500);
}

/* ── Select ── */
.select-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.field-select {
  width: 100%;
  height: 40px;
  box-sizing: border-box;
  font-family: var(--font);
  font-size: 14px;
  color: var(--n900);
  background: var(--popup-field-bg);
  border: 1px solid var(--popup-field-border);
  border-radius: var(--popup-field-radius);
  padding: 0 36px 0 12px;
  appearance: none;
  outline: none;
  cursor: pointer;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.field-select:focus {
  border-color: var(--p500);
  box-shadow: 0 0 0 3px rgba(109, 174, 186, 0.2);
}

.select-wrapper.is-error .field-select {
  border-color: var(--err);
}

.select-caret {
  position: absolute;
  right: 10px;
  font-size: 20px;
  color: var(--n700);
  pointer-events: none;
}

/* ── Textarea ── */
.field-textarea {
  width: 100%;
  box-sizing: border-box;
  font-family: var(--font);
  font-size: 14px;
  color: var(--n900);
  background: var(--popup-field-bg);
  border: 1px solid var(--popup-field-border);
  border-radius: var(--popup-field-radius);
  padding: 8px 12px;
  outline: none;
  resize: vertical;
  min-height: 80px;
  line-height: 1.5;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.field-textarea:focus {
  border-color: var(--p500);
  box-shadow: 0 0 0 3px rgba(109, 174, 186, 0.2);
}

.field-textarea::placeholder { color: var(--n500); }

/* ── Error ── */
.error-msg {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: var(--err);
}

.error-icon { font-size: 14px; }
</style>
