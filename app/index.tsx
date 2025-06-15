// import { useRouter } from "expo-router";
// import { useEffect } from "react";
// import SplashScreen from "./screens/SplashScreen";

// export default function Index() {
//   const router = useRouter();

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       router.replace("/screens/OnboardingScreen");
//     }, 10000); // 2-second splash

//     return () => clearTimeout(timeout);
//   }, []);

//   return <SplashScreen />;
// }
import React, { useState, useEffect } from "react";
import SplashScreen from "./screens/SplashScreen";
import OnboardingScreen from "./screens/OnboardingScreen";

export default function Index() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
    // Optional: Navigate to onboarding or handle routing here
    // router.replace("/screens/OnboardingScreen");
  };

  useEffect(() => {
    const fallbackTimeout = setTimeout(() => {
      setShowSplash(false);
    }, 4000);

    return () => clearTimeout(fallbackTimeout);
  }, []);

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return <OnboardingScreen />;
}
