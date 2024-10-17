import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  Method,
} from "axios";

interface FetchApiParams {
  method: Method;
  url: string;
  config?: AxiosRequestConfig;
  body?: any;
}

export const fetchApi = async <T>({
  method,
  url,
  config,
  body,
}: FetchApiParams): Promise<{ data: T | null; error: string | null }> => {
  try {
    const response: AxiosResponse<T> = await axiosInstance.request<T>({
      method,
      url,
      ...config,
      data: body,
    });
    return { data: response.data, error: null };
  } catch (err: unknown) {
    const axiosError = err as AxiosError;
    return { data: null, error: axiosError?.message || "Something went wrong" };
  }
};

const axiosInstance = axios.create({
  baseURL: "http://192.168.0.14:3000",
});

