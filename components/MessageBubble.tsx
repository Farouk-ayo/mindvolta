import { MapPin, Phone } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
  showButtons?: boolean;
}

interface MessageBubbleProps {
  message: Message;
  onPhonePress?: () => void;
  onAddressPress?: () => void;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  onPhonePress,
  onAddressPress,
}) => {
  return (
    <View className={`mb-4 ${message.isUser ? "items-end" : "items-start"}`}>
      <View className="max-w-xs">
        <View
          className={`px-4 py-3 rounded-2xl ${
            message.isUser
              ? "bg-secondary rounded-br-md"
              : "bg-gray-100 rounded-bl-md"
          }`}
        >
          <Text
            className={`text-sm leading-relaxed ${
              message.isUser ? "text-white" : "text-gray-800"
            }`}
          >
            {message.text}
          </Text>
        </View>

        <Text
          className={`text-xs text-gray-500 mt-2 ${
            message.isUser ? "text-right" : "text-right"
          }`}
        >
          {message.timestamp}
        </Text>
        {/* Action Buttons for Dr. Saheed */}
        {message.showButtons && !message.isUser && (
          <View className="flex-row space-x-2 mt-3">
            <TouchableOpacity
              onPress={onPhonePress}
              className="flex-row items-center space-x-2 gap-2 bg-primary text-primary px-4 py-2 rounded-full"
            >
              <Phone size={16} color="white" />
              <Text className="text-white text-sm font-medium">
                Dr. Saheed Phone
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onAddressPress}
              className="flex-row items-center space-x-2 gap-2 bg-white border border-primary text-primary px-4 py-2 rounded-full"
            >
              <MapPin size={16} color="#FFB810" />
              <Text className="text-primary text-sm font-medium">
                Dr. Saheed Address
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};
