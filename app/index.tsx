import { useRouter } from "expo-router";
import { useEffect } from "react";
import SplashScreen from "./screens/SplashScreen";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      // router.replace("/screens/OnboardingScreen");
      router.replace("/(tabs)/index");
    }, 5000); // 2-second splash

    return () => clearTimeout(timeout);
  }, [router]);

  return <SplashScreen />;
}
