import React from "react";
import { Pressable, Text, View } from "react-native";

interface CheckboxOptionProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

export const CheckboxOption: React.FC<CheckboxOptionProps> = ({
  label,
  selected,
  onPress,
}) => {
  return (
    <Pressable
      className="flex-row items-center justify-between py-4 px-1 active:bg-gray-50 rounded-lg"
      onPress={onPress}
    >
      <Text className="text-gray-800 text-base font-medium flex-1">
        {label}
      </Text>
      <View
        className={`w-6 h-6 rounded-full border-2 items-center justify-center ${
          selected ? "border-green-500 bg-green-500" : "border-gray-300"
        }`}
      >
        {selected && <View className="w-2 h-2 bg-white rounded-full" />}
      </View>
    </Pressable>
  );
};
