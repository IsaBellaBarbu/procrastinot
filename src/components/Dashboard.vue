<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      drawerOpen: false
    };
  },
  methods: {
    toggleDrawer() {
      this.drawerOpen = !this.drawerOpen;
    }
  }
};
</script>

<template>
  <div id="dashboard">
    <button @click="toggleDrawer" :class="{ active: drawerOpen }">
      <span class="material-icons">menu</span> Dashboard
    </button>
    <div :class="{ 'nav-drawer': true, open: drawerOpen }">
      <p>My Content</p>
      <div class="divider"></div>
      <a href="#/">Homebase </a>
      <a href="#/focus-mode">Focus Mode</a>
      <a href="#/journal">Journal here you bitch </a>
      <a href="#/stats">My Stats</a>
      <div class="divider"></div>
      <a href="#/login">Log-In </a>
      <a href="#/register">Register Here! </a>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

#dashboard {
  position: fixed;
  height: 100%;
  z-index: 2;
}

button {
  background-color: rgba(158, 104, 253, 0.45);
  backdrop-filter: blur(10px);
  padding: 12px;
  font-size: 16px;
  color: white;
  display: flex;
  align-items: center;
}

button:hover {
  background-color: rgba(171, 135, 224, 0.66);
  cursor: pointer;
}

.material-icons {
  margin-right: 8px;
  font-size: 24px;
}

p {
  font-size: 22px;
  padding-top: 10px;
  padding-bottom: 10px;
  text-align: center;
}

.nav-drawer {
  width: 190px;
  height: 100%;
  background-color: rgba(158, 104, 253, 0.45);
  backdrop-filter: blur(10px);
  color: white;
  padding: 15px;
  transition: transform 0.3s ease;
  transform: translateX(-100%);
  position: absolute;
}

.nav-drawer.open {
  transform: translateX(0);
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
  height: 100%;
}

a {
  display: inline-block;
  background: rgba(255, 255, 255, 0.1); /* Semi-transparent background */
  color: white;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 8px;
  backdrop-filter: blur(10px); /* Frosted glass effect */
  -webkit-backdrop-filter: blur(10px); /* For Safari */
  border: 1px solid rgba(255, 255, 255, 0.2); /* Optional border for better visibility */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
  margin: 5px; /* Adjust margin if needed */
}

a:hover {
  background: rgba(255, 255, 255, 0.2); /* Slightly less transparent on hover */
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  transform: scale(1.05); /* Slightly scale up on hover */
}

a:active {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(0.98); /* Slightly scale down on active */
}

.divider {
  height: 1px;
  width: 90%;
  background-color: rgba(255, 255, 255, 0.48);
  margin: 15px auto;
}
</style>
