import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const FinalStepCompleteScreen = () => {
  const router = useRouter();

  const handleGoHome = () => {
    router.replace("/screens/main/HomeScreen");
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F4A300] items-center justify-between pb-10">
      <StatusBar barStyle="light-content" />

      <View className="flex-1 w-full items-center justify-center px-6">
        <Image
          source={require("../../../assets/images/success.png")}
          className="w-36 h-36 mb-6"
          resizeMode="contain"
        />
        <Text className="text-center text-lg font-bold text-green-900 mb-3">
          Thanks for allowing us{"\n"}to serve you better!
        </Text>
        <Text className="text-center text-sm text-black/80 px-6">
          With your details, we will be able to help you with{"\n"}
          the best of mental health solutions
        </Text>{" "}
        <TouchableOpacity
          className="w-[90%] bg-green-800 py-4 rounded-full mt-5"
          onPress={handleGoHome}
        >
          <Text className="text-white text-center font-semibold text-base">
            Back to Home
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default FinalStepCompleteScreen;
