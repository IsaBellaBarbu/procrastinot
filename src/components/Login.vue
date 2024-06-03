<script>
import Register from './Register.vue';

export default {
  name: 'Login',
  components: {
    Register
  },
  data() {
    return {
      username: '',
      password: '',
      showLoginForm: true,
      showRegisterForm: false
    };
  },
  methods: {
    login() {
      console.log('Logging in...');
    },
    toggleRegisterForm() {
      this.showLoginForm = !this.showLoginForm;
      this.showRegisterForm = !this.showRegisterForm;
    },
    register(newUser) {
      console.log('Registering new user:', newUser);
      this.showRegisterForm = false;
      this.showLoginForm = true;
    },
    goToLogin() {
      this.showRegisterForm = false;
      this.showLoginForm = true;
    }
  }
};
</script>

<template>
  <div class="container">
    <div class="box glass" v-if="showLoginForm">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username" required>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <button type="submit">Sign In</button>
      </form>
      <p>Don't have an account? <a href="#" @click="toggleRegisterForm">Register</a></p>
    </div>
    <register v-if="showRegisterForm" @register="register" @cancel="toggleRegisterForm" @go-to-login="goToLogin"></register>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: linear-gradient(135deg, rgba(161, 67, 239, 0.4), rgba(122, 70, 213, 0.95));
}

.box {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  color: #fff;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

input {
  width: calc(100% - 2rem);
  padding: 0.5rem;
  border: none;
  border-radius: 8px;
  backdrop-filter: blur(5px);
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  font-size: 1rem;
}

input:focus {
  outline: none;
  box-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
}

button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  background-color: #132e24;
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
}

button:hover {
  background-color: #1b4033;
}

a {
  color: #fff;
  text-decoration: underline;
  cursor: pointer;
}

a:hover {
  text-decoration: none;
}
</style>
