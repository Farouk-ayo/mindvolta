import { Button } from "@/components/ui/buttons/Button";
import { CheckboxOption } from "@/components/ui/CheckboxOption";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import StepLayout from "./StepLayout";

const options = [
  "Work/School",
  "Finances",
  "Relationships",
  "Health Concerns",
  "Life Changes",
  "Health Concerns",
];

const MentalHealthSurveyScreen = () => {
  const [selected, setSelected] = useState<string[]>(["Work/School"]);
  const router = useRouter();

  const toggle = (option: string) => {
    setSelected((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const handleSubmit = () => {
    if (selected.length === 0) {
      alert("Please select at least one option.");
      return;
    }
    router.push("/screens/flow/CompletionScreen");
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
          disabled={selected.length === 0}
        />
      </View>
    </StepLayout>
  );
};

export default MentalHealthSurveyScreen;
