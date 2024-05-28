<script>
export default {
  data() {
    return {}
  }
};
</script>

<template>
<v-navigation-drawer expand-on-hover rail app v-model="drawer" class="primary">
  <v-list>
    <v-list-item
        subtitle="display username maybe"
        title="My Dashboard"
    ></v-list-item>
  </v-list>
  <v-divider></v-divider>
</v-navigation-drawer>

  <v-list density="compact" nav>
    <v-list-item prepend-icon="mdi-account-multiple" title="Login" ></v-list-item>
    <v-list-item prepend-icon="mdi-circle" title="I like Waffle Fries" ></v-list-item>
    <v-list-item prepend-icon="mdi-star" title="Starred" ></v-list-item>
  </v-list>

  <v-main style="height: 250px"></v-main>
</template>

<style scoped>

</style>