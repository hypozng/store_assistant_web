import axios from "axios";
import {
  Message
} from "element-ui";
// axios 配置
axios.defaults.timeout = 30000000;
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
let _basePath = process.env.BASE_URL;

//request拦截器
axios.interceptors.request.use(config => {
  if (config.url.includes("api/")) {
    config.url = config.url.replace("/api/", `/${_basePath}/api/`);
  }
  // if (config.method === 'post' || config.method === 'put') {
  //   if (config.headers.post['Content-Type'] === 'application/x-www-form-urlencoded') {
  //     config.data = qs.stringify(config.data);
  //   }
  // }
  return config;
}, Promise.reject);

//response拦截器
axios.interceptors.response.use(res => res.data, error => {
  if (error.response.status == 504) {
    Message.error("接口暂时不可用");
    return;
  }
  if (error.response.status == 404 || error.response.status == 405) {
    Message.error("接口不存在");
    return;
  }
  if (error.response.status == 403) {
    Message.error("接口权限不足");
    return;
  }
  if (error.response.status == 500) {
    // if (error.response.data.message && error.response.data.message.includes("JWT 令牌过")) {
    //   router.push("/login?relogin=登录超时，请重新登录");
    //   return;
    // }
    Message.error(error.response.data.message);
    return;
  }
  return Promise.reject(error);
});

export default axios;