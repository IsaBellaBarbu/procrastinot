<template>
  <div class="register-container">
    <div class="content-block">
      <div class="info-section">
        <h2>Create an Account for Procrastinot</h2>
        <p>Join Procrastinot today and start building habits that will help you achieve your goals. This platform aims to support you with easily tracking your progress and staying motivated. Hence, don't wait any longer — Sign Up now and take the first step towards a better you!</p>
      </div>
      <div class="divider"></div>
      <div class="form-section">
        <h2>Register</h2>
        <form @submit.prevent="register">
          <div class="form-group">
            <label for="newUsername">Create Username:</label>
            <input type="text" id="newUsername" v-model="newUsername" required>
          </div>
          <div class="form-group">
            <label for="newPassword">Create Password:</label>
            <input type="password" id="newPassword" v-model="newPassword" required>
          </div>
          <button type="submit">Sign Up</button>
        </form>
        <p class="login-link">Already have an account? <a href="#" @click="showLogin">Back to Login</a></p>
      </div>
    </div>
  </div>
</template>

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
    async register() {
      try {
        const response = await fetch('http://localhost:1234/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username: this.newUsername, password: this.newPassword })
        });
        const data = await response.json();
        if (response.ok) {
          alert('User registered successfully');
          window.location.hash = '/login';
        } else {
          console.error('Registration failed:', data.message);
          alert('Registration failed: ' + data.message);
        }
      } catch (error) {
        console.error('Registration error:', error);
        alert('Registration error: ' + error.message);
      }
    },
    showLogin() {
      window.location.hash = '/login';
    }
  }
};
</script>


<style scoped>
.register-container {
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

.info-section, .form-section {
  width: 100%;
  max-width: 540px;
  margin: 1rem 0;
}

.divider {
  width: 100%;
  height: 2px;
  background-color: rgba(255, 255, 255, 0.3);
  margin: 1rem 0;
}

h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #FFD0EB;
}

p {
  font-size: 1rem;
  color: #FFD0EB;
  line-height: 1.5;
  text-align: justify;
  padding: 3rem;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
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

.login-link {
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

@media (min-width: 768px) {
  .content-block {
    flex-direction: row;
  }

  .info-section, .form-section {
    margin: 0;
    max-width: 50%;
  }

  .info-section {
    padding-right: 2rem;
  }

  .form-section {
    padding-left: 2rem;
  }

  .divider {
    width: 2px;
    height: auto;
    background-color: rgba(255, 255, 255, 0.3);
    margin: 0 1rem;
  }
}
</style>
