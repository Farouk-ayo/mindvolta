import NavigateBack from "@/components/ui/auth/NavigateBack";
import VerifyEmailForm from "@/components/ui/auth/VerifyEmailForm";
import { useSignUp } from "@clerk/clerk-expo";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
} from "react-native";

export default function VerifyEmailScreen() {
  const { signUp } = useSignUp();
  const email = signUp?.emailAddress;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white px-6"
    >
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        keyboardShouldPersistTaps="handled"
      >
        <NavigateBack />

        <Text className="text-2xl font-bold text-center text-gray-900 mb-2">
          Enter OTP
        </Text>
        <Text className="text-center text-gray-600 mb-8">
          We’ve sent a 6 digit code to{" "}
          <Text className="font-semibold text-gray-800">{email}</Text>.
        </Text>

        <VerifyEmailForm />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
