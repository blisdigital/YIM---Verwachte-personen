<script setup>
import { ref, watch } from 'vue'
import ActionPopup from '@/components/ui/ActionPopup.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import DatePickerCalendar from '@/components/ui/DatePickerCalendar.vue'
import TimePopover from '@/components/ui/TimePopover.vue'
import Toggle from '@/components/ui/Toggle.vue'

const props = defineProps({
  open:   { type: Boolean, default: false },
  person: { type: Object,  default: null  },
})
const emit = defineEmits(['update:open', 'confirm'])

// ── Form state ──────────────────────────────────────────────────────────────
const datum          = ref('')   // ISO YYYY-MM-DD (intern; weergave is DD-MM-YYYY)
const aankomsttijd   = ref('')   // HH:mm
const vertrektijd    = ref('')   // HH:mm
const toelichting    = ref('')
const notifyContact  = ref(false)

// ── Popover open state ──────────────────────────────────────────────────────
const datumOpen    = ref(false)
const aankomstOpen = ref(false)
const vertrekOpen  = ref(false)


// ── Trigger refs + computed positions ──────────────────────────────────────
const datumTriggerRef    = ref(null)
const aankomstTriggerRef = ref(null)
const vertrekTriggerRef  = ref(null)

const datumStyle    = ref({})
const aankomstStyle = ref({})
const vertrekStyle  = ref({})

// ── Helpers ─────────────────────────────────────────────────────────────────
function isoToDisplay(iso) {
  if (!iso) return ''
  const [y, m, d] = iso.split('-')
  return `${d}-${m}-${y}`
}

function displayToIso(display) {
  if (!display) return ''
  const parts = display.split('-')
  if (parts.length !== 3) return ''
  const [d, m, y] = parts
  return `${y}-${m}-${d}`
}

function posBelow(el) {
  if (!el) return {}
  const r = el.getBoundingClientRect()
  return { position: 'fixed', top: `${r.bottom + 4}px`, left: `${r.left}px`, zIndex: 1100, width: `${r.width}px` }
}

// ── Init ─────────────────────────────────────────────────────────────────────
function initForm() {
  if (props.person) {
    datum.value        = displayToIso(props.person.datumVanaf)
    aankomsttijd.value = props.person.aankomsttijd || ''
    vertrektijd.value  = props.person.vertrekTijd  || ''
  }
  toelichting.value   = ''
  notifyContact.value = false
  datumOpen.value     = false
  aankomstOpen.value  = false
  vertrekOpen.value   = false
}

watch(() => [props.open, props.person], ([open]) => {
  if (open) initForm()
}, { immediate: true })

// ── Popover toggling ─────────────────────────────────────────────────────────
function toggleDatum() {
  aankomstOpen.value = false
  vertrekOpen.value  = false
  datumStyle.value   = posBelow(datumTriggerRef.value)
  datumOpen.value    = !datumOpen.value
}

function toggleAankomst() {
  datumOpen.value    = false
  vertrekOpen.value  = false
  aankomstStyle.value = posBelow(aankomstTriggerRef.value)
  aankomstOpen.value  = !aankomstOpen.value
}

function toggleVertrek() {
  datumOpen.value    = false
  aankomstOpen.value = false
  vertrekStyle.value = posBelow(vertrekTriggerRef.value)
  vertrekOpen.value  = !vertrekOpen.value
}

// ── DatePickerCalendar handler ───────────────────────────────────────────────
function onDatumSelect(iso) {
  datum.value    = iso
  datumOpen.value = false
}

// ── TimePopover handlers ─────────────────────────────────────────────────────
function onAankomstApply(time) { aankomsttijd.value = time; aankomstOpen.value = false }
function onAankomstCancel()    { aankomstOpen.value = false }
function onVertrekApply(time)  { vertrektijd.value  = time; vertrekOpen.value  = false }
function onVertrekCancel()     { vertrekOpen.value  = false }

// ── Cancel / Confirm ─────────────────────────────────────────────────────────
function resetForm() {
  datum.value        = ''
  aankomsttijd.value = ''
  vertrektijd.value  = ''
  toelichting.value  = ''
  notifyContact.value = false
  datumOpen.value    = false
  aankomstOpen.value = false
  vertrekOpen.value  = false
}

function cancel() {
  emit('update:open', false)
  resetForm()
}

function confirm() {
  emit('confirm', {
    person:       props.person,
    datum:        isoToDisplay(datum.value),
    aankomsttijd: aankomsttijd.value,
    vertrektijd:  vertrektijd.value || null,
    toelichting:  toelichting.value,
    notifyContact: notifyContact.value,
  })
  emit('update:open', false)
  resetForm()
}
</script>

<template>
  <ActionPopup :open="open" title="Aankomst wijzigen" width="560px" @update:open="emit('update:open', $event)">
    <p class="intro-text">Wijzig de verwachte aankomst van:</p>

    <!-- Persoon card -->
    <div v-if="person" class="person-card">
      <div class="person-header">
        <div class="person-name">
          <span class="name-text">{{ person.naam }}</span>
          <span v-if="person.vip" class="mi vip-star">star</span>
        </div>
        <div class="person-company">{{ person.bedrijf }}</div>
      </div>
      <div class="info-rows">
        <div class="info-row">
          <span class="info-label">Contactpersoon:</span>
          <span class="info-value">
            {{ person.contactpersoon }}<template v-if="person.contactEmail"> ({{ person.contactEmail }})</template>
          </span>
        </div>
        <div class="info-row">
          <span class="info-label">Aankomstdatum:</span>
          <span class="info-value">{{ person.datumVanaf }}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Aankomsttijd:</span>
          <span class="info-value">{{ person.aankomsttijd }}</span>
        </div>
      </div>
    </div>

    <!-- Aankomstdatum -->
    <div class="field-group">
      <label class="field-label">Aankomstdatum wijzigen *</label>
      <div
        ref="datumTriggerRef"
        class="trigger-field"
        :class="{ 'trigger-field--open': datumOpen }"
        @click="toggleDatum"
      >
        <span class="trigger-text">{{ isoToDisplay(datum) || '—' }}</span>
        <div class="trigger-icon">
          <span class="mi">today</span>
        </div>
      </div>
    </div>

    <!-- Aankomsttijd -->
    <div class="field-group">
      <label class="field-label">Aankomsttijd wijzigen *</label>
      <div
        ref="aankomstTriggerRef"
        class="trigger-field"
        :class="{ 'trigger-field--open': aankomstOpen }"
        @click="toggleAankomst"
      >
        <span class="trigger-text">{{ aankomsttijd || '—' }}</span>
        <div class="trigger-icon">
          <span class="mi">access_time</span>
        </div>
      </div>
    </div>

    <!-- Vertrektijd -->
    <div class="field-group">
      <label class="field-label">Vertrektijd wijzigen *</label>
      <div
        ref="vertrekTriggerRef"
        class="trigger-field"
        :class="{ 'trigger-field--open': vertrekOpen }"
        @click="toggleVertrek"
      >
        <span class="trigger-text">{{ vertrektijd || '—' }}</span>
        <div class="trigger-icon">
          <span class="mi">access_time</span>
        </div>
      </div>
    </div>

    <!-- Toelichting -->
    <div class="field-group">
      <label class="field-label">Toelichting (optioneel)</label>
      <textarea v-model="toelichting" class="toelichting" rows="4" />
    </div>

    <!-- Toggle -->
    <Toggle
      v-model="notifyContact"
      label="Verstuur e-mail naar contactpersoon dat persoon is aangemeld."
    />

    <template #footer>
      <BaseButton variant="ghost"  @click="cancel">Annuleren</BaseButton>
      <BaseButton variant="filled" @click="confirm">Bevestigen</BaseButton>
    </template>
  </ActionPopup>

  <!-- ── Datum popover ──────────────────────────────────────────────────────── -->
  <Teleport to="body">
    <template v-if="datumOpen">
      <div class="popover-backdrop" @click="datumOpen = false" />
      <div class="cal-popover" :style="datumStyle">
        <DatePickerCalendar
          :model-value="datum"
          @update:model-value="onDatumSelect"
        />
      </div>
    </template>
  </Teleport>

  <!-- ── Aankomsttijd popover ───────────────────────────────────────────────── -->
  <Teleport to="body">
    <template v-if="aankomstOpen">
      <div class="popover-backdrop" @click="aankomstOpen = false" />
      <TimePopover
        :style="aankomstStyle"
        :time="aankomsttijd"
        @apply="onAankomstApply"
        @cancel="onAankomstCancel"
      />
    </template>
  </Teleport>

  <!-- ── Vertrektijd popover ────────────────────────────────────────────────── -->
  <Teleport to="body">
    <template v-if="vertrekOpen">
      <div class="popover-backdrop" @click="vertrekOpen = false" />
      <TimePopover
        :style="vertrekStyle"
        :time="vertrektijd"
        @apply="onVertrekApply"
        @cancel="onVertrekCancel"
      />
    </template>
  </Teleport>
</template>

<style scoped>
.intro-text {
  font-size: 14px;
  color: var(--n800);
  line-height: 20px;
  margin: 0;
}

/* ── Persoon card ─────────────────────────────────────────────────────────── */
.person-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  background: var(--p50);
  border-radius: var(--r-s);
}

.person-header {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.person-name {
  display: flex;
  align-items: center;
  gap: 10px;
}

.name-text {
  font-size: 16px;
  font-weight: 600;
  color: var(--p700);
  line-height: 24px;
  letter-spacing: 0.16px;
}

.vip-star {
  font-size: 24px;
  color: var(--vip-border);
}

.person-company {
  font-size: 14px;
  color: var(--n700);
  line-height: 20px;
}

.info-rows {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.info-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 8px;
  background: var(--n0);
  border-radius: var(--r-s);
  overflow: hidden;
  white-space: nowrap;
}

.info-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--p700);
  line-height: 16px;
  letter-spacing: 0.12px;
  width: 120px;
  flex-shrink: 0;
}

.info-value {
  font-size: 12px;
  color: var(--p700);
  line-height: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ── Field groups ─────────────────────────────────────────────────────────── */
.field-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field-label {
  font-size: 14px;
  font-weight: 600;
  color: var(--n900);
  line-height: 20px;
  letter-spacing: 0.14px;
}

/* ── Trigger field ────────────────────────────────────────────────────────── */
.trigger-field {
  display: flex;
  align-items: center;
  border: 1px solid var(--n400);
  border-radius: var(--r-s);
  overflow: hidden;
  cursor: pointer;
  transition: border-color 0.15s;
  background: var(--n0);
}

.trigger-field:hover,
.trigger-field--open {
  border-color: var(--p500);
}

.trigger-text {
  flex: 1;
  padding: 8px;
  font-size: 14px;
  color: var(--n900);
  line-height: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.trigger-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  background: var(--n50);
  color: var(--n700);
  flex-shrink: 0;
}

.trigger-icon .mi {
  font-size: 24px;
}

/* ── Textarea ─────────────────────────────────────────────────────────────── */
.toelichting {
  resize: vertical;
  min-height: 96px;
  padding: 8px 12px;
  border: 1px solid var(--n400);
  border-radius: var(--r-s);
  background: var(--n0);
  font-family: var(--font);
  font-size: 14px;
  color: var(--n900);
  line-height: 20px;
  transition: border-color 0.15s;
  box-sizing: border-box;
  width: 100%;
}

.toelichting:focus {
  outline: none;
  border-color: var(--p500);
}

/* ── Popover backdrop (click-outside) ─────────────────────────────────────── */
.popover-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1099;
}

/* ── Kalender popover wrapper ─────────────────────────────────────────────── */
.cal-popover {
  background: var(--n0);
  border-radius: var(--r-s);
  box-shadow: var(--shadow-m);
  padding: 12px;
  box-sizing: border-box;
}

</style>
