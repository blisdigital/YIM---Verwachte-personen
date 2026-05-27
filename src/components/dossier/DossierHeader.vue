<script setup>
defineProps({
  person: { type: Object, required: true },
})
</script>

<template>
  <div class="dossier-header">
    <div class="toolbar">
      <button class="back-btn">
        <span class="mi">arrow_back</span>
        Terug
      </button>
    </div>

    <div class="personalia">
      <h1 class="person-name">{{ person.naam }}</h1>
      <div class="person-meta">
        <span class="meta-primary">
          {{ person.persoontype }}
          <template v-if="person.emailadres"> • {{ person.emailadres }}</template>
          <template v-if="person.telefoonnummer"> • {{ person.telefoonnummer }}</template>
          <template v-if="person.bedrijf"> • {{ person.bedrijf }}</template>
        </span>
        <span class="meta-secondary">Laatst bijgewerkt op 26 mei 2026, 11:00</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dossier-header {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.toolbar {
  display: flex;
  align-items: center;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  font-family: var(--font);
  font-size: 16px;
  font-weight: 600;
  color: var(--n800);
  cursor: default;
  padding: 4px 0;
  letter-spacing: 0.16px;
  line-height: 24px;
}

.back-btn:hover { color: var(--n800); }
.back-btn .mi { font-size: 24px; }

.personalia {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-bottom: 40px;
}

.person-name {
  font-family: var(--font);
  font-size: 32px;
  font-weight: 700;
  line-height: 40px;
  color: var(--n900);
  letter-spacing: 0;
}

.person-meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.meta-primary {
  font-family: var(--font);
  font-size: 16px;
  font-weight: 600;
  color: var(--p500);
  letter-spacing: 0.16px;
  line-height: 24px;
}

.meta-secondary {
  font-family: var(--font);
  font-size: 14px;
  font-weight: 400;
  color: var(--n500);
  line-height: 20px;
}
</style>
