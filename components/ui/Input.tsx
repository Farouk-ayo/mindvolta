import React, { forwardRef, useState } from "react";
import { TextInput, View, Pressable, TextInputProps } from "react-native";
import { Eye, EyeOff } from "lucide-react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
} from "react-native-reanimated";

interface InputProps extends TextInputProps {
  label: string;
  error?: string;
  isPassword?: boolean;
  containerClassName?: string;
}

const Input = forwardRef<TextInput, InputProps>(
  (
    { label, error, isPassword = false, containerClassName = "", ...props },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    const focusAnimation = useSharedValue(0);
    const errorAnimation = useSharedValue(0);

    React.useEffect(() => {
      focusAnimation.value = withTiming(isFocused || hasValue ? 1 : 0, {
        duration: 200,
      });
    }, [isFocused, hasValue]);

    React.useEffect(() => {
      errorAnimation.value = withTiming(error ? 1 : 0, { duration: 200 });
    }, [error]);

    const labelStyle = useAnimatedStyle(() => {
      return {
        transform: [
          {
            translateY: focusAnimation.value * -12,
          },
          {
            scale: 0.8 + (1 - focusAnimation.value) * 0.2,
          },
        ],
        color: interpolateColor(
          focusAnimation.value,
          [0, 1],
          ["#9CA3AF", "#F59E0B"]
        ),
      };
    });

    const containerStyle = useAnimatedStyle(() => {
      return {
        borderColor: interpolateColor(
          errorAnimation.value,
          [0, 1],
          [isFocused ? "#F59E0B" : "#E5E7EB", "#EF4444"]
        ),
      };
    });

    const handleFocus = () => {
      setIsFocused(true);
    };

    const handleBlur = () => {
      setIsFocused(false);
    };

    const handleChangeText = (text: string) => {
      setHasValue(text.length > 0);
      props.onChangeText?.(text);
    };

    return (
      <View className={`mb-4 ${containerClassName}`}>
        <Animated.View
          style={containerStyle}
          className="relative border-2 rounded-xl bg-white"
        >
          <Animated.Text
            style={labelStyle}
            className="absolute left-4 top-4 z-10 bg-white px-1 text-base font-medium"
          >
            {label}
          </Animated.Text>

          <TextInput
            ref={ref}
            {...props}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChangeText={handleChangeText}
            secureTextEntry={isPassword && !showPassword}
            className="px-4 pt-6 pb-4 text-base text-gray-900 bg-transparent"
          />

          {isPassword && (
            <Pressable
              onPress={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-6"
            >
              {showPassword ? (
                <EyeOff size={20} color="#9CA3AF" />
              ) : (
                <Eye size={20} color="#9CA3AF" />
              )}
            </Pressable>
          )}
        </Animated.View>

        {error && (
          <Animated.Text className="mt-1 ml-1 text-sm text-red-500">
            {error}
          </Animated.Text>
        )}
      </View>
    );
  }
);

Input.displayName = "Input";

export default Input;
