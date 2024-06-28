<template>
  <div class="grateful-entries">
    <h1>Grateful Entries</h1>
    <ul>
      <li v-for="(entry, index) in entries" :key="index" class="entry-item">
        <div class="entry-content">{{ entry.g_content }}</div>
        <div class="entry-date">{{ formatDate(entry.g_date) }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      entries: [],
      userId: null, // Ensure to set the logged-in user's ID
    };
  },
  methods: {
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
    fetchGratefulEntries() {
      axios
          .get(`http://localhost:1234/gratefulEntries/${this.userId}`)
          .then(response => {
            this.entries = response.data.entries;
          })
          .catch(error => {
            console.error('Error fetching grateful entries:', error);
          });
    },
  },
  mounted() {
    // Simulate user login
    this.userId = 3; // Replace with actual logic to get logged-in user's ID
    this.fetchGratefulEntries();
  },
};
</script>

<style scoped>
.grateful-entries {
  max-width: 600px;
  margin: auto;
}

.entry-item {
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 8px;
}

.entry-content {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
}

.entry-date {
  font-size: 14px;
  color: #666666;
}
</style>
