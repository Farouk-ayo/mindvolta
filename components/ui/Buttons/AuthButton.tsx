import React from "react";
import { Pressable, Text, ActivityIndicator } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolateColor,
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface AuthButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline";
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
}

const AuthButton: React.FC<AuthButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  loading = false,
  disabled = false,
  fullWidth = true,
  className = "",
}) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const pressed = useSharedValue(0);

  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return {
          backgroundColor: "#F59E0B", // Amber-500
          textColor: "#FFFFFF",
          borderColor: "#F59E0B",
        };
      case "secondary":
        return {
          backgroundColor: "#6B7280", // Gray-500
          textColor: "#FFFFFF",
          borderColor: "#6B7280",
        };
      case "outline":
        return {
          backgroundColor: "transparent",
          textColor: "#F59E0B",
          borderColor: "#F59E0B",
        };
      default:
        return {
          backgroundColor: "#F59E0B",
          textColor: "#FFFFFF",
          borderColor: "#F59E0B",
        };
    }
  };

  const styles = getVariantStyles();

  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      pressed.value,
      [0, 1],
      [styles.backgroundColor, variant === "outline" ? "#FEF3C7" : "#D97706"]
    );

    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
      backgroundColor: variant === "outline" ? "transparent" : backgroundColor,
    };
  });

  const textAnimatedStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      pressed.value,
      [0, 1],
      [styles.textColor, variant === "outline" ? "#D97706" : "#FFFFFF"]
    );

    return {
      color,
    };
  });

  const handlePressIn = () => {
    if (!disabled && !loading) {
      scale.value = withSpring(0.96, { damping: 12, stiffness: 300 });
      opacity.value = withTiming(0.9, { duration: 100 });
      pressed.value = withTiming(1, { duration: 100 });
    }
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 12, stiffness: 300 });
    opacity.value = withTiming(1, { duration: 100 });
    pressed.value = withTiming(0, { duration: 100 });
  };

  const handlePress = () => {
    if (!disabled && !loading) {
      onPress();
    }
  };

  return (
    <AnimatedPressable
      style={[
        animatedStyle,
        {
          borderColor: styles.borderColor,
          opacity: disabled ? 0.5 : 1,
        },
      ]}
      className={`
        py-4 px-6 rounded-full border-2 items-center justify-center
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={styles.textColor} size="small" />
      ) : (
        <Animated.Text
          style={textAnimatedStyle}
          className="text-base font-semibold"
        >
          {title}
        </Animated.Text>
      )}
    </AnimatedPressable>
  );
};

export default AuthButton;
