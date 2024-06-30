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
    </div>
    <div v-if="followRequests.length > 0" class="follow-requests glass">
      <h2>Follow Requests From:</h2>
      <div v-for="request in followRequests" :key="request.requestId" class="follow-request">
        <span>{{ request.username }}</span>
        <button @click="acceptFollowRequest(request.requestId)">Accept</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      searchResults: [],
      friends: [],
      followRequests: [],
      noResultsMessage: false
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
      const followerId = this.$root.userId; // Ensure this is correctly set
      try {
        const response = await fetch('http://localhost:1234/follow', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ followerId, followedId: user.u_id })
        });

        if (response.ok) {
          // Optimistically add the friend
          this.friends.push({
            u_id: user.u_id,
            u_name: user.u_name,
            u_streak: user.u_streak // Assuming you receive this from the server
          });

          // Optionally, re-fetch friends to ensure data consistency
          // await this.fetchFriends();
        } else {
          console.error('Failed to add friend:', response.statusText);
        }
      } catch (error) {
        console.error('Error adding friend:', error);
      }
    },
    async fetchFriends() {
      try {
        const response = await fetch(`http://localhost:1234/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username: this.$root.username, password: this.$root.password })
        });
        if (response.ok) {
          const data = await response.json();
          this.friends = data.friends || [];
        } else {
          console.error('Failed to fetch friends:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching friends:', error);
      }
    },
    async fetchFollowRequests() {
      try {
        const response = await fetch(`http://localhost:1234/followRequests`);
        if (response.ok) {
          const data = await response.json();
          this.followRequests = data.requests || [];
        } else {
          console.error('Failed to fetch follow requests:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching follow requests:', error);
      }
    },
    async acceptFollowRequest(requestId) {
      try {
        const response = await fetch('http://localhost:1234/acceptFollowRequest', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ requestId })
        });
        if (response.ok) {
          // Re-fetch friends and follow requests
          await this.fetchFriends();
          await this.fetchFollowRequests();
        } else {
          console.error('Failed to accept follow request:', response.statusText);
        }
      } catch (error) {
        console.error('Error accepting follow request:', error);
      }
    }
  },
  created() {
    this.fetchFriends();
    this.fetchFollowRequests();
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
}
button {
  background-color: #5eb8e7;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  color: white;
  cursor: pointer;
}
button:hover {
  background-color: #4aa2c4;
}
.no-results {
  text-align: center;
  margin-top: 1rem;
  color: #ff7f7f;
}
.follow-requests {
  margin-top: 2rem;
  padding: 1rem;
  background: linear-gradient(130deg, rgba(255, 255, 255, 0.22), rgba(94, 184, 231, 0.3));
  backdrop-filter: blur(3px);
  border-radius: 15px;
  border: 1.5px solid rgba(255, 255, 255, 0.45);
  box-shadow: 0 8px 32px 0 rgba(217, 220, 234, 0.22);
  width: 100%;
}
.follow-request {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}
</style>
