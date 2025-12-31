import { createContext, useContext, useState, useEffect } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { io } from "socket.io-client";
import api from "../services/api";

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const { getToken } = useAuth();
  const { isLoaded, isSignedIn } = useUser(); 
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  
  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;

    let newSocket;

    const initSocket = async () => {
      const token = await getToken();
      
      if (!token) return;

      newSocket = io("http://localhost:5000", {
        auth: { token },
      });

      newSocket.on("connect", () => {
        console.log("Socket connected");
        setIsConnected(true);
      });

      newSocket.on("disconnect", () => {
        setIsConnected(false);
      });

      newSocket.on("receive_message", (message) => {
        setMessages((prev) => [...prev, message]);
      });

      setSocket(newSocket);
    };

    initSocket();

    return () => newSocket?.disconnect();
  }, [isLoaded, isSignedIn, getToken]);

  
  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;
    fetchChats();
  }, [isLoaded, isSignedIn]);

  const fetchChats = async () => {
    try {
      const token = await getToken();
      if (!token) return;

      const res = await api.get("/chats", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setChats(res.data);
    } catch (err) {
      console.error("Error fetching chats:", err);
    }
  };

  const fetchMessages = async (chatId) => {
    try {
      const token = await getToken();
      if (!token) return;

      const res = await api.get(`/messages/${chatId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(res.data);
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  const sendMessage = async (chatId, content) => {
    try {
      const token = await getToken();
      if (!token) return;

      const res = await api.post(
        "/messages",
        { chatId, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      socket?.emit("sendMessage", res.data);
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  const createChat = async (name, participants, isGroup = false) => {
    try {
      const token = await getToken();
      if (!token) return;

      const res = await api.post(
        "/chats",
        { name, participants, isGroup },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setChats((prev) => [res.data, ...prev]);
      return res.data;
    } catch (err) {
      console.error("Error creating chat:", err);
    }
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
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
