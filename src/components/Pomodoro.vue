<script>
import repeatIcon from '@/components/images/arrows.png';

export default {
  data() {
    return {
      time: 1500, // 25 minutes in seconds
      timerRunning: false,
      timerInterval: null,
      repeatImage: repeatIcon // Assign imported image to repeatImage
    };
  },
  computed: {
    formatTime() {
      const minutes = Math.floor(this.time / 60);
      const seconds = this.time % 60;
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
  },
  methods: {
    toggleTimer() {
      if (this.timerRunning) {
        clearInterval(this.timerInterval);
        this.timerRunning = false;
      } else {
        this.startTimer();
      }
    },
    startTimer() {
      this.timerRunning = true;
      this.timerInterval = setInterval(() => {
        if (this.time > 0) {
          this.time--;
        } else {
          clearInterval(this.timerInterval);
          this.timerRunning = false;
        }
      }, 1000);
    },
    repeatTimer() {
      clearInterval(this.timerInterval);
      this.time = 1500; // Reset time to 25 minutes
      this.timerRunning = false;
    }
  }
};
</script>

<template>
  <div class="pomodoro-timer">
    <div class="timer-container">
      <div class="timer">{{ formatTime }}</div>
      <button @click="toggleTimer" :class="{ 'pause-button': timerRunning, 'start-button': !timerRunning }">
        {{ timerRunning ? 'Pause' : 'Start' }}
      </button>
    </div>
    <button @click="repeatTimer" class="repeat-button">
      <img :src="repeatImage" alt="Repeat">
    </button>
  </div>
</template>


<style scoped>
.pomodoro-timer {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.timer-container {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.timer {
  font-size: 24px;
  margin-right: 10px;
}

.start-button, .pause-button {
  width: 100px; /* Adjust button width */
  height: 40px; /* Adjust button height */
  border: none;
  cursor: pointer;
}

.repeat-button {
  margin: 30px; /* Add margin to separate the repeat button */
}

.repeat-button img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.pause-button {
  background-color: #ff6666; /* Change color when timer is running */
}

.start-button {
  background-color: #66ff66; /* Change color when timer is not running */
}
</style>