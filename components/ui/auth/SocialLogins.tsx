import { Text, View } from "react-native";
import SocialButton from "@/components/ui/buttons/SocialButton";

export default function SocialLogins() {
  const handleSocialLogin = async (
    provider: "google" | "facebook" | "apple"
  ) => {
    return;
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
