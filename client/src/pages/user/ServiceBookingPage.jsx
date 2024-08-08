import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/user/Navbar";
import { useEffect, useState } from "react";
import userService from "../../services/userService";
import { RiAccountCircleFill } from "react-icons/ri";
import Footer from "../../components/user/Footer";
import { IoMdCart } from "react-icons/io";
import { toast } from "react-toastify";

const ServiceBookingPage = () => {
  const { id } = useParams();
  const [service, setService] = useState({});
  const [cart, setCart] = useState({});
  const [isChange, setIsChange] = useState(false);
  useEffect(() => {
    const getServiceData = async () => {
      const data = await userService.getServiceDetails(id);

      setService(data.service);
    };
    getServiceData();
  }, [id]);

  useEffect(() => {
    const getCartData = async () => {
      const result = await userService.getCartDetails();
      setCart(result.cart);
    };
    getCartData();
  }, [isChange]);

  const handleAddtoCart = async (id) => {
    try {
      const result = await userService.addToCart(id);
      if (result.status == 200) {
        toast.success(result.data.message);
        setIsChange(!isChange);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleQuantityUpdate = async(itemId,quantity)=>{
    try {
      const result = await userService.updateItemQuantity(itemId,quantity);
      if (result.status == 200) {
        toast.success(result.data.message);
        setIsChange(!isChange);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Navbar />
      <div className="flex justify-between m-8 max-h-screen">
        <div className="w-1/3 mt-20">
          <h1 className="text-left text-3xl font-semibold">{service.name}</h1>
          <div className="flex items-center my-5">
            <svg
              aria-hidden="true"
              className="h-6 w-6 text-white bg-primary-blue rounded-xl"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <span className="ml-3 py-0.5 text-lg font-semibold italic">
              5.0 ratings
            </span>
          </div>
          <div className="w-5/6 h-auto border border-gray-300 p-3 mt-8 rounded-md space-y-3">
            <div className="flex">
              <span className="text-base font-semibold">
                {service.category?.name}
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-600 text-pretty mb-8">
                {service.description}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-lg font-semibold">&#x20B9; {service.price}</p>
              <button
                type="button"
                className="ring-1 ring-primary-blue text-primary-blue py-2 px-4 rounded-md hover:bg-primary-blue hover:text-white"
                onClick={() => handleAddtoCart(service._id)}
              >
                Add
              </button>
            </div>
          </div>
        </div>
        <div className="w-2/3 h-[20rem]">
          <img
            src={service.imageUrl}
            alt=""
            className="rounded-lg h-[22rem] w-full"
          />
        </div>
      </div>
      <div className="p-8 flex space-x-12 mb-36">
        <div className="flex flex-col w-[28%] space-y-5">
        <div className="border border-gray-300 rounded-lg p-5 shadow-md bg-white flex-1 overflow-y-auto min-h-16">
  {cart.items?.length>0 ? (
    <>
      <h2 className="text-xl font-semibold mb-4">Cart</h2>
      {cart.items?.length > 0 ? (
        cart.items.map(item => (
          <div key={item._id} className="flex justify-between items-center py-2">
            <p className="text-base font-normal w-12">{item.item.name}</p>
            <div className="flex items-center">
              <button className="bg-primary-blue text-white p-1 rounded-s-md w-8 h-8 flex items-center justify-center hover:bg-secondary-blue"
                onClick={() => handleQuantityUpdate(item.item._id, -1)}>
                -
              </button>
              <p className="w-6 text-center bg-secondary-blue p-1 text-white">{item.quantity}</p>
              <button className="bg-primary-blue text-white p-1 rounded-e-md w-8 h-8 flex items-center justify-center hover:bg-secondary-blue"
                onClick={() => handleQuantityUpdate(item.item._id, 1)}>
                +
              </button>
            </div>
            <p className="text-base font-normal">₹ {item.quantity * item.item.price}</p>
          </div>
        ))
      ) : (
        <div className="flex flex-col justify-center items-center py-8">
          <img src="path_to_empty_cart_image.svg" alt="Empty Cart" className="w-32 h-32 mb-4"/>
          <p className="text-gray-500 text-lg font-medium">Your cart is empty</p>
          <p className="text-gray-400">Add items to your cart to see them here.</p>
        </div>
      )}
      <Link to="/checkout" className="bg-primary-blue p-3 w-full mt-12 rounded-md text-white flex justify-between items-center">
        <p className="text-sm font-semibold">₹ {cart.totalAmount}</p>
        <p className="font-semibold">View Cart</p>
      </Link>
    </>
  ) : (
    <div className="flex flex-col justify-center items-center py-3 min-h-48">
      <IoMdCart className="text-primary-blue text-5xl"/>
      <p className="text-gray-500 text-lg font-medium">Your cart is empty</p>
      <p className="text-gray-400">Add items to your cart to see them here.</p>
    </div>
  )}
</div>

        </div>
        <div className="w-[70%] p-4">
          <h3 className="text-2xl font-semibold mb-4">Reviews</h3>
          <div className="w-full border border-gray-300 mt-5 p-3 rounded-lg shadow-md">
            <div className="flex space-x-3 items-center mb-2">
              <RiAccountCircleFill className="text-3xl" />
              <div className="flex flex-col">
                <p className="text-lg font-semibold">Name</p>
                <span className="text-sm text-gray-500">2 hours ago</span>
              </div>
            </div>
            <div className="mx-5 my-3 flex items-center space-x-1">
              <svg
                aria-hidden="true"
                className="h-5 w-5 text-yellow-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <p className="text-sm text-gray-700">5.0</p>
            </div>
            <div className="mx-5 my-3">
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime
                qui suscipit autem incidunt, sint amet aliquid enim dolores
                voluptas fugit?
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default ServiceBookingPage;
