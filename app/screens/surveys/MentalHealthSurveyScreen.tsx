import { CheckboxOption } from "@/components/ui/CheckboxOption";
import { Button } from "@/components/ui/Buttons/Button";
import { ProgressBar } from "@/components/ui/ProgresBar";
import React, { useState } from "react";
import { Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";

const mentalHealthOptions = [
  "Work/School",
  "Finances",
  "Relationships",
  "Health Concerns",
  "Life Changes",
];

interface Props {
  onBack?: () => void;
}

export const MentalHealthSurveyScreen: React.FC<Props> = ({ onBack }) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([
    "Work/School",
    "Relationships",
    "Life Changes",
  ]);

  const toggleOption = (option: string) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const handleSubmit = () => {
    console.log("Selected options:", selectedOptions);
    // You can navigate to next screen here
    alert(`Selected: ${selectedOptions.join(", ")}`);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-4 pt-2 pb-6">
        <View className="flex-row items-center mb-6">
          <Pressable
            className="mr-4 p-2 -ml-2 active:bg-gray-100 rounded-full"
            onPress={onBack}
          >
            <Text className="text-gray-600 text-lg">←</Text>
          </Pressable>
          <View className="flex-1 mr-12">
            <ProgressBar current={5} total={5} />
          </View>
          <Text className="text-gray-500 text-sm font-medium">5/5</Text>
        </View>

        <Text className="text-2xl font-bold text-gray-900 mb-2">
          What causes your mental health issues?
        </Text>
        <Text className="text-gray-600 text-base">
          What factors contribute to your mental health issues (select all that
          apply)
        </Text>
      </View>

      {/* Options */}
      <ScrollView className="flex-1 px-4">
        <View className="space-y-1">
          {mentalHealthOptions.map((option, index) => (
            <CheckboxOption
              key={`${option}-${index}`}
              label={option}
              selected={selectedOptions.includes(option)}
              onPress={() => toggleOption(option)}
            />
          ))}
        </View>
      </ScrollView>

      {/* Submit Button */}
      <View className="px-4 pb-6 pt-4">
        <Button
          title="Submit"
          onPress={handleSubmit}
          size="lg"
          disabled={selectedOptions.length === 0}
        />
      </View>
    </SafeAreaView>
  );
};

export default MentalHealthSurveyScreen;
