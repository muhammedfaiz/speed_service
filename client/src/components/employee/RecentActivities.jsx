import { useEffect, useState } from 'react';
import { FaHistory } from 'react-icons/fa';
import { fetchRecentActivities } from '../../services/employeeService';

const RecentActivities = () => {
  const [activities,setActivities]=useState([]);

  useEffect(()=>{
    const getRecentActivities = async()=>{
      const data = await fetchRecentActivities();
      setActivities(data.activities);
    }

    getRecentActivities()
  },[]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow ease-in-out duration-300">
      <h3 className="text-xl font-semibold mb-4">Recent Activities</h3>
      <ul className="space-y-4">
        {activities?activities.map(activity => (
          <li key={activity._id} className="border-b pb-4 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <FaHistory className="text-gray-600 text-xl" />
              <div>
                <p className="font-medium">{activity.orderId}</p>
                <p className="text-sm text-gray-500">{activity.date}</p>
              </div>
            </div>
            <p className="italic text-green-600">{activity.feedback}</p>
          </li>
        )):(
          <div className='text-base text-gray-500'>
            No Recent Activity
          </div>
        )}
      </ul>
    </div>
  );
};

export default RecentActivities;
