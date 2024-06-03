<template>
  <div class="mood-diagram">
    <div class="chart-container">
      <!-- SVG for the line chart -->
      <svg class="chart-svg" viewBox="0 0 600 400">
        <!-- X-axis -->
        <line x1="50" y1="350" x2="550" y2="350" stroke="black" />

        <!-- Y-axis -->
        <line x1="50" y1="50" x2="50" y2="350" stroke="black" />

        <!-- Y-axis labels -->
        <g class="y-axis">
          <text x="20" y="55">Smile</text>
          <text x="20" y="120">Okay</text>
          <text x="20" y="185">Neutral</text>
          <text x="20" y="250">Sad</text>
          <text x="20" y="315">Angry</text>
        </g>

        <!-- Test mood entries (to be replaced with real data) -->
        <circle v-for="(entry, index) in testMoodEntries" :key="index" :cx="(index * 70) + 100" :cy="350 - (entry * 100)" r="4" fill="#007bff" />

        <!-- Line connecting mood entries -->
        <polyline :points="getPolylinePoints" fill="none" stroke="#007bff" stroke-width="2" />

        <!-- X-axis labels (dates) -->
        <text v-for="(date, index) in weekDates" :key="index" x="(index * 70) + 100" y="370" text-anchor="middle">{{ date }}</text>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MoodDiagram',
  data() {
    return {
      testMoodEntries: [0.8, 0.5, 0.3, 0.6, 0.9, 0.7, 0.4], // Test mood entries (replace with real data)
      startDate: new Date(), // Start date for the week (replace with actual start date)
      weekDates: [] // Array to store dates for the week
    };
  },
  created() {
    // Calculate dates for the current week
    this.calculateWeekDates();
  },
  methods: {
    calculateWeekDates() {
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      for (let i = 0; i < 7; i++) {
        const date = new Date(this.startDate);
        date.setDate(date.getDate() + i);
        const formattedDate = `${days[date.getDay()]} ${date.getDate()}`;
        this.weekDates.push(formattedDate);
      }
    }
  },
  computed: {
    getPolylinePoints() {
      return this.testMoodEntries.map((entry, index) => `${(index * 70) + 100},${350 - (entry * 100)}`).join(' ');
    }
  }
};
</script>

<style scoped>
.mood-diagram {
  display: flex;
  justify-content: center;
  align-items: center;
}

.chart-container {
  overflow-x: scroll;
}

.chart-svg {
  width: 100%;
  height: fit-content;
}

.y-axis text {
  font-size: 12px;
  text-anchor: end;
}

</style>
