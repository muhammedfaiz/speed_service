import { useEffect, useState } from 'react';
import { FaTasks, FaDollarSign, FaCheckCircle, FaClipboardList } from 'react-icons/fa';
import { fetchEmployeeStats } from '../../services/employeeService';

const StatisticsOverview = () => {
  const [completed,setCompleted]=useState(0);
  const [pendingRequest,setPendingRequest]=useState(0);
  const [earnings,setEarnings]=useState(0);
  const [completionRate,setCompletionRate]=useState(0);
  useEffect(()=>{
    const fetchStats = async()=>{
      const data = await fetchEmployeeStats();
      if(data){
        setCompleted(data.completed);
        setPendingRequest(data.pendingRequest);
        setEarnings(data.earnings);
        setCompletionRate(data.completionRate);
      }
    }
    fetchStats();
  })
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow ease-in-out duration-300">
        <div className="flex items-center space-x-4">
          <FaClipboardList className="text-blue-600 text-4xl" />
          <div>
            <h3 className="text-lg font-semibold">Completed Bookings</h3>
            <p className="text-3xl font-bold">{completed?completed:0}</p>
          </div>
        </div>
      </div>
      <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow ease-in-out duration-300">
        <div className="flex items-center space-x-4">
          <FaTasks className="text-green-600 text-4xl" />
          <div>
            <h3 className="text-lg font-semibold">Pending Requests</h3>
            <p className="text-3xl font-bold">{pendingRequest?pendingRequest:0 }</p>
          </div>
        </div>
      </div>
      <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow ease-in-out duration-300">
        <div className="flex items-center space-x-4">
          <FaDollarSign className="text-yellow-600 text-4xl" />
          <div>
            <h3 className="text-lg font-semibold">Total Earnings</h3>
            <p className="text-3xl font-bold">${earnings?earnings:0}</p>
          </div>
        </div>
      </div>
      <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow ease-in-out duration-300">
        <div className="flex items-center space-x-4">
          <FaCheckCircle className="text-indigo-600 text-4xl" />
          <div>
            <h3 className="text-lg font-semibold">Task Completion Rate</h3>
            <p className="text-3xl font-bold">{completionRate?completionRate:0}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsOverview;
