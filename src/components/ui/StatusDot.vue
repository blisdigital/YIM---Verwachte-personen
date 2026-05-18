<script setup>
import { computed } from 'vue'
const props = defineProps({ status: { type: String, required: true } })

const dotColor = computed(() => {
  const map = {
    'Verwacht':             'var(--info)',
    'Nog niet aangekomen':  'var(--warn-y500)',
    'Aangemeld':            'var(--ok)',
    'Afgemeld':             'var(--n800)',
    'Niet aangekomen':      'var(--err)',
    'Geannuleerd':          'var(--n400)',
  }
  return map[props.status] || 'var(--n400)'
})
</script>

<template>
  <span class="sdot-wrap">
    <span class="sdot" :style="{ background: dotColor }"></span>
    <span class="slabel">{{ status }}</span>
  </span>
</template>

<style scoped>
.sdot-wrap {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
}

.sdot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
}

.slabel {
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0.14px;
  color: inherit;
}
</style>
