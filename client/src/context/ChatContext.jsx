import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import { io } from "socket.io-client";
import api from "../services/api";

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const { getToken } = useAuth();

  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  // 🔌 SOCKET INITIALIZATION
  useEffect(() => {
    let newSocket;

    const initSocket = async () => {
      try {
        const token = await getToken();

        newSocket = io("http://localhost:5000", {
          auth: { token },
        });

        newSocket.on("connect", () => {
          console.log("✅ Socket connected");
          setIsConnected(true);
        });

        newSocket.on("disconnect", () => {
          console.log("❌ Socket disconnected");
          setIsConnected(false);
        });

        newSocket.on("receive_message", (message) => {
          console.log("📩 Message received:", message);
          setMessages((prev) => [...prev, message]);
        });

        setSocket(newSocket);
      } catch (error) {
        console.error("Socket init error:", error);
      }
    };

    initSocket();

    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, [getToken]);

  // 📥 FETCH CHATS
  const fetchChats = async () => {
  try {
    const token = await getToken();
    if (!token) return; // ✅ IMPORTANT

    const response = await api.get("/chats", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setChats(response.data);
  } catch (error) {
    console.error("Error fetching chats:", error);
  }
};

  // 📥 FETCH MESSAGES
  const fetchMessages = async (chatId) => {
    try {
      const token = await getToken();
      const res = await api.get(`/messages/${chatId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(res.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // 📤 SEND MESSAGE (NO DUPLICATES)
  const sendMessage = async (
    chatId,
    content,
    type = "text",
    mediaUrl = "",
    fileName = ""
  ) => {
    try {
      const token = await getToken();

      const res = await api.post(
        "/messages",
        { chatId, content, type, mediaUrl, fileName },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // ✅ DO NOT push message here
      // Socket will broadcast it
      if (socket) {
        socket.emit("sendMessage", res.data);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // ➕ CREATE CHAT
  const createChat = async (name, participants, isGroup = false) => {
    try {
      const token = await getToken();
      const res = await api.post(
        "/chats",
        { name, participants, isGroup },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setChats((prev) => [res.data, ...prev]);
      return res.data;
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };

  // 🚪 JOIN CHAT
  const joinChat = (chatId) => {
    if (socket) {
      socket.emit("joinChat", chatId);
    }
    setCurrentChat(chatId);
    fetchMessages(chatId);
  };

  // 🚪 LEAVE CHAT
  const leaveChat = (chatId) => {
    if (socket) {
      socket.emit("leaveChat", chatId);
    }
    setCurrentChat(null);
    setMessages([]);
  };

  return (
    <ChatContext.Provider
      value={{
        chats,
        currentChat,
        messages,
        isConnected,
        fetchChats,
        fetchMessages,
        sendMessage,
        createChat,
        joinChat,
        leaveChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
