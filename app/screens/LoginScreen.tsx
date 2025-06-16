import React, { useState } from "react";
import {
  View,
  Text,
  StatusBar,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";

import AnimatedFadeSlide from "@/components/AnimatedFadeSlide";
import Input from "@/components/ui/Input";
import AuthButton from "@/components/ui/AuthButton";
import SocialButton from "@/components/ui/SocialButton";

export default function LoginScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (
        formData.email === "williams@gmail.com" &&
        formData.password === "password123"
      ) {
        Alert.alert("Success", "Login successful!");
        // router.replace('/main');
      } else {
        Alert.alert("Error", "Invalid credentials");
      }
    } catch {
      Alert.alert("Error", "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider: "google" | "facebook" | "apple") => {
    Alert.alert("Social Login", `${provider} login not implemented yet`);
  };

  const handleForgotPassword = () => {
    Alert.alert("Forgot Password", "Password reset not implemented yet");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
    >
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <AnimatedFadeSlide delay={0} offsetY={-20}>
          <View className="pt-12 px-6">
            <Pressable
              onPress={() => router.back()}
              className="w-10 h-10 items-center justify-center mb-6"
            >
              <ChevronLeft size={24} color="#374151" />
            </Pressable>

            <Text className="text-3xl font-bold text-gray-900 mb-1">Login</Text>
            <Text className="text-gray-600 text-base mb-4">
              Fill in your details below to continue
            </Text>
          </View>
        </AnimatedFadeSlide>

        {/* Form */}
        <AnimatedFadeSlide delay={200}>
          <View className="px-6">
            <Input
              label="Email"
              value={formData.email}
              onChangeText={(text) => {
                setFormData((prev) => ({ ...prev, email: text }));
                if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
              }}
              error={errors.email}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />

            <Input
              label="Password"
              value={formData.password}
              onChangeText={(text) => {
                setFormData((prev) => ({ ...prev, password: text }));
                if (errors.password)
                  setErrors((prev) => ({ ...prev, password: "" }));
              }}
              error={errors.password}
              isPassword
              autoComplete="password"
            />

            <Pressable onPress={handleForgotPassword} className="mb-4 mt-2">
              <Text className="text-amber-500 text-center font-medium">
                Forgot password?
              </Text>
            </Pressable>

            <AuthButton
              title="Login"
              onPress={handleLogin}
              loading={loading}
              variant={
                formData.email && formData.password ? "primary" : "secondary"
              }
              className="mb-8"
            />
          </View>
        </AnimatedFadeSlide>

        {/* Social Login */}
        <AnimatedFadeSlide delay={400}>
          <View className="px-6">
            <Text className="text-center text-gray-600 mb-6">
              Or continue with
            </Text>

            <View className="flex-row justify-center items-center mb-8 space-x-4">
              <SocialButton
                provider="google"
                onPress={() => handleSocialLogin("google")}
              />
              <SocialButton
                provider="facebook"
                onPress={() => handleSocialLogin("facebook")}
              />
              <SocialButton
                provider="apple"
                onPress={() => handleSocialLogin("apple")}
              />
            </View>
          </View>
        </AnimatedFadeSlide>

        {/* Footer */}
        <AnimatedFadeSlide delay={600}>
          <View className="px-6 pb-8">
            <View className="flex-row justify-center items-center">
              <Text className="text-gray-600">Don&#39;t have an account? </Text>
              <Pressable onPress={() => router.push("/screens/SignupScreen")}>
                <Text className="text-amber-500 font-semibold">Sign up</Text>
              </Pressable>
            </View>

            <Text className="text-center text-xs text-gray-500 mt-6 leading-4">
              By continuing to use Mindvolta, you agree to the{" "}
              <Text className="text-amber-500 underline">terms</Text> and
              acknowledge our{" "}
              <Text className="text-amber-500 underline">privacy notice</Text>.
            </Text>
          </View>
        </AnimatedFadeSlide>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
