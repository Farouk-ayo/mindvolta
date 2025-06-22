import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StatusBar,
  Text,
  TextInput,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

export default function VerifyEmailScreen() {
  const router = useRouter();
  const { signUp, setActive, isLoaded } = useSignUp();

  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState<"idle" | "verifying" | "redirecting">(
    "idle"
  );

  const inputsRef = useRef<(TextInput | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const isCodeComplete = code.every((char) => char !== "");

  const handleVerify = async () => {
    if (!isCodeComplete || !isLoaded) return;

    setLoading("verifying");
    const fullCode = code.join("");

    try {
      const result = await signUp.attemptEmailAddressVerification({
        code: fullCode,
      });

      await setActive({ session: result.createdSessionId });
      setLoading("redirecting");

      setTimeout(() => {
        router.replace("/(tabs)");
      }, 1200);
    } catch (err: any) {
      Toast.show({
        type: "error",
        text1: "Invalid code",
        text2: err.errors?.[0]?.message || "Please try again.",
      });
      setLoading("idle");
    }
  };

  const handleResend = async () => {
    if (!isLoaded) return;
    try {
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      Toast.show({
        type: "success",
        text1: "OTP resent",
        text2: "Check your inbox again.",
      });
    } catch {
      Toast.show({ type: "error", text1: "Failed to resend OTP" });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white px-6"
    >
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View className="pt-12">
        <Pressable
          onPress={() => router.back()}
          className="flex-row items-center mb-6"
        >
          <ChevronLeft size={24} color="#374151" />
          <Text className="ml-2 text-gray-700 text-base">Back</Text>
        </Pressable>

        <Text className="text-2xl font-bold text-center text-gray-900 mb-2">
          Enter OTP
        </Text>
        <Text className="text-center text-gray-600 mb-8">
          We’ve sent a 6 digit code to{" "}
          <Text className="font-semibold text-gray-800">
            {signUp?.emailAddress}
          </Text>
          .
        </Text>

        {/* OTP Inputs */}
        <View className="flex-row justify-between px-2 mb-6">
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => {
                inputsRef.current[index] = ref;
              }}
              value={digit}
              onChangeText={(text) => handleChange(index, text.slice(-1))}
              keyboardType="number-pad"
              maxLength={1}
              className={`w-12 h-14 rounded-xl border-2 text-center text-lg font-semibold ${
                loading === "redirecting"
                  ? "border-secondary"
                  : "border-gray-300"
              }`}
            />
          ))}
        </View>

        {/* Resend Link */}
        <Text className="text-center text-sm text-gray-600 mb-4">
          Didn’t get a code?{" "}
          <Text
            onPress={handleResend}
            className="text-red-500 font-bold  underline"
          >
            Resend OTP
          </Text>
        </Text>

        {/* Button */}
        <Pressable
          disabled={!isCodeComplete || loading !== "idle"}
          onPress={handleVerify}
          className={`w-full h-12 rounded-full justify-center items-center ${
            isCodeComplete ? "bg-primary" : "bg-gray-300"
          }`}
        >
          <Text className="text-white font-medium text-base">
            {loading === "idle"
              ? "Verify code"
              : loading === "verifying"
                ? "Verifying ✨"
                : "Redirecting ✨"}
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}
