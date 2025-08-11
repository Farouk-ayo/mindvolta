import { Button } from "@/components/ui/buttons/Button";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, TextInput, View } from "react-native";
import StepLayout from "./StepLayout";
import { useAuth } from "@/lib/hooks/useAuth";
import { handleErrorGlobal } from "@/lib/utils";

const NameInputScreen = () => {
  const params = useLocalSearchParams();
  const email = Array.isArray(params.email)
    ? params.email[0]
    : (params.email ?? "");
  const password = Array.isArray(params.password)
    ? params.password[0]
    : (params.password ?? "");
  const [name, setName] = useState("");
  const { register, isLoading } = useAuth();
  const router = useRouter();

  const handleContinue = async () => {
    try {
      await register({ email, password, name });
      router.push("/screens/flow/MentalHealthSurveyScreen");
    } catch (error: any) {

      handleErrorGlobal(error);
    }
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
          disabled={name.trim().length === 0 || isLoading}
        />
      </View>
    </StepLayout>
  );
};

export default NameInputScreen;
