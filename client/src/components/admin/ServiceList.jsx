import { useState, useEffect } from "react";
import { deleteService, getAllServices } from "../../services/adminService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ServiceList = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [search, setSearch] = useState("");
  const [change, setChange] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3); // Set how many items you want to display per page
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getAllServices();
        setServices(response.services);
        setFilteredServices(response.services);
      } catch (error) {
        console.error(error);
      }
    };
    fetchServices();
  }, [change]);

  const handleSearchChange = () => {
    const filteredServices = services.filter(
      (service) =>
        service.name.toLowerCase().includes(search.toLowerCase()) ||
        service.category.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredServices(filteredServices);
    setCurrentPage(1); // Reset to page 1 after search
  };

  const handleDelete = async (id) => {
    try {
      const result = await deleteService(id);
      if (result.status === 200) {
        toast.success("Service deleted!");
        setChange(!change);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Calculate the current services to display
  const indexOfLastService = currentPage * itemsPerPage;
  const indexOfFirstService = indexOfLastService - itemsPerPage;
  const currentServices = filteredServices.slice(
    indexOfFirstService,
    indexOfLastService
  );

  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container max-w-3xl px-4 mx-auto sm:px-8">
      <div className="py-8">
        <div className="flex flex-row justify-start w-full mb-1 sm:mb-0">
          <div className="text-end">
            <div className="flex flex-col justify-center w-3/4 max-w-sm space-y-3 md:flex-row md:w-full md:space-x-3 md:space-y-0">
              <div className="relative">
                <input
                  type="text"
                  id="form-subscribe-Filter"
                  className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Search"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <button
                className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-200"
                onClick={() => handleSearchChange()}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
          <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
            {currentServices.length === 0 ? (
              <div className="px-6 py-4 text-center text-gray-600">
                No services found
              </div>
            ) : (
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      Service Name
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    ></th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    ></th>
                  </tr>
                </thead>
                <tbody>
                  {currentServices.map((service) => (
                    <tr key={service._id}>
                      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <img
                              alt="profile"
                              src={service.imageUrl}
                              className="mx-auto object-cover rounded-full h-10 w-10"
                            />
                          </div>
                          <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {service.name}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {service.category.name}
                        </p>
                      </td>
                      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {service.price}
                        </p>
                      </td>
                      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {service.description}
                        </p>
                      </td>
                      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                        <a
                          onClick={() => {
                            navigate(`/admin/edit-service/${service._id}`);
                          }}
                          className="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                        >
                          Edit
                        </a>
                      </td>
                      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                        <a
                          onClick={() => {
                            handleDelete(service._id);
                          }}
                          className="text-red-600 hover:text-red-900 cursor-pointer"
                        >
                          Delete
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <div className="flex justify-center items-center px-5 py-5 bg-white">
            {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {i + 1}
            </button>
          ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceList;
