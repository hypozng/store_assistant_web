import axios from "axios";
import {
  Message
} from "element-ui";
import global from "@/utils/global.js";

// axios 配置
axios.defaults.timeout = 30000000;
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
// let _basePath = process.env.BASE_URL;

//request拦截器
// axios.interceptors.request.use(config => {
//   if (config.url.includes("api/")) {
//     config.url = config.url.replace("/api/", `/${_basePath}/api/`);
//   }
//   return config;
// }, Promise.reject);

//response拦截器
axios.interceptors.response.use(res => {
  switch (res.data.code) {
    case 1:
      Message.error("" + res.data.message);
      return Promise.reject(res.data.message);
    case -10:
      global.vue.$router.replace("/login");
      return Promise.reject(res.data.message);
  }
  return res.data;
}, error => {
  console.error(error);
  switch (error.response.status) {
    case 504:
      Message.error("接口暂时不可用");
      break;
    case 404:
    case 405:
      Message.error("接口不存在");
      break;
    case 403:
      Message.error("接口权限不足");
      break;
    case 500:
      Message.error("" + error.response.data.message);
      break;
  }
  return Promise.reject(error);
});

export default axios;