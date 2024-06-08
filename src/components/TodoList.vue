<template>
  <div class="todo-list">
    <h1>Todo List:</h1>
    <div class="counters">
      <div class="counter">Tasks: {{ tasksCount }}</div>
      <div class="counter">Remaining: {{ remainingCount }}</div>
    </div>
    <div class="entry" v-for="(todo, index) in todos" :key="index">
      <input
          type="checkbox"
          v-model="todos[index].done"
          class="checkbox"
          :id="'checkbox-' + index"
      />
      <label :for="'checkbox-' + index" class="checkbox-label">
        <i class="material-icons">{{ todos[index].done ? 'check_box' : 'check_box_outline_blank' }}</i>
      </label>
      <input
          type="text"
          v-model="todos[index].text"
          @keyup.enter="handleEnter(index)"
          class="input"
          :class="{ 'done': todos[index].done }"
          :placeholder="getPlaceholderText(index)"
          :ref="`input-${index}`"
      />
      <button class="delete-button" @click="deleteTodo(index)">
        <i class="material-icons">delete</i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      todos: [{ text: '', done: false }],
      placeholderText: 'Enter To-Do...',
    };
  },
  computed: {
    tasksCount() {
      return this.todos.length-1;
    },
    remainingCount() {
      return this.todos.filter(todo => !todo.done).length-1;
    }
  },
  methods: {
    handleEnter(index) {
      if (this.todos[index].text !== '') {
        this.todos.splice(index + 1, 0, { text: '', done: false });
        this.$nextTick(() => {
          const nextInput = this.$refs[`input-${index + 1}`][0];
          if (nextInput) {
            nextInput.focus();
          }
        });
      }
    },
    getPlaceholderText(index) {
      return this.todos[index].text === '' ? this.placeholderText : '';
    },
    deleteTodo(index) {
      this.todos.splice(index, 1);
      if (this.todos.length === 0) {
        this.todos.push({ text: '', done: false });
      }
    },
  },
};
</script>

<style scoped>
.todo-list {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
  border-radius: 16px;
  background: linear-gradient(130deg, rgba(255, 255, 255, 0.44), rgba(255, 255, 255, 0.17));
  box-shadow: 0 8px 32px 0 rgba(3, 15, 63, 0.66);
  backdrop-filter: blur( 3px );
  border: 1.5px solid rgba(255, 255, 255, 0.45);
}

.todo-list h1 {
  font-size: 24px;
  color: white;
  text-align: center;
  padding-bottom: 20px;
}

.counters {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
  color: white;
}

.counter {
  font-size: 18px;
}

.entry {
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 1px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
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
  color: rgba(255, 255, 255, 0.71);
}

.checkbox {
  display: none;
}

.checkbox-label {
  cursor: pointer;
  margin-right: 10px;
}

.material-icons {
  font-size: 24px;
}

.delete-button {
  border: none;
  color: #b5e4ff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
}

.delete-button i {
  font-size: 20px;
}

.delete-button:hover i {
  color: rgba(5, 62, 70, 0.85);
}

.done {
  color: #666;
  text-decoration: line-through;
}
</style>
