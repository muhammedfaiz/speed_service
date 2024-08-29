import Navbar from "../../components/admin/Navbar";
import ProfileDropdown from "../../components/admin/ProfileDropdown";
import logo from "../../assets/logo-transparent.png";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOrderDetails } from "../../services/adminService";

const OrderView = () => {
  const { id } = useParams();

  const [orderDetails, setOrderDetails] = useState({});
  useEffect(() => {
    const fetchOrder = async () => {
      const data = await getOrderDetails(id);
      setOrderDetails(data.order);
    };
    fetchOrder();
  }, [id]);

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-gradient-to-b from-blue-600 to-indigo-950 text-white flex flex-col h-screen">
        <div className="pl-10 pt-10 flex justify-center lg:justify-start">
          <img src={logo} alt="speed service" className="w-36" />
        </div>
        <Navbar />
      </aside>

      <main className="flex-grow p-4 relative overflow-auto">
        <div className="absolute top-4 right-4">
          <ProfileDropdown />
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="text-left mb-4">
            <h1 className="text-3xl font-semibold text-gray-800">
              Order Details
            </h1>
            <p className="text-gray-500 text-sm font-semibold">
              Details of Orders.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Items
              </h2>
              <div className="space-y-4">
                {orderDetails?.orderItems?.map((item) => (
                  <div
                    key={item?.item?._id}
                    className="bg-gray-50 p-4 rounded-lg shadow-sm flex items-center space-x-4"
                  >
                    <img
                      src={item?.item?.imageUrl || "/default-service-image.jpg"}
                      alt={item?.item?.name}
                      className="w-24 h-24 object-cover rounded-md"
                    />
                    <div>
                      <p className="text-lg font-medium text-gray-800">
                        {item?.item?.name}
                      </p>
                      <p className="text-gray-600">{item?.item?.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-600">
                  Order Information
                </h3>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <p className="text-gray-600">Date</p>
                    <p className="text-gray-800">{orderDetails?.date}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Time Slot</p>
                    <p className="text-gray-800">{orderDetails?.time}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-600">Address</p>
                    <p className="text-gray-800 leading-6">
                      {orderDetails?.address?.locality},<br />
                      {orderDetails?.address?.place},{" "}
                      {orderDetails?.address?.state},<br />
                      {orderDetails?.address?.country},{" "}
                      {orderDetails?.address?.pincode}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary Section */}
            <div className="bg-white shadow-lg rounded-lg p-6 space-y-5">
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-700">
                  Order Summary
                </h2>
              </div>
              <div className="mb-2 flex items-center justify-between">
                <p className="text-gray-600">Order ID</p>
                <p className="text-lg font-medium text-gray-800">
                  # {orderDetails?.orderId}
                </p>
              </div>
              <div className="mb-2 flex items-center justify-between">
                <p className="text-gray-600">Customer Name</p>
                <p className="text-lg font-medium text-gray-800">
                  {orderDetails?.user?.name}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-gray-600 ">Status</p>
                <p
                  className={`text-lg font-semibold rounded-lg px-2 py-1  ${
                    orderDetails?.status === "Completed"
                      ? "text-green-600 bg-green-300"
                      : orderDetails?.status === "Commited"
                      ? "text-blue-600 bg-blue-300"
                      : "text-yellow-800 bg-yellow-400"
                  }`}
                >
                  {orderDetails?.status}
                </p>
              </div>

              {/* Committed Employee Section */}
              {orderDetails?.employee && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg shadow-sm">
                  <h3 className="text-lg font-medium text-gray-600">
                    Committed Employee
                  </h3>
                  <p className="text-gray-800">
                    {orderDetails?.employee?.name}
                  </p>
                  <p className="text-gray-600">
                    {orderDetails?.category?.name} specialist
                  </p>
                </div>
              )}

              {/* Total Amount */}
              <div className="mt-4 flex items-center justify-between bg-gray-50 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-gray-600">
                  Total Amount
                </h3>
                <p className="text-lg font-semibold text-gray-800">
                  ${orderDetails?.totalAmount?.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrderView;
