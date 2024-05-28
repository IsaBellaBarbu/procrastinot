<script>
import notion from '@/notionApi';

export default {
  data() {
    return {
      tasks: [],
    };
  },
  methods: {
    async getTasks() {
      try {
        const response = await notion.databases.query({
          database_id: 'YOUR_DATABASE_ID',
        });
        this.tasks = response.results;
      } catch (error) {
        console.error('Error fetching tasks from Notion', error);
      }
    },
  },
};
</script>

<template>
  <div>
    <button @click="getTasks">Load Notion Tasks</button>
    <ul>
      <li v-for="task in tasks" :key="task.id">{{ task.properties.Name.title[0].text.content }}</li>
    </ul>
  </div>
</template>

<style scoped>

</style>