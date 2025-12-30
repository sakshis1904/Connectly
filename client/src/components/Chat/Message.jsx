import { useAuth } from '@clerk/clerk-react';

const Message = ({ message }) => {
  const { user } = useAuth();
  const isOwn = message?.sender?.clerkId === user?.id;

  return (
    <div className={`message ${isOwn ? 'own' : ''}`}>
      <div className="message-avatar">
        {message?.sender?.name?.[0] || 'U'}
      </div>
      <div className="message-content">
        <div className="message-sender">{message?.sender?.name || 'Unknown'}</div>
        {(!message?.type || message.type === 'text') && <div className="message-text">{message?.content}</div>}
        {message?.type === 'image' && <img src={`http://localhost:5000${message.mediaUrl}`} alt={message.fileName} />}
        {message?.type === 'file' && <a href={`http://localhost:5000${message.mediaUrl}`} download>{message?.fileName}</a>}
        <div className="message-time">{message?.createdAt ? new Date(message.createdAt).toLocaleTimeString() : ''}</div>
      </div>
    </div>
  );
};

export default Message;