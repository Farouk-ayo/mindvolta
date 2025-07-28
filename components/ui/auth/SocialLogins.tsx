import SocialButton from "@/components/ui/buttons/SocialButton";
import { useAuth, useSSO } from "@clerk/clerk-expo";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import React, { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";
import Toast from "react-native-toast-message";

export const useWarmUpBrowser = () => {
  useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

export default function SocialLogins() {
  const { isSignedIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  console.log(isSignedIn);
  useWarmUpBrowser();

  const { startSSOFlow } = useSSO();

  const onGooglePress = useCallback(async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const { createdSessionId, setActive, signIn, signUp } =
        await startSSOFlow({
          strategy: "oauth_google",
        });

      if (createdSessionId && setActive) {
        setActive({ session: createdSessionId });
        Toast.show({
          type: "success",
          text1: "Welcome!",
          text2: "Successfully signed in with Google",
        });
      } else {
        if (signUp?.emailAddress) {
          Toast.show({
            type: "info",
            text1: "Please verify your email",
            text2: "Check your email for a verification link",
          });
        } else if (signIn) {
          Toast.show({
            type: "info",
            text1: "Complete sign-in",
            text2: "Additional verification may be required",
          });
        }
      }
    } catch (err) {
      console.error("Google Sign-In Error:", err);

      const errorMessage =
        (typeof err === "object" &&
          err !== null &&
          "errors" in err &&
          Array.isArray((err as any).errors) &&
          (err as any).errors[0]?.message) ||
        (err instanceof Error && err.message) ||
        "Please try again";

      Toast.show({
        type: "error",
        text1: "Google Sign-In Failed",
        text2: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  }, [startSSOFlow, isLoading]);

  const handleSocialLogin = (provider: "google" | "facebook" | "apple") => {
    if (provider === "google") {
      onGooglePress();
    } else {
      Toast.show({
        type: "info",
        text1: `${provider.charAt(0).toUpperCase() + provider.slice(1)} login not implemented yet`,
      });
    }
  };

  if (isSignedIn) {
    return null;
  }

  return (
    <View className="px-6">
      <Text className="text-center text-gray-600 mb-6">Or continue with</Text>
      <View className="flex-row justify-center items-center mb-8 space-x-4">
        <SocialButton
          provider="google"
          onPress={() => handleSocialLogin("google")}
          disabled={isLoading}
        />
        <SocialButton
          provider="facebook"
          onPress={() => handleSocialLogin("facebook")}
          disabled={isLoading}
        />
        <SocialButton
          provider="apple"
          onPress={() => handleSocialLogin("apple")}
          disabled={isLoading}
        />
      </View>
    </View>
  );
}
