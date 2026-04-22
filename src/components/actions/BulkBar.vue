<script setup>
import { computed } from 'vue'

const props = defineProps({
  count: { type: Number, default: 0 },
  selectedPersons: { type: Array, default: () => [] },
})
const emit = defineEmits(['action', 'clear'])

// Aangekomen → Uitchecken, Pas ontkoppelen, Pas printen
const hasAangekomen = computed(() =>
  props.selectedPersons.some(p => p.status === 'Aangekomen')
)
// Verwacht of No-show → Inchecken, Pas koppelen, Annuleren
const hasVerwachtOrNoshow = computed(() =>
  props.selectedPersons.some(p => p.status === 'Verwacht' || p.status === 'No-show')
)
// Alleen Verwacht → No-show
const hasVerwacht = computed(() =>
  props.selectedPersons.some(p => p.status === 'Verwacht')
)
</script>

<template>
  <div class="bulk-bar">
    <!-- Left side: count + action buttons -->
    <div class="bulk-left">
      <span class="bulk-count">{{ count }} geselecteerd</span>

      <div class="bulk-actions">
        <button
          class="bulk-action"
          :disabled="!hasVerwachtOrNoshow"
          @click="emit('action', 'inchecken')"
        >
          <span class="mi">login</span>
          Inchecken
        </button>

        <button
          class="bulk-action"
          :disabled="!hasAangekomen"
          @click="emit('action', 'uitchecken')"
        >
          <span class="mi">logout</span>
          Uitchecken
        </button>

        <button
          class="bulk-action"
          :disabled="!hasVerwachtOrNoshow"
          @click="emit('action', 'pas-koppelen')"
        >
          <span class="mi">credit_card</span>
          Pas koppelen
        </button>

        <button
          class="bulk-action"
          :disabled="!hasAangekomen"
          @click="emit('action', 'pas-ontkoppelen')"
        >
          <span class="mi">credit_card_off</span>
          Pas ontkoppelen
        </button>

        <button
          class="bulk-action"
          :disabled="!hasAangekomen"
          @click="emit('action', 'pas-printen')"
        >
          <span class="mi">print</span>
          Pas printen
        </button>

        <button
          class="bulk-action"
          :disabled="!hasVerwacht"
          @click="emit('action', 'no-show')"
        >
          <span class="mi">person_off</span>
          No-show
        </button>

        <button
          class="bulk-action bulk-action--danger"
          :disabled="!hasVerwachtOrNoshow"
          @click="emit('action', 'annuleren')"
        >
          <span class="mi">close</span>
          Annuleren
        </button>
      </div>
    </div>

    <!-- Right side: close button -->
    <button class="bulk-close" @click="emit('clear')" aria-label="Selectie wissen">
      <span class="mi">close</span>
    </button>
  </div>
</template>

<style scoped>
.bulk-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--p50);
  height: 48px;
  border-radius: 4px;
  padding: 0 16px;
  overflow: clip;
  margin-bottom: var(--sp-s);
}

/* ── Left side ─────────────────────────────── */
.bulk-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.bulk-count {
  font-size: 14px;
  font-weight: 600;
  color: var(--p700);
  white-space: nowrap;
}

.bulk-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* ── Action buttons ────────────────────────── */
.bulk-action {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 32px;
  padding: 0 12px 0 8px;
  background: var(--n0);
  border: 1px solid var(--n400);
  border-radius: 4px;
  font-family: var(--font);
  font-size: 12px;
  font-weight: 600;
  color: var(--n900);
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.15s, border-color 0.15s;
}

.bulk-action .mi {
  font-size: 16px;
  color: var(--n900);
}

.bulk-action:hover:not(:disabled) {
  background: var(--n100);
}

.bulk-action:disabled {
  border-color: var(--n300);
  color: var(--n400);
  cursor: not-allowed;
  pointer-events: none;
}

.bulk-action:disabled .mi {
  color: var(--n400);
}

/* ── Danger variant (Annuleren) ────────────── */
.bulk-action--danger {
  color: var(--err);
}

.bulk-action--danger .mi {
  color: var(--err);
}

.bulk-action--danger:hover:not(:disabled) {
  background: var(--err-bg, #fdf0f2);
}

/* ── Close button ──────────────────────────── */
.bulk-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  background: none;
  border: none;
  border-radius: var(--r-xl);
  color: var(--n900);
  cursor: pointer;
  transition: background 0.15s;
}

.bulk-close .mi {
  font-size: 16px;
}

.bulk-close:hover {
  background: rgba(17, 19, 19, 0.06);
}
</style>
