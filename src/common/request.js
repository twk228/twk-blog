import axios from "axios";
import Qs from "qs";
import { get, merge } from "lodash-es";
import { BASE_URL } from "../apiConfig";
import { message } from "antd";

function getToken() {
  if(localStorage.getItem("token")){
    return localStorage.getItem("token");
  }
  return "";
}

function createService() {
  const instance = axios.create({
    validateStatus: function (status) {
      return status >= 200 && status <= 500;
    },
  });

  // 函数返回唯一的请求key
  function generateReqKey(config) {
    const { method, url, params, data } = config;
    return [method, url, Qs.stringify(params), Qs.stringify(data)].join("&");
  }

  const pendingRequest = new Map();

  // 添加请求信息
  function addPendingRequest(config) {
    const requestKey = generateReqKey(config);
    config.cancelToken =
      config.cancelToken ||
      new axios.CancelToken((cancel) => {
        if (!pendingRequest.has(requestKey)) {
          pendingRequest.set(requestKey, cancel);
        }
      });
  }

  // 取消重复请求
  function removePendingRequest(config) {
    const requestKey = generateReqKey(config);
    if (pendingRequest.has(requestKey)) {
      const cancelToken = pendingRequest.get(requestKey);
      cancelToken(requestKey);
      pendingRequest.delete(requestKey);
    }
  }

  // 添加请求拦截器
  instance.interceptors.request.use(
    function (config) {
      // 在发送请求之前做些什么
      if (getToken()) {
        config.headers.Authorization = `Bearer ${getToken()}`;
      }
      // 检查是否存在重复请求，若存在则取消已发的请求
      removePendingRequest(config);
      // 把当前请求信息添加到pendingRequest对象中
      addPendingRequest(config);
      return config;
    },
    function (error) {
      // 对请求错误做些什么
      return Promise.reject(error);
    }
  );

  // 配置响应拦截器
  instance.interceptors.response.use(
    function (response) {
      // 2xx 范围内的状态码都会触发该函数。
      // 对响应数据做点什么
      removePendingRequest(response.config);
      const msg =
        response.data.msg || response.data.error_description || "未知错误";
      const code = response.data.code || response.status;
      let errorTip = "未知错误";
      switch (code) {
        case 200:
          return response.data;
        case 401:
          // Token 过期时，直接退出登录并强制刷新页面（会重定向到登录页）
          errorTip = "没有token或者token过期了";
          localStorage.removeItem("token");
          window.location.reload();
          return message.error(errorTip);
        default:
          return Promise.reject(new Error(msg));
      }
    },
    function (error) {
      // 超出 2xx 范围的状态码都会触发该函数。
      // 对响应错误做点什么
      // 从pendingRequest对象中移除请求
      removePendingRequest(error.config || {});
      // status 是 HTTP 状态码
      const status = get(error, "response.status");
      switch (status) {
        case 400:
          error.message = "请求错误";
          break;
        case 401:
          // Token 过期时，直接退出登录并强制刷新页面（会重定向到登录页）
          console.log("token过期了");
          break;
        case 403:
          error.message = "拒绝访问";
          break;
        case 404:
          error.message = "请求地址出错";
          break;
        case 405:
          error.message = "请求方式错误";
          break;
        case 408:
          error.message = "请求超时";
          break;
        case 500:
          error.message = "服务器内部错误";
          break;
        case 501:
          error.message = "服务未实现";
          break;
        case 502:
          error.message = "网关错误";
          break;
        case 503:
          error.message = "服务不可用";
          break;
        case 504:
          error.message = "网关超时";
          break;
        case 505:
          error.message = "HTTP 版本不受支持";
          break;
        default:
          break;
      }
      if (axios.isCancel(error)) {
        console.log("被取消的重复请求：" + error.message);
      } else {
        // 错误信息提示
        console.log(error.message, "错误信息");
        message.error(error.message);
      }
      return Promise.reject(error);
    }
  );
  return instance;
}

// 创建请求方法
function createRequest(service) {
  return function (config) {
    const token = sessionStorage.getItem("token") || "";
    const defaultConfig = {
      headers: {
        // 携带 Token
        Authorization: token ? `Bearer ${token}` : undefined,
        "Content-Type": "application/json;charset=utf-8",
      },
      timeout: 20000,
      baseURL: BASE_URL,
    };
    // 将默认配置 defaultConfig 和传入的自定义配置 config 进行合并成为 mergeConfig
    const mergeConfig = merge(defaultConfig, config);
    return service(mergeConfig);
  };
}

// 用于网络请求的实例
const service = createService();
// 用于网络请求的方法
const request = createRequest(service);

export default request;
