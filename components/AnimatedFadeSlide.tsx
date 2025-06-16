import React, { useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSpring,
} from "react-native-reanimated";

interface AnimatedFadeSlideProps {
  delay?: number;
  offsetY?: number;
  children: React.ReactNode;
}

export default function AnimatedFadeSlide({
  delay = 0,
  offsetY = 30,
  children,
}: AnimatedFadeSlideProps) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(offsetY);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  useEffect(() => {
    opacity.value = withDelay(delay, withTiming(1, { duration: 600 }));
    translateY.value = withDelay(
      delay,
      withSpring(0, { damping: 12, stiffness: 100 })
    );
  }, []);

  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
}
