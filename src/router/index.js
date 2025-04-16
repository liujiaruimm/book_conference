import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';

import DataAnalysis from '@/views/DataAnalysis'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/device-control',
    name: 'DeviceControl',
    component: () => import(/* webpackChunkName: "device-control" */ '../views/DeviceControl.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/main',
    name: 'Main',
    component: () => import('../views/Main.vue'),
    redirect: '/main/home',
    meta: { requiresAuth: true },
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ '../views/HomeView.vue'),
        meta: { requiresAuth: true }
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
        meta: { requiresAuth: true }
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
      },
      {
        path: 'data-analysis',
        name: 'DataAnalysis',
        component: () => import(/* webpackChunkName: "data-analysis" */ '../views/DataAnalysis.vue'),
        meta: { requiresAuth: true }
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
