import React from "react";
import { Pressable, Text, View } from "react-native";

interface MoodButtonProps {
  emoji: string;
  label: string;
  color: string;
  onPress: () => void;
}

export const MoodButton: React.FC<MoodButtonProps> = ({
  emoji,
  label,
  color,
  onPress,
}) => {
  return (
    <Pressable className="items-center active:scale-95" onPress={onPress}>
      <View
        className={`w-16 h-16 ${color} rounded-2xl items-center justify-center mb-2 shadow-sm`}
      >
        <Text className="text-2xl">{emoji}</Text>
      </View>
      <Text className="text-gray-700 text-sm font-medium">{label}</Text>
    </Pressable>
  );
};
