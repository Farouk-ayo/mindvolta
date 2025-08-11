import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// Base URL
const API_BASE_URL = __DEV__
  ? "http://localhost:5000/api"
  : "https://your-production-url.railway.app/api";

export const WS_URL = __DEV__
  ? "ws://localhost:5000"
  : "wss://your-production-url.railway.app";

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: any[];
}

// Create axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
  },
});

// Add token before every request
axiosInstance.interceptors.request.use(
  (config) => {
    AsyncStorage.getItem("authToken").then((token) => {
      if (!config.headers) {
        config.headers = {};
      }
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      } else {
        delete config.headers["Authorization"];
      }
    });

    return config;
  },
  (error) => Promise.reject(error)
);

// Helper to set token manually before making requests
export const setAuthToken = async () => {
  const token = await AsyncStorage.getItem("authToken");
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};

// Standardized API methods
export const api = {
  get: async <T = any,>(endpoint: string) => {
    const { data } = await axiosInstance.get<T>(endpoint);
    return data;
  },
  post: async <T = any,>(endpoint: string, body?: any) => {
    const { data } = await axiosInstance.post<T>(endpoint, body);
    return data;
  },
  put: async <T = any,>(endpoint: string, body?: any) => {
    const { data } = await axiosInstance.put<T>(endpoint, body);
    return data;
  },
  delete: async <T = any,>(endpoint: string) => {
    const { data } = await axiosInstance.delete<T>(endpoint);
    return data;
  },
};

export default axiosInstance;
