import { HTTP_STATUS } from "./config";
import Taro from "@tarojs/taro";

const customInterceptor = chain => {
  const requestParams = chain.requestParams;

  return chain.proceed(requestParams).then(res => {
    // 只要请求成功，不管返回什么状态码，都走这个回调
    if (res.data.code === HTTP_STATUS.NOT_FOUND) {
      return console.log("请求资源不存在");
    } else if (res.data.code === HTTP_STATUS.BAD_GATEWAY) {
      return console.log("服务端出现了问题");
    } else if (res.data.code === HTTP_STATUS.FORBIDDEN) {
      return console.log("没有权限访问");
    } else if (res.data.code === HTTP_STATUS.AUTHENTICATE) {
      Taro.removeStorageSync("Authorization");
    } else if (res.data.code === HTTP_STATUS.SUCCESS) {
      return res.data;
    } else {
      return res.data;
    }
  });
};

// Taro 提供了两个内置拦截器
// logInterceptor - 用于打印请求的相关信息
// timeoutInterceptor - 在请求超时时抛出错误。
const interceptors = [customInterceptor, Taro.interceptors.logInterceptor];

export default interceptors;
