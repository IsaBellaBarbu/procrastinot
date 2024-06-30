<template>
  <div class="todo-list">
    <h1>Todo List:</h1>
    <div class="counters">
      <div class="counterwrapper">
        <div class="counter">Tasks: {{ tasksCount }}</div>
        <div class="counter">Remaining: {{ remainingCount }}</div>
      </div>
      <div class="progress-bar">
        <div class="progress-ring">
          <svg width="120" height="120" viewBox="0 0 120 120">
            <circle
                :cx="60"
                :cy="60"
                :r="radius"
                fill="transparent"
                stroke="#fff"
                stroke-width="10"
                :style="{ strokeDasharray: circumference, strokeDashoffset: progressOffset }"
            />
            <text
                x="60"
                y="60"
                dominant-baseline="middle"
                text-anchor="middle"
                class="progress-label"
            >
              {{ progressPercentage }}%
            </text>
          </svg>
        </div>
      </div>
    </div>
    <div class="entry" v-for="(todo, index) in todos" :key="index">
      <input
          type="checkbox"
          v-model="todo.done"
          class="checkbox"
          :id="'checkbox-' + index"
          @change="updateTodoCompletion(index)"
          v-if="todo.text !== ''"
      />
      <label :for="'checkbox-' + index" class="checkbox-label" v-if="todo.text !== ''">
        <i class="material-icons">{{ todo.done ? 'check_box' : 'check_box_outline_blank' }}</i>
      </label>
      <input
          type="text"
          v-model="todo.text"
          @keyup.enter="handleEnter(index)"
          class="input"
          :class="{ 'done': todo.done }"
          :placeholder="getPlaceholderText(index)"
          :ref="`input-${index}`"
      />
      <button class="delete-button" @click="deleteTodo(index)" v-if="todo.text !== ''">
        <i class="material-icons">delete</i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      todos: [{ text: '', done: false, timestamp: null }],
      placeholderText: 'Enter To-Do...',
      radius: 50,
    };
  },
  computed: {
    tasksCount() {
      return this.todos.filter(todo => todo.text !== '').length;
    },
    remainingCount() {
      return this.todos.filter(todo => todo.text !== '' && !todo.done).length;
    },
    circumference() {
      return 2 * Math.PI * this.radius;
    },
    progressPercentage() {
      if (this.tasksCount === 0) return 0;
      const completedTasks = this.todos.filter(todo => todo.text !== '' && todo.done).length;
      return Math.round((completedTasks / this.tasksCount) * 100);
    },
    progressOffset() {
      return this.circumference - (this.progressPercentage / 100) * this.circumference;
    }
  },
  methods: {
    handleEnter(index) {
      if (this.todos[index].text !== '') {
        this.todos.splice(index + 1, 0, { text: '', done: false, timestamp: null });
        this.saveTodos();
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
        this.todos.push({ text: '', done: false, timestamp: null });
      }
      this.saveTodos();
    },
    updateTodoCompletion(index) {
      this.todos[index].timestamp = this.todos[index].done ? new Date().toISOString() : null;
      this.saveTodos();
    },
    saveTodos() {
      localStorage.setItem('todos', JSON.stringify(this.todos));
    },
    loadTodos() {
      const savedTodos = localStorage.getItem('todos');
      if (savedTodos) {
        try {
          let todos = JSON.parse(savedTodos);
          if (!Array.isArray(todos)) {
            todos = [{ text: '', done: false, timestamp: null }];
          }
          const now = new Date();
          const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          this.todos = todos.filter(todo => {
            if (todo.done && todo.timestamp) {
              const todoDate = new Date(todo.timestamp);
              return todoDate >= today;
            }
            return true;
          });
        } catch (e) {
          console.error('Error parsing todos from localStorage', e);
          this.todos = [{ text: '', done: false, timestamp: null }];
        }
      }
    }
  },
  watch: {
    todos: {
      handler() {
        this.saveTodos();
      },
      deep: true
    }
  },
  created() {
    this.loadTodos();
  }
};
</script>

<style scoped>
.todo-list {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 40px;
  border-radius: 10px;
  background: linear-gradient(130deg, rgba(255, 255, 255, 0.22), rgba(94, 184, 231, 0.3));
  box-shadow: 0 8px 32px 0 rgba(217, 220, 234, 0.22);
  backdrop-filter: blur(3px);
  border: 1.5px solid rgba(255, 255, 255, 0.45);
  width: 100%;
}

.todo-list h1 {
  font-size: 24px;
  color: white;
  text-align: center;
  padding-bottom: 40px;
}

.counterwrapper {
  display: flex;
  align-items: start;
  justify-content: space-evenly;
  flex-direction: column;
}

.counters {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
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
  margin: 10px;
  color: #ffd23f;
}

.material-icons {
  font-size: 24px;
}

.delete-button {
  border: none;
  color: #ffd23f;
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
  color: #e39c17;
}

.done {
  color: #666;
  text-decoration: line-through;
}

.progress-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
  margin: 0 auto;
}

.progress-ring {
  position: relative;
  width: 100%;
  height: 100%;
}

.progress-ring circle {
  stroke-dasharray: 314.159;
  stroke-dashoffset: 0;
  transition: stroke-dashoffset 0.35s;
}

.progress-label {
  fill: floralwhite;
}
</style>
