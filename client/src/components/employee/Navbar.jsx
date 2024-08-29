import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo-transparent.png';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/employeeSlice';

const Navbar = () => {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { employee } = useSelector((store) => store.employee);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/employee/login");
  };

  return (
    <div>
      <nav className="bg-gradient-to-r from-blue-600 to-indigo-950 shadow z-10">
        <div className="px-8 mx-auto max-w-7xl">
          <div className="flex items-center justify-between h-16">
            <div className=" flex items-center">
              <a className="flex-shrink-0" href="/">
                <img className="w-32 " src={logo} alt="Speed Service" />
              </a>
              <div className="hidden md:block">
                <div className="flex items-baseline ml-10 space-x-4">
                  <Link
                    className="text-gray-300  hover:text-white  px-3 py-2 rounded-md text-sm font-medium"
                    to="/employee/dashboard"
                  >
                    Dashboard
                  </Link>
                  <Link
                    className="text-gray-300  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    to="/employee/services"
                  >
                    Services
                  </Link>
                  <Link
                    className="text-gray-300  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    to="/employee/tasks"
                  >
                    Tasks
                  </Link>
                  <Link
                    className="text-gray-300  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    to="/employee/requests"
                  >
                    Request
                  </Link>
                  <Link
                    className="text-gray-300  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    to="/employee/history"
                  >
                    History
                  </Link>
                </div>
              </div>
            </div>
            <div className="block">
              <div className="flex items-center ml-4 md:ml-6">
                <div className="relative ml-3">
                  <div className="relative inline-block text-left">
                    <div>
                      <button
                        type="button"
                        className="flex items-center justify-center w-full rounded-lg  px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-50 hover:bg-gray-50 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500"
                        id="options-menu"
                        onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                      >
                        <svg
                          width="20"
                          fill="currentColor"
                          height="20"
                          className="text-white"
                          viewBox="0 0 1792 1792"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M1523 1339q-22-155-87.5-257.5t-184.5-118.5q-67 74-159.5 115.5t-195.5 41.5-195.5-41.5-159.5-115.5q-119 16-184.5 118.5t-87.5 257.5q106 150 271 237.5t356 87.5 356-87.5 271-237.5zm-243-699q0-159-112.5-271.5t-271.5-112.5-271.5 112.5-112.5 271.5 112.5 271.5 271.5 112.5 271.5-112.5 112.5-271.5zm512 256q0 182-71 347.5t-190.5 286-285.5 191.5-349 71q-182 0-348-71t-286-191-191-286-71-348 71-348 191-286 286-191 348-71 348 71 286 191 191 286 71 348z"></path>
                        </svg>
                      </button>
                    </div>
                    {profileMenuOpen && (
                      <div className="absolute right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50">
                        {employee ? (
                          <div
                            className="py-1 "
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="options-menu"
                          >
                            <Link
                              to="/employee/profile"
                              className="block px-4 py-2 text-md text-gray-100 hover:text-white hover:bg-gray-600"
                              role="menuitem"
                            >
                              <span className="flex flex-col">
                                <span>Profile</span>
                              </span>
                            </Link>
                            <button
                              onClick={handleLogout}
                              className="block w-full text-left px-4 py-2 text-md text-gray-100 hover:text-white hover:bg-gray-600"
                              role="menuitem"
                            >
                              <span className="flex flex-col">
                                <span>Logout</span>
                              </span>
                            </button>
                          </div>
                        ) : (
                          <div
                            className="py-1 "
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="options-menu"
                          >
                            <Link
                              to="/employee/login"
                              className="block px-4 py-2 text-md text-gray-100 hover:text-white hover:bg-gray-600"
                              role="menuitem"
                            >
                              <span className="flex flex-col">
                                <span>Login</span>
                              </span>
                            </Link>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex -mr-2 md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white hover:text-gray-300 inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
              >
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="w-8 h-8"
                  viewBox="0 0 1792 1792"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
                    className="text-gray-300  hover:text-white  px-3 py-2 rounded-md text-sm font-medium"
                    to="/employee/dashboard"
                  >
                    Dashboard
                  </Link>
                  <Link
                    className="text-gray-300  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    to="/employee/services"
                  >
                    Services
                  </Link>
                  <Link
                    className="text-gray-300  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    to="/employee/tasks"
                  >
                    Tasks
                  </Link>
                  <Link
                    className="text-gray-300  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    to="/employee/requests"
                  >
                    Request
                  </Link>
                  <Link
                    className="text-gray-300  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    to="/employee/history"
                  >
                    History
                  </Link>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
