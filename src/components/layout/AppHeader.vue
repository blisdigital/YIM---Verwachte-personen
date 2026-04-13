<script setup>
import { ref } from 'vue'
import logoSvg from '@/assets/logo.svg'

const drawerOpen = ref(false)

const drawerItems = [
  { label: 'Accreditaties', hasDropdown: true, active: false },
  { label: 'Aanmeldingen', hasDropdown: false, active: false },
  { label: 'Verwachte personen', hasDropdown: false, active: true },
  { label: 'Aanwezigheidsregistratie', hasDropdown: false, active: false },
  { label: 'Personen', hasDropdown: true, active: false },
  { label: 'Credentials', hasDropdown: true, active: false },
  { label: 'Rapporten', hasDropdown: false, active: false },
  { label: 'Beheer', hasDropdown: false, active: false },
]
</script>

<template>
  <!-- Header — highest z-index, sits on top of sidebar -->
  <header class="app-header">
    <div class="header-brand">
      <button
        class="hamburger"
        :class="{ active: drawerOpen }"
        @click="drawerOpen = !drawerOpen"
        aria-label="Menu openen"
      >
        <span class="mi">dehaze</span>
      </button>
      <img :src="logoSvg" alt="YiM" class="logo" />
    </div>

    <div class="header-util">
      <div class="util-item">
        <span class="avatar">KO</span>
        <span class="util-label">Kim van Olderen</span>
        <span class="mi util-caret">expand_more</span>
      </div>
      <div class="util-item">
        <span class="util-label">NL</span>
        <span class="mi util-caret">expand_more</span>
      </div>
    </div>
  </header>

  <!-- Sidebar — slides in from left, no overlay -->
  <Transition name="sidebar">
    <aside v-if="drawerOpen" class="nav-sidebar">
      <nav class="sidebar-nav">
        <a
          v-for="item in drawerItems"
          :key="item.label"
          href="#"
          :class="['sidebar-link', { active: item.active }]"
          @click.prevent="drawerOpen = false"
        >
          <span>{{ item.label }}</span>
          <span v-if="item.hasDropdown" class="mi sidebar-caret">expand_more</span>
        </a>
      </nav>
    </aside>
  </Transition>

  <!-- Invisible click-outside capture -->
  <div v-if="drawerOpen" class="sidebar-dismiss" @click="drawerOpen = false" />
</template>

<style scoped>
/* ── Header ── */
.app-header {
  height: 64px;
  background: var(--n0);
  border-bottom: 1px solid var(--n100);
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 200;
}

.header-brand {
  display: flex;
  align-items: center;
  gap: var(--sp-s);
  padding: 0 var(--sp-m);
  flex-shrink: 0;
}

.hamburger {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--r-s);
  border: none;
  background: transparent;
  cursor: pointer;
  color: var(--n700);
  flex-shrink: 0;
}
.hamburger:hover,
.hamburger.active { background: var(--n100); }
.hamburger .mi { font-size: 22px; }

.logo {
  height: 32px;
  width: auto;
}

/* ── Utility ── */
.header-util {
  display: flex;
  align-items: center;
  height: 100%;
  margin-left: auto;
  flex-shrink: 0;
}

.util-item {
  display: flex;
  align-items: center;
  gap: var(--sp-s);
  padding: 0 var(--sp-m);
  height: 100%;
  font-size: 14px;
  font-weight: 600;
  color: var(--n800);
  cursor: pointer;
  border-left: 1px solid var(--n100);
  transition: background 0.15s;
  letter-spacing: 0.16px;
  white-space: nowrap;
}
.util-item:hover { background: var(--n50); }

.avatar {
  width: 32px;
  height: 32px;
  border-radius: var(--r-xl);
  background: var(--n300);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 600;
  color: var(--n800);
  flex-shrink: 0;
  letter-spacing: 0.12px;
}

.util-caret {
  font-size: 18px;
  color: var(--n500);
}

/* ── Sidebar ── */
.nav-sidebar {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 272px;
  background: var(--p700);
  z-index: 150;
  padding-top: 80px; /* clears the 64px header + small gap */
  box-shadow: 2px 0 16px rgba(0, 0, 0, 0.15);
}

.sidebar-nav {
  padding: var(--sp-m) var(--sp-m);
}

.sidebar-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--sp-s) var(--sp-l);
  font-size: 16px;
  font-weight: 600;
  color: var(--p100);
  text-decoration: none;
  border-radius: var(--r-s);
  transition: background 0.1s;
  letter-spacing: 0.16px;
  line-height: 24px;
}
.sidebar-link:hover { background: rgba(255, 255, 255, 0.08); }
.sidebar-link.active {
  background: var(--p600);
  color: var(--n0);
}

.sidebar-caret {
  font-size: 20px;
  opacity: 0.6;
}

/* Transparent dismiss layer — captures clicks outside the sidebar */
.sidebar-dismiss {
  position: fixed;
  inset: 0;
  z-index: 140;
}

/* ── Transitions ── */
.sidebar-enter-active,
.sidebar-leave-active {
  transition: transform 0.25s ease;
}
.sidebar-enter-from,
.sidebar-leave-to {
  transform: translateX(-100%);
}
</style>
