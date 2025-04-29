import axios from "axios";
import { WEATHER_ACCESS_KEY } from "./api.constants";

//configure http client to handle data,
//update interceptors fro authentication, handle error responses,

export const api = axios.create({
  baseURL: document.location.origin,
  headers: { "Content-Type": "application/json" },
  timeout: 10_000,
});

api.interceptors.request.use((config) => {
  if (config.url?.startsWith("current")) {
    config.baseURL = "https://api.weatherstack.com";
    config.params = {
      ...config.params,
      access_key: WEATHER_ACCESS_KEY,
    };
  }
  return config;
});
