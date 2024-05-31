<script setup>
import { ref, computed } from 'vue';
import Login from "@/components/Login.vue";
import Register from "@/components/Register.vue";
import Homebase from "@/components/Homebase.vue";
import Dashboard from "@/components/Dashboard.vue";
import Journal from "@/components/Journal.vue";
import FocusMode from "@/components/FocusMode.vue";



const routes = {
  '/': Homebase,
  '/login': Login,
  '/register': Register,
  '/journal': Journal,
  '/focus-mode': FocusMode
}


const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || NotFound
})
//window.location.href = "/login"  zb bei button jmd wo hin senden




</script>


<template>
  <v-app>
    <v-main>
      <a href="#/">Homebase </a> |
      <a href="#/login">Log-In </a> |
      <a href="#/register">Register Here! </a> |
      <a href="#/journal">Journal here you bitch </a> |
      <a href="#/focus-mode">Focus Mode</a>
      <component :is="currentView" />

    </v-main>
  </v-app>
</template>