import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import React from "react";
import { Pressable, Text, View } from "react-native";

interface MusicPlayerHeaderProps {
  title: string;
  onBack: () => void;
}

const MusicPlayerHeader: React.FC<MusicPlayerHeaderProps> = ({
  title,
  onBack,
}) => {
  const router = useRouter();

  return (
    <View className="flex-row items-center justify-between px-6 py-4">
      <Pressable
        onPress={() => router.back()}
        className="flex-row items-center space-x-1 "
      >
        <ChevronLeft size={24} color="#374151" />
        <Text className="text-gray-700 text-base">Back</Text>
      </Pressable>

      <Text className="text-lg font-semibold text-gray-900">{title}</Text>
      <View className="w-10 h-10" />
    </View>
  );
};

export default MusicPlayerHeader;
