import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import router from "@/router/index.js";
import store from "@/store/index.js";
import sessionUtils from "@/utils/sessionUtils.js";
import global from "@/utils/global.js";
import commonUtils from "@/utils/commonUtils.js";

import vTable from "@/components/table/index.vue";
import vImage from "@/components/ui/image.vue";
import vAttachmentImage from "@/components/ui/attachmentImage.vue";
import vPromise from "@/components/ui/promise.vue";
import vDictionary from "@/components/ui/dictionary.vue"
import ffItem from "@/components/form/item.vue";
import ffInput from "@/components/form/input.vue";
import ffSlider from "@/components/form/slider.vue";
import ffTextarea from "@/components/form/textarea.vue";
import ffInputNumber from "@/components/form/inputNumber.vue";
import ffMoney from "@/components/form/money.vue";
import ffSelect from "@/components/form/select.vue";
import ffImage from "@/components/form/image.vue";
import ffDatePicker from "@/components/form/datePicker.vue";
import ffCustomer from "@/components/form/customer.vue";
import App from "./App.vue";

Vue.prototype.$utils = commonUtils;
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.component("vTable", vTable);
Vue.component("vImage", vImage);
Vue.component("vAttachmentImage", vAttachmentImage);
Vue.component("vPromise", vPromise);
Vue.component("vDictionary", vDictionary);
Vue.component("ffItem", ffItem);
Vue.component("ffInput", ffInput);
Vue.component("ffTextarea", ffTextarea);
Vue.component("ffInputNumber", ffInputNumber);
Vue.component("ffMoney", ffMoney);
Vue.component("ffSelect", ffSelect);
Vue.component("ffSlider", ffSlider);
Vue.component("ffImage", ffImage);
Vue.component("ffDatePicker", ffDatePicker);
Vue.component("ffCustomer", ffCustomer);

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    global.vue = this;
    sessionUtils.loadStore(store);
  }
}).$mount('#app');