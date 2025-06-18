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
      onPress={onPress}
      className="flex-row items-center justify-between bg-white border border-gray-200 rounded-full px-5 py-3 mb-3"
    >
      <Text className="text-base text-gray-800 font-medium">{label}</Text>

      <View
        className={`w-6 h-6 rounded-full items-center justify-center ${
          selected ? "bg-secondary" : "border border-gray-500"
        }`}
      >
        {selected ? (
          <View className="w-5 h-5 bg-white rounded-full items-center justify-center">
            <View className="w-3.5 h-3.5 bg-secondary rounded-full" />
          </View>
        ) : null}
      </View>
    </Pressable>
  );
};
