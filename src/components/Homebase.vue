<script>
import Pomodoro from '@/components/Pomodoro.vue';
import MoodTracker from "@/components/MoodTracker.vue";
import Overview from "@/components/Overview.vue";

export default {
  components: {
    Pomodoro,
    MoodTracker,
    Overview
  }
};
</script>

<template>
  <div class="homebase">
    <p>Welcome to Homebase!</p>
    <Pomodoro/>
    <MoodTracker/>
    <Overview/>
  </div>
</template>

<style scoped>

</style>