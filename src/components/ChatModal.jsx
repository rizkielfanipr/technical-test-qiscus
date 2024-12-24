import PropTypes from 'prop-types';

const ChatModal = ({ isModalOpen, participants, closeModal }) => {
  if (!isModalOpen) return null;

  return (
    <dialog id="my_modal_3" className="modal" open>
      <div className="modal-box relative">
        <form method="dialog">
          {/* Close button */}
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            type="button"
            onClick={closeModal}
          >
            ✕
          </button>
        </form>

        <h3 className="font-bold text-lg mb-4">Participants</h3>
        {participants.length === 0 ? (
          <p>No participants available</p> // Menampilkan jika tidak ada peserta
        ) : (
          participants.map((participant) => (
            <div key={participant.id} className="flex items-center space-x-2 mb-3">
              <div className="w-10 h-10 rounded-full bg-gray-300 flex justify-center items-center">
                {/* Render Avatar */}
                <span className="text-white">{participant.name.charAt(0)}</span>
              </div>
              <div>
                <p className="font-semibold">{participant.name}</p>
                <p className="text-sm text-gray-500">Email: {participant.id}</p> {/* Displaying participant id */}
              </div>
            </div>
          ))
        )}
      </div>
    </dialog>
  );
};

ChatModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  participants: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      role: PropTypes.number.isRequired,
    })
  ).isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default ChatModal;
