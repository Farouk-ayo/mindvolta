import { Button } from "@/components/ui/buttons/Button";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { TextInput, View } from "react-native";
import { StepLayout } from "./StepLayout";

const NameInputScreen = () => {
  const [name, setName] = useState("Samanda");
  const router = useRouter();

  const handleContinue = () => {
    router.push("/screens/flow/MentalHealthSurveyScreen");
  };

  return (
    <StepLayout
      step={1}
      total={5}
      title="What should we call you?"
      subtitle="Let us know what we should call you"
    >
      <View className="flex-1 px-4 justify-start items-center">
        <TextInput
          className="text-center text-xl font-medium text-gray-900 py-4 border border-gray-200 focus:border-primary/50 rounded-full w-full"
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
          placeholderTextColor="#9CA3AF"
          autoFocus
        />
        <Button
          title="Continue"
          onPress={handleContinue}
          className="mt-8 w-full"
          variant="secondary"
          size="lg"
          disabled={name.trim().length === 0}
        />
      </View>
    </StepLayout>
  );
};

export default NameInputScreen;
