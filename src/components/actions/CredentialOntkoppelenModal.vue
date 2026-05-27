<script setup>
import ActionPopup from '@/components/ui/ActionPopup.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const props = defineProps({
  open:   { type: Boolean, default: false },
  person: { type: Object,  default: null },
})
const emit = defineEmits(['update:open', 'confirm'])

function cancel() {
  emit('update:open', false)
}

function confirm() {
  emit('confirm', { person: props.person })
  emit('update:open', false)
}
</script>

<template>
  <ActionPopup :open="open" title="Credential ontkoppelen" width="440px" @update:open="emit('update:open', $event)">
    <p class="body-text">Weet je zeker dat je deze credential wil ontkoppelen?</p>

    <template #footer>
      <BaseButton variant="ghost" @click="cancel">Annuleren</BaseButton>
      <BaseButton variant="filled" @click="confirm">Bevestigen</BaseButton>
    </template>
  </ActionPopup>
</template>

<style scoped>
.body-text {
  font-size: 14px;
  color: var(--n800);
  line-height: 20px;
  margin: 0;
}
</style>
