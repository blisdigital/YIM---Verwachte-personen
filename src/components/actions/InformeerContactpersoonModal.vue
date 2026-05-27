<script setup>
import ActionPopup from '@/components/ui/ActionPopup.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import InputField from '@/components/ui/InputField.vue'
import CustomSelect from '@/components/ui/CustomSelect.vue'
import { ref, computed, watch } from 'vue'

const props = defineProps({
  open:          { type: Boolean, default: false },
  person:        { type: Object,  default: null },
  initialScreen: { type: String,  default: 'info' },
})
const emit = defineEmits(['update:open', 'confirm'])

// 'info' = contactgegevens scherm, 'mail' = e-mail opstellen scherm
const screen = ref('info')
const bericht = ref('')
const selectedIndex = ref(0)

const contactpersonen = computed(() => props.person?.contactpersonen ?? [])
const hasMultiple = computed(() => contactpersonen.value.length > 1)
const selectedContact = computed(() => contactpersonen.value[selectedIndex.value] ?? null)

const contactOptions = computed(() =>
  contactpersonen.value.map((c, i) => ({ value: i, label: c.naam }))
)

watch(() => props.open, (isOpen) => {
  if (isOpen) screen.value = props.initialScreen
})

function openMailScreen() {
  screen.value = 'mail'
}

function resetForm() {
  screen.value = 'info'
  bericht.value = ''
  selectedIndex.value = 0
}

function cancel() {
  emit('update:open', false)
  resetForm()
}

function confirm() {
  emit('confirm', { person: props.person, contact: selectedContact.value, bericht: bericht.value })
  emit('update:open', false)
  resetForm()
}

function formatTel(tel) {
  if (!tel) return ''
  const digits = tel.replace(/\D/g, '') // '0687654321'
  if (digits.startsWith('0') && digits.length >= 2) {
    return `(+31) ${digits.slice(1, 2)} ${digits.slice(2)}`
  }
  return tel
}
</script>

<template>
  <!-- Scherm 1: contactgegevens — bellen of mailen -->
  <ActionPopup
    :open="open && screen === 'info'"
    title="Contactpersoon informeren"
    width="560px"
    @update:open="emit('update:open', $event)"
  >
    <p class="intro-text">Informeer de contactpersoon door ze te bellen of te mailen.</p>

    <div class="field-group">
      <label class="field-label">Kies contactpersoon</label>
      <CustomSelect
        v-model="selectedIndex"
        :options="contactOptions"
        :disabled="!hasMultiple"
      />
    </div>

    <div v-if="selectedContact" class="contact-rows">
      <a
        v-if="selectedContact.tel"
        :href="`tel:${selectedContact.tel}`"
        class="contact-row"
      >
        <span class="row-icon-wrap">
          <span class="mi row-icon">phone</span>
        </span>
        <span class="row-text">{{ formatTel(selectedContact.tel) }}</span>
      </a>

      <div v-if="selectedContact.email" class="contact-row">
        <span class="row-icon-wrap">
          <span class="mi row-icon">email</span>
        </span>
        <span class="row-text">{{ selectedContact.email }}</span>
        <button class="btn-verstuur-mail" type="button" @click="openMailScreen">
          Verstuur mail
        </button>
      </div>
    </div>
  </ActionPopup>

  <!-- Scherm 2: e-mail opstellen -->
  <ActionPopup
    :open="open && screen === 'mail'"
    title="Contactpersoon informeren"
    width="560px"
    @update:open="emit('update:open', $event)"
  >
    <p class="intro-text">Stuur een bericht naar contactpersoon.</p>

    <div class="field-group">
      <label class="field-label">Contactpersoon</label>
      <CustomSelect
        v-model="selectedIndex"
        :options="contactOptions"
        :disabled="!hasMultiple"
      />
    </div>

    <div class="field-group">
      <label class="field-label" for="informeer-bericht">Verstuur een bericht per e-mail</label>
      <textarea
        id="informeer-bericht"
        v-model="bericht"
        class="field-textarea"
      />
    </div>

    <template #footer>
      <BaseButton variant="ghost" @click="cancel">Annuleren</BaseButton>
      <BaseButton variant="filled" @click="confirm">Versturen</BaseButton>
    </template>
  </ActionPopup>
</template>

<style scoped>
/* ── ActionPopup overrides voor deze modal ── */
:deep(.popup-header) {
  border-bottom: none;
  padding-bottom: 8px;
}

:deep(.popup-body) {
  padding-top: 8px;
}

.intro-text {
  font-size: 14px;
  color: var(--n800);
  line-height: 20px;
  margin: 0;
}

/* ── Dropdown contactpersoon ── */
.field-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field-label {
  font-size: 14px;
  font-weight: 600;
  color: var(--n900);
  line-height: 20px;
  letter-spacing: 0.14px;
}

.select-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  background: var(--n0);
  border-radius: var(--r-s);
  box-shadow: 0 0 0 1px var(--n400);
  transition: box-shadow 0.15s;
  overflow: hidden;
}

.select-wrapper:hover:not(.is-readonly) {
  box-shadow: 0 0 0 1px var(--n800);
}

.select-wrapper:focus-within:not(.is-readonly) {
  box-shadow: 0 0 0 2px var(--p500);
}

.select-wrapper.is-readonly {
  background: var(--n50);
  box-shadow: none;
}

.select-field {
  flex: 1;
  appearance: none;
  background: transparent;
  border: none;
  padding: 8px 12px;
  font-size: 14px;
  font-family: inherit;
  color: var(--n900);
  line-height: 20px;
  cursor: pointer;
  outline: none;
  min-width: 0;
}

.select-wrapper.is-readonly .select-field {
  cursor: default;
  pointer-events: none;
  color: var(--n800);
}

.select-arrow {
  font-size: 24px;
  color: var(--n500);
  flex-shrink: 0;
  padding-right: 8px;
  pointer-events: none;
  line-height: 1;
}

/* ── Contactrijen (scherm 1) ── */
.contact-rows {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.contact-row {
  display: flex;
  align-items: center;
  gap: 0;
  padding: 8px 16px;
  background: var(--n0);
  border: 1px solid var(--n300);
  border-radius: var(--r-s);
  text-decoration: none;
  color: inherit;
}

.row-icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: var(--r-s);
  flex-shrink: 0;
}

.row-icon {
  font-size: 24px;
  color: var(--p700);
}

.row-text {
  flex: 1;
  font-size: 16px;
  font-weight: 600;
  color: var(--p700);
  line-height: 24px;
  letter-spacing: 0.16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.btn-verstuur-mail {
  flex-shrink: 0;
  padding: 8px 12px;
  font-size: 12px;
  font-weight: 600;
  font-family: inherit;
  color: var(--n900);
  background: var(--n0);
  border: 1px solid var(--n400);
  border-radius: var(--r-s);
  cursor: pointer;
  line-height: 16px;
  letter-spacing: 0.12px;
  white-space: nowrap;
}

.btn-verstuur-mail:hover {
  background: var(--n50);
}

/* ── Textarea (scherm 2) ── */
.field-textarea {
  width: 100%;
  height: 96px;
  padding: 8px 12px;
  font-size: 14px;
  color: var(--n900);
  background: var(--n0);
  border: 1px solid var(--n400);
  border-radius: var(--r-s);
  font-family: inherit;
  line-height: 1.5;
  resize: none;
  box-sizing: border-box;
}

.field-textarea:focus {
  outline: none;
  border-color: var(--p500);
  box-shadow: 0 0 0 3px rgba(109, 174, 186, 0.2);
}
</style>
