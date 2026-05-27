<script setup>
const props = defineProps({
  title: { type: String, required: true },
  steps: { type: Array, required: true },
  // steps: [{ id: String, label: String, state: 'active' | 'inactive' | 'completed' }]
})

const emit = defineEmits(['back'])
</script>

<template>
  <aside class="process-nav">
    <div class="process-nav__line" aria-hidden="true" />

    <div class="process-nav__content">
      <div class="process-nav__top">
        <h3 class="process-nav__title">{{ title }}</h3>
      </div>

      <ol class="process-nav__steps">
        <li
          v-for="(step, index) in steps"
          :key="step.id"
          class="process-nav__step"
          :class="`process-nav__step--${step.state}`"
        >
          <span class="process-nav__badge">{{ index + 1 }}</span>
          <span class="process-nav__step-label">{{ step.label }}</span>
        </li>
      </ol>
    </div>
  </aside>
</template>

<style scoped>
.process-nav {
  position: relative;
  width: 272px;
  min-height: 100%;
  background: var(--p700);
  display: flex;
  flex-direction: column;
  padding-top: var(--sp-xxl);
  padding-bottom: 40px;
  box-sizing: border-box;
  flex-shrink: 0;
}

/* Verticale decoratieve lijn — achter alle content */
.process-nav__line {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 43px;
  width: 1px;
  background: var(--p800);
  z-index: 0;
}

.process-nav__content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: var(--sp-l);
}

/* Top-blok: terug-knop + titel */
.process-nav__top {
  display: flex;
  flex-direction: column;
  gap: var(--sp-xs);
  padding: var(--sp-s) var(--sp-xxl) var(--sp-s) 56px;
}


.process-nav__title {
  margin: 0;
  font-family: var(--font);
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  letter-spacing: -0.12px;
  color: var(--n0);
}

/* Stappenlijst */
.process-nav__steps {
  list-style: none;
  margin: 0;
  padding: 0 var(--sp-m);
  display: flex;
  flex-direction: column;
}

.process-nav__step {
  display: flex;
  align-items: center;
  gap: var(--sp-m);
  padding: var(--sp-s) var(--sp-l);
  border-radius: var(--r-s);
  min-height: 48px;
  box-sizing: border-box;
}

.process-nav__step--active {
  background: var(--p500);
}

.process-nav__step--inactive,
.process-nav__step--completed {
  background: transparent;
}

/* Badge */
.process-nav__badge {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border-radius: var(--r-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font);
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.16px;
}

.process-nav__step--active .process-nav__badge {
  background: var(--p900);
  color: var(--p50);
}

.process-nav__step--inactive .process-nav__badge,
.process-nav__step--completed .process-nav__badge {
  background: var(--p50);
  color: var(--p900);
}

/* Stap-label */
.process-nav__step-label {
  font-family: var(--font);
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.16px;
  color: var(--n0);
}

.process-nav__step--inactive .process-nav__step-label {
  color: rgba(255, 255, 255, 0.6);
}
</style>
