<script setup>
import { ref, computed, watch } from 'vue'
import DatePopover from '@/components/ui/DatePopover.vue'

const props = defineProps({
  modelValue: { type: Date, default: () => new Date() },
  preset: { type: String, default: 'vandaag' },
})
const emit = defineEmits(['update:modelValue', 'update:preset'])

const open = ref(false)
const localDate = ref(toInputDate(props.modelValue))
const localPreset = ref(props.preset)
const popoverPos = ref({ top: 0, right: 0 })
const chipRef = ref(null)
const popoverAnchorRef = ref(null)

function toInputDate(d) {
  if (!d) return ''
  const date = d instanceof Date ? d : new Date(d)
  return date.toISOString().slice(0, 10)
}

function fromInputDate(str) {
  return str ? new Date(str) : new Date()
}

const chipLabel = computed(() => {
  const map = { vandaag: 'Vandaag', morgen: 'Morgen', week: 'Deze week' }
  return localPreset.value
    ? map[localPreset.value] || formatDisplayDate(localDate.value)
    : formatDisplayDate(localDate.value) || 'Datum'
})

const isActive = computed(() => !!(localPreset.value || localDate.value))

function formatDisplayDate(isoStr) {
  if (!isoStr) return ''
  const [y, m, d] = isoStr.split('-')
  return `${d}-${m}-${y}`
}

let rafId = null

// flush: 'post' = fires after DOM update, so popoverAnchorRef.value is guaranteed set
watch(open, (isOpen) => {
  if (isOpen) {
    function loop() {
      if (popoverAnchorRef.value && chipRef.value) {
        const rect = chipRef.value.getBoundingClientRect()
        popoverAnchorRef.value.style.top = (rect.bottom + 4) + 'px'
        popoverAnchorRef.value.style.right = Math.min(
          document.documentElement.clientWidth - rect.right,
          document.documentElement.clientWidth - 280,
        ) + 'px'
      }
      rafId = requestAnimationFrame(loop)
    }
    loop()
  } else {
    cancelAnimationFrame(rafId)
    rafId = null
  }
}, { flush: 'post' })

function toggleOpen() {
  if (!open.value && chipRef.value) {
    // Calc position before v-if renders the element — sets correct initial style
    const rect = chipRef.value.getBoundingClientRect()
    popoverPos.value = {
      top: rect.bottom + 4,
      right: Math.min(
        document.documentElement.clientWidth - rect.right,
        document.documentElement.clientWidth - 280,
      ),
    }
  }
  open.value = !open.value
}

function reset() {
  localPreset.value = 'vandaag'
  localDate.value = toInputDate(new Date())
  open.value = false
  emit('update:preset', 'vandaag')
  emit('update:modelValue', new Date())
}

function apply() {
  open.value = false
  emit('update:preset', localPreset.value)
  emit('update:modelValue', fromInputDate(localDate.value))
}
</script>

<template>
  <div class="date-chip-wrap">
    <button
      ref="chipRef"
      :class="['filter-chip', { 'filter-chip--active': isActive || open }]"
      @click="toggleOpen"
    >
      <span>{{ chipLabel }}</span>
      <span class="mi chip-icon">{{ open ? 'arrow_drop_up' : 'arrow_drop_down' }}</span>
    </button>

    <Teleport to="body">
      <template v-if="open">
        <div class="click-away" @click="open = false" />
        <div
          ref="popoverAnchorRef"
          class="popover-anchor"
          :style="{ top: popoverPos.top + 'px', right: popoverPos.right + 'px' }"
        >
          <DatePopover
            :iso-date="localDate"
            :preset="localPreset"
            @update:iso-date="localDate = $event"
            @update:preset="localPreset = $event"
            @apply="apply"
            @reset="reset"
          />
        </div>
      </template>
    </Teleport>
  </div>
</template>

<style scoped>
.date-chip-wrap {
  position: relative;
}

.filter-chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px 4px 12px;
  border: 1px solid var(--n50);
  border-radius: var(--r-s);
  background: var(--n0);
  font-family: var(--font);
  font-size: 14px;
  font-weight: 600;
  color: var(--n800);
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.15s;
  height: 40px;
  letter-spacing: 0.14px;
  line-height: 20px;
}

.filter-chip--active {
  background: var(--p50);
  border-color: var(--p700);
  color: var(--p700);
}

.popover-anchor {
  position: fixed;
  z-index: 300;
}

.chip-icon {
  width: 24px;
  text-align: center;
  flex-shrink: 0;
}

.click-away {
  position: fixed;
  inset: 0;
  z-index: 290;
}
</style>
