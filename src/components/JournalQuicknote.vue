<script>
import JournalTemplate from './JournalTemplate.vue';
import dotted from '@/assets/images/dotted.png'

export default {
  name: 'JournalQuicknote',
  components: {
    JournalTemplate
  },
  data() {
    return {
      categories: ['Trauma-Dump', 'Relationships', 'Bucket List', 'Routines', 'Goals', 'Gym', 'Reading'],
      showCategories: false,
      selectedCategory: '',
      showCategoryPopup: false
    };
  },
  methods: {
    toggleCategories() {
      this.showCategories = !this.showCategories;
    },
    selectCategory(category) {
      this.selectedCategory = category;
      this.showCategories = false;
      this.showCategoryPopup = true;
    },
    closeCategoryPopup() {
      this.showCategoryPopup = false;
    },
    closeQuicknote() {
      this.showCategoryPopup = false;
      // Additional logic to handle closing the quicknote
    }
  }
};
</script>

<template>
  <div class="journal-quicknote">
    <div class="content glass" :style="{ backgroundImage: 'url(' + dotted + ')' }">
      <p> Lets Create a Quick Journal entry. </p>
      <div class="backdrop" @click="closeQuicknote" v-if="showCategoryPopup"></div>
      <div class="quicknote-header">
        <button @click="toggleCategories" class="category-btn" :class="{ 'active': showCategories }">Category</button>
        <transition name="slide">
          <div v-if="showCategories" class="category-dropdown">
            <ul>
              <li v-for="category in categories" :key="category" @click="selectCategory(category)">{{ category }}</li>
            </ul>
          </div>
        </transition>
      </div>
      <div class="quicknote-content">
        <!-- Quicknote content -->
      </div>
      <transition name="pop-up">
        <div v-if="showCategoryPopup" class="category-popup">
          <JournalTemplate :categoryName="selectedCategory" @done="closeCategoryPopup" />
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
.journal-quicknote {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
}

.glass {
  display: flex;
  align-content: center;
  justify-content: center;
  flex-direction: column;
  padding: 40px;
  width: 100%;
  height: 600px;
  max-width: 600px;
  background: linear-gradient(130deg, rgba(255, 255, 255, 0.22), rgba(94, 184, 231, 0.3));
  box-shadow: 0 8px 32px 0 rgba(217, 220, 234, 0.22);
  backdrop-filter: blur(3px);
  border: 1.5px solid rgba(255, 255, 255, 0.45);
  border-radius: 10px;
  gap: 20px;
  box-sizing: border-box;
}

p {
  text-align: center;
  font-family: monospace;
  color: #ffffff;
  padding: 10px;
}

.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.12); /* Dark transparent background */
  z-index: 9998; /* Ensure the backdrop is behind the category popup */
}

.quicknote-header {
  display: flex;
  justify-content: flex-end;
  position: relative;
}

.category-btn {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  color: #151567;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding: 10px 20px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s;
}

.category-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.category-btn.active {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.category-dropdown {
  position: absolute;
  top: calc(100% + 5px); /* Adjust positioning */
  right: 0; /* Align dropdown to the right side */
  background: rgba(255, 255, 255, 0.55); /* Adjust opacity */
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  padding: 10px;
  z-index: 9997; /* Ensure the dropdown is above other content */
  width: max-content;
}

.category-dropdown ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.category-dropdown ul li {
  cursor: pointer;
  padding: 10px;
  border-radius: 5px;
  transition: background 0.3s;
  color: #151567; /* Adjust text color */
}

.category-dropdown ul li:hover {
  background: rgba(255, 255, 255, 0.7); /* Highlight color on hover */
}

.category-popup {
  position: fixed;
  width: 90%;
  max-width: 500px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  padding: 20px;
  border-radius: 10px;
  backdrop-filter: blur(3px);
  background: linear-gradient(130deg, rgba(255, 255, 255, 0.22), rgba(94, 184, 231, 0.3));
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

@media (min-width: 768px) {
  .journal-quicknote {
    padding: 40px;
  }
  .glass {
    padding: 60px;
  }
  p {
    font-size: 18px;
  }
  .category-btn {
    font-size: 16px;
  }
}

@media (min-width: 1024px) {

  .glass {
    padding: 20px;
  }
  p {
    font-size: 20px;
  }
  .category-btn {
    font-size: 18px;
  }
}
</style>
