import { View, Image } from "react-native";

export default function SplashScreen() {
  return (
    <View className="flex-1 relative bg-primary items-center justify-center">
      {/* Top Wave SVG */}
      <Image
        source={require("../../assets/icons/svg-t.png")}
        className="absolute top-0 left-0 w-full h-40 z-[-1]"
        resizeMode="contain"
      />

      {/* Bottom Wave SVG */}
      <Image
        source={require("../../assets/icons/svg-b.png")}
        className="absolute bottom-0 left-0 w-full h-40 z-[-1]"
        resizeMode="contain"
      />

      {/* Center Logo */}
      <Image
        source={require("../../assets/icons/logo.png")}
        className="w-60 h-24"
        resizeMode="contain"
      />
    </View>
  );
}
