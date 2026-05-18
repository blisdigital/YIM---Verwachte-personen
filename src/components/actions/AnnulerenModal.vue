<script setup>
import ActionPopup from '@/components/ui/ActionPopup.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { ref } from 'vue'

const props = defineProps({
  open:   { type: Boolean, default: false },
  person: { type: Object,  default: null },
})
const emit = defineEmits(['update:open', 'confirm'])

const reden         = ref('')
const toelichting   = ref('')
const notifyContact = ref(false)

function resetForm() {
  reden.value         = ''
  toelichting.value   = ''
  notifyContact.value = false
}

function cancel() {
  emit('update:open', false)
  resetForm()
}

function confirm() {
  emit('confirm', { person: props.person, reden: reden.value, toelichting: toelichting.value, notifyContact: notifyContact.value })
  emit('update:open', false)
  resetForm()
}
</script>

<template>
  <ActionPopup :open="open" title="Persoon annuleren" width="560px" @update:open="emit('update:open', $event)">
    <p class="intro-text">
      Je staat op het punt de aanmelding van deze persoon te annuleren.
      Dit kan niet ongedaan worden gemaakt. Persoon moet dan opnieuw geregistreerd en aangemeld worden.
    </p>

    <div v-if="person" class="person-card">
      <div class="person-header">
        <div class="person-name">
          <span class="name-text">{{ person.naam }}</span>
          <span v-if="person.vip" class="mi vip-star">star</span>
        </div>
        <div class="person-bedrijf">{{ person.bedrijf }}</div>
      </div>
      <div class="contact-row">
        <span class="mi contact-icon">account_box</span>
        <span class="contact-label">Contactpersoon:</span>
        <span class="contact-value">
          {{ person.contactpersoon }}<template v-if="person.contactEmail"> ({{ person.contactEmail }})</template>
        </span>
      </div>
    </div>

    <div class="field-group">
      <label class="field-label" for="annuleren-reden">Reden (optioneel)</label>
      <div class="select-wrapper">
        <select id="annuleren-reden" v-model="reden" class="field-select">
          <option value="" disabled>Selecteer een reden</option>
          <option value="onverwachte-afwezigheid">Onverwachte afwezigheid</option>
          <option value="afspraak-verzet">Afspraak verzet</option>
          <option value="geen-toegang-vereist">Geen toegang vereist</option>
          <option value="veiligheidsrisico">Veiligheidsrisico</option>
          <option value="anders">Anders</option>
        </select>
        <span class="mi select-arrow">arrow_drop_down</span>
      </div>
    </div>

    <div class="field-group">
      <label class="field-label" for="annuleren-toelichting">Toelichting (optioneel)</label>
      <textarea id="annuleren-toelichting" v-model="toelichting" class="field-textarea" />
    </div>

    <div class="toggle-row">
      <label class="toggle-switch" :class="{ active: notifyContact }">
        <input type="checkbox" v-model="notifyContact" />
        <span class="toggle-track"><span class="toggle-thumb" /></span>
      </label>
      <span class="toggle-label">Verstuur e-mail naar contactpersoon dat persoon is geannuleerd.</span>
    </div>

    <template #footer>
      <BaseButton variant="ghost" @click="cancel">Annuleren</BaseButton>
      <BaseButton variant="filled" @click="confirm">Bevestigen</BaseButton>
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

.person-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  background: var(--p50);
  border-radius: var(--r-s);
}

.person-header {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.person-name {
  display: flex;
  align-items: center;
  gap: var(--sp-s);
}

.name-text {
  font-size: 16px;
  font-weight: 600;
  color: var(--p700);
  line-height: 24px;
  letter-spacing: 0.16px;
}

.vip-star {
  font-size: 24px;
  color: var(--vip-border);
}

.person-bedrijf {
  font-size: 14px;
  color: var(--n700);
  line-height: 20px;
}

.contact-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 8px;
  background: var(--n0);
  border-radius: var(--r-s);
  overflow: hidden;
}

.contact-icon {
  font-size: 20px;
  color: var(--p700);
  flex-shrink: 0;
}

.contact-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--p700);
  line-height: 16px;
  letter-spacing: 0.12px;
  flex-shrink: 0;
}

.contact-value {
  font-size: 12px;
  color: var(--p700);
  line-height: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

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
}

.field-select {
  width: 100%;
  height: 40px;
  padding: 8px 36px 8px 12px;
  font-size: 14px;
  font-weight: 600;
  color: var(--n900);
  background: var(--n0);
  border: 1px solid var(--n400);
  border-radius: var(--r-s);
  appearance: none;
  cursor: pointer;
  font-family: inherit;
  letter-spacing: 0.14px;
  box-sizing: border-box;
  transition: border-color 0.15s;
}

.field-select:hover { border-color: var(--p500); }

.field-select:focus {
  outline: none;
  border-color: var(--p500);
  box-shadow: 0 0 0 3px rgba(109, 174, 186, 0.2);
}

.select-arrow {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 18px;
  color: var(--n700);
  pointer-events: none;
}

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

.toggle-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.toggle-switch {
  position: relative;
  cursor: pointer;
  flex-shrink: 0;
}

.toggle-switch input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-track {
  display: flex;
  align-items: center;
  width: 56px;
  height: 32px;
  background: var(--n100);
  border-radius: var(--r-xl);
  padding: 4px;
  transition: background 150ms ease;
  box-sizing: border-box;
}

.toggle-switch.active .toggle-track {
  background: var(--p500);
}

.toggle-thumb {
  width: 24px;
  height: 24px;
  background: var(--n0);
  border-radius: 50%;
  box-shadow: var(--shadow-xs);
  transition: transform 150ms ease;
  flex-shrink: 0;
}

.toggle-switch.active .toggle-thumb {
  transform: translateX(24px);
}

.toggle-label {
  font-size: 14px;
  font-weight: 600;
  color: var(--p800);
  line-height: 20px;
  letter-spacing: 0.14px;
}
</style>
