import { useEffect, useState } from "react";
import logo from "../../assets/logo-transparent.png";
import Navbar from "../../components/admin/Navbar";
import ProfileDropdown from "../../components/admin/ProfileDropdown";
import {
  changeEmployeeStatus,
  fetchEmployee,
} from "../../services/adminService";
import { toast } from "react-toastify";

const EmployeeList = () => {
  const [search, setSearch] = useState("");
  const [filteredEmployee, setFilteredEmployee] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [isChanged, setIsChanged] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(5); // Change the number to set employees per page

  useEffect(() => {
    async function getEmployee() {
      try {
        const data = await fetchEmployee();
        setEmployee(data.data);
        setFilteredEmployee(data.data);
      } catch (error) {
        console.error(error);
      }
    }
    getEmployee();
  }, [isChanged]);

  function handleSearch() {
    if (search === "") {
      setFilteredEmployee(employee);
      return;
    }
    const result = employee.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredEmployee(result);
    setCurrentPage(1); // Reset to the first page after searching
  }

  async function handleStatus(id, status) {
    try {
      const res = await changeEmployeeStatus(id, status);
      setIsChanged(!isChanged);
      toast.success(res.message);
    } catch (error) {
      toast.error(error.message);
    }
  }

  // Pagination Logic
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployee.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );
  const totalPages = Math.ceil(filteredEmployee.length / employeesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
          <h1 className="text-3xl font-bold">Employee</h1>
          <p className="text-gray-600">Manage employee.</p>
        </div>
        <div className="container max-w-3xl mx-auto lg:px-0">
          <div className="py-8">
            <div className="flex space-x-2 justify-end">
              <div className="flex">
                <input
                  type="text"
                  id="form-subscribe-Filter"
                  className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="name"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <button
                className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-200"
                onClick={() => handleSearch()}
              >
                Search
              </button>
            </div>
            <div className="px-2 py-4 -mx-4 sm:-mx-8 sm:px-8">
              <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
                {currentEmployees.length === 0 ? (
                  <div className="text-center py-4 text-gray-600">
                    <p>No employees found.</p>
                  </div>
                ) : (
                  <>
                    <table className="min-w-full">
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
                            Joined At
                          </th>
                          <th
                            scope="col"
                            className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                          >
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentEmployees.map((item) => {
                          return (
                            <tr key={item.id}>
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
                                  {item.designation}
                                </p>
                              </td>
                              <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {item.experience}
                                </p>
                              </td>
                              <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                {item.joined}
                              </td>
                              <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                {item.status === "active" ? (
                                  <span
                                    onClick={() =>
                                      handleStatus(item.id, "blocked")
                                    }
                                    className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900 hover:cursor-pointer"
                                  >
                                    <span
                                      aria-hidden="true"
                                      className="absolute inset-0 bg-green-400 rounded-full opacity-50"
                                    ></span>
                                    <span className="relative">active</span>
                                  </span>
                                ) : (
                                  <span
                                    onClick={() =>
                                      handleStatus(item.id, "active")
                                    }
                                    className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900 hover:cursor-pointer"
                                  >
                                    <span
                                      aria-hidden="true"
                                      className="absolute inset-0 bg-red-400 rounded-full opacity-50"
                                    ></span>
                                    <span className="relative">blocked</span>
                                  </span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>

                    {/* Pagination */}
                    <nav className="flex justify-center my-4">
                      <ul className="flex space-x-2">
                        {Array.from({ length: totalPages }, (_, index) => (
                          <li key={index}>
                            <button
                              onClick={() => handlePageChange(index + 1)}
                              className={`px-4 py-2 border border-gray-300 rounded-md ${
                                currentPage === index + 1
                                  ? "bg-blue-600 text-white"
                                  : "bg-white text-gray-700"
                              }`}
                            >
                              {index + 1}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmployeeList;
