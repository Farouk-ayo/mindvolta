import React from "react";
import { Image, Pressable, Text, View } from "react-native";

interface MoodButtonProps {
  label: string;
  color: string;
  onPress: () => void;
  imageSource: any;
}
export const MoodButton: React.FC<MoodButtonProps> = ({
  label,
  color,
  onPress,
  imageSource,
}) => {
  return (
    <Pressable className="items-center active:scale-95" onPress={onPress}>
      <View
        className={`w-16 h-16 ${color} rounded-2xl items-center justify-center mb-2 shadow-sm`}
      >
        <Image
          source={imageSource}
          className="w-10 h-10"
          resizeMode="contain"
        />
      </View>
      <Text className="text-gray-700 text-sm font-medium">{label}</Text>
    </Pressable>
  );
};
