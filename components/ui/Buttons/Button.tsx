import React from "react";
import { Pressable, Text, PressableProps } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  runOnJS,
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface ButtonProps extends Omit<PressableProps, "children"> {
  title: string;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = "primary",
  size = "lg",
  loading = false,
  onPress,
  disabled,
  className = "",
  ...props
}) => {
  const pressed = useSharedValue(0);

  const triggerHaptic = () => {
    // Add haptic feedback here if needed
    // Haptics.impactLight();
  };

  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(pressed.value, [0, 1], [1, 0.96]);
    const opacity = interpolate(pressed.value, [0, 1], [1, 0.85]);

    return {
      transform: [
        { scale: withSpring(scale, { damping: 15, stiffness: 300 }) },
      ],
      opacity: withSpring(opacity, { damping: 15, stiffness: 300 }),
    };
  });

  const handlePressIn = () => {
    pressed.value = 1;
    runOnJS(triggerHaptic)();
  };

  const handlePressOut = () => {
    pressed.value = 0;
  };

  const sizeClasses = {
    sm: "py-2 px-4",
    md: "py-3 px-6",
    lg: "py-4 px-8",
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  return (
    <AnimatedPressable
      style={animatedStyle}
      className={`
        bg-green-600 active:bg-green-700
        ${sizeClasses[size]}
        rounded-full
        items-center
        justify-center
        shadow-lg
        ${disabled || loading ? "opacity-50" : ""}
        ${className}
      `}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading}
      {...props}
    >
      <Text
        className={`
        text-white
        ${textSizeClasses[size]}
        font-semibold
        text-center
      `}
      >
        {loading ? "Loading..." : title}
      </Text>
    </AnimatedPressable>
  );
};
