// app/index.tsx
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View, ActivityIndicator, Text } from "react-native";
import SplashScreen from "./screens/SplashScreen";
import {
  useFonts,
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";

export default function Index() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
      router.replace("/(tabs)");
    }, 2000);

    return () => clearTimeout(timeout);
  }, [router]);

  const AppText = (props: React.ComponentProps<typeof Text>) => (
    <Text
      {...props}
      style={[{ fontFamily: "DMSans_400Regular", fontSize: 18 }, props.style]}
    />
  );

  if (!fontsLoaded || loading) {
    return <SplashScreen />;
  }

  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size="large" />
      {/* Example usage of AppText */}
      <AppText>Welcome to Mindvolta!</AppText>
    </View>
  );
}
