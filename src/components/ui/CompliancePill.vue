<script setup>
import { computed } from 'vue'
const props = defineProps({
  type: { type: String, required: true }, // 'dossier' | 'elearning'
  status: { type: String, required: true },
  reasons: { type: Array, default: null },
  reason: { type: String, default: null },
})

const isOk = computed(() => {
  if (props.type === 'dossier') return props.status === 'compleet'
  if (props.type === 'elearning') return props.status === 'behaald'
  return false
})

const label = computed(() => {
  if (props.type === 'dossier') return 'Dossier'
  if (props.type === 'elearning') return 'E-learning'
  return ''
})

const icon = computed(() => isOk.value ? 'check_circle' : 'warning')

const tooltip = computed(() => {
  if (props.type === 'dossier') {
    if (props.status === 'compleet') return 'Dossier volledig'
    if (props.reasons && props.reasons.length) {
      return props.reasons.map(r => `Dossier onvolledig: ${r}`).join('\n')
    }
    return 'Dossier onvolledig'
  }
  if (props.type === 'elearning') {
    if (props.status === 'behaald') return 'E-learning voltooid'
    if (props.reason === 'niet-afgerond') return 'E-learning verplicht, nog niet afgerond'
    if (props.reason === 'verlopen') return 'E-learning verlopen'
    return 'E-learning niet behaald'
  }
  return null
})
</script>

<template>
  <span
    :class="['cpill', isOk ? 'cpill-ok' : 'cpill-warn']"
    :data-tip="tooltip || undefined"
  >
    <span class="mi">{{ icon }}</span>
    <span class="cpill-label">{{ label }}</span>
  </span>
</template>

<style scoped>
.cpill {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  padding: 4px 12px 4px 8px;
  border-radius: var(--r-xl);
  background: var(--p50);
  color: var(--n900);
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0.14px;
  white-space: nowrap;
  cursor: default;
}
.cpill .mi { font-size: 16px; }
.cpill-ok .mi { color: var(--ok); }
.cpill-warn .mi { color: var(--warn); }
</style>
