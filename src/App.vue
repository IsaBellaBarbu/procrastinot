<script setup>
import { ref, computed } from 'vue';
import Login from "@/components/Login.vue";
import Register from "@/components/Register.vue";
import Homebase from "@/components/Homebase.vue";
import Dashboard from "@/components/Dashboard.vue";
import Journal from "@/components/Journal.vue";
import FocusMode from "@/components/FocusMode.vue";
import Stats from "@/components/Stats.vue";
import procrastinot5 from '@/assets/images/procrastinot5.jpg';

const routes = {
  '/': Homebase,
  '/focus-mode': FocusMode,
  '/journal': Journal,
  '/stats': Stats,
  '/login': Login,
  '/register': Register,
}

const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || NotFound
})
</script>

<template>
  <v-app>
    <v-main>
      <Dashboard/>
      <component :is="currentView" />
      <v-footer>2024 -- Isa Barbu </v-footer>
    </v-main>
  </v-app>
</template>

<style>
body {
  font-family: monospace;
  background-image: url('@/assets/images/procrastinot5.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  scroll-behavior: smooth;
}

html, body {
  height: 100%;
  overflow: auto;
}

v-app, v-main {
  background: transparent;
  min-height: 100vh;
}

v-main {
  padding-bottom: 50px; /* Ensure footer is not overlapped */
}
</style>
