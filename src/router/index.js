import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
import systemRoutes from "./system_routes.js";

const routes = [
  ...systemRoutes
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router;