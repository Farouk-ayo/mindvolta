import React, { useEffect } from "react";
import { View, Image, StatusBar } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withSpring,
  withDelay,
  runOnJS,
  Easing,
} from "react-native-reanimated";

interface SplashScreenProps {
  onComplete?: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const logoOpacity = useSharedValue(0);
  const logoScale = useSharedValue(0.8);
  const logoRotate = useSharedValue(0);
  const backgroundTopOpacity = useSharedValue(0);
  const backgroundBottomOpacity = useSharedValue(0);
  const backgroundTopTranslateY = useSharedValue(-50);
  const backgroundBottomTranslateY = useSharedValue(50);

  useEffect(() => {
    const startAnimations = () => {
      // Background animations
      backgroundTopOpacity.value = withTiming(1, { duration: 800 });
      backgroundTopTranslateY.value = withSpring(0, {
        damping: 12,
        stiffness: 100,
      });

      backgroundBottomOpacity.value = withDelay(
        200,
        withTiming(1, { duration: 800 })
      );
      backgroundBottomTranslateY.value = withDelay(
        200,
        withSpring(0, { damping: 12, stiffness: 100 })
      );

      // Logo animations
      logoOpacity.value = withDelay(600, withTiming(1, { duration: 1000 }));
      logoScale.value = withDelay(
        600,
        withSequence(
          withTiming(1.1, {
            duration: 600,
            easing: Easing.out(Easing.back(1.2)),
          }),
          withSpring(1, { damping: 8, stiffness: 100 })
        )
      );

      // Subtle rotation for premium feel
      logoRotate.value = withDelay(
        800,
        withSequence(
          withTiming(2, { duration: 800 }),
          withTiming(0, { duration: 600 })
        )
      );

      // Complete callback
      setTimeout(() => {
        if (onComplete) {
          runOnJS(onComplete)();
        }
      }, 3000);
    };

    startAnimations();
  }, []);

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [
      { scale: logoScale.value },
      { rotate: `${logoRotate.value}deg` },
    ],
  }));

  const backgroundTopAnimatedStyle = useAnimatedStyle(() => ({
    opacity: backgroundTopOpacity.value,
    transform: [{ translateY: backgroundTopTranslateY.value }],
  }));

  const backgroundBottomAnimatedStyle = useAnimatedStyle(() => ({
    opacity: backgroundBottomOpacity.value,
    transform: [{ translateY: backgroundBottomTranslateY.value }],
  }));

  return (
    <View className="flex-1 relative bg-primary items-center justify-center">
      <StatusBar barStyle="dark-content" backgroundColor="#FBBF24" />

      <Animated.Image
        source={require("../../assets/icons/svg-t.png")}
        className="absolute top-0 left-0 right-0 w-full h-1/2"
        resizeMode="stretch"
        style={[{ zIndex: 1 }, backgroundTopAnimatedStyle]}
      />

      <Animated.Image
        source={require("../../assets/icons/svg-b.png")}
        className="absolute bottom-0 left-0 right-0 w-full h-1/2"
        resizeMode="stretch"
        style={[{ zIndex: 1 }, backgroundBottomAnimatedStyle]}
      />

      <Animated.View
        style={[logoAnimatedStyle, { zIndex: 10 }]}
        className="items-center justify-center"
      >
        <Image
          source={require("../../assets/images/logo.png")}
          className="w-72 h-28"
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
}
