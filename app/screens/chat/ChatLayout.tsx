// _layout.tsx
import { useRouter } from "expo-router";
import { ChevronLeft, MoreVertical } from "lucide-react-native";
import React from "react";
import {
  Pressable,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

interface ChatLayoutProps {
  children: React.ReactNode;
  onBackPress?: () => void;
  onMenuPress?: () => void;
}

export const ChatLayout: React.FC<ChatLayoutProps> = ({
  children,
  onMenuPress,
}) => {
  const router = useRouter();
  return (
    <SafeAreaProvider className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-100">
        <View className="flex-row items-center space-x-3 gap-7">
          <Pressable
            onPress={() => router.back()}
            className="flex-row items-center space-x-1"
          >
            <ChevronLeft size={24} color="#374151" />
            <Text className="text-gray-700 text-base">Back</Text>
          </Pressable>
          <Text className="text-lg font-medium text-gray-900">
            Chat with Mindvolta AI
          </Text>
        </View>
        <TouchableOpacity onPress={onMenuPress} className="p-1">
          <MoreVertical size={24} color="#374151" />
        </TouchableOpacity>
      </View>
      {children}
    </SafeAreaProvider>
  );
};

export default ChatLayout;
