export function storeLoader() {
  if (sessionStorage.userInfo) {
    store.commit("userInfo", JSON.parse(sessionStorage.userInfo));
  }
};