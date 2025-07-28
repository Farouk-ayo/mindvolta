import { ProgressBar } from "@/components/ui/ProgresBar";
import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import React from "react";
import { Pressable, SafeAreaView, Text, View } from "react-native";

interface StepLayoutProps {
  step: number;
  total: number;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  onBack?: () => void;
}

const StepLayout: React.FC<StepLayoutProps> = ({
  step,
  total,
  title,
  subtitle,
  children,
  onBack,
}) => {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 justify-center bg-white">
      {/* Header */}
      <View className="px-4 pt-2 pb-6">
        <View className="flex-row items-center mb-5">
          <Pressable
            onPress={onBack || router.back}
            className="flex-row items-center space-x-1"
          >
            <ChevronLeft size={24} color="#374151" />
            <Text className="text-gray-700 text-base">Back</Text>
          </Pressable>
          <View className="flex-1 mx-6">
            <ProgressBar current={step} total={total} />
          </View>
          <Text className="text-gray-500 text-sm font-medium">
            {step}/{total}
          </Text>
        </View>
        <View className="mt-5 text-center flex justify-center items-center max-w-[80%] mx-auto">
          <Text className="text-2xl font-bold text-gray-900 text-center">
            {title}
          </Text>
          {subtitle && (
            <Text className="text-gray-600 text-base mt-1 text-center">
              {subtitle}
            </Text>
          )}
        </View>
      </View>

      {children}
    </SafeAreaView>
  );
};

export default StepLayout;
