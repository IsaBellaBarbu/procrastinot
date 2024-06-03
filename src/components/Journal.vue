<script>
import JournalTemplate from "@/components/JournalTemplate.vue";
import JournalQuicknote from "@/components/JournalQuicknote.vue";

export default {
  components: {
    JournalTemplate



  }}
</script>

<template>
  <div class="journal">
    <p>Welcome to Your Safe Space!</p>
      <div class="content">
        <JournalTemplate/>
      </div>

    </div>
</template>

<style scoped>
.journal{
  background-color: #c74e4e;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 800px;
  border: #1b4033;
  border-radius: 20px;
}

.content{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  transition: margin-left 0.3s ease;
}

.journal p{
  text-align: center;
  flex-wrap: wrap;
  font-family: monospace;
  font-size: 20px;
  color: #151567;
  padding: 20px;

}
</style>