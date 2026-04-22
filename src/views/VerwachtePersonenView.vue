<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import PageHeader from '@/components/layout/PageHeader.vue'
import FilterStrip from '@/components/filters/FilterStrip.vue'
import BulkBar from '@/components/actions/BulkBar.vue'
import DataTable from '@/components/table/DataTable.vue'
import Pagination from '@/components/table/Pagination.vue'
import DetailPanel from '@/components/detail/DetailPanel.vue'
import CheckinModal from '@/components/actions/CheckinModal.vue'
import ToastContainer from '@/components/ui/ToastContainer.vue'
import { usePersonenStore } from '@/stores/personenStore'
import { useFilterStore } from '@/stores/filterStore'
import { usePersonen } from '@/composables/usePersonen'
import { useSelection } from '@/composables/useSelection'
import { useToast } from '@/composables/useToast'

const personenStore = usePersonenStore()
const filterStore = useFilterStore()
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

// Checkin modal
const checkinOpen = ref(false)
const checkinPerson = ref(null)
const checkinAction = ref('inchecken') // 'inchecken' | 'uitchecken'

function openCheckin(person, action) {
  checkinPerson.value = person
  checkinAction.value = action
  checkinOpen.value = true
}

// Computed: selected persons data for BulkBar
const selectedPersons = computed(() =>
  personenStore.personen.filter(p => selectedIds.value.includes(p.id))
)

// Handle row actions (from ActionMenu and DetailPanel)
function handleAction({ person, action }) {
  switch (action) {
    case 'inchecken':
      openCheckin(person, 'inchecken')
      break
    case 'uitchecken':
      openCheckin(person, 'uitchecken')
      break
    case 'no-show':
      personenStore.updateStatus(person.id, 'No-show')
      show('warn', 'No-show geregistreerd', `${person.naam} is gemarkeerd als no-show.`)
      if (detailPerson.value?.id === person.id) {
        detailPerson.value = personenStore.personen.find(p => p.id === person.id)
      }
      break
    case 'no-show-ongedaan':
      personenStore.updateStatus(person.id, 'Verwacht')
      show('ok', 'No-show ongedaan gemaakt', `${person.naam} is teruggezet op Verwacht.`)
      if (detailPerson.value?.id === person.id) {
        detailPerson.value = personenStore.personen.find(p => p.id === person.id)
      }
      break
    case 'annuleren':
      personenStore.updateStatus(person.id, 'Geannuleerd')
      show('info', 'Geannuleerd', `${person.naam} is geannuleerd.`)
      closeDetail()
      break
    case 'pas-koppelen':
      personenStore.updatePassStatus(person.id, 'gekoppeld')
      show('ok', 'Pas gekoppeld', `Pas is gekoppeld aan ${person.naam}.`)
      break
    case 'pas-printen':
      personenStore.updatePassStatus(person.id, 'geprint')
      show('ok', 'Pas geprint', `Pas voor ${person.naam} is afgedrukt.`)
      break
    case 'pas-ontkoppelen':
      personenStore.updatePassStatus(person.id, 'niet-gekoppeld')
      show('info', 'Pas ontkoppeld', `Pas is ontkoppeld van ${person.naam}.`)
      break
    case 'bekijk-dossier':
      show('info', 'Dossier', `Dossier van ${person.naam} wordt geopend.`)
      break
    case 'contact-opnemen':
    case 'contactpersoon-informeren':
      show('info', 'Contact', `Contactpersoon van ${person.naam}: ${person.contactpersoon} (${person.contactTel})`)
      break
    case 'bel-persoon':
    case 'bel-contactpersoon':
      show('info', 'Bellen', `Bel: ${person.contactTel}`)
      break
    default:
      show('info', 'Actie', `${action} voor ${person.naam}`)
  }
}

// Confirm checkin/checkout
function handleCheckinConfirm({ person, action }) {
  if (action === 'inchecken') {
    personenStore.updateStatus(person.id, 'Aangekomen')
    show('ok', 'Ingecheckt', `${person.naam} is succesvol ingecheckt.`)
  } else {
    personenStore.updateStatus(person.id, 'Vertrokken')
    show('ok', 'Uitgecheckt', `${person.naam} is succesvol uitgecheckt.`)
  }
  // Sync detail panel person
  if (detailPerson.value?.id === person.id) {
    detailPerson.value = personenStore.personen.find(p => p.id === person.id)
  }
}

// Bulk actions
function handleBulkAction(action) {
  const persons = selectedPersons.value

  switch (action) {
    case 'inchecken':
      persons.filter(p => ['Verwacht', 'No-show'].includes(p.status)).forEach(p => {
        personenStore.updateStatus(p.id, 'Aangekomen')
      })
      show('ok', 'Bulk inchecken', `${persons.length} personen ingecheckt.`)
      clearAll()
      break
    case 'uitchecken':
      persons.filter(p => p.status === 'Aangekomen').forEach(p => {
        personenStore.updateStatus(p.id, 'Vertrokken')
      })
      show('ok', 'Bulk uitchecken', `Geselecteerde personen uitgecheckt.`)
      clearAll()
      break
    case 'no-show':
      persons.filter(p => ['Verwacht', 'No-show'].includes(p.status)).forEach(p => {
        personenStore.updateStatus(p.id, 'No-show')
      })
      show('warn', 'No-show', `Geselecteerde personen als no-show geregistreerd.`)
      clearAll()
      break
    case 'annuleren':
      persons.forEach(p => personenStore.updateStatus(p.id, 'Geannuleerd'))
      show('info', 'Geannuleerd', `Geselecteerde personen zijn geannuleerd.`)
      clearAll()
      break
    case 'pas-koppelen':
      persons.forEach(p => personenStore.updatePassStatus(p.id, 'gekoppeld'))
      show('ok', 'Pas koppelen', `Passen gekoppeld aan ${persons.length} personen.`)
      clearAll()
      break
    case 'pas-printen':
      persons.filter(p => p.status === 'Aangekomen').forEach(p => {
        personenStore.updatePassStatus(p.id, 'geprint')
      })
      show('ok', 'Pas printen', `Passen afgedrukt.`)
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

    <!-- Checkin modal -->
    <CheckinModal
      v-model:open="checkinOpen"
      :person="checkinPerson"
      :action="checkinAction"
      @confirm="handleCheckinConfirm"
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
