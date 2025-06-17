import { MoodButton } from "@/components/ui/Buttons/MoodButton";
import React from "react";
import { Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";

const moods = [
  { emoji: "😊", label: "Happy", color: "bg-pink-200" },
  { emoji: "😌", label: "Calm", color: "bg-purple-200" },
  { emoji: "😰", label: "Manic", color: "bg-cyan-200" },
  { emoji: "😠", label: "Angry", color: "bg-orange-200" },
  { emoji: "😢", label: "Sad", color: "bg-green-200" },
];

export const HomeScreen: React.FC = () => {
  const handleMoodPress = (mood: string) => {
    console.log("Selected mood:", mood);
    alert(`You're feeling ${mood} today`);
  };

  const handleMindvoltraPress = () => {
    console.log("Ask Mindvoltra AI pressed");
    alert("Opening Mindvoltra AI...");
  };

  const handleListenNow = () => {
    console.log("Listen Now pressed");
    alert("Starting calming music...");
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="px-4 pt-4 pb-6 bg-white">
        <View className="flex-row items-center justify-between mb-6">
          <View className="flex-row items-center">
            <View className="w-10 h-10 bg-orange-200 rounded-full mr-3 items-center justify-center">
              <Text className="text-orange-600 font-bold">S</Text>
            </View>
            <View>
              <Text className="text-gray-500 text-sm">Hello,</Text>
              <Text className="text-xl font-bold text-gray-900">Samanda</Text>
            </View>
          </View>
          <Pressable className="p-2">
            <Text className="text-gray-400 text-xl">🔔</Text>
          </Pressable>
        </View>

        {/* Ask Mindvoltra AI */}
        <Pressable
          className="bg-gray-50 rounded-full px-4 py-3 flex-row items-center active:bg-gray-100"
          onPress={handleMindvoltraPress}
        >
          <Text className="text-gray-500 text-base flex-1">
            🔍 Ask Mindvoltra AI for your mental health issues
          </Text>
        </Pressable>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Complete Steps */}
        <View className="px-4 mb-6">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-lg font-bold text-gray-900">
              Complete these steps 1/5
            </Text>
            <Pressable>
              <Text className="text-blue-500 text-sm font-medium">
                Click here
              </Text>
            </Pressable>
          </View>
          <Text className="text-gray-600 text-sm mb-6">
            Kindly complete these steps to make us serve you better
          </Text>

          {/* Mood Selection */}
          <Text className="text-base font-semibold text-gray-900 mb-4">
            How are you feeling today?
          </Text>
          <View className="flex-row justify-between">
            {moods.map((mood, index) => (
              <MoodButton
                key={index}
                emoji={mood.emoji}
                label={mood.label}
                color={mood.color}
                onPress={() => handleMoodPress(mood.label)}
              />
            ))}
          </View>
        </View>

        {/* Today's Playlist */}
        <View className="px-4 mb-6">
          <Text className="text-lg font-bold text-gray-900 mb-4">
            Today&apos;s playlist
          </Text>
          <View className="bg-green-50 rounded-2xl p-4 flex-row items-center">
            <View className="flex-1 mr-4">
              <Text className="text-lg font-bold text-gray-900 mb-2">
                Calming Music
              </Text>
              <Text className="text-gray-600 text-sm mb-4 leading-5">
                You need to calm yourself from the stress of the day. Then
                listen to it...
              </Text>
              <Pressable
                className="bg-green-600 rounded-full px-4 py-2 flex-row items-center self-start active:bg-green-700"
                onPress={handleListenNow}
              >
                <Text className="text-white font-semibold text-sm mr-2">
                  Listen Now
                </Text>
                <Text className="text-white">▶️</Text>
              </Pressable>
            </View>
            <View className="items-center justify-center w-16 h-16 bg-green-100 rounded-xl">
              <Text className="text-2xl">🎵</Text>
            </View>
          </View>
        </View>

        {/* Thought of the day */}
        <View className="px-4 mb-6">
          <Text className="text-lg font-bold text-gray-900 mb-4">
            Thought of the day
          </Text>
          <View className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <Text className="text-base font-semibold text-gray-900 mb-2">
              Who said you can&apos;t do it?
            </Text>
            <View className="flex-row items-center">
              <Text className="text-gray-600 text-sm leading-5 flex-1 mr-4">
                It is better to conquer yourself than to win a thousand
                battles...{" "}
                <Text className="text-orange-500 font-medium">read more</Text>
              </Text>
              <View className="w-12 h-12 bg-yellow-100 rounded-lg items-center justify-center">
                <Text className="text-2xl">🧠</Text>
              </View>
            </View>
          </View>
        </View>

        <View className="h-20" />
      </ScrollView>

      {/* Call Button - Floating */}
      <View className="absolute bottom-24 right-4">
        <Pressable className="w-14 h-14 bg-green-600 rounded-full items-center justify-center shadow-lg active:scale-95">
          <Text className="text-white text-xl">📞</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
