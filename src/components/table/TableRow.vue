<script setup>
import StatusDot from '@/components/ui/StatusDot.vue'
import PassStatusDot from '@/components/ui/PassStatusDot.vue'
import ComplianceCell from '@/components/ui/ComplianceCell.vue'
import ActionMenu from '@/components/actions/ActionMenu.vue'
import Tooltip from '@/components/ui/Tooltip.vue'

const props = defineProps({
  person: { type: Object, required: true },
  selected: { type: Boolean, default: false },
  columns: { type: Array, default: () => [] },
  columnWidths: { type: Object, default: () => ({}) },
})
const emit = defineEmits(['select', 'open-detail', 'action'])
</script>

<template>
  <tr
    :class="['trow', {
      'trow-vip': person.vip,
      'trow-selected': selected,
    }]"
    @click="emit('open-detail', person)"
  >
    <td
      v-for="col in columns"
      :key="col.key"
      :class="['tcell', { sticky: col.sticky, 'sticky-last': col.key === 'actions', 'tcell-actions': col.key === 'actions', 'tcell-select': col.key === 'select' }]"
      :style="{
        width: col.sticky ? col.width + 'px' : (columnWidths[col.key] != null ? columnWidths[col.key] + 'px' : undefined),
        minWidth: col.sticky ? col.width + 'px' : (columnWidths[col.key] != null ? columnWidths[col.key] + 'px' : undefined),
        left: col.sticky ? col.stickyLeft + 'px' : undefined
      }"
      @click.stop="col.key === 'select' || col.key === 'actions' ? null : emit('open-detail', person)"
    >
      <!-- Checkbox -->
      <template v-if="col.key === 'select'">
        <input
          type="checkbox"
          :checked="selected"
          @click.stop
          @change.stop="emit('select', person.id)"
          class="row-checkbox"
        />
      </template>

      <!-- Actions -->
      <template v-else-if="col.key === 'actions'">
        <ActionMenu :person="person" @action="emit('action', $event)" />
      </template>

      <!-- Name -->
      <template v-else-if="col.key === 'naam'">
        <span class="naam-text">{{ person.naam }}</span>
      </template>

      <!-- Status -->
      <template v-else-if="col.key === 'status'">
        <StatusDot :status="person.status" />
      </template>

      <!-- Credential status -->
      <template v-else-if="col.key === 'credentialStatus'">
        <PassStatusDot :status="person.credentialStatus" />
      </template>

      <!-- Compliance -->
      <template v-else-if="col.key === 'compliance'">
        <ComplianceCell
          :dossier="person.dossier"
          :dossier-missing="person.dossierMissing"
          :elearning="person.elearning"
        />
      </template>

      <!-- VIP -->
      <template v-else-if="col.key === 'vip'">
        <div v-if="person.vip" class="vip-cell">
          <span class="mi vip-icon">star</span>
        </div>
      </template>

      <!-- Parkeren -->
      <template v-else-if="col.key === 'parkeren'">
        <span v-if="person.parkeren.plek" class="cell-truncate">{{ person.parkeren.plek }}</span>
        <span v-else-if="person.parkeren.gereserveerd" class="park-badge">Gereserveerd</span>
        <span v-else-if="person.parkeren.nodig" class="cell-park-none">Niet gereserveerd</span>
        <span v-else class="cell-dash">—</span>
      </template>

      <!-- Locaties -->
      <template v-else-if="col.key === 'locaties'">
        <div class="locaties-pills">
          <span
            v-for="loc in person.locaties.slice(0, 3)"
            :key="loc"
            class="loc-pill"
          >{{ loc }}</span>
          <Tooltip v-if="person.locaties.length > 3" :content="person.locaties.join(', ')">
            <span class="loc-pill loc-pill-overflow">+{{ person.locaties.length - 3 }}</span>
          </Tooltip>
        </div>
      </template>

      <!-- Default text -->
      <template v-else>
        <span class="cell-truncate">{{ person[col.key] ?? '—' }}</span>
      </template>
    </td>
  </tr>
</template>

<style scoped>
.trow {
  cursor: pointer;
  background: var(--p50);
  transition: background 0.1s;
}
.trow:hover { background: var(--p100); }
.trow-vip .tcell:first-child { border-left: 3px solid var(--vip-border); }

.tcell {
  padding: 12px 16px;
  height: 44px;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.14px;
  color: var(--p800);
  border-bottom: 1px solid var(--p100);
  white-space: nowrap;
  overflow: hidden;
  vertical-align: middle;
  background: inherit;
}

.sticky {
  position: sticky;
  z-index: 2;
  background: var(--p50);
}
.trow:hover .sticky { background: var(--p100); }

.tcell-actions { padding: 0; text-align: center; }
.tcell-select { padding: 0; text-align: center; }

.row-checkbox {
  appearance: none;
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  border: 1px solid var(--n800);
  border-radius: var(--r-s);
  background: var(--n0);
  cursor: pointer;
  display: block;
  margin: auto;
  position: relative;
  transition: background-color 0.1s, border-color 0.1s;
  flex-shrink: 0;
  outline: none;
}
.row-checkbox:hover:not(:checked) {
  border-color: var(--n1000);
}
.row-checkbox:checked {
  background-color: var(--p500);
  border-color: var(--p500);
}
.row-checkbox:hover:checked {
  background-color: var(--p600);
  border-color: var(--p600);
}
.row-checkbox:checked::after {
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
.row-checkbox:focus-visible {
  box-shadow: 0 0 0 8px var(--p50);
}

.cell-naam {
  display: flex;
  align-items: center;
  gap: var(--sp-xs);
}

.vip-cell {
  display: flex;
  justify-content: center;
}

.naam-text {
  font-size: 14px;
  font-weight: 600;
  color: var(--p800);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 140px;
  display: block;
}

.cell-dash { color: var(--n400); }
.vip-icon { color: var(--vip-border); font-size: 20px; font-weight: 400; }
.cell-muted { color: var(--n700); font-size: 12px; }
.cell-park-none { color: var(--n500); font-size: 14px; }

.cell-truncate {
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.park-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--sp-xs);
  font-size: 14px;
  color: var(--info);
}
.park-badge .mi { font-size: 14px; }

.locaties-pills {
  display: flex;
  flex-wrap: nowrap;
  gap: 4px;
  align-items: center;
}

.loc-pill {
  display: inline-flex;
  align-items: center;
  background: var(--p100);
  color: var(--p700);
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0.14px;
  border-radius: var(--r-xl);
  padding: var(--sp-xs) var(--sp-m);
  white-space: nowrap;
  flex-shrink: 0;
}

.loc-pill-overflow {
  background: var(--n0);
  color: var(--p500);
  cursor: default;
}
</style>
