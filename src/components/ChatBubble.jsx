import Avatar from './ChatAvatar'; // Importing the new Avatar component
import propTypes from 'prop-types';

const ChatBubble = ({ message, sender }) => {
  const renderMessageContent = (message) => {
    switch (message.type) {
      case 'text':
        return <p>{message.message}</p>;
      case 'image':
        return (
          <img
            src={message.message}
            alt="Image message"
            className="max-w-[300px] max-h-[300px] object-contain" // Apply size limit for images
          />
        );
      case 'video':
        return (
          <video
            controls
            className="max-w-full h-auto object-contain sm:max-w-[300px]" // Responsive size for both mobile and desktop
          >
            <source src={message.message} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        );
      case 'pdf':
        return (
          <iframe
            src={message.message}
            width="100%"
            height="500px"
            title="PDF Viewer"
            className="border-none rounded-md"
          />
        );
      default:
        return <p>{message.message}</p>;
    }
  };

  return (
    <div className={`chat ${sender === 'customer@mail.com' ? 'chat-start' : 'chat-end'}`}>
      {/* Avatar */}
      <div className="chat-image avatar">
        <Avatar sender={sender} />
      </div>

      {/* Message Header */}
      <div className="chat-header">
        {sender === 'customer@mail.com' ? 'Customer' : sender === 'agent@mail.com' ? 'Agent' : 'Admin'}
      </div>

      {/* Message Bubble */}
      <div
        className={`chat-bubble ${
          sender === 'agent@mail.com' ? 'bg-blue-500 text-white shadow-md' : 'bg-white text-black shadow-md'
        }`}
      >
        {renderMessageContent(message)}
      </div>

      {/* Message Footer - No status, just keep the footer visible */}
      <div className="chat-footer opacity-50 mb-20">
        {/* Footer content can be added here if needed in the future */}
      </div>
    </div>
  );
};

ChatBubble.propTypes = {
  message: propTypes.shape({
    type: propTypes.oneOf(['text', 'image', 'video', 'pdf']).isRequired,
    message: propTypes.string.isRequired,
  }).isRequired,
  sender: propTypes.string.isRequired,
};

export default ChatBubble;
