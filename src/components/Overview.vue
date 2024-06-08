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
      const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour24: true };
      this.currentDate = now.toLocaleDateString(undefined, dateOptions) + ' | ' + now.toLocaleTimeString(undefined, timeOptions);

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
    <div class="nametag glass">
      <h2>Isa's Homebase</h2>
      <p>{{ currentDate }}</p>
      <button @click="handleClick" :disabled="isButtonDisabled" class="heart-btn">
        <svg xmlns="http://www.w3.org/2000/svg" class="heart-icon" height="24px" viewBox="0 -960 960 960" width="24px" fill="currenColor">
          <path d="M240-400q0 52 21 98.5t60 81.5q-1-5-1-9v-9q0-32 12-60t35-51l113-111 113 111q23 23 35 51t12 60v9q0 4-1 9 39-35 60-81.5t21-98.5q0-50-18.5-94.5T648-574q-20 13-42 19.5t-45 6.5q-62 0-107.5-41T401-690q-39 33-69 68.5t-50.5 72Q261-513 250.5-475T240-400Zm240 52-57 56q-11 11-17 25t-6 29q0 32 23.5 55t56.5 23q33 0 56.5-23t23.5-55q0-16-6-29.5T537-292l-57-56Zm0-492v132q0 34 23.5 57t57.5 23q18 0 33.5-7.5T622-658l18-22q74 42 117 117t43 163q0 134-93 227T480-80q-134 0-227-93t-93-227q0-129 86.5-245T480-840Z"/></svg>
        <span>{{ streak }}</span>
      </button>
    </div>
  </div>

</template>

<style scoped>



.glass {
  padding: 5rem;
  width: 100%;
  background: linear-gradient(130deg, rgba(255, 255, 255, 0.22), rgba(94, 184, 231, 0.3));
  backdrop-filter: blur( 3px );
  border-radius: 190px;
  border: 1.5px solid rgba(255, 255, 255, 0.45);
  display: flex;
  align-content: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;  /*pro tip von lukas, abstand zw drin in elems*/
  margin-bottom: 32px; /*gives space between component underneath when flex: column*/

}

.nametag h2{
  font-family: monospace;
  text-align: center;
  color: white;

}

.nametag p{
  text-align: center;
  font-family: monospace;
  font-size: 15px;
}

.heart-btn {
  border: none;
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1%;
}

.heart-icon {
  width: auto;
  height: 22px;
  justify-content: center;
  align-items: center;
  display: flex;

}


</style>