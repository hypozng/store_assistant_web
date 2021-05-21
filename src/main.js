import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import router from "@/router/index.js";
import store from "@/store/index.js";
import sessionUtils from "@/utils/sessionUtils.js";
import "@/utils/permission.js";
import vTable from "@/components/table/index.vue";
import vInput from "@/components/form/input.vue";


Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.component("vTable", vTable);
Vue.component("vInput", vInput);

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    sessionUtils.loadStore(store);
  }
}).$mount('#app');