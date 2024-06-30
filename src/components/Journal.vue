<script>
import JournalTemplate from "@/components/JournalTemplate.vue";
import DeleteSavedJournalEntry from "@/components/DeleteSavedJournalEntry.vue";

export default {
  components: {
    JournalTemplate,
    DeleteSavedJournalEntry
  },
  data() {
    return {
      selectedCategory: 'Default Category', // Default category or logic to select a category
      journalEntries: JSON.parse(localStorage.getItem('journalEntries')) || [] // Load entries from local storage
    };
  },
  methods: {
    handleEntrySaved(entry) {
      this.journalEntries.unshift(entry); // Add new entry to the start of the array
      localStorage.setItem('journalEntries', JSON.stringify(this.journalEntries));
    },
    deleteEntry(index) {
      this.journalEntries.splice(index, 1);
      localStorage.setItem('journalEntries', JSON.stringify(this.journalEntries));
    }
  }
};
</script>

<template>
  <div class="journal">
    <h1>Welcome to Your Safe Space!</h1>
    <div class="content">
      <JournalTemplate :categoryName="selectedCategory" @entry-saved="handleEntrySaved" />
      <div class="entries-grid">
        <DeleteSavedJournalEntry
            v-for="(entry, index) in journalEntries"
            :key="index"
            :entry="entry"
            :index="index"
            @delete-entry="deleteEntry"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.journal {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  border: #1b4033;
  border-radius: 20px;
}
h1{
  color: white;
  margin-top: 64px;
  margin-bottom: 64px;
  text-align: center;
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow-y: auto; /* Enable vertical scrolling */
  transition: margin-left 0.3s ease;
  gap: 5%;
}

.entries-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  width: 100%;
  padding: 20px; /* Add padding to avoid clipping content at the edges */
  grid-auto-flow: dense; /* Ensure new items are placed to minimize gaps */
}

.journal p {
  text-align: center;
  flex-wrap: wrap;
  font-family: monospace;
  font-size: 20px;
  color: #151567;
  padding: 20px;
}
</style>
