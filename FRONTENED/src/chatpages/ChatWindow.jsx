import React, { useEffect, useState } from 'react';
import MessageInput from './MessageInput';

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const savedMessages = JSON.parse(localStorage.getItem('messages')) || [];
    setMessages(savedMessages);
  }, []);

  const addMessage = (message) => {
    const newMessages = [...messages, message];
    setMessages(newMessages);
    localStorage.setItem('messages', JSON.stringify(newMessages));
  };

  return (
    <div className="flex-1 p-4 overflow-y-auto">
      <div className="flex flex-col space-y-2">
        {messages.map((msg, index) => (
          <div key={index} className="bg-white p-2 rounded shadow">
            {msg}
          </div>
        ))}
      </div>
      <MessageInput addMessage={addMessage} />
    </div>
  );
};

export default ChatWindow;
