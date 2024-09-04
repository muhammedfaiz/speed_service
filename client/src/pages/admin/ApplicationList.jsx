import { useEffect, useState } from "react";
import Navbar from "../../components/admin/Navbar";
import ProfileDropdown from "../../components/admin/ProfileDropdown";
import logo from "../../assets/logo-transparent.png";
import {
  acceptApplication,
  getApplications,
  rejectApplication,
} from "../../services/adminService";
import { toast } from "react-toastify";

const ApplicationList = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [search, setSearch] = useState("");
  const [fetchTrigger, setFetchTrigger] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Set how many items you want per page

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await getApplications();
        setApplications(response.applications);
        setFilteredApplications(response.applications);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };
    fetchApplications();
  }, [fetchTrigger]);

  async function handleAccept(id) {
    try {
      const response = await acceptApplication(id);
      if (response.status === 200) {
        toast.success(response.data.message);
        setFetchTrigger((prevState) => prevState + 1);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  async function handleReject(id) {
    try {
      const response = await rejectApplication(id);
      if (response.status === 200) {
        toast.success(response.data.message);
        setFetchTrigger((prevState) => prevState + 1);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  function handleSearch() {
    if (search === "") {
      setFilteredApplications(applications);
    } else {
      const data = applications.filter(
        (application) =>
          application.name.toLowerCase().includes(search.toLowerCase()) ||
          application.email.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredApplications(data);
    }
    setCurrentPage(1); // Reset to first page after search
  }

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredApplications.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-100">
      <aside className="w-full lg:w-64 bg-gradient-to-b from-blue-600 to-indigo-950 text-white flex flex-col lg:h-screen">
        <div className="pl-10 pt-10 flex justify-center lg:justify-start">
          <img src={logo} alt="speed service" className="w-36" />
        </div>
        <Navbar />
      </aside>
      <main className="flex-grow p-10 relative overflow-auto">
        <div className="absolute top-4 right-4">
          <ProfileDropdown />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Applications</h1>
          <p className="text-gray-600">Manage employee applications.</p>
        </div>
        <div className="container max-w-5xl px-4 mx-auto sm:px-8">
          <div className="py-8">
            <div className="flex space-x-2 justify-end">
              <div className="flex">
                <input
                  type="text"
                  id="form-subscribe-Filter"
                  className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Search by name or email"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <button
                className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-200"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>

            {currentItems.length === 0 ? (
              <div className="mt-6 text-center">
                <p className="text-gray-600">No applications found.</p>
              </div>
            ) : (
              <div className="px-4 py-4 -mx-4 sm:-mx-8 sm:px-8">
                <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
                  <table className="min-w-full leading-normal">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                        >
                          Email
                        </th>
                        <th
                          scope="col"
                          className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                        >
                          Phone
                        </th>
                        <th
                          scope="col"
                          className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                        >
                          Designation
                        </th>
                        <th
                          scope="col"
                          className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                        >
                          Experience
                        </th>
                        <th
                          scope="col"
                          className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                        >
                          Proof
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
                      {currentItems.map((item) => (
                        <tr key={item._id}>
                          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <div className="flex items-center">
                              <div className="ml-3">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {item.name}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {item.email}
                            </p>
                          </td>
                          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {item.phone}
                            </p>
                          </td>
                          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {item.designation.name}
                            </p>
                          </td>
                          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {item.experience}
                            </p>
                          </td>
                          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <a
                              href={item.proofUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img
                                src={item.proofUrl}
                                alt="proof"
                                className="w-10 h-10"
                              />
                            </a>
                          </td>
                          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <a
                              className="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                              onClick={() => {
                                handleAccept(item._id);
                              }}
                            >
                              Accept
                            </a>
                          </td>
                          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <a
                              className="text-red-600 hover:text-red-900 cursor-pointer"
                              onClick={() => {
                                handleReject(item._id);
                              }}
                            >
                              Reject
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {/* Pagination Controls */}
                  <div className=" flex justify-center space-x-2 bg-white py-3">
                    {[...Array(totalPages)].map((_, index) => (
                      <button
                        key={index + 1}
                        className={`px-3 py-1 text-sm ${
                          currentPage === index + 1
                            ? "bg-blue-600 text-white"
                            : "bg-gray-300 text-gray-700"
                        } rounded hover:bg-gray-400`}
                        onClick={() => handlePageClick(index + 1)}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ApplicationList;
