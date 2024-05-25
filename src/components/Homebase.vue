<script>
import Pomodoro from '@/components/Pomodoro.vue';
import MoodTracker from "@/components/MoodTracker.vue";
import Overview from "@/components/Overview.vue";
import Calender from "@/components/Calender.vue";

export default {
  components: {
    Pomodoro,
    MoodTracker,
    Overview,
    Calender
  }
};
</script>

<template>
  <div class="homebase">
    <p>Welcome to Homebase!</p>
    <Pomodoro/>
    <MoodTracker/>
    <Overview/>
    <Calender/>
  </div>
</template>

<style scoped>

</style>