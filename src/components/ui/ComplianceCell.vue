<script setup>
import CompliancePill from './CompliancePill.vue'

defineProps({
  dossier: { type: String, required: true },
  dossierMissing: { type: Array, default: null },
  elearning: { type: String, required: true },
  elearningReason: { type: String, default: null },
})
</script>

<template>
  <div class="compliance-cell">
    <CompliancePill
      type="dossier"
      :status="dossier"
      :reasons="dossierMissing"
    />
    <CompliancePill
      v-if="elearning !== 'niet-vereist'"
      type="elearning"
      :status="elearning"
      :reason="elearningReason"
    />
  </div>
</template>

<style scoped>
.compliance-cell {
  display: flex;
  gap: 4px;
  align-items: center;
}
</style>
