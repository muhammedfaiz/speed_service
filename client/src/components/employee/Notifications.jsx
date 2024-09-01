import { FaBell } from 'react-icons/fa';
import { useNotificationContext } from '../../context/NotificationContext';

const Notifications = () => {
  const {employeeNotifications}=useNotificationContext()

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow ease-in-out duration-300">
      <h3 className="text-xl font-semibold mb-4">Notifications</h3>
      <ul className="space-y-4">
        {employeeNotifications.length>0?(employeeNotifications.map((notification, index) => (
          <li key={index} className="flex items-center space-x-3">
            <FaBell className="text-yellow-500 text-xl" />
            <p className="text-gray-800">{notification}</p>
          </li>
        ))):(
          <div className='text-base text-gray-500'>No new notifications</div>
        )}
      </ul>
    </div>
  );
};

export default Notifications;
