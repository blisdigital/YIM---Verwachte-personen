<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  total: { type: Number, default: 0 },
  page: { type: Number, default: 1 },
  pageSize: { type: Number, default: 10 },
  pageSizeOptions: { type: Array, default: () => [10, 20, 30, 50] },
})
const emit = defineEmits(['update:page', 'update:page-size'])

const totalPages = computed(() => Math.max(1, Math.ceil(props.total / props.pageSize)))
const rangeStart = computed(() => props.total === 0 ? 0 : (props.page - 1) * props.pageSize + 1)
const rangeEnd = computed(() => Math.min(props.page * props.pageSize, props.total))

const pages = computed(() => {
  const total = totalPages.value
  const current = props.page
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)

  const result = []
  if (current <= 4) {
    result.push(1, 2, 3, 4, 5, '...', total)
  } else if (current >= total - 3) {
    result.push(1, '...', total - 4, total - 3, total - 2, total - 1, total)
  } else {
    result.push(1, '...', current - 1, current, current + 1, '...', total)
  }
  return result
})

function goTo(p) {
  if (typeof p !== 'number') return
  if (p < 1 || p > totalPages.value) return
  emit('update:page', p)
}

// Per-page dropdown
const dropdownOpen = ref(false)
const dropdownRef = ref(null)
const triggerRef = ref(null)
const menuStyle = ref({})

function openDropdown() {
  dropdownOpen.value = true
  setTimeout(() => {
    if (!dropdownRef.value || !triggerRef.value) return
    const rect = triggerRef.value.getBoundingClientRect()
    const menuHeight = dropdownRef.value.offsetHeight
    menuStyle.value = {
      position: 'fixed',
      top: `${rect.top - menuHeight - 4}px`,
      left: `${rect.left}px`,
      zIndex: 400,
    }
  }, 0)
}

function toggleDropdown() {
  if (dropdownOpen.value) {
    dropdownOpen.value = false
  } else {
    openDropdown()
  }
}

function selectSize(s) {
  dropdownOpen.value = false
  emit('update:page-size', s)
  emit('update:page', 1)
}

function onClickAway(e) {
  if (!dropdownOpen.value) return
  if (!dropdownRef.value?.contains(e.target) && !triggerRef.value?.contains(e.target)) {
    dropdownOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', onClickAway))
onUnmounted(() => document.removeEventListener('click', onClickAway))
</script>

<template>
  <div class="pagination">
    <div class="page-left">
      <div class="page-btns">
        <button
          class="page-btn page-btn--nav"
          :class="{ 'page-btn--disabled': page <= 1 }"
          :disabled="page <= 1"
          @click="goTo(1)"
          aria-label="Eerste pagina"
        >
          <span class="mi">first_page</span>
        </button>
        <button
          class="page-btn page-btn--nav"
          :class="{ 'page-btn--disabled': page <= 1 }"
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
          class="page-btn page-btn--nav"
          :class="{ 'page-btn--disabled': page >= totalPages }"
          :disabled="page >= totalPages"
          @click="goTo(page + 1)"
          aria-label="Volgende pagina"
        >
          <span class="mi">chevron_right</span>
        </button>
        <button
          class="page-btn page-btn--nav"
          :class="{ 'page-btn--disabled': page >= totalPages }"
          :disabled="page >= totalPages"
          @click="goTo(totalPages)"
          aria-label="Laatste pagina"
        >
          <span class="mi">last_page</span>
        </button>
      </div>

      <!-- Custom per-page dropdown -->
      <div class="page-size" :class="{ 'page-size--open': dropdownOpen }">
        <button
          ref="triggerRef"
          class="page-size__trigger"
          :aria-expanded="dropdownOpen"
          @click="toggleDropdown"
          type="button"
        >
          <span class="page-size__label">{{ pageSize }}</span>
          <span class="page-size__icon">
            <span class="mi">arrow_drop_down</span>
          </span>
        </button>

        <Teleport to="body">
          <div v-if="dropdownOpen" ref="dropdownRef" class="page-size__menu" :style="menuStyle">
            <button
              v-for="s in pageSizeOptions"
              :key="s"
              class="page-size__option"
              :class="{ 'page-size__option--active': s === pageSize }"
              @click="selectSize(s)"
            >{{ s }}</button>
          </div>
        </Teleport>
      </div>
    </div>

    <span class="page-info">{{ rangeStart }}-{{ rangeEnd }} van {{ total }} items</span>
  </div>
</template>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--sp-xl) var(--sp-l) var(--sp-l);
  background: var(--n0);
  box-sizing: border-box;
}

/* ── Left group ── */
.page-left {
  display: flex;
  align-items: center;
  gap: var(--sp-l);
}

/* ── Page buttons group ── */
.page-btns {
  display: flex;
  align-items: center;
  gap: var(--sp-s);
}

.page-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: var(--sp-s) var(--sp-m);
  border: none;
  border-radius: var(--r-xl);
  background: var(--p50);
  font: 600 14px/20px var(--font);
  letter-spacing: 0.14px;
  color: var(--p700);
  cursor: pointer;
  transition: background 0.15s;
  box-sizing: border-box;
}
.page-btn .mi { font-family: 'Material Icons Round'; font-weight: 400; font-size: 24px; color: var(--n800); }
.page-btn:hover:not(:disabled) { background: var(--p100, #d9edf0); }
.page-btn.active { background: var(--p500); color: var(--n0); }
.page-btn.active .mi { color: var(--n0); }

.page-btn--nav { background: var(--p50); }
.page-btn--nav.page-btn--disabled { background: var(--n50); cursor: default; }
.page-btn--nav.page-btn--disabled .mi { color: var(--n400); }

.page-ellipsis {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  font: 600 14px/20px var(--font);
  letter-spacing: 0.14px;
  color: var(--p700);
  background: var(--p50);
  border-radius: var(--r-xl);
}

/* ── Per-page dropdown ── */
.page-size {
  position: relative;
}

.page-size__trigger {
  display: inline-flex;
  align-items: center;
  height: 40px;
  background: var(--n0);
  border: 1px solid var(--n400);
  border-radius: var(--r-s);
  overflow: hidden;
  box-sizing: border-box;
  cursor: pointer;
  padding: 0;
}
.page-size__trigger:hover { border-color: var(--n800); }
.page-size--open .page-size__trigger { border: 2px solid var(--p500); }

.page-size__label {
  width: 48px;
  padding: var(--sp-s);
  font: 400 14px/20px var(--font);
  color: var(--n900);
  text-align: center;
}

.page-size__icon {
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  border-left: 1px solid var(--n400);
  background: var(--n0);
  flex-shrink: 0;
}
.page-size__icon .mi {
  font-family: 'Material Icons Round';
  font-weight: 400;
  font-size: 24px;
  color: var(--n800);
}

/* ── Counter text ── */
.page-info {
  font: 600 14px/20px var(--font);
  letter-spacing: 0.14px;
  color: var(--n800);
}
</style>

<style>
/* Teleported menu — buiten scoped scope */
.page-size__menu {
  background: var(--n0);
  border-radius: var(--r-s);
  box-shadow: var(--shadow-m);
  min-width: 88px;
  overflow: hidden;
  padding: 16px 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.page-size__option {
  display: block;
  width: 100%;
  padding: 4px 16px;
  background: none;
  border: none;
  font-family: Nunito, var(--font), sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: var(--p700);
  cursor: pointer;
  text-align: left;
  line-height: 24px;
  letter-spacing: 0.16px;
  height: 32px;
}
.page-size__option:hover { background: var(--n50); }
.page-size__option--active { color: var(--p500); }
</style>
