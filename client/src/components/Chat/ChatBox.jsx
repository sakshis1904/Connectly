import { useEffect, useRef } from 'react';
import { useChat } from '../../context/ChatContext';
import Message from './Message';
import MessageInput from './MessageInput';

const ChatBox = () => {
  const { messages, currentChat, chats } = useChat();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const currentChatData = chats.find(chat => chat._id === currentChat);

  const typingUsersInChat = [];

  return (
    <div className="chat-box">
      <div className="chat-header">
        <h3>{currentChatData?.name}</h3>
      </div>
      <div className="messages">
        {messages.map(message => (
          <Message key={message._id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatBox;