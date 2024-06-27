<template>
  <div id="dashboard">
    <button @click="toggleDrawer" :class="{ active: drawerOpen }">
      <span class="material-icons">menu</span> Dashboard
    </button>
    <div :class="{ 'nav-drawer': true, open: drawerOpen }">
      <p>My Content</p>
      <div class="divider"></div>
      <a href="#/" :class="{ active: currentPath.value === '#/' }">Homebase</a>
      <a href="#/focus-mode" :class="{ active: currentPath.value === '#/focus-mode' }">Focus Mode</a>
      <a href="#/journal" :class="{ active: currentPath.value === '#/journal' }">Journal</a>
      <a href="#/stats" :class="{ active: currentPath.value === '#/stats' }">My Stats</a>
      <a href="#/profile" :class="{ active: currentPath.value === '#/profile' }">Profile</a>
      <div class="divider"></div>
      <a href="#/login" :class="{ active: currentPath.value === '#/login' }">Log-In</a>
      <a href="#/register" :class="{ active: currentPath.value === '#/register' }">Register Here!</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  props: {
    currentPath: {
      type: Object,
      required: true
    }
  },
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

<style scoped>
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

#dashboard {
  position: fixed;
  z-index: 2;
}

button {
  background-color: rgba(158, 104, 253, 0.45);
  backdrop-filter: blur(10px);
  padding: 12px 36px;
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
  height: 60px;
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
  height: 800px;
}

a {
  display: inline-block;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 8px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
  margin: 5px;
}

a.active {
  background-color: rgba(255, 0, 0, 0.8);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.3);
}

a:hover {
  background-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  transform: scale(1.05);
}

a:active {
  background-color: rgba(255, 255, 255, 0.3);
  transform: scale(0.98);
}

.divider {
  height: 1px;
  width: 90%;
  background-color: rgba(255, 255, 255, 0.48);
  margin: 15px auto;
}
</style>
