import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";

import AnimatedFadeSlide from "@/components/AnimatedFadeSlide";
import AuthButton from "@/components/ui/Buttons/AuthButton";
import SocialButton from "@/components/ui/Buttons/SocialButton";
import Input from "@/components/ui/Input";

export default function SignupScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
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
    } else if (formData.password.length < 8) {
      newErrors.password =
        "Password should be at least 8 characters and contain both letters and numbers.";
    } else if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Password should contain both letters and numbers.";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      Alert.alert("Success", "Account created successfully!", [
        { text: "OK", onPress: () => router.push("/screens/LoginScreen") },
      ]);
    } catch {
      Alert.alert("Error", "Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignup = (provider: "google" | "facebook" | "apple") => {
    Alert.alert("Social Signup", `${provider} signup not implemented yet`);
  };

  const isFormValid =
    formData.email && formData.password && formData.confirmPassword;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
    >
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <AnimatedFadeSlide delay={0} offsetY={-20}>
          <View className="pt-12 px-6">
            <Pressable
              onPress={() => router.back()}
              className="flex-row items-center mb-6"
            >
              <ChevronLeft size={24} color="#374151" />
              <Text className="ml-2 text-gray-700 text-base">Back</Text>
            </Pressable>
          </View>
        </AnimatedFadeSlide>

        {/* Form */}
        <AnimatedFadeSlide delay={200}>
          <View className="mb-6 text-center flex justify-center items-center">
            <Text className="text-3xl font-bold text-gray-900 mb-2">
              Create an account
            </Text>
            <Text className="text-gray-600 text-base">
              Fill in your details below to get started
            </Text>
          </View>
          <View className="px-6 pt-8">
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
              autoComplete="new-password"
            />

            {formData.password && !errors.password && (
              <Text className="text-xs text-gray-500 -mt-3 mb-4 px-1">
                Password should contain both letters and numbers, with minimum
                length of 8 characters.
              </Text>
            )}

            {/* <Input
              label="Confirm Password"
              value={formData.confirmPassword}
              onChangeText={(text) => {
                setFormData((prev) => ({ ...prev, confirmPassword: text }));
                if (errors.confirmPassword)
                  setErrors((prev) => ({ ...prev, confirmPassword: "" }));
              }}
              error={errors.confirmPassword}
              isPassword
              autoComplete="new-password"
            /> */}

            <AuthButton
              title="Create an account"
              onPress={handleSignup}
              loading={loading}
              variant={isFormValid ? "primary" : "secondary"}
              className="mb-8 mt-4"
            />
          </View>{" "}
          <View className="px-6">
            <Text className="text-center text-gray-600 mb-6">
              Or continue with
            </Text>

            <View className="flex-row justify-center items-center mb-8 space-x-4">
              <SocialButton
                provider="google"
                onPress={() => handleSocialSignup("google")}
              />
              <SocialButton
                provider="facebook"
                onPress={() => handleSocialSignup("facebook")}
              />
              <SocialButton
                provider="apple"
                onPress={() => handleSocialSignup("apple")}
              />
            </View>
          </View>
          <View className="flex-row justify-center items-center">
            <Text className="text-gray-600">Already have an account? </Text>
            <Pressable onPress={() => router.push("/screens/LoginScreen")}>
              <Text className="text-primary font-medium">Sign in</Text>
            </Pressable>
          </View>
        </AnimatedFadeSlide>

        {/* Social Signup */}

        {/* Footer */}
        <AnimatedFadeSlide delay={600}>
          <View className="px-6 pb-8">
            <Text className="text-center text-gray-500 text-xs mt-4 leading-4">
              By signing up, you agree to our{" "}
              <Text
                className="text-primary font-medium underline"
                onPress={() => router.push("/")}
              >
                Terms of Service
              </Text>{" "}
              and{" "}
              <Text
                className="text-primary font-medium underline"
                onPress={() => router.push("/")}
              >
                Privacy Policy
              </Text>
              .
            </Text>
          </View>
        </AnimatedFadeSlide>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
