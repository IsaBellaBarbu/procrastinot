<script>
export default {
  name: 'JournalTemplate',
  props: {
    categoryName: String // Pass category name as prop
  },
  data() {
    return {
      headline: '', // Store headline text
      content: '', // Store content text
      currentDate: this.getCurrentDate() // Get current date
    };
  },
  methods: {
    getCurrentDate() {
      const date = new Date();
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    },
    saveEntry() {
      if (this.headline && this.content) {
        const entry = {
          category: this.categoryName,
          headline: this.headline,
          content: this.content,
          date: this.currentDate
        };
        // Save entry to local storage
        let journalEntries = JSON.parse(localStorage.getItem('journalEntries')) || [];
        journalEntries.unshift(entry); // Use unshift to add to the beginning
        localStorage.setItem('journalEntries', JSON.stringify(journalEntries));
        alert('Entry saved!');
        this.$emit('entry-saved', entry); // Emit event with entry data
        this.headline = '';
        this.content = '';
      } else {
        alert('Please fill in both the headline and content.');
      }
    }
  }
};
</script>

<template>
  <div class="overview">
    <div class="journal-category glass">
      <div class="category-header">
        <span class="category-name">{{ categoryName }}</span>
        <span class="current-date">{{ currentDate }}</span>
      </div>
      <div class="entry">
        <input type="text" v-model="headline" class="headline" placeholder="Headline..." maxlength="70">
        <textarea v-model="content" class="content" placeholder="Type text..."></textarea>
        <button @click="saveEntry" class="save-btn">Save</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.journal-category {
  border-radius: 7px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
}

.glass {
  padding: 40px;
  width: 100%;
  background: linear-gradient(130deg, rgba(255, 255, 255, 0.22), rgba(94, 184, 231, 0.3));
  box-shadow: 0 8px 32px 0 rgba(217, 220, 234, 0.22);
  backdrop-filter: blur(3px);
  border: 1.5px solid rgba(255, 255, 255, 0.45);
  display: flex;
  align-content: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
}

.category-header {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  padding-bottom: 20px;
  font-size: 22px;
  font-family: monospace;
  color: #141064;
}

.category-name {
  font-weight: bold;
}

.current-date {
  font-size: 0.8rem;
  color: rgba(25, 25, 98, 0.6);
  text-align: end;
}

.entry {
  width: 100%;
  font-family: monospace;
  color: white;
}

.headline {
  width: 100%;
  padding: 12px;
  margin-bottom: 10px;
  border: 1px solid #19196299;
  border-radius: 5px;
  font-size: 16px;
  color: white;
}

.content {
  width: 100%;
  padding: 12px;
  margin-bottom: 10px;
  border: 1px solid #19196299;
  border-radius: 5px;
  font-size: 14px;
  color: white;
}

.headline::placeholder,
.content::placeholder {
  color: #151567;
}

.save-btn {
  width: 100px;
  height: 40px;
  padding: 8px 16px;
  background-color: #adaaff;
  backdrop-filter: blur(10px);
  font-size: 16px;
  color: white;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.save-btn:hover {
  background-color: #9592ff;
}
</style>
