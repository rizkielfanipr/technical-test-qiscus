import PropTypes from 'prop-types';

const Header = ({ room, openModal }) => {
  return (
    <div className="fixed top-0 left-0 right-0 bg-base-100 z-10 py-2 border-b border-gray-300 font-poppins">
      <div className="navbar">
        <div className="flex-1 flex items-center ml-4 sm:ml-10">
          {/* Image to the left */}
          <div className="avatar">
            <div className="ring-primary ring-offset-base-100 w-6 sm:w-8 rounded-full ring ring-offset-1">
              <img src={room.image_url} alt={room.name} />
            </div>
          </div>

          {/* Room name and ID */}
          <div className="ml-2 sm:ml-4">
            <h1 className="text-lg sm:text-xl text-[#03346E] font-semibold">
              {room.name}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500">
              {String(room.id)}
            </p>
          </div>
        </div>

        {/* Avatar group for participants */}
        <div className="flex items-center space-x-2">
          <div className="avatar-group -space-x-4 sm:-space-x-6 rtl:space-x-reverse">
            {room.participant.map((participant, index) => (
              <div
                key={index}
                onClick={() => openModal(participant)}
                className="cursor-pointer"
              >
                <div className="avatar">
                  <div className="w-6 sm:w-8 md:w-10">
                    {/* Render participant's avatar or initials */}
                    <div className="w-full h-full rounded-full bg-gray-300 flex items-center justify-center">
                      <span className="text-white font-semibold text-xs sm:text-sm">
                        {participant.name[0]} {/* Menampilkan inisial peserta */}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {
  room: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    image_url: PropTypes.string.isRequired,
    participant: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  openModal: PropTypes.func.isRequired,
};

export default Header;
