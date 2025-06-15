import { cn } from "@/lib/utils";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

type ButtonProps = TouchableOpacityProps & {
  title: string;
  className?: string;
  textClassName?: string;
};

export const Button = ({
  title,
  className,
  textClassName,
  ...props
}: ButtonProps) => {
  return (
    <TouchableOpacity
      className={cn("bg-green-800 rounded-full py-3 items-center", className)}
      {...props}
    >
      <Text className={cn("text-white text-base font-semibold", textClassName)}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
