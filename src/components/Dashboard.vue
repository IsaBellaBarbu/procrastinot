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
    <button @click="toggleDrawer" :class="{ active: drawerOpen }">Dashboard</button>
    <div :class="{ 'nav-drawer': true, open: drawerOpen }">
      <p>Navigation Drawer Content</p>
    </div>
  </div>
</template>

<style scoped>
#dashboard {
  display: inline-block;
  flex-direction: column;
  align-items: flex-start;
}

button {
  background-color: #6f00ff;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

button:hover {
  background-color: #5a00cc;
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

button:active {
  background-color: #4c00a3;
}

.nav-drawer {
  width: 100%;
  height: 100%;
  background-color: #7323fc;
  color: white;
  padding: 15px;
  transition: transform 0.3s ease;
  transform: translateX(-100%);
}

.nav-drawer.open {
  transform: translateX(0);
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
  height: 100%;
}
</style>