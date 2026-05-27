<script setup>
defineProps({
  modelValue: { type: String, default: 'dossier' },
})
const emit = defineEmits(['update:modelValue'])

const tabs = [
  { id: 'dossier',       label: 'Dossier' },
  { id: 'credentials',   label: 'Credentials' },
  { id: 'autorisaties',  label: 'Autorisaties' },
  { id: 'aanmeldingen',  label: 'Aanmeldingen' },
  { id: 'kwalificaties', label: 'Kwalificaties' },
  { id: 'historie',      label: 'Historie' },
]
</script>

<template>
  <div class="dossier-tabs" role="tablist">
    <button
      v-for="tab in tabs"
      :key="tab.id"
      role="tab"
      :aria-selected="modelValue === tab.id"
      :class="['tab', { 'tab-active': modelValue === tab.id }]"
      @click="emit('update:modelValue', tab.id)"
    >
      {{ tab.label }}
    </button>
  </div>
</template>

<style scoped>
.dossier-tabs {
  display: flex;
  align-items: center;
}

.tab {
  width: 200px;
  padding: 12px 32px;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  font-family: var(--font);
  font-size: 16px;
  font-weight: 400;
  color: var(--n900);
  cursor: pointer;
  text-align: center;
  line-height: 24px;
  letter-spacing: 0;
  white-space: nowrap;
  transition: background 0.15s;
}

.tab:hover:not(.tab-active) {
  background: var(--n50);
}

.tab-active {
  background: var(--p50);
  border-bottom-color: var(--p500);
  font-weight: 500;
  line-height: 28px;
}
</style>
