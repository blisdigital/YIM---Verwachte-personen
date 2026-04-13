<script setup>
import { computed } from 'vue'
const props = defineProps({
  toast: { type: Object, required: true }
})
const emit = defineEmits(['dismiss'])

const icon = computed(() => {
  const map = { success: 'check_circle', error: 'error', warning: 'warning', info: 'info' }
  return map[props.toast.type] || 'info'
})
</script>

<template>
  <div :class="['toast', `toast-${toast.type}`]">
    <span class="mi toast-icon">{{ icon }}</span>
    <div class="toast-content">
      <div class="toast-title">{{ toast.title }}</div>
      <div v-if="toast.message" class="toast-message">{{ toast.message }}</div>
    </div>
    <button class="toast-close" @click="emit('dismiss', toast.id)">
      <span class="mi">close</span>
    </button>
  </div>
</template>

<style scoped>
.toast {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 12px 16px;
  border-radius: var(--r-m);
  box-shadow: 0 4px 16px rgba(0,0,0,0.12);
  min-width: 280px;
  max-width: 400px;
  background: var(--n0);
  border-left: 4px solid var(--n400);
}

.toast-success { border-left-color: var(--ok); }
.toast-error   { border-left-color: var(--err); }
.toast-warning { border-left-color: var(--warn); }
.toast-info    { border-left-color: var(--info); }

.toast-icon {
  font-size: 20px;
  flex-shrink: 0;
  margin-top: 1px;
}
.toast-success .toast-icon { color: var(--ok); }
.toast-error   .toast-icon { color: var(--err); }
.toast-warning .toast-icon { color: var(--warn); }
.toast-info    .toast-icon { color: var(--info); }

.toast-content { flex: 1; }

.toast-title {
  font-size: 14px;
  font-weight: 700;
  color: var(--n900);
}

.toast-message {
  font-size: 13px;
  color: var(--n700);
  margin-top: 2px;
}

.toast-close {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--n500);
  padding: 0;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  transition: color 0.15s;
}
.toast-close:hover { color: var(--n900); }
.toast-close .mi { font-size: 16px; }
</style>
