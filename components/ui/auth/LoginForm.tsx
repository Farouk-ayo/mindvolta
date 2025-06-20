import { useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import Input from "@/components/ui/Input";
import AuthButton from "@/components/ui/buttons/AuthButton";
import Toast from "react-native-toast-message";

export default function LoginForm() {
  const router = useRouter();
  const { signIn, isLoaded, setActive } = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setErrors({
        email: !email ? "Email is required" : undefined,
        password: !password ? "Password is required" : undefined,
      });
      return;
    }

    if (!isLoaded) return;

    setLoading(true);
    try {
      const res = await signIn.create({ identifier: email, password });
      await setActive({ session: res.createdSessionId });
      router.replace("/(tabs)");
    } catch (err: any) {
      Toast.show({
        type: "error",
        text1: "Login failed",
        text2: err.errors?.[0]?.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="px-6">
      <Input
        label="Email"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setErrors((prev) => ({ ...prev, email: "" }));
        }}
        error={errors.email}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
      />

      <Input
        label="Password"
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          setErrors((prev) => ({ ...prev, password: "" }));
        }}
        error={errors.password}
        isPassword
        autoComplete="password"
      />

      <Pressable onPress={() => {}} className="mb-4 mt-2">
        <Text className="text-secondary text-right font-medium">
          Forgot password?
        </Text>
      </Pressable>

      <AuthButton
        title="Login"
        onPress={handleLogin}
        loading={loading}
        variant={email && password ? "primary" : "secondary"}
        className="mb-8"
      />
    </View>
  );
}
