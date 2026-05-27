<script setup>
import ActionPopup from '@/components/ui/ActionPopup.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import CustomSelect from '@/components/ui/CustomSelect.vue'
import Toggle from '@/components/ui/Toggle.vue'
import { ref } from 'vue'

const props = defineProps({
  open:   { type: Boolean, default: false },
  person: { type: Object,  default: null },
})
const emit = defineEmits(['update:open', 'confirm'])

const redenOpties = [
  { value: 'onverwachte-afwezigheid', label: 'Onverwachte afwezigheid' },
  { value: 'afspraak-verzet', label: 'Afspraak verzet' },
  { value: 'geen-toegang-vereist', label: 'Geen toegang vereist' },
  { value: 'veiligheidsrisico', label: 'Veiligheidsrisico' },
  { value: 'anders', label: 'Anders' },
]

const reden         = ref(null)
const toelichting   = ref('')
const notifyContact = ref(false)

function resetForm() {
  reden.value         = null
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
  <ActionPopup :open="open" title="Aanmelding annuleren" width="560px" @update:open="emit('update:open', $event)">
    <p class="intro-text">
      Je staat op het punt de aanmelding van deze persoon te annuleren.
      Dit kan niet ongedaan worden gemaakt. Persoon moet dan opnieuw geregistreerd en aangemeld worden.
    </p>

    <div class="field-group">
      <label class="field-label">Reden (optioneel)</label>
      <CustomSelect
        v-model="reden"
        placeholder="Selecteer een reden"
        :options="redenOpties"
      />
    </div>

    <div class="field-group">
      <label class="field-label" for="annuleren-toelichting">Toelichting (optioneel)</label>
      <textarea id="annuleren-toelichting" v-model="toelichting" class="field-textarea" />
    </div>

    <Toggle
      v-model="notifyContact"
      label="Verstuur e-mail naar contactpersoon dat persoon is geannuleerd."
    />

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
