import axios from "axios";
import { authStore } from "../store/authStore";

const API = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: API,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = authStore.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let queue: any[] = [];

const processQueue = (token: string | null, error?: any) => {
  queue.forEach((p) => {
    if (error) p.reject(error);
    else p.resolve(token);
  });

  queue = [];
};

const refreshClient = axios.create({
  baseURL: API,
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res,

  async (error) => {
    const original = error.config;
    const status = error.response?.status;

    if (status !== 401 || !original || original._retry) {
      return Promise.reject(error);
    }

    if (original.url?.includes("/users/refresh")) {
      return Promise.reject(error);
    }

    original._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        queue.push({
          resolve: (token: string) => {
            original.headers.Authorization = `Bearer ${token}`;
            resolve(api(original));
          },
          reject,
        });
      });
    }

    isRefreshing = true;

    try {
      const res = await refreshClient.post("/users/refresh");
      const newToken = res.data.accessToken;
      authStore.setToken(newToken);
      processQueue(newToken);
      original.headers.Authorization = `Bearer ${newToken}`;
      return api(original);
    } catch (err) {
      processQueue(null, err);
      authStore.clearAuth();
      window.location.href = "/login";
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  }
);
