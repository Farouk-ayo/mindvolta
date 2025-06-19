import React from "react";
import { View, Text } from "react-native";

interface SongInfoProps {
  title: string;
  artist: string;
}

export const SongInfo: React.FC<SongInfoProps> = ({ title, artist }) => (
  <View className="items-center mb-10">
    <Text className="text-3xl font-bold text-gray-900 mb-2 text-center">
      {title}
    </Text>
    <Text className="text-lg text-gray-500 font-medium">By {artist}</Text>
  </View>
);
