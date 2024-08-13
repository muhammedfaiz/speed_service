import { useEffect, useState } from "react";
import userService from "../../services/userService";
import { Link } from "react-router-dom";

const ServicesHome = () => {
  const [services, setServices] = useState([]);
  useEffect(() => {
    const getServices = async () => {
      const data = await userService.fetchServices();
      setServices(data.services);
    };
    getServices();
  }, []);
  return (
    <div className="p-5 mt-12 bg-gray-50">
      <div className="w-full space-y-2 px-5">
        <h3 className="text-left font-sans font-bold text-3xl text-gray-800">
          Services
        </h3>
        <p className="text-left font-medium text-sm text-gray-500">
          Choose the service you prefer.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        {services &&
          services?.map((service) => {
            return (
              <div
                key={service._id}
                className="relative mx-1 max-md:m-0 w-full h-96 max-w-xs overflow-hidden rounded-lg bg-white"
              >
                <Link to={`/service/${service._id}`}>
                  <img
                    className="h-48 w-full rounded-t-lg object-cover"
                    src={service.imageUrl}
                    alt="service image"
                  />
                </Link>
                <div className="p-4">
                  <Link to={`/service/${service._id}`}>
                    <h5 className="text-lg font-semibold tracking-tight text-slate-900">
                      {service.name}
                    </h5>
                  </Link>
                  <p className="mt-1 text-sm font-normal text-gray-700">
                    {service.category.name}
                  </p>
                  <div className="mt-2.5 flex items-center">
                    <svg
                      aria-hidden="true"
                      className="h-5 w-5 text-gray-700"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <span className="ml-1 py-0.5 text-sm font-normal">5.0</span>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <p className="text-base font-normal text-slate-900">
                      &#x20B9; {service.price}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default ServicesHome;
