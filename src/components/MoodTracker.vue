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
    <div class="mood-buttons glass">
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
  justify-content: center;
  background: linear-gradient(135deg, #a0f8a6, rgba(35, 131, 28, 0.34));
  border-radius: 10px;
}

.mood-buttons {
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 1rem;
  width: 100%;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
}

.mood-tracker label{
  display: flex;
  font-family: monospace;
  color: #000000;
  text-align: center;
  font-size: 15px;


}

button {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  background-color: transparent;
  padding: 0;
  transition: transform 0.3s ease;
}

button:hover {
  transform: scale(1.1);
}

button img {
  width: 100%;
  height: auto;
  border-radius: 50%;
  object-fit: cover;
  transition: box-shadow 0.3s ease;
}

button.active img {
  box-shadow: 0 0 10px 3px rgba(255, 255, 255, 0.7);
}

label {
  font-size: 1.5rem;
  color: #fff;
  margin-bottom: 20px;
}
</style>