import React, { useCallback, useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import { useSSO } from "@clerk/clerk-expo";
import { Text, View } from "react-native";
import Toast from "react-native-toast-message";
import SocialButton from "@/components/ui/buttons/SocialButton";

export const useWarmUpBrowser = () => {
  useEffect(() => {
    // Preloads the browser for Android devices to reduce authentication load time
    // See: https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync();
    return () => {
      // Cleanup: closes browser when component unmounts
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

// Handle any pending authentication sessions
WebBrowser.maybeCompleteAuthSession();

export default function SocialLogins() {
  useWarmUpBrowser();

  // Use the `useSSO()` hook to access the `startSSOFlow()` method
  const { startSSOFlow } = useSSO();

  const onGooglePress = useCallback(async () => {
    try {
      // Start the authentication process by calling `startSSOFlow()`
      const { createdSessionId, setActive, signIn, signUp } =
        await startSSOFlow({
          strategy: "oauth_google",
          // For web, defaults to current path
          // For native, you must pass a scheme, like AuthSession.makeRedirectUri({ scheme, path })
          // For more info, see https://docs.expo.dev/versions/latest/sdk/auth-session/#authsessionmakeredirecturioptions
          redirectUrl: AuthSession.makeRedirectUri(),
        });

      // If sign in was successful, set the active session
      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        Toast.show({
          type: "success",
          text1: "Welcome!",
          text2: "Successfully signed in with Google",
        });
      } else {
        // If there is no `createdSessionId`,
        // there are missing requirements, such as MFA
        // Use the `signIn` or `signUp` returned from `startSSOFlow`
        // to handle next steps
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
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
      let errorMessage = "Please try again";
      if (
        typeof err === "object" &&
        err !== null &&
        "errors" in err &&
        Array.isArray((err as any).errors) &&
        (err as any).errors[0]?.message
      ) {
        errorMessage = (err as any).errors[0].message;
      }
      Toast.show({
        type: "error",
        text1: "Google Sign-In Failed",
        text2: errorMessage,
      });
    }
  }, []);

  const handleSocialLogin = async (
    provider: "google" | "facebook" | "apple"
  ) => {
    if (provider === "google") {
      await onGooglePress();
    } else {
      Toast.show({
        type: "info",
        text1: `${provider.charAt(0).toUpperCase() + provider.slice(1)} login not implemented yet`,
      });
    }
  };

  return (
    <View className="px-6">
      <Text className="text-center text-gray-600 mb-6">Or continue with</Text>
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
  );
}
