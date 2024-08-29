import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import userService from "../../services/userService";
import Navbar from "../../components/user/Navbar";
import {
  FaCalendarAlt,
  FaClock,
  FaDollarSign,
  FaUser,
  FaHome,
  FaCity,
  FaFlag,
  FaGlobe,
  FaMailBulk,
  FaClipboardList,
  FaRegClock,
  FaBriefcase,
  FaStar,
} from "react-icons/fa";
import { BsChatText } from "react-icons/bs";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Modal from "../../components/common/Modal";
import { MdClose } from "react-icons/md";
import Chat from "../../components/common/Chat";

const BookingDetailsPage = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState({});
  const [isChange, setIsChange] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [review, setReview] = useState({ id: null, rating: 0, comment: "" });
  const [errors, setErrors] = useState({});
  const [isChatOpen,setIsChatOpen]=useState(false);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const result = await userService.fetchBookingDetails(id);
        setBooking(result.booking);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBooking();
  }, [id, isChange]);


  const validateReview = () => {
    const errors = {};
    if (!review.rating) {
      errors.rating = "Rating is required.";
    }
    if (!review.comment) {
      errors.comment = "Comment is required.";
    }
    return errors;
  };

  const handleCancelBooking = async () => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "Once cancelled, you won't be able to undo this action.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, cancel it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await userService.cancelBooking(id);
          if (response.status === 200) {
            toast.success(response.data.message);
            setIsChange(!isChange);
          }
        }
      });
    } catch (error) {
      console.error("Error cancelling booking:", error);
    }
  };

  const handleReviewSubmit = async (e) => {
    
    e.preventDefault();
    const validationErrors = validateReview();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      console.log(errors)
      return;
    }
    try {
      const response = await userService.submitReview(review);
      if (response.status === 200) {
        toast.success(response.data.message);
        setReview({ id: null, rating: 0, comment: "" });
        setIsReviewOpen(false);
        setErrors({});
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-12">
        <div className="text-left mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">
            Booking Details
          </h1>
          <p className="text-sm text-gray-500">
            Review all the information related to your booking below.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Booking Info */}
          <div className="border w-full lg:w-1/3 p-5 rounded-md bg-gray-50 shadow-md space-y-4">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">
              Booking Info
            </h2>
            <div className="flex justify-between items-center">
              <span className="flex items-center text-sm font-medium text-gray-700">
                <FaCalendarAlt className="mr-2 text-blue-500" /> Booked Date:
              </span>
              <span className="text-sm text-gray-600"> {booking?.date}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center text-sm font-medium text-gray-700">
                <FaClock className="mr-2 text-blue-500" /> Booked Time:
              </span>
              <span className="text-sm text-gray-600">{booking?.time}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center text-sm font-medium text-gray-700">
                <FaClipboardList className="mr-2 text-blue-500" /> Status:
              </span>
              <span
                className={`text-sm font-semibold p-1 rounded ${
                  booking.status == "Pending"
                    ? "text-orange-900 bg-yellow-500"
                    : booking.status == "Completed"
                    ? "text-green-900 bg-green-500"
                    : booking.status == "Commited"
                    ? "text-blue-900 bg-blue-500"
                    : "text-red-900 bg-red-500"
                }`}
              >
                {booking?.status}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center text-sm font-medium text-gray-700">
                <FaDollarSign className="mr-2 text-blue-500" /> Total Amount:
              </span>
              <span className="text-sm text-gray-600">
                ${booking?.totalAmount}
              </span>
            </div>
          </div>

          <div className="border w-full lg:w-1/3 p-5 rounded-md bg-gray-50 shadow-md space-y-4">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">
              Service Provider Info
            </h2>
            {booking?.employee ? (
              <>
                <div className="flex justify-between items-center">
                  <span className="flex items-center text-sm font-medium text-gray-700">
                    <FaUser className="mr-2 text-blue-500" /> Name:
                  </span>
                  <span className="text-sm text-gray-600">
                    {booking?.employee?.name}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center text-sm font-medium text-gray-700">
                    <FaBriefcase className="mr-2 text-blue-500" /> Designation:
                  </span>
                  <span className="text-sm text-gray-600">
                    {booking?.category?.name}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center text-sm font-medium text-gray-700">
                    <FaRegClock className="mr-2 text-blue-500" /> Experience:
                  </span>
                  <span className="text-sm text-gray-600">
                    {booking?.employee?.experience} years
                  </span>
                </div>
                <div className="w-full flex justify-end items-baseline p-4">
                  <button onClick={()=>setIsChatOpen(true)} className="ring-1 ring-primary-blue rounded-md px-3 py-2 text-primary-blue hover:bg-primary-blue hover:text-white transition-colors duration-100 flex items-center">
                    <BsChatText className="mr-2" /> Chat
                  </button>
                </div>
              </>
            ) : (
              <div className="text-gray-600 text-sm">
                The service provider has not yet been committed.
              </div>
            )}
          </div>

          <div className="border w-full lg:w-1/3 p-5 rounded-md bg-gray-50 shadow-md space-y-4">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">
              Address Info
            </h2>
            <div className="flex justify-between items-center">
              <span className="flex items-center text-sm font-medium text-gray-700">
                <FaHome className="mr-2 text-blue-500" /> Locality:
              </span>
              <span className="text-sm text-gray-600">
                {booking?.address?.locality}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center text-sm font-medium text-gray-700">
                <FaCity className="mr-2 text-blue-500" /> Place:
              </span>
              <span className="text-sm text-gray-600">
                {booking?.address?.place}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center text-sm font-medium text-gray-700">
                <FaFlag className="mr-2 text-blue-500" /> State:
              </span>
              <span className="text-sm text-gray-600">
                {booking?.address?.state}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center text-sm font-medium text-gray-700">
                <FaGlobe className="mr-2 text-blue-500" /> Country:
              </span>
              <span className="text-sm text-gray-600">
                {booking?.address?.country}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center text-sm font-medium text-gray-700">
                <FaMailBulk className="mr-2 text-blue-500" /> Pincode:
              </span>
              <span className="text-sm text-gray-600">
                {booking?.address?.pincode}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 border p-5 rounded-md bg-gray-50 shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Order Service
          </h2>
          <div className="space-y-4">
            {booking.orderItems?.map((item) => (
              <div key={item._id} className="flex justify-between items-center">
                <div className="flex items-center">
                  <img
                    src={item.imageUrl}
                    alt="service-image"
                    className="w-20 h-20 object-cover rounded-md mr-4"
                  />
                  <div className="flex flex-col">
                    <span className="text-lg font-medium text-gray-700">
                      {item.item.name}
                    </span>
                    <span className="text-base text-gray-600">
                      {item.quantity} units
                    </span>
                    <span className="text-gray-600 text-base">
                      ${item.item.price}
                    </span>
                  </div>
                </div>
                <div>
                  {booking.status == "Completed" && (
                    <span
                      className="text-sm text-primary-blue hover:text-secondary-blue cursor-pointer lg:text-base"
                      onClick={() => {
                        setIsReviewOpen(true);
                        setReview({ id: item.item._id });
                      }}
                    >
                      Rate our service
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          {booking.status !== "Completed" && booking.status !== "Cancelled" && (
            <button
              onClick={handleCancelBooking}
              className="px-6 py-3 bg-red-500 text-white text-sm font-semibold rounded-md hover:bg-red-600 transition duration-300"
            >
              Cancel Booking
            </button>
          )}
        </div>
      </div>
      <Modal isOpen={isReviewOpen}>
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Add a Review
          </h2>
          <MdClose
            onClick={() => setIsReviewOpen(false)}
            className="cursor-pointer"
          />
        </div>
        <form onSubmit={(e)=>handleReviewSubmit(e)} className="space-y-4 p-5">
          <div className="flex items-center space-x-2">
            <FaStar
              className={`text-xl ${
                review.rating >= 1 ? "text-yellow-500" : "text-gray-300"
              }`}
              onClick={() => setReview({ ...review, rating: 1 })}
            />
            <FaStar
              className={`text-xl ${
                review.rating >= 2 ? "text-yellow-500" : "text-gray-300"
              }`}
              onClick={() => setReview({ ...review, rating: 2 })}
            />
            <FaStar
              className={`text-xl ${
                review.rating >= 3 ? "text-yellow-500" : "text-gray-300"
              }`}
              onClick={() => setReview({ ...review, rating: 3 })}
            />
            <FaStar
              className={`text-xl ${
                review.rating >= 4 ? "text-yellow-500" : "text-gray-300"
              }`}
              onClick={() => setReview({ ...review, rating: 4 })}
            />
            <FaStar
              className={`text-xl ${
                review.rating >= 5 ? "text-yellow-500" : "text-gray-300"
              }`}
              onClick={() => setReview({ ...review, rating: 5 })}
            />
          </div>
          {errors.rating && (
            <p className="text-red-500 text-sm">{errors.rating}</p>
          )}
          <textarea
            className="w-full h-32 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write your review here..."
            value={review.comment}
            onChange={(e) => setReview({ ...review, comment: e.target.value })}
          />
          {errors.comment && (
            <p className="text-red-500 text-sm">{errors.comment}</p>
          )}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-primary-blue text-white text-sm font-semibold rounded-md hover:bg-secondary-blue transition duration-300"
            >
              Submit Review
            </button>
          </div>
        </form>
      </Modal>
     {booking?.employee && (<Chat isOpen={isChatOpen} setIsOpen={setIsChatOpen} receiver={booking.employee}/>)}
    </>
  );
};

export default BookingDetailsPage;
