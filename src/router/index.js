import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import Main from '../views/Main.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
  },
  {
    path: '/device-control',
    name: 'DeviceControl',
    component: () => import(/* webpackChunkName: "device-control" */ '../views/DeviceControl.vue'),
  },
  {
    path: '/main',
    name: 'Main',
    component: Main,
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ '../views/HomeView.vue'),
      },
      {
        path: 'add-meeting-room',
        name: 'AddMeetingRoom',
        component: () => import(/* webpackChunkName: "add-meeting-room" */ '../views/AddMeetingRoom.vue'),
      },
      {
        path: 'meeting-room-status',
        name: 'MeetingRoomStatus',
        component: () => import(/* webpackChunkName: "meeting-room-status" */ '../views/MeetingRoomStatus.vue'),
      },
      {
        path: 'user-management',
        name: 'UserManagement',
        component: () => import(/* webpackChunkName: "user-management" */ '../views/UserManagement.vue'),
      },
      {
        path: 'inquiry-meeting-room',
        name: 'InquiryMeetingRoom',
        component: () => import(/* webpackChunkName: "inquiry-meeting-room" */ '../views/InquiryMeetingRoom.vue'),
      },
      {
        path: 'booking-room',
        name: 'BookingRoom',
        component: () => import(/* webpackChunkName: "booking-room" */ '../views/BookingRoom.vue'),
      },
      {
        path: 'specificbook',
        name: 'Specificbook',
        component: () => import(/* webpackChunkName: "specificbook" */ '../views/specificbook.vue'),
      },
      {
        path: 'virtual-scene',
        name: 'VirtualScene',
        component: () => import(/* webpackChunkName: "virtual-scene" */ '../views/VirtualScene.vue'),
      }
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
