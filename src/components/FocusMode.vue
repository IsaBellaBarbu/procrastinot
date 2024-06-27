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
      <div class="left-column">
        <Pomodoro/>
        <TodoList/>
      </div>
      <div class="right-column">
        <JournalQuicknote/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.productivity {
  display: flex;
  flex-direction: column;
  text-align: center;
  padding-top: 64px;
}

.content {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  gap: 1%;
}

.left-column, .right-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
}

.left-column {
  gap: 10%; /* Adjust gap as needed */
}

p {
  padding: 40px;
  font-size: 33px;
  color: white;
  font-weight: bold;
}

@media (max-width: 768px) {
  .content {
    flex-direction: column;
    align-items: center;
  }

  .left-column, .right-column {
    width: 100%;
    margin-bottom: 20px;
  }
}
</style>
