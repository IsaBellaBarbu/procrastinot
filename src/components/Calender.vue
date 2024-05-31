<script>
import { ref, onMounted } from 'vue';
import { VCalendar } from 'vuetify/labs/VCalendar';
import { initClient, fetchEvents } from '../services/googleCalendarService';

export default {
  name: 'Calendar',
  components: {
    VCalendar
  },
  setup() {
    const mode = ref('month');
    const titlePosition = ref('center');
    const titleFormat = ref({ year: 'numeric', month: 'long' });
    const weekdays = ref([1, 2, 3, 4, 5, 6, 0]);

    const currentMonth = ref('');
    const currentYear = ref('');

    const attributes = ref([]);

    const changeMonth = (offset) => {
      // Implementation remains the same
    };

    const prevMonth = () => changeMonth(-1);
    const nextMonth = () => changeMonth(1);

    // Fetch Google Calendar Events
    const fetchGoogleCalendarEvents = async () => {
      try {
        await initClient(); // Initialize Google Calendar API
        const events = await fetchEvents(); // Fetch events from Google Calendar
        // Transform events to attributes format
        attributes.value = events.map(event => ({
          key: event.id,
          dates: new Date(event.start.dateTime),
          end: new Date(event.end.dateTime),
          color: '#1976D2', // Optional: Set color for Google Calendar events
          content: event.summary // Optional: Set content for Google Calendar events
        }));
      } catch (error) {
        console.error('Error fetching Google Calendar events:', error);
      }
    };

    onMounted(() => {
      // Fetch Google Calendar events when component is mounted
      fetchGoogleCalendarEvents();
      // Set current month and year
      const today = new Date();
      currentMonth.value = today.toLocaleString('default', { month: 'long' });
      currentYear.value = today.getFullYear();
    });

    return {
      mode,
      titlePosition,
      titleFormat,
      weekdays,
      attributes,
      currentMonth,
      currentYear,
      prevMonth,
      nextMonth
    };
  }
};
</script>


<template>
  <div class="calendar-container">
    <v-btn>
      Fetch Data from Google Calendar
    </v-btn>
    <v-calendar
        is-expanded
        :attributes="attributes"
        :mode="mode"
        :tiled="true"
        :weekdays="weekdays"
        :title-position="titlePosition"
        :title-format="titleFormat"
    />
  </div>
</template>

<style scoped>
.calendar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100%;
  padding: 1rem;
  box-sizing: border-box;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 400px;
  margin-bottom: 1rem;
}
.title {
  flex-grow: 1;
  text-align: center;
  font-size: 1.5rem;
}
button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

</style>