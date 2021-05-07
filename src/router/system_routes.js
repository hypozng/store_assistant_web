export default [{
  name: "菜单管理",
  path: "/sys_menu",
  component: () => import("@/views/sys/menu/index.vue")
}, {
  name: "用户管理",
  path: "/sys_user",
  component: () => import("@/views/sys/user/index.vue")
}];