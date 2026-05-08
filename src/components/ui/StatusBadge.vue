<script setup>
import { computed } from 'vue'
const props = defineProps({ status: { type: String, required: true } })
const statusClass = computed(() => {
  const map = {
    'Verwacht': 'sv',
    'Aangekomen': 'sa',
    'Vertrokken': 'svo',
    'No-show': 'sn',
    'Geannuleerd': 'sg',
  }
  return map[props.status] || ''
})
</script>

<template>
  <span :class="['sbadge', statusClass]">{{ status }}</span>
</template>

<style scoped>
.sbadge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  line-height: 24px;
  letter-spacing: 0.14px;
  min-width: 116px;
  text-align: center;
}
.sv  { background: var(--info-bg); color: var(--info); }
.sa  { background: var(--ok-bg);   color: var(--ok); }
.svo { background: var(--n100);    color: var(--n700); }
.sn  { background: var(--warn-bg); color: var(--warn); }
.sg  { background: var(--err-bg);  color: var(--err); }
</style>
