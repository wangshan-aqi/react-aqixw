import { useGlobalStore } from '@/stores/global';
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig,
} from 'axios';
import { antdUtils } from './antd';
import jsonpAdapter from 'axios-jsonp';
import { IResponseProps } from '@/interfaces/common';

// 声明一个 ResponseData 类型的接口 用于约束接口返回值  Promise<[boolean, T, AxiosResponse<T>]> 三个参数分别是 是否成功，返回值，AxiosResponse
export type ResponseData<T = any> = Promise<[boolean, T, AxiosResponse<T>]>;

class RequestInstance {
  constructor(config?: CreateAxiosDefaults) {
    this.axiosInstance = axios.create(config); // 创建axios实例
    this.axiosInstance.interceptors.request.use(
      // 请求拦截器 InternalAxiosRequestConfig 是 axios 的请求配置类型 也就是 AxiosRequestConfig 的子集 用于约束请求参数 config
      (axiosConfig: InternalAxiosRequestConfig) => {
        return this.requestInterceptor(axiosConfig);
      },
      (error: any) => {
        return Promise.reject(error);
      },
    );
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse<unknown, unknown>) => {
        return this.responseInterceptor(response);
      },
      (error: any) => {
        return this.responseErrorInterceptor(error);
      },
    );
  }

  private axiosInstance: AxiosInstance; // axios实例

  private refreshTokenFlag = false;
  private requestQueue: {
    resolve: any;
    config: any;
    type: 'reuqest' | 'response';
  }[] = [];
  private limit = 3;

  private requestingCount = 0;

  setLimit(limit: number) {
    this.limit = limit;
  }

  private requestInterceptor(axiosConfig: InternalAxiosRequestConfig) {
    const { access_token } = useGlobalStore.getState();
    const apiPrefix = process.env.REACT_APP_API_PREFIX;
    if (apiPrefix) {
      axiosConfig.url = `${apiPrefix}${axiosConfig.url}`;
    }
    if (access_token) {
      axiosConfig.headers.Authorization = `Bearer ${access_token}`;
    }

    return Promise.resolve(axiosConfig);
  }

  private responseInterceptor(
    response: AxiosResponse<unknown, unknown>,
  ): Promise<any> {
    return Promise.resolve([false, response.data, response]);
  }

  private responseErrorInterceptor(error: any): Promise<any> {
    const { status } = error?.response || {};
    if (status === 401) {
      // 401 未授权
    } else {
      antdUtils.notification?.error({
        message: '出错了',
        description: error?.response?.data?.message,
      });
    }
    return Promise.reject(error);
  }

  request<T, D = any>(config: AxiosRequestConfig<D>): ResponseData<T> {
    return this.axiosInstance(config);
  }

  get<T, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ): ResponseData<IResponseProps<T>> {
    return this.axiosInstance.get(url, config);
  }

  delete<T, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ): ResponseData<T> {
    return this.axiosInstance.delete(url, config);
  }

  post<T, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): ResponseData<IResponseProps<T>> {
    return this.axiosInstance.post(url, data, config);
  }

  put<T, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): ResponseData<T> {
    return this.axiosInstance.put(url, data, config);
  }

  patch<T, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): ResponseData<T> {
    return this.axiosInstance.patch(url, data, config);
  }

  jsonp<T, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ): ResponseData<T> {
    return this.axiosInstance({
      url,
      adapter: jsonpAdapter,
      ...config,
    });
  }
}

const request = new RequestInstance({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 20000,
});

export default request;
