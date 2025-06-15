import { Image, View } from "react-native";

export default function SplashScreen() {
  return (
    <View className="flex-1 relative bg-primary items-center justify-center">
      <Image
        source={require("../../assets/icons/svg-t.png")}
        className="absolute top-0 left-0 right-0 w-full h-1/2"
        resizeMode="stretch"
        style={{ zIndex: 1 }}
      />

      <Image
        source={require("../../assets/icons/svg-b.png")}
        className="absolute bottom-0 left-0 right-0 w-full h-1/2"
        resizeMode="stretch"
        style={{ zIndex: 1 }}
      />

      <View className="z-10 items-center justify-center">
        <Image
          source={require("../../assets/icons/logo.png")}
          className="w-72 h-28"
          resizeMode="contain"
        />
      </View>
    </View>
  );
}
