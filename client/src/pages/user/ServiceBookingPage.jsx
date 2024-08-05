import { useParams } from "react-router-dom";
import Navbar from "../../components/user/Navbar";
import { useEffect, useState } from "react";
import userService from "../../services/userService";

const ServiceBookingPage = () => {
  const { id } = useParams();
  const [service, setService] = useState({});
  useEffect(()=>{
    const getServiceData = async()=>{
        const data = await userService.getServiceDetails(id);
        setService(data.service);
    }
    getServiceData();
  },[id])
  return (
    <>
      <Navbar />
      <div className="flex justify-between p-8">
        <div className="w-1/3 mt-10">
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
          <span className="ml-3 py-0.5 text-lg font-semibold italic">5.0 ratings</span>
         </div>
         <div className="w-5/6 h-auto border border-gray-300 p-3 mt-4 rounded-md space-y-3">
         <div className="flex">
            <span className="text-base font-semibold">{service.category?.name}</span>
         </div>
         <div>
            <p className="text-sm text-gray-600 text-pretty">
            {service.description}
            </p>
         </div>
         <div className="flex justify-between items-center">
            <p className="text-lg font-semibold">&#x20B9; {service.price}</p>
            <button className="py-2 px-4 ring-1 ring-primary-blue rounded text-primary-blue hover:text-white hover:bg-primary-blue ease-in-out">Book</button>
         </div>
         </div>
        </div>
        <div className="w-2/3">
          <img src={service.imageUrl} alt="" className="rounded-lg h-3/4 w-full" />
        </div>
      </div>
    </>
  );
};
export default ServiceBookingPage;
