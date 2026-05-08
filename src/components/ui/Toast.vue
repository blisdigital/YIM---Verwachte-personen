<script setup>
const props = defineProps({
  toast: { type: Object, required: true }
})
const emit = defineEmits(['dismiss'])
</script>

<template>
  <div class="toast">
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
  align-items: center;
  gap: 8px;
  width: 360px;
  padding: 8px 8px 8px 16px;
  border-radius: var(--r-s);
  box-shadow: 0px 4px 8px rgba(17, 19, 19, 0.16);
  background: var(--n900);
}

.toast-content {
  flex: 1;
}

.toast-title {
  font-family: var(--font);
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: var(--n50);
}

.toast-message {
  font-family: var(--font);
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: var(--n50);
  margin-top: 2px;
}

.toast-close {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--n50);
  padding: 8px;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  border-radius: var(--r-s);
  transition: background 0.15s;
}

.toast-close:hover {
  background: rgba(255, 255, 255, 0.1);
}

.toast-close .mi {
  font-size: 24px;
}
</style>
