import { useEffect } from "react";
import { useChat } from "../context/ChatContext";
import { useUser } from "@clerk/clerk-react";
import Sidebar from "../components/Sidebar/ChatList";
import ChatBox from "../components/Chat/ChatBox";

const ChatPage = () => {
  const { fetchChats, currentChat } = useChat();
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded && user) {
      fetchChats();
    }
  }, [isLoaded, user, fetchChats]);

  if (!isLoaded) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="chat-page">
      <Sidebar />
      <div className="chat-container">
        {currentChat ? (
          <ChatBox />
        ) : (
          <div className="no-chat">Select a chat to start messaging</div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
