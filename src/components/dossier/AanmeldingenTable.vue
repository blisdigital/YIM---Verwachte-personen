<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  aanmeldingen: { type: Array, default: () => [] },
})
const emit = defineEmits(['action'])

const openMenuId = ref(null)
const menuStyle = ref({})
const menuRef = ref(null)

function openMenu(rowId, triggerEl) {
  openMenuId.value = rowId
  setTimeout(() => {
    if (!menuRef.value || !triggerEl) return
    const rect = triggerEl.getBoundingClientRect()
    const vw = window.innerWidth
    let left = rect.left
    if (left + 200 > vw) left = rect.right - 200
    menuStyle.value = {
      position: 'fixed',
      top: `${rect.bottom + 4}px`,
      left: `${left}px`,
      zIndex: 400,
    }
  }, 0)
}

function selectAction(rowId, action) {
  openMenuId.value = null
  const row = props.aanmeldingen.find(r => r.id === rowId)
  emit('action', { row, action })
}

function onClickAway(e) {
  if (!openMenuId.value) return
  if (!menuRef.value?.contains(e.target)) openMenuId.value = null
}

function statusColor(status) {
  if (status === 'Afgehandeld') return 'var(--ok)'
  if (status === 'In behandeling') return 'var(--warn)'
  if (status === 'Geannuleerd') return 'var(--err)'
  return 'var(--n400)'
}

onMounted(() => document.addEventListener('click', onClickAway))
onBeforeUnmount(() => document.removeEventListener('click', onClickAway))
</script>

<template>
  <div class="aanmeldingen-table">
    <div class="table-header">
      <div class="col col-type">Type aanmelding</div>
      <div class="col col-locaties">Locaties</div>
      <div class="col col-datum">Aankomstdatum</div>
      <div class="col col-tijd">Aankomsttijd</div>
      <div class="col col-dossier">Resultaat dossier</div>
      <div class="col col-autorisatie">Resultaat autorisatie</div>
      <div class="col col-status">Status</div>
      <div class="col col-acties">Acties</div>
    </div>

    <div v-for="row in aanmeldingen" :key="row.id" class="table-row">
      <div class="col col-type">{{ row.typeAanmelding }}</div>
      <div class="col col-locaties">
        <span class="mi location-icon">location_on</span>
        {{ row.locaties.length }} locatie{{ row.locaties.length !== 1 ? 's' : '' }}
      </div>
      <div class="col col-datum">{{ row.aankomstdatum }}</div>
      <div class="col col-tijd">{{ row.aankomsttijd }}</div>
      <div class="col col-dossier">{{ row.resultaatDossier }}</div>
      <div class="col col-autorisatie">{{ row.resultaatAutorisatie }}</div>
      <div class="col col-status">
        <span class="status-dot" :style="{ background: statusColor(row.status) }"></span>
        {{ row.status }}
      </div>
      <div class="col col-acties">
        <button
          class="acties-btn"
          @click.stop="openMenu(row.id, $event.currentTarget)"
          aria-label="Acties"
        >
          <span class="mi">more_horiz</span>
        </button>
      </div>
    </div>

    <Teleport to="body">
      <div v-if="openMenuId" ref="menuRef" class="action-dropdown" :style="menuStyle">
        <button class="action-item" @click="selectAction(openMenuId, 'bezoek-wijzigen')">
          Bezoek wijzigen
        </button>
        <button class="action-item action-item-danger" @click="selectAction(openMenuId, 'aanmelding-annuleren')">
          Aanmelding annuleren
        </button>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.aanmeldingen-table {
  flex: 1;
  min-width: 0;
  border-radius: var(--r-s);
  overflow-x: auto;
  border: 1px solid var(--p100);
}

.table-header {
  display: flex;
  min-width: max-content;
  background: var(--p700);
  border-bottom: 1px solid var(--p800);
}

.table-row {
  display: flex;
  min-width: max-content;
  background: var(--p50);
  border-bottom: 1px solid var(--p100);
}

.table-row:last-child { border-bottom: none; }

.col {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  font-family: var(--font);
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.14px;
  flex: 1 0 auto;
}

.table-header .col {
  font-weight: 600;
  color: var(--n0);
  border-right: 1px solid var(--p800);
  gap: 8px;
}

.table-row .col {
  font-weight: 600;
  color: var(--p800);
}

/* Column min-widths from Figma — flex: 1 lets them grow on wide screens */
.col-type        { min-width: 200px; }
.col-locaties    { min-width: 184px; gap: 8px; }
.col-datum       { min-width: 168px; }
.col-tijd        { min-width: 144px; }
.col-dossier     { min-width: 168px; }
.col-autorisatie { min-width: 200px; }
.col-status      { min-width: 181px; gap: 8px; }
.col-acties      { flex: 0 0 auto; min-width: 72px; justify-content: flex-end; padding: 4px 16px 4px 4px; }

.location-icon {
  font-size: 20px;
  color: var(--p600);
  flex-shrink: 0;
}

.status-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
}

.acties-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: none;
  border: 2px solid var(--p500);
  border-radius: var(--r-xl);
  cursor: pointer;
  color: var(--p700);
  transition: background 0.15s;
}

.acties-btn:hover { background: var(--p100); }
.acties-btn .mi { font-size: 24px; }
</style>

<!-- Action dropdown (teleported — not scoped) -->
<style>
.action-dropdown {
  background: var(--n0);
  border-radius: var(--r-s);
  box-shadow: var(--shadow-m);
  overflow: hidden;
  padding: 8px 0;
  display: flex;
  flex-direction: column;
  min-width: 180px;
}

.action-item {
  display: block;
  width: 100%;
  padding: 8px 16px;
  background: none;
  border: none;
  font-family: var(--font);
  font-size: 16px;
  font-weight: 600;
  color: var(--p700);
  cursor: pointer;
  text-align: left;
  line-height: 24px;
  letter-spacing: 0.16px;
}

.action-item:hover { background: var(--n50); }

.action-item-danger { color: var(--err); }
.action-item-danger:hover { background: var(--err-bg); }
</style>
