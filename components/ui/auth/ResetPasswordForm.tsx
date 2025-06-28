import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
// import { useResetPassword } from "@clerk/clerk-expo";
import Toast from "react-native-toast-message";

const passwordRules = [
  { label: "8 or more characters", test: (val: string) => val.length >= 8 },
  { label: "At least 1 number", test: (val: string) => /\d/.test(val) },
  {
    label: "At least 1 special character",
    test: (val: string) => /[!@#$%^&*(),.?":{}|<>]/.test(val),
  },
  {
    label: "At least 1 uppercase letter",
    test: (val: string) => /[A-Z]/.test(val),
  },
];

export default function ResetPasswordForm() {
  // const router = useRouter();
  // const { isLoaded, setPassword, setActive, status } = useResetPassword();

  const [password, setPasswordInput] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const allValid = passwordRules.every((rule) => rule.test(password));
  const canSubmit =
    password && confirmPassword && password === confirmPassword && allValid;

  const handleSubmit = async () => {
    // if (!canSubmit || !isLoaded) return;

    setLoading(true);

    try {
      // const result = await setPassword({ password });
      // if (result.status === "complete") {
      //   await setActive({ session: result.createdSessionId });
      //   router.push("/screens/auth/PasswordChangedScreen");
      // } else {
      //   Toast.show({
      //     type: "error",
      //     text1: "Reset incomplete",
      //     text2: "Please check your input or try again.",
      //   });
      // }
    } catch (err: any) {
      Toast.show({
        type: "error",
        text1: "Reset failed",
        text2: err.errors?.[0]?.message || "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="mt-6">
      <View className="mb-4">
        <Text className="mb-1 text-sm font-medium text-gray-800">Password</Text>
        <TextInput
          secureTextEntry
          value={password}
          onChangeText={setPasswordInput}
          placeholder="Enter new password"
          className="border border-gray-300 rounded-xl px-4 py-3"
        />
        <View className="mt-3 space-y-1 px-1">
          {passwordRules.map((rule, idx) => (
            <Text
              key={idx}
              className={`text-sm ${
                rule.test(password) ? "text-green-600" : "text-gray-400"
              }`}
            >
              • {rule.label}
            </Text>
          ))}
        </View>
      </View>

      <View className="mb-6">
        <Text className="mb-1 text-sm font-medium text-gray-800">
          Confirm Password
        </Text>
        <TextInput
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm password"
          className="border border-gray-300 rounded-xl px-4 py-3"
        />
      </View>

      <Pressable
        disabled={!canSubmit || loading}
        onPress={handleSubmit}
        className={`h-12 rounded-full justify-center items-center ${
          canSubmit ? "bg-yellow-400" : "bg-gray-300"
        }`}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white font-medium text-base">
            Reset password
          </Text>
        )}
      </Pressable>
    </View>
  );
}
