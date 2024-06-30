<script>
import MoodDiagram from "@/components/MoodDiagram.vue";
import ListGratefulEntries from "@/components/ListGratefulEntries.vue";

export default {
  components: {
    MoodDiagram,
    ListGratefulEntries,
  }

}
</script>

<template>
  <div class="stats">
    <div  class="content glass">

      <ListGratefulEntries/>
    </div>

  </div>
</template>

<style scoped>

</style>