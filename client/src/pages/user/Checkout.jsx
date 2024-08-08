import Footer from "../../components/user/Footer";
import Navbar from "../../components/user/Navbar";
import { MdClose } from "react-icons/md";
import { useEffect, useState } from "react";
import Modal from "../../components/common/Modal";
import userService from "../../services/userService";
import { toast } from "react-toastify";
import { IoMdCart } from "react-icons/io";
import { PayPalButton } from "react-paypal-button-v2";

const Checkout = () => {
  const [isAddressOpen, setIsAddressOpen] = useState(false);
  const [address, setAddress] = useState({});
  const [cart, setCart] = useState(null);
  const [getAddresses, setAddresses] = useState([]);
  const [isAddressChange, setIsAddressChange] = useState(false);
  const [isQuantityChange, setIsQuantityChange] = useState(false);
  const [isSlotOpen, setIsSlotOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [selectedAddress, setSelectedAddress] = useState(null);

  const slotTime = [
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "01:00 PM",
    "01:30 PM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
    "05:00 PM",
    "05:30 PM",
    "06:00 PM",
    "06:30 PM",
    "07:00 PM",
  ];

  const today = new Date();
  const slotDate = {
    tomorrow: new Date(today.getTime() + 24 * 60 * 60 * 1000),
    nextDay: new Date(today.getTime() + 48 * 60 * 60 * 1000),
  };

  const closeAddressModal = () => setIsAddressOpen(false);
  const closeSlotModal = () => setIsSlotOpen(false);
  useEffect(() => {
    const getAddressesData = async () => {
      const data = await userService.getAddresses();
      setAddresses(data.addresses);
    };
    getAddressesData();
  }, [isAddressChange]);

  useEffect(() => {
    const getCart = async () => {
      const result = await userService.getCartDetails();
      setCart(result.cart);
    };
    getCart();
  }, [isQuantityChange]);

  const addressSubmit = async () => {
    try {
      const result = await userService.addAddressPost(address);
      if (result.status == 200) {
        toast.success(result.data.message);
        setIsAddressChange(!isAddressChange);
        closeAddressModal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleQuantityUpdate = async (itemId, quantity) => {
    try {
      const result = await userService.updateItemQuantity(itemId, quantity);
      if (result.status == 200) {
        toast.success(result.data.message);
        setIsQuantityChange(!isQuantityChange);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadPaypalScript = async () => {
    const response = await userService.getClientId();
    const data = JSON.parse(JSON.stringify(response));
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${data.clientId}&currency=USD`;
    script.async = true;
    document.body.appendChild(script);
  };

  useEffect(() => {
    loadPaypalScript();
  }, []);

  const handlePlaceOrder = async () => {
    if (!selectedAddress || !selectedDate || !selectedTime || !paymentMethod) {
      toast.error("Please fill all the required fields");
      return;
    }
    try {
      if (paymentMethod == "cod") {
        const result = await userService.placeOrder({
          cart,
          selectedAddress,
          selectedDate,
          selectedTime,
          paymentMethod,
        });
        if (result.status == 200) {
          toast.success(result.data.message);
          setCart(null);
        }
      } else {
        toast.error("Please select a payment method");
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const successHandler = async (paymentResult) => {
    console.log("Payment success!", paymentResult);
    if (paymentResult) {
      const response = await userService.placeOrder({
        cart,
        selectedAddress,
        selectedDate,
        selectedTime,
        paymentMethod,
      });
      toast.success(response.data.message);
      setCart(null);
    }
  };
  return (
    <>
      <Navbar />
      {cart?.items.length > 0 ? (
        <div className="p-8 min-h-screen flex flex-col">
          <h1 className="text-black text-2xl font-semibold mb-6">Checkout</h1>
          <div className="flex flex-wrap -mx-4">
            <div className="w-full lg:w-1/2 px-4 mb-6">
              <div className="w-full border rounded-md p-4 bg-white">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                <div className="border-b mb-4"></div>
                {cart &&
                  cart.items?.map((item) => (
                    <div
                      key={item.item._id}
                      className="flex justify-between items-center mb-4"
                    >
                      <img
                        src={item.imageUrl}
                        alt=""
                        className="w-16 rounded-md"
                      />
                      <p>{item.item.name}</p>
                      <div className="flex items-center">
                        <button
                          className="bg-primary-blue text-white p-1 rounded-l-md w-8 h-8 flex items-center justify-center hover:bg-secondary-blue"
                          onClick={() =>
                            handleQuantityUpdate(item.item._id, -1)
                          }
                        >
                          -
                        </button>
                        <p className="w-6 text-center bg-secondary-blue p-1 text-white">
                          {item.quantity}
                        </p>
                        <button
                          className="bg-primary-blue text-white p-1 rounded-r-md w-8 h-8 flex items-center justify-center hover:bg-secondary-blue"
                          onClick={() => handleQuantityUpdate(item.item._id, 1)}
                        >
                          +
                        </button>
                      </div>
                      <p className="text-base font-normal">
                        ₹ {item.item.price}
                      </p>
                    </div>
                  ))}
                <div className="border-b mb-4"></div>
                <div className="pt-4">
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-semibold">Total</p>
                    <p className="text-lg font-semibold">
                      ₹ {cart.totalAmount}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white w-full border rounded-md p-5 mt-8">
                <h2 className="text-lg font-semibold mb-4">Payment Summary</h2>
                <div className="border-b mb-4"></div>
                <div className="flex justify-between items-center mb-2">
                  <p>Item Total</p>
                  <p>₹ {cart.totalAmount}.00</p>
                </div>
                {/* <div className="flex justify-between items-center mb-2">
                  <p>Tax (5%)</p>
                  <p>-</p>
                </div> */}
                <div className="flex justify-between items-center mb-2">
                  <p>Discount</p>
                  <p>- ₹ {cart?.discount}.00</p>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-semibold">Total</p>
                    <p className="text-lg font-semibold">
                      ₹ {cart.totalAmount}.00
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/2 px-4 mb-6">
              <div className="w-full border rounded-md p-4 bg-white">
                <h2 className="text-lg font-semibold">Address</h2>
                <div className="border-b my-3"></div>
                <div
                  onClick={() => setIsAddressOpen(true)}
                  className="p-3 mb-4 border border-dashed border-primary-blue rounded-lg cursor-pointer hover:bg-blue-50 transition duration-300"
                >
                  <p className="text-sm text-primary-blue font-semibold text-center">
                    + Add New Address
                  </p>
                </div>
                <div className="w-full flex">
                  {getAddresses &&
                    getAddresses?.map((address) => (
                      <div
                        key={address._id}
                        className="p-3 mr-1 w-1/2 flex items-start space-x-3 border border-gray-200 rounded-lg"
                      >
                        <input
                          type="radio"
                          name="address"
                          className="mt-1"
                          value={address._id}
                          onClick={(e) => setSelectedAddress(e.target.value)}
                        />
                        <div className="ml-2">
                          <p className="text-base font-semibold">
                            {address.house}
                          </p>
                          <p className="text-sm text-gray-600">
                            {address.city}, {address.state}
                          </p>
                          <p className="text-sm text-gray-600">
                            {address.country}
                          </p>
                          <p className="text-sm text-gray-600">
                            {address.pincode}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div className="w-full border rounded-md p-4 bg-white mt-6">
                <p className="text-lg font-semibold mb-2">Slot</p>
                <div className="border-b "></div>
                {selectedDate && selectedTime && (
                  <div className="flex p-5 justify-between">
                    <p className="text-sm font-medium">Date: {selectedDate}</p>
                    <p className="text-sm font-medium">Time: {selectedTime}</p>
                  </div>
                )}
                <div className="border-b "></div>
                <div className="flex justify-center items-center mt-4">
                  <button
                    onClick={() => setIsSlotOpen(true)}
                    className="ring-1 ring-primary-blue text-primary-blue rounded-md p-2 hover:bg-primary-blue hover:text-white"
                  >
                    {selectedDate && selectedTime
                      ? "Change your time and date"
                      : "Select your time and date"}
                  </button>
                </div>
              </div>
              <div className="w-full border rounded-md p-4 bg-white mt-6">
                <p className="text-lg font-semibold mb-2">Payment method</p>
                <div className="border-b"></div>
                <div className="flex space-x-3 p-4">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    className="mt-1"
                    onClick={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label htmlFor="cod" className="flex items-center space-x-2">
                    Cash on Delivery
                  </label>
                </div>
                <div className="flex space-x-3 p-4">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="paypal"
                    className="mt-1"
                    onClick={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label
                    htmlFor="stripe"
                    className="flex items-center space-x-2"
                  >
                    Paypal
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-6">
            {paymentMethod === "paypal" ? (
              <PayPalButton
                amount={cart.totalAmount}
                onSuccess={successHandler}
              />
            ) : (
              <button
                className="bg-primary-blue text-white px-6 py-3 rounded-md shadow-md hover:bg-secondary-blue focus:outline-none"
                onClick={() => handlePlaceOrder()}
              >
                Place Order
              </button>
            )}
          </div>
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
      <Footer />
      <Modal isOpen={isAddressOpen} onClose={closeAddressModal}>
        <div className="flex items-start justify-between">
          <h2 className="text-xl font-semibold mb-4">Add New Address</h2>
          <MdClose onClick={closeAddressModal} className="cursor-pointer" />
        </div>
        <form className="space-y-4">
          <div className="flex flex-col">
            <label
              htmlFor="addressName"
              className="text-sm font-semibold text-gray-700"
            >
              House/Building
            </label>
            <input
              type="text"
              id="addressName"
              name="addressName"
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) =>
                setAddress({ ...address, house: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="city"
              className="text-sm font-semibold text-gray-700"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="state"
              className="text-sm font-semibold text-gray-700"
            >
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) =>
                setAddress({ ...address, state: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="country"
              className="text-sm font-semibold text-gray-700"
            >
              Country
            </label>
            <input
              type="text"
              id="country"
              name="country"
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) =>
                setAddress({ ...address, country: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="pincode"
              className="text-sm font-semibold text-gray-700"
            >
              Pincode
            </label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) =>
                setAddress({ ...address, pincode: e.target.value })
              }
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="ring-1 ring-primary-blue text-primary-blue py-2 px-4 rounded-md hover:bg-primary-blue hover:text-white"
              onClick={addressSubmit}
            >
              Add Address
            </button>
          </div>
        </form>
      </Modal>
      <Modal isOpen={isSlotOpen} onClose={closeSlotModal}>
        <div className="flex items-start justify-between p-3">
          <h2 className="text-lg font-semibold mb-2">
            When should the professional Arrive?
          </h2>
          <MdClose onClick={closeSlotModal} className="cursor-pointer" />
        </div>
        <div className="flex px-4 space-x-4">
          {Object.entries(slotDate).map(([key, date]) => (
            <button
              key={key}
              className={`px-8 py-3 rounded-md focus:ring-2 ${
                selectedDate == date.toDateString()
                  ? "ring-2 ring-primary-blue"
                  : "border border-gray-300"
              }`}
              onClick={() => {
                setSelectedDate(date.toDateString());
                console.log(selectedDate);
              }}
            >
              <div className="flex flex-col justify-center">
                <p className="text-sm text-gray-700 text-center">
                  {date.toLocaleDateString(undefined, { weekday: "short" })}
                </p>
                <p className="text-base font-semibold text-center mt-1 text-black">
                  {date.getDate()}
                </p>
              </div>
            </button>
          ))}
        </div>
        <div className="p-3 mt-4 flex justify-start items-center">
          <h2 className="text-lg font-semibold mb-2">
            Select start time of service
          </h2>
        </div>
        <div className="flex px-4 space-x-1 space-y-3 flex-wrap justify-around">
          {slotTime.map((time, index) => (
            <button
              key={index}
              className={`border p-3 rounded-md focus:ring-2 ${
                selectedTime === time
                  ? "ring-2 ring-primary-blue"
                  : "border-gray-200"
              } flex-shrink-0`}
              onClick={() => setSelectedTime(time)}
            >
              <div className="flex items-center">
                <p className="text-sm text-gray-700">{time}</p>
              </div>
            </button>
          ))}
        </div>
        <div className="flex justify-end p-2">
          <button
            className="py-3 px-4 bg-primary-blue mt-2 text-white rounded-md hover:bg-secondary-blue"
            onClick={() => closeSlotModal()}
          >
            Add
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Checkout;
