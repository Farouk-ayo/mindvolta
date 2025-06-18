import { Button } from "@/components/ui/Buttons/Button";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Image, Pressable, StatusBar, Text, View } from "react-native";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function OnboardingScreen() {
  const router = useRouter();

  // Animation shared values
  const animations = {
    icon: {
      opacity: useSharedValue(0),
      scale: useSharedValue(0.5),
      translateY: useSharedValue(30),
      floating: useSharedValue(0),
    },
    title: {
      opacity: useSharedValue(0),
      translateY: useSharedValue(40),
    },
    description: {
      opacity: useSharedValue(0),
      translateY: useSharedValue(40),
    },
    button: {
      opacity: useSharedValue(0),
      translateY: useSharedValue(40),
    },
    terms: {
      opacity: useSharedValue(0),
    },
  };

  // Animation configurations
  const springConfig = { damping: 10, stiffness: 100 };
  const timingConfig = { duration: 800 };

  useEffect(() => {
    // Entrance animations with delays
    const delays = [200, 800, 1200, 1600, 1800];

    // Icon animations
    animations.icon.opacity.value = withDelay(
      delays[0],
      withTiming(1, timingConfig)
    );
    animations.icon.scale.value = withDelay(
      delays[0],
      withSpring(1, { damping: 8, stiffness: 100 })
    );
    animations.icon.translateY.value = withDelay(
      delays[0],
      withSpring(0, springConfig)
    );

    // Title animations
    animations.title.opacity.value = withDelay(
      delays[1],
      withTiming(1, timingConfig)
    );
    animations.title.translateY.value = withDelay(
      delays[1],
      withSpring(0, springConfig)
    );

    // Description animations
    animations.description.opacity.value = withDelay(
      delays[2],
      withTiming(1, timingConfig)
    );
    animations.description.translateY.value = withDelay(
      delays[2],
      withSpring(0, springConfig)
    );

    // Button animations
    animations.button.opacity.value = withDelay(
      delays[3],
      withTiming(1, timingConfig)
    );
    animations.button.translateY.value = withDelay(
      delays[3],
      withSpring(0, springConfig)
    );

    // Terms animations
    animations.terms.opacity.value = withDelay(
      delays[4],
      withTiming(1, { duration: 600 })
    );

    // Floating animation
    animations.icon.floating.value = withDelay(
      2000,
      withTiming(1, { duration: 3000, easing: Easing.inOut(Easing.sin) })
    );

    // Floating animation loop
    const interval = setInterval(() => {
      animations.icon.floating.value = withTiming(
        animations.icon.floating.value === 0 ? 1 : 0,
        { duration: 3000, easing: Easing.inOut(Easing.sin) }
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const iconStyle = useAnimatedStyle(() => {
    const floatingY = interpolate(
      animations.icon.floating.value,
      [0, 1],
      [0, -8]
    );
    return {
      opacity: animations.icon.opacity.value,
      transform: [
        { scale: animations.icon.scale.value },
        { translateY: animations.icon.translateY.value + floatingY },
      ],
    };
  });

  const titleStyle = useAnimatedStyle(() => ({
    opacity: animations.title.opacity.value,
    transform: [{ translateY: animations.title.translateY.value }],
  }));

  const descriptionStyle = useAnimatedStyle(() => ({
    opacity: animations.description.opacity.value,
    transform: [{ translateY: animations.description.translateY.value }],
  }));

  const buttonStyle = useAnimatedStyle(() => ({
    opacity: animations.button.opacity.value,
    transform: [{ translateY: animations.button.translateY.value }],
  }));

  const termsStyle = useAnimatedStyle(() => ({
    opacity: animations.terms.opacity.value,
  }));

  const handleLinkPress = (type: "terms" | "privacy") => {
    console.log(`${type} pressed`);
  };

  return (
    <View className="flex-1 bg-primary px-8 pt-20 pb-8 justify-end">
      <StatusBar barStyle="dark-content" className="bg-primary" />

      <View className="flex-1 items-center justify-center">
        <Animated.View style={iconStyle} className="items-center mb-8">
          <Image
            source={require("../../../assets/images/logo-2.png")}
            className="w-28 h-28"
            resizeMode="contain"
          />
        </Animated.View>

        <Animated.Text
          style={titleStyle}
          className="text-green-900 text-3xl font-bold text-center leading-tight px-4 mb-6"
        >
          For Your Mental Health{"\n"}Issues
        </Animated.Text>

        <Animated.Text
          style={descriptionStyle}
          className="text-lg text-center text-black/80 leading-7 px-4 max-w-sm"
        >
          Mindvolta is a smart chatbot that helps you tackle depression,
          anxiety, or addiction in young people — especially the undergraduates
        </Animated.Text>
        <View className="space-y-6 mt-5">
          <Animated.View style={buttonStyle}>
            <Button
              title="Start Now"
              onPress={() => router.push("/screens/auth/LoginScreen")}
              className="w-full py-4 bg-secondary rounded-full shadow-lg"
            />
          </Animated.View>

          <Animated.View style={termsStyle}>
            <Text className="text-center text-sm text-black/70 leading-5 px-2 mt-4">
              By continuing to use Mindvolta you agree to the
              <AnimatedPressable onPress={() => handleLinkPress("terms")}>
                <Text className="underline text-secondary font-medium">
                  terms
                </Text>
              </AnimatedPressable>
              and acknowledge our
              <AnimatedPressable onPress={() => handleLinkPress("privacy")}>
                <Text className="underline text-secondary font-medium">
                  privacy notice
                </Text>
              </AnimatedPressable>
              .
            </Text>
          </Animated.View>
        </View>
      </View>
    </View>
  );
}
