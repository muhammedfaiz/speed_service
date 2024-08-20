import Navbar from "../../components/user/Navbar";
import { useEffect, useState } from "react";
import { MdDateRange, MdAccessTime, MdPayment, MdInfoOutline } from "react-icons/md";
import userService from "../../services/userService";
import { useNavigate } from "react-router-dom";

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const result = await userService.getBookings();
        setBookings(result.bookings);
      } catch (error) {
        console.log("Error fetching bookings", error);
      }
    };
    fetchBookings();
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-8 flex flex-col items-center min-h-screen bg-gray-100">
        <h2 className="text-3xl font-semibold mb-8 text-gray-800">Your Bookings</h2>
        <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <div
                key={booking.orderId}
                className="p-6 mb-6 bg-gray-50 rounded-md shadow-sm border-b hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-700">Order ID: {booking.orderId}</h3>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      booking.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : booking.status === "Cancelled" ? "bg-red-100 text-red-700"
                        : booking.status === "Commited" ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
                <div className="text-gray-600">
                  <p className="mb-2 flex items-center">
                    <MdDateRange className="mr-2 text-primary-blue" />
                    <span className="font-medium">Date:</span> {new Date(booking.date).toDateString()}
                  </p>
                  <p className="mb-2 flex items-center">
                    <MdAccessTime className="mr-2 text-primary-blue" />
                    <span className="font-medium">Time:</span> {booking.time}
                  </p>
                  <p className="mb-2 flex items-center">
                    <MdPayment className="mr-2 text-primary-blue" />
                    <span className="font-medium">Payment:</span> {booking.paymentMethod}
                  </p>
                </div>
                <div className="flex justify-end space-x-4 mt-4">
                  <button
                    className="text-primary-blue flex items-center hover:underline text-sm"
                    onClick={() => navigate(`/booking-details/${booking._id}`)}
                  >
                    <MdInfoOutline className="mr-1" />
                    View Details
                  </button>
                  
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No bookings found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default BookingsPage;
