<script setup>
import Modal from '@/components/ui/Modal.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import StatusBadge from '@/components/ui/StatusBadge.vue'
import { computed } from 'vue'

const props = defineProps({
  open: { type: Boolean, default: false },
  person: { type: Object, default: null },
  action: { type: String, default: 'inchecken' }, // 'inchecken' | 'uitchecken'
})
const emit = defineEmits(['update:open', 'confirm'])

const isCheckin = computed(() => props.action === 'inchecken')

const title = computed(() => isCheckin.value ? 'Persoon inchecken' : 'Persoon uitchecken')
const confirmLabel = computed(() => isCheckin.value ? 'Inchecken bevestigen' : 'Uitchecken bevestigen')
const newStatus = computed(() => isCheckin.value ? 'Aangekomen' : 'Vertrokken')

function cancel() {
  emit('update:open', false)
}

function confirm() {
  emit('confirm', { person: props.person, action: props.action })
  emit('update:open', false)
}
</script>

<template>
  <Modal :open="open" :title="title" size="sm" @update:open="emit('update:open', $event)">
    <div v-if="person" class="checkin-body">
      <div class="person-info">
        <div class="person-avatar">
          {{ person.naam.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() }}
        </div>
        <div class="person-details">
          <div class="person-name">
            <span v-if="person.vip" class="mi vip-star">star</span>
            {{ person.naam }}
          </div>
          <div class="person-meta">{{ person.bedrijf }}</div>
        </div>
        <StatusBadge :status="person.status" />
      </div>

      <div class="checkin-info">
        <div class="info-row">
          <span class="info-label">Personeelsnr.</span>
          <span class="info-val">{{ person.personeelsnr }}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Aankomsttijd</span>
          <span class="info-val">{{ person.aankomsttijd }}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Locatie(s)</span>
          <span class="info-val">{{ person.locaties.join(', ') }}</span>
        </div>
        <div v-if="person.checkinTime && !isCheckin" class="info-row">
          <span class="info-label">Ingecheckt om</span>
          <span class="info-val">{{ person.checkinTime }}</span>
        </div>
      </div>

      <div class="checkin-message">
        <span class="mi" :class="isCheckin ? 'msg-icon-ok' : 'msg-icon-out'">
          {{ isCheckin ? 'login' : 'logout' }}
        </span>
        <p>
          <template v-if="isCheckin">
            Bevestig het inchecken van <strong>{{ person.naam }}</strong>.
            De status wordt bijgewerkt naar <strong>Aangekomen</strong>.
          </template>
          <template v-else>
            Bevestig het uitchecken van <strong>{{ person.naam }}</strong>.
            De status wordt bijgewerkt naar <strong>Vertrokken</strong>.
          </template>
        </p>
      </div>
    </div>

    <template #footer>
      <BaseButton variant="outlined" @click="cancel">Annuleren</BaseButton>
      <BaseButton variant="primary" :icon="isCheckin ? 'login' : 'logout'" @click="confirm">
        {{ confirmLabel }}
      </BaseButton>
    </template>
  </Modal>
</template>

<style scoped>
.checkin-body {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.person-info {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: var(--n50);
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

.person-details { flex: 1; }

.person-name {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  font-weight: 700;
  color: var(--n900);
}

.vip-star { font-size: 14px; color: var(--vip-border); }

.person-meta {
  font-size: 12px;
  color: var(--n700);
  margin-top: 2px;
}

.checkin-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.info-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.info-label {
  font-size: 12px;
  font-weight: 700;
  color: var(--n700);
  min-width: 120px;
}

.info-val {
  font-size: 13px;
  color: var(--n900);
}

.checkin-message {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 12px;
  border-radius: var(--r-m);
  background: var(--info-bg);
}

.checkin-message .mi {
  font-size: 20px;
  flex-shrink: 0;
  margin-top: 1px;
}

.msg-icon-ok { color: var(--ok); }
.msg-icon-out { color: var(--warn); }

.checkin-message p {
  font-size: 13px;
  color: var(--n900);
  line-height: 1.5;
}
</style>
