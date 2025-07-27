import AnimatedFadeSlide from "@/components/AnimatedFadeSlide";
import NavigateBack from "@/components/ui/auth/NavigateBack";
import SignupForm from "@/components/ui/auth/SignupForm";
import SocialLogins from "@/components/ui/auth/SocialLogins";
import { useRouter } from "expo-router";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";

export default function SignupScreen() {
  const router = useRouter();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
    >
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
        keyboardShouldPersistTaps="handled"
      >
        <NavigateBack />
        <AnimatedFadeSlide delay={0} offsetY={-20}>
          <View className="pt-12 px-6">
            <Text className="text-3xl font-bold mt-6 text-gray-900">
              Create an account
            </Text>
            <Text className="text-gray-600 mt-2">
              Fill in your details to get started
            </Text>
          </View>
        </AnimatedFadeSlide>

        <SignupForm />

        <SocialLogins />
        <AnimatedFadeSlide delay={600}>
          <View className="px-6 pb-8">
            <Text className="text-center text-gray-500 text-xs mt-4 leading-4">
              By signing up, you agree to our&nbsp;
              <Text
                className="text-primary font-medium underline"
                onPress={() => router.push("/")}
              >
                Terms of Service
              </Text>
              &nbsp; and&nbsp;
              <Text
                className="text-primary font-medium underline"
                onPress={() => router.push("/")}
              >
                Privacy Policy
              </Text>
              .
            </Text>
          </View>
        </AnimatedFadeSlide>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
