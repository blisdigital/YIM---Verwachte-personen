<script setup>
import { computed, watch } from 'vue'
import StatusBadge from '@/components/ui/StatusBadge.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const props = defineProps({
  person: { type: Object, default: null },
  open: { type: Boolean, default: false },
})
const emit = defineEmits(['close', 'action'])

const subtitle = computed(() => {
  if (!props.person) return ''
  const { persoontype, personeelsnr, bedrijf } = props.person
  return [persoontype, personeelsnr, bedrijf].filter(Boolean).join(' | ')
})

function formatDatetime(dateStr, timeStr) {
  if (!dateStr || !timeStr) return null
  const [d, m, y] = dateStr.split('-')
  const date = new Date(y, m - 1, d)
  const today = new Date()
  const isToday = date.toDateString() === today.toDateString()
  return `${isToday ? 'Vandaag ' : ''}${dateStr}, ${timeStr}`
}

const aankomstDatetime = computed(() =>
  props.person ? formatDatetime(props.person.datumVanaf, props.person.aankomsttijd) : null
)

const vertrekDatetime = computed(() =>
  props.person?.vertrekTijd ? formatDatetime(props.person.datumVanaf, props.person.vertrekTijd) : null
)

const passstatusLabel = computed(() => {
  if (!props.person) return ''
  return { 'niet-gekoppeld': 'Niet gekoppeld', 'gekoppeld': 'Gekoppeld', 'geprint': 'Geprint' }[props.person.passtatus] || props.person.passtatus
})

const passstatusColor = computed(() => {
  if (!props.person) return 'var(--n400)'
  return { 'niet-gekoppeld': 'var(--n400)', 'gekoppeld': 'var(--info)', 'geprint': 'var(--ok)' }[props.person.passtatus] || 'var(--n400)'
})

const leftActions = computed(() => {
  if (!props.person) return []
  const s = props.person.status
  if (s === 'Verwacht') return [
    { value: 'annuleren', label: 'Persoon annuleren', danger: true },
    { value: 'no-show', label: 'No-show' },
  ]
  if (s === 'No-show') return [
    { value: 'annuleren', label: 'Persoon annuleren', danger: true },
  ]
  return []
})

watch(() => props.open, (isOpen) => {
  document.body.style.overflow = isOpen ? 'hidden' : ''
}, { immediate: true })

const rightActions = computed(() => {
  if (!props.person) return []
  const s = props.person.status
  const dossier = { value: 'bekijk-dossier', label: 'Bekijk dossier' }
  if (s === 'Verwacht') return [
    dossier,
    { value: 'pas-koppelen', label: 'Pas koppelen' },
    { value: 'inchecken', label: 'Persoon inchecken', filled: true },
  ]
  if (s === 'Aangekomen') return [
    dossier,
    { value: 'uitchecken', label: 'Uitchecken', filled: true },
  ]
  if (s === 'No-show') return [
    dossier,
    { value: 'no-show-ongedaan', label: 'No-show ongedaan' },
    { value: 'inchecken', label: 'Persoon inchecken', filled: true },
  ]
  return [dossier]
})
</script>

<template>
  <Transition name="panel">
    <aside v-if="open && person" class="detail-panel">

      <!-- Header -->
      <div class="panel-header">
        <div class="header-info">
          <div class="name-row">
            <h1 class="person-name">{{ person.naam }}</h1>
            <span v-if="person.vip" class="mi vip-star">star</span>
          </div>
          <p class="person-subtitle">{{ subtitle }}</p>
        </div>
        <div class="header-actions">
          <StatusBadge :status="person.status" />
          <button class="close-btn" @click="emit('close')" aria-label="Sluiten">
            <span class="mi">close</span>
          </button>
        </div>
      </div>

      <!-- Scrollable body -->
      <div class="panel-body">

        <!-- Bezoekgegevens -->
        <section class="panel-section">
          <h3 class="section-title">Bezoekgegevens</h3>
          <div class="info-list">
            <div class="info-row">
              <span class="row-label">Aankomstdatum en -tijd</span>
              <span class="row-value">{{ aankomstDatetime }}</span>
            </div>
            <div v-if="vertrekDatetime" class="info-row">
              <span class="row-label">Vertrekdatum en -tijd</span>
              <span class="row-value">{{ vertrekDatetime }}</span>
            </div>
            <div class="info-row">
              <span class="row-label">Locatie(s)</span>
              <div class="location-chips">
                <span v-for="loc in person.locaties" :key="loc" class="location-chip">{{ loc }}</span>
              </div>
            </div>
            <div v-if="person.vip" class="info-row">
              <span class="row-label">VIP</span>
              <span class="mi vip-star-row">star</span>
            </div>
            <div v-if="person.parkeren?.plek" class="info-row">
              <span class="row-label">Parkeerplaats</span>
              <span class="row-value">{{ person.parkeren.plek }}</span>
            </div>
            <div v-if="person.telefoonnummer" class="info-row">
              <span class="row-label">Telefoonnummer</span>
              <div class="row-value-flex">
                <a :href="`tel:${person.telefoonnummer}`" class="action-link">{{ person.telefoonnummer }}</a>
                <a :href="`tel:${person.telefoonnummer}`" class="icon-btn-sm" aria-label="Bellen">
                  <span class="mi icon-sm">call</span>
                </a>
              </div>
            </div>
            <div v-if="person.emailadres" class="info-row">
              <span class="row-label">E-mailadres</span>
              <div class="row-value-flex">
                <a :href="`mailto:${person.emailadres}`" class="action-link">{{ person.emailadres }}</a>
                <a :href="`mailto:${person.emailadres}`" class="icon-btn-sm" aria-label="E-mail sturen">
                  <span class="mi icon-sm">mail</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        <!-- Compliance -->
        <section class="panel-section">
          <h3 class="section-title">Compliance</h3>
          <div class="info-list">
            <div class="info-row">
              <span class="row-label">Dossier</span>
              <div class="compliance-state">
                <span v-if="person.dossier === 'compleet'" class="mi compliance-ok icon-md">check_circle</span>
                <span v-else class="mi compliance-warn icon-md">warning</span>
                <span class="row-value">{{ person.dossier === 'compleet' ? 'Dossier compleet' : 'Dossier onvolledig' }}</span>
              </div>
            </div>
            <div class="info-row">
              <span class="row-label">E-learning</span>
              <div class="compliance-state">
                <span v-if="person.elearning === 'behaald'" class="mi compliance-ok icon-md">check_circle</span>
                <span v-else-if="person.elearning === 'niet-behaald'" class="mi compliance-warn icon-md">warning</span>
                <span v-else class="mi compliance-neutral icon-md">remove_circle_outline</span>
                <span class="row-value">{{
                  person.elearning === 'behaald' ? 'E-learning geldig en behaald'
                  : person.elearning === 'niet-behaald' ? 'E-learning niet behaald'
                  : 'E-learning niet vereist'
                }}</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Contactpersoon -->
        <section class="panel-section">
          <h3 class="section-title">Contactpersoon</h3>
          <div class="info-list">
            <div class="info-row">
              <span class="row-label">Naam contactpersoon</span>
              <span class="row-value">{{ person.contactpersoon }}</span>
            </div>
            <div v-if="person.contactTel" class="info-row">
              <span class="row-label">Telefoonnummer</span>
              <div class="row-value-flex">
                <a :href="`tel:${person.contactTel}`" class="action-link">{{ person.contactTel }}</a>
                <a :href="`tel:${person.contactTel}`" class="icon-btn-sm" aria-label="Bellen">
                  <span class="mi icon-sm">call</span>
                </a>
              </div>
            </div>
            <div v-if="person.contactEmail" class="info-row">
              <span class="row-label">E-mailadres</span>
              <div class="row-value-flex">
                <a :href="`mailto:${person.contactEmail}`" class="action-link">{{ person.contactEmail }}</a>
                <a :href="`mailto:${person.contactEmail}`" class="icon-btn-sm" aria-label="E-mail sturen">
                  <span class="mi icon-sm">mail</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        <!-- Toegangspas -->
        <section class="panel-section">
          <h3 class="section-title">Toegangspas</h3>
          <div class="info-list">
            <div v-if="person.credentialType" class="info-row">
              <span class="row-label">Credential type</span>
              <span class="row-value">{{ person.credentialType }}</span>
            </div>
            <div v-if="person.pasnummer" class="info-row">
              <span class="row-label">Pasnummer</span>
              <span class="row-value mono">{{ person.pasnummer }}</span>
            </div>
            <div class="info-row">
              <span class="row-label">Status</span>
              <div class="pass-status">
                <span class="pass-dot" :style="{ background: passstatusColor }"></span>
                <span class="row-value">{{ passstatusLabel }}</span>
              </div>
            </div>
          </div>
        </section>

      </div>

      <!-- Footer -->
      <div v-if="leftActions.length || rightActions.length" class="panel-footer">
        <div class="footer-left">
          <BaseButton
            v-for="act in leftActions"
            :key="act.value"
            variant="outlined"
            size="md"
            :class="{ 'btn-danger': act.danger }"
            @click="emit('action', { person, action: act.value })"
          >{{ act.label }}</BaseButton>
        </div>
        <div class="footer-right">
          <BaseButton
            v-for="act in rightActions"
            :key="act.value"
            :variant="act.filled ? 'filled' : 'outlined'"
            size="md"
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
/* ── Modal shell ── */
.detail-panel {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 832px;
  max-height: 90vh;
  border-radius: var(--r-m);
  background: var(--n0);
  box-shadow: var(--shadow-m);
  z-index: 600;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* ── Header ── */
.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--sp-m);
  padding: var(--sp-l);
  border-bottom: 1px solid var(--n400);
  flex-shrink: 0;
}

.header-info {
  flex: 1;
  min-width: 0;
}

.name-row {
  display: flex;
  align-items: center;
  gap: var(--sp-s);
}

.person-name {
  font-size: 24px;
  font-weight: 700;
  color: var(--p700);
  line-height: 32px;
  letter-spacing: -0.12px;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.vip-star {
  font-size: 24px;
  color: var(--vip-border);
  flex-shrink: 0;
}

.person-subtitle {
  font-size: 16px;
  font-weight: 400;
  color: var(--n700);
  line-height: 24px;
  margin: 0;
  margin-top: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: var(--sp-s);
  flex-shrink: 0;
}

.close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--r-xl);
  background: none;
  border: none;
  cursor: pointer;
  color: var(--n700);
  transition: background 0.15s;
}
.close-btn:hover { background: var(--n100); }
.close-btn .mi { font-size: 24px; }

/* ── Body ── */
.panel-body {
  flex: 1;
  overflow-y: auto;
}

/* ── Sections ── */
.panel-section {
  padding: var(--sp-s) var(--sp-l) var(--sp-l);
  border-bottom: 1px solid var(--n300);
}
.panel-section:last-child {
  border-bottom: none;
}

.section-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--p700);
  line-height: 20px;
  letter-spacing: 0.14px;
  margin: 0 0 var(--sp-s);
}

/* ── Info list card ── */
.info-list {
  border: 1px solid var(--p100);
  border-radius: var(--r-s);
  overflow: hidden;
}

.info-row {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: var(--sp-s) var(--sp-l);
  background: var(--p50);
  border-bottom: 1px solid var(--p100);
}
.info-row:last-child {
  border-bottom: none;
}

.row-label {
  font-size: 14px;
  font-weight: 600;
  color: var(--p700);
  line-height: 20px;
  letter-spacing: 0.14px;
  width: 180px;
  flex-shrink: 0;
}

.row-value {
  font-size: 14px;
  font-weight: 400;
  color: var(--n800);
  line-height: 20px;
  flex: 1;
  min-width: 0;
}

.row-value.mono {
  font-family: monospace;
  font-size: 13px;
}

/* ── Location chips ── */
.location-chips {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sp-xs);
  flex: 1;
}

.location-chip {
  display: inline-flex;
  align-items: center;
  padding: var(--sp-xs) var(--sp-s);
  background: var(--n0);
  border: 1px solid var(--n300);
  border-radius: var(--r-s);
  font-size: 14px;
  font-weight: 600;
  color: var(--n800);
  line-height: 20px;
  white-space: nowrap;
}

/* ── VIP star in row ── */
.vip-star-row {
  font-size: 20px;
  color: var(--vip-border);
}

/* ── Row with action link + icon button ── */
.row-value-flex {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.action-link {
  font-size: 14px;
  font-weight: 600;
  color: var(--info);
  text-decoration: underline;
  text-underline-offset: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.action-link:hover { opacity: 0.85; }

.icon-btn-sm {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--sp-s);
  border-radius: var(--r-s);
  background: var(--n0);
  border: none;
  cursor: pointer;
  color: var(--n800);
  text-decoration: none;
  flex-shrink: 0;
  transition: background 0.15s;
}
.icon-btn-sm:hover { background: var(--n100); }

.icon-sm { font-size: 16px; }
.icon-md { font-size: 20px; }

/* ── Compliance ── */
.compliance-state {
  display: flex;
  align-items: center;
  gap: var(--sp-s);
  flex: 1;
}

.compliance-ok   { color: var(--ok); }
.compliance-warn { color: var(--warn); }
.compliance-neutral { color: var(--n400); }

/* ── Pass status ── */
.pass-status {
  display: flex;
  align-items: center;
  gap: var(--sp-s);
  flex: 1;
}

.pass-dot {
  width: 12px;
  height: 12px;
  border-radius: var(--r-xl);
  flex-shrink: 0;
}

/* ── Footer ── */
.panel-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--sp-s);
  padding: var(--sp-l);
  border-top: 1px solid var(--n400);
  flex-shrink: 0;
  flex-wrap: wrap;
}

.footer-left,
.footer-right {
  display: flex;
  align-items: center;
  gap: var(--sp-s);
  flex-wrap: wrap;
}

/* Danger variant override for annuleren button */
.footer-left :deep(.btn-danger) {
  color: var(--err);
  border-color: var(--err);
}
.footer-left :deep(.btn-danger:hover:not(:disabled)) {
  background: var(--err-bg);
  border-color: var(--err);
}

/* ── Overlay ── */
.panel-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index: 590;
}

/* ── Transitions ── */
.panel-enter-active,
.panel-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.panel-enter-from,
.panel-leave-to { opacity: 0; transform: translate(-50%, calc(-50% + 8px)); }

.overlay-enter-active,
.overlay-leave-active { transition: opacity 0.25s; }
.overlay-enter-from,
.overlay-leave-to { opacity: 0; }
</style>
