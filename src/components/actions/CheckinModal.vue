<script setup>
import ActionPopup from '@/components/ui/ActionPopup.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import StatusBadge from '@/components/ui/StatusBadge.vue'
import { computed } from 'vue'

const props = defineProps({
  open:   { type: Boolean, default: false },
  person: { type: Object,  default: null },
  action: { type: String,  default: 'inchecken' }, // 'inchecken' | 'uitchecken' | 'no-show-ongedaan'
})
const emit = defineEmits(['update:open', 'confirm'])

const title = computed(() => {
  if (props.action === 'inchecken')         return 'Check-in'
  if (props.action === 'uitchecken')        return 'Check-out'
  if (props.action === 'no-show-ongedaan')  return 'No-show ongedaan maken'
  return ''
})

const introText = computed(() => {
  if (props.action === 'inchecken')         return 'Wil je deze persoon inchecken?'
  if (props.action === 'uitchecken')        return 'Wil je deze persoon uitchecken?'
  if (props.action === 'no-show-ongedaan')  return 'Wil je de no-show van deze persoon ongedaan maken?'
  return ''
})

const isCheckin = computed(() => props.action === 'inchecken')

function cancel()  { emit('update:open', false) }
function confirm() {
  emit('confirm', { person: props.person, action: props.action })
  emit('update:open', false)
}
</script>

<template>
  <ActionPopup :open="open" :title="title" @update:open="emit('update:open', $event)">
    <div v-if="person">
      <p class="intro-text">{{ introText }}</p>

      <div class="person-card">
        <div class="person-avatar">
          {{ person.naam.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() }}
        </div>
        <div class="person-details">
          <div class="person-name">
            <span v-if="person.vip" class="mi vip-star">star</span>
            {{ person.naam }}
          </div>
          <div class="person-sub">{{ person.bedrijf }}</div>
        </div>
        <StatusBadge :status="person.status" />
      </div>

      <div class="person-fields">
        <div class="field-row">
          <span class="field-label">Personeelsnr.</span>
          <span class="field-value">{{ person.personeelsnr }}</span>
        </div>
        <div class="field-row">
          <span class="field-label">Locatie(s)</span>
          <span class="field-value">{{ person.locaties.join(', ') }}</span>
        </div>
        <div class="field-row">
          <span class="field-label">Datum</span>
          <span class="field-value">{{ person.datumVanaf }}</span>
        </div>
        <div class="field-row">
          <span class="field-label">Verwacht om</span>
          <span class="field-value">{{ person.aankomsttijd }}</span>
        </div>
        <div v-if="!isCheckin && person.checkinTime" class="field-row">
          <span class="field-label">Ingecheckt om</span>
          <span class="field-value">{{ person.checkinTime }}</span>
        </div>
      </div>
    </div>

    <template #footer>
      <BaseButton variant="ghost" @click="cancel">Annuleren</BaseButton>
      <BaseButton variant="filled" @click="confirm">Bevestigen</BaseButton>
    </template>
  </ActionPopup>
</template>

<style scoped>
.intro-text {
  font-size: 14px;
  color: var(--n900);
  line-height: 1.5;
}

.person-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: var(--popup-person-bg);
  border-radius: var(--r-m);
}

.person-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--p500);
  color: var(--n0);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  flex-shrink: 0;
}

.person-details { flex: 1; min-width: 0; }

.person-name {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  font-weight: 700;
  color: var(--n900);
}

.vip-star { font-size: 14px; color: var(--vip-border); }

.person-sub {
  font-size: 12px;
  color: var(--n700);
  margin-top: 2px;
}

.person-fields {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field-row {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.field-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--n700);
  min-width: 120px;
  flex-shrink: 0;
}

.field-value {
  font-size: 13px;
  color: var(--n900);
}
</style>
