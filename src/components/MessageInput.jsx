import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaPaperPlane, FaSmile, FaPaperclip } from 'react-icons/fa'; // Import emoticon and attachment icons

const MessageInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage(''); // Reset input after sending
    }
  };

  return (
    <div className="fixed bottom-0 left-0 w-full p-4 bg-white border-t border-gray-300 shadow-lg rounded-t-xl">
      <div className="flex items-center gap-2">
        {/* Container for icons and textarea */}
        <div className="relative w-full flex items-center gap-2">
          {/* Emoticon Icon */}
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full focus:outline-none">
            <FaSmile size={20} />
          </button>

          {/* Attachment Icon */}
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full focus:outline-none">
            <FaPaperclip size={20} />
          </button>

          {/* Text Area */}
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here"
            className="textarea textarea-bordered w-full h-10 pl-4 pr-12 bg-gray-100 resize-none"
          />
        </div>

        {/* Send Button */}
        <button
          onClick={handleSend}
          className="p-2 text-blue-500 rounded-lg hover:bg-blue-100 focus:outline-none"
        >
          <FaPaperPlane size={20} />
        </button>
      </div>
    </div>
  );
};

MessageInput.propTypes = {
  onSendMessage: PropTypes.func.isRequired,
};

export default MessageInput;
