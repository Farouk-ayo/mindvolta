import { useRouter } from "expo-router";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import AnimatedFadeSlide from "@/components/AnimatedFadeSlide";
import LoginForm from "@/components/ui/auth/LoginForm";
import SocialLogins from "@/components/ui/auth/SocialLogins";
import NavigateBack from "@/components/ui/auth/NavigateBack";

export default function LoginScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white py-10">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 bg-white"
      >
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "space-between",
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <NavigateBack />
          <AnimatedFadeSlide delay={200}>
            <View className="mb-6 text-center flex justify-center items-center">
              <Text className="text-3xl font-bold text-gray-900 mb-1">
                Login
              </Text>
              <Text className="text-gray-600 text-base mb-4">
                Fill in your details below to continue
              </Text>
            </View>

            <LoginForm />
            <SocialLogins />

            <View className="flex-row justify-center items-center">
              <Text className="text-gray-600">Don&#39;t have an account? </Text>
              <Pressable
                onPress={() => router.push("/screens/auth/SignupScreen")}
              >
                <Text className="text-amber-500 font-semibold">Sign up</Text>
              </Pressable>
            </View>
          </AnimatedFadeSlide>
          <AnimatedFadeSlide delay={600}>
            <View className="px-6 pb-8">
              <Text className="text-center text-xs text-gray-500 mt-6 leading-4">
                By continuing to use Mindvolta, you agree to the
                <Text className="text-amber-500 underline"> terms </Text>and
                acknowledge our
                <Text className="text-amber-500 underline">
                  {" "}
                  privacy notice
                </Text>
                .
              </Text>
            </View>
          </AnimatedFadeSlide>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
