<script setup>
import StatusBadge from '@/components/ui/StatusBadge.vue'
import PassStatusDot from '@/components/ui/PassStatusDot.vue'
import ComplianceCell from '@/components/ui/ComplianceCell.vue'
import ActionMenu from '@/components/actions/ActionMenu.vue'

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
      :class="['tcell', { sticky: col.sticky, 'tcell-actions': col.key === 'actions', 'tcell-select': col.key === 'select' }]"
      :style="{
        width: (columnWidths[col.key] || col.width) + 'px',
        minWidth: (columnWidths[col.key] || col.width) + 'px',
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
        <button class="naam-btn" @click.stop="emit('open-detail', person)">
          {{ person.naam }}
        </button>
      </template>

      <!-- Status -->
      <template v-else-if="col.key === 'status'">
        <StatusBadge :status="person.status" />
      </template>

      <!-- Passtatus -->
      <template v-else-if="col.key === 'passtatus'">
        <PassStatusDot :passtatus="person.passtatus" />
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
        <span v-if="person.vip" class="mi vip-star">star</span>
        <span v-else class="cell-dash">—</span>
      </template>

      <!-- Parkeren -->
      <template v-else-if="col.key === 'parkeren'">
        <span v-if="person.parkeren.plek" class="cell-truncate">{{ person.parkeren.plek }}</span>
        <span v-else-if="person.parkeren.gereserveerd" class="park-badge">Gereserveerd</span>
        <span v-else-if="person.parkeren.nodig" class="cell-muted">Niet gereserveerd</span>
        <span v-else class="cell-muted">Niet gereserveerd</span>
      </template>

      <!-- Locaties -->
      <template v-else-if="col.key === 'locaties'">
        <span
          class="cell-truncate"
          :data-tip="person.locaties.length > 1 ? person.locaties.join(', ') : undefined"
        >{{ person.locaties.join(', ') }}</span>
      </template>

      <!-- Contractortype -->
      <template v-else-if="col.key === 'contractortype'">
        <span v-if="person.contractortype">{{ person.contractortype }}</span>
        <span v-else class="cell-dash">—</span>
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
  transition: background 0.1s;
}
.trow:hover { background: var(--p50); }
.trow-selected { background: #e2eff4; }
.trow-selected:hover { background: #d4e8f0; }
.trow-vip { border-left: 3px solid var(--vip-border); }

.tcell {
  padding: 8px 8px 8px 16px;
  font-size: 14px;
  font-weight: 400;
  color: var(--n900);
  border-bottom: 1px solid var(--n300);
  border-right: 1px solid var(--n300);
  white-space: nowrap;
  vertical-align: middle;
  background: inherit;
}

.sticky {
  position: sticky;
  z-index: 2;
  background: var(--n0);
}
.trow:hover .sticky { background: var(--p50); }
.trow-selected .sticky { background: #e2eff4; }
.trow-selected:hover .sticky { background: #d4e8f0; }

.tcell-actions { padding: 0; text-align: center; }
.tcell-select { padding: 0; text-align: center; }

.row-checkbox {
  width: 16px;
  height: 16px;
  accent-color: var(--p500);
  cursor: pointer;
  display: block;
  margin: auto;
}

.cell-naam {
  display: flex;
  align-items: center;
  gap: var(--sp-xs);
}

.vip-star {
  font-size: 14px;
  color: var(--vip-border);
  flex-shrink: 0;
}

.naam-btn {
  background: none;
  border: none;
  font-family: var(--font);
  font-size: 14px;
  font-weight: 600;
  color: var(--p700);
  cursor: pointer;
  padding: 0;
  text-align: left;
  text-decoration: none;
  transition: color 0.15s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 140px;
}
.naam-btn:hover { color: var(--p500); text-decoration: underline; }

.cell-dash { color: var(--n400); }
.cell-muted { color: var(--n700); font-size: 12px; }

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
  font-size: 12px;
  color: var(--info);
}
.park-badge .mi { font-size: 14px; }
</style>
