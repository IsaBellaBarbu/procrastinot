<script>
import Pomodoro from '@/components/Pomodoro.vue';
import MoodTracker from "@/components/MoodTracker.vue";
import Overview from "@/components/Overview.vue";
import Calender from "@/components/Calender.vue";
import Weather from "@/components/Weather.vue";
import TodoList from "@/components/TodoList.vue";


export default {
  components: {
    Pomodoro,
    MoodTracker,
    Overview,
    //Calender,
    //Weather,
    TodoList,



  }
};
</script>

<template>
  <div class="homebase">
    <p>Welcome to Homebase!</p>
    <Pomodoro/>
    <MoodTracker/>

    <Overview/>
    <TodoList/>

  </div>
</template>

<style scoped>

</style>