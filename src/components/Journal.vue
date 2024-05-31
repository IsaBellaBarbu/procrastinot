<script>
import JournalCategory from "@/components/JournalCategory.vue";

export default {
  components: {
    JournalCategory



  }}
</script>

<template>
  <div class="journal">
    <p>Welcome to Your Safe Space!</p>
      <JournalCategory/>

    </div>
</template>

<style scoped>
.journal{
  background-color: #c74e4e;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 200px;
  border: #1b4033;
  border-radius: 20px;
}

.journal p{
  margin-top: 80px;
}
</style>