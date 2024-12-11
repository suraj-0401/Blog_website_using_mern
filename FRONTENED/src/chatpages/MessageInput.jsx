import React, { useState } from 'react';

const MessageInput = ({ addMessage }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message) {
      addMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="flex space-x-2 mt-4">
      <input
        type="text"
        placeholder="Type a message"
        className="border border-gray-300 p-2 flex-1 rounded"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        onClick={handleSend}
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
