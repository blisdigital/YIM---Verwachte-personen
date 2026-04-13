<script setup>
import { computed } from 'vue'
const props = defineProps({
  passtatus: { type: String, required: true }
})

const dotColor = computed(() => {
  const map = {
    'niet-gekoppeld': '#999a9b',
    'gekoppeld': '#2464bb',
    'geprint': '#24bb86',
  }
  return map[props.passtatus] || '#999a9b'
})

const label = computed(() => {
  const map = {
    'niet-gekoppeld': 'Niet gekoppeld',
    'gekoppeld': 'Gekoppeld',
    'geprint': 'Geprint',
  }
  return map[props.passtatus] || props.passtatus
})
</script>

<template>
  <span :class="['pass-dot-wrap', { muted: passtatus === 'niet-gekoppeld' }]">
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
