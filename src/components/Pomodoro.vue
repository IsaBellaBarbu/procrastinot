<script>
export default {
  data() {
    return {
      hours: 0,
      minutes: 25,
      seconds: 0,
      timerRunning: false,
      timerInterval: null,
    };
  },
  computed: {
    formatTime() {
      const formattedHours = String(this.hours).padStart(2, '0');
      const formattedMinutes = String(this.minutes).padStart(2, '0');
      const formattedSeconds = String(this.seconds).padStart(2, '0');
      return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    },
    totalTimeInSeconds() {
      return this.hours * 3600 + this.minutes * 60 + this.seconds;
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
        if (this.totalTimeInSeconds > 0) {
          if (this.seconds > 0) {
            this.seconds--;
          } else if (this.minutes > 0) {
            this.minutes--;
            this.seconds = 59;
          } else if (this.hours > 0) {
            this.hours--;
            this.minutes = 59;
            this.seconds = 59;
          }
        } else {
          clearInterval(this.timerInterval);
          this.timerRunning = false;
        }
      }, 1000);
    },
    repeatTimer() {
      clearInterval(this.timerInterval);
      // Reset to user input values
      this.timerRunning = false; // Stop the timer if running
      this.hours = parseInt(this.hoursInput, 10) || 0;
      this.minutes = parseInt(this.minutesInput, 10) || 0;
      this.seconds = parseInt(this.secondsInput, 10) || 0;
    },
    updateHours(event) {
      this.hoursInput = parseInt(event.target.value, 10) || 0;
    },
    updateMinutes(event) {
      this.minutesInput = parseInt(event.target.value, 10) || 0;
    },
    updateSeconds(event) {
      this.secondsInput = parseInt(event.target.value, 10) || 0;
    }
  }
};
</script>



<template>
    <div class="timer-container glass">
      <input
          class="time-input"
          type="number"
          min="0"
          :max="99"
          v-model.number="hours"
          @input="updateHours"
          placeholder="00"
      />
      :
      <input
          class="time-input"
          type="number"
          min="0"
          :max="59"
          v-model.number="minutes"
          @input="updateMinutes"
          placeholder="25"
      />
      :
      <input
          class="time-input"
          type="number"
          min="0"
          :max="59"
          v-model.number="seconds"
          @input="updateSeconds"
          placeholder="00"
      />
      <button @click="toggleTimer" :class="{ 'pause-button': timerRunning, 'start-button': !timerRunning }">
        {{ timerRunning ? 'Pause' : 'Start' }}
      </button>
      <v-btn @click="repeatTimer" class="repeat-button material-icons">
        <v-icon>refresh</v-icon>
      </v-btn>
    </div>
</template>





<style scoped>
.timer-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 40px;
  background: linear-gradient(130deg, rgba(255, 255, 255, 0.22), rgba(94, 184, 231, 0.3));
  box-shadow: 0 8px 32px 0 rgba(3, 15, 63, 0.66);
  backdrop-filter: blur(3px);
  border: 1.5px solid rgba(255, 255, 255, 0.45);
  width: 100%;
  margin-bottom: 32px;
}

.time-input {
  font-size: 2rem;
  color: #fff;
  width: 4.5rem;
  text-align: center;
  background: none;
  border: none;
  border-bottom: 1px solid #fff;
  margin: 0 0.5rem;
  outline: none;
}

@media (max-width: 600px) {
  .time-input {
    font-size: 1.5rem;
    width: 3.5rem;
    margin: 0 0.3rem;
  }

  .start-button, .pause-button, .repeat-button{
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    padding: 0.3rem;
    margin: 0.3rem;
  }

  .timer-container {
    width: 100%;
    padding: 15px;
  }
}

.start-button, .pause-button {
  width: 100px;
  height: 40px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
  color: #fff;
  font-size: 1rem;
  padding: 0.5rem;
  margin-left: 20px;
}

.start-button {
  background-color: #adaaff;
}

.pause-button {
  background-color: #738aff;
}

.repeat-button {
  width: 25px;
  height: 20px;
  color: #fff;
  padding: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: row;
  gap: 5%;
}
</style>
