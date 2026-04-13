<script setup>
import { computed } from 'vue'
import StatusBadge from '@/components/ui/StatusBadge.vue'
import ComplianceCell from '@/components/ui/ComplianceCell.vue'
import PassStatusDot from '@/components/ui/PassStatusDot.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const props = defineProps({
  person: { type: Object, default: null },
  open: { type: Boolean, default: false },
})
const emit = defineEmits(['close', 'action'])

const initials = computed(() => {
  if (!props.person) return ''
  return props.person.naam.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
})

const primaryActions = computed(() => {
  if (!props.person) return []
  const status = props.person.status
  if (status === 'Verwacht') return [
    { value: 'inchecken', label: 'Inchecken', icon: 'login', variant: 'primary' },
    { value: 'pas-koppelen', label: 'Pas koppelen', icon: 'credit_card', variant: 'outlined' },
  ]
  if (status === 'Aangekomen') return [
    { value: 'uitchecken', label: 'Uitchecken', icon: 'logout', variant: 'primary' },
    { value: 'pas-printen', label: 'Pas printen', icon: 'print', variant: 'outlined' },
  ]
  if (status === 'No-show') return [
    { value: 'inchecken', label: 'Inchecken', icon: 'login', variant: 'primary' },
    { value: 'no-show-ongedaan', label: 'Ongedaan maken', icon: 'undo', variant: 'outlined' },
  ]
  return []
})

const secondaryActions = computed(() => {
  if (!props.person) return []
  return [
    { value: 'bekijk-dossier', label: 'Bekijk dossier', icon: 'folder_open' },
    { value: 'bel-contactpersoon', label: 'Bel contactpersoon', icon: 'phone' },
  ]
})
</script>

<template>
  <Transition name="panel">
    <aside v-if="open && person" class="detail-panel">
      <!-- Header -->
      <div class="panel-header">
        <div class="person-meta">
          <div :class="['person-avatar', { 'avatar-vip': person.vip }]">{{ initials }}</div>
          <div class="person-info">
            <div class="person-name">
              <span v-if="person.vip" class="mi vip-star">star</span>
              {{ person.naam }}
            </div>
            <div class="person-company">{{ person.bedrijf }}</div>
          </div>
        </div>
        <div class="header-right">
          <StatusBadge :status="person.status" />
          <button class="close-btn" @click="emit('close')" aria-label="Sluiten">
            <span class="mi">close</span>
          </button>
        </div>
      </div>

      <!-- Scrollable content -->
      <div class="panel-body">

        <!-- Bezoekgegevens -->
        <section class="panel-section">
          <h3 class="section-title">Bezoekgegevens</h3>
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">Persoontype</span>
              <span class="info-val">{{ person.persoontype }}</span>
            </div>
            <div v-if="person.contractortype" class="info-item">
              <span class="info-label">Contractortype</span>
              <span class="info-val">{{ person.contractortype }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Locatie(s)</span>
              <span class="info-val">{{ person.locaties.join(', ') }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Datum</span>
              <span class="info-val">{{ person.datumVanaf }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Aankomsttijd</span>
              <span class="info-val">{{ person.aankomsttijd }}</span>
            </div>
            <div v-if="person.checkinTime" class="info-item">
              <span class="info-label">Ingecheckt om</span>
              <span class="info-val ok-text">{{ person.checkinTime }}</span>
            </div>
            <div v-if="person.checkoutTime" class="info-item">
              <span class="info-label">Uitgecheckt om</span>
              <span class="info-val">{{ person.checkoutTime }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Bezoekreden</span>
              <span class="info-val">{{ person.bezoekreden }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Personeelsnr.</span>
              <span class="info-val mono">{{ person.personeelsnr }}</span>
            </div>
          </div>
        </section>

        <div class="panel-divider"></div>

        <!-- Passtatus -->
        <section class="panel-section">
          <h3 class="section-title">Toegangspas</h3>
          <PassStatusDot :passtatus="person.passtatus" />
        </section>

        <div class="panel-divider"></div>

        <!-- Compliance -->
        <section class="panel-section">
          <h3 class="section-title">Compliance</h3>
          <ComplianceCell
            :dossier="person.dossier"
            :dossier-missing="person.dossierMissing"
            :elearning="person.elearning"
          />
        </section>

        <div class="panel-divider"></div>

        <!-- Parkeren -->
        <section class="panel-section">
          <h3 class="section-title">Parkeren</h3>
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">Nodig</span>
              <span class="info-val">{{ person.parkeren.nodig ? 'Ja' : 'Nee' }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Gereserveerd</span>
              <span class="info-val">{{ person.parkeren.gereserveerd ? 'Ja' : 'Nee' }}</span>
            </div>
            <div v-if="person.parkeren.plek" class="info-item">
              <span class="info-label">Parkeerplaats</span>
              <span class="info-val">{{ person.parkeren.plek }}</span>
            </div>
          </div>
        </section>

        <div class="panel-divider"></div>

        <!-- Contact -->
        <section class="panel-section">
          <h3 class="section-title">Contactpersoon</h3>
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">Naam</span>
              <span class="info-val">{{ person.contactpersoon }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Telefoon</span>
              <a :href="`tel:${person.contactTel}`" class="tel-link">{{ person.contactTel }}</a>
            </div>
          </div>
        </section>
      </div>

      <!-- Actions footer -->
      <div v-if="primaryActions.length || secondaryActions.length" class="panel-footer">
        <div v-if="primaryActions.length" class="footer-primary">
          <BaseButton
            v-for="act in primaryActions"
            :key="act.value"
            :variant="act.variant"
            :icon="act.icon"
            size="md"
            @click="emit('action', { person, action: act.value })"
          >{{ act.label }}</BaseButton>
        </div>
        <div v-if="secondaryActions.length" class="footer-secondary">
          <BaseButton
            v-for="act in secondaryActions"
            :key="act.value"
            variant="ghost"
            :icon="act.icon"
            size="sm"
            @click="emit('action', { person, action: act.value })"
          >{{ act.label }}</BaseButton>
        </div>
      </div>
    </aside>
  </Transition>

  <!-- Overlay -->
  <Transition name="overlay">
    <div v-if="open && person" class="panel-overlay" @click="emit('close')"></div>
  </Transition>
</template>

<style scoped>
.detail-panel {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 480px;
  background: var(--n0);
  box-shadow: -4px 0 24px rgba(0,0,0,0.12);
  z-index: 600;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.panel-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 20px 20px 16px;
  border-bottom: 1px solid var(--n300);
  flex-shrink: 0;
  gap: 12px;
}

.person-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  min-width: 0;
}

.person-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--p500);
  color: var(--n0);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: 700;
  flex-shrink: 0;
}
.avatar-vip {
  background: var(--vip-bg);
  color: var(--vip);
  border: 2px solid var(--vip-border);
}

.person-info { flex: 1; min-width: 0; }

.person-name {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 16px;
  font-weight: 700;
  color: var(--n900);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.vip-star { font-size: 16px; color: var(--vip-border); flex-shrink: 0; }

.person-company {
  font-size: 13px;
  color: var(--n700);
  margin-top: 2px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.close-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--n700);
  padding: 6px;
  border-radius: var(--r-s);
  display: flex;
  align-items: center;
  transition: background 0.15s;
}
.close-btn:hover { background: var(--n100); }

.panel-body {
  flex: 1;
  overflow-y: auto;
  padding: 16px 20px;
}

.panel-section { padding: 4px 0 12px; }

.section-title {
  font-size: 11px;
  font-weight: 700;
  color: var(--n700);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 10px;
}

.panel-divider {
  height: 1px;
  background: var(--n300);
  margin: 4px -20px;
}

.info-grid {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.info-item {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.info-label {
  font-size: 12px;
  font-weight: 700;
  color: var(--n700);
  min-width: 130px;
  flex-shrink: 0;
}

.info-val {
  font-size: 13px;
  color: var(--n900);
}

.info-val.ok-text { color: var(--ok); font-weight: 600; }
.info-val.mono { font-family: monospace; font-size: 12px; }

.tel-link {
  font-size: 13px;
  color: var(--p700);
  text-decoration: none;
  font-weight: 600;
}
.tel-link:hover { text-decoration: underline; }

.panel-footer {
  border-top: 1px solid var(--n300);
  padding: 14px 20px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.footer-primary {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.footer-secondary {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}

.panel-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.2);
  z-index: 590;
}

/* Transitions */
.panel-enter-active, .panel-leave-active { transition: transform 0.25s ease; }
.panel-enter-from, .panel-leave-to { transform: translateX(100%); }

.overlay-enter-active, .overlay-leave-active { transition: opacity 0.25s; }
.overlay-enter-from, .overlay-leave-to { opacity: 0; }
</style>
