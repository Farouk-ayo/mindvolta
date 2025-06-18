// app/index.tsx
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import SplashScreen from "./screens/SplashScreen";

export default function Index() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
      router.replace("/(tabs)"); // or "/onboarding"
    }, 2000); // show for 2 seconds

    return () => clearTimeout(timeout);
  }, [router]);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <View>
      <ActivityIndicator size="large" />
    </View>
  );
}
