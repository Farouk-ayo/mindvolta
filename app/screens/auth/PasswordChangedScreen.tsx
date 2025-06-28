import { Button } from "@/components/ui/buttons/Button";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StatusBar, Text, View } from "react-native";
import Animated from "react-native-reanimated";

export default function PasswordChangedScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-yellow-400 justify-center items-center px-8">
      <StatusBar barStyle="light-content" backgroundColor="#fbbf24" />
      <View className="mb-8">
        <Animated.View className="items-center mb-8">
          <Image
            source={require("../../../assets/images/lock.png")}
            className="w-28 h-28"
            resizeMode="contain"
          />
        </Animated.View>
      </View>

      <Text className="text-xl font-bold text-green-800 mb-2">
        Your password has been changed!
      </Text>
      <Text className="text-center text-green-900 mb-8">
        Login and use your new credentials to access your account.
      </Text>

      <Animated.View>
        <Button
          title="Back to Login"
          onPress={() => router.push("/screens/auth/LoginScreen")}
          className="w-full py-4 bg-secondary rounded-full shadow-lg"
        />
      </Animated.View>
    </View>
  );
}
