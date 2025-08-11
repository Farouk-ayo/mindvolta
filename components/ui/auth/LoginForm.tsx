import Input from "@/components/ui/Input";
import AuthButton from "@/components/ui/buttons/AuthButton";
import { useAuth } from "@/lib/hooks/useAuth";
import { handleErrorGlobal } from "@/lib/utils";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const { login, isLoading } = useAuth();
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const handleLogin = async () => {
    if (!email || !password) {
      setErrors({
        email: !email ? "Email is required" : undefined,
        password: !password ? "Password is required" : undefined,
      });
      return;
    }

    try {
      await login({ email, password });
      router.replace("/(tabs)");
    } catch (error: any) {
      handleErrorGlobal(error);
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
        loading={isLoading}
        variant={email && password ? "primary" : "secondary"}
        className="mb-8"
      />
    </View>
  );
}
