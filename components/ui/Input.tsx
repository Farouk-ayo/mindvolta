import { Eye, EyeOff } from "lucide-react-native";
import { forwardRef, useState } from "react";
import { Pressable, Text, TextInput, TextInputProps, View } from "react-native";

type InputProps = {
  label: string;
  error?: string;
  isPassword?: boolean;
  containerClassName?: string;
} & TextInputProps;

const Input = forwardRef<TextInput, InputProps>(
  (
    { label, error, isPassword = false, containerClassName = "", ...props },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <View className={`mb-6 ${containerClassName}`}>
        <Text className="text-sm font-medium text-gray-700 mb-2">{label}</Text>

        <View className="relative border border-gray-300 rounded-full bg-white px-4 py-2">
          <TextInput
            ref={ref}
            {...props}
            secureTextEntry={isPassword && !showPassword}
            className="text-base text-gray-900 pr-8"
            placeholderTextColor="#9CA3AF"
          />

          {isPassword && (
            <Pressable
              onPress={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[50%] transform -translate-y-1/2"
            >
              {showPassword ? (
                <EyeOff size={20} color="#9CA3AF" />
              ) : (
                <Eye size={20} color="#9CA3AF" />
              )}
            </Pressable>
          )}
        </View>

        {error && (
          <Text className="mt-1 ml-1 text-sm text-red-500">{error}</Text>
        )}
      </View>
    );
  }
);

Input.displayName = "Input";
export default Input;
