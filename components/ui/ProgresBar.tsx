import React from "react";
import { View } from "react-native";

interface ProgressBarProps {
  current: number;
  total: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const percentage = (current / total) * 100;

  return (
    <View className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
      <View
        className="h-full bg-secondary rounded-full transition-all duration-300"
        style={{ width: `${percentage}%` }}
      />
    </View>
  );
};
