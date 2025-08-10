import { useAuth } from "@clerk/clerk-expo";
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

export default function Index() {
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
    Epilogue_400Regular,
    Epilogue_700Bold,
  });

  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    if (fontsLoaded) {
      const timeout = setTimeout(() => {
        setShowSplash(false);

        // if (isSignedIn) {
        //   router.replace("/(tabs)");
        // } else {
        router.replace("/screens/auth/LoginScreen");
        // }
      }, 2000); // Optional delay to show your splash

      return () => clearTimeout(timeout);
    }
  }, [fontsLoaded, router])

  const AppText = (props: React.ComponentProps<typeof Text>) => (
    <Text
      {...props}
      style={[{ fontFamily: "DMSans_400Regular", fontSize: 18 }, props.style]}
    />
  );

  if (!fontsLoaded || showSplash) {

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
