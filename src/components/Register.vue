<script>
export default {
  name: 'Register',
  data() {
    return {
      newUsername: '',
      newPassword: ''
    };
  },
  methods: {
    register() {
      // Emit an event to the parent component with the new user data
      this.$emit('register', {
        username: this.newUsername,
        password: this.newPassword
      });
      // Reset the form fields after registration
      this.newUsername = '';
      this.newPassword = '';
    },
    goToLogin() {
      this.$emit('go-to-login'); // Emit event to parent to toggle visibility
    }
  }
};
</script>

<template>
  <div class="container ">
    <div class="box glass">
      <h2>Register</h2>
      <form @submit.prevent="register">
        <div class="form-group">
          <label for="newUsername">Username:</label>
          <input type="text" id="newUsername" v-model="newUsername" required>
        </div>
        <div class="form-group">
          <label for="newPassword">Password:</label>
          <input type="password" id="newPassword" v-model="newPassword" required>
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <a href="#" @click="goToLogin">Back to Login</a></p>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: linear-gradient(135deg, #f09, #3023ae);
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