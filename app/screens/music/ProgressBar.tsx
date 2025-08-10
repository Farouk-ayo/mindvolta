import React from "react";
import { View, Text, Animated, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  progressAnim: Animated.Value;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentTime,
  duration,
  progressAnim,
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, width - 64],
  });

  return (
    <View className="mb-6">
      <View className="h-1 bg-gray-200 rounded-full mx-8 mb-3">
        <Animated.View
          className="h-full bg-secondary rounded-full"
          style={{ width: progressWidth }}
        />
      </View>

      <View className="flex-row justify-between mx-8">
        <Text className="text-sm text-gray-500 font-medium">
          {formatTime(currentTime)}
        </Text>
        <Text className="text-sm text-gray-500 font-medium">
          {formatTime(duration)}
        </Text>
      </View>
    </View>
  );
};

export default ProgressBar;
