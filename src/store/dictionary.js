import fetch from "@/utils/fetch.js";
export default {
  mutations: {
    // dictionariesCache(state,) {

    // }
  },
  actions: {
    dictionary({ state }, groupKey) {
      if (!state.cache) {
        state.cache = {};
      }
      if (state.cache[groupKey]) {
        return Promise.resolve(state.cache[groupKey]);
      }
      return fetch.get("api/sys/dictionary/group/" + groupKey).then(res => {
        return state.cache[groupKey] = res.data;
      });
    }
  }
}