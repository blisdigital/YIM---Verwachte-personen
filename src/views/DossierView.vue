<script setup>
import { ref, computed } from 'vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import DossierHeader from '@/components/dossier/DossierHeader.vue'
import DossierTabs from '@/components/dossier/DossierTabs.vue'
import MijnActiesPanel from '@/components/dossier/MijnActiesPanel.vue'
import AanmeldingenTable from '@/components/dossier/AanmeldingenTable.vue'
import AankomstWijzigenModal from '@/components/actions/AankomstWijzigenModal.vue'
import AnnulerenModal from '@/components/actions/AnnulerenModal.vue'
import ToastContainer from '@/components/ui/ToastContainer.vue'
import { useNavigationStore } from '@/stores/navigationStore'
import { useToast } from '@/composables/useToast'

const nav = useNavigationStore()
const { show } = useToast()

const person = computed(() => nav.currentPerson)
const activeTab = ref('dossier')

// Mock aanmeldingen data
const aanmeldingen = ref([
  {
    id: 1,
    typeAanmelding: 'Nieuw bezoek',
    locaties: ['Hoofdkantoor Sh...', 'Locatie Zuid'],
    aankomstdatum: '27-05-2026',
    aankomsttijd: '10:00',
    resultaatDossier: 'Goedgekeurd',
    resultaatAutorisatie: '2 goedgekeurd',
    status: 'Afgehandeld',
  },
  {
    id: 2,
    typeAanmelding: 'Nieuw bezoek',
    locaties: ['Hoofdkantoor Sh...', 'Locatie Zuid'],
    aankomstdatum: '20-06-2026',
    aankomsttijd: '10:00',
    resultaatDossier: 'Goedgekeurd',
    resultaatAutorisatie: '2 goedgekeurd',
    status: 'Afgehandeld',
  },
])

// AankomstWijzigen modal
const aankomstWijzigenOpen = ref(false)
const aankomstWijzigenRow  = ref(null)

// Annuleren modal
const annulerenOpen = ref(false)

const aankomstWijzigenPerson = computed(() => {
  if (!person.value) return null
  if (!aankomstWijzigenRow.value) return person.value
  return {
    ...person.value,
    datumVanaf:   aankomstWijzigenRow.value.aankomstdatum,
    aankomsttijd: aankomstWijzigenRow.value.aankomsttijd,
  }
})

function handleTableAction({ row, action }) {
  if (action === 'bezoek-wijzigen') {
    aankomstWijzigenRow.value = row
    aankomstWijzigenOpen.value = true
  } else if (action === 'aanmelding-annuleren') {
    annulerenOpen.value = true
  }
}

function handleAnnulerenConfirm({ person: p }) {
  show('Geannuleerd', `De aankomst van ${person.value?.naam} is geannuleerd.`)
}

function handleAankomstWijzigenConfirm({ person: p, datum, aankomsttijd }) {
  if (aankomstWijzigenRow.value) {
    aankomstWijzigenRow.value.aankomstdatum = datum
    aankomstWijzigenRow.value.aankomsttijd  = aankomsttijd
  }
  show('Bezoek gewijzigd', `Aankomst gewijzigd naar ${datum} om ${aankomsttijd}.`)
}

// Mijn acties — same for both tabs
const mijnActies = [
  { value: 'nieuw-bezoek',    label: 'Nieuw bezoek toevoegen',   icon: 'add' },
  { value: 'bewerk-dossier',  label: 'Bezoekersdossier bewerken', icon: 'edit' },
]

function handleMijnActie(value) {
  show('Actie', `${value} wordt uitgevoerd.`)
}
</script>

<template>
  <div class="app-layout">
    <AppHeader />

    <main class="dossier-main" v-if="person">
      <!-- Page header: back btn + personalia + tabs -->
      <div class="page-header-area">
        <div class="page-header-inner">
          <DossierHeader :person="person" />
          <DossierTabs v-model="activeTab" />
        </div>
      </div>

      <!-- Tab content -->
      <div class="tab-content">
        <!-- Dossier tab -->
        <template v-if="activeTab === 'dossier'">
          <div class="content-row">
            <div class="dossier-placeholder">
              <span class="mi placeholder-icon">description</span>
              <p>Dossierinformatie wordt hier weergegeven.</p>
            </div>
            <MijnActiesPanel :actions="mijnActies" @action="handleMijnActie" />
          </div>
        </template>

        <!-- Aanmeldingen tab -->
        <template v-else-if="activeTab === 'aanmeldingen'">
          <div class="content-row">
            <AanmeldingenTable :aanmeldingen="aanmeldingen" @action="handleTableAction" />
            <MijnActiesPanel :actions="mijnActies" @action="handleMijnActie" />
          </div>
        </template>

        <!-- Other tabs: placeholder -->
        <template v-else>
          <div class="content-row">
            <div class="dossier-placeholder">
              <span class="mi placeholder-icon">hourglass_empty</span>
              <p>Dit tabblad is nog niet beschikbaar in dit prototype.</p>
            </div>
            <MijnActiesPanel :actions="mijnActies" @action="handleMijnActie" />
          </div>
        </template>
      </div>
    </main>

    <AankomstWijzigenModal
      v-model:open="aankomstWijzigenOpen"
      :person="aankomstWijzigenPerson"
      @confirm="handleAankomstWijzigenConfirm"
    />

    <AnnulerenModal
      v-model:open="annulerenOpen"
      :person="person"
      @confirm="handleAnnulerenConfirm"
    />

    <ToastContainer />
  </div>
</template>

<style scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--n0);
}

.dossier-main {
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* White header area with bottom border */
.page-header-area {
  background: var(--n0);
  border-bottom: 1px solid var(--n300);
}

.page-header-inner {
  padding: 40px 48px 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

@media (max-width: 1279px) {
  .page-header-inner { padding: 32px 20px 0; }
}

/* Content area below header */
.tab-content {
  padding: 24px 48px;
}

@media (max-width: 1279px) {
  .tab-content { padding: 24px 20px; }
}

.content-row {
  display: flex;
  align-items: flex-start;
  gap: 24px;
}

/* Dossier placeholder */
.dossier-placeholder {
  flex: 1;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: var(--n50);
  border-radius: var(--r-m);
  border: 1px dashed var(--n400);
  color: var(--n500);
}

.placeholder-icon {
  font-size: 48px;
  color: var(--n400);
}

.dossier-placeholder p {
  font-family: var(--font);
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
}
</style>
