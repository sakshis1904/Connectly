import { useState, useRef } from 'react';
import { useChat } from '../../context/ChatContext';
import api from '../../services/api';
import { useAuth } from '@clerk/clerk-react';

const MessageInput = () => {
  const { sendMessage, currentChat } = useChat();
  const { getToken } = useAuth();
  const [content, setContent] = useState('');
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    setContent(e.target.value);
  };

  const handleSend = async () => {
    if (content.trim() && currentChat) {
      stopTyping();
      await sendMessage(currentChat, content);
      setContent('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file && currentChat) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const token = await getToken();
        const response = await api.post('/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
          }
        });

        const type = file.type.startsWith('image/') ? 'image' : 'file';
        await sendMessage(currentChat, file.name, type, response.data.fileUrl, response.data.fileName);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  return (
    <div className="message-input">
      <input
        type="text"
        value={content}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Type a message..."
      />
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        style={{ display: 'none' }}
      />
      <button onClick={() => fileInputRef.current.click()}>📎</button>
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default MessageInput;