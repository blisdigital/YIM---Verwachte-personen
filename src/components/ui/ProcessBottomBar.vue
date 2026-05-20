<script setup>
import BaseButton from '@/components/ui/BaseButton.vue'

const props = defineProps({
  flow: { type: String, required: true },          // 'koppelen' | 'printen'
  primaryDisabled: { type: Boolean, default: false },
})

const emit = defineEmits(['cancel', 'submit', 'print', 'activate'])
</script>

<template>
  <div class="process-bottom-bar">
    <div class="bar-left">
      <BaseButton variant="ghost" size="lg" @click="emit('cancel')">Annuleren</BaseButton>
    </div>
    <div class="bar-right">
      <template v-if="flow === 'printen'">
        <BaseButton variant="outlined-brand" size="lg" @click="emit('print')">Printen</BaseButton>
        <BaseButton variant="filled" size="lg" :disabled="primaryDisabled" @click="emit('activate')">Activeren</BaseButton>
      </template>
      <template v-else>
        <BaseButton variant="filled" size="lg" :disabled="primaryDisabled" @click="emit('submit')">Koppelen</BaseButton>
      </template>
    </div>
  </div>
</template>

<style scoped>
.process-bottom-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--p50);
  border-top: 1px solid var(--p100);
  padding: var(--sp-s) var(--sp-l);
  flex-shrink: 0;
  position: sticky;
  bottom: 0;
  z-index: 10;
}

.bar-right {
  display: flex;
  gap: var(--sp-s);
  align-items: center;
}
</style>
