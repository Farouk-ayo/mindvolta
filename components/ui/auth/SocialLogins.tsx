import { useSignIn } from "@clerk/clerk-expo";
import { Text, View } from "react-native";
import Toast from "react-native-toast-message";
import SocialButton from "@/components/ui/buttons/SocialButton";

export default function SocialLogins() {
  const { signIn, isLoaded } = useSignIn();

  const handleSocialLogin = async (
    provider: "google" | "facebook" | "apple"
  ) => {
    if (!isLoaded) return;

    if (provider === "google") {
      try {
        await signIn.authenticateWithRedirect({
          strategy: "oauth_google",
          redirectUrl: "yourapp://sign-in-callback",
          redirectUrlComplete: "yourapp://sign-in-complete",
        });
      } catch (err: any) {
        Toast.show({
          type: "error",
          text1: "Google Sign-In Failed",
          text2: err.errors?.[0]?.message || "Try again.",
        });
      }
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
