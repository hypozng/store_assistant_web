import Vue from "vue";
import ElementUI from 'element-ui';
import App from "./App.vue";
import router from "./router/index.js";
import store from "./store/index.js";
import sessionUtils from "./utils/sessionUtils.js";

import 'element-ui/lib/theme-chalk/index.css';
import "./permission.js";

Vue.config.productionTip = false;
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    sessionUtils.loadStore(store);
  }
}).$mount('#app');
