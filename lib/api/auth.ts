import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance, { api, ApiResponse } from "../../services/axiosInstance";
import { AuthData, LoginCredentials, RegisterData, User } from "../types";

export const login = async (
  credentials: LoginCredentials
): Promise<AuthData> => {
  const response = await api.post<ApiResponse<AuthData>>(
    "/auth/login",
    credentials
  );
  if (response.success && response.data) {
    await AsyncStorage.setItem("authToken", response.data.token);
    await AsyncStorage.setItem("userData", JSON.stringify(response.data.user));
    return response.data;
  }
  throw new Error(response.message || "Login failed");
};
export const register = async (data: RegisterData): Promise<AuthData> => {
  const response = await api.post<ApiResponse<AuthData>>(
    "/auth/register",
    data
  );
  if (response.success && response.data) {
    await AsyncStorage.setItem("authToken", response.data.token);
    await AsyncStorage.setItem("userData", JSON.stringify(response.data.user));
    return response.data;
  }
  throw new Error(response.message || "Registration failed");
};

const getCurrentUser = async (): Promise<User> => {
  const response = await api.get<ApiResponse<{ user: User }>>("/auth/me");

  if (response.success && response.data) {
    await AsyncStorage.setItem("userData", JSON.stringify(response.data.user));
    return response.data.user;
  }

  throw new Error("Failed to get user data");
};

const logout = async (): Promise<void> => {
  await AsyncStorage.multiRemove(["authToken", "userData"]);
};

const getStoredToken = async (): Promise<string | null> => {
  return await AsyncStorage.getItem("authToken");
};

export const setAuthToken = async () => {
  const token = await AsyncStorage.getItem("authToken");
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};

const getStoredUser = async (): Promise<User | null> => {
  const userData = await AsyncStorage.getItem("userData");
  return userData ? JSON.parse(userData) : null;
};

// Export as an object (like before)
export const authService = {
  login,
  register,
  getCurrentUser,
  logout,
  getStoredToken,
  getStoredUser,
};
