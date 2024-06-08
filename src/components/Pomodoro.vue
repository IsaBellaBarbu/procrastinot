<script>
export default {
  data() {
    return {
      time: 1500, // 25 minutes in seconds
      timerRunning: false,
      timerInterval: null
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
    <label for="poms">My Pomodoro-Timer:</label>
    <div class="timer-container glass">
      <div class="timer">{{ formatTime }}</div>
      <button @click="toggleTimer" :class="{ 'pause-button': timerRunning, 'start-button': !timerRunning }">
        {{ timerRunning ? 'Pause' : 'Start' }}
      </button>
      <v-btn @click="repeatTimer" class="repeat-button material-icons">
      <v-icon>refresh</v-icon>
    </v-btn>
    </div>

  </div>
</template>


<style scoped>

.pomodoro-timer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  margin-bottom: 32px;


}

.pomodoro-timer label{
  display: flex;
  color: #000000;
  text-align: center;
  font-size: 15px;
}

.timer-container {
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 2rem;
  background: linear-gradient(130deg, rgba(255, 255, 255, 0.22), rgba(94, 184, 231, 0.3));
  box-shadow: 0 8px 32px 0 rgba(3, 15, 63, 0.66);
  backdrop-filter: blur( 3px );
  border: 1.5px solid rgba(255, 255, 255, 0.45);
  width: 80%;
  text-align: center;
}

.timer {
  font-size: 2rem;
  color: #fff;
  width: 100%;
  padding: 1rem;

}

.start-button, .pause-button {
  width: 120px; /* Adjust button width */
  height: 40px; /* Adjust button height */
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: #fff;
  font-size: 1rem;
  padding: 0.5rem;
}

.start-button {
  background-color: #adaaff;
}

.pause-button {
  background-color: #738aff;
}

.repeat-button {
  width: 50px;
  height: 40px;
  border: 25px;
  background-color: none;
  color: #fff;
  padding: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}


</style>
