import Avatar from './ChatAvatar'; // Importing the new Avatar component
import PropTypes from 'prop-types';
import { useRef, useEffect } from 'react';

// Custom hook to handle auto-scroll behavior
const useAutoScroll = (message) => {
  const chatEndRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom only if chatEndRef exists and a new message is received
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [message]);

  return chatEndRef;
};

const ChatBubble = ({ message, sender }) => {
  const chatEndRef = useAutoScroll(message); // Using the custom hook for auto-scrolling

  // Map message types to render functions
  const messageRenderers = {
    text: (message) => <p>{message}</p>,
    image: (message) => (
      <img
        src={message}
        alt="Image message"
        className="max-w-[300px] max-h-[300px] object-contain"
      />
    ),
    video: (message) => (
      <video controls className="max-w-full h-auto object-contain sm:max-w-[300px]">
        <source src={message} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    ),
    pdf: (message) => (
      <iframe
        src={message}
        width="100%"
        height="350px"
        title="PDF Viewer"
        className="border-none rounded-md"
      />
    ),
  };

  // Use the messageRenderers map to render the message content based on its type
  const renderMessageContent = () => {
    const render = messageRenderers[message.type] || messageRenderers.text; // Default to 'text' if type is unknown
    return render(message.message);
  };

  // Class names based on sender
  const chatBubbleClass = sender === 'agent@mail.com'
    ? 'bg-blue-500 text-white shadow-md'
    : 'bg-white text-black shadow-md';

  const senderLabel = sender === 'customer@mail.com' ? 'Customer' : sender === 'agent@mail.com' ? 'Agent' : 'Admin';

  return (
    <div className={`chat ${sender === 'customer@mail.com' ? 'chat-start' : 'chat-end'}`}>
      <div className="chat-image avatar flex-shrink-0">
        <Avatar sender={sender} className="w-[20px] h-[20px] sm:w-[40px] sm:h-[40px]" />
      </div>
      <div className="chat-header text-sm sm:text-base">
        {senderLabel}
      </div>
      <div className={`chat-bubble ${chatBubbleClass} mt-1 mb-1 sm:mt-2 sm:mb-2`}>
        {renderMessageContent()}
      </div>
      <div className="chat-footer opacity-50">
        {/* Footer content can be added here if needed in the future */}
      </div>
      {/* Spacer to prevent message input from overlapping */}
      <div ref={chatEndRef} className="h-12" />
    </div>
  );
};

ChatBubble.propTypes = {
  message: PropTypes.shape({
    type: PropTypes.oneOf(['text', 'image', 'video', 'pdf']).isRequired,
    message: PropTypes.string.isRequired,
  }).isRequired,
  sender: PropTypes.string.isRequired,
};

export default ChatBubble;
