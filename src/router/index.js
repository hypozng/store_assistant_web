import Vue from 'vue';
import VueRouter from 'vue-router';
import sessionUtils from '@/utils/sessionUtils.js';
import systemRoutes from "./system_routes.js";
import saleRoutes from "./sale_routes.js";

Vue.use(VueRouter);

const businessRoutes = [
  ...systemRoutes,
  ...saleRoutes
];

let routes = [{
    path: "/",
    redirect: "/index",
  },
  {
    path: "/index",
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
  // mode: 'history',
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