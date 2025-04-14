<template>
    <div>
      <FullCalendar :plugins="calendarPlugins" :initialView="initialView" :events="events" @dateClick="handleDateClick"></FullCalendar>
    </div>
  </template>
  
  <script>
  import FullCalendar from '@fullcalendar/vue';
  import dayGridPlugin from '@fullcalendar/daygrid';
  
  export default {
    components: {
      FullCalendar
    },
    data() {
      return {
        calendarPlugins: [ dayGridPlugin ],
        initialView: 'dayGridMonth',
        events: [
          {
            title: '预约时间1',
            start: '2024-10-01'
          },
          {
            title: '预约时间2',
            start: '2024-10-15'
          }
        ]
      };
    },
    methods: {
      handleDateClick(info) {
        const title = prompt('请输入预约名称:');
        if (title) {
          this.events.push({ title, start: info.dateStr });
        }
      }
    }
  };
  </script>