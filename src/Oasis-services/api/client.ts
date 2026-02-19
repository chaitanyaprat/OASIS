
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const client = axios.create({
  baseURL: '/api', // Your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export const request = async <T = any>(
  config: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  // You can add any request interceptors here, e.g., for adding auth tokens
  return client(config);
};

export default request;
