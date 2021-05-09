import Vue from 'vue';
import VueRouter from 'vue-router';
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

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;