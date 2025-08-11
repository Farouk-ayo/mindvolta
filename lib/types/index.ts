//  Auth
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  isOnboardingComplete: boolean;
  mentalHealthIssues?: string[];
  stressCauses?: string[];
}

export interface AuthData {
  user: User;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

//  Mood Tracking
export interface MoodEntry {
  id: string;
  mood: MoodType;
  intensity: number;
  notes?: string;
  activities: string[];
  triggers: string[];
  createdAt: string;
}

export enum MoodType {
  HAPPY = "HAPPY",
  SAD = "SAD",
  ANGRY = "ANGRY",
  ANXIOUS = "ANXIOUS",
  CALM = "CALM",
  EXCITED = "EXCITED",
  DEPRESSED = "DEPRESSED",
  STRESSED = "STRESSED",
  CONTENT = "CONTENT",
  OVERWHELMED = "OVERWHELMED",
}

export interface MoodAnalytics {
  totalEntries: number;
  averageIntensity: number;
  mostFrequentMood: string;
  moodDistribution: Record<string, number>;
  period: string;
}

export interface LogMoodData {
  mood: MoodType;
  intensity: number;
  notes?: string;
  activities?: string[];
  triggers?: string[];
}

//  Chat
export interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
  showButtons?: boolean;
}

//  User
export interface UpdateProfileData {
  name?: string;
  dateOfBirth?: string;
  gender?: "MALE" | "FEMALE" | "OTHER" | "PREFER_NOT_TO_SAY";
  occupation?: string;
}

export interface OnboardingData {
  name: string;
  mentalHealthIssues: string[];
  stressCauses: string[];
}

//  Insights
export interface UserInsights {
  moodInsights: {
    averageIntensity: number;
    weeklyAverage: number;
    trend: "improving" | "declining" | "stable";
    mostCommonMood: string;
    totalEntries: number;
  };
  activityInsights: {
    chatMessagesCount: number;
    averageMessagesPerDay: number;
    engagementLevel: "high" | "medium" | "low";
  };
  recommendations: {
    type: string;
    title: string;
    description: string;
    action: string;
  }[];
}

export interface ThoughtOfTheDay {
  id: string;
  title: string;
  content: string;
  author?: string;
  category: string;
}
