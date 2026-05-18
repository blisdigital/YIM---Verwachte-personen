<script setup>
import ActionPopup from '@/components/ui/ActionPopup.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import InputField from '@/components/ui/InputField.vue'
import Toggle from '@/components/ui/Toggle.vue'
import { ref, computed } from 'vue'

const props = defineProps({
  open:                      { type: Boolean, default: false },
  person:                    { type: Object,  default: null },
  requiresIdentiteitscontrole: { type: Boolean, default: false },
  showContactpersoonToggle:  { type: Boolean, default: false },
})
const emit = defineEmits(['update:open', 'confirm'])

const documentnummer = ref('')
const notifyContact  = ref(false)

const canConfirm = computed(() =>
  !props.requiresIdentiteitscontrole || documentnummer.value.trim() !== ''
)

function resetForm() {
  documentnummer.value = ''
  notifyContact.value  = false
}

function cancel() {
  emit('update:open', false)
  resetForm()
}

function confirm() {
  if (!canConfirm.value) return
  emit('confirm', {
    person:         props.person,
    documentnummer: documentnummer.value,
    notifyContact:  notifyContact.value,
  })
  emit('update:open', false)
  resetForm()
}
</script>

<template>
  <ActionPopup :open="open" title="Persoon aanmelden" width="560px" @update:open="emit('update:open', $event)">
    <p class="intro-text">Je gaat de volgende persoon aanmelden:</p>

    <div v-if="person" class="person-card">
      <div class="person-header">
        <div class="person-name">
          <span class="name-text">{{ person.naam }}</span>
          <span v-if="person.vip" class="mi vip-star">star</span>
        </div>
        <div class="person-subline">{{ person.persoontype }} • {{ person.bedrijf }}</div>
      </div>
      <div class="contact-row">
        <span class="contact-label">Contactpersoon:</span>
        <span class="contact-value">
          {{ person.contactpersoon }}<template v-if="person.contactEmail"> ({{ person.contactEmail }})</template>
        </span>
      </div>
    </div>

    <template v-if="requiresIdentiteitscontrole">
      <p class="section-heading">Identiteitscontrole</p>
      <InputField
        id="aanmelden-documentnummer"
        v-model="documentnummer"
        label="Vul documentnummer in ter bevestiging van controle"
        :required="true"
      />
    </template>

    <Toggle
      v-if="showContactpersoonToggle"
      v-model="notifyContact"
      label="Verstuur e-mail naar contactpersoon dat persoon is aangemeld."
    />

    <template #footer>
      <BaseButton variant="ghost" @click="cancel">Annuleren</BaseButton>
      <BaseButton variant="filled" :disabled="!canConfirm" @click="confirm">Bevestigen</BaseButton>
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
  gap: 10px;
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

.person-subline {
  font-size: 14px;
  font-weight: 600;
  color: var(--p500);
  line-height: 20px;
  letter-spacing: 0.14px;
}

.contact-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 8px;
  background: var(--n0);
  border-radius: var(--r-s);
  overflow: hidden;
  white-space: nowrap;
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
}

.section-heading {
  font-size: 18px;
  font-weight: 700;
  color: var(--p700);
  line-height: 24px;
  margin: 0;
}
</style>
