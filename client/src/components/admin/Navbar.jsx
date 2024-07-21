import { FaUser, FaUsers, FaList, FaShoppingCart, FaUserFriends, FaChartBar, FaUserCircle } from 'react-icons/fa';
import { MdDashboard } from "react-icons/md";
const Navbar = () => {
  return (
    <nav className="flex flex-col flex-grow">
          <ul className="space-y-1 text-lg m-8">
            <li className="flex items-center hover:bg-blue-500 rounded-lg p-2 cursor-pointer transition-colors duration-200">
              <MdDashboard className="mr-3" /> Dashboard
            </li>
            <li className="flex items-center hover:bg-blue-500 rounded-lg p-2 cursor-pointer transition-colors duration-200">
              <FaUser className="mr-3" /> Employee
            </li>
            <li className="flex items-center hover:bg-blue-500 rounded-lg p-2 cursor-pointer transition-colors duration-200">
              <FaUsers className="mr-3" /> Applicants
            </li>
            <li className="flex items-center hover:bg-blue-500 rounded-lg p-2 cursor-pointer transition-colors duration-200">
              <FaList className="mr-3" /> Categories
            </li>
            <li className="flex items-center hover:bg-blue-500 rounded-lg p-2 cursor-pointer transition-colors duration-200">
              <FaShoppingCart className="mr-3" /> Orders
            </li>
            <li className="flex items-center hover:bg-blue-500 rounded-lg p-2 cursor-pointer transition-colors duration-200">
              <FaUserFriends className="mr-3" /> Users
            </li>
            <li className="flex items-center hover:bg-blue-500 rounded-lg p-2 cursor-pointer transition-colors duration-200">
              <FaChartBar className="mr-3" /> Sales Report
            </li>
            <li className="flex items-center hover:bg-blue-500 rounded-lg p-2 cursor-pointer transition-colors duration-200">
              <FaUserCircle className="mr-3" /> Profile
            </li>
          </ul>
        </nav>
  )
}
export default Navbar