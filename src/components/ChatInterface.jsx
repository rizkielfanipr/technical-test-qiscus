import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import Modal from './Modal';
import MessageInput from './MessageInput';
import ChatBubble from './ChatBubble'; // Import the ChatBubble component

const ChatInterface = () => {
  const [room, setRoom] = useState(null); // Menyimpan data ruangan
  const [comments, setComments] = useState([]); // Menyimpan komentar atau percakapan
  const [loading, setLoading] = useState(true); // Status loading
  const [isModalOpen, setIsModalOpen] = useState(false); // State untuk membuka/menutup modal

  useEffect(() => {
    // Mengambil data dari file messages.json yang ada di folder public
    axios
      .get('/messages.json') // Ganti dengan jalur relatif ke file JSON di folder public
      .then((response) => {
        console.log('API Response:', response);
        if (response.data.results && response.data.results.length > 0) {
          const chatData = response.data.results[0]; // Ambil data chat pertama dari results
          setRoom(chatData.room); // Menyimpan data room
          setComments(chatData.comments || []); // Menyimpan komentar
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
        setLoading(false); // Mengubah status loading menjadi false setelah fetch selesai
      });
  }, []); // Hanya dijalankan sekali saat komponen dimounting

  // Fungsi untuk membuka modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Fungsi untuk menutup modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Fungsi untuk mengirim pesan
  const handleSendMessage = (message) => {
    const newMessage = {
      id: Date.now().toString(),
      sender: 'customer@mail.com', // Assuming the sender is the customer
      message: message,
      type: 'text',
      time: new Date().toLocaleTimeString(), // Menambahkan waktu
      status: 'Delivered', // Menambahkan status
    };
    setComments([...comments, newMessage]); // Menambahkan pesan ke komentar
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-white via-blue-200 to-blue-80"> {/* Tailwind gradient class */}
      {loading ? (
        <p className="text-black">Loading chat data...</p> // Menampilkan loading jika data sedang di-fetch
      ) : room ? (
        <>
          <Header
            room={room}
            openModal={openModal}
          />

          <Modal
            isModalOpen={isModalOpen}
            participants={room.participant} // Fixing undefined issue here
            closeModal={closeModal}
          />

          {/* Main Content */}
          <div className="mt-24 p-6 flex-1 overflow-hidden"> {/* Ensure the content is inside a flex container */}
            {/* Comments Section */}
            <div className="flex-1 overflow-auto space-y-4">
              {comments.length === 0 ? (
                <p className="text-black">No messages available</p> // Menampilkan jika tidak ada komentar
              ) : (
                comments.map((msg) => (
                  <ChatBubble
                    key={msg.id}
                    message={msg}
                    sender={msg.sender}
                  />
                ))
              )}
            </div>

            {/* Message Input Section */}
            <MessageInput onSendMessage={handleSendMessage} />
          </div>
        </>
      ) : (
        <p className="text-black">No room data available</p> // Menampilkan jika tidak ada data room
      )}
    </div>
  );
};

export default ChatInterface;
