import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';

import DataAnalysis from '@/views/DataAnalysis'

Vue.use(VueRouter);

const routes = [
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

// 修改路由守卫逻辑
router.beforeEach((to, from, next) => {
  const userInfo = localStorage.getItem('userInfo')

  // 如果需要登录认证
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 检查是否已登录
    if (!userInfo) {
      // 未登录则跳转到登录页
      next({
        path: '/login',
        query: { redirect: to.fullPath }  // 保存要跳转的页面路径
      })
    } else {
      // 已登录则允许访问
      next()
    }
  } else {
    // 如果是访问登录页
    if (to.path === '/login' && userInfo) {
      // 已登录用户访问登录页，跳转到主页
      next('/main/home')
    } else {
      // 其他情况正常访问
      next()
    }
  }
})

export default router;
