<script setup>
import ActionPopup from '@/components/ui/ActionPopup.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { ref } from 'vue'

const props = defineProps({
  open:   { type: Boolean, default: false },
  person: { type: Object,  default: null },
})
const emit = defineEmits(['update:open', 'confirm'])

const bericht = ref('')

function resetForm() {
  bericht.value = ''
}

function cancel() {
  emit('update:open', false)
  resetForm()
}

function confirm() {
  emit('confirm', { person: props.person, bericht: bericht.value })
  emit('update:open', false)
  resetForm()
}
</script>

<template>
  <ActionPopup :open="open" title="Informeer contactpersoon" width="560px" @update:open="emit('update:open', $event)">
    <p class="intro-text">Verstuur een e-mail naar contactpersoon:</p>

    <div v-if="person && (person.contactpersoon || person.contactEmail)" class="contact-chip">
      <span class="mi contact-icon">account_box</span>
      <span class="contact-naam">{{ person.contactpersoon }}</span>
      <span v-if="person.contactEmail" class="contact-email">{{ person.contactEmail }}</span>
    </div>

    <div class="field-group">
      <label class="field-label" for="informeer-bericht">Bericht</label>
      <textarea
        id="informeer-bericht"
        v-model="bericht"
        class="field-textarea"
        placeholder="Typ hier uw bericht..."
      />
    </div>

    <template #footer>
      <BaseButton variant="ghost" @click="cancel">Annuleren</BaseButton>
      <BaseButton variant="filled" @click="confirm">Bericht versturen</BaseButton>
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

.contact-chip {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: var(--p50);
  border-radius: var(--r-s);
  overflow: hidden;
}

.contact-icon {
  font-size: 20px;
  color: var(--p700);
  flex-shrink: 0;
}

.contact-naam {
  font-size: 14px;
  font-weight: 600;
  color: var(--p700);
  line-height: 20px;
  letter-spacing: 0.14px;
  white-space: nowrap;
}

.contact-email {
  font-size: 14px;
  color: var(--p700);
  line-height: 20px;
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

.field-textarea {
  width: 100%;
  height: 120px;
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
