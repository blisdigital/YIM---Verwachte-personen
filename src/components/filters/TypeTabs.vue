<script setup>
defineProps({
  modelValue: { type: String, default: null }, // null = Alle | 'Bezoeker' | 'Contractor' (filtert op alle niet-Bezoeker persoontypen)
  counts: { type: Object, default: () => ({ alle: 0, bezoekers: 0, contractors: 0 }) }
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
      Alle <span class="tab-count">{{ counts.alle }}</span>
    </button>
    <button
      role="tab"
      :class="['tab-btn', { active: modelValue === 'Bezoeker' }]"
      :aria-selected="modelValue === 'Bezoeker'"
      @click="setTab('Bezoeker')"
    >
      Bezoekers <span class="tab-count">{{ counts.bezoekers }}</span>
    </button>
    <button
      role="tab"
      :class="['tab-btn', { active: modelValue === 'Contractor' }]"
      :aria-selected="modelValue === 'Contractor'"
      @click="setTab('Contractor')"
    >
      Contractors <span class="tab-count">{{ counts.contractors }}</span>
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
  padding-right: var(--sp-m);
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

.tab-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--p100);
  color: var(--p800);
  font-size: 12px;
  font-weight: 600;
  min-width: 20px;
  padding: 2px var(--sp-xs);
  border-radius: var(--r-xl);
  letter-spacing: 0.12px;
  line-height: 16px;
}
</style>
