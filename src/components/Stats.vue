<script>
import MoodDiagram from "@/components/MoodDiagram.vue";

export default {
  components: {
    MoodDiagram
  }

}
</script>

<template>
  <div class="stats">
    <div  class="content glass">

      <MoodDiagram/>
    </div>

  </div>
</template>

<style scoped>
.content{
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e9b800;
}
</style>