<script>
import smile from '@/assets/images/smile.png'
import okay from '@/assets/images/okay.png'
import neutral from '@/assets/images/neutral.png'
import sad from '@/assets/images/sad.png'
import angry from '@/assets/images/angry.png'
export default {

  data() {
    return {
      mood: '',
      emotions: [
        { name: 'Happy', image: smile },
        { name: 'Okay', image: okay },
        { name: 'Neutral', image: neutral },
        { name: 'Sad', image: sad },
        { name: 'Angry', image: angry }
      ]
    };
  },
  methods: {
    setMood(emotion) {
      this.mood = emotion;
    }
  }
}
</script>

<template>
  <div class="mood-tracker">
    <label for="moodInput">Track Mood:</label>
    <div class="mood-buttons">
      <button v-for="(emotion, index) in emotions" :key="index" @click="setMood(emotion.image)" :class="{ active: mood === emotion.image }">
        <img :src="emotion.image" alt="Mood">
      </button>
    </div>
  </div>
</template>



<style scoped>
.mood-tracker {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid #132e24;
}

.mood-buttons {
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
}

button {
  width: 60px; /* Adjust width to fit your images */
  height: 60px; /* Adjust height to fit your images */
  border-radius: 50%;
  border: none;
  cursor: pointer;
  background-color: transparent;
  padding: 0;
}

button img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

button.active {
  border: 2px solid #333;
}
</style>