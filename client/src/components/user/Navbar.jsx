import { NavLink } from "react-router-dom";
import logo from "../../assets/logo-transparent.png";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/userSlice";
import { FaBell } from "react-icons/fa";
import { useNotificationContext } from "../../context/NotificationContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const { userNotifications } = useNotificationContext();

  const handleLogout = () => {
    dispatch(logout());
  };

  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
  };

  return (
    <div className="sticky top-0 z-50">
      <nav className="bg-black shadow">
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
                        ? "text-white px-3 py-2 rounded-md text-sm font-medium"
                        : "text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    }
                    to="/"
                  >
                    Home
                  </NavLink>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "text-white px-3 py-2 rounded-md text-sm font-medium"
                        : "text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    }
                    to="/services"
                  >
                    Services
                  </NavLink>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "text-white px-3 py-2 rounded-md text-sm font-medium"
                        : "text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    }
                    to="/cart"
                  >
                    Cart
                  </NavLink>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "text-white px-3 py-2 rounded-md text-sm font-medium"
                        : "text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    }
                    to="/bookings"
                  >
                    Bookings
                  </NavLink>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="relative ml-4">
                <button
                  onClick={toggleNotifications}
                  className="relative p-2 text-white hover:text-gray-300"
                >
                  <FaBell className="text-xl" />
                  {userNotifications.length > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                      {userNotifications.length}
                    </span>
                  )}
                </button>

                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 md:w-72 w-52 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    <div className="p-4">
                      <h3 className="text-lg font-semibold">Notifications</h3>
                      <ul className="mt-4 space-y-2">
                        {userNotifications.length > 0 ? (
                          userNotifications.map((notification, index) => (
                            <li
                              key={index}
                              className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                            >
                              {notification}
                            </li>
                          ))
                        ) : (
                          <li className="text-gray-500">
                            No new notifications
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
              <div className="relative ml-3">
                <div className="relative inline-block text-left">
                  {user && user.url !== undefined ? (
                    <div>
                      <button
                        type="button"
                        className="flex items-center justify-center py-2 px-4"
                        id="options-menu"
                        onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                      >
                        <img
                          src={user?.url}
                          alt="profile"
                          className="w-10 rounded-full "
                        />
                      </button>
                    </div>
                  ) : (
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
                  )}
                  {profileMenuOpen && (
                    <div className="absolute right-0 w-56 mt-2 origin-top-right rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5">
                      {user ? (
                        <div
                          className="py-1 "
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="options-menu"
                        >
                          <NavLink
                            to="/profile"
                            className={({ isActive }) =>
                              isActive
                                ? "block px-4 py-2 text-md text-white bg-gray-600"
                                : "block px-4 py-2 text-md text-gray-100 hover:text-white hover:bg-gray-600"
                            }
                            role="menuitem"
                          >
                            <span className="flex flex-col">
                              <span>Profile</span>
                            </span>
                          </NavLink>
                          <NavLink
                            onClick={() => handleLogout()}
                            className="block px-4 py-2 text-md text-gray-100 hover:text-white hover:bg-gray-600"
                            role="menuitem"
                          >
                            <span className="flex flex-col">
                              <span>Logout</span>
                            </span>
                          </NavLink>
                        </div>
                      ) : (
                        <div
                          className="py-1 "
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="options-menu"
                        >
                          <NavLink
                            to="/login"
                            className={({ isActive }) =>
                              isActive
                                ? "block px-4 py-2 text-md text-white bg-gray-600"
                                : "block px-4 py-2 text-md text-gray-100 hover:text-white hover:bg-gray-600"
                            }
                            role="menuitem"
                          >
                            <span className="flex flex-col">
                              <span>Login</span>
                            </span>
                          </NavLink>
                          <NavLink
                            to="/signup"
                            className={({ isActive }) =>
                              isActive
                                ? "block px-4 py-2 text-md text-white bg-gray-600"
                                : "block px-4 py-2 text-md text-gray-100 hover:text-white hover:bg-gray-600"
                            }
                            role="menuitem"
                          >
                            <span className="flex flex-col">
                              <span>Sign Up</span>
                            </span>
                          </NavLink>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
              >
                <svg
                  className="block w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
                <svg
                  className="hidden w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "text-white block px-3 py-2 rounded-md text-base font-medium"
                    : "text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                }
                to="/"
              >
                Home
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "text-white block px-3 py-2 rounded-md text-base font-medium"
                    : "text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                }
                to="/services"
              >
                Services
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "text-white block px-3 py-2 rounded-md text-base font-medium"
                    : "text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                }
                to="/cart"
              >
                Cart
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "text-white block px-3 py-2 rounded-md text-base font-medium"
                    : "text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                }
                to="/bookings"
              >
                Bookings
              </NavLink>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
