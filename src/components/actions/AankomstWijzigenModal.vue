<script setup>
import { ref, watch } from 'vue'
import Modal from '@/components/ui/Modal.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import DatePickerCalendar from '@/components/ui/DatePickerCalendar.vue'
import TimePopover from '@/components/ui/TimePopover.vue'
import Toggle from '@/components/ui/Toggle.vue'
import { isoToDisplay, displayToIso } from '@/utils/dateFormat'

const props = defineProps({
  open:   { type: Boolean, default: false },
  person: { type: Object,  default: null  },
})
const emit = defineEmits(['update:open', 'confirm'])

// ── Form state ──────────────────────────────────────────────────────────────
const aankomstdatum  = ref('')   // ISO YYYY-MM-DD
const aankomsttijd   = ref('')   // HH:mm
const vertrekdatum   = ref('')   // ISO YYYY-MM-DD
const vertrektijd    = ref('')   // HH:mm
const opmerking      = ref('')
const notifyContact  = ref(false)

// ── Popover open state ──────────────────────────────────────────────────────
const aankomstdatumOpen  = ref(false)
const aankomsttijdOpen   = ref(false)
const vertrekdatumOpen   = ref(false)
const vertrektijdOpen    = ref(false)

// ── Trigger refs + positions ────────────────────────────────────────────────
const aankomstdatumRef  = ref(null)
const aankomsttijdRef   = ref(null)
const vertrekdatumRef   = ref(null)
const vertrektijdRef    = ref(null)

const aankomstdatumStyle = ref({})
const aankomsttijdStyle  = ref({})
const vertrekdatumStyle  = ref({})
const vertrektijdStyle   = ref({})

// ── Helpers ──────────────────────────────────────────────────────────────────

function posBelow(el) {
  if (!el) return {}
  const r = el.getBoundingClientRect()
  return { position: 'fixed', top: `${r.bottom + 4}px`, left: `${r.left}px`, zIndex: 1100, width: `${r.width}px` }
}

function closeAllPopovers() {
  aankomstdatumOpen.value = false
  aankomsttijdOpen.value  = false
  vertrekdatumOpen.value  = false
  vertrektijdOpen.value   = false
}

// ── Init ─────────────────────────────────────────────────────────────────────
function initForm() {
  if (props.person) {
    const iso = displayToIso(props.person.datumVanaf)
    aankomstdatum.value = iso
    aankomsttijd.value  = props.person.aankomsttijd || ''
    vertrekdatum.value  = iso   // zelfde datum als aankomst (geen apart vertrekdatum in data model)
    vertrektijd.value   = props.person.vertrekTijd  || ''
  }
  opmerking.value     = ''
  notifyContact.value = false
  closeAllPopovers()
}

watch(() => [props.open, props.person], ([open]) => {
  if (open) initForm()
}, { immediate: true })

// ── Popover toggling ─────────────────────────────────────────────────────────
function toggleAankomstdatum() {
  const wasOpen = aankomstdatumOpen.value
  closeAllPopovers()
  if (!wasOpen) {
    aankomstdatumStyle.value = posBelow(aankomstdatumRef.value)
    aankomstdatumOpen.value  = true
  }
}

function toggleAankomsttijd() {
  const wasOpen = aankomsttijdOpen.value
  closeAllPopovers()
  if (!wasOpen) {
    aankomsttijdStyle.value = posBelow(aankomsttijdRef.value)
    aankomsttijdOpen.value  = true
  }
}

function toggleVertrekdatum() {
  const wasOpen = vertrekdatumOpen.value
  closeAllPopovers()
  if (!wasOpen) {
    vertrekdatumStyle.value = posBelow(vertrekdatumRef.value)
    vertrekdatumOpen.value  = true
  }
}

function toggleVertrektijd() {
  const wasOpen = vertrektijdOpen.value
  closeAllPopovers()
  if (!wasOpen) {
    vertrektijdStyle.value = posBelow(vertrektijdRef.value)
    vertrektijdOpen.value  = true
  }
}

// ── DatePickerCalendar handlers ──────────────────────────────────────────────
function onAankomstdatumSelect(iso) { aankomstdatum.value = iso; aankomstdatumOpen.value = false }
function onVertrekdatumSelect(iso)  { vertrekdatum.value  = iso; vertrekdatumOpen.value  = false }

// ── TimePopover handlers ─────────────────────────────────────────────────────
function onAankomsttijdApply(time)  { aankomsttijd.value = time; aankomsttijdOpen.value = false }
function onAankomsttijdCancel()     { aankomsttijdOpen.value = false }
function onVertrektijdApply(time)   { vertrektijd.value  = time; vertrektijdOpen.value  = false }
function onVertrektijdCancel()      { vertrektijdOpen.value = false }

// ── Cancel / Confirm ─────────────────────────────────────────────────────────
function resetForm() {
  aankomstdatum.value = ''
  aankomsttijd.value  = ''
  vertrekdatum.value  = ''
  vertrektijd.value   = ''
  opmerking.value     = ''
  notifyContact.value = false
  closeAllPopovers()
}

function cancel() {
  emit('update:open', false)
  resetForm()
}

function confirm() {
  emit('confirm', {
    person:        props.person,
    aankomstdatum: isoToDisplay(aankomstdatum.value),
    aankomsttijd:  aankomsttijd.value,
    vertrekdatum:  isoToDisplay(vertrekdatum.value),
    vertrektijd:   vertrektijd.value || null,
    opmerking:     opmerking.value,
    notifyContact: notifyContact.value,
  })
  emit('update:open', false)
  resetForm()
}
</script>

<template>
  <Modal :open="open" title="Bezoek wijzigen" @update:open="emit('update:open', $event)">
    <div class="modal-content">
      <p class="intro-text">Wijzig het verwachte bezoek van:</p>

      <!-- Datum + tijd velden — 2×2 grid -->
      <div class="fields-grid">
        <!-- Rij 1: aankomstdatum + aankomsttijd -->
        <div class="field-group">
          <label class="field-label">Aankomstdatum wijzigen *</label>
          <div
            ref="aankomstdatumRef"
            class="trigger-field"
            :class="{ 'trigger-field--open': aankomstdatumOpen }"
            @click="toggleAankomstdatum"
          >
            <span class="trigger-text">{{ isoToDisplay(aankomstdatum) || '—' }}</span>
            <div class="trigger-icon"><span class="mi">today</span></div>
          </div>
        </div>

        <div class="field-group">
          <label class="field-label">Aankomsttijd wijzigen *</label>
          <div
            ref="aankomsttijdRef"
            class="trigger-field"
            :class="{ 'trigger-field--open': aankomsttijdOpen }"
            @click="toggleAankomsttijd"
          >
            <span class="trigger-text">{{ aankomsttijd || '—' }}</span>
            <div class="trigger-icon"><span class="mi">access_time</span></div>
          </div>
        </div>

        <!-- Rij 2: vertrekdatum + vertrektijd -->
        <div class="field-group">
          <label class="field-label">Vertrekdatum wijzigen *</label>
          <div
            ref="vertrekdatumRef"
            class="trigger-field"
            :class="{ 'trigger-field--open': vertrekdatumOpen }"
            @click="toggleVertrekdatum"
          >
            <span class="trigger-text">{{ isoToDisplay(vertrekdatum) || '—' }}</span>
            <div class="trigger-icon"><span class="mi">today</span></div>
          </div>
        </div>

        <div class="field-group">
          <label class="field-label">Vertrektijd wijzigen *</label>
          <div
            ref="vertrektijdRef"
            class="trigger-field"
            :class="{ 'trigger-field--open': vertrektijdOpen }"
            @click="toggleVertrektijd"
          >
            <span class="trigger-text">{{ vertrektijd || '—' }}</span>
            <div class="trigger-icon"><span class="mi">access_time</span></div>
          </div>
        </div>
      </div>

      <!-- Opmerking -->
      <div class="field-group">
        <label class="field-label">Opmerking (optioneel)</label>
        <textarea v-model="opmerking" class="opmerking" rows="4" />
      </div>

      <!-- Toggle -->
      <Toggle
        v-model="notifyContact"
        label="Verstuur e-mail naar contactpersoon dat persoon is aangemeld."
      />
    </div>

    <template #footer>
      <BaseButton variant="ghost"  @click="cancel">Annuleren</BaseButton>
      <BaseButton variant="filled" @click="confirm">Bevestigen</BaseButton>
    </template>
  </Modal>

  <!-- ── Aankomstdatum popover ─────────────────────────────────────────────── -->
  <Teleport to="body">
    <template v-if="aankomstdatumOpen">
      <div class="popover-backdrop" @click="aankomstdatumOpen = false" />
      <div class="cal-popover" :style="aankomstdatumStyle">
        <DatePickerCalendar :model-value="aankomstdatum" @update:model-value="onAankomstdatumSelect" />
      </div>
    </template>
  </Teleport>

  <!-- ── Aankomsttijd popover ──────────────────────────────────────────────── -->
  <Teleport to="body">
    <template v-if="aankomsttijdOpen">
      <div class="popover-backdrop" @click="aankomsttijdOpen = false" />
      <TimePopover :style="aankomsttijdStyle" :time="aankomsttijd" @apply="onAankomsttijdApply" @cancel="onAankomsttijdCancel" />
    </template>
  </Teleport>

  <!-- ── Vertrekdatum popover ──────────────────────────────────────────────── -->
  <Teleport to="body">
    <template v-if="vertrekdatumOpen">
      <div class="popover-backdrop" @click="vertrekdatumOpen = false" />
      <div class="cal-popover" :style="vertrekdatumStyle">
        <DatePickerCalendar :model-value="vertrekdatum" @update:model-value="onVertrekdatumSelect" />
      </div>
    </template>
  </Teleport>

  <!-- ── Vertrektijd popover ───────────────────────────────────────────────── -->
  <Teleport to="body">
    <template v-if="vertrektijdOpen">
      <div class="popover-backdrop" @click="vertrektijdOpen = false" />
      <TimePopover :style="vertrektijdStyle" :time="vertrektijd" @apply="onVertrektijdApply" @cancel="onVertrektijdCancel" />
    </template>
  </Teleport>
</template>

<style scoped>
.modal-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.intro-text {
  font-size: 14px;
  color: var(--n800);
  line-height: 20px;
  margin: 0;
}

/* ── 2×2 velden grid ──────────────────────────────────────────────────────── */
.fields-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
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
.opmerking {
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

.opmerking:focus {
  outline: none;
  border-color: var(--p500);
}

/* ── Popover backdrop ─────────────────────────────────────────────────────── */
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
