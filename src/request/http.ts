import Taro from "@tarojs/taro";
import { apiUrl } from "../config";
import interceptors from "./interceptors";

interceptors.forEach(interceptorItem => Taro.addInterceptor(interceptorItem));

function baseOptions(params, method: any) {
  let { url, data } = params;
  const BASE_URL = apiUrl;
  let contentType = "application/json";
  contentType = params.contentType || contentType;
  const option = {
    url: BASE_URL + url,
    data: data,
    method: method,
    header: {
      "content-type": contentType,
      Authorization: Taro.getStorageSync("Authorization")
    }
  };
  return Taro.request(option);
}

export function get(url, data = "") {
  let option = { url, data };
  return baseOptions(option, "GET");
}

export function post(url, data, contentType) {
  let params = { url, data, contentType };
  return baseOptions(params, "POST");
}

export function put(url, data = "") {
  let option = { url, data };
  return baseOptions(option, "PUT");
}

export function del(url, data = "") {
  let option = { url, data };
  return baseOptions(option, "DELETE");
}
