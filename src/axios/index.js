import axios from "axios";
import { msgFun } from "@/utils/message";
import { cookieData } from "@/utils";

const BASE_URL = process.env.VUE_APP_BASE_URL;
const BAS_HOST = process.env.VUE_APP_BAS_HOST;
const UC_HOST = process.env.VUE_APP_UC_HOST;

const instance = axios.create();
instance.defaults.baseURL = UC_HOST;
instance.defaults.timeout = 200000;
instance.defaults.withCredentials = true; // 允许携带cookie信息

// 设置请求的token
function getAuth() {
  console.log("前端的cookie,", cookieData.get());
  return decodeURIComponent(cookieData.get().value);
}

// 清空token
function clearAuth() {
  cookieData().clear();
}

// 判断请求的url是/uc还是/bas，需要请求不同的HOST
function getUrlType(url) {
  const ucUrl = url.startsWith("/uc");
  const basUrl = url.startsWith("/bas");
  let host = "";
  if (ucUrl) {
    host = UC_HOST;
  }
  if (basUrl) {
    host = BAS_HOST;
  }
  return host;
}

// 跳转登录页面
function redirectLogin() {
  console.log(BASE_URL);
  // window.location.href = BASE_URL + "/login"
  // sessionStorage.clear()
}

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    config.baseURL = getUrlType(config.url);
    config.headers["Authorization"] = getAuth();
    // config.headers["Origin"] = location.origin;
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    if (response.status != 200) {
      msgFun("error", "服务端请求失败");
      // return Promise.reject(response);
    } else {
      if (response.data && response.data.err == 0) {
        return Promise.resolve(response.data);
      } else {
        if (response?.data?.err == "403") {
          clearAuth();
          // 登录失效
          redirectLogin();
        }
        msgFun("error", response.data.errMsg);
        return Promise.reject(response);
      }
    }
  },
  function (error) {
    console.error("超出 2xx 范围的状态码都会触发该函数 error---", error);
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    msgFun("error", "服务端请求失败");
    redirectLogin();
    return Promise.reject(error);
  }
);

function get(url, params) {
  return new Promise((resolve, reject) => {
    instance
      .get(url, params)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function post(url, data, config = {}) {
  return new Promise((resolve, reject) => {
    // console.log("post----", url, data, {...commonConfig, ...config})
    instance
      .post(url, data, config)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export default instance;

export { get, post };
