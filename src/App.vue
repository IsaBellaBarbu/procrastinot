<script setup>
import { ref, computed } from 'vue';
import Login from "@/components/Login.vue";
import Register from "@/components/Register.vue";
import Pomodoro from "@/components/Pomodoro.vue";
import Homebase from "@/components/Homebase.vue";



const routes = {
  '/': Homebase,
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
//window.location.href = "/login"  zb bei button jmd wo hin senden
</script>


<template>
  <v-app>
    <v-main>
      <a href="#/">Homebase </a> |
      <a href="#/login">Log-In </a> |
      <a href="#/register">Register Here! </a>
      <component :is="currentView" />

    </v-main>
  </v-app>
</template>