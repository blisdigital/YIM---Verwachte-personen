<script setup>
import { watch, getCurrentInstance } from 'vue'
import IconButton from '@/components/ui/IconButton.vue'

const props = defineProps({
  open:  { type: Boolean, default: false },
  title: { type: String,  default: '' },
  width: { type: String,  default: null },
})
const emit = defineEmits(['update:open'])

// Unieke ID per component-instance — voorkomt duplicate id="popup-title" in de DOM
const titleId = `popup-title-${getCurrentInstance()?.uid ?? Math.random().toString(36).slice(2, 7)}`

function close() {
  emit('update:open', false)
}

watch(() => props.open, (val) => {
  document.body.style.overflow = val ? 'hidden' : ''
})
</script>

<template>
  <Teleport to="body">
    <Transition name="popup">
      <div v-if="open" class="popup-backdrop">
        <div class="popup-box" role="dialog" aria-modal="true" :aria-labelledby="title ? titleId : undefined" :style="width ? { width } : undefined">
          <div class="popup-header">
            <h2 :id="titleId" class="popup-title">{{ title }}</h2>
            <IconButton icon="close" aria-label="Sluiten" size="md" variant="ghost" @click="close" />
          </div>
          <div class="popup-body">
            <slot />
          </div>
          <div v-if="$slots.footer" class="popup-footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.popup-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(28, 28, 28, 0.48);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 24px;
}

.popup-box {
  background: var(--n0);
  border-radius: var(--r-l);
  box-shadow: var(--shadow-xl);
  border: 1px solid var(--n300);
  display: flex;
  flex-direction: column;
  width: 480px;
  max-width: 90vw;
  max-height: 92vh;
}

.popup-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 20px 20px 24px;
  border-bottom: 1px solid var(--n300);
  flex-shrink: 0;
  min-height: 64px;
  box-sizing: border-box;
}

.popup-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--n900);
  line-height: 1.3;
}

.popup-body {
  padding: 24px;
  overflow-y: auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.popup-footer {
  padding: 16px 24px;
  border-top: 1px solid var(--n300);
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  align-items: center;
  flex-shrink: 0;
  min-height: 64px;
  box-sizing: border-box;
}

/* ── Transitions ── */
.popup-enter-active {
  transition: opacity 200ms cubic-bezier(0.16, 1, 0.3, 1);
}
.popup-leave-active {
  transition: opacity 150ms ease-in;
}
.popup-enter-from,
.popup-leave-to { opacity: 0; }

.popup-enter-active .popup-box {
  transition: transform 200ms cubic-bezier(0.16, 1, 0.3, 1);
}
.popup-leave-active .popup-box {
  transition: transform 150ms ease-in;
}
.popup-enter-from .popup-box,
.popup-leave-to .popup-box { transform: scale(0.96) translateY(-6px); }

/* ── Tablet: bottom sheet ── */
@media (max-width: 768px) {
  .popup-backdrop {
    align-items: flex-end;
    padding: 0;
  }
  .popup-box {
    width: 100vw;
    max-width: 100vw;
    border-radius: var(--r-l) var(--r-l) 0 0;
    max-height: 92vh;
  }
  .popup-enter-from .popup-box,
  .popup-leave-to .popup-box { transform: translateY(100%); }
}
</style>
