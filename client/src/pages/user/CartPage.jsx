import { IoMdCart } from "react-icons/io";
import Navbar from "../../components/user/Navbar";
import { useEffect, useState } from "react";
import userService from "../../services/userService";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [carts, setCarts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCarts = async () => {
      const result = await userService.fetchCarts();
      setCarts(result.carts);
    };
    fetchCarts();
  }, []);
  return (
    <>
      <Navbar />
      {carts.length > 0 ? (
        <div className="p-5 flex flex-col items-center">
          <div className="flex justify-center items-center space-x-3 mt-8 mb-8">
            <IoMdCart className="text-primary-blue text-3xl" />
            <h2 className="text-3xl font-semibold">Your Cart</h2>
          </div>

          {carts.map((cart) => (
            <div
              key={cart._id}
              className="border rounded-lg shadow-lg p-5 w-full lg:w-2/3 bg-white mb-4"
            >
              <div className="flex justify-between items-center">
                <img
                  src={cart.imageUrl} // Placeholder image
                  alt="Service"
                  className="w-20 h-20 object-cover rounded-lg"
                />

                <div className="mx-4 flex-1">
                  <h3 className="text-lg font-medium text-gray-700">
                    {cart.category.name} Service
                  </h3>
                  <div className="space-x-2 text-gray-500 mt-1">
                    <span className="text-sm">{cart.items.length} service</span>
                    <span className="text-sm">${cart.totalAmount}</span>
                  </div>
                </div>

                <button className="px-6 py-2 bg-primary-blue text-white text-sm rounded-lg hover:bg-secondary-blue transition-all duration-200"
                onClick={()=>navigate(`/checkout/${cart._id}`)}
                >
                  Checkout
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center p-8 min-h-screen">
          <IoMdCart className="text-primary-blue text-5xl" />
          <p className="text-gray-500 text-lg font-medium">
            Your cart is empty
          </p>
          <p className="text-gray-400">
            Add items to your cart to see them here.
          </p>
        </div>
      )}
    </>
  );
};

export default CartPage;
