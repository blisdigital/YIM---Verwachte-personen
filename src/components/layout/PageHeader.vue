<script setup>
import { ref } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import KolomInstellingenPanel from '@/components/settings/KolomInstellingenPanel.vue'
import { useToast } from '@/composables/useToast'
import { useColumnStore } from '@/stores/columnStore'

const props = defineProps({
  title:    { type: String,  default: 'Verwachte personen' },
  subtitle: { type: String,  default: '' },
  showBack: { type: Boolean, default: false },
})

const emit = defineEmits(['back'])

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
    show('Geen opgeslagen sets', 'Er zijn nog geen kolomsets opgeslagen.')
  } else {
    showSavedSetsMenu.value = true
  }
}

function applySavedSet(set) {
  columnStore.applySet(set)
  show('Set toegepast', `Kolomset "${set.name}" is toegepast.`)
  showSavedSetsMenu.value = false
}

// Nieuwe registratie dropdown state
const showRegistratieMenu = ref(false)

const registratieOptions = [
  { value: 'bezoeker', label: 'Bezoeker registreren' },
  { value: 'contractor', label: 'Contractor registreren en autoriseren' },
  { type: 'divider' },
  { value: 'upload-bezoekers', label: 'Bezoeker(s) uploaden' },
  { value: 'upload-contractors', label: 'Contractor(s) uploaden' },
]

function toggleRegistratieMenu() {
  showRegistratieMenu.value = !showRegistratieMenu.value
}

function handleRegistratieSelect(val) {
  showRegistratieMenu.value = false
  show('Registratie', `Actie: ${val}`)
}
</script>

<template>
  <div class="page-header">
    <div class="page-header-left">
      <button v-if="showBack" class="back-btn" @click="emit('back')">
        <span class="mi">arrow_back</span>
        Terug
      </button>
      <h1 class="page-title">{{ title }}</h1>
      <p v-if="subtitle" class="page-subtitle">{{ subtitle }}</p>
    </div>
    <div v-if="!showBack" class="page-actions">

      <!-- Instellingen custom button + panel wrapper -->
      <div class="instellingen-wrap">

        <!-- Click-away for instellingen dropdown and saved sets menu -->
        <div
          v-if="showInstellingenMenu || showSavedSetsMenu"
          class="instellingen-backdrop"
          @click="closeAll"
        />

        <!-- Instellingen button -->
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

      <!-- Nieuwe registratie: BaseButton + inline dropdown -->
      <div class="registratie-wrap">
        <div
          v-if="showRegistratieMenu"
          class="registratie-backdrop"
          @click="showRegistratieMenu = false"
        />

        <BaseButton
          variant="filled"
          size="lg"
          icon="expand_more"
          icon-position="right"
          @click.stop="toggleRegistratieMenu"
        >
          Nieuwe registratie
        </BaseButton>

        <div v-if="showRegistratieMenu" class="registratie-menu">
          <template v-for="opt in registratieOptions" :key="opt.value ?? opt.type">
            <div v-if="opt.type === 'divider'" class="menu-divider" />
            <button
              v-else
              class="menu-item"
              @click.stop="handleRegistratieSelect(opt.value)"
            >
              {{ opt.label }}
            </button>
          </template>
        </div>
      </div>

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

.page-header-left {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font);
  font-size: 14px;
  font-weight: 600;
  color: var(--n600);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-bottom: 8px;
  transition: color 0.15s;
}
.back-btn:hover { color: var(--p700); }
.back-btn .mi { font-size: 18px; }

.page-title {
  font-size: 40px;
  font-weight: 700;
  color: var(--p700);
  letter-spacing: -0.4px;
  line-height: 48px;
  margin: 0;
}

.page-subtitle {
  font-size: 16px;
  color: var(--n600);
  margin: 0;
}

.page-actions {
  display: flex;
  align-items: center;
  gap: var(--sp-s);
}

/* ── Instellingen wrapper ── */
.instellingen-wrap {
  position: relative;
}

.instellingen-backdrop {
  position: fixed;
  inset: 0;
  z-index: 100;
}

.instellingen-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 48px;
  padding: 12px 8px 12px 16px;
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
  color: var(--n900);
}

/* ── Dropdown menus ── */
.instellingen-menu {
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  width: 230px;
  background: var(--n0);
  border-radius: var(--r-s);
  box-shadow: var(--shadow-m);
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
  color: var(--n900);
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  letter-spacing: 0.16px;
  line-height: 24px;
}

.menu-item:hover {
  background: var(--n50);
}

.menu-item[aria-current="true"] {
  color: var(--p700);
}

/* ── Nieuwe registratie wrapper ── */
.registratie-wrap {
  position: relative;
}

.registratie-backdrop {
  position: fixed;
  inset: 0;
  z-index: 100;
}

.registratie-menu {
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  width: 280px;
  background: var(--n0);
  border-radius: var(--r-s);
  box-shadow: var(--shadow-m);
  padding: 16px 0;
  z-index: 102;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.menu-divider {
  height: 1px;
  background: var(--n300);
  margin: 4px 0;
}

@media (max-width: 1279px) {
  .page-header { flex-wrap: wrap; gap: var(--sp-m); }
  .page-title { font-size: 28px; line-height: 36px; }
}
</style>
