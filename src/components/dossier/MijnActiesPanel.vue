<script setup>
defineProps({
  actions: { type: Array, default: () => [] },
})
const emit = defineEmits(['action'])
</script>

<template>
  <aside class="mijn-acties-panel">
    <h2 class="panel-title">Mijn acties</h2>
    <div class="panel-actions">
      <button
        v-for="action in actions"
        :key="action.value"
        class="action-btn"
        @click="emit('action', action.value)"
      >
        <span class="mi">{{ action.icon }}</span>
        {{ action.label }}
      </button>
    </div>
  </aside>
</template>

<style scoped>
.mijn-acties-panel {
  width: 280px;
  flex-shrink: 0;
  background: var(--p700);
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-self: flex-start;
}

.panel-title {
  font-family: var(--font);
  font-size: 24px;
  font-weight: 700;
  line-height: 32px;
  color: var(--n0);
  letter-spacing: -0.12px;
}

.panel-actions {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  padding: 12px 24px 12px 12px;
  font-family: var(--font);
  font-size: 16px;
  font-weight: 600;
  color: var(--n0);
  cursor: pointer;
  text-align: left;
  border-radius: var(--r-s);
  letter-spacing: 0.16px;
  line-height: 24px;
  transition: background 0.15s;
}

.action-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.action-btn .mi {
  font-size: 24px;
}
</style>
