<template>
  <div class="homebase">
    <p>Welcome to Homebase!</p>
    <v-lazy :min-height="200" :options="{'threshold':0.5}" transition="fade-transition">
      <div class="content">
        <div class="blues">
          <v-lazy><Overview/></v-lazy>
          <v-lazy><GratitudeList/></v-lazy>
        </div>
        <div class="mixed">
          <v-lazy><Weather/></v-lazy>
          <v-lazy><MoodTracker/></v-lazy>
        </div>
      </div>
    </v-lazy>
  </div>
</template>

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

<style scoped>
.homebase p{
  text-align: center;
  font-family: monospace;
  font-size: 33px;
  color: white;
  padding:32px;
  font-weight: bold;

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
  flex-wrap: wrap;
  gap: 5%;
  padding: 32px;    /*Ksenias rec: nur 8-er bereich mit padding UI */
}

.mixed{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 5%;
  padding: 32px;
}
</style>
