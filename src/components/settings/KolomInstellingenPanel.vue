<script setup>
import { ref, computed, watch } from 'vue'
import { useColumnStore } from '@/stores/columnStore'
import { useToast } from '@/composables/useToast'
import columnsConfig from '@/../columns.json'

const props = defineProps({
  open: { type: Boolean, default: false },
})
const emit = defineEmits(['close'])

const columnStore = useColumnStore()
const { show } = useToast()

// Columns excluded from the toggle list: sticky + locked (always-visible)
const LOCKED_KEYS = new Set(['naam'])
const configurableColumns = columnsConfig.filter(
  c => c.key !== 'actions' && !LOCKED_KEYS.has(c.key)
)

// Local state — a copy to stage changes before applying
const localVisible = ref([...columnStore.visibleColumns])
const showSaveInput = ref(false)
const setName = ref('')

// Sync local when panel opens
watch(() => props.open, (val) => {
  if (val) {
    localVisible.value = [...columnStore.visibleColumns]
    showSaveInput.value = false
    setName.value = ''
  }
})

const allChecked = computed(() => configurableColumns.every(c => localVisible.value.includes(c.key)))
const someChecked = computed(() => configurableColumns.some(c => localVisible.value.includes(c.key)) && !allChecked.value)

function isChecked(key) {
  return localVisible.value.includes(key)
}

function toggleColumn(key) {
  if (localVisible.value.includes(key)) {
    const nonLocked = localVisible.value.filter(k => !LOCKED_KEYS.has(k))
    if (nonLocked.length <= 1) {
      show('Minimaal 1 kolom', 'Er moet minimaal 1 kolom zichtbaar zijn.')
      return
    }
    localVisible.value = localVisible.value.filter(k => k !== key)
  } else {
    localVisible.value = [...localVisible.value, key]
  }
}

function toggleAll() {
  if (allChecked.value) {
    const allKeys = configurableColumns.map(c => c.key)
    localVisible.value = localVisible.value.filter(k => !allKeys.includes(k))
  } else {
    const allKeys = configurableColumns.map(c => c.key)
    localVisible.value = [...new Set([...localVisible.value, ...allKeys])]
  }
}

function resetDefault() {
  localVisible.value = [...columnStore.DEFAULT_VISIBLE]
}

function apply() {
  columnStore.applyColumns(localVisible.value)
  emit('close')
}

function startSaveSet() {
  showSaveInput.value = true
  setName.value = ''
}

function cancelSaveSet() {
  showSaveInput.value = false
  setName.value = ''
}

function confirmSaveSet() {
  const name = setName.value.trim()
  if (!name) {
    show('Naam vereist', 'Geef de set een naam.')
    return
  }
  columnStore.saveSet(name)
  show('Set opgeslagen', `Kolomset "${name}" is opgeslagen.`)
  showSaveInput.value = false
  setName.value = ''
}
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="panel-backdrop" @click="emit('close')" />
  </Teleport>

  <div v-if="open" class="kolominstelling-panel">
    <!-- Scrollable list: header sticky inside -->
    <div class="col-list">
      <!-- Sticky header: Selecteer alles + divider -->
      <div class="col-list-header">
        <div class="col-row col-row--all" @click.stop="toggleAll">
          <span class="col-label">Selecteer alles</span>
          <span class="col-checkbox-wrap">
            <span v-if="someChecked" class="cb cb--indeterminate"></span>
            <span v-else-if="allChecked" class="cb cb--checked"></span>
            <span v-else class="cb cb--unchecked"></span>
          </span>
        </div>
        <div class="col-divider" />
      </div>

      <!-- Locked: Naam persoon (always visible, cannot be toggled) -->
      <div class="col-row col-row--locked">
        <span class="col-label">Naam persoon</span>
        <span class="col-checkbox-wrap">
          <span class="cb cb--locked"></span>
        </span>
      </div>

      <!-- Configurable columns in table order -->
      <div
        v-for="col in configurableColumns"
        :key="col.key"
        class="col-row"
        @click.stop="toggleColumn(col.key)"
      >
        <span class="col-label">{{ col.label }}</span>
        <span class="col-checkbox-wrap">
          <span v-if="isChecked(col.key)" class="cb cb--checked"></span>
          <span v-else class="cb cb--unchecked"></span>
        </span>
      </div>
    </div>

    <div class="col-divider" />

    <!-- Footer -->
    <div v-if="!showSaveInput" class="panel-footer">
      <button class="btn-reset" @click.stop="resetDefault">Reset standaard</button>
      <button class="btn-save-set" @click.stop="startSaveSet">Set opslaan</button>
      <button class="btn-apply" @click.stop="apply">Toepassen</button>
    </div>

    <!-- Save set input -->
    <div v-else class="panel-footer panel-footer--save">
      <input
        v-model="setName"
        class="set-name-input"
        type="text"
        placeholder="Naam voor deze set..."
        @click.stop
        @keyup.enter="confirmSaveSet"
        @keyup.escape="cancelSaveSet"
        autofocus
      />
      <div class="save-actions">
        <button class="btn-reset" @click.stop="cancelSaveSet">Annuleren</button>
        <button class="btn-apply" @click.stop="confirmSaveSet">Opslaan</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.panel-backdrop {
  position: fixed;
  inset: 0;
  z-index: 100;
}

.kolominstelling-panel {
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  width: 400px;
  background: var(--n0);
  border-radius: var(--r-s);
  box-shadow: var(--shadow-m);
  padding: 0;
  z-index: 102;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Scrollable column list */
.col-list {
  flex: 1;
  max-height: 240px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  scrollbar-width: 16px;
  scrollbar-color: var(--p700) var(--n50);
}

.col-list::-webkit-scrollbar {
  width: 16px;
}

.col-list::-webkit-scrollbar-track {
  background: var(--n50);
  padding: 2px 4px;
}

.col-list::-webkit-scrollbar-thumb {
  background: var(--p700);
  border-radius: var(--r-m);
  border: 4px solid var(--n50);
}

/* Sticky "Selecteer alles" header inside the scroll container */
.col-list-header {
  position: sticky;
  top: 0;
  background: var(--n50);
  z-index: 1;
}

.col-divider {
  height: 1px;
  background: var(--n300);
}

.col-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 40px;
  padding: 0 16px;
  cursor: pointer;
  user-select: none;
}

.col-row:hover {
  background: var(--p50);
}

.col-row--all {
  font-weight: 600;
  min-height: 44px;
  padding: 4px 16px;
}

.col-row--all:hover {
  background: var(--n50);
}

.col-row--locked {
  cursor: default;
  opacity: 0.45;
}

.col-row--locked:hover {
  background: transparent;
}

.col-label {
  font-size: 14px;
  font-weight: 600;
  color: var(--n900);
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.col-checkbox-wrap {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.cb {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: var(--r-s);
  flex-shrink: 0;
  position: relative;
}

.cb--unchecked {
  border: 1px solid var(--n800);
  background: var(--n0);
}

.col-row:not(.col-row--locked):hover .cb--unchecked {
  border-color: var(--n1000);
}

.cb--checked {
  background: var(--p500);
}

.cb--checked::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 44%;
  width: 5px;
  height: 9px;
  border: 2px solid white;
  border-top: none;
  border-left: none;
  transform: translate(-50%, -50%) rotate(45deg);
}

.col-row:not(.col-row--locked):hover .cb--checked {
  background: var(--p600);
}

.cb--indeterminate {
  background: var(--p500);
}

.cb--indeterminate::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  width: 10px;
  height: 2px;
  background: white;
  transform: translate(-50%, -50%);
}

.col-row:hover .cb--indeterminate {
  background: var(--p600);
}

.cb--locked {
  background: var(--p100);
  cursor: not-allowed;
}

.cb--locked::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 44%;
  width: 5px;
  height: 9px;
  border: 2px solid white;
  border-top: none;
  border-left: none;
  transform: translate(-50%, -50%) rotate(45deg);
  opacity: 0.6;
}

/* Footer */
.panel-footer {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
}

.panel-footer--save {
  flex-direction: column;
  align-items: stretch;
  gap: 8px;
}

.set-name-input {
  height: 32px;
  padding: 0 10px;
  border: 1px solid var(--n300);
  border-radius: var(--r-s);
  font-family: var(--font);
  font-size: 12px;
  color: var(--n900);
  outline: none;
  background: var(--n0);
  width: 100%;
  box-sizing: border-box;
}

.set-name-input:focus {
  border-color: var(--p500);
}

.save-actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}

.btn-reset {
  height: 32px;
  padding: 0 12px;
  font-family: var(--font);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.12px;
  color: var(--n900);
  background: transparent;
  border: none;
  border-radius: var(--r-s);
  cursor: pointer;
  white-space: nowrap;
}

.btn-reset:hover {
  background: var(--n100);
}

.btn-save-set {
  height: 32px;
  padding: 0 12px;
  font-family: var(--font);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.12px;
  color: var(--n900);
  background: var(--n0);
  border: 1px solid var(--n400);
  border-radius: var(--r-s);
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
  margin-left: auto;
}

.btn-save-set:hover {
  border-color: var(--n500);
}

.btn-apply {
  height: 32px;
  padding: 0 12px;
  font-family: var(--font);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.12px;
  color: var(--n0);
  background: var(--p500);
  border: none;
  border-radius: var(--r-s);
  cursor: pointer;
  white-space: nowrap;
}

.btn-apply:hover {
  background: var(--p700);
}
</style>
