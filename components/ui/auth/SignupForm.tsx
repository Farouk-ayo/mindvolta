import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import Toast from "react-native-toast-message";
import Input from "@/components/ui/Input";
import AuthButton from "@/components/ui/buttons/AuthButton";

export default function SignupForm() {
  const router = useRouter();
  const { signUp, isLoaded } = useSignUp();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "At least 8 characters required";
    } else if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(password)) {
      newErrors.password = "Use both letters and numbers";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!validateForm() || !isLoaded) return;

    setLoading(true);
    try {
      await signUp.create({
        emailAddress: email,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      Toast.show({
        type: "success",
        text1: "Check your email",
        text2: "We've sent you a verification code.",
      });

      router.push("/screens/auth/VerifyEmailScreen");
    } catch (err: any) {
      Toast.show({
        type: "error",
        text1: "Signup failed",
        text2: err.errors?.[0]?.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  const isFormFilled = email && password && confirmPassword;

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
        autoComplete="new-password"
      />

      <Input
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={(text) => {
          setConfirmPassword(text);
          setErrors((prev) => ({ ...prev, confirmPassword: "" }));
        }}
        error={errors.confirmPassword}
        isPassword
        autoComplete="new-password"
      />

      <AuthButton
        title="Create Account"
        onPress={handleSignup}
        loading={loading}
        variant={isFormFilled ? "primary" : "secondary"}
        className="my-6"
      />

      <View className="flex-row justify-center items-center mt-2">
        <Text className="text-gray-600">Already have an account? </Text>
        <Pressable onPress={() => router.push("/screens/auth/LoginScreen")}>
          <Text className="text-primary font-medium">Sign in</Text>
        </Pressable>
      </View>
    </View>
  );
}
