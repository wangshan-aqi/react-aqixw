import { ResponseData } from '@/utils/request';
import { useCallback, useEffect, useRef, useState } from 'react';

// 1. 通过 useRequest 封装请求
// 2. 通过 useRequest 封装请求，支持手动触发
// 3. 通过 useRequest 封装请求，支持手动触发，支持默认参数
// 4. 通过 useRequest 封装请求，支持手动触发，支持默认参数，支持缓存
// 5. 通过 useRequest 封装请求，支持手动触发，支持默认参数，支持缓存，支持轮询
interface RequestOptions {
  manual?: boolean; // 是否手动触发
  defaultParams?: any[]; // 默认参数
}

interface RequestResponse<T> {
  error: boolean | undefined;
  data: T | undefined;
  loading: boolean;
  run: (...args: any) => void;
  runAsync: (...args: any) => ResponseData<T>;
  refresh: () => void;
}

export function useRequest<T>(
  serviceMethod: (...args: any) => ResponseData<T>,
  options: RequestOptions,
): RequestResponse<T> {
  const [loading, setLoading] = useState(false); // loading 状态
  const [error, setError] = useState<boolean | undefined>(undefined); // error 状态
  const [data, setData] = useState<T | undefined>(undefined); // data 状态

  const paramsRef = useRef<any[]>([]); // 保存请求参数
  const cancelRequestRef = useRef<() => void>(); // 保存取消请求的方法

  /**
   * 发送请求并更新状态
   */
  const resolveData = useCallback(async () => {
    // 重置状态
    setLoading(true);
    // 重置 error
    setError(undefined);
    // 重置 data
    setData(undefined);
    // 保存请求参数
    const [err, res] = await serviceMethod(...(options.defaultParams || [])); // 保存请求参数
    // 重置 loading
    setLoading(false);
    if (err) {
      setError(err);
    } else {
      setData(res);
    }
  }, [serviceMethod, options]);

  /**
   * 异步执行请求
   * @param {...any} params 请求参数
   * @returns {Promise<ResponseData<T>>} 请求响应结果
   */
  const runAsync = useCallback(
    async (...params: any) => {
      paramsRef.current = params;
      setLoading(true);
      const res = await serviceMethod(...params);
      const [err, data] = res;
      if (err) {
        setError(err);
      }
      setLoading(false);
      setData(data);
      return res;
    },
    [serviceMethod],
  );

  /**
   * 手动触发请求
   * @param {...any} params 请求参数
   * @returns {void} 无返回值
   * */
  const run = useCallback(async () => {
    runAsync(...paramsRef.current);
  }, [runAsync]);

  // 重新发送请求 获取最新数据
  const refresh = useCallback(async () => {
    runAsync(...paramsRef.current);
  }, [runAsync]);

  useEffect(() => {
    // 如果不是手动触发，则自动触发
    if (!options?.manual) {
      resolveData();
    }
  }, [options?.manual, resolveData]);

  return {
    error,
    data,
    loading,
    run,
    runAsync,
    refresh,
  };
}
