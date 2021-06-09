import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters.js";
import user from "./user.js";
import dictionary from "./dictionary.js";

Vue.use(Vuex);

const store = new Vuex.Store({
  getters,
  modules: {
    user,
    dictionary
  }
});

export default store;