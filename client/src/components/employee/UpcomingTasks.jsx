import { useEffect, useState } from 'react';
import { FaCheck, FaWrench } from 'react-icons/fa';
import { getTasks, taskComplete } from '../../services/employeeService';
import {toast} from "react-toastify";

const UpcomingTasks = () => {
  const [tasks,setTasks]=useState([]);
  const [isChange,setIsChange]=useState(false);

  useEffect(()=>{
    const fetchTasks = async () => {
      const data = await getTasks();
      setTasks(data.tasks);
    };
    fetchTasks();
  },[isChange])

  async function handleComplete(id){
    const response = await taskComplete(id);
    if(response.status==200){
      setIsChange(!isChange);
      toast.success(response.data.message);
    }
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow ease-in-out duration-300">
      <h3 className="text-xl font-semibold mb-4">Upcoming Tasks</h3>
      <ul className="space-y-4">
        {tasks.map(task => (
          <li key={task._id} className="flex justify-between items-center border-b pb-4">
            <div className="flex items-center space-x-3">
              <FaWrench className="text-gray-700 text-2xl" />
              <div>
                <p className="font-medium">{task.user.name}</p>
                <p className="text-sm text-gray-500">Task: {task.orderItems.map((item,index)=>(
                  <span key={item._id}>{item.item.name} {index < task.orderItems.length - 1 ? ", " : ""}</span>
                ))}</p>
                <p className="text-sm text-gray-500">Due: {task.date}</p>
              </div>
            </div>
            <button onClick={()=>handleComplete(task._id)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 flex items-center space-x-2">
              <FaCheck />
              <span>Complete</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpcomingTasks;
