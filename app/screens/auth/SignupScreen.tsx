import AnimatedFadeSlide from "@/components/AnimatedFadeSlide";
import SignupForm from "@/components/ui/auth/SignupForm";
import SocialButton from "@/components/ui/buttons/SocialButton";
import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";

export default function SignupScreen() {
  const router = useRouter();

  const handleSocialSignup = (provider: "google" | "facebook" | "apple") => {
    Alert.alert("Social Signup", `${provider} signup not implemented yet`);
  };

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
        <AnimatedFadeSlide delay={0} offsetY={-20}>
          <View className="pt-12 px-6">
            <ChevronLeft
              size={24}
              color="#374151"
              onPress={() => router.back()}
            />
            <Text className="text-3xl font-bold mt-6 text-gray-900">
              Create an account
            </Text>
            <Text className="text-gray-600 mt-2">
              Fill in your details to get started
            </Text>
          </View>
        </AnimatedFadeSlide>

        <AnimatedFadeSlide delay={200}>
          <SignupForm />
        </AnimatedFadeSlide>

        <AnimatedFadeSlide delay={400}>
          <View className="px-6 mb-6">
            <Text className="text-center text-gray-600 mb-4">
              Or continue with
            </Text>
            <View className="flex-row justify-center space-x-4">
              <SocialButton
                provider="google"
                onPress={() => handleSocialSignup("google")}
              />
              <SocialButton
                provider="facebook"
                onPress={() => handleSocialSignup("facebook")}
              />
              <SocialButton
                provider="apple"
                onPress={() => handleSocialSignup("apple")}
              />
            </View>
          </View>
        </AnimatedFadeSlide>
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
