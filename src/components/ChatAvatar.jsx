import propTypes from 'prop-types';

const Avatar = ({ sender }) => {
  const customerImage = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const agentImage = "https://images.unsplash.com/photo-1626863905121-3b0c0ed7b94c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"; // Replace with actual image URL for agent

  // Avatar untuk Customer
  if (sender === 'customer@mail.com') {
    return (
      <div className="w-14 h-14 rounded-full overflow-hidden flex items-center justify-center shadow-lg border-4 border-white">
        <img src={customerImage} alt="Customer Avatar" className="w-full h-full object-cover" />
      </div>
    );
  }
  
  // Avatar untuk Agent
  else if (sender === 'agent@mail.com') {
    return (
      <div className="w-14 h-14 rounded-full overflow-hidden flex items-center justify-center shadow-lg border-4 border-white">
        <img src={agentImage} alt="Agent Avatar" className="w-full h-full object-cover" />
      </div>
    );
  }

  // Avatar default untuk pengirim yang tidak diketahui
  return (
    <div className="w-14 h-14 rounded-full bg-gray-300 flex items-center justify-center shadow-lg border-4 border-white">
      <span className="text-white text-3xl">?</span> {/* Placeholder for unknown users */}
    </div>
  );
};

Avatar.propTypes = {
  sender: propTypes.string.isRequired,
};

export default Avatar;
