import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import router from "@/router/index.js";
import store from "@/store/index.js";
import sessionUtils from "@/utils/sessionUtils.js";
import global from "@/utils/global.js";
import commonUtils from "@/utils/commonUtils.js";

import vTable from "@/components/table/index.vue";
import vInput from "@/components/form/input.vue";
import App from "./App.vue";

Vue.prototype.$utils = commonUtils;
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.component("vTable", vTable);
Vue.component("vInput", vInput);

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    global.vue = this;
    sessionUtils.loadStore(store);
  }
}).$mount('#app');