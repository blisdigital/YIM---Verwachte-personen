<script setup>
import { computed } from 'vue'
const props = defineProps({
  status: { type: String, required: true }
})

const dotColor = computed(() => {
  const map = {
    'niet-actief':  'var(--n400)',
    'actief':       'var(--ok)',
    'verlopen':     'var(--warn)',
    'ingetrokken':  'var(--n500)',
    'geblokkeerd':  'var(--err)',
  }
  return map[props.status] || 'var(--n400)'
})

const label = computed(() => {
  const map = {
    'niet-actief':  'Niet actief',
    'actief':       'Actief',
    'verlopen':     'Verlopen',
    'ingetrokken':  'Ingetrokken',
    'geblokkeerd':  'Geblokkeerd',
  }
  return map[props.status] || props.status
})
</script>

<template>
  <span :class="['pass-dot-wrap', { muted: status === 'niet-actief' }]">
    <span class="dot" :style="{ background: dotColor }"></span>
    <span class="pass-label">{{ label }}</span>
  </span>
</template>

<style scoped>
.pass-dot-wrap {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  line-height: 20px;
  color: var(--n900);
}
.pass-dot-wrap.muted { color: var(--n500); }
.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
}
</style>
