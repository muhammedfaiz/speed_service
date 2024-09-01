import { FaUser, FaUsers, FaList, FaBoxOpen, FaShoppingCart, FaUserFriends, FaChartBar } from 'react-icons/fa';
import { MdDashboard } from "react-icons/md";
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="flex flex-col flex-grow">
      <ul className="space-y-1 text-lg my-auto mx-auto">
        <li>
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              isActive
                ? "flex items-center bg-blue-500 text-white rounded-lg p-2 cursor-pointer transition-colors duration-200"
                : "flex items-center hover:bg-blue-500 rounded-lg p-2 cursor-pointer transition-colors duration-200"
            }
          >
            <MdDashboard className="mr-3" /> Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/employee"
            className={({ isActive }) =>
              isActive
                ? "flex items-center bg-blue-500 text-white rounded-lg p-2 cursor-pointer transition-colors duration-200"
                : "flex items-center hover:bg-blue-500 rounded-lg p-2 cursor-pointer transition-colors duration-200"
            }
          >
            <FaUser className="mr-3" /> Employee
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/applicants"
            className={({ isActive }) =>
              isActive
                ? "flex items-center bg-blue-500 text-white rounded-lg p-2 cursor-pointer transition-colors duration-200"
                : "flex items-center hover:bg-blue-500 rounded-lg p-2 cursor-pointer transition-colors duration-200"
            }
          >
            <FaUsers className="mr-3" /> Applicants
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/categories"
            className={({ isActive }) =>
              isActive
                ? "flex items-center bg-blue-500 text-white rounded-lg p-2 cursor-pointer transition-colors duration-200"
                : "flex items-center hover:bg-blue-500 rounded-lg p-2 cursor-pointer transition-colors duration-200"
            }
          >
            <FaList className="mr-3" /> Categories
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/services"
            className={({ isActive }) =>
              isActive
                ? "flex items-center bg-blue-500 text-white rounded-lg p-2 cursor-pointer transition-colors duration-200"
                : "flex items-center hover:bg-blue-500 rounded-lg p-2 cursor-pointer transition-colors duration-200"
            }
          >
            <FaBoxOpen className="mr-3" /> Services
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/orders"
            className={({ isActive }) =>
              isActive
                ? "flex items-center bg-blue-500 text-white rounded-lg p-2 cursor-pointer transition-colors duration-200"
                : "flex items-center hover:bg-blue-500 rounded-lg p-2 cursor-pointer transition-colors duration-200"
            }
          >
            <FaShoppingCart className="mr-3" /> Orders
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              isActive
                ? "flex items-center bg-blue-500 text-white rounded-lg p-2 cursor-pointer transition-colors duration-200"
                : "flex items-center hover:bg-blue-500 rounded-lg p-2 cursor-pointer transition-colors duration-200"
            }
          >
            <FaUserFriends className="mr-3" /> Users
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/sales-report"
            className={({ isActive }) =>
              isActive
                ? "flex items-center bg-blue-500 text-white rounded-lg p-2 cursor-pointer transition-colors duration-200"
                : "flex items-center hover:bg-blue-500 rounded-lg p-2 cursor-pointer transition-colors duration-200"
            }
          >
            <FaChartBar className="mr-3" /> Sales Report
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
