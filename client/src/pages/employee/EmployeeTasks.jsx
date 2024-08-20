import { FaCalendarAlt, FaClipboardList, FaClock, FaCreditCard, FaMapMarkerAlt, FaUser } from "react-icons/fa";
import Navbar from "../../components/employee/Navbar";
import { useEffect, useState } from "react";
import { getTasks, taskComplete } from "../../services/employeeService";
import { toast } from "react-toastify";
import { BsChatText } from "react-icons/bs";
import Chat from "../../components/common/Chat";

const EmployeeTasks = () => {
  const [tasks,setTasks] = useState([]);
  const [isChange,setIsChange]=useState(false);
  const [isChatOpen,setIsChatOpen]=useState(false);
  const [receiver,setReceiver]=useState(null);

  const handleComplete = async(id)=>{
    const result = await taskComplete(id);
    if(result.status==200){
        setIsChange(!isChange);
        toast.success(result.data.message);
    }
  }


  useEffect(()=>{
    const fetchTasks = async()=>{
        try {
            const data = await getTasks();
            setTasks(data.tasks);
        } catch (error) {
            console.log(error);
        }
    }
    fetchTasks();
  },[isChange]);

  return (
    <>
      <Navbar />
      <div className="flex bg-gray-100 min-h-screen p-8">
        <div className="w-full max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">Tasks Commited</h1>
          <p className="text-sm text-gray-500 mb-8">List of tasks accepted from customers.</p>

          {tasks.length > 0 ? (
            tasks.map((booking) => (
              <div
                key={booking._id}
                className="bg-white p-8 rounded-lg shadow-lg mb-6 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-700 mb-1">
                      <FaUser className="inline mr-2 text-blue-600" />{" "}
                      {booking?.user?.name}
                    </h2>
                    <div className="text-sm text-gray-600 flex items-center">
                      <FaCalendarAlt className="mr-2 text-blue-500" />{" "}
                      {booking.date}
                      <FaClock className="ml-4 mr-2 text-blue-500" />{" "}
                      {booking.time}
                    </div>
                  </div>
                  <div className="text-lg font-semibold text-gray-700 flex items-center">
                    ${booking.totalAmount}
                  </div>
                </div>
                <div className="mb-4">
                  <div className="text-sm text-gray-600 mb-2">
                    <FaMapMarkerAlt className="inline mr-2 text-red-500" />{" "}
                    <span className="font-semibold">Address:</span>{" "}
                    {booking?.address?.locality}, {booking?.address?.place},{" "}
                    {booking?.address?.state}, {booking?.address?.pincode}
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    <FaClipboardList className="inline mr-2 text-yellow-500" />{" "}
                    <span className="font-semibold">Service:</span>{" "}
                    {booking?.orderItems?.map((item, index) => (
                      <span key={item._id}>
                        {item?.item?.name}  (No. of units: {item.quantity})
                        {index < booking.orderItems.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </div>
                  <div className="text-sm text-gray-600">
                    <FaCreditCard className="inline mr-2 text-green-500" />{" "}
                    <span className="font-semibold">Payment Method:</span>{" "}
                    {booking.paymentMethod}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div
                    className={`text-sm font-semibold px-4 py-2 rounded-md bg-blue-100 text-blue-700`}
                  >
                    {booking.status}
                  </div>
                  <div className="space-x-4 flex">
                  <button                
                    className="px-5 py-3 bg-green-600 text-white text-sm font-semibold rounded-md hover:bg-green-800 transition-colors duration-300"
                    onClick={()=>handleComplete(booking._id)}
                  >
                     Completed
                  </button>
                  <button onClick={()=>{setIsChatOpen(true)
                    setReceiver(booking.user)
                  }} className="px-5 py-3 flex items-center text-primary-blue ring-1 ring-primary-blue rounded-md hover:bg-primary-blue hover:text-white transition-colors duration-300">
                  <BsChatText className="mr-2" /> Chat
                  </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 text-lg">
              No tasks pending at the moment.
            </div>
          )}
          </div>
        </div>
        <Chat isOpen={isChatOpen} setIsOpen={setIsChatOpen} isEmployee={true} receiver={receiver}/>
    </>
  );
};

export default EmployeeTasks;
