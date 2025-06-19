import React from "react";
import { Pressable } from "react-native";

interface ControlButtonProps {
  source: React.ReactNode;
  onPress: () => void;
  size?: "small" | "medium" | "large";
  variant?: "default" | "primary";
}

export const ControlButton: React.FC<ControlButtonProps> = ({
  source,
  onPress,
  size = "medium",
  variant = "default",
}) => {
  const sizeClasses = {
    small: "w-12 h-12",
    medium: "w-14 h-14",
    large: "w-20 h-20",
  };

  const bgClasses =
    variant === "primary"
      ? "bg-secondary shadow-lg shadow-secondary/30"
      : "bg-gray-50 active:bg-gray-100";

  return (
    <Pressable
      onPress={onPress}
      className={`${sizeClasses[size]} items-center justify-center rounded-full ${bgClasses} active:scale-95`}
    >
      {source}
    </Pressable>
  );
};
