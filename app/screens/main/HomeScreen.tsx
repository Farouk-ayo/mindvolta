import { MoodButton } from "@/components/ui/Buttons/MoodButton";
import { moodImages } from "@/constants/icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";

const moods = [
  {
    label: "Happy",
    color: "bg-[#EF5DA8]",
  },
  {
    label: "Calm",
    color: "bg-[#AEAFF7]",
  },
  {
    label: "Manic",
    color: "bg-[#A0E3E2]",
  },
  {
    label: "Angry",
    color: "bg-[#F09E54]",
  },
  {
    label: "Sad",
    color: "bg-[#C3F2A6]",
  },
];

export const HomeScreen: React.FC = () => {
  const router = useRouter();
  const handleMoodPress = (mood: string) => {
    console.log("Selected mood:", mood);
    alert(`You're feeling ${mood} today`);
  };

  const handleMindvoltraPress = () => {
    alert("Opening Mindvoltra AI...");
    router.push("/screens/chat/ChatScreen");
  };

  const handleListenNow = () => {
    router.push("/screens/music/MusicPlayerScreen");
    alert("Starting calming music...");
  };
  const handleClickHere = () => {
    router.push("/screens/flow/NameInputScreen");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
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
          <Pressable className="p-2 bg-gray-100 rounded-full">
            <Image
              source={require("../../../assets/icons/notification.png")}
              className="w-10 h-10"
              resizeMode="contain"
            />
          </Pressable>
        </View>

        <Pressable
          className="bg-transparent border border-secondary rounded-full px-4 py-3 flex-row items-center active:bg-gray-100"
          onPress={handleMindvoltraPress}
        >
          <Image
            source={require("../../../assets/icons/search.png")}
            className="w-5 h-5 mr-3"
            resizeMode="contain"
          />
          <Text className="text-gray-500 text-sm flex-1">
            Ask&nbsp;
            <Text className="text-secondary font-medium">Mindvoltra AI</Text>
            &nbsp; for your mental health issues
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
            <Pressable onPress={handleClickHere}>
              <Text className="text-secondary text-sm font-medium">
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

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingLeft: 0,
              paddingRight: 16,
              gap: 16,
            }}
            className="mb-6 -mx-4 px-4 w-full"
          >
            {moods.map((mood, index) => (
              <MoodButton
                key={index}
                label={mood.label}
                color={mood.color}
                imageSource={moodImages[mood.label.toLowerCase()]}
                onPress={() => handleMoodPress(mood.label)}
              />
            ))}
          </ScrollView>
        </View>

        {/* Today's Playlist */}
        <View className="px-4 mb-6">
          <Text className="text-lg font-semibold text-gray-900 mb-4">
            Today&apos;s playlist
          </Text>
          <View className="bg-secondary/10 rounded-2xl p-4 flex-row items-center">
            <View className="flex-1 mr-4">
              <Text className="text-lg font-bold text-gray-900 mb-2">
                Calming Music
              </Text>
              <Text className="text-gray-600 text-sm mb-4 leading-5">
                You need to calm yourself from the stress of the day. Then
                listen to it...
              </Text>
              <Pressable
                className=" rounded-full flex-row items-center self-start "
                onPress={handleListenNow}
              >
                <Text className=" font-semibold text-sm mr-2 text-secondary">
                  Listen Now
                </Text>
                <Image
                  source={require("../../../assets/icons/play.png")}
                  className="w-5 h-5"
                  resizeMode="contain"
                />
              </Pressable>
            </View>
            <View className="items-center justify-center w-16 h-16 bg-green-100 rounded-xl">
              <Image
                source={require("../../../assets/icons/music.png")}
                className="w-20 h-20"
                resizeMode="contain"
              />
            </View>
          </View>
        </View>

        {/* Thought of the day */}
        <View className="px-4 mb-6">
          <Text className="text-lg font-semibold text-gray-900 mb-4">
            Thought of the day
          </Text>
          <View className="bg-primary/10 rounded-2xl p-4 flex-row items-centerm">
            <View className="flex-1 mr-4">
              <Text className="text-base font-bold font-alegreya text-gray-900 mb-2">
                Who said you can&apos;t do it?
              </Text>
              <Text className="text-gray-600 text-sm leading-5 flex-1 mr-4">
                It is better to conquer yourself than to win a thousand
                battles...&nbsp;
                <Text className="text-primary font-medium">read more</Text>
              </Text>
            </View>

            <View className="flex-row items-center">
              <View className="items-center justify-center w-16 h-16  rounded-xl">
                <Image
                  source={require("../../../assets/icons/thought.png")}
                  className="w-20 h-20"
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Call Button - Floating */}
      <View className="absolute bottom-4 right-4">
        <Pressable className="w-14 h-14 bg-secondary rounded-full items-center justify-center shadow-lg active:scale-95">
          <Image
            source={require("../../../assets/icons/call.png")}
            resizeMode="contain"
          />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
