<script setup>
import VerwachtePersonenView from '@/views/VerwachtePersonenView.vue'
import CredentialKoppelenView from '@/views/CredentialKoppelenView.vue'
import CredentialPrintenView from '@/views/CredentialPrintenView.vue'
import { useNavigationStore } from '@/stores/navigationStore'

const nav = useNavigationStore()
</script>

<template>
  <VerwachtePersonenView v-if="nav.currentPage === 'verwachte-personen'" />
  <CredentialKoppelenView v-else-if="nav.currentPage === 'credential-koppelen'" />
  <CredentialPrintenView v-else-if="nav.currentPage === 'credential-printen'" />
</template>

<style>
@import '@/assets/styles/_tokens.css';
@import '@/assets/styles/main.css';
</style>
