import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

export default function VerifyEmailForm() {
  const { signUp, setActive, isLoaded } = useSignUp();
  const router = useRouter();

  const [code, setCode] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState<"idle" | "verifying" | "redirecting">(
    "idle"
  );

  const inputsRef = useRef<(TextInput | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const isCodeFilled = code.every((c) => c !== "");

  const handleVerify = async () => {
    if (!isCodeFilled || !isLoaded) return;
    setLoading("verifying");

    try {
      const res = await signUp.attemptEmailAddressVerification({
        code: code.join(""),
      });

      await setActive({ session: res.createdSessionId });
      setLoading("redirecting");

      setTimeout(() => {
        router.replace("/(tabs)");
      }, 1200);
    } catch (err: any) {
      Toast.show({
        type: "error",
        text1: "Invalid code",
        text2: err.errors?.[0]?.message || "Try again.",
      });
      setLoading("idle");
    }
  };

  const handleResend = async () => {
    if (!isLoaded) return;
    try {
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      Toast.show({ type: "success", text1: "OTP resent" });
    } catch {
      Toast.show({ type: "error", text1: "Failed to resend OTP" });
    }
  };

  return (
    <View>
      <View className="flex-row justify-between px-2 mb-6">
        {code.map((digit, i) => (
          <TextInput
            key={i}
            ref={(ref) => {
              inputsRef.current[i] = ref;
            }}
            value={digit}
            onChangeText={(text) => handleChange(i, text)}
            keyboardType="number-pad"
            maxLength={1}
            className={`w-12 h-14 rounded-xl border-2 text-center text-lg font-semibold ${
              loading === "redirecting" ? "border-green-500" : "border-gray-300"
            }`}
          />
        ))}
      </View>

      <Text className="text-center text-sm text-gray-600 mb-4">
        Didn’t get a code?{" "}
        <Text
          onPress={handleResend}
          className="text-red-500 font-bold underline"
        >
          Resend OTP
        </Text>
      </Text>

      <Pressable
        disabled={!isCodeFilled || loading !== "idle"}
        onPress={handleVerify}
        className={`w-full h-12 rounded-full justify-center items-center ${
          isCodeFilled ? "bg-yellow-400" : "bg-gray-300"
        }`}
      >
        {loading === "idle" ? (
          <Text className="text-white font-medium text-base">Verify code</Text>
        ) : (
          <View className="flex-row items-center gap-2">
            <ActivityIndicator size="small" color="#fff" />
            <Text className="text-white font-medium text-base">
              {loading === "verifying" ? "Verifying" : "Redirecting"}
            </Text>
          </View>
        )}
      </Pressable>
    </View>
  );
}
