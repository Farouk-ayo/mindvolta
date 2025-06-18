import { useState } from "react";
import { Message } from "../components/MessageBubble";

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello there👋 I'm Mindvolta AI, your mental health friend. How can I help you today?",
      isUser: false,
      timestamp: "02/10/2024, 8:04pm",
    },
    {
      id: "2",
      text: "I have been experiencing constant sadness and loss of interest in things I used to enjoy normally.",
      isUser: true,
      timestamp: "02/10/2024, 8:04pm",
    },
    {
      id: "3",
      text: "I understand you better. It's important to seek support and talk to a mental health professional. I can provide you with the right person to connect with.\n\nReach out to Dr. Saheed who is a specialist at Psychiatric hospital at Aro, Abeokuta.",
      isUser: false,
      timestamp: "02/10/2024, 8:04pm",
      showButtons: true,
    },
    {
      id: "4",
      text: "Thank you so much. I will reach out to him immediately.",
      isUser: true,
      timestamp: "02/10/2024, 8:04pm",
    },
  ]);

  const [inputText, setInputText] = useState("");

  const formatTimestamp = (): string => {
    const now = new Date();
    return now.toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      isUser: true,
      timestamp: formatTimestamp(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "Thank you for sharing that with me. I'm here to help and support you through your mental health journey. How are you feeling right now?",
        isUser: false,
        timestamp: formatTimestamp(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1500);
  };

  return {
    messages,
    inputText,
    setInputText,
    sendMessage,
  };
};
