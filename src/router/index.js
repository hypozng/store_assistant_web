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
    children: businessRoutes,
    meta: {
      title: "首页"
    }
  },
  {
    path: "/login",
    component: () => import("@/views/sys/user/login.vue"),
    meta: {
      title: "登录"
    }
  },
  {
    path: "*",
    redirect: "/404"
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
  let title = "商店管理系统";
  if (to.meta.title) {
    title += " - " + to.meta.title;
  }
  document.title = title;
  next();
});

export default router;