<script setup>
import { ref, watch } from 'vue'
import ActionPopup from '@/components/ui/ActionPopup.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import CustomSelect from '@/components/ui/CustomSelect.vue'
import InputField from '@/components/ui/InputField.vue'
import { useToast } from '@/composables/useToast'

const props = defineProps({
  open:   { type: Boolean, default: false },
  person: { type: Object,  default: null },
})
const emit = defineEmits(['update:open', 'confirm'])

const { show } = useToast()

const step = ref(1)
const method = ref(null)
const email = ref('')
const emailEditing = ref(false)

const methodOptions = [
  { value: 'locatie', label: 'Activeer op locatie' },
  { value: 'email',   label: 'Verstuur een mail' },
]

function generatePin(personId) {
  const seed = personId * 7919 + 1013
  return String(seed % 1000000).padStart(6, '0')
}

function generateCursusCode(personId) {
  const num = ((personId * 3571 + 847) % 9000) + 1000
  return `EL-2024-${num}`
}

// Reset form when modal opens
watch(() => props.open, (val) => {
  if (val && props.person) {
    step.value = 1
    method.value = null
    email.value = props.person.emailadres || ''
    emailEditing.value = !props.person.emailadres
  }
})

function close() {
  emit('update:open', false)
  step.value = 1
  method.value = null
  email.value = ''
  emailEditing.value = false
}

function goNext() {
  if (!method.value) return
  step.value = 2
}

function goBack() {
  step.value = 1
}

function sendEmail() {
  if (!email.value.trim()) return
  emit('confirm', { person: props.person, method: 'email' })
  show('Uitnodiging verstuurd', `E-learning uitnodiging verstuurd naar ${email.value}.`)
  close()
}

function printInfo() {
  if (!props.person) return
  const pin = generatePin(props.person.id)
  const code = generateCursusCode(props.person.id)
  const w = window.open('', '_blank', 'width=480,height=500')
  w.document.write(`<!DOCTYPE html>
<html><head><title>E-learning — ${props.person.naam}</title>
<style>
  body { font-family: Arial, sans-serif; padding: 40px 32px; margin: 0; }
  h1 { font-size: 14px; color: #666; margin: 0 0 24px; font-weight: 400; }
  h2 { font-size: 20px; color: #222; margin: 0 0 4px; }
  .sub { font-size: 14px; color: #666; margin-bottom: 32px; }
  .divider { border: none; border-top: 1px solid #ddd; margin: 24px 0; }
  table { width: 100%; border-collapse: collapse; }
  td { padding: 10px 0; font-size: 15px; }
  td:first-child { font-weight: 600; color: #555; width: 140px; }
  td:last-child { color: #111; }
  .pin { font-family: 'Courier New', monospace; font-size: 20px; font-weight: 700; letter-spacing: 4px; }
</style></head><body>
<h1>E-learning activatie</h1>
<h2>${props.person.naam}</h2>
<div class="sub">${props.person.persoontype} &middot; ${props.person.bedrijf}</div>
<hr class="divider">
<table>
  <tr><td>Naam training</td><td>Veiligheidstraining</td></tr>
  <tr><td>Cursus-code</td><td>${code}</td></tr>
  <tr><td>Pincode</td><td class="pin">${pin}</td></tr>
</table>
<hr class="divider">
<p style="font-size: 12px; color: #888;">Gebruik de cursus-code en pincode om de e-learning te starten.</p>
</body></html>`)
  w.document.close()
  w.print()
}
</script>

<template>
  <ActionPopup
    :open="open"
    title="E-learning code"
    width="480px"
    @update:open="emit('update:open', $event)"
  >
    <!-- Stap 1: Keuze -->
    <template v-if="step === 1">
      <p class="intro-text">
        Kies hoe de e-learning gestart wordt voor <strong>{{ person?.naam }}</strong>.
      </p>

      <div class="field">
        <label class="field-label">Methode</label>
        <CustomSelect
          v-model="method"
          :options="methodOptions"
          placeholder="Kies een optie"
        />
      </div>
    </template>

    <!-- Stap 2a: Activeer op locatie -->
    <template v-if="step === 2 && method === 'locatie'">
      <div class="info-rows">
        <div class="info-row">
          <span class="info-row__label">Naam training</span>
          <span class="info-row__value">Veiligheidstraining</span>
        </div>
        <div class="info-row">
          <span class="info-row__label">Cursus-code</span>
          <span class="info-row__value">{{ person ? generateCursusCode(person.id) : '—' }}</span>
        </div>
        <div class="info-row">
          <span class="info-row__label">Pincode</span>
          <span class="info-row__value">{{ person ? generatePin(person.id) : '—' }}</span>
        </div>
      </div>
    </template>

    <!-- Stap 2b: Verstuur een mail -->
    <template v-if="step === 2 && method === 'email'">
      <p class="intro-text">
        De persoon ontvangt een e-mail met een link naar de e-learning module.
      </p>

      <div class="field">
        <label class="field-label">E-mailadres</label>
        <!-- Read-only met potlood-icoon -->
        <div v-if="!emailEditing" class="email-readonly">
          <span class="email-readonly__value">{{ email }}</span>
          <button type="button" class="email-readonly__edit" aria-label="E-mailadres bewerken" @click="emailEditing = true">
            <span class="mi">edit</span>
          </button>
        </div>
        <!-- Bewerkbaar inputveld -->
        <InputField
          v-else
          id="elearning-email"
          v-model="email"
          placeholder="Vul e-mailadres in"
        />
      </div>
    </template>

    <template #footer>
      <!-- Stap 1 footer -->
      <template v-if="step === 1">
        <BaseButton variant="ghost" @click="close">Annuleren</BaseButton>
        <BaseButton variant="filled" :disabled="!method" @click="goNext">Volgende</BaseButton>
      </template>

      <!-- Stap 2a footer -->
      <template v-if="step === 2 && method === 'locatie'">
        <BaseButton class="push-left" variant="ghost" @click="goBack">Terug</BaseButton>
        <BaseButton variant="outlined" @click="close">Sluiten</BaseButton>
        <BaseButton variant="filled" @click="printInfo">Printen</BaseButton>
      </template>

      <!-- Stap 2b footer -->
      <template v-if="step === 2 && method === 'email'">
        <BaseButton class="push-left" variant="ghost" @click="goBack">Terug</BaseButton>
        <BaseButton variant="filled" :disabled="!email.trim()" @click="sendEmail">Verstuur uitnodiging</BaseButton>
      </template>
    </template>
  </ActionPopup>
</template>

<style scoped>
.intro-text {
  font-size: 14px;
  color: var(--n800);
  line-height: 20px;
  margin: 0;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.push-left {
  margin-right: auto;
}

.field-label {
  font-size: 14px;
  font-weight: 600;
  color: var(--n700);
  line-height: 20px;
}

.info-rows {
  display: flex;
  flex-direction: column;
  margin: -16px -24px 0;
}

.info-row {
  display: flex;
  align-items: center;
  gap: var(--sp-l);
  padding: var(--sp-m) 24px;
  background: var(--p50);
  border-bottom: 1px solid var(--p100);
}

.info-row:first-child {
  border-top: 1px solid var(--p100);
}

.info-row__label {
  width: 200px;
  flex-shrink: 0;
  font-family: var(--font);
  font-size: 16px;
  font-weight: 600;
  color: var(--p700);
  line-height: 24px;
  letter-spacing: 0.16px;
}

.info-row__value {
  flex: 1;
  font-family: var(--font);
  font-size: 16px;
  color: var(--n900);
  line-height: 24px;
}

.email-readonly {
  display: flex;
  align-items: center;
  height: 40px;
  padding: 8px 8px 8px 12px;
  background: var(--n50);
  border-radius: var(--r-s);
  box-sizing: border-box;
}

.email-readonly__value {
  flex: 1;
  font-family: var(--font);
  font-size: 14px;
  color: var(--n800);
  line-height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.email-readonly__edit {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  padding: 0;
  border: none;
  border-radius: var(--r-s);
  background: none;
  color: var(--n500);
  cursor: pointer;
  flex-shrink: 0;
}

.email-readonly__edit:hover {
  background: var(--n200);
  color: var(--n700);
}

.email-readonly__edit .mi {
  font-size: 18px;
}
</style>
