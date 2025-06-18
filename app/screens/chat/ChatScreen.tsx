import { cn } from "@/lib/utils";
import { Send } from "lucide-react-native";
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Message = {
  id: string;
  content: string;
  role: "user" | "assistant";
};

const initialMessages: Message[] = [
  {
    id: "1",
    content:
      "Hello there👋 I'm Mindvolta AI, your mental health friend. How can I help you today?",
    role: "assistant",
  },
];

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const scrollRef = useRef<ScrollView>(null);
  const insets = useSafeAreaInsets();

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          content:
            "I understand you better. It’s important to seek support and talk to a mental health professional. I can provide you with the right person to connect with.\n\nReach out to Dr. Saheed who is a specialist at Psychiatric hospital at Aro, Abeokuta.",
          role: "assistant",
        },
      ]);
    }, 1000);
  };

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="px-4 py-4 border-b border-gray-200">
        <Text className="text-lg font-semibold text-center text-gray-800">
          Chat with Mindvolta AI
        </Text>
      </View>

      {/* Messages */}
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((msg) => (
          <View
            key={msg.id}
            className={cn(
              "mb-3",
              msg.role === "user" ? "items-end" : "",
              msg.role === "assistant" ? "items-start" : ""
            )}
          >
            <View
              className={cn(
                "rounded-xl px-4 py-3 max-w-[80%]",
                msg.role === "user"
                  ? "bg-[#157D18] text-white"
                  : "bg-[#F4F4F5] text-gray-800"
              )}
            >
              <Text className="text-sm">{msg.content}</Text>
              {msg.role === "user" && (
                <Text className="text-[10px] text-right opacity-70 mt-1">
                  {new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              )}
            </View>

            {/* Conditional buttons for assistant */}
            {msg.content.includes("Dr. Saheed") && (
              <View className="flex-row space-x-2 mt-2">
                <TouchableOpacity className="bg-[#FFB938] rounded-full px-4 py-2">
                  <Text className="text-white font-medium text-sm">
                    Dr. Saheed Phone
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity className="border border-[#FFB938] rounded-full px-4 py-2">
                  <Text className="text-[#FFB938] font-medium text-sm">
                    Dr. Saheed Address
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Message Input */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={insets.bottom + 20}
        className="absolute bottom-0 left-0 right-0 bg-white px-4 py-2 border-t border-gray-200"
      >
        <View className="flex-row items-center bg-gray-50 rounded-full px-4">
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Type a message..."
            className="flex-1 py-3 text-sm"
          />
          <TouchableOpacity onPress={sendMessage} disabled={!input.trim()}>
            <Send size={20} color="#157D18" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
