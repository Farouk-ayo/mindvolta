import { io, Socket } from "socket.io-client";
import { api, ApiResponse, WS_URL } from "@/services/axiosInstance";
import { ChatMessage } from "../types";

let socket: Socket | null = null;
let messageHandlers: ((message: ChatMessage) => void)[] = [];
/**
 * Connect to chat server
 */
export const connectChat = (userId: string) => {
  if (socket?.connected) return;

  socket = io(WS_URL);

  socket.on("connect", () => {
    console.log("Connected to chat server");
    socket?.emit("join_chat", userId);
  });

  socket.on("receive_message", (message: ChatMessage) => {
    messageHandlers.forEach((handler) => handler(message));
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from chat server");
  });
};

/**
 * Disconnect from chat server
 */
export const disconnectChat = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

/**
 * Send a chat message
 */
export const sendChatMessage = (message: string, userId: string) => {
  if (socket?.connected) {
    socket.emit("send_message", { message, userId });
  }
};

/**
 * Subscribe to new incoming messages
 * Returns a cleanup function to unsubscribe
 */
export const onChatMessage = (handler: (message: ChatMessage) => void) => {
  messageHandlers.push(handler);

  return () => {
    messageHandlers = messageHandlers.filter((h) => h !== handler);
  };
};

/**
 * Fetch chat history
 */
export const getChatHistory = async (): Promise<ChatMessage[]> => {
  const response =
    await api.get<ApiResponse<{ messages: ChatMessage[] }>>("/chat/history");

  return response.success && response.data ? response.data.messages : [];
};
