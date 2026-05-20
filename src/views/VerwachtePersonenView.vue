<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import PageHeader from '@/components/layout/PageHeader.vue'
import FilterStrip from '@/components/filters/FilterStrip.vue'
import BulkBar from '@/components/actions/BulkBar.vue'
import DataTable from '@/components/table/DataTable.vue'
import Pagination from '@/components/table/Pagination.vue'
import DetailPanel from '@/components/detail/DetailPanel.vue'
import AanmeldenModal from '@/components/actions/AanmeldenModal.vue'
import AnnulerenModal from '@/components/actions/AnnulerenModal.vue'
import AankomstWijzigenModal from '@/components/actions/AankomstWijzigenModal.vue'
import AfmeldenModal from '@/components/actions/AfmeldenModal.vue'
import InformeerContactpersoonModal from '@/components/actions/InformeerContactpersoonModal.vue'
import CredentialOntkoppelenModal from '@/components/actions/CredentialOntkoppelenModal.vue'
import ToastContainer from '@/components/ui/ToastContainer.vue'
import { usePersonenStore } from '@/stores/personenStore'
import { useFilterStore } from '@/stores/filterStore'
import { useNavigationStore } from '@/stores/navigationStore'
import { usePersonen } from '@/composables/usePersonen'
import { useSelection } from '@/composables/useSelection'
import { useToast } from '@/composables/useToast'

const personenStore = usePersonenStore()
const filterStore = useFilterStore()
const nav = useNavigationStore()
const { paginated, total, loading, filtered } = usePersonen()

// Scroll to top before DOM updates when filters change, to prevent scroll-clamp jump
watch(filtered, () => {
  window.scrollTo({ top: 0, behavior: 'instant' })
}, { flush: 'pre' })

// Reset page when filters change and results shrink
watch(() => filtered.value.length, (newLen) => {
  const maxPage = Math.ceil(newLen / filterStore.pageSize) || 1
  if (filterStore.page > maxPage) {
    filterStore.page = 1
  }
})
const { selectedIds, count: selectionCount, toggle, selectAll, clearAll, isSelected } = useSelection()
const { show } = useToast()

// Detail panel
const detailOpen = ref(false)
const detailPerson = ref(null)

function openDetail(person) {
  detailPerson.value = person
  detailOpen.value = true
}

function closeDetail() {
  detailOpen.value = false
  detailPerson.value = null
}

// Aanmelden modal
const aanmeldenOpen = ref(false)
const aanmeldenPerson = ref(null)
const aanmeldenAction = ref('inchecken') // 'inchecken' | 'niet-aangekomen-ongedaan'

function openAanmelden(person, action) {
  aanmeldenPerson.value = person
  aanmeldenAction.value = action
  aanmeldenOpen.value = true
}

// Afmelden modal
const afmeldenOpen = ref(false)
const afmeldenPerson = ref(null)

function openAfmelden(person) {
  afmeldenPerson.value = person
  afmeldenOpen.value = true
}

// Annuleren modal
const annulerenOpen   = ref(false)
const annulerenPerson = ref(null)

// Aankomst wijzigen modal
const aankomstWijzigenOpen   = ref(false)
const aankomstWijzigenPerson = ref(null)

function openAankomstWijzigen(person) {
  aankomstWijzigenPerson.value = person
  aankomstWijzigenOpen.value   = true
}

function openAnnuleren(person) {
  annulerenPerson.value = person
  annulerenOpen.value   = true
}

// Informeer contactpersoon modal
const informeerOpen   = ref(false)
const informeerPerson = ref(null)

function openInformeer(person) {
  informeerPerson.value = person
  informeerOpen.value   = true
}

// Credential ontkoppelen modal
const ontkoppelenOpen   = ref(false)
const ontkoppelenPerson = ref(null)

function openOntkoppelen(person) {
  ontkoppelenPerson.value = person
  ontkoppelenOpen.value   = true
}

// Computed: selected persons data for BulkBar
const selectedPersons = computed(() =>
  personenStore.personen.filter(p => selectedIds.value.includes(p.id))
)

// Handle row actions (from ActionMenu and DetailPanel)
function handleAction({ person, action }) {
  switch (action) {
    // ActionMenu actions
    case 'persoon-aanmelden':
      openAanmelden(person, 'inchecken')
      break
    case 'persoon-afmelden':
      openAfmelden(person)
      break
    case 'persoon-annuleren':
      openAnnuleren(person)
      break
    case 'credential-koppelen':
      nav.navigate('credential-koppelen', person)
      break
    case 'credential-printen':
      nav.navigate('credential-printen', person)
      break
    case 'credential-ontkoppelen':
      openOntkoppelen(person)
      break
    case 'informeer-contactpersoon':
      openInformeer(person)
      break
    case 'aankomst-wijzigen':
      openAankomstWijzigen(person)
      break
    case 'bekijk-dossier':
      show('Dossier', `Dossier van ${person.naam} wordt geopend.`)
      break
    case 'bel-persoon':
      show('Bel persoon', person.telefoonnummer
        ? `${person.naam}: ${person.telefoonnummer}`
        : `Geen telefoonnummer bekend voor ${person.naam}.`)
      break
    // DetailPanel legacy actions
    case 'inchecken':
      openAanmelden(person, 'inchecken')
      break
    case 'uitchecken':
    case 'afmelden':
      openAfmelden(person)
      break
    case 'niet-aangekomen-ongedaan':
      openAanmelden(person, 'niet-aangekomen-ongedaan')
      break
    case 'annuleren':
      openAnnuleren(person)
      break
    default:
      show('Actie', `${action} voor ${person.naam}`)
  }
}

// Bevestig aanmelden
function handleAanmeldenConfirm({ person }) {
  personenStore.updateStatus(person.id, 'Aangemeld')
  show('Aangemeld', `${person.naam} is aangemeld.`)
  // Sync detail panel person
  if (detailPerson.value?.id === person.id) {
    detailPerson.value = personenStore.personen.find(p => p.id === person.id)
  }
}

// Confirm annuleren — sluit ook detail panel (flow spec: geen detailweergave na annuleren)
function handleAnnulerenConfirm({ person }) {
  personenStore.updateStatus(person.id, 'Geannuleerd')
  show('Geannuleerd', `De aankomst van ${person.naam} is geannuleerd.`)
  closeDetail()
}

// Confirm aankomst wijzigen
function handleAankomstWijzigenConfirm({ person, datum, aankomsttijd, vertrektijd }) {
  personenStore.updateAankomst(person.id, datum, aankomsttijd, vertrektijd)
  show('Aankomst gewijzigd', `Aankomst van ${person.naam} is gewijzigd naar ${datum} om ${aankomsttijd}.`)
  if (detailPerson.value?.id === person.id) {
    detailPerson.value = personenStore.personen.find(p => p.id === person.id)
  }
}

// Bevestig informeer contactpersoon
function handleInformeerConfirm({ person }) {
  show('Contactpersoon geïnformeerd', `Contactpersoon van ${person.naam} is geïnformeerd.`)
}

// Bevestig credential ontkoppelen
function handleOntkoppelenConfirm({ person }) {
  personenStore.updateCredentialStatus(person.id, 'niet-actief')
  show('Credential ontkoppeld', `Credential is ontkoppeld van ${person.naam}.`)
  if (detailPerson.value?.id === person.id) {
    detailPerson.value = personenStore.personen.find(p => p.id === person.id)
  }
}

// Bevestig afmelden
function handleAfmeldenConfirm({ person }) {
  personenStore.updateStatus(person.id, 'Afgemeld')
  show('Afgemeld', `${person.naam} is afgemeld.`)
  if (detailPerson.value?.id === person.id) {
    detailPerson.value = personenStore.personen.find(p => p.id === person.id)
  }
}

// Bulk actions
function handleBulkAction(action) {
  const persons = selectedPersons.value

  switch (action) {
    case 'inchecken':
      persons.filter(p => ['Verwacht', 'Nog niet aangekomen', 'Niet aangekomen'].includes(p.status)).forEach(p => {
        personenStore.updateStatus(p.id, 'Aangemeld')
      })
      show('Bulk aanmelden', `${persons.length} personen aangemeld.`)
      clearAll()
      break
    case 'uitchecken':
      persons.filter(p => p.status === 'Aangemeld').forEach(p => {
        personenStore.updateStatus(p.id, 'Afgemeld')
      })
      show('Bulk afmelden', `Geselecteerde personen afgemeld.`)
      clearAll()
      break
    case 'annuleren':
      persons.forEach(p => personenStore.updateStatus(p.id, 'Geannuleerd'))
      show('Geannuleerd', `Geselecteerde personen zijn geannuleerd.`)
      clearAll()
      break
    case 'pas-koppelen':
      persons.forEach(p => personenStore.updateCredentialStatus(p.id, 'actief'))
      show('Pas koppelen', `Passen gekoppeld aan ${persons.length} personen.`)
      clearAll()
      break
    case 'pas-printen':
      persons.filter(p => p.status === 'Aangemeld').forEach(p => {
        personenStore.updateCredentialStatus(p.id, 'actief')
      })
      show('Pas printen', `Passen afgedrukt.`)
      clearAll()
      break
    case 'pas-ontkoppelen':
      persons.filter(p => p.status === 'Aangemeld').forEach(p => {
        personenStore.updateCredentialStatus(p.id, 'niet-actief')
      })
      show('Pas ontkoppelen', `Passen ontkoppeld.`)
      clearAll()
      break
    case 'niet-aangekomen':
      persons.filter(p => ['Verwacht', 'Nog niet aangekomen'].includes(p.status)).forEach(p => {
        personenStore.updateStatus(p.id, 'Niet aangekomen')
      })
      show('Niet aangekomen', `Geselecteerde personen geregistreerd als niet aangekomen.`)
      clearAll()
      break
  }
}

// Table selection
function handleSelect(id) {
  toggle(id)
}

function handleSelectAll(ids) {
  if (ids.length === 0) {
    clearAll()
  } else {
    selectAll(ids)
  }
}

onMounted(() => {
  personenStore.fetch()
})
</script>

<template>
  <div class="app-layout">
    <AppHeader />

    <main class="page-main">
      <div class="page-content">
        <PageHeader title="Verwachte personen" />
        <FilterStrip />

        <BulkBar
          v-if="selectionCount > 0"
          :count="selectionCount"
          :selected-persons="selectedPersons"
          @action="handleBulkAction"
          @clear="clearAll"
        />

        <div class="table-section">
          <DataTable
            :data="paginated"
            :loading="loading"
            :selected-ids="selectedIds"
            @row-click="openDetail"
            @select="handleSelect"
            @select-all="handleSelectAll"
            @action="handleAction"
          />

          <Pagination
            :total="total"
            :page="filterStore.page"
            :page-size="filterStore.pageSize"
            @update:page="val => filterStore.page = val"
            @update:page-size="val => { filterStore.pageSize = val; filterStore.page = 1 }"
          />
        </div>
      </div>
    </main>

    <!-- Detail panel -->
    <DetailPanel
      :person="detailPerson"
      :open="detailOpen"
      @close="closeDetail"
      @action="handleAction"
    />

    <!-- Aanmelden modal -->
    <AanmeldenModal
      v-model:open="aanmeldenOpen"
      :person="aanmeldenPerson"
      :requiresIdentiteitscontrole="true"
      :showContactpersoonToggle="true"
      @confirm="handleAanmeldenConfirm"
    />

    <!-- Annuleren modal -->
    <AnnulerenModal
      v-model:open="annulerenOpen"
      :person="annulerenPerson"
      @confirm="handleAnnulerenConfirm"
    />

    <!-- Aankomst wijzigen modal -->
    <AankomstWijzigenModal
      v-model:open="aankomstWijzigenOpen"
      :person="aankomstWijzigenPerson"
      @confirm="handleAankomstWijzigenConfirm"
    />

    <!-- Afmelden modal -->
    <AfmeldenModal
      v-model:open="afmeldenOpen"
      :person="afmeldenPerson"
      :showContactpersoonToggle="true"
      @confirm="handleAfmeldenConfirm"
    />

    <!-- Informeer contactpersoon modal -->
    <InformeerContactpersoonModal
      v-model:open="informeerOpen"
      :person="informeerPerson"
      @confirm="handleInformeerConfirm"
    />

    <!-- Credential ontkoppelen modal -->
    <CredentialOntkoppelenModal
      v-model:open="ontkoppelenOpen"
      :person="ontkoppelenPerson"
      @confirm="handleOntkoppelenConfirm"
    />

    <!-- Toast notifications -->
    <ToastContainer />
  </div>
</template>

<style scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.page-main {
  flex: 1;
  padding: 48px 47px;
}

@media (max-width: 1279px) {
  .page-main { padding: 48px 20px; }
}

.page-content {
  max-width: 100%;
}

.table-section {
  background: var(--n0);
  border-radius: var(--r-s);
  border: 1px solid var(--n400);
  overflow: hidden;
}
</style>
