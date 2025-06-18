// app/_layout.tsx
import { Stack } from "expo-router";
import { Platform, SafeAreaView, StatusBar } from "react-native";
import "./global.css";

export default function RootLayout() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        backgroundColor: "#fff",
      }}
    >
      <StatusBar hidden />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </SafeAreaView>
  );
}
