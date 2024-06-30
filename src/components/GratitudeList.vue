<script>
export default {
  data() {
    return {
      entries: [''],
      placeholderText: 'Type something...',
    };
  },
  created() {
    const savedData = JSON.parse(localStorage.getItem('entriesData'));
    const currentDate = new Date().toISOString().split('T')[0];
    if (savedData && savedData.date === currentDate) {
      this.entries = savedData.entries;
    } else {
      localStorage.removeItem('entriesData');
      this.entries = [''];
    }
  },
  watch: {
    entries: {
      handler(newEntries) {
        const currentDate = new Date().toISOString().split('T')[0];
        const dataToSave = {
          date: currentDate,
          entries: newEntries,
        };
        localStorage.setItem('entriesData', JSON.stringify(dataToSave));
      },
      deep: true,
    },
  },
  methods: {
    handleEnter(index) {
      if (this.entries[index] !== '') {
        this.entries.splice(index + 1, 0, '');
        this.$nextTick(() => {
          const nextInput = this.$refs[`input-${index + 1}`][0];
          if (nextInput) {
            nextInput.focus();
          }
        });
      }
    },
    getPlaceholderText(index) {
      return this.entries[index] === '' ? this.placeholderText : '';
    },
    deleteEntry(index) {
      this.entries.splice(index, 1);
      if (this.entries.length === 0) {
        this.entries.push('');
      }
    },
  },
};
</script>

<template>
  <div class="gratitude-list">
    <h1>Things I am grateful for today:</h1>
    <div class="entry" v-for="(entry, index) in entries" :key="index">
      <i class="material-icons" v-if="entry !== ''">favorite</i>
      <input
          type="text"
          v-model="entries[index]"
          @keydown.enter="handleEnter(index)"
          class="input"
          :placeholder="getPlaceholderText(index)"
          :ref="`input-${index}`"
      />
      <button class="delete-button" @click="deleteEntry(index)">
        <i class="material-icons">delete</i>
      </button>
    </div>
  </div>
</template>

<style scoped>
.gratitude-list {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
  border-radius: 16px;
  background: linear-gradient(130deg, rgba(255, 255, 255, 0.22), rgba(94, 184, 231, 0.3));
  box-shadow: 0 8px 32px 0 rgba(217, 220, 234, 0.22);
  backdrop-filter: blur(3px);
  border: 1.5px solid rgba(255, 255, 255, 0.45);
}

.gratitude-list h1 {
  font-size: 20px;
  color: #ffffff;
  text-align: center;
  padding-bottom: 20px;
  padding-left: 15px;
  padding-right: 15px;
}

.entry {
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.entry i {
  color: #ffcd6d;
  padding: 10px;
}

.input {
  flex: 1;
  border: none;
  background: none;
  color: #333;
  font-size: 16px;
  padding: 8px;
  outline: none;
}

.input::placeholder {
  color: rgba(0, 0, 0, 0.5);
}

.delete-button {
  border: none;
  color: #e39c17;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.delete-button i {
  font-size: 20px;
}

.delete-button:hover i {
  color: #e39c17;
}
</style>
