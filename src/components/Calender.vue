<script>
import { ref } from 'vue';
import { VCalendar } from 'vuetify/labs/VCalendar'
import {VDatePicker} from "vuetify/components";

export default {
  name: 'Calendar',
  components: {
    VCalendar,
    VDatePicker
  },
  setup() {
    //setupCalendar();

    const today = new Date();
    const mode = ref('month');
    const titlePosition = ref('center');
    const titleFormat = ref({ year: 'numeric', month: 'long' });
    const weekdays = ref([1, 2, 3, 4, 5, 6, 0]);

    const currentMonth = ref(today.toLocaleString('default', { month: 'long' }));
    const currentYear = ref(today.getFullYear());

    const attributes = ref([
      {
        key: 'today',
        highlight: true,
        dates: new Date(today.getFullYear(), today.getMonth(), today.getDate())
      }
    ]);

    const changeMonth = (offset) => {
      today.setMonth(today.getMonth() + offset);
      currentMonth.value = today.toLocaleString('default', { month: 'long' });
      currentYear.value = today.getFullYear();
      attributes.value = [
        {
          key: 'today',
          highlight: true,
          dates: new Date(today.getFullYear(), today.getMonth(), today.getDate())
        }
      ];
    };

    const prevMonth = () => changeMonth(-1);
    const nextMonth = () => changeMonth(1);

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

</style>