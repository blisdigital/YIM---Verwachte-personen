<script setup>
import TypeTabs from './TypeTabs.vue'
import DateFilterChip from './DateFilterChip.vue'
import FilterChip from './FilterChip.vue'
import SearchBox from './SearchBox.vue'
import { useFilterStore } from '@/stores/filterStore'

const filterStore = useFilterStore()

const statusOptions = [
  { value: 'verwacht', label: 'Verwacht' },
  { value: 'nog niet aangekomen', label: 'Nog niet aangekomen' },
  { value: 'aangemeld', label: 'Aangemeld' },
  { value: 'afgemeld', label: 'Afgemeld' },
  { value: 'niet aangekomen', label: 'Niet aangekomen' },
  { value: 'geannuleerd', label: 'Geannuleerd' },
]

const complianceOptions = [
  { value: 'dossier-volledig', label: 'Dossier volledig' },
  { value: 'dossier-onvolledig', label: 'Dossier onvolledig' },
  { value: 'elearning-voltooid', label: 'E-learning voltooid' },
  { value: 'elearning-niet-voltooid', label: 'E-learning niet voltooid' },
]

const parkerenOptions = [
  { value: 'gereserveerd', label: 'Gereserveerd' },
  { value: 'niet-gereserveerd', label: 'Niet gereserveerd' },
]
</script>

<template>
  <div class="filter-strip">
    <div class="filter-left">
      <TypeTabs
        :model-value="filterStore.persoontype"
        @update:model-value="val => { filterStore.persoontype = val; filterStore.page = 1 }"
      />
    </div>
    <div class="filter-right">
      <DateFilterChip
        :model-value="filterStore.datum"
        :preset="filterStore.datumPreset"
        @update:model-value="val => filterStore.datum = val"
        @update:preset="val => filterStore.datumPreset = val"
      />
      <FilterChip
        label="Status"
        :options="statusOptions"
        :model-value="filterStore.status"
        @update:model-value="val => { filterStore.status = val; filterStore.page = 1 }"
      />
      <FilterChip
        label="Compliance"
        :options="complianceOptions"
        :model-value="filterStore.compliance"
        @update:model-value="val => { filterStore.compliance = val; filterStore.page = 1 }"
      />
      <FilterChip
        label="Parkeren"
        :options="parkerenOptions"
        :model-value="filterStore.parkeren ? [filterStore.parkeren] : []"
        @update:model-value="val => { filterStore.parkeren = val.length ? val[val.length - 1] : null; filterStore.page = 1 }"
      />
      <SearchBox
        :model-value="filterStore.search"
        @update:model-value="val => { filterStore.search = val; filterStore.page = 1 }"
      />
    </div>
  </div>
</template>

<style scoped>
.filter-strip {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--sp-m);
  flex-wrap: wrap;
  margin-bottom: var(--sp-xxl);
}

.filter-left {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.filter-right {
  display: flex;
  align-items: center;
  gap: var(--sp-s);
  flex-wrap: wrap;
}

@media (max-width: 1279px) {
  .filter-strip {
    flex-direction: column;
    align-items: stretch;
    gap: var(--sp-s);
  }
  .filter-right {
    width: 100%;
    overflow-x: auto;
    flex-wrap: nowrap;
    -webkit-overflow-scrolling: touch;
  }
}
</style>
