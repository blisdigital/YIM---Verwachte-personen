<script setup>
import { ref, computed } from 'vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import ProcessNav from '@/components/layout/ProcessNav.vue'
import ProcessBottomBar from '@/components/ui/ProcessBottomBar.vue'
import InfoSection from '@/components/ui/InfoSection.vue'
import InputField from '@/components/ui/InputField.vue'
import DatePickerCalendar from '@/components/ui/DatePickerCalendar.vue'
import { useNavigationStore } from '@/stores/navigationStore'
import { usePersonenStore } from '@/stores/personenStore'
import { useToast } from '@/composables/useToast'

const nav = useNavigationStore()
const personenStore = usePersonenStore()
const { show } = useToast()

const person = nav.currentPerson

const steps = [
  { id: 'koppelen', label: 'Credential koppelen', state: 'active' },
]

// ── Form state ──────────────────────────────────────────────────────────────
const credentialNummer = ref('')
const periode          = ref('permanent') // 'permanent' | 'tijdelijk'
const datumVanaf       = ref('')          // ISO YYYY-MM-DD

// ── Date picker state ───────────────────────────────────────────────────────
const datumVanafOpen    = ref(false)
const datumVanafTrigger = ref(null)
const datumVanafStyle   = ref({})

// ── Helpers ─────────────────────────────────────────────────────────────────
function isoToDisplay(iso) {
  if (!iso) return ''
  const [y, m, d] = iso.split('-')
  return `${d}-${m}-${y}`
}

function posBelow(el) {
  if (!el) return {}
  const r = el.getBoundingClientRect()
  return {
    position: 'fixed',
    top:      `${r.bottom + 4}px`,
    left:     `${r.left}px`,
    zIndex:   1100,
    minWidth: `${r.width}px`,
  }
}

function toggleDatumVanaf() {
  datumVanafStyle.value = posBelow(datumVanafTrigger.value)
  datumVanafOpen.value  = !datumVanafOpen.value
}

// ── Naam parsing (voornaam / tussenvoegsel / achternaam) ────────────────────
const TUSSENVOEGSELS = [
  'van der', 'van den', 'van de', "van 't", 'van het', 'van',
  'de', 'den', 'der', 'ter', 'ten', 'het', "'t",
  'op de', 'op den', 'op', 'in de', "in 't", 'in het',
]

function parseNaam(naam) {
  const s = (naam ?? '').trim()
  const parts = s.split(/\s+/)
  if (parts.length <= 1) return { voornaam: s, tussenvoegsel: null, achternaam: null }
  const voornaam = parts[0]
  const rest     = parts.slice(1).join(' ')
  for (const tv of TUSSENVOEGSELS) {
    if (rest.toLowerCase().startsWith(tv + ' ')) {
      return { voornaam, tussenvoegsel: rest.slice(0, tv.length), achternaam: rest.slice(tv.length + 1) }
    }
  }
  // geen tussenvoegsel — laatste word is achternaam
  return { voornaam: parts.slice(0, -1).join(' '), tussenvoegsel: null, achternaam: parts[parts.length - 1] }
}

// ── Persoonsgegevens rows — 1:1 Figma ──────────────────────────────────────
const persoonsgegevensRows = computed(() => {
  if (!person) return []
  const { voornaam, tussenvoegsel, achternaam } = parseNaam(person.naam)
  return [
    { label: 'Naam',          value: person.naam },
    { label: 'Persoonstype',  value: person.persoontype },
    { label: 'Voornaam',      value: voornaam        ?? '—' },
    { label: 'Tussenvoegsel', value: tussenvoegsel   ?? '—' },
    { label: 'Achternaam',    value: achternaam      ?? '—' },
    { label: 'Bedrijfsnaam',  value: person.bedrijf  ?? '—' },
  ]
})

// ── Validation ──────────────────────────────────────────────────────────────
const canSubmit = computed(() => credentialNummer.value.trim() !== '')

// ── Actions ─────────────────────────────────────────────────────────────────
function handleKoppelen() {
  if (!canSubmit.value || !person) return
  personenStore.updateCredentialStatus(person.id, 'actief')
  show('Credential gekoppeld', `Credential ${credentialNummer.value} is gekoppeld aan ${person.naam}.`)
  nav.goBack()
}
</script>

<template>
  <div class="app-layout">
    <AppHeader />

    <div class="page-body">
      <ProcessNav
        title="Credential koppelen"
        :steps="steps"
        @back="nav.goBack()"
      />

      <main class="page-main">
        <div class="page-content">

          <!-- ── Sectie header ─────────────────────────────────────────────── -->
          <div class="sectie-header">
            <div class="step-badge">1</div>
            <div class="sectie-header__text">
              <h1 class="sectie-header__title">Credential koppelen</h1>
              <p class="sectie-header__subtitle">Koppel een credential aan deze persoon.</p>
            </div>
          </div>

          <!-- ── Persoonsgegevens ──────────────────────────────────────────── -->
          <InfoSection
            title="Persoonsgegevens"
            :rows="persoonsgegevensRows"
          />

          <!-- ── Koppelen ──────────────────────────────────────────────────── -->
          <InfoSection title="Koppelen">
            <div class="form-row form-row--input">
              <span class="form-row__label">Credential nummer</span>
              <InputField
                v-model="credentialNummer"
                placeholder="14-cijferig nummer"
              />
            </div>
          </InfoSection>

          <!-- ── Periode van koppeling ─────────────────────────────────────── -->
          <InfoSection title="Periode van koppeling">
            <!-- Periode toggle -->
            <div class="form-row">
              <span class="form-row__label">Periode</span>
              <div class="seg-group">
                <button
                  :class="['seg-btn', { 'seg-btn--active': periode === 'permanent' }]"
                  type="button"
                  @click="periode = 'permanent'"
                >Permanent</button>
                <button
                  :class="['seg-btn', { 'seg-btn--active': periode === 'tijdelijk' }]"
                  type="button"
                  @click="periode = 'tijdelijk'"
                >Tijdelijk</button>
              </div>
            </div>

            <!-- Datum vanaf -->
            <div class="form-row">
              <span class="form-row__label">Datum vanaf</span>
              <div
                ref="datumVanafTrigger"
                class="date-trigger"
                :class="{ 'date-trigger--open': datumVanafOpen }"
                @click="toggleDatumVanaf"
              >
                <span class="date-trigger__text">{{ isoToDisplay(datumVanaf) || 'dd-mm-jjjj' }}</span>
                <div class="date-trigger__icon"><span class="mi">today</span></div>
              </div>
            </div>
          </InfoSection>

        </div><!-- /page-content -->
      </main>
    </div><!-- /page-body -->

    <ProcessBottomBar
      flow="koppelen"
      :primary-disabled="!canSubmit"
      @cancel="nav.goBack()"
      @submit="handleKoppelen"
    />
  </div>

  <!-- ── Datum-vanaf popover ─────────────────────────────────────────────── -->
  <Teleport to="body">
    <template v-if="datumVanafOpen">
      <div class="popover-backdrop" @click="datumVanafOpen = false" />
      <div class="cal-popover" :style="datumVanafStyle">
        <DatePickerCalendar
          :model-value="datumVanaf"
          @update:model-value="val => { datumVanaf = val; datumVanafOpen = false }"
        />
      </div>
    </template>
  </Teleport>

</template>

<style scoped>
/* ── Page layout ──────────────────────────────────────────────────────────── */
.app-layout {
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.page-body {
  flex: 1;
  display: flex;
  overflow: hidden;
  min-height: 0;
}

.page-main {
  flex: 1;
  overflow-y: auto;
  padding: 40px 48px;
}

@media (max-width: 1279px) {
  .page-main { padding: 40px 20px; }
}

.page-content {
  max-width: 960px;
  display: flex;
  flex-direction: column;
  gap: var(--sp-l);
}

/* ── Sectie header ────────────────────────────────────────────────────────── */
.sectie-header {
  display: flex;
  align-items: flex-start;
  gap: var(--sp-xxl);
  padding: var(--sp-s) 0;
}

.step-badge {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border-radius: var(--r-l);
  background: var(--p100);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font);
  font-size: 16px;
  font-weight: 600;
  color: var(--p700);
  line-height: 24px;
  letter-spacing: 0.16px;
}

.sectie-header__text {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-top: 4px;
}

.sectie-header__title {
  margin: 0;
  font-family: var(--font);
  font-size: 32px;
  font-weight: 700;
  color: var(--p800);
  line-height: 40px;
  letter-spacing: -0.32px;
}

.sectie-header__subtitle {
  margin: 0;
  font-family: var(--font);
  font-size: 16px;
  font-weight: 400;
  color: var(--p800);
  line-height: 24px;
}

/* ── Form-rijen (slot-content van InfoSection) ────────────────────────────── */
.form-row {
  display: flex;
  align-items: center;
  gap: var(--sp-l);
  padding: var(--sp-m) var(--sp-l);
  background: var(--p50);
  border-bottom: 1px solid var(--p100);
}

.form-row:first-child {
  border-top: 1px solid var(--p100);
}

.form-row--input {
  align-items: center;
}

.form-row__label {
  width: 200px;
  flex-shrink: 0;
  font-family: var(--font);
  font-size: 16px;
  font-weight: 600;
  color: var(--p700);
  line-height: 24px;
  letter-spacing: 0.16px;
}

/* ── Segmented button group ───────────────────────────────────────────────── */
.seg-group {
  display: flex;
  align-items: center;
  gap: var(--sp-xs);
  padding: var(--sp-xs);
  background: var(--n0);
  border: 1px solid var(--n500);
  border-radius: var(--r-s);
}

.seg-btn {
  flex: 1;
  height: 36px;
  padding: 0 var(--sp-l);
  border: none;
  border-radius: var(--r-s);
  font-family: var(--font);
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0.14px;
  cursor: pointer;
  background: transparent;
  color: var(--n800);
  white-space: nowrap;
  transition: background 0.15s, color 0.15s;
}

.seg-btn:hover:not(.seg-btn--active) {
  background: var(--n50);
}

.seg-btn--active {
  background: var(--p500);
  color: var(--n0);
}

/* ── Datum trigger field ──────────────────────────────────────────────────── */
.date-trigger {
  display: flex;
  align-items: center;
  width: 208px;
  background: var(--n0);
  border: 1px solid var(--n400);
  border-radius: var(--r-s);
  overflow: hidden;
  cursor: pointer;
  transition: border-color 0.15s;
}

.date-trigger:hover,
.date-trigger--open {
  border-color: var(--p500);
}

.date-trigger__text {
  flex: 1;
  padding: var(--sp-s);
  font-family: var(--font);
  font-size: 14px;
  color: var(--n900);
  line-height: 20px;
  letter-spacing: 0px;
}

.date-trigger__text:empty::before,
.date-trigger__text--placeholder {
  color: var(--n500);
}

.date-trigger__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--sp-s);
  background: var(--n50);
  color: var(--n700);
  flex-shrink: 0;
}

.date-trigger__icon .mi {
  font-size: 24px;
}

/* ── Popover chrome ───────────────────────────────────────────────────────── */
.popover-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1099;
}

.cal-popover {
  background: var(--n0);
  border-radius: var(--r-s);
  box-shadow: var(--shadow-m);
  padding: 12px;
  box-sizing: border-box;
}
</style>
