import { useEffect, useState } from "react";
import Navbar from "../../components/employee/Navbar";
import { FaCheckCircle, FaMapMarkerAlt, FaListUl } from "react-icons/fa";
import { getCompletedTasks } from "../../services/employeeService";

const HistoryPage = () => {
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const data = await getCompletedTasks();
      setHistoryData(data.history);
    };
    fetchHistory();
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Service History</h1>
          <p className="text-sm text-gray-500 mb-8">History of service provided.</p>

          {historyData.length === 0 ? (
            <div className="text-center text-gray-600">
              <p className="text-lg">No service history available yet.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {historyData.map((history) => (
                <div
                  key={history._id}
                  className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h2 className="text-2xl font-semibold text-gray-800">{history.user.name}</h2>
                      <p className="text-sm text-gray-500">
                        {history.date} at {history.time}
                      </p>
                    </div>
                    <div className="text-green-500 flex items-center space-x-2">
                      <FaCheckCircle className="text-xl" />
                      <span className="font-semibold">{history.status}</span>
                    </div>
                    <div className="text-gray-800 text-lg font-semibold flex items-center space-x-2">
                      <span>$ {history.totalAmount}</span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-700 space-y-2">
                    <div className="flex items-center space-x-2">
                      <FaListUl className="text-lg text-blue-500" />
                      <p>
                        <strong>Items:</strong>{" "}
                        {history?.orderItems?.map((item, index) => (
                          <span key={item._id}>
                            {item?.item?.name} (No. of units: {item.quantity})
                            {index < history.orderItems.length - 1 ? ", " : ""}
                          </span>
                        ))}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaMapMarkerAlt className="text-lg text-red-500" />
                      <p>
                        <strong>Address:</strong> {history.address.locality}, {history.address.place},{" "}
                        {history.address.state}, {history.address.country}, {history.address.pincode}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HistoryPage;
