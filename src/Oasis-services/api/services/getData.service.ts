import { api } from "../axiosConfig";

export function getHomeData(url: string, options?: Record<string, unknown>) {
  return api.get(url, options).then((response) => response.data);
}

export function updateHomeData(url: string, payload: string) {
  return api.post(url, payload).then((response) => response.data);
}
