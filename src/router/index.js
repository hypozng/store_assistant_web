import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
// const _basepath = process.env.BASE_URL;

const routes = [
  {
    path: '/',
    component: () => import('@/views/home.vue')
  },
  {
    path: '/sys_user',
    component: () => import('@/views/sys/user/index.vue')
  },
  {
    path: '/sys_menu',
    component: () => import('@/views/sys/menu/index.vue')
  },
  {
    path: '/sys_dept',
    component: () => import('@/views/sys/dept/index.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
