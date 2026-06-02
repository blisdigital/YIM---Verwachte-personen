<script setup>
import { ref, computed, watch } from 'vue'
import ActionPopup from '@/components/ui/ActionPopup.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import InputField from '@/components/ui/InputField.vue'
import FormDateField from '@/components/ui/FormDateField.vue'
import CredentialMailenModal from './CredentialMailenModal.vue'
import CustomSelect from '@/components/ui/CustomSelect.vue'
import { useToast } from '@/composables/useToast'

const props = defineProps({
  open:   { type: Boolean, default: false },
  person: { type: Object,  default: null },
})
const emit = defineEmits(['update:open', 'confirm'])
const { show: showToast } = useToast()

// ── Scenario routing ─────────────────────────────────────────
const scenario = computed(() => {
  const opties = props.person?.credentialOpties ?? []
  if (opties.length > 1) return 'C'
  if (opties.length === 1) return opties[0].categorie === 'printbaar' ? 'A' : 'B'
  return 'B'
})

// Scenario C step state
const step = ref(1)
const gekozenOptieIndex = ref(null)

const credentialOptions = computed(() =>
  (props.person?.credentialOpties ?? []).map((opt, i) => ({ value: i, label: opt.label }))
)

const activeOptie = computed(() => {
  if (scenario.value === 'C') {
    if (gekozenOptieIndex.value === null) return null
    return props.person?.credentialOpties?.[gekozenOptieIndex.value] ?? null
  }
  return props.person?.credentialOpties?.[0] ?? null
})

const showForm   = computed(() => scenario.value !== 'C' || step.value === 2)
const isScenarioA = computed(() => showForm.value && activeOptie.value?.categorie === 'printbaar')
const isScenarioB = computed(() => showForm.value && activeOptie.value?.categorie === 'fysiek')

const title = computed(() =>
  activeOptie.value?.categorie === 'printbaar' ? 'Credential koppelen' : 'Credential koppelen'
)

// ── Scenario A state ─────────────────────────────────────────
const credentialnummerA = ref('')
const datumVanafA       = ref('')
const datumTotEnMetA    = ref('')
const heeftGemaild      = ref(false)
const heeftGeprint      = ref(false)
const showMailenModal   = ref(false)

// ── Scenario B state ─────────────────────────────────────────
const credentialnummerB = ref('')
const periode           = ref('permanent')
const datumVanafB       = ref('')
const datumTotEnMetB    = ref('')

// ── Validation ───────────────────────────────────────────────
const canMailOrPrint = computed(() =>
  isScenarioA.value &&
  credentialnummerA.value.trim() !== '' &&
  datumVanafA.value !== '' &&
  datumTotEnMetA.value !== ''
)
const canActivate = computed(() =>
  canMailOrPrint.value && (heeftGemaild.value || heeftGeprint.value)
)
const canKoppelen = computed(() => {
  if (!isScenarioB.value) return false
  if (!credentialnummerB.value.trim() || !datumVanafB.value) return false
  if (periode.value === 'tijdelijk' && !datumTotEnMetB.value) return false
  return true
})

watch(() => props.open, (val) => { if (!val) reset() })

function reset() {
  step.value = 1
  gekozenOptieIndex.value = null
  credentialnummerA.value = ''
  datumVanafA.value = ''
  datumTotEnMetA.value = ''
  heeftGemaild.value = false
  heeftGeprint.value = false
  showMailenModal.value = false
  credentialnummerB.value = ''
  periode.value = 'permanent'
  datumVanafB.value = ''
  datumTotEnMetB.value = ''
}

function cancel()  { emit('update:open', false) }
function goNext()  { if (gekozenOptieIndex.value !== null) step.value = 2 }
function goBack()  { step.value = 1; gekozenOptie.value = null }

function handleMailen()  { if (canMailOrPrint.value) showMailenModal.value = true }
function handlePrinten() {
  if (!canMailOrPrint.value) return
  heeftGeprint.value = true
  showToast('Credential geprint', 'De credential is succesvol geprint.')
}
function onMailenConfirm() {
  heeftGemaild.value = true
  showMailenModal.value = false
  showToast('Credential gemaild', `Credential verstuurd naar ${props.person?.emailadres ?? 'onbekend e-mailadres'}.`)
}
function handleActivate() {
  if (!canActivate.value) return
  emit('confirm', { person: props.person, credentialType: activeOptie.value.label })
  emit('update:open', false)
}
function handleKoppelen() {
  if (!canKoppelen.value) return
  emit('confirm', {
    person:          props.person,
    credentialType:  activeOptie.value.label,
    pasnummer:       credentialnummerB.value,
    periode:         periode.value,
    datumVanaf:      datumVanafB.value,
    datumTotEnMet:   periode.value === 'tijdelijk' ? datumTotEnMetB.value : null,
  })
  emit('update:open', false)
}
</script>

<template>
  <ActionPopup :open="open" :title="title" width="560px" @update:open="emit('update:open', $event)">

    <p class="intro-text">Je gaat de volgende credential koppelen:</p>

    <!-- ── Credential field: editable (Scenario C step 1) ── -->
    <div v-if="scenario === 'C' && step === 1" class="form-group">
      <label class="field-label">Credential <span class="req">*</span></label>
      <CustomSelect
        v-model="gekozenOptieIndex"
        :options="credentialOptions"
        placeholder="Kies een credential"
      />
    </div>

    <!-- ── Credential field: readonly (Scenario A/B or C step 2) ── -->
    <div v-if="showForm && activeOptie" class="form-group">
      <label class="field-label">Credential <span class="req">*</span></label>
      <div class="readonly-select">
        <span class="readonly-val">{{ activeOptie.label }}</span>
        <span class="mi">arrow_drop_down</span>
      </div>
    </div>

    <!-- ── Scenario A form (printbaar) ── -->
    <template v-if="isScenarioA">
      <InputField
        id="cred-num-a"
        v-model="credentialnummerA"
        label="Credentialnummer"
        placeholder="Voer credential nummer in"
        :required="true"
      />

      <div class="date-row">
        <FormDateField
          class="flex-1"
          label="Datum vanaf"
          :required="true"
          v-model="datumVanafA"
        />
        <FormDateField
          class="flex-1"
          label="Datum tot en met"
          :required="true"
          v-model="datumTotEnMetA"
        />
      </div>

      <div v-if="activeOptie.accessoires?.length" class="form-group">
        <label class="field-label">Accessoires</label>
        <div class="acc-box">
          <div v-for="acc in activeOptie.accessoires" :key="acc" class="acc-item">
            <span class="acc-name">{{ acc }}</span>
            <div class="acc-img">image placeholder</div>
          </div>
        </div>
      </div>
    </template>

    <!-- ── Scenario B form (fysiek) ── -->
    <template v-if="isScenarioB">
      <InputField
        id="cred-num-b"
        v-model="credentialnummerB"
        label="Credentialnummer"
        placeholder="Voer credential nummer in"
        :required="true"
      />

      <div class="form-group">
        <label class="field-label">Periode</label>
        <div class="seg-group">
          <button
            :class="['seg-btn', { active: periode === 'permanent' }]"
            type="button"
            @click="periode = 'permanent'"
          >Permanent</button>
          <button
            :class="['seg-btn', { active: periode === 'tijdelijk' }]"
            type="button"
            @click="periode = 'tijdelijk'"
          >Tijdelijk</button>
        </div>
      </div>

      <div class="date-row">
        <FormDateField
          class="flex-1"
          label="Datum vanaf"
          :required="true"
          v-model="datumVanafB"
        />
        <FormDateField
          v-if="periode === 'tijdelijk'"
          class="flex-1"
          label="Datum tot en met"
          :required="true"
          v-model="datumTotEnMetB"
        />
      </div>

      <div v-if="activeOptie.accessoires?.length" class="form-group">
        <label class="field-label">Accessoires</label>
        <div class="acc-box">
          <div v-for="acc in activeOptie.accessoires" :key="acc" class="acc-item">
            <span class="acc-name">{{ acc }}</span>
            <div class="acc-img">image placeholder</div>
          </div>
        </div>
      </div>
    </template>

    <!-- ── Footer ── -->
    <template #footer>
      <div class="footer-row">
        <div>
          <BaseButton v-if="scenario === 'C' && step === 2" variant="ghost" @click="goBack">
            Terug
          </BaseButton>
        </div>
        <div class="footer-actions">
          <BaseButton variant="ghost" @click="cancel">Annuleren</BaseButton>

          <!-- C step 1: Volgende -->
          <template v-if="scenario === 'C' && step === 1">
            <BaseButton variant="filled" :disabled="gekozenOptieIndex === null" @click="goNext">Volgende</BaseButton>
          </template>

          <!-- Scenario A: Mailen + Printen + Activeren -->
          <template v-else-if="isScenarioA">
            <BaseButton variant="outlined" :disabled="!canMailOrPrint" @click="handleMailen">Mailen</BaseButton>
            <BaseButton variant="outlined" :disabled="!canMailOrPrint" @click="handlePrinten">Printen</BaseButton>
            <BaseButton variant="filled" :disabled="!canActivate" @click="handleActivate">Activeren</BaseButton>
          </template>

          <!-- Scenario B: Koppelen -->
          <template v-else-if="isScenarioB">
            <BaseButton variant="filled" :disabled="!canKoppelen" @click="handleKoppelen">Koppelen</BaseButton>
          </template>
        </div>
      </div>
    </template>
  </ActionPopup>

  <!-- ── Mail confirmation sub-modal ── -->
  <CredentialMailenModal
    :open="showMailenModal"
    :person="person"
    @update:open="showMailenModal = $event"
    @confirm="onMailenConfirm"
  />
</template>

<style scoped>
.intro-text {
  font-size: 14px;
  color: var(--n800);
  line-height: 20px;
  margin: 0;
}

/* ── Form group ── */
.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.form-group.flex-1 {
  flex: 1;
  min-width: 0;
}
.field-label {
  font-size: 14px;
  font-weight: 600;
  color: var(--n900);
  line-height: 20px;
  letter-spacing: 0.14px;
}
.req { color: var(--err); }

/* ── Readonly select ── */
.readonly-select {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 8px 8px 12px;
  background: var(--n50);
  border-radius: var(--r-s);
  height: 40px;
  box-sizing: border-box;
}
.readonly-val {
  font-size: 14px;
  color: var(--n800);
  line-height: 20px;
  flex: 1;
}
.readonly-select .mi { font-size: 24px; color: var(--n700); }

/* ── Date row ── */
.date-row {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}


/* ── Segmented buttons (Periode) ── */
.seg-group {
  display: flex;
  gap: 8px;
  padding: 4px;
  border: 1px solid var(--n500);
  border-radius: var(--r-s);
  background: var(--n0);
}
.seg-btn {
  flex: 1;
  padding: 8px 16px;
  background: var(--n0);
  border: none;
  border-radius: var(--r-s);
  font-family: var(--font);
  font-size: 14px;
  font-weight: 600;
  color: var(--n800);
  cursor: pointer;
  line-height: 20px;
  letter-spacing: 0.14px;
  transition: background 0.15s, color 0.15s;
}
.seg-btn.active { background: var(--p500); color: var(--n0); }

/* ── Accessoires ── */
.acc-box {
  background: var(--p50);
  border: 1px solid var(--p100);
  border-radius: var(--r-s);
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.acc-name {
  font-size: 16px;
  color: var(--n900);
  line-height: 24px;
}
.acc-img {
  background: var(--n0);
  border-radius: 2px;
  height: 132px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: var(--n700);
}

/* ── Footer ── */
.footer-row {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}
.footer-actions {
  display: flex;
  gap: 8px;
  align-items: center;
}
</style>
