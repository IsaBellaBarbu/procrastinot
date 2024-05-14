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
  <div class="container">
  <div class="box">
    <h2>Register</h2>
    <form @submit.prevent="register">
      <div>
        <label for="newUsername">Username:</label>
        <input type="text" id="newUsername" v-model="newUsername" required>
      </div>
      <div>
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
  height: 50vh;
}

.box {
  border: 1px solid #132e24;
  padding: 20px;
  max-width: 400px;
  width: 100%;
  background-color: #fff;
}
</style>