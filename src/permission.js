import sessionUtils from "./utils/sessionUtils.js";
import router from "./router/index.js";

let whiteList = ["/login"];

router.beforeEach((to, from, next) => {
  // 跳转页面时的登录验证
  if (!sessionUtils.getAttribute("userInfo") && !whiteList.includes(to.path)) {
    next("/login");
    return;
  }
  next();
});