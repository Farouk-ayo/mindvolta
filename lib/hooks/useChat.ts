import { useState, useEffect, useCallback } from "react";
import { useAuth } from "./useAuth";
import { ChatMessage } from "../types";
import {
  connectChat,
  disconnectChat,
  getChatHistory,
  onChatMessage,
  sendChatMessage,
} from "../api/chat";

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const loadChatHistory = useCallback(async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      const history = await getChatHistory();
      setMessages(history);
    } catch (error) {
      console.error("Failed to load chat history:", error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      // Connect to chat service
      connectChat(user.id);

      // Load chat history
      loadChatHistory();

      // Listen for new messages
      const cleanup = onChatMessage((message: ChatMessage) => {
        setMessages((prev) => [...prev, message]);
      });

      return () => {
        cleanup();
        disconnectChat();
      };
    }
  }, [user, loadChatHistory]);

  const sendMessage = useCallback(
    (message: string) => {
      if (!user || !message.trim()) return;

      // Add user message immediately
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        text: message.trim(),
        isUser: true,
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [...prev, userMessage]);

      // Send to backend
      sendChatMessage(message.trim(), user.id);

      // Clear input
      setInputText("");
    },
    [user]
  );

  return {
    messages,
    inputText,
    setInputText,
    sendMessage,
    isLoading,
  };
}
