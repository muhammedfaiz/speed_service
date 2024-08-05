import { acceptService, rejectService } from "../../services/employeeService";
import {toast} from 'react-toastify';

/* eslint-disable react/prop-types */
const ServiceCard = ({ service,setIsChanged,isChanged,serviceList }) => {
  const handleAccept = async (id) => {
    try {
      const result = await acceptService(id);
      if(result.status==200){
        setIsChanged(!isChanged)
        toast.success(result.data.message)
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleReject = async(id) => {
    try {
        console.log("entered")
        const result = await rejectService(id);
        if(result.status==200){
            setIsChanged(!isChanged)
            toast.success(result.data.message)
        }
    } catch (error) {
        toast.error(error.message);
    }
  };
  return (
    <div className="flex max-w-full overflow-hidden bg-white rounded-lg shadow-lg my-8 justify-evenly items-center">
      <img
        className="w-1/6 rounded-md bg-cover m-3"
        src={service.imageUrl}
      />

      <div className="w-2/3 p-4 md:p-4 ">
        <h1 className="text-xl font-bold text-gray-800 ">{service.name}</h1>

        <p className="mt-2 text-sm text-gray-600 ">{service.description}</p>
        <div className="flex justify-between mt-3 item-center">
          <h1 className="text-lg font-bold text-gray-700 md:text-xl">
            &#8377; {service.price}
          </h1>
         {serviceList ? (<button
            className="px-2 py-1 text-base font-semibold text-white uppercase transition-colors duration-300 transform bg-blue-800 rounded  hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
            onClick={() => handleAccept(service._id)}
          >
            Accept
          </button>):(
            <button
            className="px-2 py-1 text-base font-semibold text-white uppercase transition-colors duration-300 transform bg-red-700 rounded  hover:bg-red-600 focus:outline-none focus:bg-red-700"
            onClick={() => handleReject(service._id)}
          >
            Decline
          </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
