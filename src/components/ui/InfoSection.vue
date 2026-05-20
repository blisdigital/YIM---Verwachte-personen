<script setup>
defineProps({
  title: { type: String, required: true },
  rows:  { type: Array,  default: null },
  // rows: [{ label: string, value: string | null }]
})
</script>

<template>
  <div class="info-section">
    <div class="info-section__header">
      <h3 class="info-section__title">{{ title }}</h3>
    </div>
    <div class="info-section__body">
      <template v-if="rows">
        <div
          v-for="(row, i) in rows"
          :key="i"
          class="info-row"
        >
          <span class="info-row__label">{{ row.label }}</span>
          <span class="info-row__value">{{ row.value ?? '—' }}</span>
        </div>
      </template>
      <slot />
    </div>
  </div>
</template>

<style scoped>
.info-section {
  background: var(--n0);
  border: 1px solid var(--n300);
  border-radius: var(--r-m);
  overflow: hidden;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: var(--sp-l);
  padding-bottom: var(--sp-xxl);
  gap: var(--sp-l);
}

.info-section__header {
  padding: var(--sp-s) var(--sp-l);
}

.info-section__title {
  margin: 0;
  font-family: var(--font);
  font-size: 24px;
  font-weight: 700;
  color: var(--p700);
  line-height: 32px;
  letter-spacing: -0.12px;
}

.info-section__body {
  display: flex;
  flex-direction: column;
}

/* Statische text rijen (via rows prop) */
.info-row {
  display: flex;
  align-items: center;
  gap: var(--sp-l);
  padding: var(--sp-m) var(--sp-l);
  background: var(--p50);
  border-bottom: 1px solid var(--p100);
}

.info-row:first-child {
  border-top: 1px solid var(--p100);
}

.info-row__label {
  width: 200px;
  flex-shrink: 0;
  font-family: var(--font);
  font-size: 16px;
  font-weight: 600;
  color: var(--p700);
  line-height: 24px;
  letter-spacing: 0.16px;
}

.info-row__value {
  flex: 1;
  font-family: var(--font);
  font-size: 16px;
  color: var(--n900);
  line-height: 24px;
}
</style>
