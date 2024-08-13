import { useEffect, useState } from "react";
import Navbar from "../../components/employee/Navbar";
import {
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaClipboardCheck,
  FaMapMarkerAlt,
  FaClipboardList,
  FaCreditCard,
} from "react-icons/fa";
import { acceptRequest, getRequests } from "../../services/employeeService";
import { toast } from "react-toastify";

const EmployeeRequestPage = () => {
  const [bookings, setBookings] = useState([]);
  const [isChange,setIsChange]=useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const result = await getRequests();
        setBookings(result.bookings);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBookings();
  }, [isChange]);

  const handleAcceptBooking = async (id) => {
    const result = await acceptRequest(id);
    if (result.status == 200) {
        setIsChange(!isChange);
      toast.success(result.data.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex bg-gray-100 min-h-screen p-8">
        <div className="w-full max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">
            Booking Requests
          </h1>
          <p className="text-sm text-gray-500 mb-8">
            Review and accept the booking requests from customers.
          </p>
          {bookings.length > 0 ? (
            bookings.map((booking) => (
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
                    {booking?.address?.house}, {booking?.address?.city},{" "}
                    {booking?.address?.state}, {booking?.address?.pincode}
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    <FaClipboardList className="inline mr-2 text-yellow-500" />{" "}
                    <span className="font-semibold">Service:</span>{" "}
                    {booking?.orderItems?.map((item, index) => (
                      <span key={item._id}>
                        {item?.item?.name}
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
                    className={`text-sm font-semibold px-4 py-2 rounded-md ${
                      booking.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {booking.status}
                  </div>
                  <button
                    onClick={() => handleAcceptBooking(booking._id)}
                    className="px-8 py-3 bg-green-500 text-white text-sm font-semibold rounded-md hover:bg-green-600 transition-colors duration-300"
                  >
                    <FaClipboardCheck className="inline mr-2" /> Accept Booking
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 text-lg">
              No booking requests at the moment.
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EmployeeRequestPage;
