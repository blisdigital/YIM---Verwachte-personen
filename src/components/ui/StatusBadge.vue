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
const displayLabel = computed(() => {
  if (props.status === 'No-show') return 'No show'
  return props.status
})
</script>

<template>
  <span :class="['sbadge', statusClass]">{{ displayLabel }}</span>
</template>

<style scoped>
.sbadge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
  line-height: 20px;
  letter-spacing: 0.12px;
  min-width: 90px;
  text-align: center;
}
.sv  { background: #e9f0f8; color: #2464bb; }
.sa  { background: #e9f8f3; color: #24bb86; }
.svo { background: #ebeced; color: #999a9b; }
.sn  { background: #fefbea; color: #9f871c; }
.sg  { background: #f8e9eb; color: #bc243b; }
</style>
