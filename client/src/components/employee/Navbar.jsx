import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo-transparent.png';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/employeeSlice';
import { FaBell } from 'react-icons/fa';
import { useNotificationContext } from '../../context/NotificationContext';

const Navbar = () => {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [toggleNotifications, setToggleNotifications] = useState(false); // State for notifications
  const { employee } = useSelector((store) => store.employee);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {employeeNotifications} = useNotificationContext();
  
  const handleLogout = () => {
    dispatch(logout());
    navigate("/employee/login");
  };

  return (
    <div>
      <nav className="bg-gradient-to-r from-blue-600 to-indigo-950 shadow z-10">
        <div className="px-8 mx-auto max-w-7xl">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <a className="flex-shrink-0" href="/">
                <img className="w-32" src={logo} alt="Speed Service" />
              </a>
              <div className="hidden md:block">
                <div className="flex items-baseline ml-10 space-x-4">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? 'text-white px-3 py-2 rounded-md text-sm font-medium'
                        : 'text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
                    }
                    to="/employee/dashboard"
                  >
                    Dashboard
                  </NavLink>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? 'text-white px-3 py-2 rounded-md text-sm font-medium'
                        : 'text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
                    }
                    to="/employee/services"
                  >
                    Services
                  </NavLink>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? 'text-white px-3 py-2 rounded-md text-sm font-medium'
                        : 'text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
                    }
                    to="/employee/tasks"
                  >
                    Tasks
                  </NavLink>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? 'text-white px-3 py-2 rounded-md text-sm font-medium'
                        : 'text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
                    }
                    to="/employee/requests"
                  >
                    Request
                  </NavLink>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? 'text-white px-3 py-2 rounded-md text-sm font-medium'
                        : 'text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
                    }
                    to="/employee/history"
                  >
                    History
                  </NavLink>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* Notification Icon */}
              <div className="relative ml-4">
                <button
                  onClick={() => setToggleNotifications(!toggleNotifications)}
                  className="relative p-2 text-white hover:text-gray-300"
                >
                  <FaBell className="text-xl" />
                  {employeeNotifications.length > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                      {employeeNotifications.length}
                    </span>
                  )}
                </button>

                {toggleNotifications && (
                  <div className="absolute right-0 mt-2 md:w-72 w-52 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    <div className="p-4">
                      <h3 className="text-lg font-semibold">Notifications</h3>
                      <ul className="mt-4 space-y-2">
                        {employeeNotifications.length > 0 ? (
                          employeeNotifications.map((notification, index) => (
                            <li
                              key={index}
                              className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                            >
                              {notification}
                            </li>
                          ))
                        ) : (
                          <li className="text-gray-500">No new notifications</li>
                        )}
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* Profile Icon */}
              <div className="relative">
                <button
                  type="button"
                  className="flex items-center justify-center w-full rounded-lg px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-50 hover:bg-gray-50 dark:hover:bg-gray-500 focus:outline-none"
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

                {profileMenuOpen && (
                  <div className="absolute right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50">
                    {employee ? (
                      <div className="py-1" role="menu">
                        <NavLink
                          to="/employee/profile"
                          className="block px-4 py-2 text-md text-gray-100 hover:text-white hover:bg-gray-600"
                          role="menuitem"
                        >
                          <span className="flex flex-col">
                            <span>Profile</span>
                          </span>
                        </NavLink>
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
                      <div className="py-1" role="menu">
                        <NavLink
                          to="/employee/login"
                          className="block px-4 py-2 text-md text-gray-100 hover:text-white hover:bg-gray-600"
                          role="menuitem"
                        >
                          <span className="flex flex-col">
                            <span>Login</span>
                          </span>
                        </NavLink>
                      </div>
                    )}
                  </div>
                )}
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

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? 'text-white block px-3 py-2 rounded-md text-base font-medium'
                    : 'text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium'
                }
                to="/employee/dashboard"
              >
                Dashboard
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? 'text-white block px-3 py-2 rounded-md text-base font-medium'
                    : 'text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium'
                }
                to="/employee/services"
              >
                Services
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? 'text-white block px-3 py-2 rounded-md text-base font-medium'
                    : 'text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium'
                }
                to="/employee/tasks"
              >
                Tasks
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? 'text-white block px-3 py-2 rounded-md text-base font-medium'
                    : 'text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium'
                }
                to="/employee/requests"
              >
                Request
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? 'text-white block px-3 py-2 rounded-md text-base font-medium'
                    : 'text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium'
                }
                to="/employee/history"
              >
                History
              </NavLink>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
