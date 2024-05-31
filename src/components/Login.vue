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
  <div class="container ">
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
        <button type="submit" style="display: none;">Hidden Submit Button</button>
      </form>
      <button class="button button--pen" @click="login">
        <div class="button__wrapper">
          <span class="button__text">Sign In</span>
        </div>
        <div class="characterBox">
          <div class="character wakeup">
            <div class="character__face"></div>
            <div class="character__face2"></div>
          </div>
          <div class="character wakeup">
            <div class="character__face"></div>
            <div class="character__face2"></div>
          </div>
          <div class="character">
            <div class="character__face"></div>
            <div class="character__face2"></div>
          </div>
        </div>
      </button>
      <p>Don't have an account? <a href="#" @click="toggleRegisterForm">Register</a></p>
    </div>
  </div>
  <register v-if="showRegisterForm" @register="register" @cancel="toggleRegisterForm" @go-to-login="goToLogin"></register>
</template>


<style>

.container{
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #5b4b10;
}


.box {
  border: 1.5px solid #132e24;
  padding: 35px;
  max-width: 400px;
  width: 100%;
  background-color: #0bde93;
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


.button--pen {
  --main_color: #484444;
  --sub_color1: #fff;
  --sub_color2: #e9b800;
  --base_color: #e9b800;
  --border_radius1: 60px 60px 40px 40px / 48px 48px 30px 30px;
  --border_radius2: 70px 70px 40px 40px / 48px 48px 30px 30px;
  --border_radius3: 40px 40px 40px 40px / 48px 48px 30px 30px;
}
.button {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 280px;             /* change button size general */
  height: 80px;             /* change button size general */
  box-sizing: border-box;
  text-decoration: none;
  border: solid 3px #000;
  border-radius: 40px;
  background: var(--main_color);
  font-family: "Fredoka One", cursive;
}
.button::before {
  content: "";
  position: absolute;
  z-index: 2;
  top: 0;
  right: 20px;
  bottom: 0;
  margin: auto 0;
  width: 24px;
  height: 24px;
  background: var(--base_color);
  transition: all ease 0.2s;
}
.button__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  border-radius: 40px;
  overflow: hidden;
}
.button__wrapper::before,
.button__wrapper::after {
  transition: all 0.5s ease;
}
.characterBox {
  position: absolute;
  top: -54px;
  left: 0;
  right: 0;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 180px;
  height: 56px;
}
.button__text {
  position: relative;
  z-index: 3;
  font-size: 32px;
  letter-spacing: 4px;
  color: var(--base_color);
  transition: all 0.3s ease;
}
.character {
  position: relative;
  width: 56px;
  height: 36px;
  box-sizing: border-box;
  border: solid 3px #000;
  background: var(--main_color);
  border-radius: var(--border_radius1);
  animation: sleep 1s ease infinite alternate;
}
.character::before {
  content: "";
  position: absolute;
  top: -12px;
  left: 22px;
  width: 12px;
  height: 12px;
  background: #000;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23fff' d='M10.23,3.32c-3.54,.63-5.72,2.51-7.02,4.23-.33-1.58-.34-3.54,.93-5.12,.52-.65,.41-1.59-.24-2.11C3.24-.19,2.29-.08,1.77,.57c-3.82,4.77-.31,11.11-.13,11.42,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0-.01-.02,2.49,.04,2.52,0,.1-.14,1.54-4.82,6.59-5.71,.82-.14,1.37-.92,1.22-1.74s-.94-1.36-1.75-1.21Z'/%3E%3C/svg%3E");

}
.character__face {
  position: absolute;
  z-index: 2;
  top: 15px;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 12px;
  height: 6px;
  background: var(--sub_color2);
  border-radius: 50% 50% 50% 50% / 78% 78% 22% 22%;
  transition: 0.2s;
}
.character__face::before,
.character__face::after {
  content: "";
  position: absolute;
  top: -4px;
  width: 8px;
  height: 2px;
  border-radius: 4px;
  background: #000;
}
.character__face::before {
  left: -5px;
}
.character__face::after {
  right: -5px;
}

.button--pen .charactor__face2 {
  position: absolute;
  z-index: 1;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 30px;
  height: 10px;
  border-radius: 50%;
  background: #fff;
  animation: face_pen 1s ease infinite alternate;
}
.button--pen .charactor__face2::before,
.button--pen .charactor__face2::after {
  content: "";
  position: absolute;
  top: -8px;
  width: 17px;
  height: 10px;
  border-radius: 50%;
  background: #fff;
}
.button--pen .charactor__face2::before {
  left: -4px;
}
.button--pen .charactor__face2::after {
  right: -4px;
}

.button--pen::before {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23fff' d='M23.36,10.63L6.18,.13c-.93-.57-1.85,.81-1.39,2.06l1.44,3.91c.3,.81,.01,1.81-.6,2.1L.72,10.58c-.96,.47-.96,2.37,0,2.83l4.91,2.38c.62,.3,.9,1.29,.6,2.1l-1.44,3.91c-.46,1.26,.46,2.63,1.39,2.06L23.36,13.37c.86-.53,.86-2.22,0-2.75Z'/%3E%3C/svg%3E");
}

.button--pen .button__wrapper::before,
.button--pen .button__wrapper::after {
  content: "";
  position: absolute;
  width: 110px;
  height: 60px;
  background: var(--sub_color1);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cpath fill='%23fff' d='M9.12,14.14L43.15,.5c1.61-.86,3.57-.59,4.9,.68l19.55,14.31c.42,.4,.76,.89,.99,1.42l3.45,13.09c.89,2.06,3.18,3.09,5.28,2.37l11.76-4.86c1.56-.54,3.29-.11,4.43,1.1l11.93,12.39c.48,.51,.84,1.12,1.03,1.8l3.35,11.62c.8,2.79-1.25,5.58-4.1,5.58H4.27c-2.71,0-4.73-2.54-4.18-5.24L6.92,17.11c.26-1.28,1.07-2.37,2.2-2.97Z'/%3E%3C/svg%3E");
}
.button--pen .button__wrapper::before {
  left: -16px;
  bottom: -10px;
}
.button--pen .button__wrapper::after {
  right: -8px;
  bottom: -20px;
  transform: rotateY(180deg);
}
.button:hover .button__wrapper::before {
  transform: translateX(-12px);
}
.button:hover .button__wrapper::after {
  transform: rotateY(180deg) translateX(-12px);
}
.button:hover .button__text {
  letter-spacing: 6px;
}
.button:hover::before {
  right: 14px;
}
.button:hover .wakeup {
  animation: wakeup 0.2s ease;
  animation-fill-mode: forwards;
}
.button:hover .wakeup .character__face {
  top: 20px;
}
.button:hover .wakeup .character__face::before,
.button:hover .wakeup .character__face::after {
  animation: eye 5s linear infinite;
}
.button:hover .wakeup:nth-child(2) .character__face::before,
.button:hover .wakeup:nth-child(2) .character__face::after {
  animation: eye_2 5s linear infinite;
}

.button--pen:hover .wakeup .charactor__face2 {
  animation: face_pen_wakeup 0.2s ease;
  animation-fill-mode: forwards;
}
.button--pen:hover .wakeup .charactor__face2::before,
.button--pen:hover .wakeup .charactor__face2::after {
  top: -12px;
  height: 18px;
}
@keyframes sleep {
  0% {
    height: 36px;
    border-radius: var(--border_radius1);
  }
  100% {
    height: 32px;
    border-radius: var(--border_radius2);
  }
}
@keyframes wakeup {
  0% {
    height: 32px;
    border-radius: var(--border_radius2);
  }
  100% {
    height: 56px;
    border-radius: var(--border_radius3);
  }
}
@keyframes eye {
  0% {
    top: -6px;
    width: 6px;
    height: 6px;
  }
  30% {
    top: -6px;
    width: 6px;
    height: 6px;
  }
  32% {
    top: -4px;
    width: 8px;
    height: 2px;
  }
  34% {
    top: -6px;
    width: 6px;
    height: 6px;
  }
  70% {
    top: -6px;
    width: 6px;
    height: 6px;
  }
  72% {
    top: -4px;
    width: 8px;
    height: 2px;
  }
  74% {
    top: -6px;
    width: 6px;
    height: 6px;
  }
  76% {
    top: -4px;
    width: 8px;
    height: 2px;
  }
  78% {
    top: -6px;
    width: 6px;
    height: 6px;
  }
  100% {
    top: -6px;
    width: 6px;
    height: 6px;
  }
}
@keyframes eye_2 {
  0% {
    top: -6px;
    width: 6px;
    height: 6px;
  }
  10% {
    transform: translateX(0);
  }
  12% {
    transform: translateX(3px);
  }
  20% {
    top: -6px;
    width: 6px;
    height: 6px;
  }
  22% {
    top: -4px;
    width: 8px;
    height: 2px;
  }
  24% {
    top: -6px;
    width: 6px;
    height: 6px;
  }
  25% {
    transform: translateX(3px);
  }
  27% {
    transform: translateX(0);
  }
  74% {
    top: -6px;
    width: 6px;
    height: 6px;
    transform: translateX(0);
  }
  76% {
    top: -4px;
    width: 8px;
    height: 2px;
    transform: translateX(3px);
  }
  78% {
    top: -6px;
    width: 6px;
    height: 6px;
  }
  80% {
    top: -4px;
    width: 8px;
    height: 2px;
  }
  82% {
    top: -6px;
    width: 6px;
    height: 6px;
  }
  85% {
    transform: translateX(3px);
  }
  87% {
    transform: translateX(0);
  }
  100% {
    top: -6px;
    width: 6px;
    height: 6px;
    transform: translateX(0);
  }
}

@keyframes face_pen {
  0% {
    height: 14px;
  }
  100% {
    height: 10px;
  }
}
@keyframes face_pen_wakeup {
  0% {
    height: 14px;
  }
  100% {
    height: 28px;
  }
}

.container {
  width: 100%;
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #fff;
}
.button:not(:last-child) {
  margin-bottom: 80px;
}


.box p {
  margin-top: 15px; /* Increase the space between "Sign In" button and following text */
}
</style>
