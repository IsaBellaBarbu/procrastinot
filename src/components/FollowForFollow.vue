<template>
  <div class="follow-for-follow glass">
    <h1>Watch Your Friends</h1>
    <input type="text" v-model="searchQuery" @input="searchUsers" placeholder="Find A Friend..." class="search-field glass">
    <div v-if="noResultsMessage" class="no-results">
      No User Found.
    </div>
    <div v-for="user in searchResults" :key="user.u_id" class="friend-field glass">
      <span>{{ user.u_name }}</span>
      <button @click="addFriend(user)">Add</button>
    </div>
    <h2>Your Friends</h2>
    <div v-for="friend in friends" :key="friend.u_id" class="friend-field glass">
      <span>{{ friend.u_name }}</span>
      <span>{{ friend.u_streak }} 🔥</span>
      <button class="delete-button" @click="removeFriend(friend.u_id)" v-if="friend.u_name !== ''">
        <i class="material-icons">delete</i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      searchResults: [],
      friends: JSON.parse(localStorage.getItem('friends')) || [],
      noResultsMessage: false,
      userId: 'actualUserId' // Replace with actual user ID from authentication/session
    };
  },
  methods: {
    async searchUsers() {
      if (this.searchQuery.length > 2) {
        try {
          const response = await fetch(`http://localhost:1234/searchUsers?query=${this.searchQuery}`);
          if (response.ok) {
            const data = await response.json();
            this.searchResults = data.users || [];
            this.noResultsMessage = this.searchResults.length === 0;
          } else {
            console.error('Search request failed with status:', response.status);
          }
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
      } else {
        this.searchResults = [];
        this.noResultsMessage = false;
      }
    },
    async addFriend(user) {
      if (this.friends.some(friend => friend.u_id === user.u_id)) {
        console.log('User is already a friend');
        return;
      }

      try {
        const response = await fetch('http://localhost:1234/follow', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ followerId: this.userId, followedId: user.u_id })
        });

        if (response.ok) {
          this.friends.push(user);
          localStorage.setItem('friends', JSON.stringify(this.friends));
        } else {
          console.error('Failed to add friend:', response.statusText);
        }
      } catch (error) {
        console.error('Error adding friend:', error);
      }
    },
    async removeFriend(friendId) {
      try {
        const response = await fetch('http://localhost:1234/unfollow', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ followerId: this.userId, followedId: friendId })
        });

        if (response.ok) {
          this.friends = this.friends.filter(friend => friend.u_id !== friendId);
          localStorage.setItem('friends', JSON.stringify(this.friends));
        } else {
          console.error('Failed to remove friend:', response.statusText);
        }
      } catch (error) {
        console.error('Error removing friend:', error);
      }
    }
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
h1, h2 {
  text-align: center;
  margin-bottom: 1rem;
}
.search-field {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1.5px solid rgba(255, 255, 255, 0.45);
  border-radius: 15px;
  background: linear-gradient(130deg, rgba(255, 255, 255, 0.22), rgba(94, 184, 231, 0.3));
  backdrop-filter: blur(3px);
  box-shadow: 0 8px 32px 0 rgba(217, 220, 234, 0.22);
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
  box-shadow: 0 8px 32px 0 rgba(217, 220, 234, 0.22);
  margin: 0.5rem 0;
  align-items: center;
}
button {
  background-color: rgba(241, 155, 223, 0.61);
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  color: white;
  cursor: pointer;
}
button:hover {
  background-color: rgba(224, 96, 197, 0.61);
}
.no-results {
  text-align: center;
  margin-top: 1rem;
  color: #ff7f7f;
}
.delete-button {
  background-color: rgba(255, 255, 255, 0);
  border: none;
  border-radius: 5px;
  padding: 0.5rem;
  cursor: pointer;
}
.delete-button:hover {
  background-color: rgba(255, 255, 255, 0);
}
.material-icons {
  font-size: 1.5rem;
  color: rgba(241, 155, 223, 0.61);
}
.material-icons:hover {
  font-size: 1.5rem;
  color: rgba(224, 96, 197, 0.61);
}
</style>
