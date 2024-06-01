<script>
import MoodTracker from "@/components/MoodTracker.vue";
import Overview from "@/components/Overview.vue";
import Weather from "@/components/Weather.vue";
import GratitudeList from "@/components/GratitudeList.vue";



export default {
  components: {
    MoodTracker,
    Overview,
    Weather,
    GratitudeList,

  }
};
</script>

<template>
  <div class="homebase">
    <p>Welcome to Homebase!</p>
    <div class="content">
      <div class="blues">
        <Overview/>
        <GratitudeList/>
      </div>
      <div class="mixed">
        <Weather/>
        <MoodTracker/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.homebase p{
  text-align: center;
  font-family: monospace;
  font-size: 33px;
}

.content {
  display: inline-block;
  flex-direction: column;
  align-items: center;
  width: 100%;
  transition: margin-left 0.3s ease;
}

.blues{
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(203, 57, 57, 0.1);
  flex-wrap: wrap;
  gap: 5%;

}

.mixed{
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(201, 182, 246);
  flex-wrap: wrap;
  gap: 5%;
}


</style>