<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  content: { type: [String, Array], required: true },
})

const triggerRef = ref(null)
const visible = ref(false)
const tipPos = ref({ top: 0, left: 0 })

const lines = computed(() =>
  props.content
    ? (Array.isArray(props.content) ? props.content.filter(Boolean) : [props.content])
    : []
)

function onMouseEnter() {
  if (!lines.value.length) return
  const rect = triggerRef.value.getBoundingClientRect()
  tipPos.value = {
    top: rect.top - 8,
    left: rect.left + rect.width / 2,
  }
  visible.value = true
}

function onMouseLeave() {
  visible.value = false
}
</script>

<template>
  <span
    ref="triggerRef"
    class="tooltip-wrap"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <slot />
  </span>

  <Teleport to="body">
    <div
      v-if="visible && lines.length"
      class="tooltip-body"
      :style="{ top: tipPos.top + 'px', left: tipPos.left + 'px' }"
      role="tooltip"
    >
      <span v-for="(line, i) in lines" :key="i">{{ line }}</span>
    </div>
  </Teleport>
</template>

<style scoped>
.tooltip-wrap {
  display: inline-flex;
}
</style>

<style>
/* Not scoped — Teleport renders outside component root */
.tooltip-body {
  position: fixed;
  z-index: 9999;
  transform: translate(-50%, -100%);
  pointer-events: none;
  background: var(--n800);
  color: var(--n50);
  font-family: var(--font);
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0;
  padding: var(--sp-xs) var(--sp-s);
  border-radius: var(--r-xs);
  white-space: nowrap;
  display: flex;
  flex-direction: column;
  gap: 2px;
  box-shadow: 0px 2px 4px rgba(17, 19, 19, 0.16);
}
.tooltip-body::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 5px solid transparent;
  border-top-color: var(--n800);
}
</style>
