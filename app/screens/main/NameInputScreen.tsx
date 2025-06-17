import { Button } from "@/components/ui/Buttons/Button";
import { ProgressBar } from "@/components/ui/ProgresBar";
import React, { useState } from "react";
import { Pressable, SafeAreaView, Text, TextInput, View } from "react-native";

interface Props {
  onBack?: () => void;
}

export const NameInputScreen: React.FC<Props> = ({ onBack }) => {
  const [name, setName] = useState("Samanda");

  const handleContinue = () => {
    console.log("Name:", name);
    alert(`Welcome, ${name}!`);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-4 pt-2 pb-8">
        <View className="flex-row items-center mb-8">
          <Pressable
            className="mr-4 p-2 -ml-2 active:bg-gray-100 rounded-full"
            onPress={onBack}
          >
            <Text className="text-gray-600 text-lg">←</Text>
          </Pressable>
          <View className="flex-1 mr-12">
            <ProgressBar current={1} total={5} />
          </View>
          <Text className="text-gray-500 text-sm font-medium">1/5</Text>
        </View>
      </View>

      {/* Content */}
      <View className="flex-1 px-4 justify-center -mt-20">
        <View className="items-center">
          <Text className="text-2xl font-bold text-gray-900 mb-2 text-center">
            What should we call you?
          </Text>
          <Text className="text-gray-600 text-base mb-8 text-center">
            Let us know what we should call you
          </Text>

          <View className="w-full max-w-xs">
            <TextInput
              className="text-center text-xl font-medium text-gray-900 py-4 border-b border-gray-200 focus:border-orange-400"
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
              placeholderTextColor="#9CA3AF"
              autoFocus
            />
          </View>
        </View>
      </View>

      {/* Continue Button */}
      <View className="px-4 pb-6">
        <Button
          title="Continue"
          onPress={handleContinue}
          size="lg"
          disabled={name.trim().length === 0}
        />
      </View>
    </SafeAreaView>
  );
};

export default NameInputScreen;
