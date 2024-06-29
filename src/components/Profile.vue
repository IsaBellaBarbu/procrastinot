<template>
  <div class="glass">
    <div class="profile-container">
      <div class="profile-picture"></div>
      <div class="nickname">
        <input type="text" placeholder="Enter Nickname" />
      </div>
      <div class="username">
        <span>@username_placeholder</span>
      </div>
    </div>
    <div class="glass basic-info">
      <h2>Basic Information</h2>
      <div class="info-box">
        <div class="info-item">
          <span class="info-label">Username:</span>
          <span class="info-value" v-if="!editingUsername">{{ username }}</span>
          <input
              v-else
              type="text"
              v-model="username"
              @keyup.enter="saveUsername"
              @blur="saveUsername"
          />
          <button class="edit-button" @click="toggleEdit('username')">
            <span class="material-icons">{{ editingUsername ? 'check' : 'edit' }}</span>
          </button>
        </div>
        <div class="info-item">
          <span class="info-label">E-Mail:</span>
          <span class="info-value" v-if="!editingEmail">{{ email }}</span>
          <input
              v-else
              type="email"
              v-model="email"
              @keyup.enter="saveEmail"
              @blur="saveEmail"
          />
          <button class="edit-button" @click="toggleEdit('email')">
            <span class="material-icons">{{ editingEmail ? 'check' : 'edit' }}</span>
          </button>
        </div>
      </div>
    </div>
    <h2 class="overview-header">Overview</h2>
    <div class="glass overview">
      <div class="overview-content">
        <div class="streak-info">
          <div class="flame-icon">
            <svg xmlns="http://www.w3.org/2000/svg" class="heart-icon" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
              <path d="M240-400q0 52 21 98.5t60 81.5q-1-5-1-9v-9q0-32 12-60t35-51l113-111 113 111q23 23 35 51t12 60v9q0 4-1 9 39-35 60-81.5t21-98.5q0-50-18.5-94.5T648-574q-20 13-42 19.5t-45 6.5q-62 0-107.5-41T401-690q-39 33-69 68.5t-50.5 72Q261-513 250.5-475T240-400Zm240 52-57 56q-11 11-17 25t-6 29q0 32 23.5 55t56.5 23q33 0 56.5-23t23.5-55q0-16-6-29.5T537-292l-57-56Zm0-492v132q0 34 23.5 57t57.5 23q18 0 33.5-7.5T622-658l18-22q74 42 117 117t43 163q0 134-93 227T480-80q-134 0-227-93t-93-227q0-129 86.5-245T480-840Z"/>
            </svg>
          </div>
          <div class="streak-count">
            <span>{{ streak }}</span>
          </div>
          <div class="usage-duration">
            <span>{{ getUsageDuration(streak) }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="glass joined-info">
      <h2>Joined</h2>
      <div class="info-box">
        <div class="info-item">
          <span class="info-label">Date:</span>
          <span class="info-value">{{ joinedDate }}</span>
        </div>
        <div class="info-item">
          <div class="followers">
            <span class="number">14</span>
            <span>Followers</span>
          </div>
          <div class="divider"></div>
          <div class="following">
            <span class="number">11</span>
            <span>Following</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  data() {
    return {
      username: '@username_placeholder',
      email: 'email_placeholder@example.com',
      editingUsername: false,
      editingEmail: false,
      streak: 85, // Example streak count, replace with actual data from your application
      joinedDate: 'January 1, 2023' // Placeholder for joined date, replace with actual date
    };
  },
  methods: {
    toggleEdit(field) {
      if (field === 'username') {
        this.editingUsername = !this.editingUsername;
        if (!this.editingUsername) {
          this.saveUsername();
        }
      } else if (field === 'email') {
        this.editingEmail = !this.editingEmail;
        if (!this.editingEmail) {
          this.saveEmail();
        }
      }
    },
    saveUsername() {
      this.editingUsername = false;
      // Save username logic here
    },
    saveEmail() {
      this.editingEmail = false;
      // Save email logic here
    },
    getUsageDuration(streak) {
      const days = streak;
      const years = Math.floor(days / 365);
      const remainingDays = days % 365;
      const months = Math.floor(remainingDays / 30);
      const remainingMonths = remainingDays % 30;

      return `${remainingDays} Days ${months} Months ${years} Years`;
    }
  }
};
</script>

<style scoped>
.glass {
  padding: 5rem;
  width: 100%;
  display: flex;
  align-content: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 32px;
}

.profile-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.profile-picture {
  width: 150px;
  height: 150px;
  background-color: #e0e0e0;
  border-radius: 50%;
  margin-bottom: 20px;
}

.nickname input {
  padding: 10px;
  border: 1px solid #e8e8e8;
  border-radius: 5px;
  margin-bottom: 10px;
}

input{
  color: white;
  border-color: floralwhite;
}
.username span {
  color: #ffe6e6;
}

.basic-info {
  display: flex;
  align-items: start;
  justify-content: center;
  flex-direction: column;
  background: linear-gradient(130deg, rgba(255, 255, 255, 0.22), rgba(94, 184, 231, 0.3));
  box-shadow: 0 8px 32px 0 rgba(217, 220, 234, 0.22);
  backdrop-filter: blur(3px);
  border: 1.5px solid rgba(255, 255, 255, 0.45);
  border-radius: 15px;
  margin-top: 20px;
}

.basic-info h2 {
  color: #ffffff;
  margin-bottom: 20px;
}

.info-box {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.info-item {
  color: white;
  display: flex;
  align-items: center;
  gap: 10px;
}

.info-label {
  color: #ffffff;
}

.edit-button {
  color: white;
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
}

.edit-button:hover {
  color: white;
  background-color: rgba(169, 188, 255, 0.76);
  border-radius: 100%;

}

.overview-header {
  color: white;
  margin-top: 20px;
}

.overview {
  background: linear-gradient(130deg, rgba(255, 255, 255, 0.22), rgba(94, 184, 231, 0.3));
  box-shadow: 0 8px 32px 0 rgba(217, 220, 234, 0.22);
  backdrop-filter: blur(3px);
  border: 1.5px solid rgba(255, 255, 255, 0.45);
  padding: 2rem;
  border-radius: 15px;
  margin-top: 20px;
  display: flex;
  align-items: start;
  justify-content: center;
  flex-direction: column;
}

.streak-info {
  color: white;
  display: flex;
  align-items: center;
}

.flame-icon {
  margin-right: 10px;
  color: white;

}

.streak-count {
  color: white;
  font-size: 24px;
  font-weight: bold;
}

.usage-duration {
  color: #ffffff;
}

.usage-duration span{
  color: #e9b800;
}

.joined-info {
  display: flex;
  align-items: start;
  justify-content: center;
  flex-direction: column;
  background: linear-gradient(130deg, rgba(255, 255, 255, 0.22), rgba(94, 184, 231, 0.3));
  box-shadow: 0 8px 32px 0 rgba(217, 220, 234, 0.22);
  backdrop-filter: blur(3px);
  border: 1.5px solid rgba(255, 255, 255, 0.45);
  border-radius: 15px;
  margin-top: 20px;
  padding: 2rem;
}

.joined-info h2 {
  color: #ffffff;
  margin-bottom: 20px;
}

.followers,
.following {
  color: white;
  display: flex;
  align-items: center;
  gap: 10px;
}

.divider {
  height: 24px;
  border-left: 1px solid #f1e9e9;
  margin: 0 10px;
}

.number {
  color: #ffdede;
  font-size: 30px;
  font-weight: bold;
}
</style>
