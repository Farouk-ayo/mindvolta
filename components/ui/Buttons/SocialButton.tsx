import React from "react";
import { Image, Pressable } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface SocialButtonProps {
  provider: "google" | "facebook" | "apple";
  onPress: () => void;
  disabled?: boolean;
}

const SocialButton: React.FC<SocialButtonProps> = ({
  provider,
  onPress,
  disabled = false,
}) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const getProviderConfig = () => {
    switch (provider) {
      case "google":
        return {
          icon: require("../../../assets/icons/google.png"),
          backgroundColor: "#FFFFFF",
          borderColor: "#E5E7EB",
        };
      case "facebook":
        return {
          icon: require("../../../assets/icons/facebook.png"),
          backgroundColor: "#FFFFFF",
          borderColor: "#E5E7EB",
        };
      case "apple":
        return {
          icon: require("../../../assets/icons/apple.png"),
          backgroundColor: "#000FFFFFF000",
          borderColor: "#E5E7EB",
        };
      default:
        return {
          icon: require("../../../assets/icons/google.png"),
          backgroundColor: "#FFFFFF",
          borderColor: "#E5E7EB",
        };
    }
  };

  const config = getProviderConfig();

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95, { damping: 12, stiffness: 300 });
    opacity.value = withTiming(0.8, { duration: 100 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 12, stiffness: 300 });
    opacity.value = withTiming(1, { duration: 100 });
  };

  return (
    <AnimatedPressable
      style={[
        animatedStyle,
        {
          backgroundColor: config.backgroundColor,
          borderColor: config.borderColor,
        },
      ]}
      className="w-12 h-12 rounded-full border-2 items-center justify-center mx-2"
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
    >
      <Image source={config.icon} className="w-6 h-6" resizeMode="contain" />
    </AnimatedPressable>
  );
};

export default SocialButton;
