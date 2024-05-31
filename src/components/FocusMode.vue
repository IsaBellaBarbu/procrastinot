<script>
import Pomodoro from "@/components/Pomodoro.vue";
import TodoList from "@/components/TodoList.vue";
//import JournalQuicknote from "@/components/JournalQuicknote.vue";

export default {
  components: {
    Pomodoro,
    TodoList
  }
};

</script>

<template>

  <div class="productivity">
    Here is an overview
  </div>

  <Pomodoro/>
  <TodoList/>
</template>

<style scoped>

</style>