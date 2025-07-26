// // app/index.tsx
// // import {
// //   Alegreya_400Regular,
// //   Alegreya_700Bold,
// // } from "@expo-google-fonts/alegreya";
// // import {
// //   AlegreyaSans_400Regular,
// //   AlegreyaSans_700Bold,
// // } from "@expo-google-fonts/alegreya-sans";
// import {
//   DMSans_400Regular,
//   DMSans_500Medium,
//   DMSans_700Bold,
//   useFonts,
// } from "@expo-google-fonts/dm-sans";
// import {
//   Epilogue_400Regular,
//   Epilogue_700Bold,
// } from "@expo-google-fonts/epilogue";
// import { useRouter } from "expo-router";
// import { useEffect, useState } from "react";
// import { ActivityIndicator, Text, View } from "react-native";
// import SplashScreen from "./screens/SplashScreen";

// export default function Index() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);
//   const [fontsLoaded] = useFonts({
//     DMSans_400Regular,
//     DMSans_500Medium,
//     DMSans_700Bold,
//     // Alegreya_400Regular,
//     // Alegreya_700Bold,
//     // AlegreyaSans_400Regular,
//     // AlegreyaSans_700Bold,
//     Epilogue_400Regular,
//     Epilogue_700Bold,
//   });

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       setLoading(false);
//       router.replace("/(tabs)");
//     }, 2000);

//     return () => clearTimeout(timeout);
//   }, [router]);

//   const AppText = (props: React.ComponentProps<typeof Text>) => (
//     <Text
//       {...props}
//       style={[{ fontFamily: "DMSans_400Regular", fontSize: 18 }, props.style]}
//     />
//   );

//   if (!fontsLoaded || loading) {
//     return <SplashScreen />;
//   }

//   return (
//     <View className="flex-1 justify-center items-center">
//       <ActivityIndicator size="large" />
//       {/* Example usage of AppText */}
//       <AppText>Welcome to Mindvolta!</AppText>
//     </View>
//   );
// }

// app/index.tsx
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
  }, [fontsLoaded, router]);

  const AppText = (props: React.ComponentProps<typeof Text>) => (
    <Text
      {...props}
      style={[{ fontFamily: "DMSans_400Regular", fontSize: 18 }, props.style]}
    />
  );

  if (!fontsLoaded || showSplash) {
    return <SplashScreen />;
  }

  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size="large" />
      <AppText>Checking authentication...</AppText>
    </View>
  );
}
