<script setup>
import { ref } from 'vue'
import SplitButton from '@/components/actions/SplitButton.vue'
import KolomInstellingenPanel from '@/components/settings/KolomInstellingenPanel.vue'
import { useToast } from '@/composables/useToast'
import { useColumnStore } from '@/stores/columnStore'

defineProps({
  title: { type: String, default: 'Verwachte personen' }
})

const { show } = useToast()
const columnStore = useColumnStore()

// Instellingen dropdown state
const showInstellingenMenu = ref(false)
const showKolomPanel = ref(false)
const showSavedSetsMenu = ref(false)

function toggleInstellingenMenu() {
  showInstellingenMenu.value = !showInstellingenMenu.value
  showKolomPanel.value = false
  showSavedSetsMenu.value = false
}

function closeAll() {
  showInstellingenMenu.value = false
  showKolomPanel.value = false
  showSavedSetsMenu.value = false
}

function openKolomInstellingen() {
  showInstellingenMenu.value = false
  showSavedSetsMenu.value = false
  showKolomPanel.value = true
}

function openSavedSets() {
  showInstellingenMenu.value = false
  showKolomPanel.value = false
  if (columnStore.savedSets.length === 0) {
    show('info', 'Geen opgeslagen sets', 'Er zijn nog geen kolomsets opgeslagen.')
  } else {
    showSavedSetsMenu.value = true
  }
}

function applySavedSet(set) {
  columnStore.applySet(set)
  show('ok', 'Set toegepast', `Kolomset "${set.name}" is toegepast.`)
  showSavedSetsMenu.value = false
}

const registratieOptions = [
  { value: 'bezoeker', label: 'Bezoeker registreren' },
  { value: 'contractor', label: 'Contractor registreren en autoriseren' },
  { type: 'divider' },
  { value: 'upload-bezoekers', label: 'Bezoeker(s) uploaden' },
  { value: 'upload-contractors', label: 'Contractor(s) uploaden' },
]

function handleRegistratieSelect(val) {
  show('info', 'Registratie', `Actie: ${val}`)
}
</script>

<template>
  <div class="page-header">
    <h1 class="page-title">{{ title }}</h1>
    <div class="page-actions">

      <!-- Instellingen custom button + panel wrapper -->
      <div class="instellingen-wrap">

        <!-- Click-away for instellingen dropdown and saved sets menu -->
        <div
          v-if="showInstellingenMenu || showSavedSetsMenu"
          class="instellingen-backdrop"
          @click="closeAll"
        />

        <!-- Instellingen button (outlined, like SplitButton but custom) -->
        <button
          class="instellingen-btn"
          :class="{ active: showInstellingenMenu || showKolomPanel || showSavedSetsMenu }"
          @click.stop="toggleInstellingenMenu"
        >
          <span class="btn-label">Instellingen</span>
          <span class="mi btn-caret">expand_more</span>
        </button>

        <!-- Dropdown menu -->
        <div v-if="showInstellingenMenu" class="instellingen-menu">
          <button class="menu-item" @click.stop="openKolomInstellingen">
            Kolominstellingen
          </button>
          <button class="menu-item" @click.stop="openSavedSets">
            Opgeslagen set toepassen
          </button>
        </div>

        <!-- Saved sets submenu -->
        <div v-if="showSavedSetsMenu" class="instellingen-menu">
          <div class="menu-label">Opgeslagen sets</div>
          <button
            v-for="set in columnStore.savedSets"
            :key="set.id"
            class="menu-item"
            @click.stop="applySavedSet(set)"
          >
            {{ set.name }}
          </button>
        </div>

        <!-- Kolominstelling panel (positioned relative to this wrapper) -->
        <KolomInstellingenPanel
          :open="showKolomPanel"
          @close="showKolomPanel = false"
        />
      </div>

      <!-- Nieuwe registratie SplitButton (unchanged) -->
      <SplitButton
        label="Nieuwe registratie"
        icon="add"
        variant="primary"
        :options="registratieOptions"
        @click="() => show('info', 'Nieuwe registratie', 'Selecteer type registratie')"
        @select="handleRegistratieSelect"
      />
    </div>
  </div>
</template>

<style scoped>
.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 48px;
}

.page-title {
  font-size: 40px;
  font-weight: 700;
  color: var(--p700);
  letter-spacing: -0.4px;
  line-height: 48px;
}

.page-actions {
  display: flex;
  align-items: center;
  gap: var(--sp-s);
}

/* Instellingen wrapper */
.instellingen-wrap {
  position: relative;
}

.instellingen-backdrop {
  position: fixed;
  inset: 0;
  z-index: 100;
}

/* Instellingen button — same size as SplitButton */
.instellingen-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 48px;
  padding: 12px 12px 12px 24px;
  font-family: var(--font);
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.16px;
  line-height: 24px;
  color: var(--n900);
  background: var(--n0);
  border: 1px solid var(--n400);
  border-radius: var(--r-s);
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.15s, border-color 0.15s;
  position: relative;
  z-index: 101;
}

.instellingen-btn:hover,
.instellingen-btn.active {
  background: var(--n50);
}

.btn-caret {
  font-size: 24px;
  color: var(--n700);
}

/* Dropdown menu */
.instellingen-menu {
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  width: 230px;
  background: var(--n0);
  border-radius: var(--r-s);
  box-shadow: 0 4px 16px rgba(17, 19, 19, 0.16);
  padding: 16px 0;
  z-index: 102;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.menu-label {
  font-size: 11px;
  font-weight: 700;
  color: var(--n500);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 6px 16px 4px;
}

.menu-item {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 4px 16px;
  font-family: var(--font);
  font-size: 16px;
  font-weight: 600;
  color: var(--p700);
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  letter-spacing: 0.16px;
  line-height: 24px;
}

.menu-item:hover {
  background: var(--n50);
  color: var(--n900);
}

@media (max-width: 1279px) {
  .page-header { flex-wrap: wrap; gap: var(--sp-m); }
  .page-title { font-size: 28px; line-height: 36px; }
}
</style>
