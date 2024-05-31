<script>
export default {
  name: 'JournalCategory',
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
      // You can send an HTTP request to save the entry to the database here
      // For example, using Axios or Fetch
      // After saving, you can emit an event to inform the parent component
      this.$emit('done');
    }
  }
};
</script>

<template>
  <div class="journal-category">
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
</template>

<style scoped>
.journal-category {
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.category-name {
  font-weight: bold;
}

.current-date {
  font-size: 0.8rem;
  color: #888;
}

.entry {
  width: 100%;
}

.headline,
.content {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.headline::placeholder,
.content::placeholder {
  color: #999;
}

.save-btn {
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.save-btn:hover {
  background-color: #0056b3;
}
</style>