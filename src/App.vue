<script setup>
import { computed } from 'vue'
import { useNavigationStore } from '@/stores/navigationStore'
import VerwachtePersonenView from '@/views/VerwachtePersonenView.vue'
import DossierView from '@/views/DossierView.vue'

const nav = useNavigationStore()
</script>

<template>
  <VerwachtePersonenView  v-if="nav.currentPage === 'verwachte-personen'" />
  <DossierView            v-else-if="nav.currentPage === 'dossier'" />
</template>

<style>
@import '@/assets/styles/_tokens.css';
@import '@/assets/styles/main.css';
</style>
