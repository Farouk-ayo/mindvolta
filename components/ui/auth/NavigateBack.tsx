import { View, Text, Pressable } from "react-native";
import React from "react";
import AnimatedFadeSlide from "@/components/AnimatedFadeSlide";
import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";

const NavigateBack = () => {
  const router = useRouter();
  return (
    <AnimatedFadeSlide delay={0} offsetY={-20}>
      <View className="pt-4 px-6">
        <Pressable
          onPress={() => router.back()}
          className="flex-row items-center space-x-1 mb-6"
        >
          <ChevronLeft size={24} color="#374151" />
          <Text className="text-gray-700 text-base">Back</Text>
        </Pressable>
      </View>
    </AnimatedFadeSlide>
  );
};

export default NavigateBack;
