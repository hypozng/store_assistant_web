import fetch from "@/utils/fetch.js";
export default {
  mutations: {
    // 设置用户信息
    userInfo(state, userInfo) {
      state.userInfo = userInfo;
      sessionStorage.userInfo = JSON.stringify(userInfo);
    }
  },
  actions: {
    // 登录
    login({ commit }, form) {
      return fetch.post("api/sys/user/login", form).then(res => {
        if (res.code != 0) {
          throw res.message;
        }
        commit("userInfo", res.data);
        return res.data;
      });
    },
    // 退出登录
    logout({ commit }) {
      return fetch.post("api/sys/user/logout").then(res => {
        if (res.code != 0) {
          throw res.message;
        }
        commit("userInfo", null);
        return res.data;
      });
    }
  }
};