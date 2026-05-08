<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import TableRow from './TableRow.vue'
import ColumnFilters from './ColumnFilters.vue'
import { useFilterStore } from '@/stores/filterStore'
import { useColumnStore } from '@/stores/columnStore'
import columnsConfig from '@/../columns.json'

const props = defineProps({
  data: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false },
  selectedIds: { type: Array, default: () => [] },
})
const emit = defineEmits(['row-click', 'sort', 'select', 'select-all', 'action'])

const filterStore = useFilterStore()
const columnStore = useColumnStore()
const columnWidths = ref({})

// Sticky shadow on scroll
const tableWrapRef = ref(null)
const tableScrollRef = ref(null)

function onTableScroll() {
  if (tableWrapRef.value) {
    tableWrapRef.value.dataset.scrolled = tableScrollRef.value.scrollLeft > 0 ? 'true' : 'false'
  }
}

onMounted(() => {
  tableScrollRef.value?.addEventListener('scroll', onTableScroll, { passive: true })
})
onUnmounted(() => {
  tableScrollRef.value?.removeEventListener('scroll', onTableScroll)
})

const visibleCols = computed(() => {
  const alwaysVisible = new Set(['select', 'actions'])
  const userVisible = new Set(columnStore.visibleColumns)
  return columnsConfig.filter(c => alwaysVisible.has(c.key) || userVisible.has(c.key))
})

// Resize logic
const resizing = ref(null)

function startResize(e, col) {
  e.preventDefault()
  const startX = e.clientX
  const th = e.currentTarget.parentElement
  const startW = th ? th.getBoundingClientRect().width : (columnWidths.value[col.key] ?? col.width)

  function onMove(e) {
    const diff = e.clientX - startX
    const newW = Math.max(50, startW + diff)
    columnWidths.value = { ...columnWidths.value, [col.key]: newW }
  }

  function onUp() {
    document.removeEventListener('mousemove', onMove)
    document.removeEventListener('mouseup', onUp)
  }

  document.addEventListener('mousemove', onMove)
  document.addEventListener('mouseup', onUp)
}

// All displayed row IDs (for select all)
const allIds = computed(() => props.data.map(p => p.id))
const allSelected = computed(() =>
  allIds.value.length > 0 && allIds.value.every(id => props.selectedIds.includes(id))
)
const someSelected = computed(() =>
  allIds.value.some(id => props.selectedIds.includes(id)) && !allSelected.value
)

function toggleAll() {
  if (allSelected.value) {
    emit('select-all', [])
  } else {
    emit('select-all', allIds.value)
  }
}

function isSelected(id) {
  return props.selectedIds.includes(id)
}

function setSort(col) {
  if (!col.sortable) return
  if (filterStore.sortKey === col.key) {
    filterStore.sortDir = filterStore.sortDir === 'asc' ? 'desc' : 'asc'
  } else {
    filterStore.sortKey = col.key
    filterStore.sortDir = 'asc'
  }
  emit('sort', { key: filterStore.sortKey, dir: filterStore.sortDir })
}

function colWidth(col) {
  if (col.sticky) return col.width + 'px'
  const w = columnWidths.value[col.key]
  return w != null ? w + 'px' : undefined
}
</script>

<template>
  <div class="table-wrap" ref="tableWrapRef">
    <div class="table-scroll" ref="tableScrollRef">
      <table class="data-table">
        <colgroup>
          <col
            v-for="col in visibleCols"
            :key="col.key"
            :style="colWidth(col) ? { width: colWidth(col), minWidth: colWidth(col) } : {}"
          />
        </colgroup>

        <!-- Header -->
        <thead>
          <tr class="thead-row">
            <th
              v-for="col in visibleCols"
              :key="col.key"
              :class="['th-cell', { sticky: col.sticky, 'sticky-last': col.key === 'actions', sortable: col.sortable, sorted: filterStore.sortKey === col.key, 'th-center': col.key === 'select' || col.key === 'actions' }]"
              :style="{
                width: colWidth(col) || undefined,
                minWidth: colWidth(col) || undefined,
                left: col.sticky ? col.stickyLeft + 'px' : undefined
              }"
              @click="setSort(col)"
            >
              <template v-if="col.key === 'select'">
                <input
                  type="checkbox"
                  class="header-checkbox"
                  :checked="allSelected"
                  :indeterminate="someSelected"
                  @change="toggleAll"
                  @click.stop
                />
              </template>
              <template v-else-if="col.key === 'actions'">
                <!-- empty -->
              </template>
              <template v-else>
                <div class="th-inner">
                  <span class="th-label">{{ col.label }}</span>
                  <template v-if="col.sortable">
                    <span v-if="filterStore.sortKey === col.key" class="mi sort-icon">{{
                      filterStore.sortDir === 'asc' ? 'arrow_drop_up' : 'arrow_drop_down'
                    }}</span>
                    <span v-else class="sort-icon-dual">
                      <span class="mi">arrow_drop_up</span>
                      <span class="mi">arrow_drop_down</span>
                    </span>
                  </template>
                </div>
              </template>

              <!-- Resize handle -->
              <span
                v-if="col.key !== 'select' && col.key !== 'actions'"
                class="resize-handle"
                @mousedown.stop="startResize($event, col)"
              ></span>
            </th>
          </tr>

          <!-- Column filters -->
          <ColumnFilters
            :columns="visibleCols"
            :column-widths="columnWidths"
            :model-value="filterStore.columnFilters"
            @update:model-value="val => { filterStore.columnFilters = val; filterStore.page = 1 }"
          />
        </thead>

        <!-- Body -->
        <tbody>
          <template v-if="loading">
            <tr>
              <td :colspan="visibleCols.length" class="loading-cell">
                <span class="mi spin">sync</span> Laden...
              </td>
            </tr>
          </template>
          <template v-else-if="data.length === 0">
            <tr>
              <td :colspan="visibleCols.length" class="empty-cell">
                <span class="mi">search_off</span>
                <span>Geen resultaten gevonden</span>
              </td>
            </tr>
          </template>
          <template v-else>
            <TableRow
              v-for="person in data"
              :key="person.id"
              :person="person"
              :selected="isSelected(person.id)"
              :columns="visibleCols"
              :column-widths="columnWidths"
              @select="emit('select', $event)"
              @open-detail="emit('row-click', $event)"
              @action="emit('action', $event)"
            />
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.table-wrap {
  background: var(--n0);
  overflow: hidden;
}

.table-scroll {
  overflow-x: auto;
  overflow-y: visible;
}

.data-table {
  min-width: 100%;
  width: max-content;
  border-collapse: separate;
  border-spacing: 0;
  table-layout: auto;
}

/* Header */
.thead-row { background: var(--n50); }

.th-cell {
  padding: 8px 16px;
  height: 40px;
  text-align: left;
  font-size: 14px;
  font-weight: 600;
  color: var(--p700);
  letter-spacing: 0.14px;
  border-bottom: 1px solid var(--n300);
  border-right: 1px solid var(--n300);
  white-space: nowrap;
  vertical-align: middle;
  user-select: none;
  position: relative;
  background: var(--n50);
}

.th-cell.sticky {
  position: sticky;
  z-index: 4;
  background: var(--n50);
}

.th-cell.sortable { cursor: pointer; }
.th-cell.sortable:hover { background: var(--n100); }
.th-cell.sorted { color: var(--p700); }

.th-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-width: 0;
}

.th-label { flex: 1; min-width: 0; }

.sort-icon {
  font-size: 16px;
  color: var(--n400);
  flex-shrink: 0;
  line-height: 1;
  width: 16px;
  text-align: center;
}
.sort-icon-dual {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  align-items: center;
  color: var(--n400);
  width: 16px;
}
.sort-icon-dual .mi {
  font-size: 16px;
  line-height: 0.6;
  display: block;
}
.sorted .sort-icon { color: var(--p700); }

/* Sticky shadow when scrolled */
.table-wrap[data-scrolled="true"] :deep(.sticky-last) {
  box-shadow: 4px 0 4px -2px rgba(17, 19, 19, 0.08);
}

.resize-handle {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 6px;
  cursor: col-resize;
  z-index: 5;
}
.resize-handle::after {
  content: '';
  position: absolute;
  right: 2px;
  top: 20%;
  bottom: 20%;
  width: 2px;
  background: var(--n300);
  border-radius: 2px;
  opacity: 0;
  transition: opacity 0.15s;
}
.th-cell:hover .resize-handle::after { opacity: 1; }

.header-checkbox {
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
.header-checkbox:hover:not(:checked):not(:indeterminate) {
  border-color: var(--n1000);
}
.header-checkbox:checked,
.header-checkbox:indeterminate {
  background-color: var(--p500);
  border-color: var(--p500);
}
.header-checkbox:hover:checked,
.header-checkbox:hover:indeterminate {
  background-color: var(--p600);
  border-color: var(--p600);
}
.header-checkbox:checked::after {
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
.header-checkbox:indeterminate::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  width: 10px;
  height: 2px;
  background: white;
  transform: translate(-50%, -50%);
}
.header-checkbox:focus-visible {
  box-shadow: 0 0 0 8px var(--p50);
}

.th-center {
  padding: 0;
  text-align: center;
}

/* Empty / loading states */
.loading-cell, .empty-cell {
  text-align: center;
  padding: 48px 24px;
  color: var(--n700);
  font-size: 14px;
}
.loading-cell { display: flex; align-items: center; justify-content: center; gap: 8px; }
.empty-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
.empty-cell .mi { font-size: 32px; color: var(--n400); }

@keyframes spin {
  to { transform: rotate(360deg); }
}
.spin { animation: spin 1s linear infinite; }
</style>
