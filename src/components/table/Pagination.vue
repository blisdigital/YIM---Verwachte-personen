<script setup>
import { computed } from 'vue'

const props = defineProps({
  total: { type: Number, default: 0 },
  page: { type: Number, default: 1 },
  pageSize: { type: Number, default: 10 },
  pageSizeOptions: { type: Array, default: () => [10, 25, 50, 100] },
})
const emit = defineEmits(['update:page', 'update:page-size'])

const totalPages = computed(() => Math.max(1, Math.ceil(props.total / props.pageSize)))
const rangeStart = computed(() => props.total === 0 ? 0 : (props.page - 1) * props.pageSize + 1)
const rangeEnd = computed(() => Math.min(props.page * props.pageSize, props.total))

const pages = computed(() => {
  const total = totalPages.value
  const current = props.page
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)

  const pages = []
  if (current <= 4) {
    pages.push(1, 2, 3, 4, 5, '...', total)
  } else if (current >= total - 3) {
    pages.push(1, '...', total - 4, total - 3, total - 2, total - 1, total)
  } else {
    pages.push(1, '...', current - 1, current, current + 1, '...', total)
  }
  return pages
})

function goTo(p) {
  if (typeof p !== 'number') return
  if (p < 1 || p > totalPages.value) return
  emit('update:page', p)
}

function changeSize(e) {
  emit('update:page-size', Number(e.target.value))
  emit('update:page', 1)
}
</script>

<template>
  <div class="pagination">
    <div class="page-left">
      <select class="page-size-select" :value="pageSize" @change="changeSize">
        <option v-for="s in pageSizeOptions" :key="s" :value="s">{{ s }}</option>
      </select>
      <span class="page-info">resultaten per pagina | {{ rangeStart }}-{{ rangeEnd }} van {{ total }}</span>
    </div>

    <div class="page-btns">
      <button
        class="page-btn"
        :disabled="page <= 1"
        @click="goTo(1)"
        aria-label="Eerste pagina"
      >
        <span class="mi">first_page</span>
      </button>
      <button
        class="page-btn"
        :disabled="page <= 1"
        @click="goTo(page - 1)"
        aria-label="Vorige pagina"
      >
        <span class="mi">chevron_left</span>
      </button>

      <template v-for="p in pages" :key="p">
        <span v-if="p === '...'" class="page-ellipsis">…</span>
        <button
          v-else
          :class="['page-btn', 'page-num', { active: p === page }]"
          @click="goTo(p)"
        >{{ p }}</button>
      </template>

      <button
        class="page-btn"
        :disabled="page >= totalPages"
        @click="goTo(page + 1)"
        aria-label="Volgende pagina"
      >
        <span class="mi">chevron_right</span>
      </button>
      <button
        class="page-btn"
        :disabled="page >= totalPages"
        @click="goTo(totalPages)"
        aria-label="Laatste pagina"
      >
        <span class="mi">last_page</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background: var(--n0);
}

.page-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.page-size-select {
  padding: 8px;
  border: 1px solid var(--n400);
  border-radius: var(--r-s);
  font-family: var(--font);
  font-size: 14px;
  font-weight: 600;
  color: var(--n900);
  background: var(--n0);
  cursor: pointer;
  outline: none;
}
.page-size-select:focus { border-color: var(--p500); }

.page-info {
  font-size: 14px;
  font-weight: 400;
  color: var(--n800);
  letter-spacing: 0.14px;
}

.page-btns {
  display: flex;
  align-items: center;
  gap: 8px;
}

.page-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  height: 40px;
  padding: 8px 12px;
  border: 1px solid var(--n400);
  border-radius: var(--r-s);
  background: var(--n0);
  font-family: var(--font);
  font-size: 14px;
  font-weight: 600;
  color: var(--n800);
  cursor: pointer;
  transition: all 0.15s;
}
.page-btn:hover:not(:disabled) { background: var(--n50); border-color: var(--p500); }
.page-btn:disabled { border-color: var(--n300); opacity: 0.4; cursor: not-allowed; }
.page-btn.active { background: var(--p700); border-color: var(--p700); color: var(--n0); }

.page-ellipsis {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  font-size: 14px;
  color: var(--n500);
}
</style>
