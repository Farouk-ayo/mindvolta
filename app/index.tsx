import {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
  useFonts,
} from "@expo-google-fonts/dm-sans";
import {
  Epilogue_400Regular,
  Epilogue_700Bold,
} from "@expo-google-fonts/epilogue";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import SplashScreen from "./screens/SplashScreen";
import { useAuth } from "@clerk/clerk-expo";

export default function Index() {
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
    Epilogue_400Regular,
    Epilogue_700Bold,
  });

  const { isLoaded, isSignedIn } = useAuth();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showSplash && fontsLoaded && isLoaded) {
      if (isSignedIn) {
        router.replace("/(tabs)");
      } else {
        router.replace("/screens/auth/LoginScreen");
      }
    }
  }, [showSplash, fontsLoaded, isLoaded, isSignedIn, router]);

  const AppText = (props: React.ComponentProps<typeof Text>) => (
    <Text
      {...props}
      style={[{ fontFamily: "DMSans_400Regular", fontSize: 18 }, props.style]}
    />
  );

  if (showSplash) {
    return <SplashScreen />;
  }

  if (!fontsLoaded || !isLoaded) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" className="text-primary" />
        <AppText className="text-primary mt-4">Loading resources...</AppText>
      </View>
    );
  }

  return null;
}
