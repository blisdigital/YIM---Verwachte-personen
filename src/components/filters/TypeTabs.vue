<script setup>
defineProps({
  modelValue: { type: String, default: null }, // null = Alle | 'Bezoeker' | 'Contractor' (filtert op alle niet-Bezoeker persoontypen)
})
const emit = defineEmits(['update:modelValue'])

function setTab(val) {
  emit('update:modelValue', val)
}
</script>

<template>
  <div class="type-tabs" role="tablist">
    <button
      role="tab"
      :class="['tab-btn', { active: modelValue === null }]"
      :aria-selected="modelValue === null"
      @click="setTab(null)"
    >
      Alle
    </button>
    <button
      role="tab"
      :class="['tab-btn', { active: modelValue === 'Bezoeker' }]"
      :aria-selected="modelValue === 'Bezoeker'"
      @click="setTab('Bezoeker')"
    >
      Bezoekers
    </button>
    <button
      role="tab"
      :class="['tab-btn', { active: modelValue === 'Contractor' }]"
      :aria-selected="modelValue === 'Contractor'"
      @click="setTab('Contractor')"
    >
      Contractors
    </button>
  </div>
</template>

<style scoped>
.type-tabs {
  display: inline-flex;
  align-items: flex-start;
  background: var(--n0);
  border: 1px solid var(--n400);
  border-radius: var(--r-s);
  padding: 2px;
  gap: var(--sp-s);
}

.tab-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--sp-s);
  padding: var(--sp-s) var(--sp-l);
  border: none;
  background: none;
  border-radius: var(--r-s);
  font-family: var(--font);
  font-size: 14px;
  font-weight: 600;
  color: var(--n800);
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
  white-space: nowrap;
  letter-spacing: 0.14px;
  line-height: 20px;
}
.tab-btn:hover:not(.active) { background: var(--n50); }
.tab-btn.active {
  background: var(--p500);
  color: var(--n0);
}

</style>
