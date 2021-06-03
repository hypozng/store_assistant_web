export default [{
    path: "/404",
    component: () => import("@/views/sys/404.vue")
  }, {
    path: "/sys_menu",
    component: () => import("@/views/sys/menu/index.vue"),
    meta: {
      title: "菜单管理"
    }
  },
  {
    path: "/sys_role",
    component: () => import("@/views/sys/role/index.vue"),
    meta: {
      title: "角色管理"
    }
  },
  {
    path: "/sys_user",
    component: () => import("@/views/sys/user/index.vue"),
    meta: {
      title: "用户管理"
    }
  },
  {
    path: "/sys_dictionary",
    component: () => import("@/views/sys/dictionary/index.vue"),
    meta: {
      title: "字典管理"
    }
  }
];