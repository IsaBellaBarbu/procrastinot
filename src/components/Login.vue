<script>
export default {
  name: 'Login',
  components: {
    Register: () => import('./Register.vue')
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
    async login() {
      try {
        const response = await fetch('http://localhost:1234/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username: this.username, password: this.password })
        });
        const data = await response.json();
        if (response.ok) {
          localStorage.setItem('token', data.token);
          this.$router.push('/');
        } else {
          console.error('Login failed:', data.message);
        }
      } catch (error) {
        console.error('Login error:', error);
      }
    },
    async register(newUser) {
      try {
        const response = await fetch('http://localhost:1234/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          body: JSON.stringify(newUser)
        });
        const data = await response.json();
        if (response.ok) {
          this.showRegisterForm = false;
          this.showLoginForm = true;
          this.$router.push('/');
        } else {
          console.error('Registration failed:', data.message);
        }
      } catch (error) {
        console.error('Registration error:', error);
      }
    },
    toggleRegisterForm() {
      this.showLoginForm = !this.showLoginForm;
      this.showRegisterForm = !this.showRegisterForm;
    },
    goToLogin() {
      this.showRegisterForm = false;
      this.showLoginForm = true;
    }
  }
};
</script>


<template>
  <div class="login-container">
    <div class="content-block" v-if="showLoginForm">
      <div class="form-section">
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
        <p class="register-link">Don't have an account? <a href="#" @click="toggleRegisterForm">Register</a></p>
      </div>
    </div>
    <register v-if="showRegisterForm" @register="register" @cancel="toggleRegisterForm" @go-to-login="goToLogin"></register>
  </div>
</template>


<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  padding: 2rem;
}

.content-block {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 3rem;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.47);
  width: 100%;
  max-width: 1200px;
}

.form-section {
  width: 100%;
  max-width: 540px;
  margin: 1rem 0;
}

h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #FFD0EB;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  width: 100%;
}

label {
  font-size: 1rem;
  color: #FFD0EB;
  margin-bottom: 0.5rem;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: none;
  border-radius: 8px;
  backdrop-filter: blur(5px);
  background: rgba(255, 255, 255, 0.2);
  color: #FFD0EB;
  font-size: 1rem;
}

input:focus {
  outline: none;
  box-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
}

button {
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 8px;
  background-color: rgba(152, 20, 96, 0.7);
  color: #FFD0EB;
  cursor: pointer;
  font-size: 1rem;
  width: 100%;
  align-self: center;
  margin-top: 1rem;
}

button:hover {
  background-color: rgba(148, 28, 91, 0.48);
}

.register-link {
  padding: 0.5rem;
  margin-top: 2rem;
  text-align: center;
}

a {
  color: #FFD0EB;
  text-decoration: underline;
  cursor: pointer;
}

a:hover {
  text-decoration: none;
  color: #FFD0EB;
}
</style>
