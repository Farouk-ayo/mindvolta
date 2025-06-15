import { View, Text, Image } from "react-native";
import { useRouter } from "expo-router";
import { Button } from "@/components/ui/Button";

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-primary px-6 pt-24 pb-10 justify-between">
      <View className="items-center">
        <Image
          source={require("../../assets/icons/logo-2.png")}
          className="w-24 h-24 mb-6"
          resizeMode="contain"
        />
        <Text className="text-green-900 text-2xl font-bold text-center">
          For Your Mental Health Issues
        </Text>
        <Text className="text-base text-center text-black/80 mt-3 leading-6">
          Mindvolta is a smart chatbot that helps you tackle depression,
          anxiety, or addiction in young people — especially the undergraduates.
        </Text>
      </View>

      <View>
        <Button
          title="Start Now"
          onPress={() => router.push("/")}
          className="mb-4"
        />
        <Text className="text-center text-xs text-black/70">
          By continuing to use Mindvolta you agree to the{" "}
          <Text className="underline text-green-800">terms</Text> and
          acknowledge our{" "}
          <Text className="underline text-green-800">privacy notice</Text>.
        </Text>
      </View>
    </View>
  );
}
