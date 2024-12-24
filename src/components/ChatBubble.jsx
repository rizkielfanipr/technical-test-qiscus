import { Document, Page } from 'react-pdf'; // Importing components from react-pdf
import Avatar from './ChatAvatar'; // Importing the new Avatar component
import { useState } from 'react';
import propTypes from 'prop-types';

const ChatBubble = ({ message, sender, time, status }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const renderMessageContent = (message) => {
    switch (message.type) {
      case 'text':
        return <p>{message.message}</p>;
      case 'image':
        return <img src={message.message} alt="Image message" className="max-w-full" />;
      case 'video':
        return (
          <video controls className="max-w-full">
            <source src={message.message} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        );
      case 'pdf':
        return (
          <div className="pdf-viewer">
            <Document
              file={message.message}
              onLoadSuccess={onLoadSuccess}
              className="max-w-full"
            >
              <Page pageNumber={pageNumber} />
            </Document>
            <div className="text-center mt-2">
              <button
                onClick={() => setPageNumber(pageNumber - 1)}
                disabled={pageNumber <= 1}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Previous
              </button>
              <span className="px-4">{`Page ${pageNumber} of ${numPages}`}</span>
              <button
                onClick={() => setPageNumber(pageNumber + 1)}
                disabled={pageNumber >= numPages}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Next
              </button>
            </div>
          </div>
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
        <time className="text-xs opacity-50">{time}</time>
      </div>

      {/* Message Bubble */}
      <div
        className={`chat-bubble ${
          sender === 'agent@mail.com'
            ? 'bg-blue-500 text-white shadow-md'
            : 'bg-white text-black shadow-md'
        }`}
      >
        {renderMessageContent(message)}
      </div>

      {/* Message Footer */}
      <div className="chat-footer opacity-50">{status}</div>
    </div>
  );
};

ChatBubble.propTypes = {
  message: propTypes.shape({
    type: propTypes.oneOf(['text', 'image', 'video', 'pdf']).isRequired,
    message: propTypes.string.isRequired,
  }).isRequired,
  sender: propTypes.string.isRequired,
  time: propTypes.string.isRequired, // Time for the message
  status: propTypes.string.isRequired, // Status (Delivered/Seen)
};

export default ChatBubble;
