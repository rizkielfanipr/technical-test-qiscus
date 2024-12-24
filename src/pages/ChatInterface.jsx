import { useState, useEffect } from 'react';
import axios from 'axios';
import ChatHeader from '../components/ChatHeader';
import ChatModal from '../components/ChatModal';
import ChatInput from '../components/ChatInput';
import ChatBubble from '../components/ChatBubble';

const ChatInterface = () => {
  const [room, setRoom] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get('/messages.json')
      .then((response) => {
        if (response.data.results && response.data.results.length > 0) {
          const chatData = response.data.results[0];
          setRoom(chatData.room);
          setComments(chatData.comments || []);
        } else {
          setRoom(null);
          setComments([]);
        }
      })
      .catch((error) => {
        console.error('Error fetching chat data:', error);
        setRoom(null);
        setComments([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSendMessage = (message) => {
    const newMessage = {
      id: Date.now().toString(),
      sender: 'customer@mail.com',
      message: message,
      type: 'text',
      time: new Date().toLocaleTimeString(),
      status: 'Delivered',
    };
    setComments([...comments, newMessage]);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-white via-blue-200 to-blue-80">
      {loading ? (
        <p className="text-black">Loading chat data...</p>
      ) : room ? (
        <>
          <ChatHeader room={room} openModal={openModal} />
          <ChatModal
            isModalOpen={isModalOpen}
            participants={room.participant}
            closeModal={closeModal}
          />
          <div className="mt-24 p-6 flex-1 overflow-hidden">
            <div className="flex-1 overflow-auto space-y-4">
              {comments.length === 0 ? (
                <p className="text-black">No messages available</p>
              ) : (
                comments.map((msg) => (
                  <ChatBubble key={msg.id} message={msg} sender={msg.sender} />
                ))
              )}
            </div>
            <ChatInput onSendMessage={handleSendMessage} />
          </div>
        </>
      ) : (
        <p className="text-black">No room data available</p>
      )}
    </div>
  );
};

export default ChatInterface;
