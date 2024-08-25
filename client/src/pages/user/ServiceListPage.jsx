import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Footer from "../../components/user/Footer";
import Navbar from "../../components/user/Navbar";
import userService from "../../services/userService";

const ServiceListPage = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const location = useLocation();

  useEffect(() => {
    const fetchServices = async () => {
      const data = await userService.fetchServices();
      setServices(data.services);
      setFilteredServices(data.services);

      const queryParams = new URLSearchParams(location.search);
      const category = queryParams.get("category");
      if (category) {
        setCategoryFilter(category);
        filterServices(search, category);
      }
    };
    fetchServices();
  }, [location.search]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    filterServices(e.target.value, categoryFilter);
  };

  const handleCategoryFilter = (e) => {
    setCategoryFilter(e.target.value);
    filterServices(search, e.target.value);
  };

  const filterServices = (searchTerm, category) => {
    if (searchTerm === "" && category === "") {
      setFilteredServices(services);
      return;
    }
    console.log(services)
    const filtered = services.filter(
      (service) =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (category === "" || service.category.name === category)
    );
    setFilteredServices(filtered);
  };

  return (
    <>
      <Navbar />
      <div className="p-10 bg-gray-50 min-h-screen">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Our Services
        </h1>
        <div className="flex justify-center items-center mb-8 space-x-4">
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search services..."
            className="px-4 py-2 w-full max-w-xs rounded-md border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          />
          <select
            value={categoryFilter}
            onChange={handleCategoryFilter}
            className="px-4 py-2 rounded-md border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">All Categories</option>
            {Array.from(
              new Set(services.map((service) => service.category.name))
            ).map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredServices.map((service) => (
            <Link
              key={service._id}
              to={`/service/${service._id}`}
              className="relative bg-white p-6 rounded-lg transform hover:scale-105 transition-transform"
            >
              <img
                className="h-48 w-full rounded-t-lg object-cover"
                src={service.imageUrl}
                alt={service.name}
              />
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {service.name}
                </h3>
                <p className="text-gray-600">{service.category.name}</p>
                <p className="mt-2 text-base text-gray-900">
                  $ {service.price}
                </p>
                <div className="flex items-center mt-2">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927a1 1 0 011.902 0l1.07 3.292a1 1 0 00.95.69h3.462a1 1 0 01.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292a1 1 0 01-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034a1 1 0 01-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72a1 1 0 01.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="ml-1 text-sm text-gray-700">{service.rating ? `${(service.rating)}.0` : `5.0`}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ServiceListPage;
