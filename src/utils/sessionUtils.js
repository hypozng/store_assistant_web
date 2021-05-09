export default {
  // 从session获取属性
  getAttribute(key) {
    let value = sessionStorage[key];
    return value && JSON.parse(value);
  },

  // 在session设置属性
  setAttribute(key, value) {
    sessionStorage[key] = JSON.stringify(value);
  },

  // 加载store数据
  loadStore(store) {
    let keys = ["userInfo"];
    keys.forEach(key => {
      let value = this.getAttribute(key);
      if (value) {
        store.commit(key, value);
      }
    });
  }

}