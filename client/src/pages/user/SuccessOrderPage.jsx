import { Link } from "react-router-dom";
import icon from "../../assets/success-svg.svg";

const SuccessOrderPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen w-full flex justify-center items-center">
      <div className="border bg-white p-8 flex flex-col items-center space-y-8 shadow-md rounded-md">
        <img src={icon} alt="icon-success" className="w-1/3" />
        <h1 className="text-3xl font-semibold">Thank you</h1>
        <p className="text-gray-500 text-sm">
          Your order has been successfully placed. We will contact you shortly.
        </p>
        <div className="space-x-6">
          <Link
            to="/"
            className="bg-primary-blue p-3 text-white rounded hover:bg-secondary-blue"
          >
            Back to Home
          </Link>
          <Link
            to="/bookings"
            className="ring-1 ring-primary-blue text-primary-blue p-3 rounded hover:bg-primary-blue hover:text-white"
          >
            Show bookings
          </Link>
        </div>
      </div>
    </div>
  );
};
export default SuccessOrderPage;
