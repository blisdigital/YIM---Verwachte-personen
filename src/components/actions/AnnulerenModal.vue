<script setup>
import ActionPopup from '@/components/ui/ActionPopup.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { computed } from 'vue'

const props = defineProps({
  open:   { type: Boolean, default: false },
  person: { type: Object,  default: null },
})
const emit = defineEmits(['update:open', 'confirm'])

const personName = computed(() => props.person?.naam ?? '')

function cancel()  { emit('update:open', false) }
function confirm() {
  emit('confirm', { person: props.person })
  emit('update:open', false)
}
</script>

<template>
  <ActionPopup :open="open" title="Persoon annuleren" @update:open="emit('update:open', $event)">
    <div class="warning-block">
      <span class="mi warning-icon">warning</span>
      <p class="warning-text">
        Weet je zeker dat je
        <strong v-if="personName">{{ personName }}</strong><template v-else>deze verwachte persoon</template>
        wil annuleren? De persoon moet opnieuw worden aangemeld.
      </p>
    </div>

    <template #footer>
      <BaseButton variant="ghost" @click="cancel">Annuleren</BaseButton>
      <BaseButton variant="destructive" @click="confirm">Bevestigen</BaseButton>
    </template>
  </ActionPopup>
</template>

<style scoped>
.warning-block {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  background: var(--popup-cancel-bg);
  border: 1px solid var(--popup-cancel-border);
  border-radius: var(--r-m);
}

.warning-icon {
  font-size: 20px;
  color: var(--popup-cancel-icon);
  flex-shrink: 0;
  margin-top: 1px;
}

.warning-text {
  font-size: 14px;
  color: var(--n900);
  line-height: 1.55;
}
</style>
