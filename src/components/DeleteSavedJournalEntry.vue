<script>
export default {
  name: 'DeleteSavedJournalEntry',
  props: {
    entry: Object,
    index: Number
  },
  methods: {
    deleteEntry() {
      this.$emit('delete-entry', this.index);
      alert('Entry deleted');
    }
  }
};
</script>

<template>
  <div class="journal-category glass">
    <div class="category-header">
      <span class="category-name">{{ entry.category }}</span>
      <span class="current-date">{{ entry.date }}</span>
    </div>
    <div class="entry">
      <input type="text" v-model="entry.headline" class="headline" placeholder="Headline..." maxlength="70" disabled>
      <textarea v-model="entry.content" class="content" placeholder="Type text..." disabled></textarea>
      <button @click="deleteEntry" class="delete-btn">Delete</button>
    </div>
  </div>
</template>

<style scoped>
.journal-category {
  border-radius: 10px;
  box-shadow: 0 12px 50px 0 rgba(3, 15, 63, 0.66);
  width: 100%;
  max-width: 600px;
  margin: 20px 0;
  padding: 40px;
  background: rgba(215, 237, 245, 0.47);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  font-size: 22px;
  font-family: monospace;
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
}

.headline {
  width: 100%;
  padding: 12px;
  margin-bottom: 10px;
  border: 1px solid #19196299;
  border-radius: 5px;
  font-size: 16px;
}

.content {
  width: 100%;
  padding: 12px;
  margin-bottom: 10px;
  border: 1px solid #19196299;
  border-radius: 5px;
  font-size: 14px;
}

.headline::placeholder,
.content::placeholder {
  color: #151567;
}

.delete-btn {
  width: 100px;
  height: 40px;
  padding: 8px 16px;
  background-color: rgba(246, 174, 231, 0.71);
  backdrop-filter: blur(10px);
  font-size: 16px;
  color: black;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.delete-btn:hover {
  background-color: rgba(201, 182, 250, 0.7);
}
</style>
