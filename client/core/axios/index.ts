import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export const AXIOS_INSTANCE = Axios.create(); // use your own URL here or environment variable
/*
AXIOS_INSTANCE.interceptors.response.use(
  function (response: AxiosResponse<any>) {
    if (response.data?.code === 401) {
      return (window.location.href =
        process.env.NEXT_PUBLIC_ACC_INTRODUCTION_URL);
    }
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      return (window.location.href =
        process.env.NEXT_PUBLIC_ACC_INTRODUCTION_URL);
    }
    return Promise.reject(error);
  }
);
*/
export const customInstance = <T>(config: AxiosRequestConfig): Promise<T> => {
  const source = Axios.CancelToken.source();
  let finalConfig = {
    ...config,
  };
  if (typeof window !== 'undefined') {
    finalConfig = {
      ...finalConfig,
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    };
  }
  const promise = AXIOS_INSTANCE({
    ...finalConfig,
    cancelToken: source.token,
  }).then(({ data }) => data);

  (promise as any).cancel = () => {
    source.cancel('Query was cancelled');
  };

  return promise;
};

// In some case with react-query and swr you want to be able to override the return error type so you can also do it here like this
export type ErrorType<Error> = AxiosError<Error>;
