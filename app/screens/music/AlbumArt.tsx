import React from "react";
import { Image, ImageSourcePropType, View } from "react-native";

interface AlbumArtProps {
  source: ImageSourcePropType;
}

export const AlbumArt: React.FC<AlbumArtProps> = ({ source }) => (
  <View className="items-center mb-12">
    <View className="relative">
      <View className="w-80 h-80 rounded-3xl bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 shadow-2xl shadow-purple-200/50">
        <Image
          source={source}
          className="w-full h-full rounded-3xl"
          resizeMode="cover"
        />
      </View>
      <View className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full opacity-80" />
      <View className="absolute -bottom-3 -left-3 w-4 h-4 bg-green-400 rounded-full opacity-70" />
    </View>
  </View>
);
