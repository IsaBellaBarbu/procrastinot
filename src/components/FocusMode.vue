<script>
import Pomodoro from "@/components/Pomodoro.vue";
import TodoList from "@/components/TodoList.vue";
import JournalQuicknote from "@/components/JournalQuicknote.vue";

export default {
  components: {
    Pomodoro,
    TodoList,
    JournalQuicknote


  }
};

</script>

<template>

  <div class="productivity">
    <p>Now, Let's Focus ... </p>
    <div class="content">
      <Pomodoro/>
      <TodoList/>
      <JournalQuicknote/>
    </div>
  </div>

</template>

<style scoped>
.productivity{
  display: flex;
  text-align: center;
  flex-direction: column;
}

.content{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    text-align: center;
    background-color: #84cead;
}

p {
  padding: 40px;
  font-size: 20px;
  background-color: #6f00ff;
}


</style>