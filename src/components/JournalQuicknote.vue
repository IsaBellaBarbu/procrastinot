<script>
import JournalCategory from './JournalCategory.vue';

export default {
  name: 'JournalQuicknote',
  components: {
    JournalCategory
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
        <JournalCategory :categoryName="selectedCategory" @done="closeCategoryPopup" />
      </div>
    </transition>
  </div>
</template>

<style scoped>
.journal-quicknote {
  position: relative;
  width: 100%;
  border: #2c3e50;
  border-radius: 2px;
  background-color: #e9b800;
}

.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent; /* Transparent */
  z-index: 9998; /* Ensure the backdrop is behind the category popup */
}

.category-btn {
  background-color: #ff6347; /* Reddish color */
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
}

.category-btn.active {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.category-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #f0e6eb; /* Pinkish color */
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
}

.category-dropdown ul {
  list-style: none;
  padding: 0;
}

.category-dropdown ul li {
  cursor: pointer;
}

.category-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
}



</style>