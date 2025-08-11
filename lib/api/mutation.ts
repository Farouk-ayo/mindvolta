import { api, ApiResponse } from "../../services/axiosInstance";
import {
  LogMoodData,
  MoodEntry,
  OnboardingData,
  UpdateProfileData,
  User,
} from "../types";

// USER
export const updateProfile = async (data: UpdateProfileData): Promise<User> => {
  const response = await api.put<ApiResponse<{ user: User }>>(
    "/users/profile",
    data
  );
  if (response.success && response.data) return response.data.user;
  throw new Error(response.message || "Failed to update profile");
};

export const completeOnboarding = async (
  data: OnboardingData
): Promise<User> => {
  const response = await api.post<ApiResponse<{ user: User }>>(
    "/users/onboarding/complete",
    data
  );
  if (response.success && response.data) return response.data.user;
  throw new Error(response.message || "Failed to complete onboarding");
};

// MOOD
export const logMood = async (data: LogMoodData): Promise<MoodEntry> => {
  const response = await api.post<ApiResponse<{ moodEntry: MoodEntry }>>(
    "/mood",
    data
  );
  if (response.success && response.data) return response.data.moodEntry;
  throw new Error(response.message || "Failed to log mood");
};
