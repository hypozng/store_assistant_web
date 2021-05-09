import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters.js";
import user from "./user.js";

Vue.use(Vuex);

const store = new Vuex.Store({
  getters,
  modules: {
    user
  }
});

export default store;