<template>
  <div class="timer-container glass">
    <!-- Toggle Container -->
    <div class="toggle-container">
      <label class="toggle-label">
        <input type="checkbox" v-model="focusModeOn" class="toggle-input">
        <span class="toggle-slider"></span>
      </label>
      <div class="toggle-text">
        {{ focusModeOn ? 'Focus Mode Is On!' : 'Break Time, Baby!' }}
      </div>
    </div>

    <!-- Timer Controls -->
    <div class="timer-controls" v-if="focusModeOn">
      <div class="time">
        <input
            class="time-input"
            type="number"
            min="0"
            :max="99"
            v-model.number="focusHoursInput"
            @input="updateFocusHours"
            placeholder="00"
        />
        :
        <input
            class="time-input"
            type="number"
            min="0"
            :max="59"
            v-model.number="focusMinutesInput"
            @input="updateFocusMinutes"
            placeholder="50"
        />
        :
        <input
            class="time-input"
            type="number"
            min="0"
            :max="59"
            v-model.number="focusSecondsInput"
            @input="updateFocusSeconds"
            placeholder="00"
        />
      </div>
      <div class="buttons">
        <button @click="startFocusTimer" :class="{ 'pause-button': focusTimerRunning, 'start-button': !focusTimerRunning }">
          {{ focusTimerRunning ? 'Pause' : 'Start' }}
        </button>
        <v-btn @click="repeatFocusTimer" class="repeat-button material-icons">
          <v-icon>refresh</v-icon>
        </v-btn>
      </div>
    </div>

    <!-- Timer Controls for Break Mode -->
    <div class="timer-controls" v-else>
      <div class="time">
        <input
            class="time-input"
            type="number"
            min="0"
            :max="99"
            v-model.number="breakHoursInput"
            @input="updateBreakHours"
            placeholder="00"
        />
        :
        <input
            class="time-input"
            type="number"
            min="0"
            :max="59"
            v-model.number="breakMinutesInput"
            @input="updateBreakMinutes"
            placeholder="05"
        />
        :
        <input
            class="time-input"
            type="number"
            min="0"
            :max="59"
            v-model.number="breakSecondsInput"
            @input="updateBreakSeconds"
            placeholder="00"
        />
      </div>
      <div class="buttons">
        <button @click="startBreakTimer" :class="{ 'pause-button': breakTimerRunning, 'start-button': !breakTimerRunning }">
          {{ breakTimerRunning ? 'Pause' : 'Start' }}
        </button>
        <v-btn @click="repeatBreakTimer" class="repeat-button material-icons">
          <v-icon>refresh</v-icon>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      focusHoursInput: 0,
      focusMinutesInput: 50,
      focusSecondsInput: 0,
      focusTimerRunning: false,
      focusTimerInterval: null,
      initialFocusHours: 0,
      initialFocusMinutes: 50,
      initialFocusSeconds: 0,
      breakHoursInput: 0,
      breakMinutesInput: 10,
      breakSecondsInput: 0,
      breakTimerRunning: false,
      breakTimerInterval: null,
      initialBreakHours: 0,
      initialBreakMinutes: 10,
      initialBreakSeconds: 0,
      focusModeOn: true, // Start with focus mode on
    };
  },
  computed: {
    totalFocusTimeInSeconds() {
      return this.focusHoursInput * 3600 + this.focusMinutesInput * 60 + this.focusSecondsInput;
    },
    totalBreakTimeInSeconds() {
      return this.breakHoursInput * 3600 + this.breakMinutesInput * 60 + this.breakSecondsInput;
    }
  },
  methods: {
    startFocusTimer() {
      if (!this.focusTimerRunning) {
        this.focusTimerRunning = true;
        this.focusTimerInterval = setInterval(() => {
          if (this.totalFocusTimeInSeconds > 0) {
            if (this.focusSecondsInput > 0) {
              this.focusSecondsInput--;
            } else if (this.focusMinutesInput > 0) {
              this.focusMinutesInput--;
              this.focusSecondsInput = 59;
            } else if (this.focusHoursInput > 0) {
              this.focusHoursInput--;
              this.focusMinutesInput = 59;
              this.focusSecondsInput = 59;
            }
          } else {
            clearInterval(this.focusTimerInterval);
            this.focusTimerRunning = false;
          }
        }, 1000);
      }
    },
    repeatFocusTimer() {
      clearInterval(this.focusTimerInterval);
      this.focusHoursInput = this.initialFocusHours;
      this.focusMinutesInput = this.initialFocusMinutes;
      this.focusSecondsInput = this.initialFocusSeconds;
      this.focusTimerRunning = false;
    },
    startBreakTimer() {
      if (!this.breakTimerRunning) {
        this.breakTimerRunning = true;
        this.breakTimerInterval = setInterval(() => {
          if (this.totalBreakTimeInSeconds > 0) {
            if (this.breakSecondsInput > 0) {
              this.breakSecondsInput--;
            } else if (this.breakMinutesInput > 0) {
              this.breakMinutesInput--;
              this.breakSecondsInput = 59;
            } else if (this.breakHoursInput > 0) {
              this.breakHoursInput--;
              this.breakMinutesInput = 59;
              this.breakSecondsInput = 59;
            }
          } else {
            clearInterval(this.breakTimerInterval);
            this.breakTimerRunning = false;
          }
        }, 1000);
      }
    },
    repeatBreakTimer() {
      clearInterval(this.breakTimerInterval);
      this.breakHoursInput = this.initialBreakHours;
      this.breakMinutesInput = this.initialBreakMinutes;
      this.breakSecondsInput = this.initialBreakSeconds;
      this.breakTimerRunning = false;
    },
    updateFocusHours(event) {
      this.focusHoursInput = parseInt(event.target.value, 10) || 0;
      this.initialFocusHours = this.focusHoursInput;
    },
    updateFocusMinutes(event) {
      this.focusMinutesInput = parseInt(event.target.value, 10) || 0;
      this.initialFocusMinutes = this.focusMinutesInput;
    },
    updateFocusSeconds(event) {
      this.focusSecondsInput = parseInt(event.target.value, 10) || 0;
      this.initialFocusSeconds = this.focusSecondsInput;
    },
    updateBreakHours(event) {
      this.breakHoursInput = parseInt(event.target.value, 10) || 0;
      this.initialBreakHours = this.breakHoursInput;
    },
    updateBreakMinutes(event) {
      this.breakMinutesInput = parseInt(event.target.value, 10) || 0;
      this.initialBreakMinutes = this.breakMinutesInput;
    },
    updateBreakSeconds(event) {
      this.breakSecondsInput = parseInt(event.target.value, 10) || 0;
      this.initialBreakSeconds = this.breakSecondsInput;
    }
  },
  watch: {
    focusModeOn(newValue) {
      // Reset timers and states when switching modes
      if (!newValue) {
        clearInterval(this.focusTimerInterval);
        this.focusTimerRunning = false;
        this.repeatBreakTimer();
      } else {
        clearInterval(this.breakTimerInterval);
        this.breakTimerRunning = false;
        this.repeatFocusTimer();
      }
    }
  }
};
</script>

<style scoped>
.timer-container {
  user-select: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 40px;
  background: linear-gradient(130deg, rgba(255, 255, 255, 0.22), rgba(94, 184, 231, 0.3));
  box-shadow: 0 8px 32px 0 rgba(217, 220, 234, 0.22);
  backdrop-filter: blur(3px);
  border: 1.5px solid rgba(255, 255, 255, 0.45);
  width: 100%;
  margin-bottom: 32px;
  position: relative; /* Ensure positioning context */
}

.timer-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row; /* Row by default */
  margin-bottom: 20px;
  flex-wrap: wrap; /* Wrap elements to handle smaller screens */
}

@media (max-width: 768px) {
  .timer-controls {
    flex-direction: column; /* Change to column for smaller screens */
  }
}

.buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap; /* Ensure buttons wrap properly */
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

.toggle-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 80%; /* Occupy full width of parent */
  margin-bottom: 20px; /* Adjust spacing as needed */
}

.toggle-label {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.toggle-input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(177, 137, 245, 0.9);
  border-radius: 34px;
  transition: .4s;
}

.toggle-slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  border-radius: 50%;
  transition: .4s;
}

.toggle-input:checked + .toggle-slider {
  background-color: rgba(248, 187, 255, 0.91);
}

.toggle-input:checked + .toggle-slider:before {
  transform: translateX(26px);
}

.toggle-text {
  margin-top: 20px;
  color: #fff;
  font-size: 24px;
}

.start-button, .pause-button {
  width: 100px;
  height: 40px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
  color: #fff;
  font-size: 1rem;
  margin-left: 30px;
  margin-top: 1rem;
}

.start-button {
  background-color: #adaaff;
}

.pause-button {
  background-color: #738aff;
}

.repeat-button {
  width: 45px;
  height: 20px;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: row;
  margin-top: 15px;
}
</style>
