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
      showLoginForm: true, // Flag to control the display of the login form
      showRegisterForm: false
    };
  },
  methods: {
    login() {
      console.log('Logging in...');
    },
    toggleRegisterForm() {
      this.showLoginForm = !this.showLoginForm; // Hide login form when registering
      this.showRegisterForm = !this.showRegisterForm;
    },
    register(newUser) {
      console.log('Registering new user:', newUser);
      // You may want to send this data to your backend API for registration
      this.showRegisterForm = false; // Hide the registration form after registration
      this.showLoginForm = true; // Show the login form again
    },
    goToLogin() {
      this.showRegisterForm = false; // Hide the registration form
      this.showLoginForm = true; // Show the login form
    }
  }
};
</script>

<template>
  <div class="container">
  <div class="box" v-if="showLoginForm">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit">Sign In</button>
    </form>
    <p>Don't have an account? <a href="#" @click="toggleRegisterForm">Register</a></p>
  </div>
  </div>
  <register v-if="showRegisterForm" @register="register" @cancel="toggleRegisterForm" @go-to-login="goToLogin"></register>

</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.box {
  border: 1.5px solid #132e24;
  padding: 35px;
  max-width: 400px;
  width: 100%;
  background-color: #fff;
}

.box h2 {
  font-size: 24px; /* Increase the font size */
}

.box form {
  margin-top: 15px; /* Increase the space between login form and following text */
}

.box form > div {
  margin-bottom: 10px; /* Increase the space between form fields */
}

.box form button {
  margin: 30px; /* Center the button vertically */
  background-color: #4fb891; /* Background color */
  border: 1.5px solid #132e24; /* Border */
  color: #fff; /* Text color */
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s, border-color 0.3s, box-shadow 0.3s; /* Transition effect */
  box-shadow: 4px 8px 6px rgba(8, 43, 30, 0.1);
}

.box form button:hover {
  background-color: #369c76; /* Hover background color */
  border-color: #369c76; /* Hover border color */
  box-shadow: 4px 8px 5px rgba(8, 43, 30, 0.2); /* Hover box shadow */
}


.box p {
  margin-top: 15px; /* Increase the space between "Sign In" button and following text */
}
</style>