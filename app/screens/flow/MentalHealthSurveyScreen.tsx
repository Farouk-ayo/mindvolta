import { Button } from "@/components/ui/buttons/Button";
import { CheckboxOption } from "@/components/ui/CheckboxOption";
import { completeOnboarding } from "@/lib/api/mutation";
import { useAuth } from "@/lib/hooks/useAuth";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import StepLayout from "./StepLayout";
import { handleErrorGlobal } from "@/lib/utils";

const options = [
  "Work/School",
  "Finances",
  "Relationships",
  "Life Changes",
  "Health Concerns",
];

const MentalHealthSurveyScreen = () => {
  const [selected, setSelected] = useState<string[]>(["Work/School"]);
  const [isLoading, setIsLoading] = useState(false);
  const { user, refreshUser } = useAuth();
  const router = useRouter();

  const toggle = (option: string) => {
    setSelected((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const handleSubmit = async () => {
    if (selected.length === 0) {
      Alert.alert("Selection Required", "Please select at least one option.");
      return;
    }
    setIsLoading(true);

    try {
      await completeOnboarding({
        name: user?.name || "User",
        mentalHealthIssues: [], // This could be from a previous screen
        stressCauses: selected,
      });

      await refreshUser(); // Refresh user data
      router.push("/screens/flow/CompletionScreen");
    } catch (error: any) {
      handleErrorGlobal(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <StepLayout
      step={5}
      total={5}
      title="What causes your mental health issues?"
      subtitle="What factors contribute to your mental health issues (select all that apply)"
    >
      <ScrollView className="flex-1 px-4 pt-4">
        <View className="space-y-2">
          {options.map((option, index) => (
            <CheckboxOption
              key={index}
              label={option}
              selected={selected.includes(option)}
              onPress={() => toggle(option)}
            />
          ))}
        </View>
      </ScrollView>

      <View className="px-4 pb-6 pt-4">
        <Button
          title="Submit"
          variant="secondary"
          onPress={handleSubmit}
          size="lg"
          loading={isLoading}
          disabled={selected.length === 0}
        />
      </View>
    </StepLayout>
  );
};

export default MentalHealthSurveyScreen;
