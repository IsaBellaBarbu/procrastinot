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
    <div class="timer">{{ formatTime }}</div>
    <button @click="startTimer" v-if="!timerRunning">Start</button>
    <button @click="repeatTimer" v-else>Repeat</button>
  </div>
</template>

<style scoped>
.pomodoro-timer {
  width: 200px;
  height: 100px;
  border: 1px solid #ccc;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.timer {
  font-size: 24px;
  margin-bottom: 10px;
}
</style>