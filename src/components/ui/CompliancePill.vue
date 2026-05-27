<script setup>
import { computed, ref } from 'vue'

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

const tooltipLines = computed(() => {
  if (props.type === 'dossier') {
    if (props.status === 'compleet') return ['Dossier volledig']
    if (props.reasons && props.reasons.length) {
      return props.reasons.map(r => `Dossier onvolledig: ${r}`)
    }
    return ['Dossier onvolledig']
  }
  if (props.type === 'elearning') {
    if (props.status === 'behaald') return ['E-learning voltooid']
    if (props.reason === 'niet-afgerond') return ['E-learning verplicht, nog niet afgerond']
    if (props.reason === 'verlopen') return ['E-learning verlopen']
    return ['E-learning niet behaald']
  }
  return []
})

const pillRef = ref(null)
const showTip = ref(false)
const tipPos = ref({ top: 0, left: 0 })

function onMouseEnter() {
  if (!tooltipLines.value.length) return
  const rect = pillRef.value.getBoundingClientRect()
  tipPos.value = {
    top: rect.top - 8,
    left: rect.left + rect.width / 2,
  }
  showTip.value = true
}

function onMouseLeave() {
  showTip.value = false
}
</script>

<template>
  <span
    ref="pillRef"
    :class="['cpill', isOk ? 'cpill-ok' : 'cpill-warn']"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <span class="mi">{{ icon }}</span>
    <span class="cpill-label">{{ label }}</span>
  </span>

  <Teleport to="body">
    <div
      v-if="showTip && tooltipLines.length"
      class="cpill-tooltip"
      :style="{ top: tipPos.top + 'px', left: tipPos.left + 'px' }"
    >
      <span v-for="(line, i) in tooltipLines" :key="i" class="tip-line">{{ line }}</span>
    </div>
  </Teleport>
</template>

<style scoped>
.cpill {
  display: inline-flex;
  align-items: center;
  gap: var(--sp-xs);
  padding: 4px 12px 4px 8px;
  border-radius: var(--r-xl);
  background: var(--p100);
  color: var(--n900);
  white-space: nowrap;
  cursor: default;
}
.cpill .mi { font-size: 16px; }
.cpill-ok .mi { color: var(--ok); }
.cpill-warn .mi { color: var(--err); }
.cpill-label {
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0.14px;
}
</style>

<style>
/* Not scoped — Teleport renders outside component root */
.cpill-tooltip {
  position: fixed;
  transform: translate(-50%, -100%);
  background: var(--n900);
  color: var(--n0);
  font-family: var(--font);
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  padding: 6px 10px;
  border-radius: var(--r-s);
  white-space: nowrap;
  pointer-events: none;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 2px;
  box-shadow: var(--shadow-s);
}
.cpill-tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 5px solid transparent;
  border-top-color: var(--n900);
}
</style>
