import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import router from "@/router/index.js";
import store from "@/store/index.js";
import sessionUtils from "@/utils/sessionUtils.js";
import global from "@/utils/global.js";
import commonUtils from "@/utils/commonUtils.js";

import vTable from "@/components/table/index.vue";
import vImage from "@/components/form/image.vue";
import vInput from "@/components/form/input.vue";
import vSlider from "@/components/form/slider.vue";
import vTextarea from "@/components/form/textarea.vue";
import vInputNumber from "@/components/form/inputNumber.vue";
import vMoney from "@/components/form/money.vue";
import vSelect from "@/components/form/select.vue";
import App from "./App.vue";

Vue.prototype.$utils = commonUtils;
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.component("vTable", vTable);
Vue.component("vImage", vImage);
Vue.component("vInput", vInput);
Vue.component("vTextarea", vTextarea);
Vue.component("vInputNumber", vInputNumber);
Vue.component("vMoney", vMoney);
Vue.component("vSelect", vSelect);
Vue.component("vSlider", vSlider);

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    global.vue = this;
    sessionUtils.loadStore(store);
  }
}).$mount('#app');