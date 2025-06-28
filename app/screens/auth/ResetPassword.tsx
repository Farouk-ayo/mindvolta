import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";
import NavigateBack from "@/components/ui/auth/NavigateBack";
import ResetPasswordForm from "@/components/ui/auth/ResetPasswordForm";

export default function ResetPasswordScreen() {
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

        <View className="mb-6">
          <Text className="text-2xl font-bold text-center text-gray-900 mb-1">
            Reset password
          </Text>
          <Text className="text-center text-gray-500 text-sm">
            Please enter a strong password that you can easily remember.
          </Text>
        </View>

        <ResetPasswordForm />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
