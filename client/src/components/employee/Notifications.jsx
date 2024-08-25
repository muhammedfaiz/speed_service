import { FaBell } from 'react-icons/fa';

const Notifications = () => {
  const notifications = [
    "New booking request received!",
    "Reminder: Task due tomorrow",
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow ease-in-out duration-300">
      <h3 className="text-xl font-semibold mb-4">Notifications</h3>
      <ul className="space-y-4">
        {notifications.map((notification, index) => (
          <li key={index} className="flex items-center space-x-3">
            <FaBell className="text-yellow-500 text-xl" />
            <p className="text-gray-800">{notification}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
