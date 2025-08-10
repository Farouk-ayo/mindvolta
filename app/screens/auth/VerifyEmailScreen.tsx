import NavigateBack from "@/components/ui/auth/NavigateBack";
import VerifyEmailForm from "@/components/ui/auth/VerifyEmailForm";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
} from "react-native";

export default function VerifyEmailScreen() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white px-6"
    >
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-start" }}
        keyboardShouldPersistTaps="handled"
      >
        <NavigateBack />

        <Text className="text-2xl font-bold text-center text-gray-900 mb-2">
          Enter OTP
        </Text>
        <Text className="text-center text-gray-600 mb-8">
          We’ve sent a 6 digit code to{" "}
          <Text className="font-semibold text-gray-800"> email@email.com</Text>.
        </Text>

        <VerifyEmailForm />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
