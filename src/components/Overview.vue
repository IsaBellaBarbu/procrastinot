<script>
export default {
  data() {
    return {
      streak: 0,
      lastClickedDate: null,
      currentDate: '',
      isButtonDisabled: false
    };
  },
  methods: {
    handleClick() {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      if (!this.lastClickedDate || this.lastClickedDate.getTime() !== today.getTime()) {
        if (this.isButtonDisabled) {
          // User tried to click before 00:00 of the following day
          return;
        }
        this.lastClickedDate = today;
        this.streak++;
        // Save streak count and last clicked date to local storage
        localStorage.setItem('streakCount', this.streak.toString());
        localStorage.setItem('lastClickedDate', today.toISOString());
      }
    },
    updateDateTime() {
      const now = new Date();
      const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
      this.currentDate = now.toLocaleDateString(undefined, dateOptions) + ' ' + now.toLocaleTimeString(undefined, timeOptions);

      // Check if the button should be disabled
      const nextDay = new Date(now);
      nextDay.setDate(nextDay.getDate() + 1);
      nextDay.setHours(0, 0, 0, 0);
      this.isButtonDisabled = now >= nextDay;
    },
    loadStreakAndLastClickedDate() {
      // Load streak count and last clicked date from local storage
      const storedStreak = localStorage.getItem('streakCount');
      const storedLastClickedDate = localStorage.getItem('lastClickedDate');
      if (storedStreak !== null) {
        this.streak = parseInt(storedStreak);
      }
      if (storedLastClickedDate !== null) {
        this.lastClickedDate = new Date(storedLastClickedDate);
      }
    }
  },
  mounted() {
    this.loadStreakAndLastClickedDate(); // Load streak count and last clicked date when component is mounted
    this.updateDateTime();
    // Update date and time every second
    this.intervalId = setInterval(this.updateDateTime, 1000);
  },
  beforeDestroy() {
    clearInterval(this.intervalId);
  }
};
</script>

<template>
  <div class="overview">
    <div class="nametag">
      <h2>Isa's Homebase</h2>
      <p>{{ currentDate }}</p>
      <button @click="handleClick" :disabled="isButtonDisabled" class="heart-btn">
        <svg xmlns="http://www.w3.org/2000/svg" class="heart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
        <span>{{ streak }}</span>
      </button>
    </div>
  </div>

</template>

<style scoped>
.heart-btn {
  border: none;
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.heart-icon {
  width: 24px;
  height: 24px;
}

span {
  margin-left: 10px;
}
</style>