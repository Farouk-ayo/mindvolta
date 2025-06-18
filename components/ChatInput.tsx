import { Paperclip, Send } from "lucide-react-native";
import React from "react";
import { Alert, TextInput, TouchableOpacity, View } from "react-native";

interface ChatInputProps {
  inputText: string;
  onInputChange: (text: string) => void;
  onSendMessage: () => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  inputText,
  onInputChange,
  onSendMessage,
}) => {
  const handleAttachmentPress = () => {
    Alert.alert("Attachment", "Feature coming soon!");
  };

  return (
    <View className="px-4 py-3 border-t border-gray-100">
      <View className="flex-row items-center space-x-3">
        <View className="flex-1 relative">
          <TextInput
            value={inputText}
            onChangeText={onInputChange}
            placeholder="Type a message..."
            multiline
            className="bg-gray-100 rounded-full px-4 py-3 pr-12 text-sm max-h-20"
            placeholderTextColor="#9CA3AF"
            onSubmitEditing={onSendMessage}
            returnKeyType="send"
          />
          <TouchableOpacity
            onPress={handleAttachmentPress}
            className="absolute right-3 top-3 p-1"
          >
            <Paperclip size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={onSendMessage}
          className="bg-secondary p-3 rounded-full"
          disabled={!inputText.trim()}
        >
          <Send size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
