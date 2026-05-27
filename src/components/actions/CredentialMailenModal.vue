<script setup>
import ActionPopup from '@/components/ui/ActionPopup.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const props = defineProps({
  open:   { type: Boolean, default: false },
  person: { type: Object,  default: null },
})
const emit = defineEmits(['update:open', 'confirm'])

function cancel()  { emit('update:open', false) }
function confirm() { emit('confirm'); emit('update:open', false) }
</script>

<template>
  <ActionPopup :open="open" title="Credential mailen" width="480px" @update:open="emit('update:open', $event)">

    <p class="intro-text">Je gaat de credential mail naar het volgende e-mailadres:</p>

    <div class="email-box">
      <span class="email-value">{{ person?.emailadres ?? '—' }}</span>
    </div>

    <template #footer>
      <BaseButton variant="ghost" @click="cancel">Annuleren</BaseButton>
      <BaseButton variant="filled" @click="confirm">Credential versturen</BaseButton>
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

.email-box {
  background: var(--p50);
  border-radius: var(--r-s);
  padding: 16px;
}

.email-value {
  font-size: 16px;
  font-weight: 600;
  color: var(--p700);
  line-height: 24px;
  letter-spacing: 0.16px;
  word-break: break-all;
}
</style>
