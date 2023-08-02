import axios, { AxiosRequestConfig } from 'axios';
import axiosRetry from 'axios-retry';
import jsonpAdapter from 'axios-jsonp';
import { message } from 'antd';

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 20000,
  //   headers: { 'X-Custom-Header': 'foobar' },
});

// Add a request interceptor 请求拦截器
instance.interceptors.request.use(
  function (config) {
    const apiPrefix = process.env.REACT_APP_API_PREFIX;
    if (apiPrefix) {
      config.url = `${apiPrefix}${config.url}`;
    }
    const access_token = localStorage.getItem('access_token');
    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }

    // 在发送请求之前做些什么
    // Do something before request is sent
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    // Do something with response data
    if (
      response.status === 200 ||
      response.status === 201 ||
      response.status === 204
    ) {
      return response.data;
    } else {
      return Promise.reject(response.data);
    }
  },
  function (error) {
    // 对响应错误做点什么
    // Do something with response error
    if (error.response) {
      switch (error.response.status) {
        case 401:
          message.error(error.response.data.message);

        // 返回 401 清除token信息并跳转到登录页面
        // store.commit(types.LOGOUT);
        // router.replace({
        //     path: 'login',
        //     query: {redirect: router.currentRoute.fullPath}
        // })
      }
    }
    // return Promise.reject(error);
  },
);

// 使用 axios-retry 进行重试配置
axiosRetry(instance, {
  retries: 3, // 最大重试次数
  retryDelay: retryCount => {
    return retryCount * 1000; // 重试延迟时间，这里设置为每次重试增加 1 秒
  },
});

// 封装请求方法
const request = {
  post: <T>(url: string, data: unknown): Promise<T> => instance.post(url, data),
  patch: <T>(url: string, data: unknown): Promise<T> =>
    instance.patch(url, data),
  put: <T>(url: string, data: unknown): Promise<T> => instance.put(url, data),
  get: <T>(url: string, params: unknown): Promise<T> =>
    instance.get(url, { params }),
  delete: <T>(url: string): Promise<T> => instance.delete(url),
  jsonp: jsonpFunc,
};
// const postRequest = <T>(url: string, data: unknown): Promise<T> => instance.post(url, data);
export function jsonpFunc(url: string, config: AxiosRequestConfig = {}) {
  return requestJsonP(url, { ...config, adapter: jsonpAdapter });
}

export async function requestJsonP(url: string, config?: AxiosRequestConfig) {
  const response = await instance.request({ url, ...config });
  const result = response.data;
  // 你的业务判断逻辑
  return result;
}

export default request;
