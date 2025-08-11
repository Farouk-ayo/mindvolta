import { api, ApiResponse } from "@/services/axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ChatMessage,
  MoodAnalytics,
  MoodEntry,
  ThoughtOfTheDay,
  User,
  UserInsights,
} from "../types";

// AUTH
export const getCurrentUser = async (): Promise<User> => {
  const response = await api.get<ApiResponse<{ user: User }>>("/auth/me");
  if (response.success && response.data) {
    await AsyncStorage.setItem("userData", JSON.stringify(response.data.user));
    return response.data.user;
  }
  throw new Error("Failed to get user data");
};

export const getStoredToken = async (): Promise<string | null> => {
  return await AsyncStorage.getItem("authToken");
};

export const getStoredUser = async (): Promise<User | null> => {
  const userData = await AsyncStorage.getItem("userData");
  return userData ? JSON.parse(userData) : null;
};

// MOOD
export const getMoodHistory = async (
  days: number = 30
): Promise<MoodEntry[]> => {
  const response = await api.get<ApiResponse<{ moodEntries: MoodEntry[] }>>(
    `/mood/history?days=${days}`
  );
  return response.success && response.data ? response.data.moodEntries : [];
};

export const getMoodAnalytics = async (
  days: number = 30
): Promise<MoodAnalytics> => {
  const response = await api.get<ApiResponse<{ analytics: MoodAnalytics }>>(
    `/mood/analytics?days=${days}`
  );
  if (response.success && response.data) return response.data.analytics;
  throw new Error("Failed to get mood analytics");
};

// CHAT
export const getChatHistory = async (): Promise<ChatMessage[]> => {
  const response =
    await api.get<ApiResponse<{ messages: ChatMessage[] }>>("/chat/history");
  return response.success && response.data ? response.data.messages : [];
};

// INSIGHTS
export const getDashboardInsights = async (): Promise<UserInsights> => {
  const response = await api.get<ApiResponse<{ insights: UserInsights }>>(
    "/insights/dashboard"
  );
  if (response.success && response.data) return response.data.insights;
  throw new Error("Failed to get insights");
};

export const getThoughtOfTheDay = async (): Promise<ThoughtOfTheDay> => {
  const response = await api.get<ApiResponse<{ thought: ThoughtOfTheDay }>>(
    "/insights/thought-of-the-day"
  );
  if (response.success && response.data) return response.data.thought;
  throw new Error("Failed to get thought of the day");
};
