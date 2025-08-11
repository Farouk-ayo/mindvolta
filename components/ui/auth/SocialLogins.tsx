import SocialButton from "@/components/ui/buttons/SocialButton";
import { Text, View } from "react-native";

export default function SocialLogins() {
  const handleSocialLogin = async (
    provider: "google" | "facebook" | "apple"
  ) => {
    return;
  };

  return (
    <View className="px-6">
      <Text className="text-center text-gray-600 mb-6">Or continue with</Text>
      <View className="flex-row justify-center items-center mb-8 space-x-4">
        <SocialButton
          provider="google"
          onPress={() => handleSocialLogin("google")}
          disabled={false}
        />
        <SocialButton
          provider="facebook"
          onPress={() => handleSocialLogin("facebook")}
          disabled={false}
        />
        <SocialButton
          provider="apple"
          onPress={() => handleSocialLogin("apple")}
          disabled={false}
        />
      </View>
    </View>
  );
}
