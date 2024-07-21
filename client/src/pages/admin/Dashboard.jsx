import { FaUserCircle } from 'react-icons/fa';
import { useState } from 'react';
import logo from '../../assets/logo-transparent.png';
import Navbar from '../../components/admin/Navbar';
import {useDispatch} from 'react-redux';
import { adminLogout } from '../../features/adminSlice';

const Dashboard = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dispatch = useDispatch();
  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    dispatch(adminLogout());
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-100">
      <aside className="w-full lg:w-64 bg-gradient-to-b from-blue-600 to-indigo-950 text-white flex flex-col">
        <div className="pl-10 pt-10 flex justify-center lg:justify-start">
          <img src={logo} alt="speed service" className="w-36" />
        </div>
        <Navbar/>
      </aside>
      <main className="flex-grow p-10 relative">
        <div className="absolute top-4 right-4">
          <div className="relative">
            <FaUserCircle 
              className="text-slate-700 w-8 h-8 mr-8 cursor-pointer" 
              onClick={handleDropdownToggle} 
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                <ul className="py-1">
                  <li 
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-200 cursor-pointer" 
                    onClick={() => console.log('Profile clicked')}
                  >
                    Profile
                  </li>
                  <li 
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-200 cursor-pointer" 
                    onClick={handleLogout}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-6">Welcome to the Dashboard, Admin</h1>
        <p className="text-gray-700">DashBoard Items.</p>
      </main>
    </div>
  );
}

export default Dashboard;
