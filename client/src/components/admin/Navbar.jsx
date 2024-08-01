import { FaUser, FaUsers, FaList, FaBoxOpen , FaShoppingCart, FaUserFriends, FaChartBar, FaUserCircle } from 'react-icons/fa';
import { MdDashboard } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="flex flex-col flex-grow">
      <ul className="space-y-1 text-lg my-auto mx-auto">
        <li
          className="flex items-center hover:bg-blue-500 rounded-lg p-2 cursor-pointer transition-colors duration-200"
          onClick={() => navigate("/admin/dashboard")}
        >
          <MdDashboard className="mr-3" /> Dashboard
        </li>
        <li
          className="flex items-center hover:bg-blue-500 rounded-lg p-2 cursor-pointer transition-colors duration-200"
          onClick={() => navigate("/admin/employee")}
        >
          <FaUser className="mr-3" /> Employee
        </li>
        <li
          className="flex items-center hover:bg-blue-500 rounded-lg p-2 cursor-pointer transition-colors duration-200"
          onClick={() => navigate("/admin/applicants")}
        >
          <FaUsers className="mr-3" /> Applicants
        </li>
        <li
          className="flex items-center hover:bg-blue-500 rounded-lg p-2 cursor-pointer transition-colors duration-200"
          onClick={() => navigate("/admin/categories")}
        >
          <FaList className="mr-3" /> Categories
        </li>
        <li
          className="flex items-center hover:bg-blue-500 rounded-lg p-2 cursor-pointer transition-colors duration-200"
          onClick={() => navigate("/admin/services")}
        >
          <FaBoxOpen className="mr-3" />  Services
        </li>
        <li
          className="flex items-center hover:bg-blue-500 rounded-lg p-2 cursor-pointer transition-colors duration-200"
          onClick={() => navigate("/admin/orders")}
        >
          <FaShoppingCart className="mr-3" /> Orders
        </li>
        <li
          className="flex items-center hover:bg-blue-500 rounded-lg p-2 cursor-pointer transition-colors duration-200"
          onClick={() => navigate("/admin/users")}
        >
          <FaUserFriends className="mr-3" /> Users
        </li>
        <li
          className="flex items-center hover:bg-blue-500 rounded-lg p-2 cursor-pointer transition-colors duration-200"
          onClick={() => navigate("/admin/sales-report")}
        >
          <FaChartBar className="mr-3" /> Sales Report
        </li>
        <li
          className="flex items-center hover:bg-blue-500 rounded-lg p-2 cursor-pointer transition-colors duration-200"
          onClick={() => navigate("/admin/profile")}
        >
          <FaUserCircle className="mr-3" /> Profile
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
