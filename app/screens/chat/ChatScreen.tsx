import { ChatInput } from "@/components/ChatInput";
import { MessagesList } from "@/components/MessageList";
import { useChat } from "@/hooks/useChat";
import React from "react";
import { Alert, KeyboardAvoidingView, Platform } from "react-native";
import { ChatLayout } from "./ChatLayout";

const ChatScreen: React.FC = () => {
  const { messages, inputText, setInputText, sendMessage } = useChat();

  const handleBackPress = () => {
    // Navigate back - implement your navigation logic here
    console.log("Back pressed");
  };

  const handleMenuPress = () => {
    Alert.alert("Menu", "Chat options", [
      { text: "Clear Chat", onPress: () => console.log("Clear chat") },
      { text: "Settings", onPress: () => console.log("Settings") },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const handlePhonePress = () => {
    Alert.alert(
      "Contact Dr. Saheed",
      "Would you like to call Dr. Saheed now?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Call", onPress: () => console.log("Calling Dr. Saheed") },
      ]
    );
  };

  const handleAddressPress = () => {
    Alert.alert(
      "Dr. Saheed Location",
      "Psychiatric Hospital\nAro, Abeokuta, Ogun State\nNigeria",
      [
        { text: "OK" },
        { text: "Get Directions", onPress: () => console.log("Opening maps") },
      ]
    );
  };

  const handleSendMessage = () => {
    sendMessage(inputText);
  };

  return (
    <ChatLayout onBackPress={handleBackPress} onMenuPress={handleMenuPress}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        className="flex-1"
      >
        <MessagesList
          messages={messages}
          onPhonePress={handlePhonePress}
          onAddressPress={handleAddressPress}
        />

        <ChatInput
          inputText={inputText}
          onInputChange={setInputText}
          onSendMessage={handleSendMessage}
        />
      </KeyboardAvoidingView>
    </ChatLayout>
  );
};

export default ChatScreen;
