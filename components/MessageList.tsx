import React, { useRef, useEffect } from "react";
import { ScrollView } from "react-native";
import { MessageBubble, Message } from "./MessageBubble";

interface MessagesListProps {
  messages: Message[];
  onPhonePress: () => void;
  onAddressPress: () => void;
}

export const MessagesList: React.FC<MessagesListProps> = ({
  messages,
  onPhonePress,
  onAddressPress,
}) => {
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

  return (
    <ScrollView
      ref={scrollViewRef}
      className="flex-1 px-4 py-4"
      showsVerticalScrollIndicator={false}
    >
      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          message={message}
          onPhonePress={onPhonePress}
          onAddressPress={onAddressPress}
        />
      ))}
    </ScrollView>
  );
};
