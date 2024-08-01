import Navbar from "../../components/employee/Navbar";
import { FaBoxOpen } from "react-icons/fa";
import ServiceCard from "../../components/employee/ServiceCard";
import { useEffect, useState } from "react";
import { fetchServices } from "../../services/employeeService";

const EmployeeServices = () => {
  const [services, setServices] = useState([]);
  const [acceptedServices,setAcceptedServices]=useState([]);
  const [serviceList, setServiceList] = useState(true);
  const [isChanged, setIsChanged] = useState(false);
  useEffect(() => {
    async function getServices() {
      try {
        const data = await fetchServices();
        setServices(data.services);
        setAcceptedServices(data.acceptedServices);
      } catch (error) {
        console.log(error);
      }
    }
    getServices();
  }, [isChanged]);
  return (
    <>
      <Navbar />
      <div className="flex bg-slate-100 min-h-screen">
        <aside className="w-1/6 bg-gray-200 flex flex-col h-min-screen p-6">
          <div className="bg-gray-300 py-2 px-4 rounded-md flex items-center justify-center mb-4">
            <FaBoxOpen className="mr-2 text-xl" />
            <h2 className="text-lg font-semibold">Services</h2>
          </div>
          <ul className="mt-5 space-y-3 cursor-pointer text-center">
            <li
              className="text-base font-semibold hover:text-gray-500"
              onClick={() => {
                setServiceList(true);
              }}
            >
              Service List
            </li>
            <li
              className="text-base font-semibold hover:text-gray-500"
              onClick={() => {
                setServiceList(false);
              }}
            >
              Accepted Services
            </li>
          </ul>
        </aside>
        <main className="flex-1 p-6">
          {serviceList ? (
            <div>
              <h1 className="text-2xl font-bold mb-1">Service List</h1>
              <p className="text-sm mb-4 text-gray-500 ">
                Services you can provide.
              </p>
              {services.length > 0 &&
                services?.map((service, index) => (
                  <ServiceCard
                    key={index}
                    service={service}
                    setIsChanged={setIsChanged}
                    isChanged={isChanged}
                    serviceList={serviceList}
                  />
                ))}
            </div>
          ) : (
            <div>
              <h1 className="text-2xl font-bold mb-1">Accepted Services</h1>
              <p className="text-sm mb-4 text-gray-500 ">
                Services you are providing.
              </p>
              {acceptedServices.length > 0 &&
                acceptedServices?.map((service, index) => (
                  <ServiceCard
                    key={index}
                    service={service}
                    setIsChanged={setIsChanged}
                    isChanged={isChanged}
                    serviceList={serviceList}
                  />
                ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default EmployeeServices;
