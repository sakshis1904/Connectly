import { useChat } from '../../context/ChatContext';
import { useAuth } from '@clerk/clerk-react';

const ChatList = () => {
  const { chats, joinChat, currentChat, createChat } = useChat();
  const { user } = useAuth();

  const handleCreateChat = async () => {
    const chatName = prompt('Enter chat name:');
    if (chatName) {
      await createChat(chatName, [], true);
    }
  };

  return (
    <div className="chat-list">
      <div className="chat-list-header">
        <h2>Chats</h2>
        <button onClick={handleCreateChat}>New Chat</button>
      </div>
      <div className="chats">
        {chats.map(chat => (
          <div
            key={chat._id}
            className={`chat-item ${currentChat === chat._id ? 'active' : ''}`}
            onClick={() => joinChat(chat._id)}
          >
            <div className="chat-avatar">
              {chat.isGroup ? 'G' : chat.participants?.find(p => p?.clerkId !== user?.id)?.name?.[0] || 'U'}
            </div>
            <div className="chat-info">
              <div className="chat-name">{chat.name}</div>
              <div className="last-message">
                {chat.lastMessage ? chat.lastMessage.content : 'No messages yet'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;