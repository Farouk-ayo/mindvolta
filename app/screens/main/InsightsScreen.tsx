import { getDashboardInsights, getMoodAnalytics } from "@/lib/api/queries";
import { MoodAnalytics, UserInsights } from "@/lib/types";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";

const InsightsScreen = () => {
  const [insights, setInsights] = useState<UserInsights | null>(null);
  const [moodAnalytics, setMoodAnalytics] = useState<MoodAnalytics | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadInsights();
  }, []);

  const loadInsights = async () => {
    try {
      setIsLoading(true);
      const [userInsights, analytics] = await Promise.all([
        getDashboardInsights(),
        getMoodAnalytics(30),
      ]);
      setInsights(userInsights);
      setMoodAnalytics(analytics);
    } catch (error) {
      console.error("Failed to load insights:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <ActivityIndicator size="large" color="#FFB810" />
        <Text className="mt-4 text-gray-600">Loading your insights...</Text>
      </SafeAreaView>
    );
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "improving":
        return "text-green-600";
      case "declining":
        return "text-red-600";
      default:
        return "text-yellow-600";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "improving":
        return "↗️";
      case "declining":
        return "↘️";
      default:
        return "→";
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-4 py-6 border-b border-gray-100">
        <Text className="text-2xl font-bold text-gray-900">Your Insights</Text>
        <Text className="text-gray-600 mt-1">
          Track your mental health journey
        </Text>
      </View>

      <ScrollView className="flex-1 px-4 py-6">
        {/* Mood Insights */}
        {insights && (
          <View className="mb-6">
            <Text className="text-lg font-semibold text-gray-900 mb-4">
              Mood Overview
            </Text>

            <View className="bg-primary/5 rounded-2xl p-4 mb-4">
              <View className="flex-row justify-between items-center mb-3">
                <Text className="text-base font-medium text-gray-900">
                  Current Trend
                </Text>
                <View className="flex-row items-center">
                  <Text className="text-2xl mr-1">
                    {getTrendIcon(insights.moodInsights.trend)}
                  </Text>
                  <Text
                    className={`font-semibold ${getTrendColor(insights.moodInsights.trend)}`}
                  >
                    {insights.moodInsights.trend.charAt(0).toUpperCase() +
                      insights.moodInsights.trend.slice(1)}
                  </Text>
                </View>
              </View>

              <View className="flex-row justify-between">
                <View>
                  <Text className="text-sm text-gray-600">
                    Average Intensity
                  </Text>
                  <Text className="text-xl font-bold text-primary">
                    {insights.moodInsights.averageIntensity}/10
                  </Text>
                </View>
                <View>
                  <Text className="text-sm text-gray-600">Most Common</Text>
                  <Text className="text-xl font-bold text-secondary">
                    {insights.moodInsights.mostCommonMood.toLowerCase()}
                  </Text>
                </View>
                <View>
                  <Text className="text-sm text-gray-600">Total Entries</Text>
                  <Text className="text-xl font-bold text-gray-900">
                    {insights.moodInsights.totalEntries}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Mood Distribution */}
        {moodAnalytics && (
          <View className="mb-6">
            <Text className="text-lg font-semibold text-gray-900 mb-4">
              Mood Distribution (Last 30 Days)
            </Text>

            <View className="bg-white rounded-2xl border border-gray-100 p-4">
              {Object.entries(moodAnalytics.moodDistribution).map(
                ([mood, count]) => (
                  <View
                    key={mood}
                    className="flex-row justify-between items-center py-2"
                  >
                    <Text className="text-gray-700 capitalize">
                      {mood.toLowerCase()}
                    </Text>
                    <View className="flex-row items-center">
                      <View
                        className="bg-primary/20 rounded-full h-2 mr-3"
                        style={{
                          width: Math.max(
                            (count / moodAnalytics.totalEntries) * 100,
                            5
                          ),
                        }}
                      />
                      <Text className="text-gray-900 font-medium w-8 text-right">
                        {count}
                      </Text>
                    </View>
                  </View>
                )
              )}
            </View>
          </View>
        )}

        {/* Activity Insights */}
        {insights && (
          <View className="mb-6">
            <Text className="text-lg font-semibold text-gray-900 mb-4">
              Activity Summary
            </Text>

            <View className="bg-secondary/5 rounded-2xl p-4">
              <View className="flex-row justify-between mb-3">
                <View>
                  <Text className="text-sm text-gray-600">Chat Messages</Text>
                  <Text className="text-xl font-bold text-secondary">
                    {insights.activityInsights.chatMessagesCount}
                  </Text>
                </View>
                <View>
                  <Text className="text-sm text-gray-600">Daily Average</Text>
                  <Text className="text-xl font-bold text-secondary">
                    {insights.activityInsights.averageMessagesPerDay}
                  </Text>
                </View>
                <View>
                  <Text className="text-sm text-gray-600">Engagement</Text>
                  <Text className="text-xl font-bold text-secondary capitalize">
                    {insights.activityInsights.engagementLevel}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Recommendations */}
        {insights?.recommendations && insights.recommendations.length > 0 && (
          <View className="mb-6">
            <Text className="text-lg font-semibold text-gray-900 mb-4">
              Recommendations
            </Text>

            {insights.recommendations.map((rec, index) => (
              <View key={index} className="bg-amber-50 rounded-2xl p-4 mb-3">
                <Text className="font-semibold text-gray-900 mb-2">
                  {rec.title}
                </Text>
                <Text className="text-gray-600 text-sm mb-3">
                  {rec.description}
                </Text>
                <Pressable className="bg-primary rounded-full px-4 py-2 self-start">
                  <Text className="text-white font-medium text-sm">
                    {rec.action}
                  </Text>
                </Pressable>
              </View>
            ))}
          </View>
        )}

        {/* Refresh Button */}
        <Pressable
          onPress={loadInsights}
          className="bg-gray-100 rounded-full py-3 items-center"
        >
          <Text className="text-gray-700 font-medium">Refresh Insights</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default InsightsScreen;
