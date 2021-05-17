import Vue from 'vue';
import VueRouter from 'vue-router';
import sessionUtils from '@/utils/sessionUtils.js';
import systemRoutes from "./system_routes.js";

Vue.use(VueRouter);

const businessRoutes = [
  ...systemRoutes
];

let routes = [
  {
    path: "/",
    component: () => import("@/views/index.vue"),
    children: businessRoutes
  },
  {
    path: "/login",
    component: () => import("@/views/sys/login.vue")
  },
];

const whiteList = ["/login"];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (!sessionUtils.getAttribute("userInfo") && !whiteList.includes(to.path)) {
    next("/login");
    return;
  }
  next();
});

export default router;