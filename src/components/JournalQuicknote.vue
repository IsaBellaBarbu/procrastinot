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
    <div class="content  glass" :style="{ backgroundImage: 'url(' + dotted + ')' }">
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
  height: 640px;
  border: 1px solid #2c3e50;
  border-radius: 2px;
  background-color: rgba(11, 222, 147, 0.73);
  padding: 100px;
}

.glass{
  display: flex;
  align-content: center;
  justify-content: center;
  flex-direction: column;
  padding: 80px;
  width: 100%;
  background: rgba(215, 237, 245, 0.47);
  box-shadow: 0 12px 50px 0 rgba(3, 15, 63, 0.66);
  backdrop-filter: blur( 5px );
  -webkit-backdrop-filter: blur( 10px );
  border-radius: 10px;
  border: 1px solid rgba( 255, 255, 255, 0.18 );
  gap: 20px;

}

p{
  text-align: start;
  flex-wrap: wrap;
  font-family: monospace;
  font-size: 20px;
  color: #151567;
  padding: 20px;

}
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.73); /* Dark transparent background */
  z-index: 9998; /* Ensure the backdrop is behind the category popup */
}

.quicknote-header {
  display: flex;
  justify-content: flex-end; /* Align items to the right */
  padding: 10px;
  position: relative;
}

.category-btn {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  color: #151567; /* Adjust text color */
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
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
  background: rgba(255, 255, 255, 0.9); /* Adjust opacity */
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
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  background: linear-gradient(to bottom right, rgba(253, 207, 244, 0.59), #f8b7bc);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}
</style>

