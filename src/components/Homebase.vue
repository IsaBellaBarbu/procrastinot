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
          <v-lazy><MoodTracker/></v-lazy>
          <v-lazy><FollowForFollow/></v-lazy>
        </div>
        <v-lazy><Weather/></v-lazy>
      </div>
    </v-lazy>
  </div>
</template>

<script>
import MoodTracker from "@/components/MoodTracker.vue";
import Overview from "@/components/Overview.vue";
import Weather from "@/components/Weather.vue";
import GratitudeList from "@/components/GratitudeList.vue";
import FollowForFollow from "@/components/FollowForFollow.vue";

export default {
  components: {
    MoodTracker,
    Overview,
    Weather,
    GratitudeList,
    FollowForFollow
  }
};
</script>

<style scoped>
.homebase p{
  text-align: center;
  font-size: 33px;
  color: white;
  padding:50px;
  font-weight: bold;

}

.content {
  display: inline-block;
  flex-direction: column;
  align-items: center;
  width: 100%;
  transition: margin-left 0.3s ease;
  color: white;
}

.blues{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10%;
  padding: 32px;    /*Ksenias rec: only 8-er with padding for UI */
}

.mixed{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  padding: 32px;
  column-gap: 17%;
}
</style>


