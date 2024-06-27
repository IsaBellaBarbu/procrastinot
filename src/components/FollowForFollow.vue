<template>
  <div class="follow-for-follow glass">
    <h1>Watch Your Friends</h1>
    <div v-for="friend in friends" :key="friend.name" class="friend-field glass">
      <span>{{ friend.name }}</span>
      <span>{{ friend.streak }} 🔥</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      friends: [
        { name: 'Friend 1', streak: 94 },
        { name: 'Friend 2', streak: 23 },
        { name: 'Friend 3', streak: 45 }
      ]
    };
  }
};
</script>

<style scoped>
.follow-for-follow {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 64px;
}
h1 {
  text-align: center;
  margin-bottom: 1rem;
}
.friend-field {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 1rem;
  background: linear-gradient(130deg, rgba(255, 255, 255, 0.22), rgba(94, 184, 231, 0.3));
  backdrop-filter: blur(3px);
  border-radius: 15px;
  border: 1.5px solid rgba(255, 255, 255, 0.45);
  margin: 0.5rem 0;
}
</style>


