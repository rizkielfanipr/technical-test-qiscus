import PropTypes from 'prop-types';
import { useMemo } from 'react';

const ChatAvatar = ({ sender }) => {
  // Memoize the image source and the image map to avoid unnecessary recomputations
  const avatarSrc = useMemo(() => {
    const images = {
      'customer@mail.com': "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      'agent@mail.com': "https://images.unsplash.com/photo-1626863905121-3b0c0ed7b94c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    };

    // Fallback image for unknown senders
    const fallbackImage = "https://via.placeholder.com/150/BBBBBB/FFFFFF?text=?";

    // Return the appropriate image source based on sender
    return images[sender] || fallbackImage;
  }, [sender]); // The dependency array only includes `sender`

  return (
    <div className="w-14 h-14 rounded-full overflow-hidden flex items-center justify-center shadow-lg border-4 border-white">
      <img src={avatarSrc} alt={`${sender} Avatar`} className="w-full h-full object-cover" />
    </div>
  );
};

ChatAvatar.propTypes = {
  sender: PropTypes.string.isRequired,
};

export default ChatAvatar;
