import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// Base URL
const API_BASE_URL = __DEV__
  ? "http://10.0.2.2:5000/api"
  : "https://mindvolta-be.onrender.com/api";

export const WS_URL = __DEV__
  ? "ws://10.0.2.2:5000"
  : "wss://mindvolta-be.onrender.com";

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
console.log("Axios instance created with base URL:", API_BASE_URL);
axiosInstance.interceptors.request.use(
  (config) => {
    // AsyncStorage is asynchronous, so we cannot use it here directly.
    // Instead, set the token using setAuthToken() before making requests.
    return config;
  },
  (error) => Promise.reject(error)
);

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
