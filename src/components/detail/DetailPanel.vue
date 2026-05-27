<script setup>
import { computed, watch } from 'vue'
import StatusDot from '@/components/ui/StatusDot.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const props = defineProps({
  person: { type: Object, default: null },
  open: { type: Boolean, default: false },
})
const emit = defineEmits(['close', 'action'])

const subtitle = computed(() => {
  if (!props.person) return ''
  const { persoontype, bedrijf } = props.person
  return [persoontype, bedrijf].filter(Boolean).join(' • ')
})

function formatDatum(dateStr) {
  if (!dateStr) return null
  const [d, m, y] = dateStr.split('-')
  const date = new Date(y, m - 1, d)
  const today = new Date()
  const isToday = date.toDateString() === today.toDateString()
  return `${d}/${m}/${y}${isToday ? ' (vandaag)' : ''}`
}

const datumFormatted = computed(() =>
  props.person ? formatDatum(props.person.datumVanaf) : null
)

const isCompliant = computed(() => {
  if (!props.person) return true
  return props.person.dossier === 'compleet' && props.person.elearning !== 'niet-behaald'
})

const credentialStatusLabel = computed(() => {
  if (!props.person) return ''
  return {
    'niet-actief': 'Niet actief',
    'actief': 'Actief',
    'verlopen': 'Verlopen',
    'ingetrokken': 'Ingetrokken',
    'geblokkeerd': 'Geblokkeerd',
  }[props.person.credentialStatus] || props.person.credentialStatus
})

const credentialStatusColor = computed(() => {
  if (!props.person) return 'var(--n500)'
  return {
    'niet-actief': 'var(--n400)',
    'actief': 'var(--ok)',
    'verlopen': 'var(--warn)',
    'ingetrokken': 'var(--n500)',
    'geblokkeerd': 'var(--err)',
  }[props.person.credentialStatus] || 'var(--n500)'
})

const leftActions = computed(() => {
  if (!props.person) return []
  return [{ value: 'bekijk-dossier', label: 'Bekijk dossier' }]
})

const isPrintbaar = computed(() => {
  return props.person?.credentialType === 'QR-code'
})

const rightActions = computed(() => {
  if (!props.person) return []
  const s = props.person.status
  const isLinked = props.person.credentialStatus !== 'niet-actief'
  const compliant = isCompliant.value
  const elearningNegatief = props.person.elearning === 'niet-behaald'

  if (s === 'Verwacht' || s === 'Nog niet aangekomen') {
    const actions = []
    if (!isLinked)
      actions.push({ value: 'credential-activeren', label: 'Credential activeren', disabled: !compliant })
    if (elearningNegatief)
      actions.push({ value: 'elearning-code', label: 'E-learning code' })
    actions.push({ value: 'inchecken', label: 'Persoon aanmelden', filled: true, disabled: !compliant })
    return actions
  }
  if (s === 'Aangemeld') {
    const actions = []
    if (!isLinked) {
      actions.push({ value: 'credential-activeren', label: 'Credential activeren' })
    } else {
      if (isPrintbaar.value) {
        actions.push({ value: 'credential-printen', label: 'Credential printen' })
        actions.push({ value: 'credential-mailen', label: 'Credential mailen' })
      }
      actions.push({ value: 'credential-ontkoppelen', label: 'Credential ontkoppelen' })
    }
    actions.push({ value: 'afmelden', label: 'Persoon afmelden', filled: true })
    return actions
  }
  if (s === 'Niet aangekomen') {
    const actions = []
    if (!isLinked)
      actions.push({ value: 'credential-activeren', label: 'Credential activeren', disabled: !compliant })
    if (elearningNegatief)
      actions.push({ value: 'elearning-code', label: 'E-learning code' })
    actions.push({ value: 'inchecken', label: 'Persoon aanmelden', filled: true, disabled: !compliant })
    return actions
  }
  return []
})

watch(() => props.open, (isOpen) => {
  document.body.style.overflow = isOpen ? 'hidden' : ''
}, { immediate: true })
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
              <span class="row-label">Status</span>
              <StatusDot :status="person.status" />
            </div>
            <div class="info-row">
              <span class="row-label">Datum</span>
              <span class="row-value">{{ datumFormatted }}</span>
            </div>
            <div class="info-row">
              <span class="row-label">Aankomsttijd</span>
              <span class="row-value">{{ person.aankomsttijd }}</span>
            </div>
            <div v-if="person.vertrekTijd" class="info-row">
              <span class="row-label">Vertrektijd</span>
              <span class="row-value">{{ person.vertrekTijd }}</span>
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
            <div v-if="person.telefoonnummer" class="info-row">
              <span class="row-label">Telefoonnummer</span>
              <a :href="`tel:${person.telefoonnummer}`" class="action-link">{{ person.telefoonnummer }}</a>
            </div>
            <div v-if="person.emailadres" class="info-row">
              <span class="row-label">E-mailadres</span>
              <a :href="`mailto:${person.emailadres}`" class="action-link">{{ person.emailadres }}</a>
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
                <span class="row-value">{{
                  person.dossier === 'compleet'
                    ? 'Dossier compleet'
                    : `Dossier niet compleet: ${(person.dossierMissing || []).join(', ')}.`
                }}</span>
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
                  : person.elearning === 'niet-behaald' ? 'E-learning niet geldig.'
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
            <template v-for="(cp, i) in (person.contactpersonen ?? [])" :key="i">
              <div class="info-row">
                <span class="row-label">{{ i === 0 ? 'Primaire contactpersoon' : 'Contactpersoon' }}</span>
                <span class="row-value">{{ cp.naam }}</span>
              </div>
              <div v-if="cp.tel" class="info-row">
                <span class="row-label">Telefoonnummer</span>
                <a :href="`tel:${cp.tel}`" class="action-link">{{ cp.tel }}</a>
              </div>
              <div v-if="cp.email" class="info-row">
                <span class="row-label">E-mailadres</span>
                <div class="row-value-flex">
                  <a :href="`mailto:${cp.email}`" class="action-link">{{ cp.email }}</a>
                  <button
                    v-if="i === 0"
                    class="icon-btn-sm"
                    aria-label="Informeer contactpersoon"
                    @click="emit('action', { person, action: 'informeer-contactpersoon-mail' })"
                  >
                    <span class="mi icon-sm">mail</span>
                  </button>
                </div>
              </div>
            </template>
          </div>
        </section>

        <!-- Credential -->
        <section class="panel-section">
          <h3 class="section-title">Credential</h3>
          <div class="info-list">
            <div class="info-row">
              <span class="row-label">Credential type</span>
              <span class="row-value">{{ person.credentialType || '-' }}</span>
            </div>
            <div class="info-row">
              <span class="row-label">Credential nummer</span>
              <span class="row-value">{{ person.pasnummer || '-' }}</span>
            </div>
            <div class="info-row">
              <span class="row-label">Status</span>
              <div class="pass-status">
                <span class="pass-dot" :style="{ background: credentialStatusColor }"></span>
                <span class="row-value">{{ credentialStatusLabel }}</span>
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
            @click="emit('action', { person, action: act.value })"
          >{{ act.label }}</BaseButton>
        </div>
        <div class="footer-right">
          <BaseButton
            v-for="act in rightActions"
            :key="act.value"
            :variant="act.filled ? 'filled' : 'outlined'"
            size="md"
            :disabled="act.disabled ?? false"
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
  width: 860px;
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
  font-size: 14px;
  font-weight: 600;
  color: var(--p500);
  line-height: 20px;
  letter-spacing: 0.14px;
  margin: 0;
  margin-top: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: var(--sp-m);
  flex-shrink: 0;
}

.close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
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
  width: 318px;
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

/* ── Action link (telefoon / email zonder icon button) ── */
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

/* ── Row with link + icon button (contactpersoon email) ── */
.row-value-flex {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.icon-btn-sm {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--sp-s);
  border-radius: var(--r-s);
  background: var(--n0);
  border: 1px solid var(--n400);
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

.compliance-ok      { color: var(--ok); }
.compliance-warn    { color: var(--err); }
.compliance-neutral { color: var(--n400); }

/* ── Credential status ── */
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
