<script>
export default {
  data() {
    return {
      entries: [''],
      placeholderText: 'Type something...',
    };
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
  background: #d9e4ff;
  box-shadow: 0 4px 30px rgba(125, 148, 213, 0.88);
}

.gratitude-list h1 {
  font-size: 24px;
  color: #333;
  text-align: center;
  padding-bottom: 20px;
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
  color: rgba(5, 187, 208, 0.78);
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
  color: #333;
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
  color: rgba(5, 62, 70, 0.85);
}
</style>

